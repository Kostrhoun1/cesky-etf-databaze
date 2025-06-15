
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ETFListItem } from '@/types/etf';
import { AdvancedFiltersState } from '@/hooks/useETFTableLogic';
import ETFAdvancedFilters from '@/components/ETFAdvancedFilters';
import ETFSearchFilters from './ETFSearchFilters';
import ETFSearchTable from './ETFSearchTable';

interface ETFSearchInterfaceProps {
  etfs: ETFListItem[];
  filteredETFs: ETFListItem[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (value: string) => void;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
  isLoading: boolean;
  advancedFilters: AdvancedFiltersState;
  onAdvancedFilterChange: (key: keyof AdvancedFiltersState, value: any) => void;
  onSelectETF?: (etf: ETFListItem) => void;
  isETFSelected?: (isin: string) => boolean;
  canAddMore?: boolean;
}

const ETFSearchInterface: React.FC<ETFSearchInterfaceProps> = ({
  etfs,
  filteredETFs,
  searchTerm,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange,
  sortBy,
  sortOrder,
  onSort,
  isLoading,
  advancedFilters,
  onAdvancedFilterChange,
  onSelectETF,
  isETFSelected,
  canAddMore,
}) => {
  const topETFs = filteredETFs.slice(0, 10);

  return (
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
              onSearchChange={onSearchChange}
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={onCategoryChange}
            />

            <ETFSearchTable
              etfs={topETFs}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={onSort}
              isLoading={isLoading}
              onSelectETF={onSelectETF}
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
          onFilterChange={onAdvancedFilterChange}
        />
      </div>
    </div>
  );
};

export default ETFSearchInterface;
