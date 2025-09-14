import { supabase } from '@/integrations/supabase/client';

export interface InvestorProfile {
  age: number;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  timeHorizon: 'short' | 'medium' | 'long'; // <5, 5-15, 15+ years
  monthlyAmount: number;
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
}

export class PortfolioRecommendationEngine {
  
  // Predefined portfolio models (inspired by Portu/Vanguard/etc)
  private portfolioModels = {
    conservative: {
      name: "Konzervativní portfolio",
      description: "Stabilní růst s nižším rizikem, vhodné pro kratší horizont nebo konzervativní investory",
      allocation: { stocks: 30, bonds: 60, commodities: 5, reits: 5 },
      riskLevel: 3,
      expectedReturn: "4-6% ročně",
      volatility: "Nízká (5-10%)",
      rebalanceFrequency: "Čtvrtletně"
    },
    
    moderate: {
      name: "Vyvážené portfolio", 
      description: "Optimální poměr rizika a výnosu pro dlouhodobé investování",
      allocation: { stocks: 60, bonds: 30, commodities: 5, reits: 5 },
      riskLevel: 5,
      expectedReturn: "6-8% ročně",
      volatility: "Střední (10-15%)",
      rebalanceFrequency: "Pololetně"
    },
    
    growth: {
      name: "Růstové portfolio",
      description: "Zaměřeno na maximální dlouhodobý růst, vyšší volatilita",
      allocation: { stocks: 80, bonds: 10, commodities: 5, reits: 5 },
      riskLevel: 7,
      expectedReturn: "8-10% ročně", 
      volatility: "Střední až vysoká (15-20%)",
      rebalanceFrequency: "Ročně"
    },
    
    aggressive: {
      name: "Agresivní portfolio",
      description: "Maximální růstový potenciál pro dlouhodobé investory s vysokou tolerancí rizika",
      allocation: { stocks: 90, bonds: 0, commodities: 5, reits: 5 },
      riskLevel: 9,
      expectedReturn: "10-12% ročně",
      volatility: "Vysoká (20%+)",
      rebalanceFrequency: "Ročně"
    },

    lifecycle_20s: {
      name: "Portfolio pro 20-30 let",
      description: "Agresivní růst pro mladé investory s dlouhým horizontem",
      allocation: { stocks: 90, bonds: 5, commodities: 3, reits: 2 },
      riskLevel: 8,
      expectedReturn: "9-11% ročně",
      volatility: "Vysoká (18-25%)",
      rebalanceFrequency: "Ročně"
    },

    lifecycle_40s: {
      name: "Portfolio pro 40-50 let", 
      description: "Vyvážený přístup s postupným snižováním rizika",
      allocation: { stocks: 70, bonds: 20, commodities: 5, reits: 5 },
      riskLevel: 6,
      expectedReturn: "7-9% ročně",
      volatility: "Střední (12-18%)",
      rebalanceFrequency: "Pololetně"
    },

    lifecycle_50s: {
      name: "Portfolio pro 50+ let",
      description: "Konzervativní přístup s ochranou kapitálu před důchodem",
      allocation: { stocks: 50, bonds: 40, commodities: 5, reits: 5 },
      riskLevel: 4,
      expectedReturn: "5-7% ročně",
      volatility: "Nízká až střední (8-15%)",
      rebalanceFrequency: "Čtvrtletně"
    }
  };

  // Core ETF building blocks (best-in-class for each category)
  private coreETFs = {
    stocks: {
      world: { isin: 'IE00B4L5Y983', name: 'Vanguard FTSE All-World', ter: 0.22, reason: 'Globální diverzifikace' },
      sp500: { isin: 'IE00B5BMR087', name: 'iShares Core S&P 500', ter: 0.07, reason: 'Americký trh, nízké poplatky' },
      europe: { isin: 'IE00B4K48X80', name: 'iShares Core MSCI Europe', ter: 0.12, reason: 'Evropské akcie' },
      emerging: { isin: 'IE00BKM4GZ66', name: 'iShares Core MSCI EM', ter: 0.18, reason: 'Rozvíjející se trhy' }
    },
    bonds: {
      government: { isin: 'IE00B4WXJJ64', name: 'iShares Core Global Aggregate Bond', ter: 0.10, reason: 'Světové vládní dluhopisy' },
      corporate: { isin: 'IE00BF1FWR40', name: 'iShares Core Global Corporate Bond', ter: 0.10, reason: 'Korporátní dluhopisy' },
      eu_government: { isin: 'IE00B3VTML14', name: 'iShares Core EURO Government Bond', ter: 0.09, reason: 'Evropské státní dluhopisy' }
    },
    commodities: {
      gold: { isin: 'IE00B4ND3602', name: 'iShares Physical Gold', ter: 0.12, reason: 'Ochrana proti inflaci' },
      broad: { isin: 'IE00B6R52036', name: 'iShares GSCI Commodity', ter: 0.55, reason: 'Široké komodity' }
    },
    reits: {
      global: { isin: 'IE00B1FZS467', name: 'iShares Global Property Securities', ter: 0.24, reason: 'Globální nemovitosti' },
      europe: { isin: 'IE00B1TXHL60', name: 'iShares European Property Yield', ter: 0.40, reason: 'Evropské REITs' }
    }
  };

  async getPortfolioRecommendation(profile: InvestorProfile): Promise<PortfolioRecommendation> {
    // 1. Determine portfolio type based on profile
    const portfolioType = this.determinePortfolioType(profile);
    const baseModel = this.portfolioModels[portfolioType];
    
    // 2. Adjust allocation based on specific profile
    const adjustedAllocation = this.adjustAllocationForProfile(baseModel.allocation, profile);
    
    // 3. Select specific ETFs for each category
    const selectedETFs = await this.selectETFsForAllocation(adjustedAllocation, profile);
    
    // 4. Generate explanation
    const explanation = this.generateExplanation(portfolioType, profile);

    return {
      name: baseModel.name,
      description: baseModel.description,
      allocation: adjustedAllocation,
      etfs: selectedETFs,
      expectedReturn: baseModel.expectedReturn,
      volatility: baseModel.volatility,
      riskLevel: baseModel.riskLevel,
      rebalanceFrequency: baseModel.rebalanceFrequency,
      explanation
    };
  }

  private determinePortfolioType(profile: InvestorProfile): keyof typeof this.portfolioModels {
    // Age-based lifecycle approach (like target-date funds)
    if (profile.age <= 30) {
      return profile.riskTolerance === 'conservative' ? 'moderate' : 'lifecycle_20s';
    }
    
    if (profile.age <= 40) {
      return profile.riskTolerance === 'conservative' ? 'conservative' : 
             profile.riskTolerance === 'aggressive' ? 'growth' : 'moderate';
    }
    
    if (profile.age <= 50) {
      return profile.riskTolerance === 'aggressive' ? 'moderate' : 'lifecycle_40s';
    }
    
    // 50+ years
    return profile.riskTolerance === 'aggressive' ? 'moderate' : 'lifecycle_50s';
  }

  private adjustAllocationForProfile(baseAllocation: PortfolioAllocation, profile: InvestorProfile): PortfolioAllocation {
    let adjusted = { ...baseAllocation };
    
    // Adjust based on time horizon
    if (profile.timeHorizon === 'long' && profile.age < 40) {
      // Více akcií pro dlouhý horizont a mladý věk
      adjusted.stocks = Math.min(95, adjusted.stocks + 10);
      adjusted.bonds = Math.max(0, adjusted.bonds - 10);
    }
    
    if (profile.timeHorizon === 'short') {
      // Více dluhopisů pro krátký horizont
      adjusted.stocks = Math.max(20, adjusted.stocks - 15);
      adjusted.bonds = Math.min(70, adjusted.bonds + 15);
    }
    
    // Adjust based on goals
    if (profile.goals.includes('house') && profile.timeHorizon === 'short') {
      // Konzervativnější pro koupi domu
      adjusted.stocks = Math.max(20, adjusted.stocks - 20);
      adjusted.bonds = Math.min(75, adjusted.bonds + 20);
    }
    
    if (profile.goals.includes('retirement') && profile.age > 45) {
      // Více dluhopisů při blížícím se důchodu
      adjusted.stocks = Math.max(30, adjusted.stocks - 10);
      adjusted.bonds = Math.min(60, adjusted.bonds + 10);
    }

    // Ensure allocations sum to 100%
    const total = adjusted.stocks + adjusted.bonds + adjusted.commodities + adjusted.reits;
    if (total !== 100) {
      const factor = 100 / total;
      adjusted.stocks = Math.round(adjusted.stocks * factor);
      adjusted.bonds = Math.round(adjusted.bonds * factor);
      adjusted.commodities = Math.round(adjusted.commodities * factor);
      adjusted.reits = 100 - adjusted.stocks - adjusted.bonds - adjusted.commodities;
    }
    
    return adjusted;
  }

  private async selectETFsForAllocation(allocation: PortfolioAllocation, profile: InvestorProfile): Promise<ETFRecommendation[]> {
    const recommendations: ETFRecommendation[] = [];
    
    // Stocks allocation
    if (allocation.stocks > 0) {
      if (allocation.stocks >= 70) {
        // High stock allocation - split between world and regional
        recommendations.push({
          ...this.coreETFs.stocks.world,
          category: 'stocks',
          allocation: Math.round(allocation.stocks * 0.7),
          reason: 'Základ portfolia - široká globální diverzifikace'
        });
        
        recommendations.push({
          ...this.coreETFs.stocks.sp500,
          category: 'stocks', 
          allocation: Math.round(allocation.stocks * 0.3),
          reason: 'Americký trh - historicky nejlepší výkonnost'
        });
      } else {
        // Lower stock allocation - just world ETF
        recommendations.push({
          ...this.coreETFs.stocks.world,
          category: 'stocks',
          allocation: allocation.stocks,
          reason: 'Globální akciová expozice s nižším rizikem'
        });
      }
    }
    
    // Bonds allocation
    if (allocation.bonds > 0) {
      if (profile.age > 45 || profile.riskTolerance === 'conservative') {
        recommendations.push({
          ...this.coreETFs.bonds.government,
          category: 'bonds',
          allocation: allocation.bonds,
          reason: 'Stabilní vládní dluhopisy pro ochranu kapitálu'
        });
      } else {
        recommendations.push({
          ...this.coreETFs.bonds.corporate,
          category: 'bonds',
          allocation: allocation.bonds,
          reason: 'Korporátní dluhopisy s vyšším výnosem'
        });
      }
    }
    
    // Commodities allocation
    if (allocation.commodities > 0) {
      recommendations.push({
        ...this.coreETFs.commodities.gold,
        category: 'commodities',
        allocation: allocation.commodities,
        reason: 'Zlatý standard ochrany proti inflaci'
      });
    }
    
    // REITs allocation
    if (allocation.reits > 0) {
      recommendations.push({
        ...this.coreETFs.reits.global,
        category: 'reits',
        allocation: allocation.reits,
        reason: 'Nemovitostní diverzifikace s pravidelným příjmem'
      });
    }
    
    return recommendations;
  }

  private generateExplanation(portfolioType: string, profile: InvestorProfile) {
    const explanations = {
      lifecycle_20s: {
        strategy: "Maximální růstový potenciál pro mladé investory s dlouhým investičním horizontem 30+ let",
        pros: [
          "Nejvyšší očekávaný dlouhodobý výnos",
          "Čas na překonání krátkodobých výkyvů",
          "Compound interest efekt při dlouhém horizontu"
        ],
        cons: [
          "Vysoká volatilita v krátkodobém horizontu", 
          "Může klesat o 20-30% v krizích",
          "Psychicky náročné při poklesech"
        ],
        suitableFor: [
          "Investoři ve věku 20-35 let",
          "Dlouhodobý horizont 20+ let", 
          "Vysoká tolerance rizika",
          "Pravidelný příjem a stabilní situace"
        ]
      },
      
      moderate: {
        strategy: "Vyvážený přístup kombinující růst s ochranou kapitálu",
        pros: [
          "Optimální poměr rizika a výnosu",
          "Nižší volatilita než čistě akciové portfolio",
          "Vhodné pro většinu investorů"
        ],
        cons: [
          "Nižší výnos než agresivní portfolia",
          "Stále podléhá tržním výkyvům",
          "Dluhopisová složka může trpět při inflaci"
        ],
        suitableFor: [
          "Investoři ve věku 30-50 let",
          "Střední tolerance rizika",
          "Horizont 10-20 let",
          "Hledající stabilní růst"
        ]
      },
      
      lifecycle_50s: {
        strategy: "Konzervativní přístup s ochranou kapitálu před důchodem",
        pros: [
          "Nižší volatilita a stabilnější výnosy",
          "Ochrana před velkými poklesy",
          "Pravidelný příjem z dluhopisů"
        ],
        cons: [
          "Nižší dlouhodobý růstový potenciál",
          "Riziko nedostačujícího růstu proti inflaci",
          "Citlivost dluhopisů na úrokové sazby"
        ],
        suitableFor: [
          "Investoři 50+ let",
          "Blížící se důchod (do 15 let)",
          "Konzervativní přístup k riziku",
          "Potřeba ochrany nashromážděného kapitálu"
        ]
      }
    };
    
    return explanations[portfolioType as keyof typeof explanations] || explanations.moderate;
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