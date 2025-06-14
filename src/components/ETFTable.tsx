import React, { useState, useEffect } from 'react';
import { ETF } from '@/types/etf';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/utils/csvParser';
import { useETFData } from '@/hooks/useETFData';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ETFTableProps {
  etfs: ETF[];
  onRefresh?: () => void;
}

const ETFTable: React.FC<ETFTableProps> = ({ etfs, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const { fetchPricesManually, isLoading } = useETFData();

  // Debug: Log TER values when component receives new ETFs
  useEffect(() => {
    if (etfs.length > 0) {
      console.log('ETFTable received ETFs. Sample TER values:', 
        etfs.slice(0, 5).map(etf => ({
          name: etf.name,
          ter: etf.ter,
          ter_numeric: etf.ter_numeric,
          typeof_ter_numeric: typeof etf.ter_numeric
        }))
      );
      
      // Check if any ETF has non-zero TER
      const nonZeroTER = etfs.filter(etf => etf.ter_numeric && etf.ter_numeric > 0);
      console.log(`Found ${nonZeroTER.length} ETFs with non-zero TER out of ${etfs.length} total`);
      
      if (nonZeroTER.length > 0) {
        console.log('Examples of non-zero TER:', 
          nonZeroTER.slice(0, 3).map(etf => ({
            name: etf.name,
            ter_numeric: etf.ter_numeric
          }))
        );
      }
    }
  }, [etfs]);

  // Get unique categories
  const categories = [...new Set(etfs.map(etf => etf.category).filter(Boolean))];

  // Filter and sort ETFs
  const filteredETFs = etfs
    .filter(etf => {
      const searchLower = searchTerm.toLowerCase();
      
      // Search in basic fields
      const basicFieldsMatch = 
        etf.name.toLowerCase().includes(searchLower) ||
        etf.isin.toLowerCase().includes(searchLower) ||
        etf.fund_provider.toLowerCase().includes(searchLower);
      
      // Search in ticker fields
      const tickerFieldsMatch = 
        (etf.primary_ticker && etf.primary_ticker.toLowerCase().includes(searchLower)) ||
        (etf.exchange_1_ticker && etf.exchange_1_ticker.toLowerCase().includes(searchLower)) ||
        (etf.exchange_2_ticker && etf.exchange_2_ticker.toLowerCase().includes(searchLower)) ||
        (etf.exchange_3_ticker && etf.exchange_3_ticker.toLowerCase().includes(searchLower)) ||
        (etf.exchange_4_ticker && etf.exchange_4_ticker.toLowerCase().includes(searchLower)) ||
        (etf.exchange_5_ticker && etf.exchange_5_ticker.toLowerCase().includes(searchLower));
      
      return basicFieldsMatch || tickerFieldsMatch;
    })
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

  // Pagination calculations
  const totalPages = Math.ceil(filteredETFs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedETFs = filteredETFs.slice(startIndex, endIndex);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    setCurrentPage(1); // Reset to first page when sorting
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handlePriceUpdate = async () => {
    try {
      await fetchPricesManually();
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error('Error updating prices:', error);
    }
  };

  const formatLastUpdate = (dateString: string | null) => {
    if (!dateString) return 'Nikdy';
    const date = new Date(dateString);
    return date.toLocaleDateString('cs-CZ') + ' ' + date.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              ETF Fondy
              <Badge variant="secondary">{filteredETFs.length} fondů</Badge>
              {etfs.length > filteredETFs.length && (
                <Badge variant="outline">z {etfs.length} celkem</Badge>
              )}
            </CardTitle>
            <CardDescription>
              Přehled ETF fondů s detailními informacemi o výkonnosti a složení
            </CardDescription>
          </div>
          <Button 
            onClick={handlePriceUpdate} 
            disabled={isLoading}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Aktualizuji...' : 'Aktualizovat ceny'}
          </Button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Hledat podle názvu, ISIN, poskytovatele nebo tickeru..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={handleCategoryFilter}>
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
              <SelectItem value="current_price">Aktuální cena</SelectItem>
              <SelectItem value="ytd_return_percent">YTD výnos</SelectItem>
              <SelectItem value="return_1y_percent">Výnos 1Y</SelectItem>
              <SelectItem value="return_3y_percent">Výnos 3Y</SelectItem>
              <SelectItem value="return_5y_percent">Výnos 5Y</SelectItem>
              <SelectItem value="volatility_1y">Volatilita 1Y</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Pagination info */}
        {filteredETFs.length > itemsPerPage && (
          <div className="text-sm text-muted-foreground">
            Zobrazeno {startIndex + 1}-{Math.min(endIndex, filteredETFs.length)} z {filteredETFs.length} fondů
          </div>
        )}
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
                  onClick={() => handleSort('current_price')}
                >
                  Aktuální cena
                  {sortBy === 'current_price' && (
                    sortOrder === 'asc' ? <TrendingUp className="inline ml-1 h-4 w-4" /> : <TrendingDown className="inline ml-1 h-4 w-4" />
                  )}
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
                  onClick={() => handleSort('ytd_return_percent')}
                >
                  YTD výnos
                  {sortBy === 'ytd_return_percent' && (
                    sortOrder === 'asc' ? <TrendingUp className="inline ml-1 h-4 w-4" /> : <TrendingDown className="inline ml-1 h-4 w-4" />
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 text-right"
                  onClick={() => handleSort('return_1y_percent')}
                >
                  Výnos 1Y
                  {sortBy === 'return_1y_percent' && (
                    sortOrder === 'asc' ? <TrendingUp className="inline ml-1 h-4 w-4" /> : <TrendingDown className="inline ml-1 h-4 w-4" />
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 text-right"
                  onClick={() => handleSort('return_3y_percent')}
                >
                  Výnos 3Y
                  {sortBy === 'return_3y_percent' && (
                    sortOrder === 'asc' ? <TrendingUp className="inline ml-1 h-4 w-4" /> : <TrendingDown className="inline ml-1 h-4 w-4" />
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 text-right"
                  onClick={() => handleSort('return_5y_percent')}
                >
                  Výnos 5Y
                  {sortBy === 'return_5y_percent' && (
                    sortOrder === 'asc' ? <TrendingUp className="inline ml-1 h-4 w-4" /> : <TrendingDown className="inline ml-1 h-4 w-4" />
                  )}
                </TableHead>
                <TableHead>Kategorie</TableHead>
                <TableHead className="text-right">Poslední aktualizace</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedETFs.map((etf) => (
                <TableRow key={etf.isin} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{etf.name}</div>
                      <div className="text-sm text-muted-foreground">{etf.isin}</div>
                      {etf.primary_ticker && (
                        <div className="text-xs text-blue-600">{etf.primary_ticker}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{etf.fund_provider}</TableCell>
                  <TableCell className="text-right">
                    {etf.current_price && etf.current_price > 0 ? (
                      <span className="font-medium">
                        {etf.current_price.toLocaleString('cs-CZ', { 
                          minimumFractionDigits: 2, 
                          maximumFractionDigits: 2 
                        })} {etf.fund_currency || 'USD'}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatPercentage(etf.ter_numeric)}
                  </TableCell>
                  <TableCell className={`text-right ${etf.ytd_return_percent > 0 ? 'text-green-600' : etf.ytd_return_percent < 0 ? 'text-red-600' : ''}`}>
                    {etf.ytd_return_percent ? formatPercentage(etf.ytd_return_percent) : '-'}
                  </TableCell>
                  <TableCell className={`text-right ${etf.return_1y_percent > 0 ? 'text-green-600' : etf.return_1y_percent < 0 ? 'text-red-600' : ''}`}>
                    {etf.return_1y_percent ? formatPercentage(etf.return_1y_percent) : '-'}
                  </TableCell>
                  <TableCell className={`text-right ${etf.return_3y_percent > 0 ? 'text-green-600' : etf.return_3y_percent < 0 ? 'text-red-600' : ''}`}>
                    {etf.return_3y_percent ? formatPercentage(etf.return_3y_percent) : '-'}
                  </TableCell>
                  <TableCell className={`text-right ${etf.return_5y_percent > 0 ? 'text-green-600' : etf.return_5y_percent < 0 ? 'text-red-600' : ''}`}>
                    {etf.return_5y_percent ? formatPercentage(etf.return_5y_percent) : '-'}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {etf.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">
                    {formatLastUpdate(etf.last_price_update)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }
                  
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNumber)}
                        isActive={currentPage === pageNumber}
                        className="cursor-pointer"
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
        
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
