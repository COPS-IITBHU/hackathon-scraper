"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useTheme } from "next-themes";

declare global {
  interface Window {
    VANTA: any;
  }
}

export default function VantaBackground() {
  const { resolvedTheme } = useTheme();
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffectRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState({
    three: false,
    vanta: false,
  });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    // Check if device is likely in low power mode (rough estimation)
    const isLowPower = 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
      window.navigator.hardwareConcurrency <= 4;
    setIsLowPowerMode(isLowPower);
    
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  const initializeVanta = () => {
    if (!vantaRef.current || !scriptsLoaded.three || !scriptsLoaded.vanta) {
      return;
    }
    
    if (!window.VANTA || !window.VANTA.NET) {
      console.warn("VANTA.NET is not available");
      return;
    }
    
    if (vantaEffectRef.current) {
      vantaEffectRef.current.destroy();
    }
    
    const isDark = resolvedTheme === "dark";
    
    // Use optimized settings based on device capabilities
    const optimizedSettings = {
      el: vantaRef.current,
      mouseControls: !isLowPowerMode,
      touchControls: !isLowPowerMode,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: isLowPowerMode ? 0.75 : 1.0,
      scaleMobile: 0.5,
      color: isDark ? 0x9333ea : 0x6366f1,
      backgroundColor: isDark ? 0x030712 : 0xfafafa,
      points: isLowPowerMode ? 8 : 10,
      maxDistance: isLowPowerMode ? 18 : 22,
      spacing: isLowPowerMode ? 20 : 18,
      showLines: !isLowPowerMode,
      speed: isReducedMotion ? 0.5 : 1.0,
      backgroundAlpha: 1,
      colorMode: 'lerp'
    };
    
    vantaEffectRef.current = window.VANTA.NET(optimizedSettings);
  };

  useEffect(() => {
    if (mounted && resolvedTheme && scriptsLoaded.three && scriptsLoaded.vanta) {
      // If reduced motion is preferred, use static background instead
      if (isReducedMotion || isLowPowerMode) {
        if (vantaEffectRef.current) {
          vantaEffectRef.current.destroy();
          vantaEffectRef.current = null;
        }
      } else {
        initializeVanta();
      }
    }
    
    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
      }
    };
  }, [mounted, resolvedTheme, scriptsLoaded, isReducedMotion, isLowPowerMode]);

  const handleThreeJsLoaded = () => {
    setScriptsLoaded(prev => ({ ...prev, three: true }));
  };

  const handleVantaLoaded = () => {
    setScriptsLoaded(prev => ({ ...prev, vanta: true }));
  };

  // If reduced motion is preferred, show a simplified background
  if (mounted && (isReducedMotion || isLowPowerMode)) {
    return (
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-background"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-primary/20 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-secondary/20 to-transparent"></div>
        </div>
        
        {/* Static grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--primary) / 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--primary) / 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>
    );
  }

  return (
    <>
      {/* Load scripts only if not in reduced motion mode */}
      {!isReducedMotion && !isLowPowerMode && (
        <>
          <Script
            src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
            strategy="lazyOnload"
            onLoad={handleThreeJsLoaded}
            onError={(e) => console.error("Error loading three.js", e)}
          />
          <Script
            src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"
            strategy="lazyOnload"
            onLoad={handleVantaLoaded}
            onError={(e) => console.error("Error loading vanta.net", e)}
          />
        </>
      )}
      
      <div ref={vantaRef} className="fixed inset-0 -z-20" />
      
      {/* Additional cyberpunk overlay effects - simplified for performance */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {/* Scanlines effect - reduced opacity for better performance */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255, 255, 255, 0.05) 3px, rgba(255, 255, 255, 0.05) 6px)",
            backgroundSize: "100% 6px",
          }}
        />
        
        {/* Corner accents - simplified */}
        <div className="absolute top-0 left-0 w-64 h-64 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              background: "radial-gradient(circle at top left, hsl(var(--primary) / 0.3), transparent 70%)",
            }}
          />
        </div>
        
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              background: "radial-gradient(circle at bottom right, hsl(var(--secondary) / 0.3), transparent 70%)",
            }}
          />
        </div>
      </div>
    </>
  );
}

