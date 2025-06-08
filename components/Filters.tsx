'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, Calendar, Tag, Trophy, Star, Zap, Filter, X } from 'lucide-react'

// Filter categories
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const categories = [
  'Web3', 'AI/ML', 'Mobile', 'Web', 'Blockchain', 'Game Dev',
  'AR/VR', 'IoT', 'Cloud', 'Fintech', 'Health', 'Education'
]

const prizeRanges = [
  'Under $1K', '$1K - $5K', '$5K - $10K', '$10K - $50K', '$50K - $100K', '$100K+'
]

const locations = [
  'Online', 'In-person', 'Hybrid'
]

export default function Filters() {
  const [selectedMonths, setSelectedMonths] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPrizes, setSelectedPrizes] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  
  // Show component with animation after mount
  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  // Update active filters count and dispatch events
  useEffect(() => {
    const count = selectedMonths.length + 
                  selectedCategories.length + 
                  selectedPrizes.length + 
                  selectedLocations.length
    setActiveFiltersCount(count)
    
    // Dispatch custom events for filters
    dispatchFilterEvent('monthFilter', selectedMonths)
    dispatchFilterEvent('categoryFilter', selectedCategories)
    dispatchFilterEvent('prizeFilter', selectedPrizes)
    dispatchFilterEvent('locationFilter', selectedLocations)
  }, [selectedMonths, selectedCategories, selectedPrizes, selectedLocations])
  
  // Helper function to dispatch custom events
  const dispatchFilterEvent = (eventName: string, detail: any) => {
    const event = new CustomEvent(eventName, { detail })
    window.dispatchEvent(event)
  }

  // Toggle handlers
  const handleMonthToggle = (month: string) => {
    setSelectedMonths((prev) =>
      prev.includes(month)
        ? prev.filter((m) => m !== month)
        : [...prev, month]
    )
  }

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const handlePrizeToggle = (prize: string) => {
    setSelectedPrizes((prev) =>
      prev.includes(prize)
        ? prev.filter((p) => p !== prize)
        : [...prev, prize]
    )
  }

  const handleLocationToggle = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
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

  return (
    <div 
      className={`space-y-4 transform transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="flex flex-wrap gap-3 items-center">
        <FilterDropdown 
          icon={<Calendar className="h-4 w-4" />}
          label="Date"
          items={months}
          selected={selectedMonths}
          onToggle={handleMonthToggle}
        />
        
        <FilterDropdown 
          icon={<Tag className="h-4 w-4" />}
          label="Category"
          items={categories}
          selected={selectedCategories}
          onToggle={handleCategoryToggle}
        />
        
        <FilterDropdown 
          icon={<Trophy className="h-4 w-4" />}
          label="Prize Pool"
          items={prizeRanges}
          selected={selectedPrizes}
          onToggle={handlePrizeToggle}
        />
        
        <FilterDropdown 
          icon={<Star className="h-4 w-4" />}
          label="Location"
          items={locations}
          selected={selectedLocations}
          onToggle={handleLocationToggle}
        />
        
        {activeFiltersCount > 0 && (
          <button
            className="flex items-center gap-1 px-3 py-2 text-sm rounded-md bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors animate-scaleIn"
            onClick={clearAllFilters}
          >
            <X className="h-3.5 w-3.5" />
            <span>Clear filters ({activeFiltersCount})</span>
          </button>
        )}
      </div>
      
      {/* Active filters display */}
      {activeFiltersCount > 0 && (
        <div 
          className="flex flex-wrap gap-2 animate-fadeIn"
        >
          {[...selectedMonths, ...selectedCategories, ...selectedPrizes, ...selectedLocations].map((filter, index) => (
            <span
              key={filter}
              className="cyberbadge animate-scaleIn"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {filter}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

interface FilterDropdownProps {
  icon: React.ReactNode
  label: string
  items: string[]
  selected: string[]
  onToggle: (item: string) => void
}

function FilterDropdown({ icon, label, items, selected, onToggle }: FilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="cyberpunk-button flex items-center gap-2">
          {icon}
          <span>{label}</span>
          {selected.length > 0 && (
            <span className="flex items-center justify-center w-5 h-5 text-xs rounded-full bg-primary text-primary-foreground">
              {selected.length}
            </span>
          )}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-card/95 backdrop-blur-lg border border-primary/30">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span>Select {label}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto py-1">
          {items.map((item) => (
            <DropdownMenuCheckboxItem
              key={item}
              checked={selected.includes(item)}
              onCheckedChange={() => onToggle(item)}
              className="cursor-pointer"
            >
              {item}
            </DropdownMenuCheckboxItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

