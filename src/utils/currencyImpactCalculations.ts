export interface CurrencyImpactParams {
  portfolioValue: number;
  allocations: {
    usd: number;
    eur: number;
    czk: number;
  };
  hedgedPercentage: number;
  investmentHorizon: number;
  currentRates: {
    usdCzk: number;
    eurCzk: number;
  };
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
}

export interface CurrencyImpactData {
  currentExposure: {
    unhedgedUsd: number;
    unhedgedEur: number;
    hedgedAmount: number;
    czkAmount: number;
  };
  scenarios: CurrencyScenario[];
  recommendations: {
    optimalHedgingRatio: number;
    strategy: HedgingStrategy;
    etfRecommendations: ETFRecommendation[];
  };
  riskMetrics: {
    portfolioVolatility: number;
    currencyVolatility: number;
    maxDrawdown: number;
    valueAtRisk: number;
  };
  historicalAnalysis: {
    worstCase: HistoricalPeriod;
    bestCase: HistoricalPeriod;
    averageImpact: number;
  };
}

export interface CurrencyScenario {
  name: string;
  description: string;
  usdCzkChange: number;
  eurCzkChange: number;
  probability: number;
  portfolioImpact: number;
  portfolioValueCzk: number;
}

export interface HedgingStrategy {
  type: 'no_hedge' | 'partial_hedge' | 'full_hedge' | 'dynamic_hedge';
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  suitability: string;
}

export interface ETFRecommendation {
  ticker: string;
  name: string;
  currency: 'USD' | 'EUR' | 'CZK';
  hedged: boolean;
  allocation: number;
  reason: string;
}

export interface HistoricalPeriod {
  period: string;
  usdCzkImpact: number;
  eurCzkImpact: number;
  totalPortfolioImpact: number;
}

export const calculateCurrencyImpact = (params: CurrencyImpactParams): CurrencyImpactData => {
  const {
    portfolioValue,
    allocations,
    hedgedPercentage,
    investmentHorizon,
    currentRates,
    riskTolerance
  } = params;

  // Výpočet současné expozice
  const usdValue = (portfolioValue * allocations.usd) / 100;
  const eurValue = (portfolioValue * allocations.eur) / 100;
  const czkValue = (portfolioValue * allocations.czk) / 100;

  const hedgedAmount = (portfolioValue * hedgedPercentage) / 100;
  const unhedgedUsd = Math.max(0, usdValue - (hedgedAmount * allocations.usd / 100));
  const unhedgedEur = Math.max(0, eurValue - (hedgedAmount * allocations.eur / 100));

  // Definice scénářů
  const scenarios: CurrencyScenario[] = [
    {
      name: 'Oslabení CZK',
      description: 'CZK oslabí vůči USD i EUR o 15%',
      usdCzkChange: 15,
      eurCzkChange: 15,
      probability: 25,
      portfolioImpact: 0,
      portfolioValueCzk: 0
    },
    {
      name: 'Posílení CZK',
      description: 'CZK posílí vůči USD i EUR o 10%',
      usdCzkChange: -10,
      eurCzkChange: -10,
      probability: 20,
      portfolioImpact: 0,
      portfolioValueCzk: 0
    },
    {
      name: 'Silný USD',
      description: 'USD posílí o 20%, EUR zůstane',
      usdCzkChange: 20,
      eurCzkChange: 0,
      probability: 15,
      portfolioImpact: 0,
      portfolioValueCzk: 0
    },
    {
      name: 'Slabý USD',
      description: 'USD oslabí o 15%, EUR posílí o 5%',
      usdCzkChange: -15,
      eurCzkChange: 5,
      probability: 15,
      portfolioImpact: 0,
      portfolioValueCzk: 0
    },
    {
      name: 'Současný stav',
      description: 'Kurzy zůstanou stejné',
      usdCzkChange: 0,
      eurCzkChange: 0,
      probability: 25,
      portfolioImpact: 0,
      portfolioValueCzk: 0
    }
  ];

  // Výpočet dopadů jednotlivých scénářů
  scenarios.forEach(scenario => {
    const newUsdCzk = currentRates.usdCzk * (1 + scenario.usdCzkChange / 100);
    const newEurCzk = currentRates.eurCzk * (1 + scenario.eurCzkChange / 100);

    // Dopad na nehedged pozice
    const usdImpact = unhedgedUsd * (scenario.usdCzkChange / 100);
    const eurImpact = unhedgedEur * (scenario.eurCzkChange / 100);
    
    const totalImpact = usdImpact + eurImpact;
    
    scenario.portfolioImpact = (totalImpact / portfolioValue) * 100;
    scenario.portfolioValueCzk = portfolioValue + totalImpact;
  });

  // Optimální hedging poměr podle tolerance rizika
  let optimalHedgingRatio: number;
  let strategy: HedgingStrategy;

  switch (riskTolerance) {
    case 'conservative':
      optimalHedgingRatio = Math.max(70, hedgedPercentage);
      strategy = {
        type: 'full_hedge',
        name: 'Plné hedging',
        description: 'Minimalizace kurzového rizika pro konzervativní investory',
        pros: ['Stabilní výnosy v CZK', 'Předvídatelnost', 'Nízká volatilita'],
        cons: ['Ztráta při oslabení CZK', 'Hedging poplatky', 'Omezená diverzifikace'],
        suitability: 'Vhodné pro konzervativní investory s krátším horizontem'
      };
      break;
    case 'moderate':
      optimalHedgingRatio = 30;
      strategy = {
        type: 'partial_hedge',
        name: 'Částečné hedging',
        description: 'Vyvážené řešení mezi rizikem a příležitostí',
        pros: ['Diverzifikace rizika', 'Částečná ochrana', 'Flexibilita'],
        cons: ['Stále kurzové riziko', 'Komplexnější správa', 'Střední volatilita'],
        suitability: 'Optimální pro většinu dlouhodobých investorů'
      };
      break;
    case 'aggressive':
      optimalHedgingRatio = 0;
      strategy = {
        type: 'no_hedge',
        name: 'Bez hedging',
        description: 'Plná expozice k měnovým změnám pro maximální diverzifikaci',
        pros: ['Automatická diverzifikace', 'Bez hedging poplatků', 'Vyšší potenciální výnosy'],
        cons: ['Vysoká volatilita', 'Kurzové riziko', 'Nepředvídatelnost'],
        suitability: 'Pro agresivní investory s dlouhým horizontem 10+ let'
      };
      break;
  }

  // ETF doporučení
  const etfRecommendations: ETFRecommendation[] = [];

  if (allocations.usd > 0) {
    if (optimalHedgingRatio > 50) {
      etfRecommendations.push({
        ticker: 'VWRA',
        name: 'Vanguard FTSE All-World UCITS ETF',
        currency: 'EUR',
        hedged: true,
        allocation: allocations.usd * 0.6,
        reason: 'EUR denominovaný ETF snižuje USD expozici'
      });
    } else {
      etfRecommendations.push({
        ticker: 'VTI',
        name: 'Vanguard Total Stock Market ETF',
        currency: 'USD',
        hedged: false,
        allocation: allocations.usd,
        reason: 'Přímá USD expozice pro dlouhodobou diverzifikaci'
      });
    }
  }

  if (allocations.eur > 0) {
    etfRecommendations.push({
      ticker: 'VWCE',
      name: 'Vanguard FTSE All-World UCITS ETF',
      currency: 'EUR',
      hedged: false,
      allocation: allocations.eur,
      reason: 'EUR ETF snižuje kurzové riziko pro české investory'
    });
  }

  if (allocations.czk > 0) {
    etfRecommendations.push({
      ticker: 'BOND CZK',
      name: 'České státní dluhopisy',
      currency: 'CZK',
      hedged: false,
      allocation: allocations.czk,
      reason: 'Eliminace kurzového rizika v domácí měně'
    });
  }

  // Rizikové metriky
  const currencyExposure = (unhedgedUsd + unhedgedEur) / portfolioValue;
  const portfolioVolatility = currencyExposure * 15 + (1 - currencyExposure) * 8; // Aproximace
  const currencyVolatility = Math.sqrt(
    Math.pow(allocations.usd * 0.15, 2) + Math.pow(allocations.eur * 0.12, 2)
  ) / 100;
  const maxDrawdown = portfolioVolatility * 2.5; // Aproximace max drawdown
  const valueAtRisk = portfolioValue * currencyVolatility * 1.65; // 95% VaR

  // Historická analýza (simulovaná data)
  const historicalAnalysis = {
    worstCase: {
      period: 'Finanční krize 2008',
      usdCzkImpact: -25,
      eurCzkImpact: -18,
      totalPortfolioImpact: (unhedgedUsd * -0.25 + unhedgedEur * -0.18) / portfolioValue * 100
    },
    bestCase: {
      period: 'Post-COVID recovery 2021',
      usdCzkImpact: 12,
      eurCzkImpact: 8,
      totalPortfolioImpact: (unhedgedUsd * 0.12 + unhedgedEur * 0.08) / portfolioValue * 100
    },
    averageImpact: 2.3 // Průměrný roční dopad kurzových změn
  };

  return {
    currentExposure: {
      unhedgedUsd,
      unhedgedEur,
      hedgedAmount,
      czkAmount: czkValue
    },
    scenarios,
    recommendations: {
      optimalHedgingRatio,
      strategy,
      etfRecommendations
    },
    riskMetrics: {
      portfolioVolatility,
      currencyVolatility,
      maxDrawdown,
      valueAtRisk
    },
    historicalAnalysis
  };
};