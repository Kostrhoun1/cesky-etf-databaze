
import React from 'react';
import { ETFListItem } from '@/types/etf';
import { AdvancedFiltersState, AdvancedFilterValue } from '@/hooks/useETFTableLogic';
import ETFAdvancedFilters from '@/components/ETFAdvancedFilters';

interface ETFComparisonFiltersProps {
  etfs: ETFListItem[];
  advancedFilters: AdvancedFiltersState;
  onAdvancedFilterChange: (key: keyof AdvancedFiltersState, value: AdvancedFilterValue) => void;
  ranges: {
    ter: { min: number; max: number };
    fundSize: { min: number; max: number };
    dividendYield: { min: number; max: number };
  };
}

const ETFComparisonFilters: React.FC<ETFComparisonFiltersProps> = ({
  etfs,
  advancedFilters,
  onAdvancedFilterChange,
  ranges,
}) => {
  return (
    <div>
      <ETFAdvancedFilters
        etfs={etfs}
        filters={advancedFilters}
        onFilterChange={onAdvancedFilterChange}
        ranges={ranges}
      />
    </div>
  );
};

export default ETFComparisonFilters;
