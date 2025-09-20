import React from 'react';
import { Star, Info } from 'lucide-react';
import { ETF, ETFListItem } from '@/types/etf';
import { calculateETFRating, getRatingDescription, getRatingColor } from '@/utils/etfRating';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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
  let isYoungFund = false;
  
  // Only try to calculate rating if we don't have it from database
  if (!rating) {
    try {
      const ratingData = calculateETFRating(etf);
      if (ratingData) {
        rating = ratingData.rating;
        score = ratingData.score;
        breakdown = ratingData.breakdown;
      } else {
        // Fund is too young for rating
        isYoungFund = true;
        rating = null;
        score = null;
      }
    } catch (error) {
      console.warn('Failed to calculate ETF rating:', error);
      // For calculation errors (not young funds), still show default
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
  const ratingColor = rating ? getRatingColor(rating) : 'text-gray-400';
  const description = rating ? getRatingDescription(rating) : 'Fond je příliš mladý pro hodnocení';
  
  // If no rating (young fund), show gray stars with tooltip
  if (!rating || isYoungFund) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {/* Gray Stars for Young Funds */}
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`${starSize} text-gray-300`}
            />
          ))}
        </div>
        
        {/* Young Fund Message */}
        <Tooltip>
          <TooltipTrigger>
            <span className="text-sm text-gray-400 cursor-help">
              Nehodnoceno
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-xs">
              Fond je příliš mladý pro hodnocení.<br />
              Rating je dostupný po 3 letech existence.
            </div>
          </TooltipContent>
        </Tooltip>
        
        {/* Description for young funds */}
        {showDescription && (
          <span className="text-xs text-gray-500">
            {description}
          </span>
        )}
      </div>
    );
  }
  
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
      {showBreakdown && (
        <Tooltip>
          <TooltipTrigger>
            <Info className="w-3 h-3 text-gray-400 hover:text-gray-600 cursor-help" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
              <div className="text-xs space-y-1">
                <div className="font-semibold mb-2">Hodnocení: {score}/100 bodů</div>
                {/* Show database breakdown if available, fallback to calculated */}
                {etf.rating_ter_score !== undefined ? (
                  <div className="grid grid-cols-2 gap-1">
                    <div>TER (poplatky):</div>
                    <div className="text-right">{etf.rating_ter_score || 0}/30</div>
                    
                    <div>Velikost fondu:</div>
                    <div className="text-right">{etf.rating_size_score || 0}/25</div>
                    
                    <div>Historie:</div>
                    <div className="text-right">{etf.rating_track_record_score || 0}/15</div>
                    
                    <div>Správce:</div>
                    <div className="text-right">{etf.rating_provider_score || 0}/10</div>
                    
                    <div>Výkonnost:</div>
                    <div className="text-right">{etf.rating_performance_score || 0}/20</div>
                  </div>
                ) : breakdown ? (
                  <div className="grid grid-cols-2 gap-1">
                    <div>TER (poplatky):</div>
                    <div className="text-right">{breakdown.ter}/30</div>
                    
                    <div>Velikost fondu:</div>
                    <div className="text-right">{breakdown.fundSize}/25</div>
                    
                    <div>Historie:</div>
                    <div className="text-right">{breakdown.trackRecord}/15</div>
                    
                    <div>Správce:</div>
                    <div className="text-right">{breakdown.provider}/10</div>
                    
                    <div>Výkonnost:</div>
                    <div className="text-right">{breakdown.performance}/20</div>
                  </div>
                ) : (
                  <div className="text-gray-500">Breakdown nedostupný</div>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
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