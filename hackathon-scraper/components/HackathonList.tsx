'use client'

import { useState, useEffect } from 'react'
import HackathonCard from './HackathonCard'
import { Skeleton } from '@/components/ui/skeleton'

interface HackathonData {
  title: string
  description: string
  dates: string[]
  about: string[]
}

export default function HackathonList() {
  const [hackathons, setHackathons] = useState<HackathonData[]>([])
  const [filteredHackathons, setFilteredHackathons] = useState<HackathonData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMonths, setSelectedMonths] = useState<string[]>([])

  useEffect(() => {
    fetchHackathons()
  }, [])

  useEffect(() => {
    filterHackathons()
  }, [hackathons, searchTerm, selectedMonths])

  const fetchHackathons = async () => {
    try {
      const response = await fetch('/api/hackathons')
      if (!response.ok) {
        throw new Error('Failed to fetch hackathons')
      }
      const data = await response.json()
      setHackathons(data)
      setIsLoading(false)
    } catch (err) {
      setError('Failed to load hackathons. Please try again later.')
      setIsLoading(false)
    }
  }

  const filterHackathons = () => {
    let filtered = hackathons

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((hackathon) =>
        hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hackathon.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply month filter
    if (selectedMonths.length > 0) {
      filtered = filtered.filter((hackathon) =>
        hackathon.dates.some((date) =>
          selectedMonths.some((month) => date.toLowerCase().includes(month.toLowerCase()))
        )
      )
    }

    setFilteredHackathons(filtered)
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-[200px] w-full rounded-lg" />
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredHackathons.map((hackathon, index) => (
        <HackathonCard key={index} {...hackathon} />
      ))}
    </div>
  )
}

