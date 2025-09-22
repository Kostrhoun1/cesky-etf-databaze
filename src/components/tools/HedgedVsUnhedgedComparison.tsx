import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Shield, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ETFComparison {
  unhedged: {
    isin: string;
    name: string;
    ter_numeric: number;
    return_1y: number;
    return_3y: number;
    return_5y: number;
    return_ytd: number;
    fund_size_numeric: number;
  };
  hedged: {
    isin: string;
    name: string;
    ter_numeric: number;
    return_1y: number;
    return_3y: number;
    return_5y: number;
    return_ytd: number;
    fund_size_numeric: number;
  };
}

const HedgedVsUnhedgedComparison: React.FC = () => {
  const [comparisons, setComparisons] = useState<ETFComparison[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchETFComparisons = async () => {
      try {
        // Načíst známé páry unhedged/hedged ETF
        const pairs = [
          { 
            unhedged: 'IE000D3BWBR2', // iShares S&P 500 Swap UCITS ETF USD (Dist)
            hedged: 'IE000Z3S26J2'   // iShares S&P 500 Swap UCITS ETF EUR Hedged (Acc)
          },
          { 
            unhedged: 'IE00B4L5Y983', // iShares Core MSCI World UCITS ETF USD (Acc)
            hedged: 'IE00BKBF6H24'   // iShares Core MSCI World UCITS ETF EUR Hedged (Dist)
          }
        ];

        const comparisonsData: ETFComparison[] = [];

        for (const pair of pairs) {
          const { data: unhedgedData } = await supabase
            .from('etf_funds')
            .select('isin, name, ter_numeric, return_1y, return_3y, return_5y, return_ytd, fund_size_numeric')
            .eq('isin', pair.unhedged)
            .single();

          const { data: hedgedData } = await supabase
            .from('etf_funds')
            .select('isin, name, ter_numeric, return_1y, return_3y, return_5y, return_ytd, fund_size_numeric')
            .eq('isin', pair.hedged)
            .single();

          if (unhedgedData && hedgedData) {
            comparisonsData.push({
              unhedged: unhedgedData,
              hedged: hedgedData
            });
          }
        }

        setComparisons(comparisonsData);
      } catch (error) {
        console.error('Error fetching ETF comparisons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchETFComparisons();
  }, []);

  const formatPercentage = (value: number | null) => {
    if (value === null || value === undefined) return '-';
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const getReturnColor = (value: number | null) => {
    if (value === null || value === undefined) return 'text-gray-500';
    return value >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const formatSize = (value: number | null) => {
    if (!value) return '-';
    if (value >= 1000) return `${(value / 1000).toFixed(1)}B`;
    return `${value.toFixed(0)}M`;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border p-8 mb-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-6 w-1/3"></div>
        <div className="space-y-4">
          <div className="h-32 bg-gray-100 rounded"></div>
          <div className="h-32 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Shield className="h-6 w-6 text-blue-600" />
        Skutečné srovnání: Hedged vs Unhedged ETF
      </h2>
      <p className="text-gray-600 mb-6">
        Live data z naší databáze - porovnání stejných indexů v zajištěné a nezajištěné variantě
      </p>

      <div className="space-y-6">
        {comparisons.map((comparison, index) => {
          const indexName = comparison.unhedged.name.includes('S&P 500') ? 'S&P 500' : 
                           comparison.unhedged.name.includes('MSCI World') ? 'MSCI World' : 
                           'Index';
          
          return (
            <Card key={index} className="border-2">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg text-gray-800">
                      {indexName} - Srovnání variant
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      Stejný index, různé měnové zajištění
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    Live data
                  </Badge>
                </div>
              </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Unhedged verze */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-blue-800 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Nezajištěná (Unhedged)
                    </h3>
                    <a 
                      href={`/etf/${comparison.unhedged.isin.toLowerCase()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium text-blue-900">
                        {comparison.unhedged.name}
                      </p>
                      <p className="text-sm text-blue-700">
                        ISIN: {comparison.unhedged.isin}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-blue-600">TER:</p>
                        <p className="font-bold">{comparison.unhedged.ter_numeric?.toFixed(2)}%</p>
                      </div>
                      <div>
                        <p className="text-blue-600">Velikost:</p>
                        <p className="font-bold">€{formatSize(comparison.unhedged.fund_size_numeric)}</p>
                      </div>
                      <div>
                        <p className="text-blue-600">YTD:</p>
                        <p className={`font-bold ${getReturnColor(comparison.unhedged.return_ytd)}`}>
                          {formatPercentage(comparison.unhedged.return_ytd)}
                        </p>
                      </div>
                      <div>
                        <p className="text-blue-600">1 rok:</p>
                        <p className={`font-bold ${getReturnColor(comparison.unhedged.return_1y)}`}>
                          {formatPercentage(comparison.unhedged.return_1y)}
                        </p>
                      </div>
                      <div>
                        <p className="text-blue-600">3 roky:</p>
                        <p className={`font-bold ${getReturnColor(comparison.unhedged.return_3y)}`}>
                          {formatPercentage(comparison.unhedged.return_3y)}
                        </p>
                      </div>
                      <div>
                        <p className="text-blue-600">5 let:</p>
                        <p className={`font-bold ${getReturnColor(comparison.unhedged.return_5y)}`}>
                          {formatPercentage(comparison.unhedged.return_5y)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hedged verze */}
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-orange-800 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      EUR Zajištěná (Hedged)
                    </h3>
                    <a 
                      href={`/etf/${comparison.hedged.isin.toLowerCase()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:text-orange-800"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium text-orange-900">
                        {comparison.hedged.name}
                      </p>
                      <p className="text-sm text-orange-700">
                        ISIN: {comparison.hedged.isin}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-orange-600">TER:</p>
                        <p className="font-bold">{comparison.hedged.ter_numeric?.toFixed(2)}%</p>
                      </div>
                      <div>
                        <p className="text-orange-600">Velikost:</p>
                        <p className="font-bold">€{formatSize(comparison.hedged.fund_size_numeric)}</p>
                      </div>
                      <div>
                        <p className="text-orange-600">YTD:</p>
                        <p className={`font-bold ${getReturnColor(comparison.hedged.return_ytd)}`}>
                          {formatPercentage(comparison.hedged.return_ytd)}
                        </p>
                      </div>
                      <div>
                        <p className="text-orange-600">1 rok:</p>
                        <p className={`font-bold ${getReturnColor(comparison.hedged.return_1y)}`}>
                          {formatPercentage(comparison.hedged.return_1y)}
                        </p>
                      </div>
                      <div>
                        <p className="text-orange-600">3 roky:</p>
                        <p className={`font-bold ${getReturnColor(comparison.hedged.return_3y)}`}>
                          {formatPercentage(comparison.hedged.return_3y)}
                        </p>
                      </div>
                      <div>
                        <p className="text-orange-600">5 let:</p>
                        <p className={`font-bold ${getReturnColor(comparison.hedged.return_5y)}`}>
                          {formatPercentage(comparison.hedged.return_5y)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rozdíly a analýza */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-semibold text-gray-800 mb-3">Klíčové rozdíly:</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">TER rozdíl:</p>
                    <p className="font-bold text-red-600">
                      +{((comparison.hedged.ter_numeric || 0) - (comparison.unhedged.ter_numeric || 0)).toFixed(2)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">YTD rozdíl:</p>
                    <p className={`font-bold ${getReturnColor((comparison.hedged.return_ytd || 0) - (comparison.unhedged.return_ytd || 0))}`}>
                      {formatPercentage((comparison.hedged.return_ytd || 0) - (comparison.unhedged.return_ytd || 0))}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">1Y rozdíl:</p>
                    <p className={`font-bold ${getReturnColor((comparison.hedged.return_1y || 0) - (comparison.unhedged.return_1y || 0))}`}>
                      {formatPercentage((comparison.hedged.return_1y || 0) - (comparison.unhedged.return_1y || 0))}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {comparisons.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">
              Načítání srovnání hedged/unhedged ETF...
            </p>
            <p className="text-sm text-gray-500">
              Pokud se data nenačítají, zkontrolujte připojení k databázi.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>💡 Interpretace:</strong> Hedged verze eliminuje EUR/USD volatilitu, ale má vyšší náklady (TER + carry cost). 
          Výkonnostní rozdíly ukazují dopad měnových pohybů na nezajištěnou verzi.
        </p>
      </div>
    </div>
  );
};

export default HedgedVsUnhedgedComparison;