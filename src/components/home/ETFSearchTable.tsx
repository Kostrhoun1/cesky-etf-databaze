
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { ETFListItem } from '@/types/etf';
import { formatPercentage } from '@/utils/csvParser';

interface ETFSearchTableProps {
  etfs: ETFListItem[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
  isLoading: boolean;
}

const ETFSearchTable: React.FC<ETFSearchTableProps> = ({
  etfs,
  sortBy,
  sortOrder,
  onSort,
  isLoading
}) => {
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
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th 
              className="text-left p-3 cursor-pointer hover:bg-gray-50"
              onClick={() => onSort('name')}
            >
              Název / ISIN
              {getSortIcon('name')}
            </th>
            <th 
              className="text-right p-3 cursor-pointer hover:bg-gray-50"
              onClick={() => onSort('ter_numeric')}
            >
              TER
              {getSortIcon('ter_numeric')}
            </th>
            <th 
              className="text-right p-3 cursor-pointer hover:bg-gray-50"
              onClick={() => onSort('return_ytd')}
            >
              YTD výnos
              {getSortIcon('return_ytd')}
            </th>
            <th 
              className="text-right p-3 cursor-pointer hover:bg-gray-50"
              onClick={() => onSort('return_1y')}
            >
              Výnos 1Y
              {getSortIcon('return_1y')}
            </th>
            <th>Typ fondu</th>
            <th>Sledovaný index</th>
          </tr>
        </thead>
        <tbody>
          {etfs.map((etf) => (
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
  );
};

export default ETFSearchTable;
