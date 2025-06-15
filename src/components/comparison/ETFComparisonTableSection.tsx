
import React from 'react';
import { ETFListItem } from '@/types/etf';
import ETFTable from '@/components/ETFTable';

interface ETFComparisonTableSectionProps {
  filteredETFs: ETFListItem[];
  isLoading: boolean;
  onSelectETF: (etf: ETFListItem) => Promise<boolean>;
  isETFSelected: (isin: string) => boolean;
  canAddMore: boolean;
}

const ETFComparisonTableSection: React.FC<ETFComparisonTableSectionProps> = ({
  filteredETFs,
  isLoading,
  onSelectETF,
  isETFSelected,
  canAddMore,
}) => {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-lg">Načítání ETF fondů...</p>
      </div>
    );
  }

  return (
    <ETFTable 
      etfs={filteredETFs}
      onSelectETF={onSelectETF}
      isETFSelected={isETFSelected}
      canAddMore={canAddMore}
    />
  );
};

export default ETFComparisonTableSection;
