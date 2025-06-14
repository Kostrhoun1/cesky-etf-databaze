
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ETFListItem } from '@/types/etf';
import { formatPercentage } from '@/utils/csvParser';
import { Search } from 'lucide-react';

interface ETFSearchSectionProps {
  etfs: ETFListItem[];
  totalCount: number;
  isLoading: boolean;
  loadingError: string | null;
}

const ETFSearchSection: React.FC<ETFSearchSectionProps> = ({
  etfs,
  totalCount,
  isLoading,
  loadingError
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Get unique categories from loaded ETFs
  const categories = [...new Set(etfs.map(etf => etf.category).filter(Boolean))];

  // Filter ETFs for homepage display
  const filteredETFs = etfs
    .filter(etf => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = etf.name.toLowerCase().includes(searchLower) ||
                           etf.isin.toLowerCase().includes(searchLower) ||
                           etf.fund_provider.toLowerCase().includes(searchLower);
      const matchesCategory = categoryFilter === 'all' || etf.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .slice(0, 15);

  const getReturnColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nejpopulárnější ETF fondy
          </h2>
          <p className="text-lg text-gray-600">
            Vyberte si z naší databáze {totalCount.toLocaleString()} ETF fondů
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Hledat ETF podle názvu, ISIN nebo poskytovatele..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
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
        </div>

        {/* ETF List */}
        <div className="grid gap-4">
          {isLoading ? (
            <div className="text-center py-8">
              <p>Načítání ETF fondů...</p>
            </div>
          ) : loadingError ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">Chyba při načítání: {loadingError}</p>
              <Button onClick={() => window.location.reload()}>
                Zkusit znovu
              </Button>
            </div>
          ) : filteredETFs.length > 0 ? (
            filteredETFs.map((etf) => (
              <Card key={etf.isin} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">
                            <Link to={`/etf/${etf.isin}`} className="hover:text-blue-600">
                              {etf.name}
                            </Link>
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {etf.isin} • {etf.fund_provider}
                          </p>
                          {etf.degiro_free && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              DEGIRO Free
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-6 text-sm">
                      <div className="text-center">
                        <p className="text-gray-500">TER</p>
                        <p className="font-semibold">{formatPercentage(etf.ter_numeric)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500">YTD</p>
                        <p className={`font-semibold ${getReturnColor(etf.return_ytd)}`}>
                          {etf.return_ytd ? formatPercentage(etf.return_ytd) : '-'}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500">1 rok</p>
                        <p className={`font-semibold ${getReturnColor(etf.return_1y)}`}>
                          {etf.return_1y ? formatPercentage(etf.return_1y) : '-'}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500">3 roky</p>
                        <p className={`font-semibold ${getReturnColor(etf.return_3y)}`}>
                          {etf.return_3y ? formatPercentage(etf.return_3y) : '-'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : etfs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Žádná ETF data nejsou k dispozici.</p>
              <Button 
                onClick={() => window.location.reload()}
                className="mt-4"
              >
                Obnovit stránku
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">Žádné ETF fondy nenalezeny podle zadaných kritérií.</p>
            </div>
          )}
        </div>

        {totalCount > 15 && filteredETFs.length > 0 && (
          <div className="text-center mt-8">
            <Button asChild>
              <Link to="/srovnani-etf">Zobrazit všech {totalCount.toLocaleString()} ETF fondů</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ETFSearchSection;
