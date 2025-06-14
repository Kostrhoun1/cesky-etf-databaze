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

// Zjednodušená korelační matice (hlavní vztahy)
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

// Výpočet očekávaného výnosu a volatility portfolia
export function calculatePortfolioMetrics(allocation: AssetAllocation): PortfolioMetrics {
  const assets = Object.keys(allocation) as (keyof AssetAllocation)[];
  const weights = assets.map(asset => allocation[asset] / 100);
  
  console.log('=== Portfolio Metrics Calculation ===');
  console.log('Allocation:', allocation);
  
  // Očekávaný výnos
  const expectedReturn = assets.reduce((sum, asset, i) => {
    return sum + weights[i] * ASSET_DATA[asset].annualReturn;
  }, 0);
  
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
  const sharpeRatio = expectedReturn / volatility;
  
  console.log('Expected Return:', expectedReturn.toFixed(4));
  console.log('Portfolio Volatility:', volatility.toFixed(4));
  
  return { expectedReturn, volatility, sharpeRatio };
}

/**
 * Pomocná funkce: vytvoří pole všech klíčů aktiv ve správném pořadí (důležité pro korelace!)
 */
function getAssetOrder(): (keyof AssetAllocation)[] {
  return [
    'usLargeStocks',
    'usSmallStocks',
    'internationalStocks',
    'emergingMarkets',
    'canadianStocks',
    'reits',
    'highYieldBonds',
    'usBonds',
    'internationalBonds',
    'gold',
    'cash'
  ];
}

/**
 * Převede korelační matici na kovarianční matici (užívá roční volatility).
 */
function correlationToCovariance(corr: number[][], stdDevs: number[]): number[][] {
  const size = corr.length;
  const cov: number[][] = Array.from({ length: size }, () => Array(size).fill(0));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      cov[i][j] = corr[i][j] * stdDevs[i] * stdDevs[j];
    }
  }
  return cov;
}

/**
 * Choleského rozklad symmetric pozitivně definitní matice (k vygenerování korelovaných náhodných veličin).
 * Lze projít i bez knihovny, protože n=11 je malé.
 */
function choleskyDecomposition(matrix: number[][]): number[][] {
  const n = matrix.length;
  const L: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let sum = 0;
      for (let k = 0; k < j; k++) {
        sum += L[i][k] * L[j][k];
      }
      if (i === j) {
        L[i][j] = Math.sqrt(Math.max(matrix[i][i] - sum, 0));
      } else {
        if (L[j][j] === 0) {
          L[i][j] = 0;
        } else {
          L[i][j] = (matrix[i][j] - sum) / L[j][j];
        }
      }
    }
  }
  return L;
}

/**
 * Vygeneruje vektor standardních normálních náhodných veličin.
 */
function generateStandardNormalVector(dim: number): number[] {
  const out = [];
  for (let i = 0; i < dim; i++) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    const normal = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    out.push(normal);
  }
  return out;
}

/**
 * Vygeneruje měsíční výnosy všech aktiv [korelovaně], použije explicitně zadané roční hodnoty!
 */
function generateCorrelatedMonthlyReturns(): Record<string, number> {
  const assetOrder = getAssetOrder();
  const n = assetOrder.length;

  // Přidáno kontrolní výpis ročních driftů/volatility:
  if (Math.random() < 0.01) { // jen občas
    assetOrder.forEach(a => {
      const annualRet = ASSET_DATA[a].annualReturn;
      const annualVol = ASSET_DATA[a].volatility;
      const drift = Math.log(1 + annualRet) / 12 - 0.5 * (annualVol * annualVol) / 12;
      const sd = annualVol / Math.sqrt(12);
      console.log(`Asset: ${a} | annualRet: ${(annualRet*100).toFixed(2)}% | drift: ${(drift*100).toFixed(3)}%/m | sd: ${(sd*100).toFixed(2)}%/m`);
    });
  }

  const drifts = assetOrder.map(a => {
    const annualRet = ASSET_DATA[a].annualReturn;
    const annualVol = ASSET_DATA[a].volatility;
    return Math.log(1 + annualRet) / 12 - 0.5 * (annualVol * annualVol) / 12;
  });
  const stdDevs = assetOrder.map(a => ASSET_DATA[a].volatility / Math.sqrt(12));

  const corrMat = assetOrder.map(a1 => assetOrder.map(a2 => CORRELATION_MATRIX[a1][a2]));
  const covMat = correlationToCovariance(corrMat, stdDevs);
  const chol = choleskyDecomposition(covMat);
  const z = generateStandardNormalVector(n);

  const returns: number[] = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let k = 0; k <= i; k++) {
      sum += chol[i][k] * z[k];
    }
    let r = Math.exp(drifts[i] + sum) - 1;
    const maxReturn = Math.exp(drifts[i] + 3 * stdDevs[i]) - 1;
    const minReturn = Math.exp(drifts[i] - 3 * stdDevs[i]) - 1;
    returns[i] = Math.max(-0.25, Math.min(0.25, Math.max(minReturn, Math.min(r, maxReturn))));
  }

  const result: Record<string, number> = {};
  assetOrder.forEach((a, i) => { result[a] = returns[i]; });
  return result;
}

/**
 * Generuje jeden měsíční vektor výnosů, přiřadí 0 tam, kde je v alokaci 0 %.
 */
function generatePortfolioMonthlyReturns(allocation: AssetAllocation): Record<string, number> {
  const returns = generateCorrelatedMonthlyReturns();
  const adjusted: Record<string, number> = {};
  Object.keys(allocation).forEach(a => {
    adjusted[a] = allocation[a as keyof AssetAllocation] === 0 ? 0 : returns[a];
  });
  return adjusted;
}

// Upravujeme simulací jednoho scénáře tak, aby užíval korelované výnosy!
function simulateSinglePath(params: SimulationParameters): number[] {
  const { allocation, initialInvestment, monthlyContribution, years } = params;
  const monthsTotal = years * 12;
  const values: number[] = [initialInvestment];
  let currentValue = initialInvestment;

  for (let month = 1; month <= monthsTotal; month++) {
    const monthlyReturns = generatePortfolioMonthlyReturns(allocation);
    let portfolioReturn = 0;
    Object.keys(allocation).forEach(asset => {
      const weight = allocation[asset as keyof AssetAllocation] / 100;
      portfolioReturn += weight * monthlyReturns[asset];
    });

    // Přidáno: debug kontrola jednotlivého měsíce
    if (month <= 3) {
      console.log(`[Debug] Month ${month} start: value=${currentValue}, monthlyReturn=${(portfolioReturn*100).toFixed(2)}%`);
    }

    // Kapitalizace: vklad na KONCI měsíce (realističtější, než na začátku)
    currentValue = currentValue * (1 + portfolioReturn);
    currentValue += monthlyContribution;

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
  
  console.log('=== Monte Carlo Simulation Start ===');
  console.log('Parameters:', params);
  
  // Spočítej teoretické portfolio metriky
  const portfolioMetrics = calculatePortfolioMetrics(params.allocation);
  console.log('Theoretical Portfolio Metrics:', portfolioMetrics);
  console.log('Expected annual return:', (portfolioMetrics.expectedReturn * 100).toFixed(2) + '%');
  
  // Spusť simulace
  for (let i = 0; i < simulations; i++) {
    const path = simulateSinglePath(params);
    allSimulations.push(path);
    
    // Debug první simulace
    if (i === 0) {
      console.log('=== First Simulation Results ===');
      console.log('Final value:', path[path.length - 1]);
      const totalReturn = (path[path.length - 1] / path[0]) - 1;
      const annualizedReturn = Math.pow(1 + totalReturn, 1/years) - 1;
      console.log('Total return:', (totalReturn * 100).toFixed(2) + '%');
      console.log('Annualized return:', (annualizedReturn * 100).toFixed(2) + '%');
      
      // Kontrola vstupních příspěvků
      const totalContributions = path[0] + (params.monthlyContribution * 12 * years);
      const netGain = path[path.length - 1] - totalContributions;
      console.log('Total contributions:', totalContributions);
      console.log('Net investment gain:', netGain);
    }
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
  
  // Debug finálních výsledků s realistickým výpočtem
  const finalResult = results[results.length - 1];
  const initialValue = results[0].mean;
  const totalContributions = initialValue + (params.monthlyContribution * 12 * years);
  const netGainMedian = finalResult.percentile50 - totalContributions;
  const totalReturnMedian = netGainMedian / totalContributions;
  const annualizedReturnMedian = Math.pow(1 + totalReturnMedian, 1/years) - 1;
  
  console.log('=== Final Results Analysis ===');
  console.log('Median final value:', finalResult.percentile50);
  console.log('Total contributions:', totalContributions);
  console.log('Net investment gain:', netGainMedian);
  console.log('Median annualized return:', (annualizedReturnMedian * 100).toFixed(2) + '%');
  console.log('Should be close to theoretical:', (portfolioMetrics.expectedReturn * 100).toFixed(2) + '%');
  
  return results;
}
