
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
