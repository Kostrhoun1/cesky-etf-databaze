
import React from 'react';
import ETFComparisonHeader from './ETFComparisonHeader';
import ETFCategoryTabs from './ETFCategoryTabs';
import ETFComparisonTableSection from './ETFComparisonTableSection';
import ETFComparisonFilters from './ETFComparisonFilters';
import { useETFSearchData } from '@/hooks/useETFSearchData';
import { useETFComparison } from '@/hooks/useETFComparison';
import { useETFTableLogic } from '@/hooks/useETFTableLogic';

interface ETFComparisonContainerProps {
  onShowDetailedComparison: () => void;
}

const ETFComparisonContainer: React.FC<ETFComparisonContainerProps> = ({
  onShowDetailedComparison,
}) => {
  const { etfs, categories, maxTerFromData, isLoading } = useETFSearchData();
  const { selectedETFs, addETFToComparison, removeETFFromComparison, clearComparison, isETFSelected, canAddMore } = useETFComparison();

  const {
    searchTerm,
    filteredETFs,
    categories: logicCategories,
    activeCategory,
    handleSearch,
    handleCategoryChange,
    handleAdvancedFilterChange,
    advancedFilters
  } = useETFTableLogic(etfs);

  return (
    <div className="space-y-6">
      <ETFComparisonHeader
        selectedCount={selectedETFs.length}
        onShowDetailedComparison={onShowDetailedComparison}
        onClearAll={clearComparison}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <ETFCategoryTabs
            categories={logicCategories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
          
          <ETFComparisonTableSection
            etfs={filteredETFs}
            searchTerm={searchTerm}
            onSearchChange={handleSearch}
            isLoading={isLoading}
            onSelectETF={addETFToComparison}
            isETFSelected={isETFSelected}
            canAddMore={canAddMore}
            selectedETFs={selectedETFs}
            onRemoveETF={removeETFFromComparison}
          />
        </div>
        
        <div className="lg:col-span-1">
          <ETFComparisonFilters
            etfs={etfs}
            advancedFilters={advancedFilters}
            onAdvancedFilterChange={handleAdvancedFilterChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ETFComparisonContainer;
