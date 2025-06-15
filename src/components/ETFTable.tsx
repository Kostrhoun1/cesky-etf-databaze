
import React, { useState, useMemo } from 'react';
import { ETFListItem } from '@/types/etf';
import ETFTableHeader from './ETFTableHeader';
import ETFTableRow from './ETFTableRow';
import ETFTableFilters from './ETFTableFilters';
import ETFTablePagination from './ETFTablePagination';
import { useETFTableLogic } from '@/hooks/useETFTableLogic';

interface ETFTableProps {
  etfs: ETFListItem[];
  onSelectETF?: (etf: ETFListItem) => Promise<boolean>;
  isETFSelected?: (isin: string) => boolean;
  canAddMore?: boolean;
}

const ETFTable: React.FC<ETFTableProps> = ({
  etfs,
  onSelectETF,
  isETFSelected,
  canAddMore = true,
}) => {
  const [loadingETF, setLoadingETF] = useState<string | null>(null);

  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    handleSearch,
    sortBy,
    sortOrder,
    handleSort,
    searchTerm,
    filteredETFs,
    totalPages,
    paginatedETFs,
  } = useETFTableLogic(etfs);

  const handleSelectETF = async (etf: ETFListItem) => {
    if (!onSelectETF) return;
    
    setLoadingETF(etf.isin);
    try {
      await onSelectETF(etf);
    } finally {
      setLoadingETF(null);
    }
  };

  return (
    <div className="space-y-6">
      <ETFTableFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
      />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <ETFTableHeader 
              sortBy={sortBy} 
              sortOrder={sortOrder} 
              onSort={handleSort} 
            />
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedETFs.map((etf) => (
                <ETFTableRow
                  key={etf.isin}
                  etf={etf}
                  onSelect={onSelectETF ? () => handleSelectETF(etf) : undefined}
                  isSelected={isETFSelected ? isETFSelected(etf.isin) : false}
                  canAddMore={canAddMore}
                  isLoading={loadingETF === etf.isin}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ETFTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ETFTable;
