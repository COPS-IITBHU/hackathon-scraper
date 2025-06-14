import { useState } from 'react';
import { Button } from './ui/button';
import { ExternalLink, Calendar, Trophy, Tag, Globe, MapPin, Clock, Zap, DollarSign } from 'lucide-react';
import Image from 'next/image';

interface HackathonCardProps {
  name: string;
  date: string;
  link: string;
  description: string;
  category: string[];
  prizePool: string | string[]; // Accepts string or array for prize pool.
  imageSources: string[];
  type?: string; // Optional field for "remote" or "onsite"
}

export default function HackathonCard({
  name,
  date,
  link,
  description,
  category,
  prizePool,
  imageSources,
  type,
}: HackathonCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);
  
  // Use the first image source from the array if available, or fall back to generic image
  const genericImage = '/images/generic-hackathon.png';
  const imageSource = (imageSources && imageSources.length > 0 && !imageError) 
    ? imageSources[0] 
    : genericImage;

  // Format prize pool for display
  const formattedPrizePool = Array.isArray(prizePool) 
    ? prizePool.join(', ') 
    : prizePool || 'N/A';
    
  // Determine if prize pool is significant
  const hasPrizePool = formattedPrizePool && !formattedPrizePool.includes('N/A');
  
  // Extract actual prize amount if possible
  const extractPrizeAmount = () => {
    if (!hasPrizePool) return 'Prize Pool';
    
    // Try to find dollar amounts
    const dollarMatch = formattedPrizePool.match(/\$([0-9,.]+)([kK])?/);
    if (dollarMatch) {
      const amount = dollarMatch[1];
      const isK = dollarMatch[2] ? dollarMatch[2].toLowerCase() === 'k' : false;
      
      return `$${amount}${isK ? 'K' : ''}`;
    }
    
    // If no specific amount found, return generic text
    return formattedPrizePool.length > 20 ? 'Prize Pool' : formattedPrizePool;
  };
    
  // Determine location icon based on type
  const LocationIcon = type?.toLowerCase().includes('remote') || type?.toLowerCase().includes('online') 
    ? Globe 
    : MapPin;
  
  // Format location text
  const locationType = type?.toLowerCase().includes('remote') || type?.toLowerCase().includes('online')
    ? 'Online'
    : type?.toLowerCase().includes('hybrid')
      ? 'Hybrid'
      : 'In-person';
      
  // Random glitch effect on hover
  const triggerRandomGlitch = () => {
    if (Math.random() > 0.7) {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 1000);
    }
  };
  
  // Handle mouse move for glow effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };
  
  // Handle apply button click
  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Open link in new tab
    window.open(link, '_blank', 'noopener,noreferrer');
    
    // Add visual feedback
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 500);
  };

  // Handle image error
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className={`tech-card card-hover-glow group relative overflow-hidden bg-card rounded-lg border border-border transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 card-hover-effect ${isGlitching ? 'glitch' : ''}`}
      onMouseEnter={() => {
        setIsHovered(true);
        triggerRandomGlitch();
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
      data-text={name}
      style={{ 
        '--x': `${mousePosition.x}%`, 
        '--y': `${mousePosition.y}%` 
      } as React.CSSProperties}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        {/* Image with consistent height */}
        <div className="relative h-48 w-full">
          <Image
            src={imageSource}
            alt={`${name} image`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
            loading="lazy"
            onError={handleImageError}
          />
          
          {/* Enhanced overlay gradient for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent" />
          
          {/* Tech pattern overlay with improved visibility */}
          <div className="absolute inset-0 opacity-40 pointer-events-none hex-grid" />
          
          {/* Prize badge with improved visibility and glow */}
          {hasPrizePool && (
            <div className="absolute top-3 right-3 bg-warning/90 text-background px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 backdrop-blur-sm shadow-lg animate-pulse-glow">
              <DollarSign className="h-3 w-3" />
              <span>{extractPrizeAmount()}</span>
            </div>
          )}
          
          {/* Location badge with improved visibility */}
          <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 border border-primary/30">
            <LocationIcon className="h-3 w-3 text-primary" />
            <span>{locationType}</span>
          </div>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        {/* Title with consistent height */}
        <h3 className="text-xl font-bold line-clamp-2 h-14 font-cyberpunk tracking-wide">
          {name}
        </h3>
        
        {/* Description with consistent height */}
        <p className="text-sm text-muted-foreground line-clamp-2 h-10 card-description">
          {description || 'No description available'}
        </p>
        
        {/* Date with icon alignment */}
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
          <span className="card-description truncate">{date || 'Date TBA'}</span>
        </div>
        
        {/* Categories with consistent height and improved styling */}
        <div className="flex flex-wrap gap-2 min-h-10">
          {category && category.slice(0, 3).map((cat, index) => (
            <span
              key={index}
              className="bg-muted/50 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium hover:bg-primary/20 transition-colors border border-primary/10"
            >
              {cat}
            </span>
          ))}
          {category && category.length > 3 && (
            <span className="bg-muted/50 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium border border-primary/10">
              +{category.length - 3} more
            </span>
          )}
        </div>
        
        {/* Action button with improved functionality and consistent styling */}
        <Button
          className="w-full bg-primary/90 hover:bg-primary text-primary-foreground transition-all duration-300 group-hover:shadow-md cyber-button relative overflow-hidden font-cyberpunk"
          onClick={handleApply}
        >
          <span className="flex items-center justify-center gap-2 relative z-10">
            <Zap className="h-4 w-4" />
            <span className="tracking-wide">APPLY NOW</span>
            <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          
          {/* Button animation effect */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine"></span>
        </Button>
      </div>
      
      {/* Enhanced corner accent */}
      <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Tech corner lines - top left */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Tech corner lines - bottom right */}
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Animated glow effect on hover */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Additional tech details */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-accent/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
}
