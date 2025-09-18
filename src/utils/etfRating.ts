import { ETF, ETFListItem } from '@/types/etf';

/**
 * Calculates ETF rating based on objective criteria from database data
 * Rating scale: 1-5 stars
 * 
 * Criteria:
 * - TER (Total Expense Ratio) - Lower is better
 * - Fund Size - Larger is better (stability/liquidity)
 * - Track Record - Longer is better  
 * - Fund Provider - Top providers get bonus
 * - Performance consistency - Lower volatility for risk-adjusted returns
 * - Tracking quality - Lower tracking error is better
 */

export interface ETFRating {
  rating: number; // 1-5 stars
  score: number; // Raw score (0-100)
  breakdown: {
    ter: number;
    fundSize: number;
    trackRecord: number;
    provider: number;
    performance: number;
    tracking: number;
  };
  category: 'excellent' | 'very-good' | 'good' | 'average' | 'poor';
}

// Top-tier fund providers (get bonus points)
const TOP_PROVIDERS = [
  'iShares', 'Vanguard', 'Xtrackers', 'Amundi', 'SPDR', 'Invesco'
];

// Calculate years since inception
function getYearsSinceInception(inceptionDate: string): number {
  if (!inceptionDate) return 0;
  const inception = new Date(inceptionDate);
  const now = new Date();
  return (now.getTime() - inception.getTime()) / (1000 * 60 * 60 * 24 * 365);
}

// Score TER (0-25 points): Lower TER is better
function scoreTER(ter: number): number {
  if (ter <= 0.05) return 25; // <= 0.05% = Excellent
  if (ter <= 0.10) return 22; // <= 0.10% = Very Good  
  if (ter <= 0.15) return 19; // <= 0.15% = Good
  if (ter <= 0.25) return 15; // <= 0.25% = Average
  if (ter <= 0.50) return 10; // <= 0.50% = Below Average
  if (ter <= 0.75) return 5;  // <= 0.75% = Poor
  return 1; // > 0.75% = Very Poor
}

// Score Fund Size (0-20 points): Larger funds are more stable
function scoreFundSize(sizeInBillion: number): number {
  if (sizeInBillion >= 50) return 20;    // >= 50B = Excellent
  if (sizeInBillion >= 20) return 18;    // >= 20B = Very Good
  if (sizeInBillion >= 10) return 16;    // >= 10B = Good
  if (sizeInBillion >= 5) return 14;     // >= 5B = Above Average
  if (sizeInBillion >= 1) return 12;     // >= 1B = Average
  if (sizeInBillion >= 0.5) return 8;    // >= 500M = Below Average
  if (sizeInBillion >= 0.1) return 4;    // >= 100M = Poor
  return 1; // < 100M = Very Poor
}

// Score Track Record (0-15 points): Longer history is better
function scoreTrackRecord(years: number): number {
  if (years >= 15) return 15;  // >= 15 years = Excellent
  if (years >= 10) return 13;  // >= 10 years = Very Good
  if (years >= 7) return 11;   // >= 7 years = Good
  if (years >= 5) return 9;    // >= 5 years = Above Average
  if (years >= 3) return 6;    // >= 3 years = Average
  if (years >= 1) return 3;    // >= 1 year = Below Average
  return 1; // < 1 year = Poor
}

// Score Fund Provider (0-15 points): Top providers get bonus
function scoreProvider(provider: string): number {
  const normalizedProvider = provider.toLowerCase();
  
  // Check for top providers (case insensitive)
  for (const topProvider of TOP_PROVIDERS) {
    if (normalizedProvider.includes(topProvider.toLowerCase())) {
      return 15; // Top provider bonus
    }
  }
  
  return 8; // Standard provider
}

// Score Performance (0-15 points): Risk-adjusted returns and consistency
function scorePerformance(etf: ETF | ETFListItem): number {
  const return3y = 'return_3y' in etf ? etf.return_3y : 0;
  const volatility3y = 'volatility_3y' in etf ? (etf as ETF).volatility_3y : null;
  const returnPerRisk3y = 'return_per_risk_3y' in etf ? (etf as ETF).return_per_risk_3y : null;
  
  let score = 8; // Base score
  
  // Bonus for good 3-year returns
  if (return3y > 15) score += 4;      // > 15% = Excellent
  else if (return3y > 10) score += 3; // > 10% = Very Good
  else if (return3y > 7) score += 2;  // > 7% = Good
  else if (return3y > 5) score += 1;  // > 5% = Average
  // No bonus for < 5%
  
  // Bonus for good risk-adjusted returns
  if (returnPerRisk3y && returnPerRisk3y > 0.5) score += 3;
  else if (returnPerRisk3y && returnPerRisk3y > 0.3) score += 2;
  else if (returnPerRisk3y && returnPerRisk3y > 0.1) score += 1;
  
  return Math.min(score, 15);
}

// Score Tracking Quality (0-10 points): Lower tracking error is better
function scoreTracking(trackingError: number): number {
  if (!trackingError || trackingError <= 0) return 10; // Perfect or no data
  if (trackingError <= 0.1) return 10;  // <= 0.1% = Excellent
  if (trackingError <= 0.2) return 8;   // <= 0.2% = Very Good
  if (trackingError <= 0.5) return 6;   // <= 0.5% = Good
  if (trackingError <= 1.0) return 4;   // <= 1.0% = Average
  if (trackingError <= 2.0) return 2;   // <= 2.0% = Below Average
  return 1; // > 2.0% = Poor
}

// Convert total score to star rating
function scoreToStars(score: number): number {
  if (score >= 85) return 5;      // 85+ = 5 stars (Excellent)
  if (score >= 70) return 4;      // 70-84 = 4 stars (Very Good)
  if (score >= 55) return 3;      // 55-69 = 3 stars (Good)
  if (score >= 40) return 2;      // 40-54 = 2 stars (Average)
  return 1;                       // < 40 = 1 star (Poor)
}

// Get category from score
function getCategory(score: number): ETFRating['category'] {
  if (score >= 85) return 'excellent';
  if (score >= 70) return 'very-good';
  if (score >= 55) return 'good';
  if (score >= 40) return 'average';
  return 'poor';
}

/**
 * Calculate comprehensive ETF rating based on database data
 */
export function calculateETFRating(etf: ETF | ETFListItem): ETFRating {
  // Handle missing or invalid data gracefully
  const ter = etf.ter_numeric || 0;
  const fundSizeNumeric = etf.fund_size_numeric || 0;
  // Database already stores values in millions EUR, so convert to billions
  const fundSizeInBillion = fundSizeNumeric / 1_000;
  const provider = etf.fund_provider || '';
  const inceptionDate = 'inception_date' in etf ? etf.inception_date : '';
  const trackingError = 'tracking_error' in etf ? (etf as ETF).tracking_error : 0;
  
  const years = getYearsSinceInception(inceptionDate);
  
  // Calculate individual scores
  const terScore = scoreTER(ter);
  const sizeScore = scoreFundSize(fundSizeInBillion);
  const trackRecordScore = scoreTrackRecord(years);
  const providerScore = scoreProvider(provider);
  const performanceScore = scorePerformance(etf);
  const trackingScore = scoreTracking(trackingError);
  
  // Total score (max 100)
  const totalScore = terScore + sizeScore + trackRecordScore + providerScore + performanceScore + trackingScore;
  
  return {
    rating: scoreToStars(totalScore),
    score: totalScore,
    breakdown: {
      ter: terScore,
      fundSize: sizeScore,
      trackRecord: trackRecordScore,
      provider: providerScore,
      performance: performanceScore,
      tracking: trackingScore
    },
    category: getCategory(totalScore)
  };
}

/**
 * Get star rating only (for simple displays)
 */
export function getETFStarRating(etf: ETF | ETFListItem): number {
  return calculateETFRating(etf).rating;
}

/**
 * Get rating category description
 */
export function getRatingDescription(rating: number): string {
  switch (rating) {
    case 5: return 'Vynikající - TOP volba pro portfolia';
    case 4: return 'Velmi dobrý - Kvalitní fond s dobrými parametry';
    case 3: return 'Dobrý - Solidní volba s mírnými kompromisy';
    case 2: return 'Průměrný - Vhodný pro specifické potřeby';
    case 1: return 'Slabý - Zvážit alternativy';
    default: return 'Nehodnoceno';
  }
}

/**
 * Get color class for rating display
 */
export function getRatingColor(rating: number): string {
  switch (rating) {
    case 5: return 'text-green-600';
    case 4: return 'text-blue-600';
    case 3: return 'text-yellow-600';
    case 2: return 'text-orange-600';
    case 1: return 'text-red-600';
    default: return 'text-gray-400';
  }
}