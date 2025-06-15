
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useETFData } from '@/hooks/useETFData';
import { ETF } from '@/types/etf';
import { formatPercentage } from '@/utils/csvParser';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft } from 'lucide-react';

const ETFDetail: React.FC = () => {
  const { isin } = useParams<{ isin: string }>();
  const [etf, setEtf] = useState<ETF | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
          <Button asChild variant="outline" className="mb-4">
            <Link to="/srovnani-etf">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zpět na srovnání ETF
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{etf.name}</h1>
              <p className="text-lg text-gray-600 mb-4">
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

          {/* YTD Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Letošní výkonnost (YTD)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">YTD výnos:</span>
                  <span className={`font-medium text-lg ${getReturnColor(etf.return_ytd)}`}>
                    {etf.return_ytd ? formatPercentage(etf.return_ytd) : '-'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 1 Year Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Roční výkonnost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">1 rok:</span>
                  <span className={`font-medium text-lg ${getReturnColor(etf.return_1y)}`}>
                    {etf.return_1y ? formatPercentage(etf.return_1y) : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Volatilita 1Y:</span>
                  <span className="font-medium">
                    {etf.volatility_1y ? formatPercentage(etf.volatility_1y) : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max. pokles 1Y:</span>
                  <span className="font-medium text-red-600">
                    {etf.max_drawdown_1y ? formatPercentage(etf.max_drawdown_1y) : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Výnos/riziko 1Y:</span>
                  <span className="font-medium">
                    {etf.return_per_risk_1y ? formatPercentage(etf.return_per_risk_1y) : '-'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3 Year Performance */}
          <Card>
            <CardHeader>
              <CardTitle>3-letá výkonnost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">3 roky:</span>
                  <span className={`font-medium text-lg ${getReturnColor(etf.return_3y)}`}>
                    {etf.return_3y ? formatPercentage(etf.return_3y) : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Volatilita 3Y:</span>
                  <span className="font-medium">
                    {etf.volatility_3y ? formatPercentage(etf.volatility_3y) : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max. pokles 3Y:</span>
                  <span className="font-medium text-red-600">
                    {etf.max_drawdown_3y ? formatPercentage(etf.max_drawdown_3y) : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Výnos/riziko 3Y:</span>
                  <span className="font-medium">
                    {etf.return_per_risk_3y ? formatPercentage(etf.return_per_risk_3y) : '-'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 5 Year Performance */}
          <Card>
            <CardHeader>
              <CardTitle>5-letá výkonnost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">5 let:</span>
                  <span className={`font-medium text-lg ${getReturnColor(etf.return_5y)}`}>
                    {etf.return_5y ? formatPercentage(etf.return_5y) : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Volatilita 5Y:</span>
                  <span className="font-medium">
                    {etf.volatility_5y ? formatPercentage(etf.volatility_5y) : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max. pokles 5Y:</span>
                  <span className="font-medium text-red-600">
                    {etf.max_drawdown_5y ? formatPercentage(etf.max_drawdown_5y) : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Výnos/riziko 5Y:</span>
                  <span className="font-medium">
                    {etf.return_per_risk_5y ? formatPercentage(etf.return_per_risk_5y) : '-'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Rizikovost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Beta:</span>
                  <span className="font-medium">
                    {etf.beta ? etf.beta.toFixed(2) : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Korelace:</span>
                  <span className="font-medium">
                    {etf.correlation ? etf.correlation.toFixed(2) : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tracking error:</span>
                  <span className="font-medium">
                    {etf.tracking_error ? formatPercentage(etf.tracking_error) : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Information ratio:</span>
                  <span className="font-medium">
                    {etf.information_ratio ? etf.information_ratio.toFixed(2) : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max. pokles celkem:</span>
                  <span className="font-medium text-red-600">
                    {etf.max_drawdown_inception ? formatPercentage(etf.max_drawdown_inception) : '-'}
                  </span>
                </div>
              </div>
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
        {etf.description_en && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Popis fondu</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{etf.description_en}</p>
              {etf.url && (
                <div className="mt-4">
                  <Button asChild variant="outline">
                    <a href={etf.url} target="_blank" rel="noopener noreferrer">
                      Oficiální stránka fondu
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default ETFDetail;
