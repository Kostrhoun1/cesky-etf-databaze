import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, Euro, TrendingUp, TrendingDown, Shield, Calculator, ChevronDown, ChevronUp, Info } from 'lucide-react';
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
  
  // Nové stavy pro carry cost kalkulačku
  const [usdInterestRate, setUsdInterestRate] = useState<number>(5.5);
  const [eurInterestRate, setEurInterestRate] = useState<number>(4.5);
  const [unhedgedTer, setUnhedgedTer] = useState<number>(0.07);
  const [hedgedTer, setHedgedTer] = useState<number>(0.10);
  const [showCarryCost, setShowCarryCost] = useState<boolean>(false);

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

          {/* Carry Cost rychlý přehled + rozbalitelná sekce */}
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4">
              {/* Základní přehled carry cost - vždy viditelný */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-orange-800 mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Hedged ETF náklady
                  <div className="flex items-center gap-1 text-sm text-orange-600 ml-auto">
                    <Info className="h-4 w-4" />
                    Carry + TER
                  </div>
                </h3>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white p-3 rounded-lg border border-orange-200">
                    <p className="text-xs text-gray-600 mb-1">Unhedged (CSPX)</p>
                    <p className="font-bold text-blue-600">{unhedgedTer.toFixed(2)}%</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-orange-200">
                    <p className="text-xs text-gray-600 mb-1">Hedged (CSHG)</p>
                    <p className="font-bold text-orange-600">
                      {(hedgedTer + Math.max(0, usdInterestRate - eurInterestRate)).toFixed(2)}%
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-orange-200">
                    <p className="text-xs text-gray-600 mb-1">Rozdíl</p>
                    <p className="font-bold text-red-600">
                      +{((hedgedTer + Math.max(0, usdInterestRate - eurInterestRate)) - unhedgedTer).toFixed(2)}%
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-orange-700 text-center mt-3">
                  Na {portfolioValue.toLocaleString()} Kč = <strong>+{(portfolioValue * ((hedgedTer + Math.max(0, usdInterestRate - eurInterestRate)) - unhedgedTer) / 100).toLocaleString()} Kč</strong> ročně za hedging
                </p>
              </div>

              {/* Rozbalitelná pokročilá sekce */}
              <div className="border-t border-orange-200 pt-4">
                <Button
                  variant="ghost"
                  onClick={() => setShowCarryCost(!showCarryCost)}
                  className="w-full flex items-center justify-center gap-2 text-orange-700 hover:bg-orange-100"
                >
                  {showCarryCost ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      Skrýt pokročilé nastavení
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      Upravit úrokové sazby a TER
                    </>
                  )}
                </Button>

                {showCarryCost && (
                  <div className="mt-4 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-lg border border-orange-200">
                        <h4 className="font-medium text-orange-800 mb-3">Úrokové sazby</h4>
                        <div className="space-y-2">
                          <div>
                            <Label htmlFor="usdRate" className="text-sm">USD Fed ({usdInterestRate}%)</Label>
                            <Input
                              id="usdRate"
                              type="range"
                              min="0"
                              max="10"
                              step="0.25"
                              value={usdInterestRate}
                              onChange={(e) => setUsdInterestRate(Number(e.target.value))}
                              className="w-full"
                            />
                          </div>
                          <div>
                            <Label htmlFor="eurRate" className="text-sm">EUR ECB ({eurInterestRate}%)</Label>
                            <Input
                              id="eurRate"
                              type="range"
                              min="0"
                              max="10"
                              step="0.25"
                              value={eurInterestRate}
                              onChange={(e) => setEurInterestRate(Number(e.target.value))}
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-orange-200">
                        <h4 className="font-medium text-orange-800 mb-3">TER porovnání</h4>
                        <div className="space-y-2">
                          <div>
                            <Label htmlFor="unhedgedTer" className="text-sm">Unhedged TER ({unhedgedTer}%)</Label>
                            <Input
                              id="unhedgedTer"
                              type="range"
                              min="0"
                              max="1"
                              step="0.01"
                              value={unhedgedTer}
                              onChange={(e) => setUnhedgedTer(Number(e.target.value))}
                              className="w-full"
                            />
                          </div>
                          <div>
                            <Label htmlFor="hedgedTer" className="text-sm">Hedged TER ({hedgedTer}%)</Label>
                            <Input
                              id="hedgedTer"
                              type="range"
                              min="0"
                              max="1"
                              step="0.01"
                              value={hedgedTer}
                              onChange={(e) => setHedgedTer(Number(e.target.value))}
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-orange-200">
                      <h4 className="font-medium text-orange-800 mb-2 flex items-center gap-2">
                        <Calculator className="h-4 w-4" />
                        Výpočet carry cost
                      </h4>
                      <p className="text-sm text-orange-700">
                        Carry = USD sazba - EUR sazba = {usdInterestRate}% - {eurInterestRate}% = 
                        <span className={`font-bold ml-1 ${(usdInterestRate - eurInterestRate) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {(usdInterestRate - eurInterestRate) > 0 ? '-' : '+'}{Math.abs(usdInterestRate - eurInterestRate).toFixed(2)}%
                        </span>
                      </p>
                      <p className="text-xs text-orange-600 mt-1">
                        {(usdInterestRate - eurInterestRate) > 0 
                          ? 'Negativní carry = dodatečný náklad' 
                          : 'Pozitivní carry = dodatečný příjem'
                        }
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full mt-4 h-9 text-sm">
            Analyzovat kurzový dopad
          </Button>
          
          {/* Rozbalovací předpoklady */}
          <details className="mt-4 border border-gray-200 rounded-lg">
            <summary className="p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors rounded-lg">
              <span className="font-semibold text-gray-900 text-sm">📋 Předpoklady analýzy měnového dopadu</span>
            </summary>
            <div className="p-3 border-t border-gray-200">
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• <strong>Měnová expozice:</strong> Počítána podle podkladových aktiv, ne podle měny fondu</li>
                <li>• <strong>Hedging náklady:</strong> TER rozdíl + carry cost (úrokové diferenciály)</li>
                <li>• <strong>Kurzy:</strong> Použity pro analýzu volatility a dopadů na portfolio</li>
                <li>• <strong>Carry cost:</strong> Dynamický, mění se s úrokovými sazbami centrálních bank</li>
                <li>• <strong>Volatilita:</strong> Historická data negarantují budoucí výkonnost</li>
              </ul>
            </div>
          </details>
          
        </CardContent>
      </Card>

      {results && (
        <CurrencyImpactResults results={results} />
      )}
    </div>
  );
};

export default CurrencyImpactAnalyzer;