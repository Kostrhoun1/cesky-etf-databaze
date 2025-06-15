
import { useState, useMemo, useEffect } from 'react';
import { ETFListItem } from '@/types/etf';

export interface AdvancedFiltersState {
  distributionPolicy: string;
  indexName: string;
  fundCurrency: string;
  maxTer: number;
}

export const useETFTableLogic = (etfs: ETFListItem[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  const initialMaxTer = etfs.length > 0 ? Math.max(...etfs.map(etf => etf.ter_numeric || 0), 1) : 1;
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFiltersState>({
    distributionPolicy: 'all',
    indexName: 'all',
    fundCurrency: 'all',
    maxTer: initialMaxTer,
  });

  const categories = useMemo(() => 
    [...new Set(etfs.map(etf => etf.category).filter(Boolean))].sort(),
  [etfs]);

  const activeCategory = selectedCategory ?? (categories.includes('Akciové') ? 'Akciové' : categories[0] ?? '');

  useEffect(() => {
    if (etfs.length > 0) {
      const maxTerValue = Math.max(...etfs.map(etf => etf.ter_numeric || 0), 1);
      if (advancedFilters.maxTer > maxTerValue) {
        setAdvancedFilters(prev => ({ ...prev, maxTer: maxTerValue }));
      }
    }
  }, [etfs, advancedFilters.maxTer]);

  const filteredETFs = useMemo(() => etfs
    .filter(etf => {
      const searchLower = searchTerm.toLowerCase();
      
      const basicFieldsMatch = 
        etf.name.toLowerCase().includes(searchLower) ||
        etf.isin.toLowerCase().includes(searchLower) ||
        etf.fund_provider.toLowerCase().includes(searchLower);
      
      const tickerFieldsMatch = 
        (etf.primary_ticker && etf.primary_ticker.toLowerCase().includes(searchLower));
      
      return basicFieldsMatch || tickerFieldsMatch;
    })
    .filter(etf => etf.category === activeCategory)
    .filter(etf => {
      const { distributionPolicy, indexName, fundCurrency, maxTer } = advancedFilters;
      const distPolicyMatch = distributionPolicy === 'all' || etf.distribution_policy === distributionPolicy;
      const indexMatch = indexName === 'all' || etf.index_name === indexName;
      const currencyMatch = fundCurrency === 'all' || etf.fund_currency === fundCurrency;
      const terMatch = (etf.ter_numeric || 0) <= maxTer;
      return distPolicyMatch && indexMatch && currencyMatch && terMatch;
    })
    .sort((a, b) => {
      let aValue: any = a[sortBy as keyof ETFListItem];
      let bValue: any = b[sortBy as keyof ETFListItem];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    }), [etfs, searchTerm, activeCategory, advancedFilters, sortBy, sortOrder]);

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

  const handleAdvancedFilterChange = (key: keyof AdvancedFiltersState, value: any) => {
    setAdvancedFilters(prevFilters => ({...prevFilters, [key]: value}));
    setCurrentPage(1);
  };
  
  const handleSortByChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  return {
    searchTerm,
    sortBy,
    sortOrder,
    currentPage,
    advancedFilters,
    paginatedETFs,
    filteredETFs,
    totalPages,
    itemsPerPage,
    categories,
    activeCategory,
    startIndex,
    endIndex,
    handleSort,
    handleSearch,
    handleCategoryChange,
    setCurrentPage,
    handleAdvancedFilterChange,
    handleSortByChange
  };
};
