
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ETFTableHeaderProps {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
}

const ETFTableHeader: React.FC<ETFTableHeaderProps> = ({ sortBy, sortOrder, onSort }) => {
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
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort('name')}
        >
          Název / ISIN
          {getSortIcon('name')}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50 text-right"
          onClick={() => onSort('ter_numeric')}
        >
          TER
          {getSortIcon('ter_numeric')}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50 text-right"
          onClick={() => onSort('return_ytd')}
        >
          YTD výnos
          {getSortIcon('return_ytd')}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50 text-right"
          onClick={() => onSort('return_1y')}
        >
          Výnos 1Y
          {getSortIcon('return_1y')}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50 text-right"
          onClick={() => onSort('return_3y')}
        >
          Výnos 3Y
          {getSortIcon('return_3y')}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50 text-right"
          onClick={() => onSort('return_5y')}
        >
          Výnos 5Y
          {getSortIcon('return_5y')}
        </TableHead>
        <TableHead>Kategorie</TableHead>
        <TableHead>Sledovaný index</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ETFTableHeader;
