
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator } from 'lucide-react';
import InvestmentChart from './InvestmentChart';
import InvestmentTable from './InvestmentTable';
import InvestmentCalculatorForm from './InvestmentCalculatorForm';
import InvestmentResultsSummary from './InvestmentResultsSummary';
import { calculateInvestment, CalculationData } from '@/utils/investmentCalculations';

const InvestmentCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(0);
  const [recurringInvestment, setRecurringInvestment] = useState<number>(0);
  const [recurringFrequency, setRecurringFrequency] = useState<'monthly' | 'yearly'>('monthly');
  const [averageReturn, setAverageReturn] = useState<number>(7);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(20);
  const [taxRate, setTaxRate] = useState<number>(0);
  const [results, setResults] = useState<CalculationData[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleCalculate = () => {
    const calculationParams = {
      initialInvestment,
      recurringInvestment,
      recurringFrequency,
      averageReturn,
      investmentPeriod,
      taxRate
    };

    const calculatedResults = calculateInvestment(calculationParams);
    setResults(calculatedResults);
    setShowResults(true);
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
        <CardContent>
          <InvestmentCalculatorForm
            initialInvestment={initialInvestment}
            setInitialInvestment={setInitialInvestment}
            recurringInvestment={recurringInvestment}
            setRecurringInvestment={setRecurringInvestment}
            recurringFrequency={recurringFrequency}
            setRecurringFrequency={setRecurringFrequency}
            averageReturn={averageReturn}
            setAverageReturn={setAverageReturn}
            investmentPeriod={investmentPeriod}
            setInvestmentPeriod={setInvestmentPeriod}
            taxRate={taxRate}
            setTaxRate={setTaxRate}
            onCalculate={handleCalculate}
          />

          {showResults && results.length > 0 && (
            <InvestmentResultsSummary results={results} />
          )}

          {/* Rozbalovací předpoklady */}
          <details className="mt-6 border border-blue-200 rounded-lg">
            <summary className="p-4 bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors rounded-lg">
              <span className="font-semibold text-blue-900">📋 Předpoklady kalkulačky (klikněte pro rozbalení)</span>
            </summary>
            <div className="p-4 border-t border-blue-200">
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• <strong>Měsíční investice:</strong> Investice probíhá vždy 1. den měsíce s okamžitou aplikací výnosu</li>
                <li>• <strong>Roční investice:</strong> Investice probíhá vždy 1. ledna s aplikací výnosu po celý rok</li>
                <li>• <strong>Složené úročení:</strong> Výnosy se reinvestují a dále zhodnocují</li>
                <li>• <strong>Konstantní výnos:</strong> Uvažujeme stabilní průměrný roční výnos (realita je volatilnější)</li>
                <li>• <strong>Daně v ČR:</strong> Časový test 3+ roky = 0% daň. Aktivní obchodování = 15%/23% daň z ročních zisků</li>
                <li>• <strong>Poplatky a inflace:</strong> Nejsou v kalkulaci zahrnuty</li>
              </ul>
            </div>
          </details>
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
