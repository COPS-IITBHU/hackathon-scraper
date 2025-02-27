'use client'

import { useState, useEffect } from 'react'
import HackathonCard from './HackathonCard'
import { Skeleton } from '@/components/ui/skeleton'

interface HackathonData {
  name: string
  date: string
  link: string
  description: string
  category: string[]
  "prize pool": string
  "image sources": string[]
}

export default function HackathonList() {
  const [hackathons, setHackathons] = useState<HackathonData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchHackathons()
  }, [])

  const fetchHackathons = async () => {
    try {
      const response = await fetch("/api/hackathons")
      if (!response.ok) {
        throw new Error("Failed to fetch hackathons")
      }
      const data = await response.json()
      setHackathons(data)
      setIsLoading(false)
    } catch (err) {
      setError("Failed to load hackathons. Please try again later.")
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-[400px] w-full rounded-xl" />
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {hackathons.map((hackathon, index) => (
        <HackathonCard
          key={index}
          name={hackathon.name}
          date={hackathon.date}
          link={hackathon.link}
          description={hackathon.description}
          category={hackathon.category}
          prizePool={hackathon["prize pool"]}
          imageSources={hackathon["image sources"]}
        />
      ))}
    </div>
  )
}

