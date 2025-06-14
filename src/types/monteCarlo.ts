
export interface AssetAllocation {
  usStocks: number;
  worldStocks: number;
  worldBonds: number;
  usBonds: number;
}

export interface AssetData {
  name: string;
  annualReturn: number;
  volatility: number;
}

export interface SimulationParameters {
  allocation: AssetAllocation;
  initialInvestment: number;
  monthlyContribution: number;
  years: number;
  simulations: number;
}

export interface SimulationResult {
  year: number;
  percentile5: number;
  percentile25: number;
  percentile50: number;
  percentile75: number;
  percentile95: number;
  mean: number;
}

export interface PortfolioMetrics {
  expectedReturn: number;
  volatility: number;
  sharpeRatio: number;
}
