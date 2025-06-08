import Link from 'next/link';
import { Glitch, Terminal, Github, Home, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 cyberpunk-bg">
      {/* Animated glitching text */}
      <div className="relative mb-8">
        <h1 className="text-8xl md:text-9xl font-cyberpunk animate-glitch neon-text">404</h1>
        <div className="absolute inset-0 animate-glitch opacity-70 text-8xl md:text-9xl font-cyberpunk text-accent">404</div>
        <div className="absolute inset-0 animate-glitch opacity-70 delay-75 text-8xl md:text-9xl font-cyberpunk text-secondary">404</div>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-cyberpunk mb-4 text-center neon-text-blue">SYSTEM BREACH DETECTED</h2>
      
      <div className="max-w-md text-center mb-8 typing">
        <p className="mb-4">The page you're looking for has been corrupted or doesn't exist in this dimension.</p>
        <p className="text-muted-foreground">Try accessing another sector or return to base.</p>
      </div>
      
      {/* Easter egg: clicking reveals hidden message */}
      <div className="mb-8 relative group cursor-pointer">
        <div className="border border-primary/30 bg-card/50 p-4 rounded-md backdrop-blur-sm">
          <div className="flex items-center gap-2 text-primary">
            <Terminal className="h-5 w-5" />
            <span className="font-mono">Click to decrypt hidden message...</span>
          </div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center bg-card/90 rounded-md backdrop-blur-md">
            <div className="text-center p-4">
              <p className="text-accent font-mono mb-2">[DECRYPTED]</p>
              <p className="mb-2">This page was created by COPS IIT BHU</p>
              <p className="text-xs text-muted-foreground">The best technical club at IIT BHU</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/">
          <Button variant="outline" className="cyberpunk-button flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span>Return to Base</span>
          </Button>
        </Link>
        
        <Link href="https://github.com/COPS-IITBHU/hackathon-scraper/issues" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="cyberpunk-button flex items-center gap-2">
            <Github className="h-4 w-4" />
            <span>Report Issue</span>
          </Button>
        </Link>
      </div>
      
      {/* COPS IIT BHU branding */}
      <div className="mt-16 text-center">
        <Link href="https://cops.iitbhu.ac.in" target="_blank" rel="noopener noreferrer" className="inline-block">
          <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <span className="font-cyberpunk text-sm">COPS IIT BHU</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">Have feature ideas? Raise issues on our GitHub repo!</p>
      </div>
      
      {/* Animated elements */}
      <div className="fixed top-0 left-0 w-full h-1 bg-primary/50 animate-scanline"></div>
      <div className="fixed bottom-0 right-0 w-full h-1 bg-secondary/50 animate-scanline"></div>
    </div>
  );
} 