'use client'

import { useState, useEffect } from 'react'
import HackathonCard from './HackathonCard'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle, RefreshCw, ServerOff, ChevronLeft, ChevronRight } from 'lucide-react'
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
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6) // Show 6 hackathons per page
  
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
    setCurrentPage(1) // Reset to first page when filters change
  }, [hackathons, selectedMonths, selectedCategories, selectedPrizes, selectedLocations, searchQuery])

  useEffect(() => {
    fetchHackathons()
  }, [])

  const handleRetry = () => {
    setIsRetrying(true)
    fetchHackathons()
  }
  
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredHackathons.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredHackathons.length / itemsPerPage)
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages))
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1))

  return (
    <div className="space-y-8 relative">
      {/* Decorative tech elements */}
      <div className="hidden lg:block absolute -left-24 top-1/3 w-16 h-48 border-l-2 border-t-2 border-primary/20"></div>
      <div className="hidden lg:block absolute -right-24 top-2/3 w-16 h-48 border-r-2 border-b-2 border-primary/20"></div>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative">
            <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          </div>
          <p className="mt-6 text-muted-foreground font-cyberpunk tracking-wide">LOADING HACKATHONS...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="relative">
            <AlertCircle className="h-16 w-16 text-destructive" />
            <div className="absolute inset-0 animate-ping opacity-50 text-destructive">
              <AlertCircle className="h-16 w-16" />
            </div>
          </div>
          <h3 className="text-xl font-medium mt-6 mb-2 font-cyberpunk">CONNECTION ERROR</h3>
          <p className="text-muted-foreground mb-6 max-w-md">{error}</p>
          <Button 
            onClick={handleRetry} 
            disabled={isRetrying}
            className="cyber-button flex items-center gap-2 bg-destructive hover:bg-destructive/80"
          >
            {isRetrying ? (
              <>
                <div className="h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
                <span>RETRYING...</span>
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                <span>TRY AGAIN</span>
              </>
            )}
          </Button>
        </div>
      ) : filteredHackathons.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ServerOff className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2 font-cyberpunk">NO MATCHES FOUND</h3>
          <p className="text-muted-foreground max-w-md">
            No hackathons match your current filters. Try adjusting your search criteria.
          </p>
        </div>
      ) : (
        <>
          {/* Results count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-primary">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredHackathons.length)}</span> of <span className="font-medium text-primary">{filteredHackathons.length}</span> hackathons
            </p>
            
            {/* Items per page selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Show:</span>
              <select 
                className="bg-card border border-border rounded-md px-2 py-1 text-sm"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value))
                  setCurrentPage(1) // Reset to first page when changing items per page
                }}
              >
                <option value={6}>6</option>
                <option value={9}>9</option>
                <option value={12}>12</option>
              </select>
            </div>
          </div>
          
          {/* Hackathon cards with improved grid */}
          <div className="hackathon-grid">
            {currentItems.map((hackathon, index) => (
              <HackathonCard
                key={`${hackathon.name}-${index}`}
                name={hackathon.name}
                date={hackathon.date}
                link={hackathon.link}
                description={hackathon.description}
                category={hackathon.category}
                prizePool={hackathon["prize pool"]}
                imageSources={hackathon["image sources"]}
                type={hackathon.type}
              />
            ))}
          </div>
          
          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={prevPage} 
                disabled={currentPage === 1}
                className="h-8 w-8 border-primary/30"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Show pages around current page
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => paginate(pageNum)}
                      className={`h-8 w-8 p-0 ${currentPage === pageNum ? 'bg-primary text-primary-foreground' : 'border-primary/30'}`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={nextPage} 
                disabled={currentPage === totalPages}
                className="h-8 w-8 border-primary/30"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

