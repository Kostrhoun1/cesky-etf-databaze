import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, Euro, TrendingUp, TrendingDown } from 'lucide-react';
import { calculateCurrencyImpact, CurrencyImpactData } from '@/utils/currencyImpactCalculations';
import CurrencyImpactResults from './CurrencyImpactResults';

const CurrencyImpactAnalyzer: React.FC = () => {
  const [portfolioValue, setPortfolioValue] = useState<number>(1000000);
  const [usdAllocation, setUsdAllocation] = useState<number>(60);
  const [eurAllocation, setEurAllocation] = useState<number>(30);
  const [czkAllocation, setCzkAllocation] = useState<number>(10);
  const [investmentHorizon, setInvestmentHorizon] = useState<number>(10);
  const [currentUsdCzk, setCurrentUsdCzk] = useState<number>(23.5);
  const [currentEurCzk, setCurrentEurCzk] = useState<number>(25.2);
  const [results, setResults] = useState<CurrencyImpactData | null>(null);

  const handleCalculate = () => {
    // Normalizace alokace na 100%
    const totalAllocation = usdAllocation + eurAllocation + czkAllocation;
    const normalizedUsd = (usdAllocation / totalAllocation) * 100;
    const normalizedEur = (eurAllocation / totalAllocation) * 100;
    const normalizedCzk = (czkAllocation / totalAllocation) * 100;

    const params = {
      portfolioValue,
      allocations: {
        usd: normalizedUsd,
        eur: normalizedEur,
        czk: normalizedCzk
      },
      investmentHorizon,
      currentRates: {
        usdCzk: currentUsdCzk,
        eurCzk: currentEurCzk
      }
    };
    
    const calculatedResults = calculateCurrencyImpact(params);
    setResults(calculatedResults);
  };

  const totalAllocation = usdAllocation + eurAllocation + czkAllocation;
  const isAllocationValid = Math.abs(totalAllocation - 100) < 0.1;

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div>
              <CardTitle className="text-2xl">Analýza kurzového dopadu</CardTitle>
              <CardDescription>
                Analyzujte vliv kurzových změn na vaše ETF portfolio a optimalizujte měnové riziko
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Portfolio základna */}
            <Card className="bg-blue-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Portfolio základna
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="portfolioValue">Celková hodnota portfolia (Kč)</Label>
                  <Input
                    id="portfolioValue"
                    type="number"
                    value={portfolioValue || ''}
                    onChange={(e) => setPortfolioValue(Number(e.target.value) || 0)}
                    min="10000"
                    step="50000"
                  />
                </div>
                <div>
                  <Label htmlFor="investmentHorizon">Investiční horizont (roky)</Label>
                  <Input
                    id="investmentHorizon"
                    type="number"
                    value={investmentHorizon || ''}
                    onChange={(e) => setInvestmentHorizon(Number(e.target.value) || 0)}
                    min="1"
                    max="30"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Aktuální kurzy */}
            <Card className="bg-green-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Aktuální kurzy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentUsdCzk">USD/CZK kurz</Label>
                  <Input
                    id="currentUsdCzk"
                    type="number"
                    value={currentUsdCzk || ''}
                    onChange={(e) => setCurrentUsdCzk(Number(e.target.value) || 0)}
                    min="15"
                    max="35"
                    step="0.1"
                  />
                </div>
                <div>
                  <Label htmlFor="currentEurCzk">EUR/CZK kurz</Label>
                  <Input
                    id="currentEurCzk"
                    type="number"
                    value={currentEurCzk || ''}
                    onChange={(e) => setCurrentEurCzk(Number(e.target.value) || 0)}
                    min="20"
                    max="30"
                    step="0.1"
                  />
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Tip:</strong> Zadejte aktuální kurzy nebo je upravte pro analýzu různých scénářů.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Měnová expozice */}
          <Card className="bg-purple-50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Měnová expozice portfolia (podle podkladových aktiv)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="usdAllocation" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    USD alokace (%)
                  </Label>
                  <Input
                    id="usdAllocation"
                    type="number"
                    value={usdAllocation || ''}
                    onChange={(e) => setUsdAllocation(Number(e.target.value) || 0)}
                    min="0"
                    max="100"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    US akcie v jakémkoliv ETF - viz <a href="/srovnani-etf" className="text-blue-600 hover:underline">srovnání amerických ETF</a> (<a href="/etf/cspx" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CSPX</a>, VTI, SPY)
                  </p>
                </div>
                <div>
                  <Label htmlFor="eurAllocation" className="flex items-center gap-2">
                    <Euro className="h-4 w-4" />
                    EUR alokace (%)
                  </Label>
                  <Input
                    id="eurAllocation"
                    type="number"
                    value={eurAllocation || ''}
                    onChange={(e) => setEurAllocation(Number(e.target.value) || 0)}
                    min="0"
                    max="100"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Evropské akcie - další možnosti v <a href="/nastroje" className="text-blue-600 hover:underline">investičních nástrojích</a> (<a href="/etf/eunl" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">EUNL</a>, SX5E, EXSA)
                  </p>
                </div>
                <div>
                  <Label htmlFor="czkAllocation">CZK alokace (%)</Label>
                  <Input
                    id="czkAllocation"
                    type="number"
                    value={czkAllocation || ''}
                    onChange={(e) => setCzkAllocation(Number(e.target.value) || 0)}
                    min="0"
                    max="100"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    CZ dluhopisy, spořicí účty
                  </p>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <p className="text-sm text-amber-800 mb-2">
                  <strong>⚠️ Důležité:</strong> Zadejte expozici podle <strong>podkladových aktiv</strong>, ne podle měny fondu!
                </p>
                <p className="text-xs text-amber-700">
                  Například: <a href="/etf/cspx" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CSPX</a> (EUR fond kupující US akcie) = 100% USD expozice
                </p>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-100 rounded-lg">
                <span className="font-medium">Celková expozice:</span>
                <span className={`font-bold ${isAllocationValid ? 'text-green-600' : 'text-red-600'}`}>
                  {totalAllocation.toFixed(1)}%
                </span>
              </div>
              {!isAllocationValid && (
                <p className="text-sm text-red-600">
                  ⚠️ Celková expozice by měla být 100%. Automaticky se normalizuje při výpočtu.
                </p>
              )}
            </CardContent>
          </Card>


          <Button onClick={handleCalculate} className="w-full" size="lg">
            Analyzovat kurzový dopad
          </Button>
        </CardContent>
      </Card>

      {results && (
        <CurrencyImpactResults results={results} />
      )}
    </div>
  );
};

export default CurrencyImpactAnalyzer;