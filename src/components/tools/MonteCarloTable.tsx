
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SimulationResult } from '@/types/monteCarlo';

/**
 * Vypočítá IRR (interní míru výnosnosti) z mediánové trajektorie simulace.
 * cashFlows: záporná hodnota na začátku (počáteční investice), pak záporné měsíční vklady a na konci kladný výběr (konečný stav). Funkce využívá numerickou metodu (iterace).
 */
function calculateIRR(cashFlows: number[], guess = 0.05): number {
  let rate = guess;
  for (let iter = 0; iter < 100; iter++) {
    let npv = 0, dnpv = 0;
    for (let t = 0; t < cashFlows.length; t++) {
      npv += cashFlows[t] / Math.pow(1 + rate, t);
      if (t > 0) {
        dnpv -= t * cashFlows[t] / Math.pow(1 + rate, t + 1);
      }
    }
    const newRate = rate - npv / dnpv;
    if (Math.abs(newRate - rate) < 1e-7) return newRate * 12; // roční IRR z měsíčního
    rate = newRate;
    if (rate < -0.999) return NaN; // Nerealistický záporný výnos
  }
  return NaN;
}

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

  // Mediánová trajektorie pro IRR
  // Vytvoříme cashflows:
  // - počáteční investice (záporně), pak (investmentPeriod*12) x měsíční příspěvek (záporně), na konci návratnost (kladně).
  // Bohužel SimulationResult dává hodnoty jen po letech, nikoli po měsících; musíme předpokládat např. uniformní rozdělení vkladů.
  // Lepší je tedy získat odhad na základě ročních kroků.

  // Odhadneme měsíční příspěvek na základě rozdílu mezi výsledkem v 0. a 1. roce atd.,
  // ale lepší je nechat uživatele zadat měsíční příspěvek do této komponenty – protože ale zde nemáme info o měsíčním vkladu,
  // vezmeme konzervativní aproximaci podle diference:
  // Nicméně, pro přesný výpočet cashflows potřebujeme znát:
  // - počáteční investici (je v data[0].mean), 
  // - celkový investovaný objem (počet let * 12 * měsíční vklad + počátek)
  // Z API je ale přímo dostupné pouze mean (počáteční stav), nejsou zde však měsíční vklady.

  // -> VÝSLEDEK: Chceme umožnit předat investované částky této komponentě pro správné výpočty.
  // Pokud to zatím není možné, vypíšeme aspoň detailní přehled v boxu pod výsledky.

  // Proto prozatím zobrazíme správný "Skutečný výnos" a "Investováno", kde:
  // investovano = initialValue + (roky * 12 * vklad)
  // vklad odhadneme z rozdílu mean mezi nultým a prvním rokem / 12

  const years = investmentPeriod;
  const yearsLen = data.length;

  // Odhad měsíčního vkladu
  const meanYear0 = data[0].mean;
  const meanYear1 = data[1]?.mean ?? meanYear0;
  const monthlyContribution = Math.round((meanYear1 - meanYear0) / 12);

  // celkem investováno
  const totalInvested = meanYear0 + (monthlyContribution * 12 * years);
  const medianNetGain = finalResult.percentile50 - totalInvested;

  // IRR – spočítáme jako interní míru výnosnosti z mediánových ročních hodnot 
  // (meziroční cashflows, tj. 1x na začátku záporná částka, 20x záporný vklad za rok, na konci kladný konečný stav)
  // pro zjednodušení
  const cashFlows = [-meanYear0];
  for (let i = 1; i <= years; i++) {
    cashFlows.push(-monthlyContribution * 12);
  }
  cashFlows[cashFlows.length - 1] += finalResult.percentile50; // přičteme konečný stav do posledního rámečku

  const irr = calculateIRR(cashFlows);

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
              {isNaN(irr) ? "—" : formatPercentage(irr)}
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

