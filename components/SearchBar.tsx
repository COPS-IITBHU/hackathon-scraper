'use client'

import { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, X, Zap } from 'lucide-react'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Show component with animation after mount
  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Dispatch search event
    const event = new CustomEvent('searchQuery', { detail: searchTerm })
    window.dispatchEvent(event)
  }
  
  const clearSearch = () => {
    setSearchTerm('')
    // Clear search when X is clicked
    const event = new CustomEvent('searchQuery', { detail: '' })
    window.dispatchEvent(event)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Random character effect for placeholder
  const [placeholder, setPlaceholder] = useState('Search hackathons...')
  
  useEffect(() => {
    if (!isFocused) return
    
    const baseText = 'Search hackathons...'
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`'
    let interval: NodeJS.Timeout
    
    const scramblePlaceholder = () => {
      const randomChar = () => chars[Math.floor(Math.random() * chars.length)]
      const randomIndex = Math.floor(Math.random() * baseText.length)
      
      setPlaceholder(prev => {
        const arr = prev.split('')
        if (arr[randomIndex] !== baseText[randomIndex]) {
          arr[randomIndex] = baseText[randomIndex]
        } else {
          arr[randomIndex] = randomChar()
        }
        return arr.join('')
      })
    }
    
    interval = setInterval(scramblePlaceholder, 100)
    
    return () => {
      clearInterval(interval)
      setPlaceholder(baseText)
    }
  }, [isFocused])

  return (
    <form 
      onSubmit={handleSearch} 
      className={`relative transform transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <div className="relative border-glow rounded-md">
        <div className="flex gap-2 bg-card rounded-md">
          <div className="relative flex-grow">
            <Input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="pl-10 pr-10 py-6 bg-transparent border-none text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          <Button 
            type="submit" 
            className="cyberpunk-button flex items-center gap-2 py-6 px-6"
          >
            <Zap className="h-4 w-4" />
            <span>Search</span>
          </Button>
        </div>
      </div>
      
      {/* Animated scan line effect */}
      <div 
        className="absolute top-0 left-0 w-full h-1 bg-primary/50 animate-scanline"
      />
    </form>
  )
}

