
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ETFSearchHeaderProps {
  totalCount: number;
}

const ETFSearchHeader: React.FC<ETFSearchHeaderProps> = ({ 
  totalCount
}) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Interaktivní srovnávač ETF fondů
      </h2>
      <p className="text-xl text-gray-600 mb-6">
        Prozkoumejte a porovnejte více než{' '}
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {totalCount.toLocaleString('cs-CZ')} ETF fondů
        </Badge>
        {' '}podle různých kritérií
      </p>
    </div>
  );
};

export default ETFSearchHeader;
