'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Check, ChevronDown, X, Calendar, Tag, Trophy, Globe } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'

// Filter categories
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const categories = [
  'AI', 'Web3', 'Software Development'
]

const prizes = [
  'Under $1K', '$1K - $5K', '$5K - $10K', '$10K - $50K', '$50K - $100K', '$100K+'
]

const locations = [
  'Online', 'In-person'
]

export default function Filters() {
  const [selectedMonths, setSelectedMonths] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPrizes, setSelectedPrizes] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  
  // Popover open states
  const [monthsOpen, setMonthsOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [prizesOpen, setPrizesOpen] = useState(false)
  const [locationsOpen, setLocationsOpen] = useState(false)
  
  // Emit filter changes as custom events
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('monthFilter', { detail: selectedMonths }))
  }, [selectedMonths])
  
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('categoryFilter', { detail: selectedCategories }))
  }, [selectedCategories])
  
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('prizeFilter', { detail: selectedPrizes }))
  }, [selectedPrizes])
  
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('locationFilter', { detail: selectedLocations }))
  }, [selectedLocations])
  
  // Toggle selection handlers
  const toggleMonth = (month: string) => {
    setSelectedMonths(prev => 
      prev.includes(month) 
        ? prev.filter(m => m !== month) 
        : [...prev, month]
    )
  }
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    )
  }
  
  const togglePrize = (prize: string) => {
    setSelectedPrizes(prev => 
      prev.includes(prize) 
        ? prev.filter(p => p !== prize) 
        : [...prev, prize]
    )
  }
  
  const toggleLocation = (location: string) => {
    setSelectedLocations(prev => 
      prev.includes(location) 
        ? prev.filter(l => l !== location) 
        : [...prev, location]
    )
  }
  
  // Clear all filters
  const clearAllFilters = () => {
    setSelectedMonths([])
    setSelectedCategories([])
    setSelectedPrizes([])
    setSelectedLocations([])
  }
  
  // Count active filters
  const activeFilterCount = 
    selectedMonths.length + 
    selectedCategories.length + 
    selectedPrizes.length + 
    selectedLocations.length
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-cyberpunk tracking-wide">FILTER MATRIX</h2>
        
        {activeFilterCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
            <span>Clear all filters</span>
            <span className="ml-1 bg-muted rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {activeFilterCount}
            </span>
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-3">
        {/* Month Filter */}
        <Popover open={monthsOpen} onOpenChange={setMonthsOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className={`flex items-center gap-2 ${selectedMonths.length > 0 ? 'border-primary/50 bg-primary/5' : ''}`}
            >
              <Calendar className="h-4 w-4" />
              <span>Date</span>
              {selectedMonths.length > 0 && (
                <span className="ml-1 bg-primary/20 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {selectedMonths.length}
                </span>
              )}
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search months..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {months.map(month => (
                    <CommandItem
                      key={month}
                      onSelect={() => toggleMonth(month)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div className={`flex h-4 w-4 items-center justify-center rounded border ${
                        selectedMonths.includes(month) ? 'bg-primary border-primary' : 'border-muted'
                      }`}>
                        {selectedMonths.includes(month) && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span>{month}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        
        {/* Category Filter */}
        <Popover open={categoriesOpen} onOpenChange={setCategoriesOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className={`flex items-center gap-2 ${selectedCategories.length > 0 ? 'border-primary/50 bg-primary/5' : ''}`}
            >
              <Tag className="h-4 w-4" />
              <span>Category</span>
              {selectedCategories.length > 0 && (
                <span className="ml-1 bg-primary/20 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {selectedCategories.length}
                </span>
              )}
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search categories..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {categories.map(category => (
                    <CommandItem
                      key={category}
                      onSelect={() => toggleCategory(category)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div className={`flex h-4 w-4 items-center justify-center rounded border ${
                        selectedCategories.includes(category) ? 'bg-primary border-primary' : 'border-muted'
                      }`}>
                        {selectedCategories.includes(category) && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span>{category}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        
        {/* Prize Filter */}
        <Popover open={prizesOpen} onOpenChange={setPrizesOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className={`flex items-center gap-2 ${selectedPrizes.length > 0 ? 'border-primary/50 bg-primary/5' : ''}`}
            >
              <Trophy className="h-4 w-4" />
              <span>Prize Pool</span>
              {selectedPrizes.length > 0 && (
                <span className="ml-1 bg-primary/20 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {selectedPrizes.length}
                </span>
              )}
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0" align="start">
            <Command>
              <CommandList>
                <CommandGroup>
                  {prizes.map(prize => (
                    <CommandItem
                      key={prize}
                      onSelect={() => togglePrize(prize)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div className={`flex h-4 w-4 items-center justify-center rounded border ${
                        selectedPrizes.includes(prize) ? 'bg-primary border-primary' : 'border-muted'
                      }`}>
                        {selectedPrizes.includes(prize) && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span>{prize}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        
        {/* Location Filter */}
        <Popover open={locationsOpen} onOpenChange={setLocationsOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className={`flex items-center gap-2 ${selectedLocations.length > 0 ? 'border-primary/50 bg-primary/5' : ''}`}
            >
              <Globe className="h-4 w-4" />
              <span>Location</span>
              {selectedLocations.length > 0 && (
                <span className="ml-1 bg-primary/20 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {selectedLocations.length}
                </span>
              )}
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0" align="start">
            <Command>
              <CommandList>
                <CommandGroup>
                  {locations.map(location => (
                    <CommandItem
                      key={location}
                      onSelect={() => toggleLocation(location)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div className={`flex h-4 w-4 items-center justify-center rounded border ${
                        selectedLocations.includes(location) ? 'bg-primary border-primary' : 'border-muted'
                      }`}>
                        {selectedLocations.includes(location) && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span>{location}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedMonths.map(month => (
            <div 
              key={month}
              className="bg-primary/10 border border-primary/20 text-sm rounded-full px-3 py-1 flex items-center gap-1"
            >
              <span>{month}</span>
              <X 
                className="h-3 w-3 cursor-pointer hover:text-primary" 
                onClick={() => toggleMonth(month)}
              />
            </div>
          ))}
          
          {selectedCategories.map(category => (
            <div 
              key={category}
              className="bg-secondary/10 border border-secondary/20 text-sm rounded-full px-3 py-1 flex items-center gap-1"
            >
              <span>{category}</span>
              <X 
                className="h-3 w-3 cursor-pointer hover:text-secondary" 
                onClick={() => toggleCategory(category)}
              />
            </div>
          ))}
          
          {selectedPrizes.map(prize => (
            <div 
              key={prize}
              className="bg-warning/10 border border-warning/20 text-sm rounded-full px-3 py-1 flex items-center gap-1"
            >
              <span>{prize}</span>
              <X 
                className="h-3 w-3 cursor-pointer hover:text-warning" 
                onClick={() => togglePrize(prize)}
              />
            </div>
          ))}
          
          {selectedLocations.map(location => (
            <div 
              key={location}
              className="bg-accent/10 border border-accent/20 text-sm rounded-full px-3 py-1 flex items-center gap-1"
            >
              <span>{location}</span>
              <X 
                className="h-3 w-3 cursor-pointer hover:text-accent" 
                onClick={() => toggleLocation(location)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

