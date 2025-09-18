
import React, { useState, useMemo, memo } from 'react';
import { ETFListItem } from '@/types/etf';
import ETFTableFilters from './ETFTableFilters';
import ETFTablePagination from './ETFTablePagination';
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

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>('ter_numeric');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 50;

  // Sort and paginate the already filtered ETFs
  const sortedETFs = useMemo(() => {
    return etfs
      .filter(etf => {
        const searchLower = searchTerm.toLowerCase();
        return etf.name.toLowerCase().includes(searchLower) ||
               etf.isin.toLowerCase().includes(searchLower) ||
               etf.fund_provider.toLowerCase().includes(searchLower);
      })
      .sort((a, b) => {
        let aValue: any = a[sortBy as keyof ETFListItem];
        let bValue: any = b[sortBy as keyof ETFListItem];
        
        if (sortBy === 'ter_numeric') {
          const aTer = aValue || 0;
          const bTer = bValue || 0;
          
          if (aTer === 0 && bTer !== 0) {
            return sortOrder === 'asc' ? 1 : -1;
          }
          if (bTer === 0 && aTer !== 0) {
            return sortOrder === 'asc' ? -1 : 1;
          }
          if (aTer === 0 && bTer === 0) {
            return 0;
          }
          
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
  }, [etfs, searchTerm, sortBy, sortOrder]);

  const totalPages = Math.ceil(sortedETFs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedETFs = sortedETFs.slice(startIndex, endIndex);

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
    
    // Data jsou už v milionech EUR podle uživatele
    return size.toLocaleString('cs-CZ', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
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
                  onClick={() => handleSort('return_ytd')}
                >
                  Výnos YTD
                  {getSortIcon('return_ytd')}
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
                   Velikost fondu (mil EUR)
                   {getSortIcon('fund_size_numeric')}
                 </TableHead>
                 <TableHead
                   className="text-right cursor-pointer hover:bg-gray-50"
                   onClick={() => handleSort('current_dividend_yield_numeric')}
                 >
                   Dividendový výnos
                   {getSortIcon('current_dividend_yield_numeric')}
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
                  <TableCell className={`p-3 text-right ${getReturnColor(etf.return_ytd)}`}>
                    {etf.return_ytd ? formatPercentage(etf.return_ytd) : '-'}
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
                   <TableCell className="text-right font-mono p-3">
                     {etf.current_dividend_yield_numeric ? formatPercentage(etf.current_dividend_yield_numeric) : '-'}
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

export default memo(ETFTable);
