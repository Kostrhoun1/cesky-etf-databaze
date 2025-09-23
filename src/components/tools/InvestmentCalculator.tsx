
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
    <div className="space-y-6">
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-violet-600" />
            <CardTitle className="text-2xl">
              Investiční kalkulačka
            </CardTitle>
          </div>
          <CardDescription className="text-sm">
            Spočítejte si růst vašich investic s pravidelným investováním a zohledněním daní
          </CardDescription>
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
          <details className="mt-4 border border-gray-200 rounded-lg">
            <summary className="p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors rounded-lg">
              <span className="font-semibold text-gray-900 text-sm">📋 Předpoklady kalkulačky</span>
            </summary>
            <div className="p-3 border-t border-gray-200">
              <ul className="text-xs text-gray-700 space-y-1">
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
