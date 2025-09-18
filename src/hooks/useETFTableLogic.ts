import { useState, useMemo, useEffect } from 'react';
import { ETFListItem } from '@/types/etf';
import { calculateETFRating } from '@/utils/etfRating';

type AdvancedFilterValue = string | number | boolean | [number, number];

export interface AdvancedFiltersState {
  distributionPolicy: string;
  indexName: string;
  fundCurrency: string;
  maxTer: number;
  replicationMethod: string;
  fundSizeRange: string;
  region: string;
  terRange: [number, number];
  fundSizeRangeValues: [number, number];
  dividendYieldRange: [number, number];
  includeLeveragedETFs: boolean;
  minRating: number;
}

export const useETFTableLogic = (etfs: ETFListItem[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [sortBy, setSortBy] = useState<string>('ter_numeric');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [minRating, setMinRating] = useState(0);
  const itemsPerPage = 50;

  const ranges = useMemo(() => {
    const ters = etfs.map(etf => etf.ter_numeric || 0).filter(ter => ter > 0);
    const sizes = etfs.map(etf => etf.fund_size_numeric || 0).filter(size => size > 0);
    const dividendYields = etfs.map(etf => etf.dividend_yield_numeric || 0).filter(dividendYield => dividendYield > 0);
    
    return {
      ter: { min: 0, max: Math.max(...ters, 1) },
      fundSize: { min: 0, max: Math.max(...sizes, 100000) },
      dividendYield: { min: 0, max: Math.max(...dividendYields, 10) }
    };
  }, [etfs]);

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
    includeLeveragedETFs: false,
    minRating: 0,
  });

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(etfs.map(etf => etf.category).filter(Boolean))];
    
    // Custom sort: "Ostatní" should be at the end
    return uniqueCategories.sort((a, b) => {
      if (a === 'Ostatní') return 1;  // Move "Ostatní" to end
      if (b === 'Ostatní') return -1; // Move "Ostatní" to end
      return a.localeCompare(b); // Regular alphabetical sort for others
    });
  }, [etfs]);

  const activeCategory = selectedCategory ?? (categories.includes('Akciové') ? 'Akciové' : categories[0] ?? '');

  useEffect(() => {
    if (etfs.length > 0) {
      setAdvancedFilters(prev => ({
        ...prev,
        maxTer: ranges.ter.max,
        terRange: [ranges.ter.min, ranges.ter.max],
        fundSizeRangeValues: [ranges.fundSize.min, ranges.fundSize.max],
        dividendYieldRange: [ranges.dividendYield.min, ranges.dividendYield.max],
      }));
    }
  }, [etfs, ranges.ter.max, ranges.fundSize.max, ranges.dividendYield.max]);

  const filteredETFs = useMemo(() => {
    const result = etfs
      .filter(etf => {
        const searchLower = searchTerm.toLowerCase();
        
        const basicFieldsMatch = 
          etf.name.toLowerCase().includes(searchLower) ||
          etf.isin.toLowerCase().includes(searchLower) ||
          etf.fund_provider.toLowerCase().includes(searchLower);
        
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
        // Rating filter - use database rating if available, fallback to calculated
        if (advancedFilters.minRating > 0) {
          const rating = etf.rating || calculateETFRating(etf).rating;
          if (rating < advancedFilters.minRating) {
            return false;
          }
        }
        return true;
      })
      .filter(etf => {
        // Filter out leveraged ETFs if not included
        if (!advancedFilters.includeLeveragedETFs && etf.is_leveraged) {
          return false;
        }
        return true;
      })
      .filter(etf => {
        const { distributionPolicy, indexName, fundCurrency, maxTer, replicationMethod, fundSizeRange, region, terRange, fundSizeRangeValues, dividendYieldRange } = advancedFilters;
        const distPolicyMatch = distributionPolicy === 'all' || etf.distribution_policy === distributionPolicy;
        const indexMatch = indexName === 'all' || etf.index_name === indexName;
        const currencyMatch = fundCurrency === 'all' || etf.fund_currency === fundCurrency;
        const terMatch = (etf.ter_numeric || 0) <= maxTer;
        const regionMatch = region === 'all' || etf.region === region;
        
        const terRangeMatch = (etf.ter_numeric || 0) >= terRange[0] && (etf.ter_numeric || 0) <= terRange[1];
        const fundSizeRangeMatch = !etf.fund_size_numeric || (etf.fund_size_numeric >= fundSizeRangeValues[0] && etf.fund_size_numeric <= fundSizeRangeValues[1]);
        const dividendYieldRangeMatch = !etf.dividend_yield_numeric || (etf.dividend_yield_numeric >= dividendYieldRange[0] && etf.dividend_yield_numeric <= dividendYieldRange[1]);
        
        const replicationMatch = replicationMethod === 'all' || etf.replication === replicationMethod;
        
        let fundSizeMatch = true;
        if (fundSizeRange !== 'all' && etf.fund_size_numeric) {
          const fundSizeInMillions = etf.fund_size_numeric;
          
          switch (fundSizeRange) {
            case 'small':
              fundSizeMatch = fundSizeInMillions < 100;
              break;
            case 'medium':
              fundSizeMatch = fundSizeInMillions >= 100 && fundSizeInMillions < 1000;
              break;
            case 'large':
              fundSizeMatch = fundSizeInMillions >= 1000 && fundSizeInMillions < 10000;
              break;
            case 'xlarge':
              fundSizeMatch = fundSizeInMillions >= 10000;
              break;
            default:
              fundSizeMatch = true;
          }
        }
        
        return distPolicyMatch && indexMatch && currencyMatch && terMatch && replicationMatch && fundSizeMatch && regionMatch && terRangeMatch && fundSizeRangeMatch && dividendYieldRangeMatch;
      })
      .sort((a, b) => {
        let aValue: any = a[sortBy as keyof ETFListItem];
        let bValue: any = b[sortBy as keyof ETFListItem];
        
        if (sortBy === 'ter_numeric') {
          const aTer = aValue || 0;
          const bTer = bValue || 0;
          
          if (aTer === 0 && bTer !== 0) {
            return sortOrder === 'asc' ? 1 : -1;
          }
          if (bTer === 0 && aTer !== 0) {
            return sortOrder === 'asc' ? -1 : 1;
          }
          if (aTer === 0 && bTer === 0) {
            return 0;
          }
          
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
    
    return result;
  }, [etfs, searchTerm, activeCategory, advancedFilters, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredETFs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedETFs = filteredETFs.slice(startIndex, endIndex);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleAdvancedFilterChange = (key: keyof AdvancedFiltersState, value: AdvancedFilterValue) => {
    console.log(`🔄 Filter change: ${key} = ${value}`);
    setAdvancedFilters(prevFilters => {
      const newFilters = {...prevFilters, [key]: value};
      console.log('🔄 New filters:', newFilters);
      return newFilters;
    });
    setCurrentPage(1);
  };

  const handleMinRatingChange = (value: number) => {
    setMinRating(value);
    setCurrentPage(1);
  };

  return {
    searchTerm,
    sortBy,
    sortOrder,
    currentPage,
    minRating,
    advancedFilters,
    paginatedETFs,
    filteredETFs,
    totalPages,
    itemsPerPage,
    categories,
    activeCategory,
    startIndex,
    endIndex,
    ranges,
    handleSort,
    handleSearch,
    handleCategoryChange,
    setCurrentPage,
    handleAdvancedFilterChange,
    handleMinRatingChange
  };
};