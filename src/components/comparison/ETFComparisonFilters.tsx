
import React from 'react';
import { ETFListItem } from '@/types/etf';
import { AdvancedFiltersState } from '@/hooks/useETFTableLogic';
import ETFAdvancedFilters from '@/components/ETFAdvancedFilters';

interface ETFComparisonFiltersProps {
  etfs: ETFListItem[];
  advancedFilters: AdvancedFiltersState;
  onAdvancedFilterChange: (key: keyof AdvancedFiltersState, value: any) => void;
}

const ETFComparisonFilters: React.FC<ETFComparisonFiltersProps> = ({
  etfs,
  advancedFilters,
  onAdvancedFilterChange,
}) => {
  return (
    <div>
      <ETFAdvancedFilters
        etfs={etfs}
        filters={advancedFilters}
        onFilterChange={onAdvancedFilterChange}
      />
    </div>
  );
};

export default ETFComparisonFilters;
