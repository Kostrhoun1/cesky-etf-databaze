
import { AssetAllocation, SimulationParameters, SimulationResult } from '@/types/monteCarlo';

// Jednoduchá historická data (roční výnosy a volatilita)
const ASSET_DATA = {
  stocks: {
    annualReturn: 0.08, // 8% ročně
    volatility: 0.16 // 16% volatilita
  },
  bonds: {
    annualReturn: 0.04, // 4% ročně
    volatility: 0.05 // 5% volatilita
  },
  cash: {
    annualReturn: 0.02, // 2% ročně
    volatility: 0.01 // 1% volatilita
  }
};

// Generování náhodného výnosu pro měsíc
function generateMonthlyReturn(annualReturn: number, volatility: number): number {
  const monthlyReturn = Math.log(1 + annualReturn) / 12;
  const monthlyVolatility = volatility / Math.sqrt(12);
  
  // Box-Muller transformace pro normální rozdělení
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  
  return Math.exp(monthlyReturn + monthlyVolatility * z0) - 1;
}

// Jedna simulace
function simulateSinglePath(params: SimulationParameters): number[] {
  const { allocation, initialInvestment, monthlyContribution, years } = params;
  const monthsTotal = years * 12;
  const values: number[] = [initialInvestment];
  let currentValue = initialInvestment;

  for (let month = 1; month <= monthsTotal; month++) {
    // Výpočet váženého výnosu portfolia
    const stockReturn = generateMonthlyReturn(ASSET_DATA.stocks.annualReturn, ASSET_DATA.stocks.volatility);
    const bondReturn = generateMonthlyReturn(ASSET_DATA.bonds.annualReturn, ASSET_DATA.bonds.volatility);
    const cashReturn = generateMonthlyReturn(ASSET_DATA.cash.annualReturn, ASSET_DATA.cash.volatility);
    
    const portfolioReturn = 
      (allocation.stocks / 100) * stockReturn +
      (allocation.bonds / 100) * bondReturn +
      (allocation.cash / 100) * cashReturn;

    // Aplikace výnosu a přidání měsíční investice
    currentValue = currentValue * (1 + portfolioReturn) + monthlyContribution;

    // Uložení hodnoty na konci roku
    if (month % 12 === 0) {
      values.push(currentValue);
    }
  }

  return values;
}

// Hlavní Monte Carlo simulace
export async function runMonteCarloSimulation(params: SimulationParameters): Promise<SimulationResult[]> {
  const { simulations, years } = params;
  const allSimulations: number[][] = [];
  
  console.log('Spouštím Monte Carlo simulaci s parametry:', params);
  
  // Spuštění všech simulací
  for (let i = 0; i < simulations; i++) {
    const path = simulateSinglePath(params);
    allSimulations.push(path);
  }
  
  // Výpočet percentilů pro každý rok
  const results: SimulationResult[] = [];
  
  for (let year = 0; year <= years; year++) {
    const yearValues = allSimulations.map(sim => sim[year]).sort((a, b) => a - b);
    
    const percentile5 = yearValues[Math.floor(simulations * 0.05)];
    const percentile25 = yearValues[Math.floor(simulations * 0.25)];
    const percentile50 = yearValues[Math.floor(simulations * 0.50)];
    const percentile75 = yearValues[Math.floor(simulations * 0.75)];
    const percentile95 = yearValues[Math.floor(simulations * 0.95)];
    const mean = yearValues.reduce((sum, val) => sum + val, 0) / yearValues.length;
    
    results.push({
      year,
      percentile5,
      percentile25,
      percentile50,
      percentile75,
      percentile95,
      mean
    });
  }
  
  console.log('Simulace dokončena');
  return results;
}
