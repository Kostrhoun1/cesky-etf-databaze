
export interface AssetAllocation {
  stocks: number;
  bonds: number;
  cash: number;
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
