import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, AlertTriangle, TrendingDown, Banknote } from 'lucide-react';
import { calculateEmergencyFund, EmergencyFundData } from '@/utils/emergencyFundCalculations';
import EmergencyFundResults from './EmergencyFundResults';

const EmergencyFundCalculator: React.FC = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(40000);
  const [jobStability, setJobStability] = useState<'stable' | 'moderate' | 'unstable'>('stable');
  const [familySize, setFamilySize] = useState<number>(2);
  const [hasSecondIncome, setHasSecondIncome] = useState<boolean>(false);
  const [hasHealthInsurance, setHasHealthInsurance] = useState<boolean>(true);
  const [hasDebt, setHasDebt] = useState<boolean>(false);
  const [industryRisk, setIndustryRisk] = useState<'low' | 'medium' | 'high'>('low');
  const [currentSavings, setCurrentSavings] = useState<number>(100000);
  const [savingsGoal, setSavingsGoal] = useState<number>(0);
  const [monthlySavingCapacity, setMonthlySavingCapacity] = useState<number>(5000);
  const [results, setResults] = useState<EmergencyFundData | null>(null);

  const handleCalculate = () => {
    const params = {
      monthlyExpenses,
      jobStability,
      familySize,
      hasSecondIncome,
      hasHealthInsurance,
      hasDebt,
      industryRisk,
      currentSavings,
      monthlySavingCapacity
    };
    
    const calculatedResults = calculateEmergencyFund(params);
    setResults(calculatedResults);
    setSavingsGoal(calculatedResults.recommendedAmount);
  };

  const riskFactors = [
    { 
      factor: 'Stabilita zaměstnání', 
      value: jobStability, 
      impact: jobStability === 'stable' ? 'Nízké riziko' : jobStability === 'moderate' ? 'Střední riziko' : 'Vysoké riziko',
      color: jobStability === 'stable' ? 'text-green-600' : jobStability === 'moderate' ? 'text-yellow-600' : 'text-red-600'
    },
    { 
      factor: 'Průmysl', 
      value: industryRisk, 
      impact: industryRisk === 'low' ? 'Stabilní odvětví' : industryRisk === 'medium' ? 'Střední riziko' : 'Nestabilní odvětví',
      color: industryRisk === 'low' ? 'text-green-600' : industryRisk === 'medium' ? 'text-yellow-600' : 'text-red-600'
    },
    { 
      factor: 'Druhý příjem', 
      value: hasSecondIncome, 
      impact: hasSecondIncome ? 'Snižuje riziko' : 'Zvyšuje riziko',
      color: hasSecondIncome ? 'text-green-600' : 'text-red-600'
    },
    { 
      factor: 'Zdravotní pojištění', 
      value: hasHealthInsurance, 
      impact: hasHealthInsurance ? 'Pokryto' : 'Riziko vysokých výdajů',
      color: hasHealthInsurance ? 'text-green-600' : 'text-red-600'
    }
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-green-600" />
            <div>
              <CardTitle className="text-2xl">Kalkulačka nouzové rezervy</CardTitle>
              <CardDescription>
                Spočítejte si optimální velikost nouzové rezervy podle vaší situace
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Základní údaje */}
            <Card className="bg-blue-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Banknote className="h-5 w-5" />
                  Finanční základna
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="monthlyExpenses">Měsíční výdaje (Kč)</Label>
                  <Input
                    id="monthlyExpenses"
                    type="number"
                    value={monthlyExpenses || ''}
                    onChange={(e) => setMonthlyExpenses(Number(e.target.value) || 0)}
                    min="10000"
                    step="5000"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Zahrnuje nájem, jídlo, transport, pojištění a ostatní nezbytné výdaje
                  </p>
                </div>
                <div>
                  <Label htmlFor="currentSavings">Současné úspory (Kč)</Label>
                  <Input
                    id="currentSavings"
                    type="number"
                    value={currentSavings || ''}
                    onChange={(e) => setCurrentSavings(Number(e.target.value) || 0)}
                    min="0"
                    step="10000"
                  />
                </div>
                <div>
                  <Label htmlFor="monthlySavingCapacity">Měsíční kapacita spoření (Kč)</Label>
                  <Input
                    id="monthlySavingCapacity"
                    type="number"
                    value={monthlySavingCapacity || ''}
                    onChange={(e) => setMonthlySavingCapacity(Number(e.target.value) || 0)}
                    min="0"
                    step="1000"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Kolik si můžete měsíčně odložit na nouzovou rezervu
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Osobní situace */}
            <Card className="bg-green-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Osobní situace</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="familySize">Velikost domácnosti</Label>
                  <Input
                    id="familySize"
                    type="number"
                    value={familySize || ''}
                    onChange={(e) => setFamilySize(Number(e.target.value) || 0)}
                    min="1"
                    max="10"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasSecondIncome"
                    checked={hasSecondIncome}
                    onChange={(e) => setHasSecondIncome(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="hasSecondIncome">Druhý příjem v domácnosti</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasHealthInsurance"
                    checked={hasHealthInsurance}
                    onChange={(e) => setHasHealthInsurance(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="hasHealthInsurance">Komplexní zdravotní pojištění</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasDebt"
                    checked={hasDebt}
                    onChange={(e) => setHasDebt(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="hasDebt">Máte dluhy (hypotéka, úvěry)</Label>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Rizikové faktory */}
            <Card className="bg-orange-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Rizikové faktory
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="jobStability">Stabilita zaměstnání</Label>
                  <Select value={jobStability} onValueChange={(value: 'stable' | 'moderate' | 'unstable') => setJobStability(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stable">Stabilní (státní sektor, velké korporace)</SelectItem>
                      <SelectItem value="moderate">Střední (běžné zaměstnání)</SelectItem>
                      <SelectItem value="unstable">Nestabilní (sezónní, startup, freelance)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="industryRisk">Riziko odvětví</Label>
                  <Select value={industryRisk} onValueChange={(value: 'low' | 'medium' | 'high') => setIndustryRisk(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Nízké (healthcare, vzdělání, utilities)</SelectItem>
                      <SelectItem value="medium">Střední (většina odvětví)</SelectItem>
                      <SelectItem value="high">Vysoké (tech startupy, luxury goods)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Aktuální analýza rizika */}
            <Card className="bg-purple-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Analýza vašich rizik</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {riskFactors.map((risk, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{risk.factor}:</span>
                      <span className={`text-sm ${risk.color}`}>{risk.impact}</span>
                    </div>
                  ))}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Celkové riziko:</span>
                      <span className="font-bold">
                        {(() => {
                          const riskScore = 
                            (jobStability === 'stable' ? 1 : jobStability === 'moderate' ? 2 : 3) +
                            (industryRisk === 'low' ? 1 : industryRisk === 'medium' ? 2 : 3) +
                            (hasSecondIncome ? 0 : 1) +
                            (hasHealthInsurance ? 0 : 1) +
                            (hasDebt ? 1 : 0);
                          
                          if (riskScore <= 3) return <span className="text-green-600">Nízké</span>;
                          if (riskScore <= 6) return <span className="text-yellow-600">Střední</span>;
                          return <span className="text-red-600">Vysoké</span>;
                        })()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button onClick={handleCalculate} className="w-full" size="lg">
            Vypočítat nouzovou rezervu
          </Button>
        </CardContent>
      </Card>

      {results && (
        <EmergencyFundResults results={results} />
      )}
    </div>
  );
};

export default EmergencyFundCalculator;