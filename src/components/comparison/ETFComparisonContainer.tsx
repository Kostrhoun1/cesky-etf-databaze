
import React from 'react';
import ETFComparisonHeader from './ETFComparisonHeader';
import ETFCategoryTabs from './ETFCategoryTabs';
import ETFComparisonTableSection from './ETFComparisonTableSection';
import ETFComparisonFilters from './ETFComparisonFilters';
import ETFComparisonPanel from '@/components/ETFComparisonPanel';
import LastUpdatedInfo from '@/components/LastUpdatedInfo';
import { useETFSearchData } from '@/hooks/useETFSearchData';
import { useETFComparison } from '@/hooks/useETFComparison';
import { useETFTableLogic } from '@/hooks/useETFTableLogic';
import { ETF } from '@/types/etf';

interface ETFComparisonContainerProps {
  onShowDetailedComparison: (selectedETFs: ETF[]) => void;
}

const ETFComparisonContainer: React.FC<ETFComparisonContainerProps> = ({
  onShowDetailedComparison,
}) => {
  const { etfs, categories, maxTerFromData, isLoading, lastUpdated } = useETFSearchData();
  const { selectedETFs, addETFToComparison, removeETFFromComparison, clearComparison, isETFSelected, canAddMore } = useETFComparison();

  const {
    filteredETFs,
    categories: logicCategories,
    activeCategory,
    handleCategoryChange,
    handleAdvancedFilterChange,
    advancedFilters,
    ranges
  } = useETFTableLogic(etfs);

  console.log('ETFComparisonContainer - etfs from useETFSearchData:', etfs.length);
  console.log('ETFComparisonContainer - filteredETFs from useETFTableLogic:', filteredETFs.length);
  console.log('ETFComparisonContainer - first filteredETF:', filteredETFs[0]);
  console.log('ETFComparisonContainer - selectedETFs:', selectedETFs.length);

  const handleShowDetailedComparison = () => {
    onShowDetailedComparison(selectedETFs);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <ETFComparisonHeader
          selectedCount={selectedETFs.length}
          onShowDetailedComparison={handleShowDetailedComparison}
          onClearAll={clearComparison}
        />
        <LastUpdatedInfo lastUpdated={lastUpdated} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <ETFCategoryTabs
            categories={logicCategories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
          
          <ETFComparisonTableSection
            etfs={filteredETFs}
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
            ranges={ranges}
          />
        </div>
      </div>

      <ETFComparisonPanel
        selectedETFs={selectedETFs}
        onRemoveETF={removeETFFromComparison}
        onClearAll={clearComparison}
        onShowComparison={handleShowDetailedComparison}
      />
    </div>
  );
};

export default ETFComparisonContainer;
