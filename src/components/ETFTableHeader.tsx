
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ETFTableHeaderProps {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
}

const ETFTableHeader: React.FC<ETFTableHeaderProps> = ({
  sortBy,
  sortOrder,
  onSort,
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
    <thead className="bg-gray-50">
      <tr>
        <th 
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
          onClick={() => onSort('name')}
        >
          Název / ISIN / Poskytovatel
          {getSortIcon('name')}
        </th>
        <th 
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
          onClick={() => onSort('category')}
        >
          Kategorie
          {getSortIcon('category')}
        </th>
        <th 
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
          onClick={() => onSort('ter_numeric')}
        >
          TER
          {getSortIcon('ter_numeric')}
        </th>
        <th 
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
          onClick={() => onSort('fund_size_numeric')}
        >
          Velikost fondu
          {getSortIcon('fund_size_numeric')}
        </th>
        <th 
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
          onClick={() => onSort('return_ytd')}
        >
          YTD výnos
          {getSortIcon('return_ytd')}
        </th>
        <th 
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
          onClick={() => onSort('return_1y')}
        >
          Výnos 1Y
          {getSortIcon('return_1y')}
        </th>
        <th 
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
          onClick={() => onSort('return_3y')}
        >
          Výnos 3Y
          {getSortIcon('return_3y')}
        </th>
        <th 
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
          onClick={() => onSort('return_5y')}
        >
          Výnos 5Y
          {getSortIcon('return_5y')}
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Typ fondu
        </th>
      </tr>
    </thead>
  );
};

export default ETFTableHeader;
