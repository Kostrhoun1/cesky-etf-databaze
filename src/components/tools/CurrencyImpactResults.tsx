import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign, Euro, Shield } from 'lucide-react';
import { CurrencyImpactData } from '@/utils/currencyImpactCalculations';

interface CurrencyImpactResultsProps {
  results: CurrencyImpactData;
}

const CurrencyImpactResults: React.FC<CurrencyImpactResultsProps> = ({ results }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const getImpactColor = (impact: number) => {
    if (impact > 5) return 'text-green-600';
    if (impact > 0) return 'text-green-500';
    if (impact > -5) return 'text-red-500';
    return 'text-red-600';
  };

  const getStrategyColor = (type: string) => {
    switch (type) {
      case 'no_hedge': return 'bg-red-50 border-red-200';
      case 'partial_hedge': return 'bg-yellow-50 border-yellow-200';
      case 'full_hedge': return 'bg-green-50 border-green-200';
      case 'dynamic_hedge': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const totalExposure = results.currentExposure.unhedgedUsd + results.currentExposure.unhedgedEur;
  const totalPortfolio = totalExposure + results.currentExposure.hedgedAmount + results.currentExposure.czkAmount;

  return (
    <div className="space-y-6">
      {/* Současná expozice */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Současná měnová expozice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="bg-red-50">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-red-600" />
                  <h4 className="font-semibold text-red-800">USD Nehedged</h4>
                </div>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(results.currentExposure.unhedgedUsd)}
                </p>
                <p className="text-sm text-red-700">
                  {((results.currentExposure.unhedgedUsd / totalPortfolio) * 100).toFixed(1)}% portfolia
                </p>
              </CardContent>
            </Card>

            <Card className="bg-blue-50">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Euro className="h-4 w-4 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">EUR Nehedged</h4>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(results.currentExposure.unhedgedEur)}
                </p>
                <p className="text-sm text-blue-700">
                  {((results.currentExposure.unhedgedEur / totalPortfolio) * 100).toFixed(1)}% portfolia
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-50">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <h4 className="font-semibold text-green-800">Hedged</h4>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(results.currentExposure.hedgedAmount)}
                </p>
                <p className="text-sm text-green-700">
                  {((results.currentExposure.hedgedAmount / totalPortfolio) * 100).toFixed(1)}% portfolia
                </p>
              </CardContent>
            </Card>

            <Card className="bg-purple-50">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-purple-600 font-bold">CZK</span>
                  <h4 className="font-semibold text-purple-800">Domácí měna</h4>
                </div>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(results.currentExposure.czkAmount)}
                </p>
                <p className="text-sm text-purple-700">
                  {((results.currentExposure.czkAmount / totalPortfolio) * 100).toFixed(1)}% portfolia
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Celková kurzová expozice:</span>
              <span className="text-xl font-bold text-orange-600">
                {((totalExposure / totalPortfolio) * 100).toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={(totalExposure / totalPortfolio) * 100} 
              className="mt-2" 
            />
          </div>
        </CardContent>
      </Card>

      {/* Scénáře */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Kurzové scénáře a dopady
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.scenarios.map((scenario, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{scenario.name}</h4>
                      <p className="text-sm text-gray-600">{scenario.description}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">
                        {scenario.probability}% pravděpodobnost
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">USD/CZK změna</p>
                      <p className={`font-bold ${scenario.usdCzkChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatPercentage(scenario.usdCzkChange)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">EUR/CZK změna</p>
                      <p className={`font-bold ${scenario.eurCzkChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatPercentage(scenario.eurCzkChange)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Dopad na portfolio</p>
                      <p className={`font-bold ${getImpactColor(scenario.portfolioImpact)}`}>
                        {formatPercentage(scenario.portfolioImpact)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Nová hodnota</p>
                      <p className="font-bold">
                        {formatCurrency(scenario.portfolioValueCzk)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Doporučená strategie */}
      <Card className={getStrategyColor(results.recommendations.strategy.type)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Doporučená hedging strategie
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">{results.recommendations.strategy.name}</h3>
              <p className="text-gray-700 mb-4">{results.recommendations.strategy.description}</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-semibold">Optimální hedge ratio:</span>
                <Badge variant="default" className="text-lg px-3 py-1">
                  {results.recommendations.optimalHedgingRatio}%
                </Badge>
              </div>
              <p className="text-sm text-gray-600 italic">{results.recommendations.strategy.suitability}</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-800 mb-2">✅ Výhody:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  {results.recommendations.strategy.pros.map((pro, idx) => (
                    <li key={idx}>• {pro}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-800 mb-2">❌ Nevýhody:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  {results.recommendations.strategy.cons.map((con, idx) => (
                    <li key={idx}>• {con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ETF doporučení */}
      <Card>
        <CardHeader>
          <CardTitle>Doporučené ETF podle strategie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.recommendations.etfRecommendations.map((etf, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-lg">{etf.ticker}</h4>
                      <Badge variant={etf.hedged ? 'default' : 'outline'}>
                        {etf.currency} {etf.hedged ? 'Hedged' : 'Unhedged'}
                      </Badge>
                      <Badge variant="secondary">
                        {etf.allocation.toFixed(1)}% alokace
                      </Badge>
                    </div>
                  </div>
                  <p className="font-medium text-gray-800 mb-2">{etf.name}</p>
                  <p className="text-sm text-gray-600">{etf.reason}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rizikové metriky */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Rizikové metriky
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Portfolio volatilita:</span>
              <span className="font-semibold">{results.riskMetrics.portfolioVolatility.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Měnová volatilita:</span>
              <span className="font-semibold">{(results.riskMetrics.currencyVolatility * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Max drawdown (odhad):</span>
              <span className="font-semibold text-red-600">{results.riskMetrics.maxDrawdown.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Value at Risk (95%):</span>
              <span className="font-semibold text-orange-600">{formatCurrency(results.riskMetrics.valueAtRisk)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historická analýza</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Nejhorší období: {results.historicalAnalysis.worstCase.period}</h4>
              <p className="text-sm text-gray-700">
                Portfolio dopad: <span className="font-semibold text-red-600">
                  {formatPercentage(results.historicalAnalysis.worstCase.totalPortfolioImpact)}
                </span>
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Nejlepší období: {results.historicalAnalysis.bestCase.period}</h4>
              <p className="text-sm text-gray-700">
                Portfolio dopad: <span className="font-semibold text-green-600">
                  {formatPercentage(results.historicalAnalysis.bestCase.totalPortfolioImpact)}
                </span>
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Průměrný roční dopad</h4>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">{results.historicalAnalysis.averageImpact.toFixed(1)}%</span> ročně
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Implementační rada */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">💡 Implementační doporučení</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Okamžité kroky:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Přehodnotit současnou měnovou alokaci portfolia</li>
                <li>• Zvážit přechod na {results.recommendations.optimalHedgingRatio}% hedged pozice</li>
                <li>• Monitorovat kurzy EUR/CZK a USD/CZK</li>
                <li>• Nastavit rebalancing pravidla</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Dlouhodobá strategie:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Pravidelně revidovat hedging ratio každých 6-12 měsíců</li>
                <li>• Sledovat změny v měnových trendech</li>
                <li>• Diverzifikovat mezi různé měny a regiony</li>
                <li>• Zvážit dynamický hedging při velkých kurzových změnách</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrencyImpactResults;