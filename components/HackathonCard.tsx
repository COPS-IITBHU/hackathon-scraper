import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ExternalLink, Calendar, Trophy, Tag, Clock, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { GENERIC_HACKATHON_IMAGES } from '@/lib/utils';

interface HackathonCardProps {
  name: string;
  date: string;
  link: string;
  description: string;
  category: string[];
  prizePool: string | string[]; // Accepts string or array for prize pool.
  imageSources: string[];
}

export default function HackathonCard({
  name,
  date,
  link,
  description,
  category,
  prizePool,
  imageSources,
}: HackathonCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);
  
  // Always use generic images to avoid external image loading issues
  const genericImage = '/images/generic-hackathon.png';

  // Trigger glitch effect occasionally
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setShowGlitch(true);
      setTimeout(() => setShowGlitch(false), 500);
    }, 7000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  // Format prize pool for display
  const formattedPrizePool = Array.isArray(prizePool) 
    ? prizePool.join(', ') 
    : prizePool || 'N/A';

  return (
    <div
      className="hackathon-card border-glow transform transition-all duration-300 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-t-md">
        {/* Glitch overlay */}
        {showGlitch && (
          <div 
            className="absolute inset-0 z-10 bg-primary/10 animate-pulse"
          />
        )}
        
        {/* Image */}
        <div className="relative h-64 w-full">
          <Image
            src={genericImage}
            alt={`${name} image`}
            fill
            className="object-cover"
            priority={false}
            loading="lazy"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          
          {/* Animated scan line */}
          <div 
            className="absolute inset-0 z-10 opacity-20 pointer-events-none animate-scanline"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--primary)) 3px, transparent 3px)',
              backgroundSize: '100% 4px',
            }}
          />
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Title with glitch effect */}
        <h3 
          className={`text-2xl font-cyberpunk neon-text tracking-wider ${
            showGlitch ? 'animate-glitch' : ''
          }`}
          data-text={name}
        >
          {name}
        </h3>
        
        {/* Description */}
        <p className="text-md text-muted-foreground line-clamp-2">
          {description || 'No description available'}
        </p>
        
        {/* Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{date || 'Date TBA'}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Trophy className="h-4 w-4 text-warning" />
            <span className="font-medium">
              {formattedPrizePool}
            </span>
          </div>
        </div>
        
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {category && category.map((cat, index) => (
            <span
              key={index}
              className="cyberbadge hover:scale-105 active:scale-95 transition-transform"
            >
              {cat}
            </span>
          ))}
        </div>
        
        {/* Action button */}
        <div
          className="transform transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Button
            className="w-full cyberpunk-button group relative overflow-hidden py-6"
            onClick={() => window.open(link, '_blank')}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 group-hover:animate-pulse" />
              <span>Register Now</span>
              <ExternalLink className="h-4 w-4" />
            </span>
          </Button>
        </div>
      </div>
      
      {/* Animated corner accent */}
      <div className="absolute top-0 right-0">
        <div 
          className="w-16 h-16 bg-gradient-to-bl from-primary to-transparent animate-pulse"
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        />
      </div>
    </div>
  );
}
