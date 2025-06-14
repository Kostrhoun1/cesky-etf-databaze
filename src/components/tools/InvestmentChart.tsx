
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

interface CalculationData {
  year: number;
  totalInvested: number;
  grossValue: number;
  netValue: number;
  grossGain: number;
  netGain: number;
  tax: number;
}

interface InvestmentChartProps {
  data: CalculationData[];
}

const chartConfig = {
  totalInvested: {
    label: 'Celkem investováno',
    color: '#3b82f6'
  },
  grossValue: {
    label: 'Hrubá hodnota',
    color: '#10b981'
  },
  netValue: {
    label: 'Čistá hodnota',
    color: '#8b5cf6'
  }
};

const InvestmentChart: React.FC<InvestmentChartProps> = ({ data }) => {
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatTooltipValue = (value: number, name: string) => {
    const config = chartConfig[name as keyof typeof chartConfig];
    return [`${formatNumber(value)} Kč`, config?.label || name];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vývoj investice v čase</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[400px] w-full"
        >
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="year" 
              className="text-muted-foreground"
              label={{ value: 'Rok', position: 'insideBottom', offset: -10 }}
            />
            <YAxis 
              className="text-muted-foreground"
              tickFormatter={formatNumber}
              label={{ value: 'Hodnota (Kč)', angle: -90, position: 'insideLeft' }}
            />
            <ChartTooltip 
              content={<ChartTooltipContent formatter={formatTooltipValue} />}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalInvested"
              stroke="var(--color-totalInvested)"
              strokeWidth={2}
              name="Celkem investováno"
              dot={{ fill: 'var(--color-totalInvested)', strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="grossValue"
              stroke="var(--color-grossValue)"
              strokeWidth={2}
              name="Hrubá hodnota"
              dot={{ fill: 'var(--color-grossValue)', strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="netValue"
              stroke="var(--color-netValue)"
              strokeWidth={2}
              name="Čistá hodnota"
              dot={{ fill: 'var(--color-netValue)', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default InvestmentChart;
