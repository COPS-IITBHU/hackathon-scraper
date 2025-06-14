'use client'

import { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, X, Zap } from 'lucide-react'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  
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

  return (
    <form onSubmit={handleSearch}>
      <div className="relative rounded-md">
        <div className="flex gap-2 bg-card/80 rounded-md border border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-colors shadow-lg shadow-primary/5">
          <div className="relative flex-grow">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search hackathons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="pl-10 pr-10 py-6 bg-transparent border-none text-lg focus-visible:ring-0 focus-visible:ring-offset-0 card-description"
            />
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary ${isFocused ? 'text-primary' : 'text-muted-foreground'}`} />
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          <Button 
            type="submit" 
            className="cyber-button flex items-center gap-2 py-6 px-6 bg-primary/90 hover:bg-primary text-primary-foreground relative overflow-hidden"
          >
            <Zap className="h-4 w-4" />
            <span className="font-cyberpunk tracking-wide">SEARCH</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 -skew-x-12 -translate-x-full hover:translate-x-full"></div>
          </Button>
        </div>
      </div>
      
      {/* Tech corner lines - top left */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/50" />
      
      {/* Tech corner lines - bottom right */}
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/50" />
    </form>
  )
}

