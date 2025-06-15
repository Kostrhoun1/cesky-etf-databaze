
import React from 'react';
import { ETFListItem } from '@/types/etf';
import ETFTable from '@/components/ETFTable';

interface ETFComparisonTableSectionProps {
  etfs: ETFListItem[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isLoading: boolean;
  onSelectETF: (etf: ETFListItem) => Promise<boolean>;
  isETFSelected: (isin: string) => boolean;
  canAddMore: boolean;
  selectedETFs: any[];
  onRemoveETF: (isin: string) => void;
}

const ETFComparisonTableSection: React.FC<ETFComparisonTableSectionProps> = ({
  etfs,
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
    <div className="space-y-4">
      <ETFTable 
        etfs={etfs}
        onSelectETF={onSelectETF}
        isETFSelected={isETFSelected}
        canAddMore={canAddMore}
      />
    </div>
  );
};

export default ETFComparisonTableSection;
