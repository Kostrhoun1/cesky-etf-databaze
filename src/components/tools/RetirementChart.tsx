import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RetirementData } from '@/utils/retirementCalculations';

interface RetirementChartProps {
  results: RetirementData;
}

const RetirementChart: React.FC<RetirementChartProps> = ({ results }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Příprava dat pro akumulační graf
  const accumulationData = results.projectionData.map(item => ({
    age: item.age,
    year: item.year,
    portfolioValue: item.portfolioValue,
    realValue: item.realValue,
    contributions: item.cumulativeContributions
  }));

  // Příprava dat pro výběrovou fázi
  const withdrawalData = results.withdrawalData.slice(0, 30).map(item => ({
    age: item.age,
    year: item.year,
    portfolioValue: item.portfolioValue,
    realPortfolioValue: item.realPortfolioValue, // Přidáno pro kombinovaný graf
    yearlyWithdrawal: item.yearlyWithdrawal / 12, // Převod na měsíční
    realWithdrawal: item.realWithdrawal / 12
  }));

  // Kombinovaná data pro celkový přehled
  const combinedData = [
    ...accumulationData.map(item => ({
      age: item.age,
      phase: 'accumulation',
      portfolioValue: item.portfolioValue,
      realValue: item.realValue,
      monthlyFlow: 0 // Během akumulace nevybíráme
    })),
    ...withdrawalData.map(item => ({
      age: item.age,
      phase: 'withdrawal',
      portfolioValue: item.portfolioValue,
      realValue: item.realPortfolioValue, // Pokračuje reálná hodnota i v penzi
      monthlyFlow: -item.yearlyWithdrawal / 12 // Negativní = výběr
    }))
  ];

  return (
    <div className="space-y-6">
      {/* Akumulační fáze */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📈 Akumulační fáze - Růst portfolia do penze
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={accumulationData} margin={{ top: 10, right: 30, left: 100, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="age" 
                  label={{ value: 'Věk', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  tickFormatter={formatCurrency}
                  width={100}
                />
                <Tooltip 
                  formatter={(value: number, name: string) => [formatCurrency(value), name]}
                  labelFormatter={(age: number) => `Věk: ${age} let`}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="portfolioValue"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  name="Nominální hodnota"
                />
                <Area
                  type="monotone"
                  dataKey="realValue"
                  stackId="2"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.4}
                  name="Reálná hodnota (kupní síla)"
                />
                <Area
                  type="monotone"
                  dataKey="contributions"
                  stackId="3"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.2}
                  name="Celkové příspěvky"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Výběrová fáze */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📉 Výběrová fáze - Čerpání v penzi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={withdrawalData} margin={{ top: 10, right: 100, left: 100, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="age" 
                  label={{ value: 'Věk', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  yAxisId="portfolio"
                  orientation="left"
                  tickFormatter={formatCurrency}
                  width={100}
                />
                <YAxis 
                  yAxisId="withdrawal"
                  orientation="right"
                  tickFormatter={formatCurrency}
                  width={100}
                />
                <Tooltip 
                  formatter={(value: number, name: string) => [formatCurrency(value), name]}
                  labelFormatter={(age: number) => `Věk: ${age} let`}
                />
                <Legend />
                <Line
                  yAxisId="portfolio"
                  type="monotone"
                  dataKey="portfolioValue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  name="Zbývající portfolio"
                  dot={{ r: 4 }}
                />
                <Line
                  yAxisId="withdrawal"
                  type="monotone"
                  dataKey="yearlyWithdrawal"
                  stroke="#ef4444"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Měsíční výběr (nominální)"
                />
                <Line
                  yAxisId="withdrawal"
                  type="monotone"
                  dataKey="realWithdrawal"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Měsíční výběr (reálný)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Celkový přehled životního cyklu */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔄 Celý životní cyklus portfolia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={combinedData} margin={{ top: 10, right: 30, left: 100, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="age" 
                  label={{ value: 'Věk', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  tickFormatter={formatCurrency}
                  width={100}
                />
                <Tooltip 
                  formatter={(value: number, name: string) => [formatCurrency(value), name]}
                  labelFormatter={(age: number) => `Věk: ${age} let`}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="portfolioValue"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  name="Portfolio (nominální)"
                />
                <Area
                  type="monotone"
                  dataKey="realValue"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.4}
                  name="Portfolio (reálná hodnota)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>
              <span className="inline-block w-3 h-3 bg-blue-500 mr-2"></span>
              <strong>Akumulační fáze:</strong> Portfolio roste díky pravidelným příspěvkům a compound interest
            </p>
            <p className="mt-1">
              <span className="inline-block w-3 h-3 bg-red-500 mr-2"></span>
              <strong>Výběrová fáze:</strong> Portfolio klesá kvůli výběrům, ale stále může růst díky investicím
            </p>
            <p className="mt-1">
              <span className="inline-block w-3 h-3 bg-green-500 mr-2"></span>
              <strong>Reálná hodnota:</strong> Hodnota portfolia očištěná o vliv inflace
            </p>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default RetirementChart;