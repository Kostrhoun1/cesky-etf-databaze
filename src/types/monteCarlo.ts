
export interface AssetAllocation {
  usLargeStocks: number;
  usSmallStocks: number;
  internationalStocks: number;
  emergingMarkets: number;
  canadianStocks: number;
  reits: number;
  highYieldBonds: number;
  usBonds: number;
  internationalBonds: number;
  gold: number;
  cash: number;
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
