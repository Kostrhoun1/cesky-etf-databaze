
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SimulationResult } from '@/types/monteCarlo';

interface MonteCarloTableProps {
  data: SimulationResult[];
  investmentPeriod: number;
}

const MonteCarloTable: React.FC<MonteCarloTableProps> = ({ data, investmentPeriod }) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      maximumFractionDigits: 0
    }).format(num);
  };

  const formatPercentage = (num: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(num);
  };

  // Zobraz pouze klíčové roky
  const keyYears = data.filter(result => 
    result.year === 0 || 
    result.year === 5 || 
    result.year === 10 || 
    result.year === 15 || 
    result.year === 20 || 
    result.year === investmentPeriod
  );

  const finalResult = data[data.length - 1];
  const initialValue = data[0].mean;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Přehled výsledků Monte Carlo simulace</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rok</TableHead>
                <TableHead className="text-right">Pesimistický (5%)</TableHead>
                <TableHead className="text-right">Konzervativní (25%)</TableHead>
                <TableHead className="text-right">Realistický (50%)</TableHead>
                <TableHead className="text-right">Optimistický (75%)</TableHead>
                <TableHead className="text-right">Velmi optimistický (95%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keyYears.map((result) => (
                <TableRow key={result.year}>
                  <TableCell className="font-medium">{result.year}</TableCell>
                  <TableCell className="text-right text-red-600">
                    {formatNumber(result.percentile5)}
                  </TableCell>
                  <TableCell className="text-right text-orange-600">
                    {formatNumber(result.percentile25)}
                  </TableCell>
                  <TableCell className="text-right font-medium text-blue-600">
                    {formatNumber(result.percentile50)}
                  </TableCell>
                  <TableCell className="text-right text-green-600">
                    {formatNumber(result.percentile75)}
                  </TableCell>
                  <TableCell className="text-right text-green-700">
                    {formatNumber(result.percentile95)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Shrnutí statistik */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Průměrný výnos p.a.</h4>
            <p className="text-2xl font-bold text-gray-900">
              {formatPercentage((Math.pow(finalResult.mean / initialValue, 1/investmentPeriod) - 1))}
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Medián po {investmentPeriod} letech</h4>
            <p className="text-2xl font-bold text-blue-900">
              {formatNumber(finalResult.percentile50)}
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Pravděpodobnost zisku</h4>
            <p className="text-2xl font-bold text-green-900">
              {finalResult.percentile25 > initialValue ? '>75%' : 
               finalResult.percentile50 > initialValue ? '>50%' : 
               finalResult.percentile75 > initialValue ? '>25%' : '<25%'}
            </p>
          </div>
          
          <div className="p-4 bg-orange-50 rounded-lg">
            <h4 className="font-semibold text-orange-800 mb-2">Rozpětí výsledků</h4>
            <p className="text-sm font-bold text-orange-900">
              {formatNumber(finalResult.percentile5)} - {formatNumber(finalResult.percentile95)}
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-semibold text-yellow-900 mb-2">Důležité upozornění:</h4>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Simulace je založena na historických datech a nemusí předpovídat budoucí výsledky</li>
            <li>• Neberou se v úvahu daně, inflace ani brokerské poplatky</li>
            <li>• Skutečné výsledky se mohou výrazně lišit od simulace</li>
            <li>• Investice obsahuje riziko ztráty části nebo celé investované částky</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonteCarloTable;
