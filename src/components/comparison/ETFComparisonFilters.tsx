
import React from 'react';
import { ETFListItem } from '@/types/etf';
import { AdvancedFiltersState } from '@/hooks/useETFTableLogic';
import ETFAdvancedFilters from '@/components/ETFAdvancedFilters';
import ETFSearchFilters from '@/components/home/ETFSearchFilters';

interface ETFComparisonFiltersProps {
  etfs: ETFListItem[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  advancedFilters: AdvancedFiltersState;
  onAdvancedFilterChange: (key: keyof AdvancedFiltersState, value: any) => void;
}

const ETFComparisonFilters: React.FC<ETFComparisonFiltersProps> = ({
  etfs,
  searchTerm,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange,
  advancedFilters,
  onAdvancedFilterChange,
}) => {
  return (
    <div className="space-y-6">
      <ETFSearchFilters
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
      />
      
      <ETFAdvancedFilters
        etfs={etfs}
        filters={advancedFilters}
        onFilterChange={onAdvancedFilterChange}
      />
    </div>
  );
};

export default ETFComparisonFilters;
