
import React, { useState } from 'react';
import { ETF } from '@/types/etf';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/utils/csvParser';

interface ETFTableProps {
  etfs: ETF[];
}

const ETFTable: React.FC<ETFTableProps> = ({ etfs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Get unique categories
  const categories = [...new Set(etfs.map(etf => etf.category).filter(Boolean))];

  // Filter and sort ETFs
  const filteredETFs = etfs
    .filter(etf => 
      etf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      etf.isin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      etf.fund_provider.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(etf => categoryFilter === 'all' || etf.category === categoryFilter)
    .sort((a, b) => {
      let aValue: any = a[sortBy as keyof ETF];
      let bValue: any = b[sortBy as keyof ETF];
      
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

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          ETF Fondy
          <Badge variant="secondary">{filteredETFs.length} fondů</Badge>
        </CardTitle>
        <CardDescription>
          Přehled ETF fondů s detailními informacemi o výkonnosti a složení
        </CardDescription>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Hledat podle názvu, ISIN nebo poskytovatele..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Kategorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Všechny kategorie</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Řadit podle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Název</SelectItem>
              <SelectItem value="ter_numeric">TER</SelectItem>
              <SelectItem value="fund_size_numeric">Velikost fondu</SelectItem>
              <SelectItem value="return_1y">Výnos 1Y</SelectItem>
              <SelectItem value="return_3y">Výnos 3Y</SelectItem>
              <SelectItem value="volatility_1y">Volatilita 1Y</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('name')}
                >
                  Název / ISIN
                  {sortBy === 'name' && (
                    sortOrder === 'asc' ? <TrendingUp className="inline ml-1 h-4 w-4" /> : <TrendingDown className="inline ml-1 h-4 w-4" />
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('fund_provider')}
                >
                  Poskytovatel
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 text-right"
                  onClick={() => handleSort('ter_numeric')}
                >
                  TER
                  {sortBy === 'ter_numeric' && (
                    sortOrder === 'asc' ? <TrendingUp className="inline ml-1 h-4 w-4" /> : <TrendingDown className="inline ml-1 h-4 w-4" />
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 text-right"
                  onClick={() => handleSort('fund_size_numeric')}
                >
                  Velikost fondu
                  {sortBy === 'fund_size_numeric' && (
                    sortOrder === 'asc' ? <TrendingUp className="inline ml-1 h-4 w-4" /> : <TrendingDown className="inline ml-1 h-4 w-4" />
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 text-right"
                  onClick={() => handleSort('return_1y')}
                >
                  Výnos 1Y
                  {sortBy === 'return_1y' && (
                    sortOrder === 'asc' ? <TrendingUp className="inline ml-1 h-4 w-4" /> : <TrendingDown className="inline ml-1 h-4 w-4" />
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 text-right"
                  onClick={() => handleSort('return_3y')}
                >
                  Výnos 3Y
                  {sortBy === 'return_3y' && (
                    sortOrder === 'asc' ? <TrendingUp className="inline ml-1 h-4 w-4" /> : <TrendingDown className="inline ml-1 h-4 w-4" />
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 text-right"
                  onClick={() => handleSort('volatility_1y')}
                >
                  Volatilita 1Y
                  {sortBy === 'volatility_1y' && (
                    sortOrder === 'asc' ? <TrendingUp className="inline ml-1 h-4 w-4" /> : <TrendingDown className="inline ml-1 h-4 w-4" />
                  )}
                </TableHead>
                <TableHead>Kategorie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredETFs.map((etf) => (
                <TableRow key={etf.isin} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{etf.name}</div>
                      <div className="text-sm text-muted-foreground">{etf.isin}</div>
                    </div>
                  </TableCell>
                  <TableCell>{etf.fund_provider}</TableCell>
                  <TableCell className="text-right">{formatPercentage(etf.ter_numeric)}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(etf.fund_size_numeric, etf.fund_size_currency)}
                  </TableCell>
                  <TableCell className={`text-right ${etf.return_1y > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(etf.return_1y)}
                  </TableCell>
                  <TableCell className={`text-right ${etf.return_3y > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(etf.return_3y)}
                  </TableCell>
                  <TableCell className="text-right">{formatPercentage(etf.volatility_1y)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {etf.category}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {filteredETFs.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Žádné ETF fondy nenalezeny podle zadaných kritérií.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ETFTable;
