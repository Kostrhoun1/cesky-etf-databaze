import React, { useState, useEffect, useMemo } from 'react';
import { ETFListItem } from '@/types/etf';
import { useETFData } from '@/hooks/useETFData';
import { useETFComparison } from '@/hooks/useETFComparison';
import { AdvancedFiltersState } from '@/hooks/useETFTableLogic';
import ETFComparisonFilters from './ETFComparisonFilters';
import ETFCategoryTabs from './ETFCategoryTabs';
import ETFComparisonTableSection from './ETFComparisonTableSection';
import ETFComparisonPanel from '@/components/ETFComparisonPanel';

interface ETFComparisonContainerProps {
  onShowDetailedComparison: () => void;
}

const ETFComparisonContainer: React.FC<ETFComparisonContainerProps> = ({
  onShowDetailedComparison,
}) => {
  const [etfs, setEtfs] = useState<ETFListItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
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
    replicationMethod: 'all',
    fundSizeRange: 'all',
  });

  // Získání kategorií z dat
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(etfs.map(etf => etf.category).filter(Boolean))].sort();
    return uniqueCategories;
  }, [etfs]);

  // Nastavení výchozí kategorie
  const activeCategory = selectedCategory || (categories.includes('Akciové') ? 'Akciové' : categories[0] || '');

  // Filtrování ETF podle aktivní kategorie a dalších filtrů
  const filteredETFs = useMemo(() => {
    return etfs.filter(etf => {
      // Filtr podle kategorie
      const categoryMatch = etf.category === activeCategory;
      
      // Filtr podle vyhledávacího termínu
      const searchLower = searchTerm.toLowerCase();
      const searchMatch = !searchTerm || 
        etf.name.toLowerCase().includes(searchLower) ||
        etf.isin.toLowerCase().includes(searchLower) ||
        etf.fund_provider.toLowerCase().includes(searchLower) ||
        (etf.primary_ticker && etf.primary_ticker.toLowerCase().includes(searchLower)) ||
        (etf.exchange_1_ticker && etf.exchange_1_ticker.toLowerCase().includes(searchLower)) ||
        (etf.exchange_2_ticker && etf.exchange_2_ticker.toLowerCase().includes(searchLower)) ||
        (etf.exchange_3_ticker && etf.exchange_3_ticker.toLowerCase().includes(searchLower)) ||
        (etf.exchange_4_ticker && etf.exchange_4_ticker.toLowerCase().includes(searchLower)) ||
        (etf.exchange_5_ticker && etf.exchange_5_ticker.toLowerCase().includes(searchLower));
      
      // Pokročilé filtry
      const { distributionPolicy, indexName, fundCurrency, maxTer, replicationMethod, fundSizeRange } = advancedFilters;
      const distPolicyMatch = distributionPolicy === 'all' || etf.distribution_policy === distributionPolicy;
      const indexMatch = indexName === 'all' || etf.index_name === indexName;
      const currencyMatch = fundCurrency === 'all' || etf.fund_currency === fundCurrency;
      const terMatch = (etf.ter_numeric || 0) <= maxTer;
      
      // Replication method filter
      const replicationMatch = replicationMethod === 'all' || etf.replication === replicationMethod;
      
      // Fund size filter - hodnoty jsou v databázi už v milionech
      let fundSizeMatch = true;
      if (fundSizeRange !== 'all' && etf.fund_size_numeric) {
        // Hodnoty v databázi jsou už v milionech
        const fundSizeInMillions = etf.fund_size_numeric;
        
        switch (fundSizeRange) {
          case 'small':
            // Malé: méně než 100 milionů
            fundSizeMatch = fundSizeInMillions < 100;
            break;
          case 'medium':
            // Střední: 100 mil. - 1 000 mil. (1 mld.)
            fundSizeMatch = fundSizeInMillions >= 100 && fundSizeInMillions < 1000;
            break;
          case 'large':
            // Velké: 1 000 - 10 000 mil. (1 - 10 mld.)
            fundSizeMatch = fundSizeInMillions >= 1000 && fundSizeInMillions < 10000;
            break;
          case 'xlarge':
            // Velmi velké: více než 10 000 mil. (10 mld.)
            fundSizeMatch = fundSizeInMillions >= 10000;
            break;
          default:
            fundSizeMatch = true;
        }
      }
      
      return categoryMatch && searchMatch && distPolicyMatch && indexMatch && currencyMatch && terMatch && replicationMatch && fundSizeMatch;
    });
  }, [etfs, activeCategory, searchTerm, advancedFilters]);

  useEffect(() => {
    if (maxTerFromData > 1) {
      setAdvancedFilters(prev => ({ ...prev, maxTer: maxTerFromData }));
    }
  }, [maxTerFromData]);

  useEffect(() => {
    const loadETFs = async () => {
      const data = await fetchETFs(); // Load all ETFs for comparison page
      setEtfs(data || []);
    };
    loadETFs();
  }, [fetchETFs]);

  const handleAdvancedFilterChange = (key: keyof AdvancedFiltersState, value: any) => {
    setAdvancedFilters(prevFilters => ({...prevFilters, [key]: value}));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="flex gap-8">
      <div className="w-80 flex-shrink-0">
        <ETFComparisonFilters
          etfs={etfs}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          advancedFilters={advancedFilters}
          onAdvancedFilterChange={handleAdvancedFilterChange}
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <ETFCategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        
        <ETFComparisonTableSection
          filteredETFs={filteredETFs}
          isLoading={isLoading}
          onSelectETF={addETFToComparison}
          isETFSelected={isETFSelected}
          canAddMore={canAddMore}
        />

        <ETFComparisonPanel
          selectedETFs={selectedETFs}
          onRemoveETF={removeETFFromComparison}
          onClearAll={clearComparison}
          onShowComparison={onShowDetailedComparison}
        />
      </div>
    </div>
  );
};

export default ETFComparisonContainer;
