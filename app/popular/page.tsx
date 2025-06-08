import Link from 'next/link';
import { ArrowLeft, Code, Timer, Zap, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';

export default function PopularComingSoon() {
  return (
    <main className="min-h-screen cyberpunk-bg">
      <Header />
      
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center justify-center">
        <div className="relative mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-30 blur-lg"></div>
          <div className="relative border border-primary/30 bg-card/50 p-6 md:p-10 rounded-lg backdrop-blur-sm">
            {/* Glitching Coming Soon text */}
            <h1 className="text-4xl md:text-6xl font-cyberpunk mb-6 text-center neon-text relative">
              <span className="animate-pulse">COMING_SOON</span>
              <span className="absolute top-0 left-0 w-full text-accent opacity-50 animate-glitch">COMING_SOON</span>
            </h1>
            
            <div className="max-w-2xl mx-auto text-center mb-8">
              <p className="text-xl mb-4">Our engineers are working hard to bring you the most popular hackathons.</p>
              <p className="text-muted-foreground">This feature will be available in the next system update.</p>
            </div>
            
            <div className="flex flex-wrap gap-6 justify-center mb-8">
              <div className="flex flex-col items-center p-4 border border-primary/20 rounded-md bg-card/30 backdrop-blur-sm">
                <Timer className="h-8 w-8 text-primary mb-2" />
                <span className="font-mono text-sm">Development in progress</span>
              </div>
              
              <div className="flex flex-col items-center p-4 border border-secondary/20 rounded-md bg-card/30 backdrop-blur-sm">
                <Code className="h-8 w-8 text-secondary mb-2" />
                <span className="font-mono text-sm">Feature implementation</span>
              </div>
              
              <div className="flex flex-col items-center p-4 border border-accent/20 rounded-md bg-card/30 backdrop-blur-sm">
                <Zap className="h-8 w-8 text-accent mb-2" />
                <span className="font-mono text-sm">Coming soon</span>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Link href="/">
                <Button variant="outline" className="cyberpunk-button flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Return to Dashboard</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* COPS IIT BHU branding */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">Want to contribute to this feature?</span>
            <Link href="https://github.com/COPS-IITBHU/hackathon-scraper" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="h-8 px-2 flex items-center gap-1">
                <Github className="h-3 w-3" />
                <span className="text-xs">GitHub</span>
              </Button>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">Built with ❤️ by COPS IIT BHU</p>
        </div>
      </div>
      
      {/* Animated scan line */}
      <div className="fixed top-0 left-0 w-full h-1 bg-primary/50 animate-scanline"></div>
    </main>
  );
} 