
import React from 'react';
import { ETFListItem } from '@/types/etf';
import ETFTable from '@/components/ETFTable';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

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
  searchTerm,
  onSearchChange,
  isLoading,
  onSelectETF,
  isETFSelected,
  canAddMore,
  selectedETFs,
  onRemoveETF,
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
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Hledat podle názvu, ISIN nebo tickeru..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
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
