
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip, ReferenceLine } from 'recharts';
import { SimulationResult } from '@/types/monteCarlo';

interface MonteCarloChartProps {
  data: SimulationResult[];
}

const MonteCarloChart: React.FC<MonteCarloChartProps> = ({ data }) => {
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      style: 'currency',
      currency: 'CZK'
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-300 p-3 rounded shadow-lg">
          <p className="font-medium">{`Rok: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${formatNumber(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monte Carlo simulace - vývoj portfolia v čase</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="year" 
                className="text-muted-foreground"
                label={{ value: 'Roky', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                className="text-muted-foreground"
                tickFormatter={formatNumber}
                label={{ value: 'Hodnota portfolia (Kč)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {/* Pesimistický scénář (5. percentil) */}
              <Line
                type="monotone"
                dataKey="percentile5"
                stroke="#ef4444"
                strokeWidth={2}
                name="Pesimistický (5%)"
                dot={false}
                strokeDasharray="5 5"
              />
              
              {/* Konzervativní scénář (25. percentil) */}
              <Line
                type="monotone"
                dataKey="percentile25"
                stroke="#f97316"
                strokeWidth={2}
                name="Konzervativní (25%)"
                dot={false}
              />
              
              {/* Medián (50. percentil) */}
              <Line
                type="monotone"
                dataKey="percentile50"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Medián (50%)"
                dot={false}
              />
              
              {/* Optimistický scénář (75. percentil) */}
              <Line
                type="monotone"
                dataKey="percentile75"
                stroke="#22c55e"
                strokeWidth={2}
                name="Optimistický (75%)"
                dot={false}
              />
              
              {/* Velmi optimistický (95. percentil) */}
              <Line
                type="monotone"
                dataKey="percentile95"
                stroke="#16a34a"
                strokeWidth={2}
                name="Velmi optimistický (95%)"
                dot={false}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-4 bg-red-50 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">Pesimistický scénář (5%)</h4>
            <p className="text-red-700">Pouze 5% simulací dosáhlo horších výsledků než tato linie</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Realistický scénář (50%)</h4>
            <p className="text-blue-700">Medián všech simulací - nejpravděpodobnější výsledek</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Optimistický scénář (75%)</h4>
            <p className="text-green-700">25% simulací dosáhlo lepších výsledků než tato linie</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonteCarloChart;
