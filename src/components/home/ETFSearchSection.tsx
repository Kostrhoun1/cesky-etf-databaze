
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
      // Pokud je searchTerm prázdný, prochází všechny ETF
      if (!searchTerm.trim()) {
        const matchesCategory = categoryFilter === 'all' || etf.category === categoryFilter;
        return matchesCategory;
      }

      // Jinak aplikujeme search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = etf.name.toLowerCase().includes(searchLower) ||
                           etf.isin.toLowerCase().includes(searchLower) ||
                           etf.fund_provider.toLowerCase().includes(searchLower);
      const matchesCategory = categoryFilter === 'all' || etf.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .slice(0, 10);

  const getReturnColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
            Prozkoumejte populární ETF
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            {totalCount > 0
              ? `Srovnáváme pro vás přes ${totalCount.toLocaleString()} ETF fondů. Začněte prozkoumávat ty nejlepší pro české investory.`
              : 'Začněte prozkoumávat naši databázi ETF fondů.'}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-3xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Hledat ETF podle názvu, ISIN nebo poskytovatele..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-base"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[240px] h-12 text-base">
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
        <div className="space-y-4">
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
              <Card key={etf.isin} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="md:col-span-2">
                      <h3 className="font-semibold text-base sm:text-lg mb-1">
                        <Link to={`/etf/${etf.isin}`} className="hover:text-violet-600">
                          {etf.name}
                        </Link>
                      </h3>
                      <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-sm text-gray-500">
                        <span>{etf.isin}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{etf.fund_provider}</span>
                        {etf.degiro_free && (
                          <>
                            <span className="hidden sm:inline">•</span>
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              DEGIRO Free
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-sm text-center">
                      <div>
                        <p className="text-gray-500 text-xs uppercase">TER</p>
                        <p className="font-semibold">{formatPercentage(etf.ter_numeric)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase">YTD</p>
                        <p className={`font-semibold ${getReturnColor(etf.return_ytd)}`}>
                          {etf.return_ytd ? formatPercentage(etf.return_ytd) : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase">1R</p>
                        <p className={`font-semibold ${getReturnColor(etf.return_1y)}`}>
                          {etf.return_1y ? formatPercentage(etf.return_1y) : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase">3R</p>
                        <p className={`font-semibold ${getReturnColor(etf.return_3y)}`}>
                          {etf.return_3y ? formatPercentage(etf.return_3y) : 'N/A'}
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
              <p className="text-gray-600">
                Žádné ETF fondy nenalezeny podle zadaných kritérií.
                {searchTerm && ` Hledaný výraz: "${searchTerm}"`}
                {categoryFilter !== 'all' && ` Kategorie: "${categoryFilter}"`}
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('all');
                }}
                className="mt-4"
                variant="outline"
              >
                Vymazat filtry
              </Button>
            </div>
          )}
        </div>

        {totalCount > 10 && filteredETFs.length > 0 && (
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/srovnani-etf">Zobrazit všech {totalCount.toLocaleString()} ETF fondů</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ETFSearchSection;
