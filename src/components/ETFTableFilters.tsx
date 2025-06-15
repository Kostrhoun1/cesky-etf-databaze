
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface ETFTableFiltersProps {
  searchTerm: string;
  sortBy: string;
  onSearchChange: (value: string) => void;
  onSortByChange: (value: string) => void;
}

const ETFTableFilters: React.FC<ETFTableFiltersProps> = ({
  searchTerm,
  sortBy,
  onSearchChange,
  onSortByChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Hledat podle názvu, ISIN, poskytovatele nebo tickeru..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Select value={sortBy} onValueChange={onSortByChange}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Řadit podle" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Název</SelectItem>
          <SelectItem value="ter_numeric">TER</SelectItem>
          <SelectItem value="fund_size_numeric">Velikost fondu</SelectItem>
          <SelectItem value="return_ytd">YTD výnos</SelectItem>
          <SelectItem value="return_1y">Výnos 1Y</SelectItem>
          <SelectItem value="return_3y">Výnos 3Y</SelectItem>
          <SelectItem value="return_5y">Výnos 5Y</SelectItem>
          <SelectItem value="volatility_1y">Volatilita 1Y</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ETFTableFilters;
