import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, BarChart3, Info, Download, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

interface ETFData {
  isin: string;
  name: string;
  return_ytd: number | null;
  return_1y: number | null;
  return_3y: number | null;
  return_5y: number | null;
  ter_numeric: number | null;
}

interface PortfolioStrategy {
  id: string;
  name: string;
  description: string;
  philosophy: string;
  riskLevel: 'Konzervativní' | 'Umírněné' | 'Agresivní';
  expectedReturn: string;
  maxDrawdown: string;
  allocations: Array<{
    asset: string;
    percentage: number;
    isin: string;
    etfName: string;
  }>;
}

// URL mapping pro jednotlivé strategie
const getStrategyUrl = (strategyId: string): string => {
  const urlMap: Record<string, string> = {
    'permanent': '/portfolio-strategie/permanentni-portfolio',
    'nobel': '/portfolio-strategie/nobel-portfolio', 
    'threefund': '/portfolio-strategie/bogleheads-three-fund',
    'stock': '/portfolio-strategie/akciove-portfolio',
    'allweather': '/portfolio-strategie/ray-dalio-all-weather'
  };
  return urlMap[strategyId] || '/portfolio-strategie';
};

const portfolioStrategies: PortfolioStrategy[] = [
  {
    id: 'permanent',
    name: 'Permanentní Portfolio',
    description: 'Stabilita ve všech ekonomických podmínkách',
    philosophy: 'Klasické portfolio založené na teorii, že čtyři základní aktivní třídy reagují odlišně na ekonomické cykly.',
    riskLevel: 'Konzervativní',
    expectedReturn: '4-6% ročně',
    maxDrawdown: 'Do -15%',
    allocations: [
      { asset: 'Akcie', percentage: 25, isin: 'IE00BK5BQT80', etfName: 'Vanguard FTSE All-World' },
      { asset: 'Dluhopisy', percentage: 25, isin: 'IE00B3DKXQ41', etfName: 'iShares Core Global Aggregate Bond' },
      { asset: 'Komodity', percentage: 25, isin: 'IE00BDFL4P12', etfName: 'iShares Diversified Commodity Swap' },
      { asset: 'Zlato', percentage: 25, isin: 'IE00B4ND3602', etfName: 'iShares Physical Gold ETC' },
    ],
  },
  {
    id: 'nobel',
    name: 'Nobelovo Portfolio',
    description: 'Vyváženost mezi rizikem a výnosem',
    philosophy: 'Založeno na moderní portfoliové teorii a výzkumech nositelů Nobelovy ceny za ekonomii.',
    riskLevel: 'Umírněné',
    expectedReturn: '6-8% ročně',
    maxDrawdown: 'Do -25%',
    allocations: [
      { asset: 'Rozvinuté akcie', percentage: 40, isin: 'IE00BKX55T58', etfName: 'Vanguard FTSE Developed World' },
      { asset: 'Rozvíjející se akcie', percentage: 20, isin: 'IE00BK5BR626', etfName: 'Vanguard FTSE Emerging Markets' },
      { asset: 'Dluhopisy', percentage: 30, isin: 'IE00BG47KH54', etfName: 'Vanguard Global Bond Index' },
      { asset: 'REIT', percentage: 10, isin: 'IE00B1FZS467', etfName: 'iShares Developed Markets Property Yield' },
    ],
  },
  {
    id: 'stock',
    name: 'Akciové Portfolio',
    description: 'Maximální růstový potenciál',
    philosophy: 'Čistě akciový přístup založený na historických datech o dlouhodobé nadřazenosti akcií.',
    riskLevel: 'Agresivní',
    expectedReturn: '8-12% ročně',
    maxDrawdown: 'Do -40%',
    allocations: [
      { asset: 'USA', percentage: 50, isin: 'IE00B5BMR087', etfName: 'iShares Core S&P 500' },
      { asset: 'Evropa', percentage: 25, isin: 'IE00B4K48X80', etfName: 'iShares Core MSCI Europe' },
      { asset: 'Asie a rozvojové trhy', percentage: 20, isin: 'IE00BK5BR626', etfName: 'Vanguard FTSE Emerging Markets' },
      { asset: 'Technologické akcie', percentage: 5, isin: 'IE00B53SZB19', etfName: 'iShares NASDAQ 100' },
    ],
  },
  {
    id: 'allweather',
    name: 'Ray Dalio All-Weather',
    description: 'Funguje ve všech ekonomických prostředích',
    philosophy: 'Portfolio navržené legendárním Ray Daliem, které má fungovat ve všech ekonomických podmínkách.',
    riskLevel: 'Konzervativní',
    expectedReturn: '5-8% ročně',
    maxDrawdown: 'Do -20%',
    allocations: [
      { asset: 'Dlouhodobé dluhopisy', percentage: 40, isin: 'IE00B4WXJJ64', etfName: 'iShares Core EUR Govt Bond' },
      { asset: 'Akcie', percentage: 30, isin: 'IE00BK5BQT80', etfName: 'Vanguard FTSE All-World' },
      { asset: 'Střednědobé dluhopisy', percentage: 15, isin: 'IE00B3DKXQ41', etfName: 'iShares Core Global Aggregate Bond' },
      { asset: 'Komodity', percentage: 7.5, isin: 'IE00BDFL4P12', etfName: 'iShares Diversified Commodity Swap' },
      { asset: 'Zlato', percentage: 7.5, isin: 'IE00B4ND3602', etfName: 'iShares Physical Gold ETC' },
    ],
  },
  {
    id: 'threefund',
    name: 'Bogleheads Three-Fund',
    description: 'Jednoduchost a nízké náklady',
    philosophy: 'Extrémně jednoduchý přístup založený na učení Jacka Boglea, zakladatele Vanguard.',
    riskLevel: 'Umírněné',
    expectedReturn: '6-9% ročně',
    maxDrawdown: 'Do -30%',
    allocations: [
      { asset: 'Rozvinuté světové akcie', percentage: 60, isin: 'IE00BKX55T58', etfName: 'Vanguard FTSE Developed World' },
      { asset: 'Rozvíjející se trhy', percentage: 20, isin: 'IE00BK5BR626', etfName: 'Vanguard FTSE Emerging Markets' },
      { asset: 'Světové dluhopisy', percentage: 20, isin: 'IE00BG47KH54', etfName: 'Vanguard Global Bond Index' },
    ],
  },
];

const PortfolioStrategies: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<string>('permanent');
  const [etfData, setEtfData] = useState<Record<string, ETFData>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchETFData();
  }, []);

  const fetchETFData = async () => {
    try {
      // Získáme všechny ISINy ze strategií
      const allISINs = portfolioStrategies.flatMap(strategy => 
        strategy.allocations.map(allocation => allocation.isin)
      );
      const uniqueISINs = [...new Set(allISINs)];

      const { data, error } = await supabase
        .from('etf_funds')
        .select('isin, name, return_ytd, return_1y, return_3y, return_5y, ter_numeric')
        .in('isin', uniqueISINs);

      if (error) {
        console.error('Error fetching ETF data:', error);
        return;
      }

      // Převedeme na mapu pro rychlý přístup
      const etfMap: Record<string, ETFData> = {};
      data?.forEach(etf => {
        etfMap[etf.isin] = etf;
      });

      setEtfData(etfMap);
    } catch (error) {
      console.error('Error fetching ETF data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePortfolioPerformance = (strategy: PortfolioStrategy) => {
    const periods = ['return_ytd', 'return_1y', 'return_3y', 'return_5y'] as const;
    const results: Record<string, number | null> = {};

    for (const period of periods) {
      let weightedReturn = 0;
      let totalAvailableWeight = 0;
      let missingETFs: string[] = [];

      // Nejprve zkontrolujeme, která ETF mají dostupná data pro dané období
      for (const allocation of strategy.allocations) {
        const etf = etfData[allocation.isin];
        if (etf && etf[period] !== null && etf[period] !== undefined) {
          weightedReturn += (allocation.percentage / 100) * etf[period]!;
          totalAvailableWeight += allocation.percentage / 100;
        } else {
          missingETFs.push(`${allocation.etfName} (${allocation.isin})`);
        }
      }

      // Pouze pokud máme data pro alespoň 80% portfolia, vypočítáme performance
      if (totalAvailableWeight >= 0.8) {
        // Renormalizujeme váhy na 100% pro dostupná ETF
        results[period] = weightedReturn / totalAvailableWeight;
      } else {
        console.warn(`Insufficient data for ${strategy.name} - ${period}: Missing data for ${missingETFs.join(', ')}`);
        results[period] = null;
      }
    }

    return results;
  };

  const formatPerformance = (value: number | null) => {
    if (value === null) return '-';
    const formatted = value.toFixed(2);
    return `${value >= 0 ? '+' : ''}${formatted}%`;
  };

  const getPerformanceColor = (value: number | null) => {
    if (value === null) return 'text-gray-500';
    return value >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'Konzervativní': return 'bg-blue-100 text-blue-800';
      case 'Umírněné': return 'bg-yellow-100 text-yellow-800';
      case 'Agresivní': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const selectedStrategyData = portfolioStrategies.find(s => s.id === selectedStrategy);
  const performance = selectedStrategyData ? calculatePortfolioPerformance(selectedStrategyData) : {};

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Načítám data portfolií...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          5 Osvědčených Portfolio Strategií
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Porovnejte reálnou performance různých investičních přístupů na základě aktuálních dat z naší databáze ETF fondů.
        </p>
      </div>

      {/* Strategy Selector */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {portfolioStrategies.map((strategy) => (
          <Button
            key={strategy.id}
            variant={selectedStrategy === strategy.id ? "default" : "outline"}
            onClick={() => setSelectedStrategy(strategy.id)}
            className={`px-6 py-3 ${
              selectedStrategy === strategy.id
                ? 'bg-violet-600 text-white hover:bg-violet-700'
                : 'hover:bg-violet-50 hover:border-violet-300'
            }`}
          >
            {strategy.name}
          </Button>
        ))}
      </div>

      {/* Selected Strategy Details */}
      {selectedStrategyData && (
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Strategy Info */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">{selectedStrategyData.name}</h3>
              <div className="flex items-center gap-2">
                <Badge className={getRiskBadgeColor(selectedStrategyData.riskLevel)}>
                  {selectedStrategyData.riskLevel}
                </Badge>
                <Button asChild size="sm" variant="outline" className="border-violet-300 text-violet-600 hover:bg-violet-50">
                  <Link to={getStrategyUrl(selectedStrategyData.id)}>
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Detail
                  </Link>
                </Button>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{selectedStrategyData.description}</p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Filosofie
              </h4>
              <p className="text-sm text-gray-600">{selectedStrategyData.philosophy}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Očekávaný výnos:</span>
                <p className="font-semibold">{selectedStrategyData.expectedReturn}</p>
              </div>
              <div>
                <span className="text-gray-500">Maximální pokles:</span>
                <p className="font-semibold">{selectedStrategyData.maxDrawdown}</p>
              </div>
            </div>
          </Card>

          {/* Performance */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Reálná Performance
            </h3>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">YTD</p>
                <p className={`text-2xl font-bold ${getPerformanceColor(performance.return_ytd as number)}`}>
                  {formatPerformance(performance.return_ytd as number)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">1 rok</p>
                <p className={`text-2xl font-bold ${getPerformanceColor(performance.return_1y as number)}`}>
                  {formatPerformance(performance.return_1y as number)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">3 roky</p>
                <p className={`text-2xl font-bold ${getPerformanceColor(performance.return_3y as number)}`}>
                  {formatPerformance(performance.return_3y as number)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">5 let</p>
                <p className={`text-2xl font-bold ${getPerformanceColor(performance.return_5y as number)}`}>
                  {formatPerformance(performance.return_5y as number)}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                * Performance je vypočítána na základě vážených průměrů skutečných výnosů ETF fondů v portfoliu
              </p>
              {Object.values(performance).some(value => value === null) && (
                <p className="text-xs text-amber-600 mt-1">
                  ⚠️ Některá období nemají kompletní data pro všechna ETF v portfoliu
                </p>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Portfolio Allocation */}
      {selectedStrategyData && (
        <Card className="p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Složení portfolia</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Aktivum</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Alokace</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">ETF</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">ISIN</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">YTD</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">TER</th>
                </tr>
              </thead>
              <tbody>
                {selectedStrategyData.allocations.map((allocation, index) => {
                  const etf = etfData[allocation.isin];
                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{allocation.asset}</td>
                      <td className="py-3 px-4 text-right font-semibold">
                        {allocation.percentage}%
                      </td>
                      <td className="py-3 px-4">
                        <Link 
                          to={`/etf/${allocation.isin}`}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {allocation.etfName}
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-sm">
                        {allocation.isin}
                      </td>
                      <td className={`py-3 px-4 text-right font-semibold ${
                        getPerformanceColor(etf?.return_ytd || null)
                      }`}>
                        {etf ? formatPerformance(etf.return_ytd) : (
                          <span className="text-amber-600 text-xs">
                            ⚠️ Chybí data
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right text-sm">
                        {etf?.ter_numeric ? `${etf.ter_numeric.toFixed(2)}%` : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* CTA */}
      <div className="bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Chcete se dozvědět více?</h3>
        <p className="text-lg text-blue-100 mb-6">
          Stáhněte si náš komplexní průvodce s detailním popisem všech strategií, praktickými radami a tipy pro implementaci.
        </p>
        <Link 
          to="/navod-pro-zacatecniky"
          className="bg-white text-violet-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Stáhnout průvodce zdarma
        </Link>
      </div>
    </div>
  );
};

export default PortfolioStrategies;