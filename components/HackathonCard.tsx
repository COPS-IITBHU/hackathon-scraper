import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'

interface HackathonCardProps {
  name: string
  date: string
  link: string
  description: string
  category: string[]
  prizePool: string
  imageSources: string[]
}

export default function HackathonCard({ name, date, link, description,category,prizePool,imageSources }: HackathonCardProps) {

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (imageSources.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageSources.length)
    }, 5000) // Change image every 5 seconds
    return () => clearInterval(timer)
  }, [imageSources])


  return (
    <Card className="overflow-visible isolation-auto hack-card relative">
      <div className="card__border"></div>
      <div className="card-content rounded-[inherit] overflow-hidden">
        <div className="relative h-64 w-full">
          {imageSources.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`${name} image ${index + 1}`}
              fill
              style={{
                objectFit: "fill",
                opacity: index === currentImageIndex ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/fallback-image.jpg';
              }}
            />
          ))}
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              {name}
            </h3>
            <p className="text-md text-gray-400">{description}</p>
          </div>

          <div className="space-y-2">
            <p className="text-md text-purple-100">{date}</p>
            <p className="text-md font-semibold text-green-400">Prize Pool: {prizePool}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {category.map((cat, index) => (
              <span
                key={index}
                className="text-sm bg-blue-900/30 text-purple-300 px-2 py-1 rounded-full border border-purple-500/50"
              >
                {cat}
              </span>
            ))}
          </div>

          <Button
            className="w-full neon-button bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 hover:from-blue-600 hover:via-blue-500 hover:to-blue-600 text-white font-medium py-6 shadow-[0_0_15px_rgba(147,51,234,0.5)] border border-purple-500/20"
            onClick={() => window.open(link, "_blank")}
          >
            Register Now
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

