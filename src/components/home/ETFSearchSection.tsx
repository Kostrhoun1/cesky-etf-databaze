
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import { ETFListItem } from '@/types/etf';
import { useETFData } from '@/hooks/useETFData';
import { formatPercentage } from '@/utils/csvParser';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ETFAdvancedFilters from '@/components/ETFAdvancedFilters';
import { AdvancedFiltersState } from '@/hooks/useETFTableLogic';

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

  const getSortIcon = (field: string) => {
    if (sortBy === field) {
      return sortOrder === 'asc' ? 
        <TrendingUp className="inline ml-1 h-4 w-4" /> : 
        <TrendingDown className="inline ml-1 h-4 w-4" />;
    }
    return null;
  };

  const getReturnColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return '';
  };

  const getDistributionPolicyLabel = (policy: string) => {
    if (policy === 'Accumulating') return 'Akumulační';
    if (policy === 'Distributing') return 'Distribuční';
    return policy || '-';
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Najděte nejlepší ETF fondy
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Prozkoumejte naši databázi ETF fondů s pokročilými filtry a detailními informacemi o výkonnosti
          </p>
        </div>

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

                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Hledat podle názvu, ISIN, poskytovatele nebo tickeru..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {categories.length > 0 && (
                  <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full mb-6">
                    <TabsList className={`grid w-full ${categories.length <= 3 ? 'grid-cols-3' : categories.length <= 4 ? 'grid-cols-4' : categories.length <= 5 ? 'grid-cols-5' : 'grid-cols-6'}`}>
                      {categories.map(category => (
                        <TabsTrigger key={category} value={category} className="text-xs lg:text-sm px-2 py-2">{category}</TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                )}

                {isLoading ? (
                  <div className="text-center py-8">
                    <p className="text-lg">Načítání ETF fondů...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th 
                            className="text-left p-3 cursor-pointer hover:bg-gray-50"
                            onClick={() => handleSort('name')}
                          >
                            Název / ISIN
                            {getSortIcon('name')}
                          </th>
                          <th 
                            className="text-right p-3 cursor-pointer hover:bg-gray-50"
                            onClick={() => handleSort('ter_numeric')}
                          >
                            TER
                            {getSortIcon('ter_numeric')}
                          </th>
                          <th 
                            className="text-right p-3 cursor-pointer hover:bg-gray-50"
                            onClick={() => handleSort('return_ytd')}
                          >
                            YTD výnos
                            {getSortIcon('return_ytd')}
                          </th>
                          <th 
                            className="text-right p-3 cursor-pointer hover:bg-gray-50"
                            onClick={() => handleSort('return_1y')}
                          >
                            Výnos 1Y
                            {getSortIcon('return_1y')}
                          </th>
                          <th>Typ fondu</th>
                          <th>Sledovaný index</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topETFs.map((etf) => (
                          <tr key={etf.isin} className="border-b hover:bg-gray-50">
                            <td className="p-3">
                              <div>
                                <div className="font-medium">{etf.name}</div>
                                <div className="text-sm text-gray-500">{etf.isin}</div>
                                {etf.primary_ticker && (
                                  <div className="text-xs text-blue-600">{etf.primary_ticker}</div>
                                )}
                                {etf.degiro_free && (
                                  <div className="mt-1">
                                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                      DEGIRO Free
                                    </Badge>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="p-3 text-right">
                              {formatPercentage(etf.ter_numeric)}
                            </td>
                            <td className={`p-3 text-right ${getReturnColor(etf.return_ytd)}`}>
                              {etf.return_ytd ? formatPercentage(etf.return_ytd) : '-'}
                            </td>
                            <td className={`p-3 text-right ${getReturnColor(etf.return_1y)}`}>
                              {etf.return_1y ? formatPercentage(etf.return_1y) : '-'}
                            </td>
                            <td className="p-3">
                              <Badge variant="outline" className="text-xs">
                                {getDistributionPolicyLabel(etf.distribution_policy)}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm text-gray-600">
                              {etf.index_name || '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {!isLoading && filteredETFs.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Žádné ETF fondy nenalezeny podle zadaných kritérií.
                  </div>
                )}
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
