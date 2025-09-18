import React from 'react';
import { Star, Info } from 'lucide-react';
import { ETF, ETFListItem } from '@/types/etf';
import { calculateETFRating, getRatingDescription, getRatingColor } from '@/utils/etfRating';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ETFRatingProps {
  etf: ETF | ETFListItem;
  showDescription?: boolean;
  showBreakdown?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ETFRating: React.FC<ETFRatingProps> = ({
  etf,
  showDescription = false,
  showBreakdown = false,
  size = 'md',
  className = ''
}) => {
  // Use database rating if available, fallback to calculated rating with error handling
  let rating = etf.rating;
  let score = etf.rating_score;
  let breakdown = null;
  
  // Only try to calculate rating if we don't have it from database
  if (!rating) {
    try {
      const ratingData = calculateETFRating(etf);
      rating = ratingData.rating;
      score = ratingData.score;
      breakdown = ratingData.breakdown;
    } catch (error) {
      console.warn('Failed to calculate ETF rating:', error);
      // Fallback to default values
      rating = 3; // Default middle rating
      score = 50;
      breakdown = null;
    }
  }
  
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4', 
    lg: 'w-5 h-5'
  };
  
  const starSize = sizeClasses[size];
  const ratingColor = getRatingColor(rating);
  const description = getRatingDescription(rating);
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Star Rating */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`${starSize} ${
              index < rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      
      {/* Rating Score */}
      <span className={`text-sm font-semibold ${ratingColor}`}>
        {rating}/5
      </span>
      
      {/* Breakdown Tooltip */}
      {showBreakdown && breakdown && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-3 h-3 text-gray-400 hover:text-gray-600 cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <div className="text-xs space-y-1">
                <div className="font-semibold mb-2">Hodnocení: {score}/100 bodů</div>
                <div className="grid grid-cols-2 gap-1">
                  <div>TER (poplatky):</div>
                  <div className="text-right">{breakdown.ter}/25</div>
                  
                  <div>Velikost fondu:</div>
                  <div className="text-right">{breakdown.fundSize}/20</div>
                  
                  <div>Historie:</div>
                  <div className="text-right">{breakdown.trackRecord}/15</div>
                  
                  <div>Správce:</div>
                  <div className="text-right">{breakdown.provider}/15</div>
                  
                  <div>Výkonnost:</div>
                  <div className="text-right">{breakdown.performance}/15</div>
                  
                  <div>Sledování indexu:</div>
                  <div className="text-right">{breakdown.tracking}/10</div>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      {/* Description */}
      {showDescription && (
        <span className="text-xs text-gray-600">
          {description}
        </span>
      )}
    </div>
  );
};

export default ETFRating;