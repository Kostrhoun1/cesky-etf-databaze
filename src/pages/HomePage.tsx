
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useETFData } from '@/hooks/useETFData';
import { ETF } from '@/types/etf';
import { formatPercentage } from '@/utils/csvParser';
import { Search, TrendingUp, Shield, Calculator, BookOpen, BarChart } from 'lucide-react';

const HomePage: React.FC = () => {
  const [etfs, setEtfs] = useState<ETF[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const { fetchETFs, isLoading } = useETFData();

  useEffect(() => {
    const loadETFs = async () => {
      const data = await fetchETFs();
      setEtfs(data || []);
    };
    loadETFs();
  }, [fetchETFs]);

  // Get unique categories
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
    .slice(0, 10); // Show only top 10 on homepage

  const brokers = [
    {
      name: 'DEGIRO',
      logo: '🟠',
      description: 'Nejpopulárnější broker v Evropě s nízkými poplatky',
      pros: ['Bezplatné ETF obchody', 'Široká nabídka produktů', 'Regulace DNB'],
      rating: 4.5
    },
    {
      name: 'Interactive Brokers',
      logo: '🔵',
      description: 'Profesionální platforma s nejširší nabídkou trhů',
      pros: ['Nejširší nabídka trhů', 'Nízké úrokové sazby', 'Pokročilé nástroje'],
      rating: 4.7
    },
    {
      name: 'XTB',
      logo: '🟡',
      description: 'Polský broker s českou podporou',
      pros: ['Česká podpora', 'Bezplatné ETF obchody', 'Vzdělávací materiály'],
      rating: 4.3
    },
    {
      name: 'Trading 212',
      logo: '🟢',
      description: 'Jednoduché rozhraní a investování do zlomků akcií',
      pros: ['Zlomkové investování', 'Intuitivní aplikace', 'Bezplatné obchody'],
      rating: 4.2
    },
    {
      name: 'Portu',
      logo: '🟣',
      description: 'Český broker s lokální podporou',
      pros: ['Česká společnost', 'Osobní přístup', 'Lokální podpora'],
      rating: 4.0
    }
  ];

  const getReturnColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              ETF průvodce.cz
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Komplexní průvodce světem ETF fondů pro české investory
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/srovnani-etf">Porovnat ETF fondy</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                <Link to="/co-jsou-etf">Co jsou ETF?</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Proč ETF průvodce.cz?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Poskytujeme komplexní informace, nástroje a analýzy pro informovaná investiční rozhodnutí
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <BarChart className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Detailní analýzy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Komplexní informace o výkonnosti, poplatcích a složení všech ETF fondů
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Calculator className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Užitečné nástroje</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Investiční kalkulačky, backtesting portfolia a analýza dopadů poplatků
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Vzdělávací obsah</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Průvodci, články a tipy pro začínající i pokročilé investory
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ETF Search & Filter Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nejpopulárnější ETF fondy
            </h2>
            <p className="text-lg text-gray-600">
              Vyberte si z naší databáze {etfs.length} ETF fondů
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
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">Žádné ETF fondy nenalezeny.</p>
              </div>
            )}
          </div>

          {etfs.length > 10 && (
            <div className="text-center mt-8">
              <Button asChild>
                <Link to="/srovnani-etf">Zobrazit všech {etfs.length} ETF fondů</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Broker Comparison Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Srovnání brokerů
            </h2>
            <p className="text-lg text-gray-600">
              Vyberte si nejlepšího brokera pro vaše investice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brokers.map((broker) => (
              <Card key={broker.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{broker.logo}</span>
                    <div>
                      <CardTitle className="text-lg">{broker.name}</CardTitle>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-sm ${i < Math.floor(broker.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                            ⭐
                          </span>
                        ))}
                        <span className="text-sm text-gray-600 ml-1">({broker.rating})</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{broker.description}</p>
                  <ul className="space-y-1 mb-4">
                    {broker.pros.map((pro, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full">
                    Detailní recenze
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Začněte investovat ještě dnes
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Využijte naše nástroje a analýzy k vytvoření vašeho investičního portfolia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/nastroje">Investiční kalkulačka</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/co-jsou-etf">Vzdělávací články</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
