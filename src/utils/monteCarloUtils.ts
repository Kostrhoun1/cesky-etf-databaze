
import { AssetAllocation, AssetData, SimulationParameters, SimulationResult, PortfolioMetrics } from '@/types/monteCarlo';

// Historická data aktiv (založeno na dlouhodobých průměrech)
const ASSET_DATA: Record<string, AssetData> = {
  usStocks: {
    name: 'Americké akcie',
    annualReturn: 0.10, // 10% roční průměr
    volatility: 0.16 // 16% volatilita
  },
  worldStocks: {
    name: 'Celosvětové akcie',
    annualReturn: 0.08, // 8% roční průměr
    volatility: 0.18 // 18% volatilita
  },
  worldBonds: {
    name: 'Celosvětové dluhopisy',
    annualReturn: 0.04, // 4% roční průměr
    volatility: 0.06 // 6% volatilita
  },
  usBonds: {
    name: 'US dluhopisy',
    annualReturn: 0.035, // 3.5% roční průměr
    volatility: 0.05 // 5% volatilita
  }
};

// Korelační matice mezi aktivy
const CORRELATION_MATRIX = {
  usStocks: { usStocks: 1.0, worldStocks: 0.85, worldBonds: -0.1, usBonds: -0.2 },
  worldStocks: { usStocks: 0.85, worldStocks: 1.0, worldBonds: -0.05, usBonds: -0.15 },
  worldBonds: { usStocks: -0.1, worldStocks: -0.05, worldBonds: 1.0, usBonds: 0.7 },
  usBonds: { usStocks: -0.2, worldStocks: -0.15, worldBonds: 0.7, usBonds: 1.0 }
};

// Box-Muller transformace pro generování normálního rozdělení
function generateNormalRandom(): number {
  let u = 0, v = 0;
  while(u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while(v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// Cholesky dekompozice pro korelované náhodné proměnné
function choleskyDecomposition(correlationMatrix: number[][]): number[][] {
  const n = correlationMatrix.length;
  const L = Array(n).fill(0).map(() => Array(n).fill(0));
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      if (i === j) {
        let sum = 0;
        for (let k = 0; k < j; k++) {
          sum += L[j][k] * L[j][k];
        }
        L[j][j] = Math.sqrt(correlationMatrix[j][j] - sum);
      } else {
        let sum = 0;
        for (let k = 0; k < j; k++) {
          sum += L[i][k] * L[j][k];
        }
        L[i][j] = (correlationMatrix[i][j] - sum) / L[j][j];
      }
    }
  }
  
  return L;
}

// Výpočet očekávaného výnosu a volatility portfolia
export function calculatePortfolioMetrics(allocation: AssetAllocation): PortfolioMetrics {
  const assets = Object.keys(allocation) as (keyof AssetAllocation)[];
  const weights = assets.map(asset => allocation[asset] / 100);
  
  // Očekávaný výnos
  const expectedReturn = assets.reduce((sum, asset, i) => 
    sum + weights[i] * ASSET_DATA[asset].annualReturn, 0
  );
  
  // Volatilita portfolia (s korelacemi)
  let variance = 0;
  for (let i = 0; i < assets.length; i++) {
    for (let j = 0; j < assets.length; j++) {
      const correlation = CORRELATION_MATRIX[assets[i]][assets[j]];
      variance += weights[i] * weights[j] * 
                 ASSET_DATA[assets[i]].volatility * 
                 ASSET_DATA[assets[j]].volatility * 
                 correlation;
    }
  }
  
  const volatility = Math.sqrt(variance);
  const sharpeRatio = expectedReturn / volatility; // Zjednodušený Sharpe ratio
  
  return { expectedReturn, volatility, sharpeRatio };
}

// Generování korelovaných výnosů
function generateCorrelatedReturns(allocation: AssetAllocation): Record<string, number> {
  const assets = Object.keys(allocation) as (keyof AssetAllocation)[];
  
  // Vytvoř korelační matici
  const correlationMatrix = assets.map(asset1 => 
    assets.map(asset2 => CORRELATION_MATRIX[asset1][asset2])
  );
  
  // Cholesky dekompozice
  const L = choleskyDecomposition(correlationMatrix);
  
  // Generuj nezávislé náhodné proměnné
  const independentReturns = assets.map(() => generateNormalRandom());
  
  // Aplikuj korelaci
  const correlatedReturns: Record<string, number> = {};
  assets.forEach((asset, i) => {
    let correlatedReturn = 0;
    for (let j = 0; j <= i; j++) {
      correlatedReturn += L[i][j] * independentReturns[j];
    }
    
    // Převeď na skutečný výnos
    const assetData = ASSET_DATA[asset];
    correlatedReturns[asset] = assetData.annualReturn + correlatedReturn * assetData.volatility;
  });
  
  return correlatedReturns;
}

// Simulace jednoho scénáře
function simulateSinglePath(params: SimulationParameters): number[] {
  const { allocation, initialInvestment, monthlyContribution, years } = params;
  const monthsTotal = years * 12;
  const values: number[] = [initialInvestment];
  
  let currentValue = initialInvestment;
  
  for (let month = 1; month <= monthsTotal; month++) {
    // Generuj měsíční výnosy (roční výnosy / 12)
    const monthlyReturns = generateCorrelatedReturns(allocation);
    
    // Spočítej vážený výnos portfolia pro tento měsíc
    let portfolioReturn = 0;
    Object.keys(allocation).forEach(asset => {
      const weight = allocation[asset as keyof AssetAllocation] / 100;
      portfolioReturn += weight * (monthlyReturns[asset] / 12);
    });
    
    // Aplikuj výnos a přidej měsíční příspěvek
    currentValue = currentValue * (1 + portfolioReturn) + monthlyContribution;
    
    // Ulož hodnotu na konci roku
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
  
  console.log('Spouštím Monte Carlo simulaci...', params);
  
  // Spusť všechny simulace
  for (let i = 0; i < simulations; i++) {
    const path = simulateSinglePath(params);
    allSimulations.push(path);
  }
  
  console.log('Simulace dokončena, zpracovávám výsledky...');
  
  // Spočítej percentily pro každý rok
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
  
  console.log('Výsledky zpracovány:', results);
  return results;
}
