
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Percent } from 'lucide-react';
import FeeComparisonChart from './FeeComparisonChart';
import FeeComparisonTable from './FeeComparisonTable';

interface FeeScenario {
  name: string;
  totalExpenseRatio: number;
  entryFee: number;
  recurringFee: number;
  color: string;
}

interface FeeCalculationResult {
  scenario: FeeScenario;
  year: number;
  grossValue: number;
  netValue: number;
  totalFees: number;
  feeImpact: number;
}

const FeeCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(100000);
  const [recurringInvestment, setRecurringInvestment] = useState<number>(5000);
  const [recurringFrequency, setRecurringFrequency] = useState<'monthly' | 'yearly'>('monthly');
  const [averageReturn, setAverageReturn] = useState<number>(7);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(20);
  const [scenarios, setScenarios] = useState<FeeScenario[]>([
    { name: 'Levný ETF', totalExpenseRatio: 0.15, entryFee: 0, recurringFee: 0, color: '#22c55e' },
    { name: 'Aktivní fond s poplatky', totalExpenseRatio: 1.2, entryFee: 2.0, recurringFee: 10, color: '#ef4444' },
    { name: 'Bankovní fond', totalExpenseRatio: 2.0, entryFee: 3.0, recurringFee: 25, color: '#f59e0b' }
  ]);
  const [results, setResults] = useState<FeeCalculationResult[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const updateScenario = (index: number, field: keyof FeeScenario, value: string | number) => {
    const newScenarios = [...scenarios];
    if (field === 'totalExpenseRatio' || field === 'entryFee' || field === 'recurringFee') {
      newScenarios[index][field] = Number(value);
    } else {
      newScenarios[index][field] = value as string;
    }
    setScenarios(newScenarios);
  };

  const calculateFeeImpact = () => {
    const allResults: FeeCalculationResult[] = [];
    const annualReturn = averageReturn / 100;
    const monthlyReturn = annualReturn / 12;

    console.log('Starting fee calculation with:', {
      initialInvestment,
      recurringInvestment,
      recurringFrequency,
      averageReturn,
      investmentPeriod,
      scenarios
    });

    scenarios.forEach(scenario => {
      let currentValue = initialInvestment;
      let totalInvested = initialInvestment;
      let totalFeesPaid = 0;

      // Aplikuj vstupní poplatek na počáteční investici
      const initialEntryFee = (initialInvestment * scenario.entryFee) / 100;
      currentValue -= initialEntryFee;
      totalFeesPaid += initialEntryFee;

      for (let year = 1; year <= investmentPeriod; year++) {
        let yearlyFees = 0;

        if (recurringFrequency === 'monthly') {
          // Měsíční investování
          for (let month = 1; month <= 12; month++) {
            // Přidej měsíční investici
            currentValue += recurringInvestment;
            totalInvested += recurringInvestment;
            
            // Aplikuj vstupní poplatek na měsíční investici
            const monthlyEntryFee = (recurringInvestment * scenario.entryFee) / 100;
            currentValue -= monthlyEntryFee;
            yearlyFees += monthlyEntryFee;
            
            // Aplikuj měsíční výnos
            currentValue = currentValue * (1 + monthlyReturn);
            
            // Odečti měsíční TER
            const monthlyTER = (scenario.totalExpenseRatio / 100) / 12;
            const monthlyTERFee = currentValue * monthlyTER;
            currentValue -= monthlyTERFee;
            yearlyFees += monthlyTERFee;
            
            // Odečti měsíční pravidelný poplatek
            const monthlyRecurringFee = scenario.recurringFee / 12;
            currentValue -= monthlyRecurringFee;
            yearlyFees += monthlyRecurringFee;
          }
        } else {
          // Roční investování
          // Přidej roční investici na začátku roku
          currentValue += recurringInvestment;
          totalInvested += recurringInvestment;
          
          // Aplikuj vstupní poplatek na roční investici
          const yearlyEntryFee = (recurringInvestment * scenario.entryFee) / 100;
          currentValue -= yearlyEntryFee;
          yearlyFees += yearlyEntryFee;
          
          // Aplikuj roční výnos
          currentValue = currentValue * (1 + annualReturn);
          
          // Odečti roční TER
          const yearlyTER = scenario.totalExpenseRatio / 100;
          const yearlyTERFee = currentValue * yearlyTER;
          currentValue -= yearlyTERFee;
          yearlyFees += yearlyTERFee;
          
          // Odečti roční pravidelný poplatek
          currentValue -= scenario.recurringFee;
          yearlyFees += scenario.recurringFee;
        }

        totalFeesPaid += yearlyFees;

        // Vypočítej hodnotu bez poplatků pro srovnání
        let grossValue = initialInvestment;
        let grossTotalInvested = initialInvestment;
        
        for (let i = 1; i <= year; i++) {
          if (recurringFrequency === 'monthly') {
            for (let m = 1; m <= 12; m++) {
              grossValue += recurringInvestment;
              grossTotalInvested += recurringInvestment;
              grossValue = grossValue * (1 + monthlyReturn);
            }
          } else {
            grossValue += recurringInvestment;
            grossTotalInvested += recurringInvestment;
            grossValue = grossValue * (1 + annualReturn);
          }
        }

        const feeImpact = grossValue - currentValue;

        console.log(`${scenario.name} - Year ${year}:`, {
          totalInvested,
          currentValue,
          grossValue,
          totalFeesPaid,
          feeImpact
        });

        allResults.push({
          scenario,
          year,
          grossValue: Math.round(grossValue),
          netValue: Math.round(currentValue),
          totalFees: Math.round(totalFeesPaid),
          feeImpact: Math.round(feeImpact)
        });
      }
    });

    console.log('Fee calculation results:', allResults);
    setResults(allResults);
    setShowResults(true);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('cs-CZ').format(num);
  };

  const finalResults = results.filter(r => r.year === investmentPeriod);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Percent className="h-8 w-8 text-blue-600" />
            <div>
              <CardTitle className="text-2xl">Kalkulačka poplatků</CardTitle>
              <CardDescription>
                Porovnejte vliv různých poplatků na dlouhodobý výnos vašich investic
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="initial">Jednorázová investice (Kč)</Label>
              <Input
                id="initial"
                type="number"
                value={initialInvestment || ''}
                onChange={(e) => setInitialInvestment(Number(e.target.value) || 0)}
                placeholder="100 000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recurring">Pravidelná investice (Kč)</Label>
              <Input
                id="recurring"
                type="number"
                value={recurringInvestment || ''}
                onChange={(e) => setRecurringInvestment(Number(e.target.value) || 0)}
                placeholder="5 000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Frekvence pravidelné investice</Label>
              <Select value={recurringFrequency} onValueChange={(value: 'monthly' | 'yearly') => setRecurringFrequency(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Měsíčně</SelectItem>
                  <SelectItem value="yearly">Ročně</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="return">Průměrný roční výnos (%)</Label>
              <Input
                id="return"
                type="number"
                step="0.1"
                value={averageReturn || ''}
                onChange={(e) => setAverageReturn(Number(e.target.value) || 0)}
                placeholder="7"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="period">Doba investice (roky)</Label>
              <Input
                id="period"
                type="number"
                value={investmentPeriod || ''}
                onChange={(e) => setInvestmentPeriod(Number(e.target.value) || 0)}
                placeholder="20"
              />
            </div>
          </div>

          {/* Scenarios Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Scénáře poplatků</h3>
            <div className="grid gap-4">
              {scenarios.map((scenario, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                  <div className="space-y-2">
                    <Label>Název scénáře</Label>
                    <Input
                      value={scenario.name}
                      onChange={(e) => updateScenario(index, 'name', e.target.value)}
                      placeholder="Název"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>TER - roční správa (%)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={scenario.totalExpenseRatio || ''}
                      onChange={(e) => updateScenario(index, 'totalExpenseRatio', e.target.value)}
                      placeholder="0.15"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Vstupní poplatek (%)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={scenario.entryFee || ''}
                      onChange={(e) => updateScenario(index, 'entryFee', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Pravidelný poplatek (Kč/rok)</Label>
                    <Input
                      type="number"
                      value={scenario.recurringFee || ''}
                      onChange={(e) => updateScenario(index, 'recurringFee', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Vysvětlení poplatků:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li><strong>TER (Total Expense Ratio):</strong> Roční náklady na správu fondu v % z investované částky</li>
                <li><strong>Vstupní poplatek:</strong> Jednorázový poplatek při nákupu v % z investované částky</li>
                <li><strong>Pravidelný poplatek:</strong> Pevný roční poplatek v Kč (např. správa účtu, depozitář)</li>
              </ul>
            </div>
          </div>

          <Button onClick={calculateFeeImpact} className="w-full md:w-auto">
            Spočítat dopad poplatků
          </Button>

          {showResults && finalResults.length > 0 && (
            <div className="pt-6 border-t">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {finalResults.map((result) => (
                  <div key={result.scenario.name} className="p-4 rounded-lg border" style={{ borderColor: result.scenario.color }}>
                    <h4 className="font-semibold mb-2" style={{ color: result.scenario.color }}>
                      {result.scenario.name}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Konečná hodnota:</span>
                        <span className="font-medium ml-2">{formatNumber(result.netValue)} Kč</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Celkové poplatky:</span>
                        <span className="font-medium ml-2">{formatNumber(result.totalFees)} Kč</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Ztráta kvůli poplatkům:</span>
                        <span className="font-medium ml-2">{formatNumber(result.feeImpact)} Kč</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {showResults && results.length > 0 && (
        <>
          <FeeComparisonChart data={results} />
          <FeeComparisonTable data={results} investmentPeriod={investmentPeriod} />
        </>
      )}
    </div>
  );
};

export default FeeCalculator;
