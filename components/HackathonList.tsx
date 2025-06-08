'use client'

import { useState, useEffect } from 'react'
import HackathonCard from './HackathonCard'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle, RefreshCw, ServerOff } from 'lucide-react'
import { Button } from './ui/button'

interface HackathonData {
  name: string
  date: string
  link: string
  description: string
  category: string[] // This can be an array or a single string
  "prize pool": string | string[] // This can be an array or a single string
  "image sources": string[]
  type?: string // Optional field for "remote" or "onsite"
}

export default function HackathonList() {
  const [hackathons, setHackathons] = useState<HackathonData[]>([])
  const [filteredHackathons, setFilteredHackathons] = useState<HackathonData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isRetrying, setIsRetrying] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  // Filter states from global state
  const [selectedMonths, setSelectedMonths] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPrizes, setSelectedPrizes] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')

  const fetchHackathons = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch("/api/hackathons")
      
      if (!response.ok) {
        throw new Error(`Failed to fetch hackathons: ${response.status} ${response.statusText}`)
      }
      
      const data = await response.json()
      
      // Normalize the data structure
      const normalizedData = data.map((hackathon: any) => ({
        ...hackathon,
        // Ensure category is always an array
        category: Array.isArray(hackathon.category) 
          ? hackathon.category 
          : hackathon.category ? [hackathon.category] : [],
        // Ensure prize pool is consistent
        "prize pool": hackathon["prize pool"] || "N/A",
        // Ensure image sources is always an array
        "image sources": Array.isArray(hackathon["image sources"]) 
          ? hackathon["image sources"] 
          : hackathon["image sources"] ? [hackathon["image sources"]] : []
      }))
      
      setHackathons(normalizedData)
      setFilteredHackathons(normalizedData)
      setIsLoading(false)
      
      // Trigger animation after data is loaded
      setTimeout(() => setIsVisible(true), 100)
    } catch (err) {
      console.error("Error fetching hackathons:", err)
      setError("Failed to load hackathons. Please try again later.")
      setIsLoading(false)
    } finally {
      setIsRetrying(false)
    }
  }

  // Listen for filter changes from custom events
  useEffect(() => {
    const handleMonthFilter = (e: CustomEvent) => setSelectedMonths(e.detail)
    const handleCategoryFilter = (e: CustomEvent) => setSelectedCategories(e.detail)
    const handlePrizeFilter = (e: CustomEvent) => setSelectedPrizes(e.detail)
    const handleLocationFilter = (e: CustomEvent) => setSelectedLocations(e.detail)
    const handleSearch = (e: CustomEvent) => setSearchQuery(e.detail)
    
    window.addEventListener('monthFilter' as any, handleMonthFilter as EventListener)
    window.addEventListener('categoryFilter' as any, handleCategoryFilter as EventListener)
    window.addEventListener('prizeFilter' as any, handlePrizeFilter as EventListener)
    window.addEventListener('locationFilter' as any, handleLocationFilter as EventListener)
    window.addEventListener('searchQuery' as any, handleSearch as EventListener)
    
    return () => {
      window.removeEventListener('monthFilter' as any, handleMonthFilter as EventListener)
      window.removeEventListener('categoryFilter' as any, handleCategoryFilter as EventListener)
      window.removeEventListener('prizeFilter' as any, handlePrizeFilter as EventListener)
      window.removeEventListener('locationFilter' as any, handleLocationFilter as EventListener)
      window.removeEventListener('searchQuery' as any, handleSearch as EventListener)
    }
  }, [])

  // Apply filters whenever filter states change
  useEffect(() => {
    if (hackathons.length === 0) return
    
    let filtered = [...hackathons]
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(hackathon => 
        hackathon.name.toLowerCase().includes(query) || 
        hackathon.description.toLowerCase().includes(query)
      )
    }
    
    // Filter by month
    if (selectedMonths.length > 0) {
      filtered = filtered.filter(hackathon => {
        if (!hackathon.date) return false
        return selectedMonths.some(month => {
          // Check if the month name appears in the date string
          return hackathon.date.toLowerCase().includes(month.toLowerCase())
        })
      })
    }
    
    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(hackathon => {
        if (!hackathon.category || hackathon.category.length === 0) return false
        
        // Check if any of the hackathon's categories match any selected category
        return selectedCategories.some(selectedCat => 
          hackathon.category.some((cat: string) => 
            cat && cat.toLowerCase().includes(selectedCat.toLowerCase())
          )
        )
      })
    }
    
    // Filter by prize range
    if (selectedPrizes.length > 0) {
      filtered = filtered.filter(hackathon => {
        const prizePool = hackathon["prize pool"]
        if (!prizePool) return false
        
        const prizeStr = Array.isArray(prizePool) ? prizePool.join(' ') : prizePool.toString()
        
        return selectedPrizes.some(prize => {
          if (prize === "Under $1K") return /\$\d{1,3}|under \$1k/i.test(prizeStr)
          if (prize === "$1K - $5K") return /\$[1-4]k|\$[1-4],\d{3}|\$[1-4]\.\d+k/i.test(prizeStr)
          if (prize === "$5K - $10K") return /\$[5-9]k|\$10k|\$[5-9],\d{3}|\$10,000|\$[5-9]\.\d+k/i.test(prizeStr)
          if (prize === "$10K - $50K") return /\$[1-4][0-9]k|\$[1-4][0-9],\d{3}|\$[1-4][0-9]\.\d+k/i.test(prizeStr)
          if (prize === "$50K - $100K") return /\$[5-9][0-9]k|\$100k|\$[5-9][0-9],\d{3}|\$100,000|\$[5-9][0-9]\.\d+k/i.test(prizeStr)
          if (prize === "$100K+") return /\$[1-9][0-9]{2,}k|\$[1-9][0-9]{2,},\d{3}|\$[1-9][0-9]{2,}\.\d+k/i.test(prizeStr)
          return false
        })
      })
    }
    
    // Filter by location/type
    if (selectedLocations.length > 0) {
      filtered = filtered.filter(hackathon => {
        // Check type field first
        if (hackathon.type) {
          if (selectedLocations.includes('Online') && 
              (hackathon.type.toLowerCase() === 'remote' || hackathon.type.toLowerCase() === 'online')) {
            return true
          }
          if (selectedLocations.includes('In-person') && 
              (hackathon.type.toLowerCase() === 'onsite' || hackathon.type.toLowerCase() === 'in-person')) {
            return true
          }
          if (selectedLocations.includes('Hybrid') && hackathon.type.toLowerCase() === 'hybrid') {
            return true
          }
        }
        
        // Check description as fallback
        return selectedLocations.some(location => {
          if (location === 'Online') {
            return hackathon.description.toLowerCase().includes('online') || 
                   hackathon.description.toLowerCase().includes('remote') || 
                   hackathon.description.toLowerCase().includes('virtual')
          }
          if (location === 'In-person') {
            return hackathon.description.toLowerCase().includes('in-person') || 
                   hackathon.description.toLowerCase().includes('onsite') || 
                   hackathon.description.toLowerCase().includes('on-site')
          }
          if (location === 'Hybrid') {
            return hackathon.description.toLowerCase().includes('hybrid')
          }
          return false
        })
      })
    }
    
    setFilteredHackathons(filtered)
  }, [hackathons, selectedMonths, selectedCategories, selectedPrizes, selectedLocations, searchQuery])

  useEffect(() => {
    fetchHackathons()
  }, [])

  const handleRetry = () => {
    setIsRetrying(true)
    fetchHackathons()
  }

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div 
            key={index} 
            className="border-glow rounded-md overflow-hidden animate-pulse"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="space-y-4">
              <Skeleton className="h-64 w-full" />
              <div className="p-6 space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div 
        className="flex flex-col items-center justify-center p-10 border border-destructive/30 rounded-lg bg-card opacity-0 animate-fadeIn"
        style={{ animationFillMode: 'forwards' }}
      >
        <ServerOff className="h-16 w-16 text-destructive mb-4" />
        <h3 className="text-xl font-bold mb-2">Connection Error</h3>
        <p className="text-muted-foreground text-center mb-6">{error}</p>
        <Button 
          onClick={handleRetry} 
          className="cyberpunk-button"
          disabled={isRetrying}
        >
          {isRetrying ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Retrying...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </>
          )}
        </Button>
      </div>
    )
  }

  if (filteredHackathons.length === 0) {
    return (
      <div 
        className="flex flex-col items-center justify-center p-10 border border-primary/30 rounded-lg bg-card opacity-0 animate-fadeIn"
        style={{ animationFillMode: 'forwards' }}
      >
        <AlertCircle className="h-16 w-16 text-primary mb-4" />
        <h3 className="text-xl font-bold mb-2">No Hackathons Found</h3>
        <p className="text-muted-foreground text-center">
          {hackathons.length > 0 
            ? "No hackathons match your current filters. Try adjusting your search criteria."
            : "Check back later for upcoming hackathon events."}
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredHackathons.map((hackathon, index) => (
        <div 
          key={`${hackathon.name}-${index}`}
          className={`opacity-0 ${isVisible ? 'animate-cardEntrance' : ''}`}
          style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
        >
          <HackathonCard
            name={hackathon.name}
            date={hackathon.date}
            link={hackathon.link}
            description={hackathon.description}
            category={hackathon.category || []}
            prizePool={hackathon["prize pool"]}
            imageSources={hackathon["image sources"] || []}
          />
        </div>
      ))}
    </div>
  )
}

