
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SimulationResult } from '@/types/monteCarlo';

/**
 * Vypočítá IRR (interní míru výnosnosti) pomocí Bisekční metody.
 * Je robustnější než Newton-Raphson metoda.
 */
function calculateIRR(cashFlows: number[], maxIterations = 100, tolerance = 1e-7): number {
  let low = -0.9999; // Měsíční úrok blízko -100%
  let high = 2; // Měsíční úrok 200% (ročně 2400%, velmi vysoká horní mez)
  let mid = 0;

  const npv = (rate: number) => cashFlows.reduce((acc, val, t) => acc + val / Math.pow(1 + rate, t), 0);

  const npvLow = npv(low);
  const npvHigh = npv(high);

  // Pro typickou investici (záporný CF na začátku, kladný na konci) je NPV klesající funkce.
  // Pokud jsou znaménka na hranicích intervalu stejná, kořen zde pravděpodobně není.
  if (npvLow * npvHigh >= 0) {
    return NaN;
  }

  for (let i = 0; i < maxIterations; i++) {
    mid = (low + high) / 2;
    
    if (high - low < tolerance) break;

    const npvMid = npv(mid);
    
    // Pokud má npvMid a npvLow stejné znaménko, posouváme dolní hranici. Jinak horní.
    if (npv(low) * npvMid > 0) {
      low = mid;
    } else {
      high = mid;
    }
  }
  
  const annualIRR = mid * 12;

  // Pokud je výsledek extrémní, pravděpodobně chyba v datech nebo nekonvergovalo
  if (Math.abs(annualIRR) > 5) { // > 500% je nepravděpodobné
    return NaN;
  }

  return annualIRR;
}

interface MonteCarloTableProps {
  data: SimulationResult[];
  investmentPeriod: number;
  initialInvestment: number;
  monthlyContribution: number;
}

const MonteCarloTable: React.FC<MonteCarloTableProps> = ({ data, investmentPeriod, initialInvestment, monthlyContribution }) => {
  const formatNumber = (num: number) => {
    if (!isFinite(num)) return '—';
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      maximumFractionDigits: 0
    }).format(num);
  };

  const formatPercentage = (num: number) => {
    if (!isFinite(num)) return '—';
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

  // Přesné cashflow pro IRR:
  // t=0: Počáteční investice (záporně)
  // t=1..N: Měsíční vklady (záporně)
  // t=N: K poslednímu vkladu se přičte konečná hodnota portfolia (kladně)
  const monthCount = investmentPeriod * 12;
  
  const cashFlows = new Array(monthCount + 1);
  cashFlows[0] = -initialInvestment;
  for (let i = 1; i <= monthCount; i++) {
    cashFlows[i] = -monthlyContribution;
  }
  // Přičteme finální hodnotu k poslednímu cashflow
  if (monthCount < cashFlows.length) {
    cashFlows[monthCount] += finalResult.percentile50;
  }

  // Výpočet IRR podle těchto cashflow
  const irr = calculateIRR(cashFlows);

  // Přehled investovaného a zisku
  const totalInvested = initialInvestment + monthCount * monthlyContribution;
  const medianNetGain = finalResult.percentile50 - totalInvested;

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
              {formatPercentage(irr)}
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

        {/* Přehled investované částky a čistého zisku */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <span className="text-sm text-gray-600">Celkem investováno</span>
            <div className="text-lg font-bold">{formatNumber(totalInvested)}</div>
          </div>
          <div className="p-4 bg-green-100 rounded-lg">
            <span className="text-sm text-gray-600">Skutečný výnos (medián)</span>
            <div className="text-lg font-bold text-green-700">{formatNumber(medianNetGain)}</div>
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
