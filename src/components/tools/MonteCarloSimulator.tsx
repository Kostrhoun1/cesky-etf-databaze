
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import MonteCarloChart from './MonteCarloChart';
import MonteCarloTable from './MonteCarloTable';
import { runMonteCarloSimulation } from '@/utils/monteCarloUtils';
import { AssetAllocation, SimulationResult } from '@/types/monteCarlo';

const MonteCarloSimulator: React.FC = () => {
  const [allocation, setAllocation] = useState<AssetAllocation>({
    usStocks: 40,
    worldStocks: 30,
    worldBonds: 20,
    usBonds: 10
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
      setAllocation(prev => ({
        usStocks: Math.round(prev.usStocks * factor),
        worldStocks: Math.round(prev.worldStocks * factor),
        worldBonds: Math.round(prev.worldBonds * factor),
        usBonds: Math.round(prev.usBonds * factor)
      }));
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
      console.error('Simulation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalAllocation = Object.values(allocation).reduce((sum, val) => sum + val, 0);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Monte Carlo simulátor portfolia</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Portfolio složení */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Složení portfolia</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Americké akcie ({allocation.usStocks}%)</Label>
                  <Slider
                    value={[allocation.usStocks]}
                    onValueChange={([value]) => handleAllocationChange('usStocks', value)}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Celosvětové akcie ({allocation.worldStocks}%)</Label>
                  <Slider
                    value={[allocation.worldStocks]}
                    onValueChange={([value]) => handleAllocationChange('worldStocks', value)}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Celosvětové státní dluhopisy ({allocation.worldBonds}%)</Label>
                  <Slider
                    value={[allocation.worldBonds]}
                    onValueChange={([value]) => handleAllocationChange('worldBonds', value)}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>US státní dluhopisy ({allocation.usBonds}%)</Label>
                  <Slider
                    value={[allocation.usBonds]}
                    onValueChange={([value]) => handleAllocationChange('usBonds', value)}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>
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

      {results.length > 0 && (
        <>
          <MonteCarloChart data={results} />
          <MonteCarloTable data={results} investmentPeriod={investmentPeriod} />
        </>
      )}
    </div>
  );
};

export default MonteCarloSimulator;
