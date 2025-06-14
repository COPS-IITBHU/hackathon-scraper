'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X, Search, Code, Trophy, Calendar, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  
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
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-10 w-10 bg-primary/10 rounded-lg overflow-hidden flex items-center justify-center border border-primary/20 group-hover:border-primary/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-60"></div>
              <Package className="h-5 w-5 text-primary relative z-10" />
            </div>
            <h1 
              className={`text-2xl md:text-3xl font-cyberpunk tracking-wider ${
                isVisible ? 'animate-fadeIn' : 'opacity-0'
              }`}
            >
              <span className="glitch cyber-text" data-text="HACK">HACK</span>
              <span className="text-foreground">CRATE</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/" icon={<Calendar size={16} />} text="EVENTS" />
            <NavLink href="/popular" icon={<Trophy size={16} />} text="POPULAR" />
            <NavLink 
              href="/" 
              icon={<Search size={16} />} 
              text="SEARCH" 
              onClick={(e) => {
                e.preventDefault()
                if (pathname !== '/') {
                  router.push('/#search-section')
                } else {
                  const searchElement = document.querySelector('#search-section')
                  if (searchElement) {
                    searchElement.scrollIntoView({ behavior: 'smooth' })
                  }
                }
              }}
            />
            
            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="relative overflow-hidden cyber-button"
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
              className="relative overflow-hidden cyber-button"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground cyber-button"
              aria-label="Toggle mobile menu"
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
          <MobileNavLink href="/" icon={<Calendar size={18} />} text="EVENTS" />
          <MobileNavLink href="/popular" icon={<Trophy size={18} />} text="POPULAR" />
          <MobileNavLink 
            href="/" 
            icon={<Search size={18} />} 
            text="SEARCH" 
            onClick={(e) => {
              e.preventDefault()
              if (pathname !== '/') {
                router.push('/#search-section')
              } else {
                const searchElement = document.querySelector('#search-section')
                if (searchElement) {
                  searchElement.scrollIntoView({ behavior: 'smooth' })
                }
              }
              setMobileMenuOpen(false)
            }}
          />
        </nav>
      </div>
    </header>
  )
}

function NavLink({ href, icon, text, onClick }: { href: string; icon: React.ReactNode; text: string; onClick?: (e: React.MouseEvent) => void }) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-primary/10 transition-colors cyber-button nav-text"
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </Link>
  )
}

function MobileNavLink({ href, icon, text, onClick }: { href: string; icon: React.ReactNode; text: string; onClick?: (e: React.MouseEvent) => void }) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-3 px-4 py-3 text-base font-medium border border-primary/20 rounded-md hover:bg-primary/10 transition-colors cyber-button nav-text"
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </Link>
  )
}

