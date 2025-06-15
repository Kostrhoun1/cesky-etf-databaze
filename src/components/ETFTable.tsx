
import React, { useState, useEffect } from 'react';
import { ETFListItem } from '@/types/etf';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import ETFTableFilters from './ETFTableFilters';
import ETFTableHeader from './ETFTableHeader';
import ETFTableRow from './ETFTableRow';
import ETFTablePagination from './ETFTablePagination';
import ETFAdvancedFilters from './ETFAdvancedFilters';

interface ETFTableProps {
  etfs: ETFListItem[];
  onRefresh?: () => void;
}

const ETFTable: React.FC<ETFTableProps> = ({ etfs, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  const initialMaxTer = etfs.length > 0 ? Math.max(...etfs.map(etf => etf.ter_numeric || 0), 1) : 1;
  const [advancedFilters, setAdvancedFilters] = useState({
    distributionPolicy: 'all',
    indexName: 'all',
    fundCurrency: 'all',
    maxTer: initialMaxTer,
  });

  useEffect(() => {
    if (etfs.length > 0) {
      const maxTerValue = Math.max(...etfs.map(etf => etf.ter_numeric || 0), 1);
      // Reset maxTer only if it's out of bounds from the new data
      if (advancedFilters.maxTer > maxTerValue) {
        setAdvancedFilters(prev => ({ ...prev, maxTer: maxTerValue }));
      }
    }
  }, [etfs, advancedFilters.maxTer]);

  // Debug: Log TER values when component receives new ETFs
  useEffect(() => {
    if (etfs.length > 0) {
      console.log('ETFTable received ETFs. Sample TER values:', 
        etfs.slice(0, 5).map(etf => ({
          name: etf.name,
          ter_numeric: etf.ter_numeric,
          typeof_ter_numeric: typeof etf.ter_numeric
        }))
      );
      
      // Check if any ETF has non-zero TER
      const nonZeroTER = etfs.filter(etf => etf.ter_numeric && etf.ter_numeric > 0);
      console.log(`Found ${nonZeroTER.length} ETFs with non-zero TER out of ${etfs.length} total`);
      
      if (nonZeroTER.length > 0) {
        console.log('Examples of non-zero TER:', 
          nonZeroTER.slice(0, 3).map(etf => ({
            name: etf.name,
            ter_numeric: etf.ter_numeric
          }))
        );
      }
    }
  }, [etfs]);

  // Get unique categories
  const categories = [...new Set(etfs.map(etf => etf.category).filter(Boolean))];

  // Filter and sort ETFs
  const filteredETFs = etfs
    .filter(etf => {
      const searchLower = searchTerm.toLowerCase();
      
      // Search in basic fields
      const basicFieldsMatch = 
        etf.name.toLowerCase().includes(searchLower) ||
        etf.isin.toLowerCase().includes(searchLower) ||
        etf.fund_provider.toLowerCase().includes(searchLower);
      
      // Search in ticker fields
      const tickerFieldsMatch = 
        (etf.primary_ticker && etf.primary_ticker.toLowerCase().includes(searchLower));
      
      return basicFieldsMatch || tickerFieldsMatch;
    })
    .filter(etf => categoryFilter === 'all' || etf.category === categoryFilter)
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

  // Pagination calculations
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
    setCurrentPage(1); // Reset to first page when sorting
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  ETF Fondy
                  <Badge variant="secondary">{filteredETFs.length} fondů</Badge>
                  {etfs.length > filteredETFs.length && (
                    <Badge variant="outline">z {etfs.length} celkem</Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Přehled ETF fondů s detailními informacemi o výkonnosti a složení
                </CardDescription>
              </div>
            </div>
            
            <ETFTableFilters
              searchTerm={searchTerm}
              categoryFilter={categoryFilter}
              sortBy={sortBy}
              categories={categories}
              onSearchChange={handleSearch}
              onCategoryFilterChange={handleCategoryFilter}
              onSortByChange={setSortBy}
            />

            {/* Pagination info */}
            {filteredETFs.length > itemsPerPage && (
              <div className="text-sm text-muted-foreground mt-4">
                Zobrazeno {startIndex + 1}-{Math.min(endIndex, filteredETFs.length)} z {filteredETFs.length} fondů
              </div>
            )}
          </CardHeader>
          
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <ETFTableHeader
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <TableBody>
                  {paginatedETFs.map((etf) => (
                    <ETFTableRow key={etf.isin} etf={etf} />
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <ETFTablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
            
            {filteredETFs.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
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
          onFilterChange={setAdvancedFilters}
        />
      </div>
    </div>
  );
};

export default ETFTable;
