
import React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, ChevronUp, ChevronDown } from 'lucide-react';
import { ETFListItem } from '@/types/etf';
import { formatPercentage, formatTER } from '@/utils/csvParser';

interface ETFSearchTableProps {
  etfs: ETFListItem[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
  isLoading: boolean;
  onSelectETF?: (etf: ETFListItem) => void;
  isETFSelected?: (isin: string) => boolean;
  canAddMore?: boolean;
}

const ETFSearchTable: React.FC<ETFSearchTableProps> = ({
  etfs,
  sortBy,
  sortOrder,
  onSort,
  isLoading,
  onSelectETF,
  isETFSelected,
  canAddMore = true,
}) => {
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

  const handleSelectETF = (etf: ETFListItem) => {
    if (onSelectETF) {
      onSelectETF(etf);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-lg">Načítání ETF fondů...</p>
      </div>
    );
  }

  if (etfs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Žádné ETF fondy nenalezeny podle zadaných kritérií.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer hover:bg-gray-50 text-left"
              onClick={() => onSort('name')}
            >
              Název / ISIN
              {getSortIcon('name')}
            </TableHead>
            <TableHead
              className="text-right cursor-pointer hover:bg-gray-50"
              onClick={() => onSort('ter_numeric')}
            >
              TER
              {getSortIcon('ter_numeric')}
            </TableHead>
            <TableHead
              className="text-right cursor-pointer hover:bg-gray-50"
              onClick={() => onSort('return_1y')}
            >
              Výnos 1Y
              {getSortIcon('return_1y')}
            </TableHead>
            <TableHead
              className="text-right cursor-pointer hover:bg-gray-50"
              onClick={() => onSort('return_3y')}
            >
              Výnos 3Y
              {getSortIcon('return_3y')}
            </TableHead>
            <TableHead
              className="text-right cursor-pointer hover:bg-gray-50"
              onClick={() => onSort('return_5y')}
            >
              Výnos 5Y
              {getSortIcon('return_5y')}
            </TableHead>
            <TableHead className="text-left">Typ fondu</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {etfs.map((etf) => (
            <TableRow key={etf.isin} className="border-b hover:bg-gray-50">
              {/* Název / ISIN + Checkbox */}
              <TableCell className="p-3">
                <div className="flex items-start gap-3">
                  {onSelectETF && (
                    <div className="flex pt-1">
                      {isETFSelected && isETFSelected(etf.isin) ? (
                        <Checkbox checked={true} disabled />
                      ) : (
                        <Checkbox
                          checked={false}
                          disabled={!canAddMore}
                          onCheckedChange={() => handleSelectETF(etf)}
                          aria-label="Porovnat fond"
                        />
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
  );
};

export default ETFSearchTable;
