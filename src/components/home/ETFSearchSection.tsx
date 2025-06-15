
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ETFListItem } from '@/types/etf';
import { useETFData } from '@/hooks/useETFData';
import { useETFComparison } from '@/hooks/useETFComparison';
import ETFAdvancedFilters from '@/components/ETFAdvancedFilters';
import { AdvancedFiltersState } from '@/hooks/useETFTableLogic';
import ETFSearchHeader from './ETFSearchHeader';
import ETFSearchFilters from './ETFSearchFilters';
import ETFSearchTable from './ETFSearchTable';
import ETFComparisonPanel from '@/components/ETFComparisonPanel';
import ETFDetailedComparison from '@/components/ETFDetailedComparison';

const ETFSearchSection: React.FC = () => {
  const { fetchETFs, isLoading } = useETFData();
  const [etfs, setEtfs] = useState<ETFListItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [sortBy, setSortBy] = useState<string>('ter_numeric');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showDetailedComparison, setShowDetailedComparison] = useState(false);

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

  useEffect(() => {
    if (maxTerFromData > 1) {
      setAdvancedFilters(prev => ({ ...prev, maxTer: maxTerFromData }));
    }
  }, [maxTerFromData]);

  // Load all ETFs without limit
  useEffect(() => {
    const loadETFs = async () => {
      console.log('Loading all ETFs for search section...');
      try {
        const data = await fetchETFs(); // Remove the limit parameter
        console.log('Successfully loaded', data.length, 'ETFs for search section');
        setEtfs(data);
        
        // Debug: Show sample of ticker data
        console.log('=== Ticker Data Sample (first 10 ETFs) ===');
        data.slice(0, 10).forEach((etf, index) => {
          console.log(`ETF ${index + 1}:`, {
            name: etf.name,
            isin: etf.isin,
            primary_ticker: etf.primary_ticker,
            exchange_1_ticker: etf.exchange_1_ticker,
            exchange_2_ticker: etf.exchange_2_ticker,
            exchange_3_ticker: etf.exchange_3_ticker,
            exchange_4_ticker: etf.exchange_4_ticker,
            exchange_5_ticker: etf.exchange_5_ticker,
          });
        });
        
        // Debug: Look for any ticker containing "SXR"
        console.log('=== ETFs with SXR in ticker ===');
        const sxrETFs = data.filter(etf => {
          const hasSXR = 
            (etf.primary_ticker && etf.primary_ticker.toLowerCase().includes('sxr')) ||
            (etf.exchange_1_ticker && etf.exchange_1_ticker.toLowerCase().includes('sxr')) ||
            (etf.exchange_2_ticker && etf.exchange_2_ticker.toLowerCase().includes('sxr')) ||
            (etf.exchange_3_ticker && etf.exchange_3_ticker.toLowerCase().includes('sxr')) ||
            (etf.exchange_4_ticker && etf.exchange_4_ticker.toLowerCase().includes('sxr')) ||
            (etf.exchange_5_ticker && etf.exchange_5_ticker.toLowerCase().includes('sxr'));
          return hasSXR;
        });
        console.log('Found', sxrETFs.length, 'ETFs with SXR in ticker');
        sxrETFs.forEach(etf => {
          console.log('SXR ETF:', {
            name: etf.name,
            isin: etf.isin,
            primary_ticker: etf.primary_ticker,
            exchange_1_ticker: etf.exchange_1_ticker,
            exchange_2_ticker: etf.exchange_2_ticker,
            exchange_3_ticker: etf.exchange_3_ticker,
            exchange_4_ticker: etf.exchange_4_ticker,
            exchange_5_ticker: etf.exchange_5_ticker,
          });
        });
        
      } catch (error) {
        console.error('Error loading ETFs for search section:', error);
      }
    };

    loadETFs();
  }, [fetchETFs]);

  const categories = useMemo(() => 
    [...new Set(etfs.map(etf => etf.category).filter(Boolean))].sort(),
  [etfs]);

  const activeCategory = selectedCategory ?? (categories.includes('Akciové') ? 'Akciové' : categories[0] ?? '');

  const filteredETFs = useMemo(() => {
    console.log('=== ETFSearchSection Filtering Debug ===');
    console.log('Search term:', searchTerm);
    console.log('Total ETFs in search section:', etfs.length);
    console.log('Active category:', activeCategory);

    // Pokud hledáme SXR8, najdeme všechny ETF s tímto tickerem
    if (searchTerm.toLowerCase() === 'sxr8') {
      console.log('Searching for SXR8 in ETFSearchSection...');
      const sxr8ETFs = etfs.filter(etf => {
        const hasSXR8 = 
          (etf.primary_ticker && etf.primary_ticker.toLowerCase().includes('sxr8')) ||
          (etf.exchange_1_ticker && etf.exchange_1_ticker.toLowerCase().includes('sxr8')) ||
          (etf.exchange_2_ticker && etf.exchange_2_ticker.toLowerCase().includes('sxr8')) ||
          (etf.exchange_3_ticker && etf.exchange_3_ticker.toLowerCase().includes('sxr8')) ||
          (etf.exchange_4_ticker && etf.exchange_4_ticker.toLowerCase().includes('sxr8')) ||
          (etf.exchange_5_ticker && etf.exchange_5_ticker.toLowerCase().includes('sxr8'));
        
        if (hasSXR8) {
          console.log('Found ETF with SXR8 in search section:', {
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
      console.log('ETFs with SXR8 ticker in search section:', sxr8ETFs.length);
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
          (etf.exchange_4_ticker && etf.exchange_4_ticker.toLowerCase().includes(searchLower)) ||
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

  const topETFs = filteredETFs.slice(0, 10);

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
        <ETFSearchHeader filteredCount={filteredETFs.length} totalCount={etfs.length} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      ETF Fondy
                      <Badge variant="secondary">{filteredETFs.length} fondů</Badge>
                      {etfs.length > filteredETFs.length && (
                        <Badge variant="outline">z {etfs.length} celkem</Badge>
                      )}
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      Přehled nejlepších ETF fondů s detailními informacemi
                    </p>
                  </div>
                </div>

                <ETFSearchFilters
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  categories={categories}
                  activeCategory={activeCategory}
                  onCategoryChange={handleCategoryChange}
                />

                <ETFSearchTable
                  etfs={topETFs}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                  isLoading={isLoading}
                  onSelectETF={addETFToComparison}
                  isETFSelected={isETFSelected}
                  canAddMore={canAddMore}
                />
              </CardContent>
            </Card>
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
    </section>
  );
};

export default ETFSearchSection;
