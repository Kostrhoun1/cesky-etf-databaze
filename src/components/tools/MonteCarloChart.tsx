
import React from "react";
import { SimulationResult } from "@/types/monteCarlo";
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  XAxis,
  YAxis,
  Area,
  CartesianGrid,
  Legend,
} from "recharts";

interface MonteCarloChartProps {
  results: SimulationResult[];
}

const chartConfig = {
  percentile5: { label: "Pesimistický (5%)", color: "#fca5a5" },
  percentile25: { label: "Konzervativní (25%)", color: "#fdba74" },
  percentile50: { label: "Realistický (50%)", color: "#60a5fa" },
  percentile75: { label: "Optimistický (75%)", color: "#86efac" },
  percentile95: { label: "Velmi optimistický (95%)", color: "#4ade80" },
  mean: { label: "Průměr", color: "#64748b" },
};

export const MonteCarloChart: React.FC<MonteCarloChartProps> = ({ results }) => {
  if (!results || results.length === 0) return null;

  // Formátování Y osa v Kč
  const formatCurrency = (num: number) =>
    new Intl.NumberFormat("cs-CZ", {
      style: "currency",
      currency: "CZK",
      maximumFractionDigits: 0,
    }).format(num);

  return (
    // Zvětšená výška + padding pro komfortní rozestup
    <div className="w-full h-[440px] pb-8 flex items-start">
      <ChartContainer config={chartConfig}>
        <AreaChart data={results} margin={{ top: 16, right: 24, left: 4, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" tickFormatter={(year) => `${year}. rok`} />
          <YAxis
            tickFormatter={formatCurrency}
            width={90}
            domain={["auto", "auto"]}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelKey="year"
                formatter={(value: number, name: string) => (
                  <span>
                    {formatCurrency(value)} – {chartConfig[name as keyof typeof chartConfig]?.label}
                  </span>
                )}
              />
            }
          />
          <Legend content={<ChartLegendContent nameKey="dataKey" />} />
          <Area
            type="monotone"
            dataKey="percentile5"
            stroke={chartConfig.percentile5.color}
            fill={chartConfig.percentile5.color}
            fillOpacity={0.13}
            dot={false}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="percentile25"
            stroke={chartConfig.percentile25.color}
            fill={chartConfig.percentile25.color}
            fillOpacity={0.18}
            dot={false}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="percentile50"
            stroke={chartConfig.percentile50.color}
            fill={chartConfig.percentile50.color}
            fillOpacity={0.22}
            dot={false}
            strokeWidth={3}
          />
          <Area
            type="monotone"
            dataKey="percentile75"
            stroke={chartConfig.percentile75.color}
            fill={chartConfig.percentile75.color}
            fillOpacity={0.18}
            dot={false}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="percentile95"
            stroke={chartConfig.percentile95.color}
            fill={chartConfig.percentile95.color}
            fillOpacity={0.13}
            dot={false}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="mean"
            stroke={chartConfig.mean.color}
            fill="none"
            dot={false}
            strokeDasharray="6 3"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default MonteCarloChart;

