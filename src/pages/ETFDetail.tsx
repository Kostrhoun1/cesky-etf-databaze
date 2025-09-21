
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
import ETFRating from '@/components/ETFRating';

const ETFDetail: React.FC = () => {
  const { isin } = useParams<{ isin: string }>();
  const [searchParams] = useSearchParams();
  const [etf, setEtf] = useState<ETF | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const fromPortfolio = searchParams.get('from') === 'portfolio';

  useEffect(() => {
    const fetchETFDetail = async () => {
      if (!isin) {
        console.log('❌ No ISIN provided');
        return;
      }
      
      console.log('🔍 Načítám ETF detail pro ISIN:', isin);
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('etf_funds')
          .select('*')
          .eq('isin', isin)
          .single();

        if (error) {
          console.error('❌ Error fetching ETF detail:', error);
          return;
        }

        if (data) {
          console.log('✅ ETF data loaded:', data.name, 'Rating:', data.rating);
        }
        setEtf(data);
        
        // Update page title and description for SEO
        if (data) {
          const title = `${data.name} (${data.isin}) - Analýza ETF fondu | ETF průvodce.cz`;
          const description = `Kompletní analýza ETF ${data.name} od ${data.fund_provider}. TER ${formatPercentage(data.ter_numeric)}, ${data.return_1y ? 'roční výnos ' + formatPercentage(data.return_1y) : 'výkonnostní data'}, složení portfolia a detailní informace o fondu.`;
          
          document.title = title;
          document.querySelector('meta[name="description"]')?.setAttribute('content', description);
          
          // Update Open Graph tags for social sharing
          document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
          document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
          document.querySelector('meta[property="og:url"]')?.setAttribute('content', `https://etfpruvodce.cz/etf/${data.isin}`);
          
          // Update Twitter Card tags
          document.querySelector('meta[property="twitter:title"]')?.setAttribute('content', title);
          document.querySelector('meta[property="twitter:description"]')?.setAttribute('content', description);
          document.querySelector('meta[property="twitter:url"]')?.setAttribute('content', `https://etfpruvodce.cz/etf/${data.isin}`);
          
          // Update canonical URL
          let canonicalLink = document.querySelector('link[rel="canonical"]');
          if (canonicalLink) {
            canonicalLink.setAttribute('href', `https://etfpruvodce.cz/etf/${data.isin}`);
          } else {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            canonicalLink.setAttribute('href', `https://etfpruvodce.cz/etf/${data.isin}`);
            document.head.appendChild(canonicalLink);
          }
          
          // Add structured data for ETF investment product
          const structuredData = {
            "@context": "https://schema.org",
            "@type": ["FinancialProduct", "InvestmentFund"],
            "name": data.name,
            "identifier": {
              "@type": "PropertyValue",
              "propertyID": "ISIN",
              "value": data.isin
            },
            "description": data.description_cs || data.description_en || `ETF fond ${data.name} od poskytovatele ${data.fund_provider}`,
            "provider": {
              "@type": "Organization",
              "name": data.fund_provider
            },
            "url": `https://etfpruvodce.cz/etf/${data.isin}`,
            "category": data.category,
            "currency": data.fund_currency,
            "feesAndCommissionsSpecification": {
              "@type": "UnitPriceSpecification",
              "price": data.ter_numeric,
              "priceCurrency": "percent",
              "unitText": "TER (Total Expense Ratio)"
            },
            "yields": data.current_dividend_yield_numeric ? {
              "@type": "MonetaryAmount",
              "value": data.current_dividend_yield_numeric,
              "currency": "percent"
            } : undefined,
            "fundSize": data.fund_size,
            "inceptionDate": data.inception_date,
            "trackingError": data.tracking_error,
            "distributionPolicy": data.distribution_policy,
            "domicile": data.fund_domicile,
            "aggregateRating": data.rating ? {
              "@type": "AggregateRating",
              "ratingValue": data.rating,
              "bestRating": 5,
              "worstRating": 1
            } : undefined,
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": data.fund_currency
            }
          };

          // Remove undefined fields
          Object.keys(structuredData).forEach(key => 
            structuredData[key as keyof typeof structuredData] === undefined && 
            delete structuredData[key as keyof typeof structuredData]
          );
          
          // Remove existing ETF structured data if present
          const existingStructuredData = document.querySelector('script[type="application/ld+json"][data-etf-structured-data]');
          if (existingStructuredData) {
            existingStructuredData.remove();
          }
          
          // Add new structured data
          const structuredDataScript = document.createElement('script');
          structuredDataScript.type = 'application/ld+json';
          structuredDataScript.setAttribute('data-etf-structured-data', 'true');
          structuredDataScript.textContent = JSON.stringify(structuredData);
          document.head.appendChild(structuredDataScript);
        }
      } catch (error) {
        console.error('💥 Error in fetchETFDetail:', error);
        setEtf(null);
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


  console.log('🔄 Rendering ETFDetail - isLoading:', isLoading, 'etf:', etf?.name, 'rating:', etf?.rating);

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
          {fromPortfolio && (
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
              <div className="mb-4">
                <ETFRating etf={etf} showDescription showBreakdown size="lg" />
              </div>
              <div className="flex flex-wrap gap-2">
                {etf.degiro_free && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    DEGIRO Free
                  </Badge>
                )}
                {etf.category === 'Páková ETF' && (
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 font-semibold">
                    PÁKOVÁ ETF
                  </Badge>
                )}
                <Badge variant="outline">{etf.category}</Badge>
                <Badge variant="outline">{etf.fund_domicile}</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
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
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">5 let</p>
              <p className={`text-xl font-bold ${getReturnColor(etf.return_5y)}`}>
                {etf.return_5y ? formatPercentage(etf.return_5y) : '-'}
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
                {etf.legal_structure && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Právní struktura:</span>
                    <span className="font-medium">{etf.legal_structure}</span>
                  </div>
                )}
                {etf.fund_structure && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Struktura fondu:</span>
                    <span className="font-medium">{etf.fund_structure}</span>
                  </div>
                )}
                {etf.use_of_income && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nakládání s příjmy:</span>
                    <span className="font-medium">{etf.use_of_income}</span>
                  </div>
                )}
                {etf.securities_lending && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Půjčování CP:</span>
                    <span className="font-medium">{etf.securities_lending}</span>
                  </div>
                )}
                {etf.swap_counterparty && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Swap protistrana:</span>
                    <span className="font-medium">{etf.swap_counterparty}</span>
                  </div>
                )}
                {etf.sustainability && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">ESG hodnocení:</span>
                    <span className="font-medium">{etf.sustainability}</span>
                  </div>
                )}
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
                    <TableCell className="font-medium">1 měsíc</TableCell>
                    <TableCell className={getReturnColor(etf.return_1m)}>
                      {etf.return_1m ? formatPercentage(etf.return_1m) : '-'}
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">3 měsíce</TableCell>
                    <TableCell className={getReturnColor(etf.return_3m)}>
                      {etf.return_3m ? formatPercentage(etf.return_3m) : '-'}
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">6 měsíců</TableCell>
                    <TableCell className={getReturnColor(etf.return_6m)}>
                      {etf.return_6m ? formatPercentage(etf.return_6m) : '-'}
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
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
                  <TableRow className="border-t-2 border-gray-200">
                    <TableCell className="font-medium text-sm text-blue-700">2021</TableCell>
                    <TableCell className={getReturnColor(etf.return_2021)}>
                      {etf.return_2021 ? formatPercentage(etf.return_2021) : '-'}
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-sm text-blue-700">2022</TableCell>
                    <TableCell className={getReturnColor(etf.return_2022)}>
                      {etf.return_2022 ? formatPercentage(etf.return_2022) : '-'}
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-sm text-blue-700">2023</TableCell>
                    <TableCell className={getReturnColor(etf.return_2023)}>
                      {etf.return_2023 ? formatPercentage(etf.return_2023) : '-'}
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-sm text-blue-700">2024</TableCell>
                    <TableCell className={getReturnColor(etf.return_2024)}>
                      {etf.return_2024 ? formatPercentage(etf.return_2024) : '-'}
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
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
                <CardDescription>Top 10 největších pozic v portfoliu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topHoldings.map((holding, index) => {
                    const maxWeight = Math.max(...topHoldings.map(h => h.weight));
                    const widthPercent = (holding.weight / maxWeight) * 100;
                    
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <span className="text-gray-800 font-medium">{holding.name}</span>
                          </div>
                          <span className="font-bold text-blue-600">{formatPercentage(holding.weight)}</span>
                        </div>
                        <div className="ml-11">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                              style={{ width: `${Math.min(widthPercent, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
                <div className="space-y-4">
                  {topCountries.map((country, index) => {
                    const maxWeight = Math.max(...topCountries.map(c => c.weight));
                    const widthPercent = (country.weight / maxWeight) * 100;
                    
                    // Barvy pro různé země/regiony
                    const colorVariants = [
                      'from-emerald-500 to-emerald-600',
                      'from-blue-500 to-blue-600', 
                      'from-purple-500 to-purple-600',
                      'from-orange-500 to-orange-600',
                      'from-teal-500 to-teal-600'
                    ];
                    
                    // Mapování zemí na vlajky
                    const getCountryFlag = (countryName: string): string => {
                      const name = countryName.toLowerCase();
                      if (name.includes('united states') || name.includes('usa') || name.includes('america')) return '🇺🇸';
                      if (name.includes('germany') || name.includes('německo')) return '🇩🇪';
                      if (name.includes('france') || name.includes('francie')) return '🇫🇷';
                      if (name.includes('united kingdom') || name.includes('uk') || name.includes('britain') || name.includes('británie')) return '🇬🇧';
                      if (name.includes('japan') || name.includes('japonsko')) return '🇯🇵';
                      if (name.includes('china') || name.includes('čína')) return '🇨🇳';
                      if (name.includes('switzerland') || name.includes('švýcarsko')) return '🇨🇭';
                      if (name.includes('netherlands') || name.includes('nizozemsko') || name.includes('holandsko')) return '🇳🇱';
                      if (name.includes('canada') || name.includes('kanada')) return '🇨🇦';
                      if (name.includes('australia') || name.includes('austrálie')) return '🇦🇺';
                      if (name.includes('ireland') || name.includes('irsko')) return '🇮🇪';
                      if (name.includes('italy') || name.includes('itálie')) return '🇮🇹';
                      if (name.includes('spain') || name.includes('španělsko')) return '🇪🇸';
                      if (name.includes('sweden') || name.includes('švédsko')) return '🇸🇪';
                      if (name.includes('denmark') || name.includes('dánsko')) return '🇩🇰';
                      if (name.includes('norway') || name.includes('norsko')) return '🇳🇴';
                      if (name.includes('finland') || name.includes('finsko')) return '🇫🇮';
                      if (name.includes('belgium') || name.includes('belgie')) return '🇧🇪';
                      if (name.includes('austria') || name.includes('rakousko')) return '🇦🇹';
                      if (name.includes('taiwan') || name.includes('tchaj-wan')) return '🇹🇼';
                      if (name.includes('south korea') || name.includes('korea') || name.includes('jižní korea')) return '🇰🇷';
                      if (name.includes('hong kong')) return '🇭🇰';
                      if (name.includes('singapore') || name.includes('singapur')) return '🇸🇬';
                      if (name.includes('emerging') || name.includes('rozvíjející')) return '🌍';
                      if (name.includes('europe') || name.includes('evropa')) return '🇪🇺';
                      if (name.includes('world') || name.includes('global') || name.includes('svět')) return '🌎';
                      if (name.includes('other') || name.includes('ostatní')) return '🏳️';
                      return '🏳️'; // default flag
                    };
                    
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${colorVariants[index % colorVariants.length]} shadow-sm`}></div>
                            <span className="text-gray-800 font-medium">{country.name}</span>
                            <span className="text-lg">{getCountryFlag(country.name)}</span>
                          </div>
                          <span className="font-bold text-emerald-600">{formatPercentage(country.weight)}</span>
                        </div>
                        <div className="ml-7">
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div 
                              className={`bg-gradient-to-r ${colorVariants[index % colorVariants.length]} h-3 rounded-full transition-all duration-500 ease-out shadow-sm`}
                              style={{ width: `${Math.min(widthPercent, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
                <div className="space-y-4">
                  {topSectors.map((sector, index) => {
                    const maxWeight = Math.max(...topSectors.map(s => s.weight));
                    const widthPercent = (sector.weight / maxWeight) * 100;
                    
                    // Barvy pro různé sektory
                    const sectorColors = [
                      'from-indigo-500 to-indigo-600',
                      'from-rose-500 to-rose-600',
                      'from-amber-500 to-amber-600',
                      'from-cyan-500 to-cyan-600',
                      'from-violet-500 to-violet-600'
                    ];
                    
                    // Ikony pro sektory
                    const sectorIcons = ['💼', '🏭', '💡', '🏥', '🏦'];
                    
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-lg">
                              {sectorIcons[index % sectorIcons.length]}
                            </div>
                            <span className="text-gray-800 font-medium">{sector.name}</span>
                          </div>
                          <span className="font-bold text-indigo-600">{formatPercentage(sector.weight)}</span>
                        </div>
                        <div className="ml-11">
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div 
                              className={`bg-gradient-to-r ${sectorColors[index % sectorColors.length]} h-3 rounded-full transition-all duration-700 ease-out shadow-sm`}
                              style={{ width: `${Math.min(widthPercent, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
