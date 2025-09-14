
import React from 'react';
import { CalculationData } from '@/utils/investmentCalculations';

interface InvestmentResultsSummaryProps {
  results: CalculationData[];
}

const InvestmentResultsSummary: React.FC<InvestmentResultsSummaryProps> = ({ results }) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('cs-CZ').format(num);
  };

  if (!results.length) return null;

  const finalResult = results[results.length - 1];

  return (
    <div className="pt-6 border-t">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900">Celkem investováno</h4>
          <p className="text-2xl font-bold text-blue-600">
            {formatNumber(finalResult.totalInvested)} Kč
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-900">Čistý výnos (po dani)</h4>
          <p className="text-2xl font-bold text-green-600">
            {formatNumber(finalResult.netGain)} Kč
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-900">Celková hodnota portfolia</h4>
          <p className="text-2xl font-bold text-purple-600">
            {formatNumber(finalResult.netValue)} Kč
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestmentResultsSummary;
