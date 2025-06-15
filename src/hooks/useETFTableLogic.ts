
import { useState, useMemo, useEffect } from 'react';
import { ETFListItem } from '@/types/etf';

export interface AdvancedFiltersState {
  distributionPolicy: string;
  indexName: string;
  fundCurrency: string;
  maxTer: number;
  replicationMethod: string;
  fundSizeRange: string;
}

export const useETFTableLogic = (etfs: ETFListItem[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [sortBy, setSortBy] = useState<string>('ter_numeric');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  const initialMaxTer = etfs.length > 0 ? Math.max(...etfs.map(etf => etf.ter_numeric || 0), 1) : 1;
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFiltersState>({
    distributionPolicy: 'all',
    indexName: 'all',
    fundCurrency: 'all',
    maxTer: initialMaxTer,
    replicationMethod: 'all',
    fundSizeRange: 'all',
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

  const filteredETFs = useMemo(() => {
    console.log('=== ETF Filtering Debug ===');
    console.log('Search term:', searchTerm);
    console.log('Total ETFs:', etfs.length);
    console.log('Active category:', activeCategory);

    // Pokud hledáme konkrétní ISIN, přidáme debug informace
    if (searchTerm.toLowerCase() === 'bg9000011163') {
      console.log('=== SEARCHING FOR SPECIFIC ISIN: BG9000011163 ===');
      const foundETF = etfs.find(etf => etf.isin.toLowerCase() === 'bg9000011163');
      if (foundETF) {
        console.log('Found ETF with ISIN BG9000011163:', {
          name: foundETF.name,
          isin: foundETF.isin,
          category: foundETF.category,
          fund_provider: foundETF.fund_provider
        });
      } else {
        console.log('ETF with ISIN BG9000011163 NOT FOUND in database');
        console.log('All available ISINs (first 10):', etfs.slice(0, 10).map(etf => etf.isin));
      }
    }

    // Pokud hledáme SXR8, najdeme všechny ETF s tímto tickerem
    if (searchTerm.toLowerCase() === 'sxr8') {
      console.log('Searching for SXR8 specifically...');
      const sxr8ETFs = etfs.filter(etf => {
        const hasSXR8 = 
          (etf.primary_ticker && etf.primary_ticker.toLowerCase().includes('sxr8')) ||
          (etf.exchange_1_ticker && etf.exchange_1_ticker.toLowerCase().includes('sxr8')) ||
          (etf.exchange_2_ticker && etf.exchange_2_ticker.toLowerCase().includes('sxr8')) ||
          (etf.exchange_3_ticker && etf.exchange_3_ticker.toLowerCase().includes('sxr8')) ||
          (etf.exchange_4_ticker && etf.exchange_4_ticker.toLowerCase().includes('sxr8')) ||
          (etf.exchange_5_ticker && etf.exchange_5_ticker.toLowerCase().includes('sxr8'));
        
        if (hasSXR8) {
          console.log('Found ETF with SXR8:', {
            name: etf.name,
            isin: etf.isin,
            category: etf.category,
            primary_ticker: etf.primary_ticker,
            exchange_1_ticker: etf.exchange_1_ticker,
            exchange_2_ticker: etf.exchange_2_ticker,
            exchange_3_ticker: etf.exchange_3_ticker,
            exchange_4_ticker: etf.exchange_4_ticker,
            exchange_5_ticker: etf.exchange_5_ticker,
          });
        }
        
        return hasSXR8;
      });
      console.log('ETFs with SXR8 ticker:', sxr8ETFs.length);
    }

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
          (etf.exchange_4_ticker && etf.exchange_4_ticker.toLowerCase().includes('sxr8')) ||
          (etf.exchange_5_ticker && etf.exchange_5_ticker.toLowerCase().includes(searchLower));
        
        return basicFieldsMatch || tickerFieldsMatch;
      })
      .filter(etf => etf.category === activeCategory)
      .filter(etf => {
        const { distributionPolicy, indexName, fundCurrency, maxTer, replicationMethod, fundSizeRange } = advancedFilters;
        const distPolicyMatch = distributionPolicy === 'all' || etf.distribution_policy === distributionPolicy;
        const indexMatch = indexName === 'all' || etf.index_name === indexName;
        const currencyMatch = fundCurrency === 'all' || etf.fund_currency === fundCurrency;
        const terMatch = (etf.ter_numeric || 0) <= maxTer;
        
        // Replication method filter
        const replicationMatch = replicationMethod === 'all' || etf.replication === replicationMethod;
        
        // Fund size filter
        let fundSizeMatch = true;
        if (fundSizeRange !== 'all' && etf.fund_size_numeric) {
          const sizeInMillions = etf.fund_size_numeric / 1000000; // Convert to millions
          switch (fundSizeRange) {
            case 'small':
              fundSizeMatch = sizeInMillions < 100;
              break;
            case 'medium':
              fundSizeMatch = sizeInMillions >= 100 && sizeInMillions < 1000;
              break;
            case 'large':
              fundSizeMatch = sizeInMillions >= 1000 && sizeInMillions < 10000;
              break;
            case 'xlarge':
              fundSizeMatch = sizeInMillions >= 10000;
              break;
            default:
              fundSizeMatch = true;
          }
        }
        
        return distPolicyMatch && indexMatch && currencyMatch && terMatch && replicationMatch && fundSizeMatch;
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
    handleAdvancedFilterChange
  };
};
