
import React, { useState, useMemo } from 'react';
import { ETFListItem } from '@/types/etf';
import ETFTableFilters from './ETFTableFilters';
import ETFTablePagination from './ETFTablePagination';
import { useETFTableLogic } from '@/hooks/useETFTableLogic';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import { ChevronUp, ChevronDown, Loader2 } from 'lucide-react';
import { formatPercentage, formatTER } from '@/utils/csvParser';

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

  const getSortIcon = (field: string) => {
    if (sortBy === field) {
      return sortOrder === 'asc' ?
        <ChevronUp className="inline ml-1 h-4 w-4" /> :
        <ChevronDown className="inline ml-1 h-4 w-4" />;
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

  const formatFundSize = (size: number) => {
    if (!size) return '-';
    
    // Převést vše na miliardy EUR
    // Předpokládáme, že hodnoty jsou v EUR (nebo milionech EUR)
    let sizeInBillions;
    
    if (size >= 1000000000) {
      // Hodnota je pravděpodobně v jednotkách EUR
      sizeInBillions = size / 1000000000;
    } else if (size >= 1000) {
      // Hodnota je pravděpodobně v tisících nebo milionech EUR
      sizeInBillions = size / 1000000;
    } else {
      // Hodnota je už pravděpodobně v miliardách nebo je velmi malá
      sizeInBillions = size;
    }
    
    return sizeInBillions.toFixed(2);
  };

  return (
    <div className="space-y-6">
      <ETFTableFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
      />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50 text-left"
                  onClick={() => handleSort('name')}
                >
                  Název / ISIN
                  {getSortIcon('name')}
                </TableHead>
                <TableHead
                  className="text-right cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('ter_numeric')}
                >
                  TER
                  {getSortIcon('ter_numeric')}
                </TableHead>
                <TableHead
                  className="text-right cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('return_1y')}
                >
                  Výnos 1Y
                  {getSortIcon('return_1y')}
                </TableHead>
                <TableHead
                  className="text-right cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('return_3y')}
                >
                  Výnos 3Y
                  {getSortIcon('return_3y')}
                </TableHead>
                <TableHead
                  className="text-right cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('return_5y')}
                >
                   Výnos 5Y
                   {getSortIcon('return_5y')}
                 </TableHead>
                 <TableHead
                   className="text-right cursor-pointer hover:bg-gray-50"
                   onClick={() => handleSort('fund_size_numeric')}
                 >
                   Velikost fondu (mld EUR)
                   {getSortIcon('fund_size_numeric')}
                 </TableHead>
                 <TableHead className="text-left">Typ fondu</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedETFs.map((etf) => (
                <TableRow key={etf.isin} className="border-b hover:bg-gray-50">
                  <TableCell className="p-3">
                    <div className="flex items-start gap-3">
                      {onSelectETF && (
                        <div className="flex pt-1">
                          {isETFSelected && isETFSelected(etf.isin) ? (
                            <Checkbox checked={true} disabled />
                          ) : (
                            <Checkbox
                              checked={false}
                              disabled={!canAddMore || loadingETF === etf.isin}
                              onCheckedChange={() => handleSelectETF(etf)}
                              aria-label="Porovnat fond"
                            />
                          )}
                          {loadingETF === etf.isin && (
                            <Loader2 className="h-4 w-4 animate-spin ml-2" />
                          )}
                        </div>
                      )}
                      <div>
                        <div className="font-medium">
                          <Link
                            to={`/etf/${etf.isin}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {etf.name}
                          </Link>
                        </div>
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
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono p-3">
                    {formatTER(etf.ter_numeric)}
                  </TableCell>
                  <TableCell className={`p-3 text-right ${getReturnColor(etf.return_1y)}`}>
                    {etf.return_1y ? formatPercentage(etf.return_1y) : '-'}
                  </TableCell>
                  <TableCell className={`p-3 text-right ${getReturnColor(etf.return_3y)}`}>
                    {etf.return_3y ? formatPercentage(etf.return_3y) : '-'}
                  </TableCell>
                   <TableCell className={`p-3 text-right ${getReturnColor(etf.return_5y)}`}>
                     {etf.return_5y ? formatPercentage(etf.return_5y) : '-'}
                   </TableCell>
                   <TableCell className="text-right font-mono p-3 text-sm">
                     {formatFundSize(etf.fund_size_numeric)}
                   </TableCell>
                   <TableCell className="p-3">
                     <Badge variant="outline" className="text-xs">
                       {getDistributionPolicyLabel(etf.distribution_policy)}
                     </Badge>
                   </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
