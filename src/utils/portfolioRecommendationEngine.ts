import { supabase } from '@/integrations/supabase/client';

export interface InvestorProfile {
  age: number;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  timeHorizon: 'short' | 'medium' | 'long'; // <5, 5-15, 15+ years
  monthlyAmount: number;
  initialAmount?: number; // Jednorazová vstupní investice
  experience: 'beginner' | 'intermediate' | 'advanced';
  goals: ('retirement' | 'house' | 'general_wealth' | 'education')[];
}

export interface PortfolioAllocation {
  stocks: number;      // % akcie
  bonds: number;       // % dluhopisy
  commodities: number; // % komodity
  reits: number;       // % nemovitosti
}

export interface ETFRecommendation {
  isin: string;
  name: string;
  category: 'stocks' | 'bonds' | 'commodities' | 'reits';
  allocation: number;  // % v portfoliu
  reason: string;
  region?: string;
}

export interface PortfolioRecommendation {
  name: string;
  description: string;
  allocation: PortfolioAllocation;
  etfs: ETFRecommendation[];
  expectedReturn: string;
  volatility: string;
  riskLevel: number; // 1-10
  rebalanceFrequency: string;
  explanation: {
    strategy: string;
    pros: string[];
    cons: string[];
    suitableFor: string[];
  };
  strategyId?: string;
  detailUrl?: string;
}

export class PortfolioRecommendationEngine {
  
  // 5 core portfolio strategies (matching PortfolioStrategies component)
  private portfolioModels = {
    permanent: {
      name: "Permanentní Portfolio",
      description: "Klasická 25/25/25/25 strategie navržená pro dlouhodobou stabilitu a ochranu kapitálu",
      strategyId: "permanent",
      riskLevel: 3,
      expectedReturn: "4-6% ročně",
      allocations: [
        { asset: 'Akcie (růst)', percentage: 25, isin: 'IE00BK5BQT80', etfName: 'Vanguard FTSE All-World' },
        { asset: 'Dlouhodobé dluhopisy (deflace)', percentage: 25, isin: 'IE00B3DKXQ41', etfName: 'iShares Core Global Aggregate Bond' },
        { asset: 'Komodity (inflace)', percentage: 25, isin: 'IE00BDFL4P12', etfName: 'iShares Diversified Commodity Swap' },
        { asset: 'Zlato (krize)', percentage: 25, isin: 'IE00B4ND3602', etfName: 'iShares Physical Gold ETC' },
      ],
      detailUrl: '/portfolio-strategie/permanentni-portfolio'
    },
    
    nobel: {
      name: "Nobel Portfolio",
      description: "Vědecky podložená strategie založená na výzkumech laureátů Nobelovy ceny za ekonomii",
      strategyId: "nobel",
      riskLevel: 6,
      expectedReturn: "6-9% ročně",
      allocations: [
        { asset: 'Světové akcie', percentage: 60, isin: 'IE00BK5BQT80', etfName: 'Vanguard FTSE All-World' },
        { asset: 'Dluhopisy', percentage: 20, isin: 'IE00B3DKXQ41', etfName: 'iShares Core Global Aggregate Bond' },
        { asset: 'Small Cap akcie', percentage: 10, isin: 'IE00BF4RFH31', etfName: 'iShares MSCI World Small Cap' },
        { asset: 'Emerging Markets', percentage: 10, isin: 'IE00B4L5YC18', etfName: 'iShares Core MSCI Emerging Markets' },
      ],
      detailUrl: '/portfolio-strategie/nobel-portfolio'
    },
    
    threefund: {
      name: "Bogleheads Three-Fund Portfolio",
      description: "Jednoduchá a efektivní 3-fondová strategie pro dlouhodobé pasivní investování",
      strategyId: "threefund",
      riskLevel: 5,
      expectedReturn: "5-8% ročně",
      allocations: [
        { asset: 'Světové akcie', percentage: 70, isin: 'IE00BK5BQT80', etfName: 'Vanguard FTSE All-World' },
        { asset: 'Dluhopisy', percentage: 20, isin: 'IE00B3DKXQ41', etfName: 'iShares Core Global Aggregate Bond' },
        { asset: 'Emerging Markets', percentage: 10, isin: 'IE00B4L5YC18', etfName: 'iShares Core MSCI Emerging Markets' },
      ],
      detailUrl: '/portfolio-strategie/bogleheads-three-fund'
    },
    
    stock: {
      name: "Akciové Portfolio",
      description: "Maximálně agresivní strategie pro dlouhodobé investory s vysokou tolerancí rizika",
      strategyId: "stock",
      riskLevel: 9,
      expectedReturn: "7-10% ročně",
      allocations: [
        { asset: 'Světové akcie', percentage: 80, isin: 'IE00BK5BQT80', etfName: 'Vanguard FTSE All-World' },
        { asset: 'Emerging Markets', percentage: 20, isin: 'IE00B4L5YC18', etfName: 'iShares Core MSCI Emerging Markets' },
      ],
      detailUrl: '/portfolio-strategie/akciove-portfolio'
    },
    
    allweather: {
      name: "Ray Dalio All-Weather Portfolio",
      description: "Stabilní strategie navržená pro všechna ekonomická období a tržní podmínky",
      strategyId: "allweather",
      riskLevel: 4,
      expectedReturn: "5-8% ročně",
      allocations: [
        { asset: 'Dlouhodobé dluhopisy', percentage: 40, isin: 'IE00B4WXJJ64', etfName: 'iShares Core Global Government Bond' },
        { asset: 'Akcie', percentage: 30, isin: 'IE00BK5BQT80', etfName: 'Vanguard FTSE All-World' },
        { asset: 'Střednědobé dluhopisy', percentage: 15, isin: 'IE00B3DKXQ41', etfName: 'iShares Core Global Aggregate Bond' },
        { asset: 'Komodity', percentage: 7.5, isin: 'IE00BDFL4P12', etfName: 'iShares Diversified Commodity Swap' },
        { asset: 'Zlato', percentage: 7.5, isin: 'IE00B4ND3602', etfName: 'iShares Physical Gold ETC' },
      ],
      detailUrl: '/portfolio-strategie/ray-dalio-all-weather'
    }
  };


  async getPortfolioRecommendation(profile: InvestorProfile): Promise<PortfolioRecommendation> {
    // 1. Determine which of the 5 strategies to recommend
    const strategyKey = this.determineStrategy(profile);
    const strategy = this.portfolioModels[strategyKey];
    
    // 2. Convert strategy allocations to ETF recommendations
    const etfRecommendations = strategy.allocations.map(allocation => ({
      isin: allocation.isin,
      name: allocation.etfName,
      category: this.getCategoryFromAsset(allocation.asset),
      allocation: allocation.percentage,
      reason: allocation.asset
    }));
    
    // 3. Generate explanation for the recommended strategy
    const explanation = this.generateExplanation(strategyKey, profile);

    // 4. Calculate allocation summary for backwards compatibility
    const allocationSummary = this.calculateAllocationSummary(strategy.allocations);

    return {
      name: strategy.name,
      description: strategy.description,
      allocation: allocationSummary,
      etfs: etfRecommendations,
      expectedReturn: strategy.expectedReturn,
      volatility: "Střední", // Default for compatibility
      riskLevel: strategy.riskLevel,
      rebalanceFrequency: "Podle strategie", // Default for compatibility
      explanation,
      strategyId: strategy.strategyId,
      detailUrl: strategy.detailUrl
    };
  }

  private determineStrategy(profile: InvestorProfile): keyof typeof this.portfolioModels {
    // Strategy recommendation logic based on user profile
    
    // Very aggressive young investors -> 100% Stock Portfolio
    if (profile.age <= 35 && profile.riskTolerance === 'aggressive' && profile.timeHorizon === 'long') {
      return 'stock';
    }
    
    // Conservative or older investors -> Permanent Portfolio or All-Weather
    if (profile.riskTolerance === 'conservative' || profile.age >= 50) {
      // Prefer All-Weather for slightly higher risk tolerance, Permanent for ultra-conservative
      return profile.age >= 55 || profile.timeHorizon === 'short' ? 'permanent' : 'allweather';
    }
    
    // Academic-minded or experienced investors -> Nobel Portfolio
    if (profile.experience === 'advanced' || 
        (profile.goals.includes('general_wealth') && profile.riskTolerance === 'moderate')) {
      return 'nobel';
    }
    
    // Simple preference or beginners -> Bogleheads Three-Fund
    if (profile.experience === 'beginner' || 
        (profile.riskTolerance === 'moderate' && profile.timeHorizon === 'medium')) {
      return 'threefund';
    }
    
    // Default fallback based on age and risk tolerance
    if (profile.age <= 40 && profile.riskTolerance === 'aggressive') {
      return 'stock';
    } else if (profile.age >= 45) {
      return 'allweather';
    } else {
      return 'threefund'; // Most balanced default choice
    }
  }

  private getCategoryFromAsset(asset: string): 'stocks' | 'bonds' | 'commodities' | 'reits' {
    const assetLower = asset.toLowerCase();
    if (assetLower.includes('akcie') || assetLower.includes('stock') || assetLower.includes('equity')) {
      return 'stocks';
    } else if (assetLower.includes('dluhopis') || assetLower.includes('bond')) {
      return 'bonds';
    } else if (assetLower.includes('komodit') || assetLower.includes('zlato') || assetLower.includes('gold') || assetLower.includes('commodity')) {
      return 'commodities';
    } else if (assetLower.includes('nemovit') || assetLower.includes('reit')) {
      return 'reits';
    }
    return 'stocks'; // Default fallback
  }

  private calculateAllocationSummary(allocations: any[]): PortfolioAllocation {
    const summary: PortfolioAllocation = { stocks: 0, bonds: 0, commodities: 0, reits: 0 };
    
    for (const allocation of allocations) {
      const category = this.getCategoryFromAsset(allocation.asset);
      summary[category] += allocation.percentage;
    }
    
    return summary;
  }


  private generateExplanation(strategyType: string, profile: InvestorProfile) {
    const explanations = {
      permanent: {
        strategy: "Rovnoměrné 25% rozdělení mezi všechny ekonomické scénáře zajišťuje stabilní výkonnost bez ohledu na tržní podmínky",
        pros: [
          "Maximální jednoduchost implementace",
          "Ochrana proti všem ekonomickým scénářům",
          "Velmi nízká volatilita a stabilní výkonnost",
          "Historicky ověřená strategie (50+ let)"
        ],
        cons: [
          "Nižší výnosy během bull trhů",
          "Vysoké náklady na komodity a zlato",
          "Může významně zaostávat za akciovými portfolii"
        ],
        suitableFor: [
          "Velmi konzervativní investoři",
          "Investoři blížící se nebo v důchodu",
          "Lidé hledající \"fire-and-forget\" řešení"
        ]
      },
      
      nobel: {
        strategy: "Vědecky podložený přístup využívající faktory hodnoty, velikosti a mezinárodní diverzifikaci podle akademického výzkumu",
        pros: [
          "Založeno na Nobelových výzkumech",
          "Využívá faktory hodnoty a velikosti",
          "Optimální poměr rizika a výnosu",
          "Mezinárodní diverzifikace"
        ],
        cons: [
          "Složitější než základní strategie",
          "Vyšší náklady kvůli 4 fondům",
          "Small Cap složka volatilnější"
        ],
        suitableFor: [
          "Vzdělané investory",
          "Investory s delším horizontem (10+ let)",
          "Ty, kteří chtějí využít akademické poznatky"
        ]
      },
      
      threefund: {
        strategy: "Jednoduchá a efektivní diverzifikace podle filosofie Johna Boglea - zakladatele Vanguard",
        pros: [
          "Maximální jednoduchost s jen 3 fondy",
          "Nízké náklady a snadná správa",
          "Ověřená dlouhodobá performance",
          "Ideální pro začátečníky"
        ],
        cons: [
          "Méně sofistikovaná než pokročilé strategie",
          "Neobsahuje komodity nebo REITs",
          "Závislost pouze na akciích a dluhopisech"
        ],
        suitableFor: [
          "Začínající investoři",
          "Příznivci jednoduchosti",
          "Dlouhodobí pasivní investoři"
        ]
      },
      
      stock: {
        strategy: "100% akciová alokace pro maximální dlouhodobý růst s důrazem na globální diverzifikaci",
        pros: [
          "Nejvyšší dlouhodobý růstový potenciál",
          "Historicky nejlepší výnosy",
          "Jednoduchost s jen 2 fondy",
          "Ideální pro mladé investory"
        ],
        cons: [
          "Nejvyšší volatilita a riziko",
          "Může klesat o 30-50% v krizích",
          "Psychicky náročné při poklesech",
          "Žádná ochrana kapitálu"
        ],
        suitableFor: [
          "Mladí agresivní investoři",
          "Horizont 20+ let",
          "Vysoká tolerance rizika",
          "Maximální růst bez ochrany"
        ]
      },
      
      allweather: {
        strategy: "Risk-parity přístup navržený pro stabilní výkonnost ve všech ekonomických podmínkách podle Ray Dalia",
        pros: [
          "Stabilní výkonnost ve všech tržních podmínkách",
          "Ochrana proti inflaci prostřednictvím zlata a komodit",
          "Nízká korelace mezi třídami aktiv",
          "Vědecký risk-parity přístup"
        ],
        cons: [
          "Nižší výnos v bull trzích",
          "Složitější rebalancování",
          "Vyšší náklady kvůli komoditám",
          "Citlivost na úrokové sazby"
        ],
        suitableFor: [
          "Konzervativní investoři",
          "Investoři očekávající nejistotu",
          "Diverzifikace od tradičních portfolií"
        ]
      }
    };
    
    return explanations[strategyType as keyof typeof explanations] || explanations.threefund;
  }

  // Get available portfolio options for comparison
  getAvailablePortfolios(profile: InvestorProfile) {
    const suitable = [];
    
    // Age-appropriate portfolios
    if (profile.age <= 35) {
      suitable.push('lifecycle_20s', 'growth', 'moderate');
    } else if (profile.age <= 50) {
      suitable.push('lifecycle_40s', 'moderate', 'conservative');
    } else {
      suitable.push('lifecycle_50s', 'conservative', 'moderate');
    }
    
    return suitable.map(key => ({
      key,
      ...this.portfolioModels[key as keyof typeof this.portfolioModels]
    }));
  }
}

export const portfolioEngine = new PortfolioRecommendationEngine();