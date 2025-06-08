'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X, Terminal, Code, Zap, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true)
    // Start animations after a short delay
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <header className="relative z-50 border-b border-primary/10 backdrop-blur-md bg-background/80">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="animate-wiggle">
              <Terminal className="h-8 w-8 text-primary" />
            </div>
            <h1 
              className={`text-3xl font-cyberpunk tracking-wider neon-text ${
                isVisible ? 'animate-fadeIn' : 'opacity-0'
              }`}
              data-text="HACKATHON_X"
            >
              HACKATHON_X
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/" icon={<Zap size={16} />} text="Explore" />
            <NavLink href="/popular" icon={<Code size={16} />} text="Popular" />
            <NavLink href="/search" icon={<Search size={16} />} text="Search" />
            
            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="cyberpunk-button ml-2 relative overflow-hidden"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="cyberpunk-button relative overflow-hidden"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden border-t border-primary/10 bg-background/95 backdrop-blur-lg overflow-hidden transition-all duration-300 ${
          mobileMenuOpen 
            ? 'max-h-[300px] opacity-100' 
            : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
          <MobileNavLink href="/" icon={<Zap size={18} />} text="Explore" />
          <MobileNavLink href="/popular" icon={<Code size={18} />} text="Popular" />
          <MobileNavLink href="/search" icon={<Search size={18} />} text="Search" />
        </nav>
      </div>
    </header>
  )
}

function NavLink({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) {
  const handleSearchClick = (e: React.MouseEvent) => {
    if (text === "Search") {
      e.preventDefault();
      const searchElement = document.querySelector('#search-section');
      if (searchElement) {
        searchElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Link 
      href={href} 
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-primary/10 transition-colors"
      onClick={handleSearchClick}
    >
      {icon}
      <span>{text}</span>
    </Link>
  )
}

function MobileNavLink({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) {
  const handleSearchClick = (e: React.MouseEvent) => {
    if (text === "Search") {
      e.preventDefault();
      const searchElement = document.querySelector('#search-section');
      if (searchElement) {
        searchElement.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu after clicking
        const mobileMenuButton = document.querySelector('[aria-label="Toggle mobile menu"]');
        if (mobileMenuButton) {
          (mobileMenuButton as HTMLButtonElement).click();
        }
      }
    }
  };

  return (
    <Link 
      href={href} 
      className="flex items-center gap-3 px-4 py-3 text-base font-medium border border-primary/20 rounded-md hover:bg-primary/10 transition-colors"
      onClick={handleSearchClick}
    >
      {icon}
      <span>{text}</span>
    </Link>
  )
}

