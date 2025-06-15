
import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface ETFTableHeaderProps {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
}

const ETFTableHeader: React.FC<ETFTableHeaderProps> = ({ sortBy, sortOrder, onSort }) => {
  const SortIcon = ({ field }: { field: string }) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  return (
    <thead className="bg-gray-50">
      <tr>
        <th 
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
          onClick={() => onSort('name')}
        >
          <div className="flex items-center">
            Název
            <SortIcon field="name" />
          </div>
        </th>
        <th 
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
          onClick={() => onSort('fund_provider')}
        >
          <div className="flex items-center">
            Poskytovatel
            <SortIcon field="fund_provider" />
          </div>
        </th>
        <th 
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
          onClick={() => onSort('ter_numeric')}
        >
          <div className="flex items-center">
            TER (%)
            <SortIcon field="ter_numeric" />
          </div>
        </th>
        <th 
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
          onClick={() => onSort('fund_size_numeric')}
        >
          <div className="flex items-center">
            Velikost fondu (mil.)
            <SortIcon field="fund_size_numeric" />
          </div>
        </th>
        <th 
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
          onClick={() => onSort('return_1y')}
        >
          <div className="flex items-center">
            Výnos 1Y (%)
            <SortIcon field="return_1y" />
          </div>
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Akce
        </th>
      </tr>
    </thead>
  );
};

export default ETFTableHeader;
