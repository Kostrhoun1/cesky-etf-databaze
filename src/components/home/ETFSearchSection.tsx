
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ETFListItem } from '@/types/etf';
import { useETFData } from '@/hooks/useETFData';
import ETFAdvancedFilters from '@/components/ETFAdvancedFilters';
import { AdvancedFiltersState } from '@/hooks/useETFTableLogic';
import ETFSearchHeader from './ETFSearchHeader';
import ETFSearchFilters from './ETFSearchFilters';
import ETFSearchTable from './ETFSearchTable';

const ETFSearchSection: React.FC = () => {
  const { fetchETFs, isLoading } = useETFData();
  const [etfs, setEtfs] = useState<ETFListItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [sortBy, setSortBy] = useState<string>('fund_size_numeric');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

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

  // Load ETFs only once when component mounts
  useEffect(() => {
    const loadETFs = async () => {
      console.log('Loading ETFs for search section...');
      try {
        const data = await fetchETFs(200); // Limit to 200 for homepage
        console.log('Successfully loaded', data.length, 'ETFs for search section');
        setEtfs(data);
      } catch (error) {
        console.error('Error loading ETFs for search section:', error);
      }
    };

    loadETFs();
  }, [fetchETFs]); // Only depend on fetchETFs which is now memoized

  const categories = useMemo(() => 
    [...new Set(etfs.map(etf => etf.category).filter(Boolean))].sort(),
  [etfs]);

  const activeCategory = selectedCategory ?? (categories.includes('Akciové') ? 'Akciové' : categories[0] ?? '');

  const filteredETFs = useMemo(() => {
    return etfs
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
      </div>
    </section>
  );
};

export default ETFSearchSection;
