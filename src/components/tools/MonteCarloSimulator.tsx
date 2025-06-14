
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { runMonteCarloSimulation } from '@/utils/monteCarloUtils';
import { AssetAllocation, SimulationResult } from '@/types/monteCarlo';

const MonteCarloSimulator: React.FC = () => {
  const [allocation, setAllocation] = useState<AssetAllocation>({
    stocks: 60,
    bonds: 30,
    cash: 10
  });
  
  const [initialInvestment, setInitialInvestment] = useState(100000);
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [investmentPeriod, setInvestmentPeriod] = useState(20);
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAllocationChange = (asset: keyof AssetAllocation, value: number) => {
    setAllocation(prev => ({ ...prev, [asset]: value }));
  };

  const normalizeAllocation = () => {
    const total = Object.values(allocation).reduce((sum, val) => sum + val, 0);
    if (total !== 100) {
      const factor = 100 / total;
      const newAllocation = {} as AssetAllocation;
      Object.keys(allocation).forEach(key => {
        const assetKey = key as keyof AssetAllocation;
        newAllocation[assetKey] = Math.round(allocation[assetKey] * factor);
      });
      setAllocation(newAllocation);
    }
  };

  const runSimulation = async () => {
    setIsLoading(true);
    try {
      const simulationResults = await runMonteCarloSimulation({
        allocation,
        initialInvestment,
        monthlyContribution,
        years: investmentPeriod,
        simulations: 1000
      });
      setResults(simulationResults);
    } catch (error) {
      console.error('Chyba při simulaci:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalAllocation = Object.values(allocation).reduce((sum, val) => sum + val, 0);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Monte Carlo simulátor portfolia</CardTitle>
          <p className="text-sm text-gray-600">
            Jednoduchá simulace růstu portfolia s historickými daty
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Portfolio alokace */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Složení portfolia</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Akcie ({allocation.stocks}%)</Label>
                <Slider
                  value={[allocation.stocks]}
                  onValueChange={([value]) => handleAllocationChange('stocks', value)}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Dluhopisy ({allocation.bonds}%)</Label>
                <Slider
                  value={[allocation.bonds]}
                  onValueChange={([value]) => handleAllocationChange('bonds', value)}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Hotovost ({allocation.cash}%)</Label>
                <Slider
                  value={[allocation.cash]}
                  onValueChange={([value]) => handleAllocationChange('cash', value)}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <p className={`text-sm ${totalAllocation === 100 ? 'text-green-600' : 'text-red-600'}`}>
                Celkem: {totalAllocation}%
              </p>
              {totalAllocation !== 100 && (
                <Button variant="outline" size="sm" onClick={normalizeAllocation}>
                  Normalizovat na 100%
                </Button>
              )}
            </div>
          </div>

          {/* Investiční parametry */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="initialInvestment">Počáteční investice (Kč)</Label>
              <Input
                id="initialInvestment"
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="monthlyContribution">Měsíční příspěvek (Kč)</Label>
              <Input
                id="monthlyContribution"
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="investmentPeriod">Investiční horizont (roky)</Label>
              <Input
                id="investmentPeriod"
                type="number"
                value={investmentPeriod}
                onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                min="1"
                max="50"
                className="mt-2"
              />
            </div>
          </div>

          <Button 
            onClick={runSimulation} 
            disabled={isLoading || totalAllocation !== 100}
            className="w-full"
          >
            {isLoading ? 'Spouštím simulaci...' : 'Spustit Monte Carlo simulaci'}
          </Button>
        </CardContent>
      </Card>

      {/* Výsledky */}
      {results && results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Výsledky simulace</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.filter(r => r.year === investmentPeriod).map(result => (
                <div key={result.year} className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <span className="text-sm text-red-600">Pesimistický (5%)</span>
                    <div className="text-lg font-bold">{formatNumber(result.percentile5)}</div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <span className="text-sm text-orange-600">Konzervativní (25%)</span>
                    <div className="text-lg font-bold">{formatNumber(result.percentile25)}</div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <span className="text-sm text-blue-600">Realistický (50%)</span>
                    <div className="text-lg font-bold">{formatNumber(result.percentile50)}</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <span className="text-sm text-green-600">Optimistický (75%)</span>
                    <div className="text-lg font-bold">{formatNumber(result.percentile75)}</div>
                  </div>
                  <div className="p-4 bg-green-100 rounded-lg">
                    <span className="text-sm text-green-700">Velmi optimistický (95%)</span>
                    <div className="text-lg font-bold">{formatNumber(result.percentile95)}</div>
                  </div>
                </div>
              ))}
              
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <span className="text-sm text-gray-600">Celkem investováno</span>
                <div className="text-lg font-bold">
                  {formatNumber(initialInvestment + (monthlyContribution * 12 * investmentPeriod))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading && (
        <div className="text-center text-lg text-blue-600">Probíhá simulace...</div>
      )}
    </div>
  );
};

export default MonteCarloSimulator;
