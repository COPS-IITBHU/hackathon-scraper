import Header from "../components/Header";
import HackathonList from "../components/HackathonList";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink, Code, Trophy, Calendar, Package, Zap, Cpu, Database, Layers, Cloud, Bot, Bitcoin } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Fixed background elements */}
      <div className="fixed inset-0 tech-gradient-bg -z-10"></div>
      <div className="fixed inset-0 tech-pattern opacity-30 -z-10"></div>
      <div className="fixed inset-0 circuit-pattern opacity-50 -z-10"></div>
      
      {/* Header */}
      <Header />
      
      {/* Floating tech icons - positioned with fixed coordinates */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
        <div className="absolute top-[15%] left-[5%]">
          <Cpu className="h-14 w-14 text-primary/70 animate-float-slow" />
        </div>
        <div className="absolute top-[40%] left-[8%]">
          <Database className="h-12 w-12 text-secondary/70 animate-float" />
        </div>
        <div className="absolute top-[70%] left-[12%]">
          <Layers className="h-14 w-14 text-accent/70 animate-float-slow" />
        </div>
        <div className="absolute top-[20%] right-[8%]">
          <Bitcoin className="h-14 w-14 text-warning/70 animate-float" />
        </div>
        <div className="absolute top-[50%] right-[5%]">
          <Bot className="h-12 w-12 text-primary/70 animate-float-slow" />
        </div>
        <div className="absolute top-[80%] right-[10%]">
          <Cloud className="h-12 w-12 text-secondary/70 animate-float" />
        </div>
        <div className="absolute top-[30%] left-[25%]">
          <Code className="h-10 w-10 text-accent/70 animate-float" />
        </div>
        <div className="absolute top-[65%] left-[30%]">
          <Zap className="h-10 w-10 text-primary/70 animate-float-slow" />
        </div>
        <div className="absolute top-[25%] right-[25%]">
          <Trophy className="h-11 w-11 text-secondary/70 animate-float" />
        </div>
        <div className="absolute top-[60%] right-[30%]">
          <Calendar className="h-10 w-10 text-warning/70 animate-float-slow" />
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* HackCrate Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative inline-flex items-center">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mr-3">
                <Package className="h-10 w-10 text-primary" />
              </div>
              <h1 
                className="text-5xl md:text-7xl font-cyberpunk tracking-wider glitch"
                style={{ 
                  textShadow: "0 0 15px hsla(var(--primary) / 0.8), 0 0 25px hsla(var(--primary) / 0.6)"
                }}
                data-text="HACKCRATE"
              >
                HACKCRATE
              </h1>
            </div>
          </div>
          
          {/* Tagline with enhanced visibility */}
          <div className="relative">
            <p className="text-2xl md:text-4xl font-cyberpunk glow-text text-primary font-bold">
              UNLEASH YOUR CODE. CONQUER THE FUTURE.
            </p>
            <div className="absolute -inset-4 bg-primary/5 rounded-full blur-3xl -z-10"></div>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Your ultimate hub for discovering, tracking, and dominating the world's most innovative hackathons
          </p>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="feature-card tech-card">
              <div className="relative mb-4">
                <Calendar className="h-12 w-12 text-primary" />
                <div className="absolute -inset-1 bg-primary/20 rounded-full blur-md -z-10"></div>
              </div>
              <h3 className="feature-title">UPCOMING EVENTS</h3>
              <p className="feature-description">Never miss registration deadlines for the hottest hackathons</p>
            </div>
            
            <div className="feature-card tech-card">
              <div className="relative mb-4">
                <Trophy className="h-12 w-12 text-warning" />
                <div className="absolute -inset-1 bg-warning/20 rounded-full blur-md -z-10"></div>
              </div>
              <h3 className="feature-title">PRIZE POOLS</h3>
              <p className="feature-description">Find competitions with the most valuable rewards</p>
            </div>
            
            <div className="feature-card tech-card">
              <div className="relative mb-4">
                <Package className="h-12 w-12 text-accent" />
                <div className="absolute -inset-1 bg-accent/20 rounded-full blur-md -z-10"></div>
              </div>
              <h3 className="feature-title">ALL-IN-ONE</h3>
              <p className="feature-description">Everything you need in a single crate</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Search Section */}
      <section id="search-section" className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <SearchBar />
        </div>
      </section>
      
      {/* Filters and Hackathon List */}
      <section className="container mx-auto px-4 py-8 pb-24 relative z-10">
        <div className="mb-8">
          <Filters />
        </div>
        
        <HackathonList />
      </section>
      
      {/* Footer */}
      <footer className="border-t border-primary/10 py-8 mt-20 relative z-10 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">© {new Date().getFullYear()} <span className="cyber-text">HackCrate</span> | The ultimate hackathon collection platform</p>
            </div>
            
            <div className="flex items-center gap-6">
              <Link 
                href="https://cops.iitbhu.ac.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cyber-button"
              >
                <span className="font-cyberpunk">COPS IIT BHU</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
              
              <Link 
                href="https://github.com/COPS-IITBHU/hackathon-scraper" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cyber-button"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Scanlines overlay */}
      <div className="scanlines fixed inset-0 pointer-events-none z-50"></div>
    </main>
  );
}
