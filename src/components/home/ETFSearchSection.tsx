
import React, { useState } from 'react';
import { useETFComparison } from '@/hooks/useETFComparison';
import { useETFSearchData } from '@/hooks/useETFSearchData';
import ETFSearchHeader from './ETFSearchHeader';
import ETFSearchLogic from './ETFSearchLogic';
import ETFSearchInterface from './ETFSearchInterface';
import ETFComparisonPanel from '@/components/ETFComparisonPanel';
import ETFDetailedComparison from '@/components/ETFDetailedComparison';

const ETFSearchSection: React.FC = () => {
  const { etfs, categories, maxTerFromData, isLoading } = useETFSearchData();
  const [showDetailedComparison, setShowDetailedComparison] = useState(false);

  const {
    selectedETFs,
    addETFToComparison,
    removeETFFromComparison,
    clearComparison,
    isETFSelected,
    canAddMore,
  } = useETFComparison();

  const handleShowDetailedComparison = () => {
    setShowDetailedComparison(true);
  };

  const handleBackToList = () => {
    setShowDetailedComparison(false);
  };

  if (showDetailedComparison) {
    return (
      <ETFDetailedComparison
        selectedETFs={selectedETFs}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ETFSearchLogic
          etfs={etfs}
          categories={categories}
          maxTerFromData={maxTerFromData}
        >
          {(searchLogicProps) => (
            <>
              <ETFSearchHeader 
                filteredCount={searchLogicProps.filteredETFs.length} 
                totalCount={etfs.length} 
              />

              <ETFSearchInterface
                etfs={etfs}
                filteredETFs={searchLogicProps.filteredETFs}
                searchTerm={searchLogicProps.searchTerm}
                onSearchChange={searchLogicProps.setSearchTerm}
                categories={categories}
                activeCategory={searchLogicProps.activeCategory}
                onCategoryChange={searchLogicProps.handleCategoryChange}
                sortBy={searchLogicProps.sortBy}
                sortOrder={searchLogicProps.sortOrder}
                onSort={searchLogicProps.handleSort}
                isLoading={isLoading}
                advancedFilters={searchLogicProps.advancedFilters}
                onAdvancedFilterChange={searchLogicProps.handleAdvancedFilterChange}
                onSelectETF={addETFToComparison}
                isETFSelected={isETFSelected}
                canAddMore={canAddMore}
              />

              <ETFComparisonPanel
                selectedETFs={selectedETFs}
                onRemoveETF={removeETFFromComparison}
                onClearAll={clearComparison}
                onShowComparison={handleShowDetailedComparison}
              />
            </>
          )}
        </ETFSearchLogic>
      </div>
    </section>
  );
};

export default ETFSearchSection;
