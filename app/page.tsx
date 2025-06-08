import Header from "../components/Header";
import HackathonList from "../components/HackathonList";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen cyberpunk-bg">
      <Header />
      
      {/* Hero Section with enhanced animations */}
      <section className="container mx-auto px-4 py-16 md:py-24 relative">
        {/* Animated circuit lines in background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-secondary to-transparent"></div>
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center space-y-6 relative">
          <div className="relative inline-block">
            <h1 
              className="text-4xl md:text-6xl font-cyberpunk neon-text tracking-wider animate-fadeIn relative"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              FIND YOUR NEXT HACKATHON
            </h1>
            {/* Glitching overlay */}
            <div 
              className="absolute inset-0 text-4xl md:text-6xl font-cyberpunk text-accent opacity-30 animate-glitch"
              style={{ animationDelay: "0.3s" }}
            >
              FIND YOUR NEXT HACKATHON
            </div>
          </div>
          
          <p 
            className="text-xl text-muted-foreground animate-fadeIn"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            Discover the most exciting hackathon events from around the world
          </p>
          
          {/* Search section with ID for navigation */}
          <div
            id="search-section"
            className="pt-4 animate-fadeIn"
            style={{ animationDelay: "0.6s", animationFillMode: "both" }}
          >
            <SearchBar />
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="container mx-auto px-4 pb-20">
        <div className="mb-8 animate-fadeIn" style={{ animationDelay: "0.8s", animationFillMode: "both" }}>
          <Filters />
        </div>
        
        <div className="animate-fadeIn" style={{ animationDelay: "1s", animationFillMode: "both" }}>
          <HackathonList />
        </div>
        
        {/* Grid background effect */}
        <div className="fixed inset-0 grid-bg -z-10 pointer-events-none"></div>
      </section>
      
      {/* Enhanced Footer with COPS IIT BHU branding */}
      <footer className="border-t border-primary/10 py-8 mt-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-primary via-transparent to-secondary"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-secondary via-transparent to-primary"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} Hackathon Scraper | Find the best hackathons worldwide</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Link 
                href="https://cops.iitbhu.ac.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="font-cyberpunk">COPS IIT BHU</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
              
              <Link 
                href="https://github.com/COPS-IITBHU/hackathon-scraper" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
