import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PiggyBank, TrendingUp, Calendar, AlertTriangle, Calculator, Target, Info, Zap } from 'lucide-react';
import { calculateRetirement, RetirementData } from '@/utils/retirementCalculations';
import RetirementChart from './RetirementChart';
import RetirementResultsSummary from './RetirementResultsSummary';

const RetirementPlanner: React.FC = () => {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [currentSavings, setCurrentSavings] = useState<number>(500000);
  const [monthlySavings, setMonthlySavings] = useState<number>(15000);
  const [expectedReturn, setExpectedReturn] = useState<number>(7);
  const [inflationRate, setInflationRate] = useState<number>(2.5);
  const [monthlyExpensesInRetirement, setMonthlyExpensesInRetirement] = useState<number>(40000);
  const [withdrawalStrategy, setWithdrawalStrategy] = useState<'fixed' | 'percentage' | 'dynamic'>('percentage');
  const [safeWithdrawalRate, setSafeWithdrawalRate] = useState<number>(4);
  const [accumulationStrategy, setAccumulationStrategy] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate');
  const [withdrawalPortfolioStrategy, setWithdrawalPortfolioStrategy] = useState<'conservative' | 'moderate' | 'aggressive'>('conservative');
  const [results, setResults] = useState<RetirementData | null>(null);
  const [activeTab, setActiveTab] = useState<string>('basic');

  const handleCalculate = () => {
    const params = {
      currentAge,
      retirementAge,
      currentSavings,
      monthlySavings,
      expectedReturn,
      inflationRate,
      monthlyExpensesInRetirement,
      withdrawalStrategy,
      safeWithdrawalRate,
      accumulationStrategy,
      withdrawalPortfolioStrategy
    };
    
    const calculatedResults = calculateRetirement(params);
    setResults(calculatedResults);
  };

  const yearsToRetirement = retirementAge - currentAge;
  const totalSavingsPeriod = yearsToRetirement * 12;
  const estimatedTotal = currentSavings * Math.pow(1.07, yearsToRetirement) + (monthlySavings * 12 * ((Math.pow(1.07, yearsToRetirement) - 1) / 0.07));
  const monthlyPension = estimatedTotal * (safeWithdrawalRate / 100) / 12;

  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PiggyBank className="h-10 w-10 text-green-600" />
              <div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Penzijní plánovač
                </CardTitle>
                <CardDescription className="text-lg">
                  Moderní kalkulačka pro plánování vaší finanční nezávislosti
                </CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Rychlý odhad</div>
              <div className="text-2xl font-bold text-green-600">
                {Math.round(monthlyPension).toLocaleString()} Kč/měsíc
              </div>
              <div className="text-xs text-gray-500">při odchodu do penze</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="basic" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Základní údaje
              </TabsTrigger>
              <TabsTrigger value="strategy" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Investice & Strategie
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Pokročilé
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Základní údaje o věku */}
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      Věk a časový horizont
                      <Badge variant="outline" className="ml-auto">
                        {yearsToRetirement} let do penze
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="currentAge" className="text-sm font-medium">Současný věk</Label>
                        <Input
                          id="currentAge"
                          type="number"
                          value={currentAge || ''}
                          onChange={(e) => setCurrentAge(Number(e.target.value) || 0)}
                          min="18"
                          max="80"
                          className="text-lg font-semibold"
                        />
                      </div>
                      <div>
                        <Label htmlFor="retirementAge" className="text-sm font-medium">Věk odchodu do penze</Label>
                        <Input
                          id="retirementAge"
                          type="number"
                          value={retirementAge || ''}
                          onChange={(e) => setRetirementAge(Number(e.target.value) || 0)}
                          min={currentAge + 1}
                          max="80"
                          className="text-lg font-semibold"
                        />
                      </div>
                    </div>
                    <div className="bg-blue-100 p-4 rounded-lg border border-blue-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-800">{yearsToRetirement}</div>
                        <div className="text-sm text-blue-600">let na spoření</div>
                        <div className="text-xs text-blue-500 mt-1">
                          {totalSavingsPeriod} měsíců aktivního investování
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Úspory a měsíční spoření */}
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      Úspory a pravidelné spoření
                      <Badge variant="outline" className="ml-auto text-green-700">
                        {Math.round(estimatedTotal/1000000*10)/10}M Kč celo
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="currentSavings" className="text-sm font-medium flex items-center gap-2">
                        Současné úspory (Kč)
                        <Info className="h-3 w-3 text-gray-400" />
                      </Label>
                      <Input
                        id="currentSavings"
                        type="number"
                        value={currentSavings || ''}
                        onChange={(e) => setCurrentSavings(Number(e.target.value) || 0)}
                        min="0"
                        step="10000"
                        className="text-lg font-semibold"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Kolik již máte naspořeno (ETF, akcie, fondy, spořicí účty)
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="monthlySavings" className="text-sm font-medium flex items-center gap-2">
                        Měsíční spoření (Kč)
                        <Badge variant="secondary" className="text-xs">
                          {Math.round(monthlySavings * 12 / 1000)}K Kč/rok
                        </Badge>
                      </Label>
                      <Input
                        id="monthlySavings"
                        type="number"
                        value={monthlySavings || ''}
                        onChange={(e) => setMonthlySavings(Number(e.target.value) || 0)}
                        min="0"
                        step="1000"
                        className="text-lg font-semibold"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Kolik budete pravidelně investovat každý měsíc
                      </p>
                    </div>

                    <Separator />
                    
                    <div className="bg-green-100 p-4 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">Předpokladné výsledky:</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-green-600">Portfolio v důchodu:</div>
                          <div className="font-bold text-green-800">{Math.round(estimatedTotal/1000)/1000} mil. Kč</div>
                        </div>
                        <div>
                          <div className="text-green-600">Měsíční příjem:</div>
                          <div className="font-bold text-green-800">{Math.round(monthlyPension).toLocaleString()} Kč</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Penční potřeby */}
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-purple-600" />
                      Penční potřeby v penzi
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="monthlyExpenses" className="text-sm font-medium">
                        Měsíční potřeba v dnešních penězích (Kč)
                      </Label>
                      <Input
                        id="monthlyExpenses"
                        type="number"
                        value={monthlyExpensesInRetirement || ''}
                        onChange={(e) => setMonthlyExpensesInRetirement(Number(e.target.value) || 0)}
                        min="10000"
                        step="5000"
                        className="text-lg font-semibold"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Kolik bude stát vaše živobytí v penzi (v současné kupní síle)
                      </p>
                    </div>
                    
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <p className="text-sm text-purple-700">
                        <strong>Za {yearsToRetirement} let</strong> bude tato částka ve skutečnosti činit{' '}
                        <span className="font-bold">
                          {Math.round(monthlyExpensesInRetirement * Math.pow(1 + inflationRate/100, yearsToRetirement)).toLocaleString()} Kč/měsíc
                        </span> (kvůli inflaci)
                      </p>
                    </div>
                  </CardContent>
                </Card>
                {/* Rychlá strategie */}
                <Card className="bg-gradient-to-br from-orange-50 to-yellow-50">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="h-5 w-5 text-orange-600" />
                      Strategie čerpání
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Jak chcete čerpat v penzi?</Label>
                      <Select value={withdrawalStrategy} onValueChange={(value: 'fixed' | 'percentage' | 'dynamic') => setWithdrawalStrategy(value)}>
                        <SelectTrigger className="text-base">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">📊 {safeWithdrawalRate}% z portfolia ročně</SelectItem>
                          <SelectItem value="fixed">💰 Pevná měsíční částka</SelectItem>
                          <SelectItem value="dynamic">⚖️ Hybridní (nejbezpečnější)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {withdrawalStrategy === 'percentage' && (
                      <div>
                        <Label htmlFor="safeWithdrawalRate" className="text-sm font-medium">
                          Withdrawal rate (%)
                        </Label>
                        <Input
                          id="safeWithdrawalRate"
                          type="number"
                          value={safeWithdrawalRate || ''}
                          onChange={(e) => setSafeWithdrawalRate(Number(e.target.value) || 0)}
                          min="2"
                          max="6"
                          step="0.1"
                          className="text-lg font-semibold"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          4% = klasické, 3% = konzervativní, 5%+ = riskantni
                        </p>
                      </div>
                    )}
                    
                    <div className="bg-orange-100 p-3 rounded-lg border border-orange-200">
                      <div className="text-sm text-orange-700">
                        {withdrawalStrategy === 'percentage' && (
                          <p> <strong>📊 {safeWithdrawalRate}% pravidlo:</strong> Vybiráte {safeWithdrawalRate}% z portfolia každý rok</p>
                        )}
                        {withdrawalStrategy === 'fixed' && (
                          <p><strong>💰 Pevná částka:</strong> Vybiráte podle vášich potřeb</p>
                        )}
                        {withdrawalStrategy === 'dynamic' && (
                          <p><strong>⚖️ Hybridní:</strong> Kombinuje oba přístupy = nejbezpečnější</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="strategy" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Očekávaný výnos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="expectedReturn">Roční výnos (%)</Label>
                      <Input
                        id="expectedReturn"
                        type="number"
                        value={expectedReturn || ''}
                        onChange={(e) => setExpectedReturn(Number(e.target.value) || 0)}
                        min="0"
                        max="15"
                        step="0.5"
                        className="text-lg font-semibold"
                      />
                      <p className="text-xs text-gray-600 mt-1">
                        Historický průměr: ETF 7-8%, akcie 8-10%
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Inflace</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="inflationRate">Roční inflace (%)</Label>
                      <Input
                        id="inflationRate"
                        type="number"
                        value={inflationRate || ''}
                        onChange={(e) => setInflationRate(Number(e.target.value) || 0)}
                        min="0"
                        max="10"
                        step="0.1"
                        className="text-lg font-semibold"
                      />
                      <p className="text-xs text-gray-600 mt-1">
                        Dlouhodobý průměr v ČR: 2-3%
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Portfolio během spoření</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="accumulationStrategy">Strategie 30-65 let</Label>
                      <Select value={accumulationStrategy} onValueChange={(value: 'conservative' | 'moderate' | 'aggressive') => setAccumulationStrategy(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conservative">🛡️ Konzervativní</SelectItem>
                          <SelectItem value="moderate">⚖️ Vyvážené</SelectItem>
                          <SelectItem value="aggressive">🚀 Agresivní</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Portfolio v penzi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="withdrawalPortfolioStrategy">Strategie 65+ let</Label>
                      <Select value={withdrawalPortfolioStrategy} onValueChange={(value: 'conservative' | 'moderate' | 'aggressive') => setWithdrawalPortfolioStrategy(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conservative">🛡️ Konzervativní</SelectItem>
                          <SelectItem value="moderate">⚖️ Vyvážené</SelectItem>
                          <SelectItem value="aggressive">🚀 Agresivní</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          
          <div className="mt-8">
            <Button 
              onClick={handleCalculate} 
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
              size="lg"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Vypočítat detailní penzijní plán
            </Button>
          </div>
        </CardContent>
      </Card>

      {results && (
        <div className="space-y-8">
          <div className="text-center py-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">📊 Výsledky vaší penzijní simulace</h2>
            <p className="text-gray-600">Detailní analýza vašeho finančního plánu na penzi</p>
          </div>
          <RetirementResultsSummary results={results} />
          <RetirementChart results={results} />
        </div>
      )}
    </div>
  );
};

export default RetirementPlanner;