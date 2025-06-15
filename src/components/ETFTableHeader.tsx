
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ETFTableHeaderProps {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
  showComparisonColumn?: boolean;
}

const ETFTableHeader: React.FC<ETFTableHeaderProps> = ({
  sortBy,
  sortOrder,
  onSort,
  showComparisonColumn = false,
}) => {
  const getSortIcon = (field: string) => {
    if (sortBy === field) {
      return sortOrder === 'asc' ? 
        <TrendingUp className="inline ml-1 h-4 w-4" /> : 
        <TrendingDown className="inline ml-1 h-4 w-4" />;
    }
    return null;
  };

  return (
    <TableHeader>
      <TableRow>
        {showComparisonColumn && (
          <TableHead className="w-12">
            Porovnat
          </TableHead>
        )}
        <TableHead 
          className="cursor-pointer hover:bg-gray-50"
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
          onClick={() => onSort('return_ytd')}
        >
          YTD výnos
          {getSortIcon('return_ytd')}
        </TableHead>
        <TableHead 
          className="text-right cursor-pointer hover:bg-gray-50"
          onClick={() => onSort('return_1y')}
        >
          Výnos 1Y
          {getSortIcon('return_1y')}
        </TableHead>
        <TableHead>Typ fondu</TableHead>
        <TableHead>Sledovaný index</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ETFTableHeader;
