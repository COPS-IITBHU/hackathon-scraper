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

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Window is available");
    }
    setMounted(true);
    console.log("Component mounted. resolvedTheme:", resolvedTheme);
  }, [resolvedTheme]);

  const initializeVanta = () => {
    console.log("Trying to initialize Vanta. resolvedTheme:", resolvedTheme);
    if (!vantaRef.current) {
      console.log("vantaRef.current is not available.");
      return;
    }
    if (!window.VANTA || !window.VANTA.NET) {
      console.log("VANTA or VANTA.NET is not defined.");
      return;
    }
    if (vantaEffectRef.current) {
      console.log("Destroying previous Vanta effect.");
      vantaEffectRef.current.destroy();
    }
    const isDark = resolvedTheme === "dark";
    console.log("isDark:", isDark);
    vantaEffectRef.current = window.VANTA.NET({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: false,
      gyroControls: true,
      minHeight: 200,
      minWidth: 200,
      scale: 1.0,
      scaleMobile: 1.0,
      color: isDark ? 0x00ffff : 0x008B8B,
      backgroundColor: isDark ? 0x000000 : 0xffffff,
      points: 20,
      maxDistance: 21,
      spacing: 19,
    });
    console.log("Vanta effect initialized.");
  };

  useEffect(() => {
    if (mounted && resolvedTheme) {
      console.log("Mounted and resolvedTheme is available:", resolvedTheme);
      initializeVanta();
    }
    return () => {
      if (vantaEffectRef.current) {
        console.log("Destroying Vanta effect on unmount.");
        vantaEffectRef.current.destroy();
      }
    };
  }, [mounted, resolvedTheme]);

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="afterInteractive"
        onLoad={() => console.log("three.js loaded")}
        onError={(e) => console.error("Error loading three.js", e)}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("vanta.net script loaded");
          initializeVanta();
        }}
        onError={(e) => console.error("Error loading vanta.net", e)}
      />
      <div ref={vantaRef} id="vanta-bg" className="fixed inset-0 -z-10" />
    </>
  );
}
