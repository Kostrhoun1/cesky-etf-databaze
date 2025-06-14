import { AssetAllocation, AssetData, SimulationParameters, SimulationResult, PortfolioMetrics } from '@/types/monteCarlo';

// Historická data aktiv za posledních 30 let (1985-2024)
const ASSET_DATA: Record<string, AssetData> = {
  usLargeStocks: {
    name: 'US velké akcie (S&P 500)',
    annualReturn: 0.086, // 8.6%
    volatility: 0.168 // 16.8%
  },
  usSmallStocks: {
    name: 'US malé akcie',
    annualReturn: 0.076, // 7.6%
    volatility: 0.205 // 20.5%
  },
  internationalStocks: {
    name: 'Mezinárodní rozvinuté akcie',
    annualReturn: 0.062, // 6.2%
    volatility: 0.194 // 19.4%
  },
  emergingMarkets: {
    name: 'Akcie rozvíjejících se trhů',
    annualReturn: 0.073, // 7.3%
    volatility: 0.231 // 23.1%
  },
  canadianStocks: {
    name: 'Kanadské akcie',
    annualReturn: 0.060, // 6.0%
    volatility: 0.172 // 17.2%
  },
  reits: {
    name: 'REITs (nemovitosti)',
    annualReturn: 0.058, // 5.8%
    volatility: 0.187 // 18.7%
  },
  highYieldBonds: {
    name: 'US vysoce výnosné dluhopisy',
    annualReturn: 0.048, // 4.8%
    volatility: 0.089 // 8.9%
  },
  usBonds: {
    name: 'US vysokokvalitní dluhopisy',
    annualReturn: 0.042, // 4.2%
    volatility: 0.054 // 5.4%
  },
  internationalBonds: {
    name: 'Mezinárodní dluhopisy',
    annualReturn: 0.026, // 2.6%
    volatility: 0.108 // 10.8%
  },
  gold: {
    name: 'Zlato',
    annualReturn: 0.023, // 2.3%
    volatility: 0.162 // 16.2%
  },
  cash: {
    name: 'Hotovost (T-bills)',
    annualReturn: 0.004, // 0.4%
    volatility: 0.015 // 1.5%
  }
};

// Korelační matice založená na historických datech (1985-2024)
const CORRELATION_MATRIX = {
  usLargeStocks: { 
    usLargeStocks: 1.00, usSmallStocks: 0.85, internationalStocks: 0.78, 
    emergingMarkets: 0.65, canadianStocks: 0.74, usBonds: 0.15, 
    highYieldBonds: 0.45, internationalBonds: 0.25, reits: 0.65, 
    gold: 0.05, cash: -0.05 
  },
  usSmallStocks: { 
    usLargeStocks: 0.85, usSmallStocks: 1.00, internationalStocks: 0.72, 
    emergingMarkets: 0.70, canadianStocks: 0.68, usBonds: 0.10, 
    highYieldBonds: 0.50, internationalBonds: 0.20, reits: 0.70, 
    gold: 0.00, cash: -0.10 
  },
  internationalStocks: { 
    usLargeStocks: 0.78, usSmallStocks: 0.72, internationalStocks: 1.00, 
    emergingMarkets: 0.80, canadianStocks: 0.82, usBonds: 0.25, 
    highYieldBonds: 0.40, internationalBonds: 0.45, reits: 0.55, 
    gold: 0.15, cash: 0.00 
  },
  emergingMarkets: { 
    usLargeStocks: 0.65, usSmallStocks: 0.70, internationalStocks: 0.80, 
    emergingMarkets: 1.00, canadianStocks: 0.60, usBonds: 0.20, 
    highYieldBonds: 0.35, internationalBonds: 0.30, reits: 0.50, 
    gold: 0.10, cash: 0.05 
  },
  canadianStocks: { 
    usLargeStocks: 0.74, usSmallStocks: 0.68, internationalStocks: 0.82, 
    emergingMarkets: 0.60, canadianStocks: 1.00, usBonds: 0.22, 
    highYieldBonds: 0.42, internationalBonds: 0.35, reits: 0.58, 
    gold: 0.12, cash: 0.02 
  },
  usBonds: { 
    usLargeStocks: 0.15, usSmallStocks: 0.10, internationalStocks: 0.25, 
    emergingMarkets: 0.20, canadianStocks: 0.22, usBonds: 1.00, 
    highYieldBonds: 0.65, internationalBonds: 0.55, reits: 0.20, 
    gold: 0.30, cash: 0.35 
  },
  highYieldBonds: { 
    usLargeStocks: 0.45, usSmallStocks: 0.50, internationalStocks: 0.40, 
    emergingMarkets: 0.35, canadianStocks: 0.42, usBonds: 0.65, 
    highYieldBonds: 1.00, internationalBonds: 0.45, reits: 0.55, 
    gold: 0.15, cash: 0.20 
  },
  internationalBonds: { 
    usLargeStocks: 0.25, usSmallStocks: 0.20, internationalStocks: 0.45, 
    emergingMarkets: 0.30, canadianStocks: 0.35, usBonds: 0.55, 
    highYieldBonds: 0.45, internationalBonds: 1.00, reits: 0.30, 
    gold: 0.25, cash: 0.30 
  },
  reits: { 
    usLargeStocks: 0.65, usSmallStocks: 0.70, internationalStocks: 0.55, 
    emergingMarkets: 0.50, canadianStocks: 0.58, usBonds: 0.20, 
    highYieldBonds: 0.55, internationalBonds: 0.30, reits: 1.00, 
    gold: 0.15, cash: -0.10 
  },
  gold: { 
    usLargeStocks: 0.05, usSmallStocks: 0.00, internationalStocks: 0.15, 
    emergingMarkets: 0.10, canadianStocks: 0.12, usBonds: 0.30, 
    highYieldBonds: 0.15, internationalBonds: 0.25, reits: 0.15, 
    gold: 1.00, cash: 0.20 
  },
  cash: { 
    usLargeStocks: -0.05, usSmallStocks: -0.10, internationalStocks: 0.00, 
    emergingMarkets: 0.05, canadianStocks: 0.02, usBonds: 0.35, 
    highYieldBonds: 0.20, internationalBonds: 0.30, reits: -0.10, 
    gold: 0.20, cash: 1.00 
  }
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
  
  console.log('=== DEBUG: Portfolio Metrics Calculation ===');
  console.log('Allocation:', allocation);
  console.log('Weights:', weights);
  
  // Očekávaný výnos
  const expectedReturn = assets.reduce((sum, asset, i) => {
    const contribution = weights[i] * ASSET_DATA[asset].annualReturn;
    console.log(`${asset}: weight=${weights[i]}, return=${ASSET_DATA[asset].annualReturn}, contribution=${contribution}`);
    return sum + contribution;
  }, 0);
  
  console.log('Expected Annual Return:', expectedReturn);
  
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

// Generování korelovaných MĚSÍČNÍCH výnosů
function generateCorrelatedMonthlyReturns(allocation: AssetAllocation): Record<string, number> {
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
    
    // Převeď na skutečný MĚSÍČNÍ výnos
    const assetData = ASSET_DATA[asset];
    const monthlyExpectedReturn = assetData.annualReturn / 12;
    const monthlyVolatility = assetData.volatility / Math.sqrt(12); // Škálování volatility na měsíc
    
    correlatedReturns[asset] = monthlyExpectedReturn + correlatedReturn * monthlyVolatility;
  });
  
  return correlatedReturns;
}

// Simulace jednoho scénáře
function simulateSinglePath(params: SimulationParameters): number[] {
  const { allocation, initialInvestment, monthlyContribution, years } = params;
  const monthsTotal = years * 12;
  const values: number[] = [initialInvestment];
  
  let currentValue = initialInvestment;
  
  console.log('=== DEBUG: Single Path Simulation ===');
  console.log('Parameters:', params);
  
  // Debug první pár měsíců
  for (let month = 1; month <= monthsTotal; month++) {
    // Generuj měsíční výnosy (už jsou měsíční!)
    const monthlyReturns = generateCorrelatedMonthlyReturns(allocation);
    
    // Spočítej vážený výnos portfolia pro tento měsíc
    let portfolioReturn = 0;
    Object.keys(allocation).forEach(asset => {
      const weight = allocation[asset as keyof AssetAllocation] / 100;
      portfolioReturn += weight * monthlyReturns[asset];
    });
    
    if (month <= 3) { // Debug pouze první 3 měsíce
      console.log(`Month ${month}:`);
      console.log('  Monthly returns:', monthlyReturns);
      console.log('  Portfolio monthly return:', portfolioReturn);
      console.log('  Portfolio annual return equivalent:', portfolioReturn * 12);
    }
    
    // Aplikuj výnos a přidej měsíční příspěvek
    const oldValue = currentValue;
    currentValue = currentValue * (1 + portfolioReturn) + monthlyContribution;
    
    if (month <= 3) {
      console.log(`  Value before: ${oldValue}, after: ${currentValue}`);
    }
    
    // Ulož hodnotu na konci roku
    if (month % 12 === 0) {
      values.push(currentValue);
      console.log(`End of year ${month/12}: ${currentValue}`);
    }
  }
  
  return values;
}

// Hlavní Monte Carlo simulace
export async function runMonteCarloSimulation(params: SimulationParameters): Promise<SimulationResult[]> {
  const { simulations, years } = params;
  const allSimulations: number[][] = [];
  
  console.log('=== DEBUG: Monte Carlo Simulation Start ===');
  console.log('Spouštím Monte Carlo simulaci s novými historickými daty...', params);
  
  // Nejprve spočítej teoretické portfolio metriky
  const portfolioMetrics = calculatePortfolioMetrics(params.allocation);
  console.log('Portfolio Metrics:', portfolioMetrics);
  
  // Spusť první simulaci s detailním debugem
  console.log('=== Running first simulation with detailed debug ===');
  const firstPath = simulateSinglePath(params);
  allSimulations.push(firstPath);
  
  // Spusť zbytek simulací bez debugu
  for (let i = 1; i < simulations; i++) {
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
  
  console.log('=== DEBUG: Final Results ===');
  console.log('Year 1 median:', results[1]?.percentile50);
  console.log('Final year median:', results[results.length - 1]?.percentile50);
  console.log('Výsledky zpracovány s historickými daty:', results);
  
  return results;
}
