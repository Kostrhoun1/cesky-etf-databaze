
import React from 'react';
import { Badge } from '@/components/ui/badge';
import LastUpdatedInfo from '@/components/LastUpdatedInfo';

interface ETFSearchHeaderProps {
  filteredCount: number;
  totalCount: number;
  lastUpdated?: Date | null;
}

const ETFSearchHeader: React.FC<ETFSearchHeaderProps> = ({ 
  filteredCount, 
  totalCount, 
  lastUpdated 
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
      {filteredCount !== totalCount && (
        <p className="text-gray-500 mb-4">
          Zobrazeno {filteredCount.toLocaleString('cs-CZ')} z {totalCount.toLocaleString('cs-CZ')} fondů
        </p>
      )}
      <LastUpdatedInfo lastUpdated={lastUpdated} className="justify-center" />
    </div>
  );
};

export default ETFSearchHeader;
