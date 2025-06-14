import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MonteCarloChart from './MonteCarloChart';
import MonteCarloTable from './MonteCarloTable';
import { runMonteCarloSimulation } from '@/utils/monteCarloUtils';
import { AssetAllocation, SimulationResult } from '@/types/monteCarlo';

const MonteCarloSimulator: React.FC = () => {
  const [allocation, setAllocation] = useState<AssetAllocation>({
    usLargeStocks: 30,
    usSmallStocks: 10,
    internationalStocks: 20,
    emergingMarkets: 10,
    canadianStocks: 5,
    reits: 5,
    highYieldBonds: 5,
    usBonds: 10,
    internationalBonds: 0,
    gold: 5,
    cash: 0
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

  const setPresetPortfolio = (preset: string) => {
    switch (preset) {
      case 'conservative':
        setAllocation({
          usLargeStocks: 20, usSmallStocks: 5, internationalStocks: 15,
          emergingMarkets: 0, canadianStocks: 5, reits: 5,
          highYieldBonds: 15, usBonds: 25, internationalBonds: 5,
          gold: 5, cash: 0
        });
        break;
      case 'balanced':
        setAllocation({
          usLargeStocks: 30, usSmallStocks: 10, internationalStocks: 20,
          emergingMarkets: 10, canadianStocks: 5, reits: 5,
          highYieldBonds: 5, usBonds: 10, internationalBonds: 0,
          gold: 5, cash: 0
        });
        break;
      case 'aggressive':
        setAllocation({
          usLargeStocks: 40, usSmallStocks: 20, internationalStocks: 15,
          emergingMarkets: 15, canadianStocks: 5, reits: 5,
          highYieldBonds: 0, usBonds: 0, internationalBonds: 0,
          gold: 0, cash: 0
        });
        break;
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
          <CardTitle>Monte Carlo simulátor portfolia (historická data 1985-2024)</CardTitle>
          <p className="text-sm text-gray-600">
            Simulace založená na 30letých historických datech s realistickými korelacemi mezi třídami aktiv
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Přednastavená portfolia */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Rychlé přednastavení</h3>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setPresetPortfolio('conservative')}>
                Konzervativní (40% akcie)
              </Button>
              <Button variant="outline" onClick={() => setPresetPortfolio('balanced')}>
                Vyvážené (70% akcie)
              </Button>
              <Button variant="outline" onClick={() => setPresetPortfolio('aggressive')}>
                Agresivní (100% akcie)
              </Button>
            </div>
          </div>

          {/* Portfolio složení */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Detailní složení portfolia</h3>
            <Tabs defaultValue="stocks" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="stocks">Akcie</TabsTrigger>
                <TabsTrigger value="bonds">Dluhopisy</TabsTrigger>
                <TabsTrigger value="alternatives">Alternativy</TabsTrigger>
              </TabsList>
              
              <TabsContent value="stocks" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>US velké akcie ({allocation.usLargeStocks}%)</Label>
                    <Slider
                      value={[allocation.usLargeStocks]}
                      onValueChange={([value]) => handleAllocationChange('usLargeStocks', value)}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>US malé akcie ({allocation.usSmallStocks}%)</Label>
                    <Slider
                      value={[allocation.usSmallStocks]}
                      onValueChange={([value]) => handleAllocationChange('usSmallStocks', value)}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Mezinárodní akcie ({allocation.internationalStocks}%)</Label>
                    <Slider
                      value={[allocation.internationalStocks]}
                      onValueChange={([value]) => handleAllocationChange('internationalStocks', value)}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Rozvíjející se trhy ({allocation.emergingMarkets}%)</Label>
                    <Slider
                      value={[allocation.emergingMarkets]}
                      onValueChange={([value]) => handleAllocationChange('emergingMarkets', value)}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Kanadské akcie ({allocation.canadianStocks}%)</Label>
                    <Slider
                      value={[allocation.canadianStocks]}
                      onValueChange={([value]) => handleAllocationChange('canadianStocks', value)}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="bonds" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>US vysokokvalitní dluhopisy ({allocation.usBonds}%)</Label>
                    <Slider
                      value={[allocation.usBonds]}
                      onValueChange={([value]) => handleAllocationChange('usBonds', value)}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>US vysoce výnosné dluhopisy ({allocation.highYieldBonds}%)</Label>
                    <Slider
                      value={[allocation.highYieldBonds]}
                      onValueChange={([value]) => handleAllocationChange('highYieldBonds', value)}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Mezinárodní dluhopisy ({allocation.internationalBonds}%)</Label>
                    <Slider
                      value={[allocation.internationalBonds]}
                      onValueChange={([value]) => handleAllocationChange('internationalBonds', value)}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="alternatives" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>REITs - nemovitosti ({allocation.reits}%)</Label>
                    <Slider
                      value={[allocation.reits]}
                      onValueChange={([value]) => handleAllocationChange('reits', value)}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Zlato ({allocation.gold}%)</Label>
                    <Slider
                      value={[allocation.gold]}
                      onValueChange={([value]) => handleAllocationChange('gold', value)}
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
              </TabsContent>
            </Tabs>
            
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
          <MonteCarloTable 
            data={results} 
            investmentPeriod={investmentPeriod} 
            initialInvestment={initialInvestment}
            monthlyContribution={monthlyContribution}
          />
        </>
      )}
    </div>
  );
};

export default MonteCarloSimulator;
