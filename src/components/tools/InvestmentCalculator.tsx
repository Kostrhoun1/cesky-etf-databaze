import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator } from 'lucide-react';
import InvestmentChart from './InvestmentChart';
import InvestmentTable from './InvestmentTable';

interface CalculationData {
  year: number;
  totalInvested: number;
  grossValue: number;
  netValue: number;
  grossGain: number;
  netGain: number;
  tax: number;
}

const InvestmentCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(0);
  const [recurringInvestment, setRecurringInvestment] = useState<number>(0);
  const [recurringFrequency, setRecurringFrequency] = useState<'monthly' | 'yearly'>('monthly');
  const [averageReturn, setAverageReturn] = useState<number>(7);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(20);
  const [taxRate, setTaxRate] = useState<number>(0);
  const [results, setResults] = useState<CalculationData[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const calculateInvestment = () => {
    const data: CalculationData[] = [];
    const annualReturn = averageReturn / 100;
    const monthlyReturn = annualReturn / 12;
    
    console.log('Starting calculation with:', {
      initialInvestment,
      recurringInvestment,
      recurringFrequency,
      averageReturn,
      investmentPeriod,
      taxRate
    });

    let currentValue = initialInvestment;
    let totalInvested = initialInvestment;

    for (let year = 1; year <= investmentPeriod; year++) {
      if (recurringFrequency === 'monthly') {
        // Měsíční investování
        for (let month = 1; month <= 12; month++) {
          // Přidej měsíční investici
          currentValue += recurringInvestment;
          totalInvested += recurringInvestment;
          
          // Aplikuj měsíční výnos
          currentValue = currentValue * (1 + monthlyReturn);
        }
      } else {
        // Roční investování
        // Přidej roční investici na začátku roku
        currentValue += recurringInvestment;
        totalInvested += recurringInvestment;
        
        // Aplikuj roční výnos
        currentValue = currentValue * (1 + annualReturn);
      }

      const grossGain = currentValue - totalInvested;
      const tax = grossGain > 0 ? grossGain * (taxRate / 100) : 0;
      const netValue = currentValue - tax;
      const netGain = netValue - totalInvested;

      console.log(`Year ${year}:`, {
        totalInvested,
        currentValue,
        grossGain,
        tax,
        netValue,
        netGain
      });

      data.push({
        year,
        totalInvested: Math.round(totalInvested),
        grossValue: Math.round(currentValue),
        netValue: Math.round(netValue),
        grossGain: Math.round(grossGain),
        netGain: Math.round(netGain),
        tax: Math.round(tax)
      });
    }

    console.log('Final results:', data);
    setResults(data);
    setShowResults(true);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('cs-CZ').format(num);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Calculator className="h-8 w-8 text-blue-600" />
            <div>
              <CardTitle className="text-2xl">Investiční kalkulačka</CardTitle>
              <CardDescription>
                Spočítejte si růst vašich investic s pravidelným investováním a zohledněním daní
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
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recurring">Pravidelná investice (Kč)</Label>
              <Input
                id="recurring"
                type="number"
                value={recurringInvestment || ''}
                onChange={(e) => setRecurringInvestment(Number(e.target.value) || 0)}
                placeholder="0"
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

            <div className="space-y-2">
              <Label htmlFor="tax">Daň z kapitálových výnosů (%)</Label>
              <Select value={taxRate.toString()} onValueChange={(value) => setTaxRate(Number(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0% (žádná daň)</SelectItem>
                  <SelectItem value="15">15% (základní sazba)</SelectItem>
                  <SelectItem value="23">23% (vyšší sazba)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={calculateInvestment} className="w-full md:w-auto">
            Spočítat investici
          </Button>

          {showResults && results.length > 0 && (
            <div className="pt-6 border-t">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900">Celkem investováno</h4>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatNumber(results[results.length - 1].totalInvested)} Kč
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900">Čistý výnos (po dani)</h4>
                  <p className="text-2xl font-bold text-green-600">
                    {formatNumber(results[results.length - 1].netGain)} Kč
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900">Celková hodnota portfolia</h4>
                  <p className="text-2xl font-bold text-purple-600">
                    {formatNumber(results[results.length - 1].netValue)} Kč
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {showResults && results.length > 0 && (
        <>
          <InvestmentChart data={results} />
          <InvestmentTable data={results} />
        </>
      )}
    </div>
  );
};

export default InvestmentCalculator;
