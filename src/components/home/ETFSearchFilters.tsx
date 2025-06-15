
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ETFSearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (value: string) => void;
}

const ETFSearchFilters: React.FC<ETFSearchFiltersProps> = ({
  searchTerm,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange
}) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Hledat podle názvu, ISIN, poskytovatele nebo tickeru..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {categories.length > 0 && (
        <Tabs value={activeCategory} onValueChange={onCategoryChange} className="w-full mb-6">
          <TabsList className={`grid w-full ${categories.length <= 3 ? 'grid-cols-3' : categories.length <= 4 ? 'grid-cols-4' : categories.length <= 5 ? 'grid-cols-5' : 'grid-cols-6'}`}>
            {categories.map(category => (
              <TabsTrigger key={category} value={category} className="text-xs lg:text-sm px-2 py-2">{category}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}
    </>
  );
};

export default ETFSearchFilters;
