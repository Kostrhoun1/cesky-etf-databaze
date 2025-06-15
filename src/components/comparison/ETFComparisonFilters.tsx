
import React from 'react';
import { ETFListItem } from '@/types/etf';
import { AdvancedFiltersState } from '@/hooks/useETFTableLogic';
import ETFAdvancedFilters from '@/components/ETFAdvancedFilters';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ETFComparisonFiltersProps {
  etfs: ETFListItem[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  advancedFilters: AdvancedFiltersState;
  onAdvancedFilterChange: (key: keyof AdvancedFiltersState, value: any) => void;
}

const ETFComparisonFilters: React.FC<ETFComparisonFiltersProps> = ({
  etfs,
  searchTerm,
  onSearchChange,
  advancedFilters,
  onAdvancedFilterChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Hledat podle názvu, ISIN, poskytovatele nebo tickeru..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <ETFAdvancedFilters
        etfs={etfs}
        filters={advancedFilters}
        onFilterChange={onAdvancedFilterChange}
      />
    </div>
  );
};

export default ETFComparisonFilters;
