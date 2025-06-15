
import React from 'react';
import { ETFListItem } from '@/types/etf';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import ETFTableFilters from './ETFTableFilters';
import ETFTableHeader from './ETFTableHeader';
import ETFTableRow from './ETFTableRow';
import ETFTablePagination from './ETFTablePagination';
import ETFAdvancedFilters from './ETFAdvancedFilters';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useETFTableLogic } from '@/hooks/useETFTableLogic';

interface ETFTableProps {
  etfs: ETFListItem[];
  onRefresh?: () => void;
}

const ETFTable: React.FC<ETFTableProps> = ({ etfs, onRefresh }) => {
  const {
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
  } = useETFTableLogic(etfs);

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
            
            {categories.length > 0 && (
              <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full mt-4">
                <TabsList>
                  {categories.map(category => (
                    <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            )}

            <ETFTableFilters
              searchTerm={searchTerm}
              sortBy={sortBy}
              onSearchChange={handleSearch}
              onSortByChange={handleSortByChange}
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
          onFilterChange={handleAdvancedFilterChange}
        />
      </div>
    </div>
  );
};

export default ETFTable;
