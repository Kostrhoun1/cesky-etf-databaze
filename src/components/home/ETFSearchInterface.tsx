import React from 'react';
import { ETFListItem } from '@/types/etf';
import { AdvancedFiltersState, AdvancedFilterValue } from '@/hooks/useETFTableLogic';

interface ETFSearchInterfaceProps {
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
  handleAdvancedFilterChange: (key: keyof AdvancedFiltersState, value: AdvancedFilterValue) => void;
  selectedETFs: ETFListItem[];
  onAddETF: (etf: ETFListItem) => void;
  onRemoveETF: (isin: string) => void;
  isETFSelected: (isin: string) => boolean;
  canAddMore: boolean;
  onShowDetailedComparison: () => void;
  isHomepage?: boolean;
}

const ETFSearchInterface: React.FC<ETFSearchInterfaceProps> = ({
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
  selectedETFs,
  onAddETF,
  onRemoveETF,
  isETFSelected,
  canAddMore,
  onShowDetailedComparison,
  isHomepage = false,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center py-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          ETF Vyhledávání
        </h3>
        <p className="text-gray-600 mb-4">
          Nalezeno {filteredETFs.length} ETF fondů v kategorii {activeCategory}
        </p>
        <p className="text-sm text-gray-500">
          Vyhledávací term: "{searchTerm}"
        </p>
        
        {/* Jednoduchý seznam prvních 5 ETF */}
        <div className="mt-8 space-y-4 max-w-2xl mx-auto">
          {filteredETFs.slice(0, 5).map(etf => (
            <div key={etf.isin} className="bg-white p-4 rounded-lg shadow border">
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">{etf.name}</h4>
                <p className="text-sm text-gray-500">{etf.isin} | {etf.fund_provider}</p>
                <div className="mt-2 flex justify-between text-sm">
                  <span>TER: {etf.ter_numeric ? `${(etf.ter_numeric * 100).toFixed(2)}%` : 'N/A'}</span>
                  <span>Velikost: {etf.fund_size_numeric ? `${etf.fund_size_numeric.toLocaleString()} M€` : 'N/A'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ETFSearchInterface;