
import React from 'react';
import Layout from '@/components/Layout';
import ETFTable from '@/components/ETFTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect, useMemo } from 'react';
import { useETFData } from '@/hooks/useETFData';
import { useETFComparison } from '@/hooks/useETFComparison';
import { ETFListItem } from '@/types/etf';
import ETFComparisonPanel from '@/components/ETFComparisonPanel';
import ETFDetailedComparison from '@/components/ETFDetailedComparison';
import ETFAdvancedFilters from '@/components/ETFAdvancedFilters';
import { AdvancedFiltersState } from '@/hooks/useETFTableLogic';

const ETFComparison: React.FC = () => {
  const [etfs, setEtfs] = useState<ETFListItem[]>([]);
  const [showDetailedComparison, setShowDetailedComparison] = useState(false);
  const { fetchETFs, isLoading } = useETFData();
  
  const {
    selectedETFs,
    addETFToComparison,
    removeETFFromComparison,
    clearComparison,
    isETFSelected,
    canAddMore,
  } = useETFComparison();

  const maxTerFromData = useMemo(() => {
    if (etfs.length === 0) return 1;
    return Math.max(...etfs.map(etf => etf.ter_numeric || 0), 1);
  }, [etfs]);

  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFiltersState>({
    distributionPolicy: 'all',
    indexName: 'all',
    fundCurrency: 'all',
    maxTer: 1,
  });

  useEffect(() => {
    if (maxTerFromData > 1) {
      setAdvancedFilters(prev => ({ ...prev, maxTer: maxTerFromData }));
    }
  }, [maxTerFromData]);

  useEffect(() => {
    document.title = 'Srovnání ETF fondů - ETF průvodce.cz';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 
      'Detailní srovnání ETF fondů. Filtrujte podle kategorií, poplatků a výkonnosti. Porovnejte až 3 fondy současně.'
    );

    const loadETFs = async () => {
      const data = await fetchETFs(); // Load all ETFs for comparison page
      setEtfs(data || []);
    };
    loadETFs();
  }, [fetchETFs]);

  // Filtrování ETF podle pokročilých filtrů
  const filteredETFs = useMemo(() => {
    return etfs.filter(etf => {
      const { distributionPolicy, indexName, fundCurrency, maxTer } = advancedFilters;
      const distPolicyMatch = distributionPolicy === 'all' || etf.distribution_policy === distributionPolicy;
      const indexMatch = indexName === 'all' || etf.index_name === indexName;
      const currencyMatch = fundCurrency === 'all' || etf.fund_currency === fundCurrency;
      const terMatch = (etf.ter_numeric || 0) <= maxTer;
      return distPolicyMatch && indexMatch && currencyMatch && terMatch;
    });
  }, [etfs, advancedFilters]);

  const handleAdvancedFilterChange = (key: keyof AdvancedFiltersState, value: any) => {
    setAdvancedFilters(prevFilters => ({...prevFilters, [key]: value}));
  };

  const handleShowDetailedComparison = () => {
    setShowDetailedComparison(true);
  };

  const handleBackToList = () => {
    setShowDetailedComparison(false);
  };

  if (showDetailedComparison) {
    return (
      <Layout>
        <ETFDetailedComparison
          selectedETFs={selectedETFs}
          onBack={handleBackToList}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Srovnání ETF fondů
          </h1>
          <p className="text-lg text-gray-600">
            Detailní srovnání a analýza ETF fondů s možností filtrování podle různých kritérií
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-lg">Načítání ETF fondů...</p>
              </div>
            ) : (
              <ETFTable 
                etfs={filteredETFs}
                onSelectETF={addETFToComparison}
                isETFSelected={isETFSelected}
                canAddMore={canAddMore}
              />
            )}
          </div>
          
          <div className="lg:col-span-1">
            <ETFAdvancedFilters
              etfs={etfs}
              filters={advancedFilters}
              onFilterChange={handleAdvancedFilterChange}
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
    </Layout>
  );
};

export default ETFComparison;
