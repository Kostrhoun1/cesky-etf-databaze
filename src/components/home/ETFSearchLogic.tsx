
import React, { useState, useEffect, useMemo } from 'react';
import { ETFListItem } from '@/types/etf';
import { AdvancedFiltersState } from '@/hooks/useETFTableLogic';

interface ETFSearchLogicProps {
  etfs: ETFListItem[];
  categories: string[];
  maxTerFromData: number;
  children: (props: {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedCategory: string | undefined;
    setSelectedCategory: (category: string | undefined) => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
    sortOrder: 'asc' | 'desc';
    setSortOrder: (order: 'asc' | 'desc') => void;
    advancedFilters: AdvancedFiltersState;
    setAdvancedFilters: (filters: AdvancedFiltersState) => void;
    filteredETFs: ETFListItem[];
    activeCategory: string;
    handleSort: (field: string) => void;
    handleCategoryChange: (value: string) => void;
    handleAdvancedFilterChange: (key: keyof AdvancedFiltersState, value: any) => void;
  }) => React.ReactNode;
}

const ETFSearchLogic: React.FC<ETFSearchLogicProps> = ({ 
  etfs, 
  categories, 
  maxTerFromData, 
  children 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [sortBy, setSortBy] = useState<string>('ter_numeric');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFiltersState>({
    distributionPolicy: 'all',
    indexName: 'all',
    fundCurrency: 'all',
    maxTer: 1,
    replicationMethod: 'all',
    fundSizeRange: 'all',
    region: 'all',
    terRange: [0, 1],
    fundSizeRangeValues: [0, 100000],
    dividendYieldRange: [0, 10],
    includeLeveragedETFs: true,
    minRating: 0,
  });

  useEffect(() => {
    if (maxTerFromData > 1) {
      setAdvancedFilters(prev => ({ ...prev, maxTer: maxTerFromData }));
    }
  }, [maxTerFromData]);

  const activeCategory = selectedCategory ?? (categories.includes('Akciové') ? 'Akciové' : categories[0] ?? '');

  const filteredETFs = useMemo(() => {
    return etfs
      .filter(etf => {
        const searchLower = searchTerm.toLowerCase();
        
        const basicFieldsMatch = 
          etf.name.toLowerCase().includes(searchLower) ||
          etf.isin.toLowerCase().includes(searchLower) ||
          etf.fund_provider.toLowerCase().includes(searchLower);
        
        // Rozšířené vyhledávání ve všech ticker polích
        const tickerFieldsMatch = 
          (etf.primary_ticker && etf.primary_ticker.toLowerCase().includes(searchLower)) ||
          (etf.exchange_1_ticker && etf.exchange_1_ticker.toLowerCase().includes(searchLower)) ||
          (etf.exchange_2_ticker && etf.exchange_2_ticker.toLowerCase().includes(searchLower)) ||
          (etf.exchange_3_ticker && etf.exchange_3_ticker.toLowerCase().includes(searchLower)) ||
          (etf.exchange_4_ticker && etf.exchange_4_ticker.toLowerCase().includes(searchLower)) ||
          (etf.exchange_5_ticker && etf.exchange_5_ticker.toLowerCase().includes(searchLower));
        
        return basicFieldsMatch || tickerFieldsMatch;
      })
      .filter(etf => etf.category === activeCategory)
      .filter(etf => {
        const { distributionPolicy, indexName, fundCurrency, maxTer, replicationMethod, fundSizeRange, region } = advancedFilters;
        const distPolicyMatch = distributionPolicy === 'all' || etf.distribution_policy === distributionPolicy;
        const indexMatch = indexName === 'all' || etf.index_name === indexName;
        const currencyMatch = fundCurrency === 'all' || etf.fund_currency === fundCurrency;
        const terMatch = (etf.ter_numeric || 0) <= maxTer;
        const regionMatch = region === 'all' || etf.region === region;
        
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
        
        return distPolicyMatch && indexMatch && currencyMatch && terMatch && replicationMatch && fundSizeMatch && regionMatch;
      })
      .sort((a, b) => {
        let aValue: any = a[sortBy as keyof ETFListItem];
        let bValue: any = b[sortBy as keyof ETFListItem];
        
        // Speciální logika pro TER - hodnoty 0 (N/A) řadíme vždy na konec
        if (sortBy === 'ter_numeric') {
          const aTer = aValue || 0;
          const bTer = bValue || 0;
          
          // Pokud je jeden z TER roven 0 (N/A), řadíme ho jako nejhorší
          if (aTer === 0 && bTer !== 0) {
            return sortOrder === 'asc' ? 1 : -1; // N/A na konec při asc, na konec při desc
          }
          if (bTer === 0 && aTer !== 0) {
            return sortOrder === 'asc' ? -1 : 1; // N/A na konec při asc, na konec při desc
          }
          if (aTer === 0 && bTer === 0) {
            return 0; // Oba jsou N/A, zachováme pořadí
          }
          
          // Normální řazení pro nenulové hodnoty
          if (sortOrder === 'asc') {
            return aTer - bTer;
          } else {
            return bTer - aTer;
          }
        }
        
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        
        if (sortOrder === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });
  }, [etfs, searchTerm, activeCategory, advancedFilters, sortBy, sortOrder]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleAdvancedFilterChange = (key: keyof AdvancedFiltersState, value: any) => {
    setAdvancedFilters(prevFilters => ({...prevFilters, [key]: value}));
  };

  return children({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    advancedFilters,
    setAdvancedFilters,
    filteredETFs,
    activeCategory,
    handleSort,
    handleCategoryChange,
    handleAdvancedFilterChange,
  });
};

export default ETFSearchLogic;
