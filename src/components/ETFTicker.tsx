import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

interface ETFTickerProps {
  ticker: string;
  isin?: string;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  showIcon?: boolean;
}

const ETFTicker: React.FC<ETFTickerProps> = ({ 
  ticker, 
  isin, 
  variant = 'outline',
  size = 'sm',
  className = '',
  showIcon = true
}) => {
  const badgeContent = (
    <div className="flex items-center gap-1">
      <span className="font-mono font-semibold">{ticker}</span>
      {showIcon && isin && (
        <ExternalLink className="w-3 h-3 opacity-60" />
      )}
    </div>
  );

  if (isin) {
    return (
      <Link to={`/etf/${isin}`} className="inline-block">
        <Badge
          variant={variant}
          className={`cursor-pointer hover:bg-violet-100 hover:text-violet-800 hover:border-violet-300 transition-colors ${className}`}
        >
          {badgeContent}
        </Badge>
      </Link>
    );
  }

  return (
    <Badge variant={variant} className={className}>
      <span className="font-mono font-semibold">{ticker}</span>
    </Badge>
  );
};

export default ETFTicker;