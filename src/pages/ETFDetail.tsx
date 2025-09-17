
import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useETFData } from '@/hooks/useETFData';
import { ETF } from '@/types/etf';
import { formatPercentage } from '@/utils/csvParser';
import { supabase } from '@/integrations/supabase/client';
import { getETFTicker } from '@/utils/etfTickerMapping';
import { ArrowLeft } from 'lucide-react';

const ETFDetail: React.FC = () => {
  const { isin } = useParams<{ isin: string }>();
  const [searchParams] = useSearchParams();
  const [etf, setEtf] = useState<ETF | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const fromPortfolio = searchParams.get('from') === 'portfolio';

  useEffect(() => {
    const fetchETFDetail = async () => {
      if (!isin) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('etf_funds')
          .select('*')
          .eq('isin', isin)
          .single();

        if (error) {
          console.error('Error fetching ETF detail:', error);
          return;
        }

        setEtf(data);
        
        // Update page title and description for SEO
        if (data) {
          document.title = `${data.name} (${data.isin}) - ETF průvodce.cz`;
          document.querySelector('meta[name="description"]')?.setAttribute('content', 
            `Detailní informace o ETF fondu ${data.name}. TER ${formatPercentage(data.ter_numeric)}, výkonnost, složení a vše o ${data.fund_provider} fondu.`
          );
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchETFDetail();
  }, [isin]);

  const getReturnColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getTopHoldings = () => {
    if (!etf) return [];
    const holdings = [];
    for (let i = 1; i <= 10; i++) {
      const name = etf[`holding_${i}_name` as keyof ETF] as string;
      const weight = etf[`holding_${i}_weight` as keyof ETF] as number;
      if (name && weight) {
        holdings.push({ name, weight });
      }
    }
    return holdings;
  };

  const getTopCountries = () => {
    if (!etf) return [];
    const countries = [];
    for (let i = 1; i <= 5; i++) {
      const name = etf[`country_${i}_name` as keyof ETF] as string;
      const weight = etf[`country_${i}_weight` as keyof ETF] as number;
      if (name && weight) {
        countries.push({ name, weight });
      }
    }
    return countries;
  };

  const getTopSectors = () => {
    if (!etf) return [];
    const sectors = [];
    for (let i = 1; i <= 5; i++) {
      const name = etf[`sector_${i}_name` as keyof ETF] as string;
      const weight = etf[`sector_${i}_weight` as keyof ETF] as number;
      if (name && weight) {
        sectors.push({ name, weight });
      }
    }
    return sectors;
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-lg">Načítání detailů ETF fondu...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!etf) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">ETF fond nenalezen</h1>
            <p className="text-gray-600 mb-8">ETF fond s ISIN {isin} nebyl v naší databázi nalezen.</p>
            <Button asChild>
              <Link to="/srovnani-etf">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Zpět na srovnání ETF
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const topHoldings = getTopHoldings();
  const topCountries = getTopCountries();
  const topSectors = getTopSectors();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          {fromPortfolio ? (
            <div className="mb-4 p-3 bg-violet-50 border border-violet-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                  <span className="text-sm font-medium text-violet-700">
                    Součást vašeho doporučeného portfolia
                  </span>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-violet-300 text-violet-700 hover:bg-violet-100"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="mr-1 h-3 w-3" />
                  Zpět na portfolio
                </Button>
              </div>
            </div>
          ) : (
            <Button asChild variant="outline" className="mb-4">
              <Link to="/srovnani-etf">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Zpět na srovnání ETF
              </Link>
            </Button>
          )}
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{etf.name}</h1>
              <p className="text-lg text-gray-600 mb-4">
                {(etf.primary_ticker || etf.exchange_1_ticker || getETFTicker(etf.isin)) && 
                  `${etf.primary_ticker || etf.exchange_1_ticker || getETFTicker(etf.isin)} • `
                }
                {etf.isin} • {etf.fund_provider}
              </p>
              <div className="flex flex-wrap gap-2">
                {etf.degiro_free && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    DEGIRO Free
                  </Badge>
                )}
                <Badge variant="outline">{etf.category}</Badge>
                <Badge variant="outline">{etf.fund_domicile}</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">TER</p>
              <p className="text-xl font-bold">{formatPercentage(etf.ter_numeric)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">YTD výnos</p>
              <p className={`text-xl font-bold ${getReturnColor(etf.return_ytd)}`}>
                {etf.return_ytd ? formatPercentage(etf.return_ytd) : '-'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">1 rok</p>
              <p className={`text-xl font-bold ${getReturnColor(etf.return_1y)}`}>
                {etf.return_1y ? formatPercentage(etf.return_1y) : '-'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">3 roky</p>
              <p className={`text-xl font-bold ${getReturnColor(etf.return_3y)}`}>
                {etf.return_3y ? formatPercentage(etf.return_3y) : '-'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Základní informace</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Poskytovatel fondu:</span>
                  <span className="font-medium">{etf.fund_provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Velikost fondu:</span>
                  <span className="font-medium">{etf.fund_size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Měna fondu:</span>
                  <span className="font-medium">{etf.fund_currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Domicil:</span>
                  <span className="font-medium">{etf.fund_domicile}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Datum založení:</span>
                  <span className="font-medium">{etf.inception_date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Distribuce:</span>
                  <span className="font-medium">{etf.distribution_policy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Replikace:</span>
                  <span className="font-medium">{etf.replication}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sledovaný index:</span>
                  <span className="font-medium">{etf.index_name}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dividend Information */}
          <Card>
            <CardHeader>
              <CardTitle>Dividendové informace</CardTitle>
              <CardDescription>Informace o dividendách a výnosech</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Aktuální dividendový výnos:</span>
                  <span className="font-medium font-mono">
                    {etf.current_dividend_yield_numeric ? 
                      formatPercentage(etf.current_dividend_yield_numeric) : 
                      (etf.current_dividend_yield || '-')
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dividendy za 12 měsíců:</span>
                  <span className="font-medium">
                    {etf.dividends_12m_numeric ? 
                      `${etf.dividends_12m_numeric.toFixed(4)} ${etf.dividends_12m_currency || etf.fund_currency}` : 
                      (etf.dividends_12m || '-')
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frekvence dividend:</span>
                  <span className="font-medium">{etf.distribution_frequency || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Způsob výplaty:</span>
                  <span className="font-medium">{etf.distribution_policy || '-'}</span>
                </div>
                {etf.dividend_extraction_method && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Metoda získání dividend:</span>
                    <span className="font-medium text-sm">{etf.dividend_extraction_method}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics Table */}
          <Card>
            <CardHeader>
              <CardTitle>Výkonnostní metriky</CardTitle>
              <CardDescription>Historická výkonnost fondu</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Období</TableHead>
                    <TableHead>Výnos</TableHead>
                    <TableHead>Volatilita</TableHead>
                    <TableHead>Max. pokles</TableHead>
                    <TableHead>Výnos/riziko</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">YTD</TableCell>
                    <TableCell className={getReturnColor(etf.return_ytd)}>
                      {etf.return_ytd ? formatPercentage(etf.return_ytd) : '-'}
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">1 rok</TableCell>
                    <TableCell className={getReturnColor(etf.return_1y)}>
                      {etf.return_1y ? formatPercentage(etf.return_1y) : '-'}
                    </TableCell>
                    <TableCell>
                      {etf.volatility_1y ? formatPercentage(etf.volatility_1y) : '-'}
                    </TableCell>
                    <TableCell className="text-red-600">
                      {etf.max_drawdown_1y ? formatPercentage(etf.max_drawdown_1y) : '-'}
                    </TableCell>
                    <TableCell>
                      {etf.return_per_risk_1y ? formatPercentage(etf.return_per_risk_1y) : '-'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">3 roky</TableCell>
                    <TableCell className={getReturnColor(etf.return_3y)}>
                      {etf.return_3y ? formatPercentage(etf.return_3y) : '-'}
                    </TableCell>
                    <TableCell>
                      {etf.volatility_3y ? formatPercentage(etf.volatility_3y) : '-'}
                    </TableCell>
                    <TableCell className="text-red-600">
                      {etf.max_drawdown_3y ? formatPercentage(etf.max_drawdown_3y) : '-'}
                    </TableCell>
                    <TableCell>
                      {etf.return_per_risk_3y ? formatPercentage(etf.return_per_risk_3y) : '-'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">5 let</TableCell>
                    <TableCell className={getReturnColor(etf.return_5y)}>
                      {etf.return_5y ? formatPercentage(etf.return_5y) : '-'}
                    </TableCell>
                    <TableCell>
                      {etf.volatility_5y ? formatPercentage(etf.volatility_5y) : '-'}
                    </TableCell>
                    <TableCell className="text-red-600">
                      {etf.max_drawdown_5y ? formatPercentage(etf.max_drawdown_5y) : '-'}
                    </TableCell>
                    <TableCell>
                      {etf.return_per_risk_5y ? formatPercentage(etf.return_per_risk_5y) : '-'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Risk Metrics Table */}
          <Card>
            <CardHeader>
              <CardTitle>Rizikovost</CardTitle>
              <CardDescription>Rizikové charakteristiky fondu</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metrika</TableHead>
                    <TableHead>Hodnota</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Beta</TableCell>
                    <TableCell>
                      {etf.beta ? etf.beta.toFixed(2) : '-'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Korelace</TableCell>
                    <TableCell>
                      {etf.correlation ? etf.correlation.toFixed(2) : '-'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Tracking error</TableCell>
                    <TableCell>
                      {etf.tracking_error ? formatPercentage(etf.tracking_error) : '-'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Information ratio</TableCell>
                    <TableCell>
                      {etf.information_ratio ? etf.information_ratio.toFixed(2) : '-'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Max. pokles celkem</TableCell>
                    <TableCell className="text-red-600">
                      {etf.max_drawdown_inception ? formatPercentage(etf.max_drawdown_inception) : '-'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Top Holdings */}
          {topHoldings.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Největší pozice</CardTitle>
                <CardDescription>Top 10 největších pozic v fondu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topHoldings.map((holding, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-700 text-sm">{holding.name}</span>
                      <span className="font-medium">{formatPercentage(holding.weight)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Geographic Allocation */}
          {topCountries.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Geografické rozložení</CardTitle>
                <CardDescription>Top 5 zemí podle váhy v portfoliu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topCountries.map((country, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-700">{country.name}</span>
                      <span className="font-medium">{formatPercentage(country.weight)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sector Allocation */}
          {topSectors.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Sektorové rozložení</CardTitle>
                <CardDescription>Top 5 sektorů podle váhy v portfoliu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topSectors.map((sector, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-700">{sector.name}</span>
                      <span className="font-medium">{formatPercentage(sector.weight)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Trading Information */}
          <Card>
            <CardHeader>
              <CardTitle>Obchodní informace</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Primární burza:</span>
                  <span className="font-medium">{etf.primary_exchange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Primární ticker:</span>
                  <span className="font-medium">{etf.primary_ticker}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Počet burz:</span>
                  <span className="font-medium">{etf.total_exchanges}</span>
                </div>
                {etf.exchange_1_name && (
                  <>
                    <div className="pt-2 border-t">
                      <h4 className="font-medium mb-2">Další burzy:</h4>
                      <div className="text-sm space-y-1">
                        {etf.exchange_1_name && (
                          <div className="flex justify-between">
                            <span>{etf.exchange_1_name}</span>
                            <span>{etf.exchange_1_ticker} ({etf.exchange_1_currency})</span>
                          </div>
                        )}
                        {etf.exchange_2_name && (
                          <div className="flex justify-between">
                            <span>{etf.exchange_2_name}</span>
                            <span>{etf.exchange_2_ticker} ({etf.exchange_2_currency})</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        {(etf.description_cs || etf.description_en) && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Popis fondu</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {etf.description_cs || etf.description_en}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default ETFDetail;
