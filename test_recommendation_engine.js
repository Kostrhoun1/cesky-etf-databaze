// Test script pro recommendation engine
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://nbhwnatadyubiuadfakx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NDQ3NDQsImV4cCI6MjA2NDQyMDc0NH0.yQgSv0JMi6ebwIu7fQHIXE4VblkQ3pJfy-lXvFgd_CY";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Test profily
const testProfiles = [
  {
    name: "Mladý začátečník",
    profile: { experience: 'beginner', goal: 'growth', amount: 'small', timeHorizon: 'long' }
  },
  {
    name: "Pokročilý dividend investor",
    profile: { experience: 'advanced', goal: 'income', amount: 'large', timeHorizon: 'medium' }
  },
  {
    name: "Konzervativní střednědobý investor",
    profile: { experience: 'intermediate', goal: 'balanced', amount: 'medium', timeHorizon: 'medium' }
  }
];

// Scoring funkce (zkopírovaná z algoritmu)
function calculateETFScore(etf, profile) {
  let score = 0;

  // Base fundamentals (40 bodů)
  if (etf.ter_numeric <= 0.1) score += 20;
  else if (etf.ter_numeric <= 0.2) score += 15;
  else if (etf.ter_numeric <= 0.5) score += 10;
  else score += 5;

  if (etf.fund_size_numeric >= 10000) score += 15;
  else if (etf.fund_size_numeric >= 5000) score += 12;
  else if (etf.fund_size_numeric >= 1000) score += 10;
  else score += 5;

  if (etf.return_1y_percent > 15) score += 10;
  else if (etf.return_1y_percent > 8) score += 8;
  else if (etf.return_1y_percent > 0) score += 5;

  // Experience scoring (15 bodů)
  if (profile.experience === 'beginner') {
    if (etf.category?.includes('World') || etf.category?.includes('Global')) score += 15;
    if (etf.investment_focus?.includes('Broad') || etf.name?.includes('All-World')) score += 10;
    if (etf.degiro_free) score += 8;
  }
  
  if (profile.experience === 'advanced') {
    if (etf.category?.includes('Sector') || etf.category?.includes('Factor')) score += 10;
    if (etf.volatility_1y > 20) score += 5;
  }

  // Goal scoring (15 bodů)
  if (profile.goal === 'growth') {
    if (etf.region?.includes('North America') || etf.category?.includes('Technology')) score += 12;
    if (etf.category?.includes('Growth') || etf.category?.includes('Small Cap')) score += 10;
    if (etf.current_dividend_yield_numeric < 2) score += 5;
  }

  if (profile.goal === 'income') {
    if (etf.current_dividend_yield_numeric > 3) score += 15;
    else if (etf.current_dividend_yield_numeric > 2) score += 10;
    if (etf.category?.includes('Dividend') || etf.category?.includes('REIT')) score += 12;
    if (etf.name?.includes('High Dividend') || etf.name?.includes('Yield')) score += 8;
  }

  if (profile.goal === 'balanced') {
    if (etf.category?.includes('World') || etf.category?.includes('Balanced')) score += 12;
    if (etf.current_dividend_yield_numeric >= 1.5 && etf.current_dividend_yield_numeric <= 3) score += 8;
    if (etf.volatility_1y <= 15) score += 5;
  }

  // Amount scoring (10 bodů)
  if (profile.amount === 'small') {
    if (etf.degiro_free) score += 15;
    if (etf.ter_numeric <= 0.15) score += 10;
  }

  if (profile.amount === 'large') {
    if (etf.fund_size_numeric >= 5000) score += 8;
    if (etf.return_3y_percent > 10) score += 6;
  }

  // Time horizon scoring (10 bodů)
  if (profile.timeHorizon === 'long') {
    if (etf.category?.includes('Growth') || etf.category?.includes('Technology')) score += 10;
    if (etf.region?.includes('Emerging')) score += 8;
  }

  if (profile.timeHorizon === 'short') {
    if (etf.category?.includes('Bond') || etf.category?.includes('Government')) score += 12;
    if (etf.volatility_1y <= 10) score += 8;
  }

  return Math.round(score * 100) / 100;
}

async function testRecommendations() {
  console.log('🧪 Testování recommendation algoritmu...\n');

  // Načti sample ETF z databáze
  const { data: etfs, error } = await supabase
    .from('etf_funds')
    .select(`
      isin, name, category, ter_numeric, fund_size_numeric,
      return_1y_percent, return_3y_percent, volatility_1y,
      degiro_free, current_dividend_yield_numeric,
      region, investment_focus
    `)
    .not('name', 'is', null)
    .not('ter_numeric', 'is', null)
    .limit(20);

  if (error) {
    console.error('Chyba při načítání ETF:', error);
    return;
  }

  console.log(`📊 Načteno ${etfs.length} ETF pro testování\n`);

  // Test každý profil
  for (const testCase of testProfiles) {
    console.log(`\n🎯 === ${testCase.name} ===`);
    console.log(`Profil:`, testCase.profile);
    console.log('\n📈 Top 5 doporučených ETF:\n');

    // Scoring všech ETF
    const scoredETFs = etfs.map(etf => ({
      ...etf,
      score: calculateETFScore(etf, testCase.profile)
    }));

    // Seřaď podle score a vezmi top 5
    const topETFs = scoredETFs
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    // Zobraz výsledky
    topETFs.forEach((etf, index) => {
      console.log(`${index + 1}. ${etf.name || 'N/A'}`);
      console.log(`   ISIN: ${etf.isin}`);
      console.log(`   Score: ${etf.score}/100`);
      console.log(`   TER: ${etf.ter_numeric}%`);
      console.log(`   Fund Size: ${etf.fund_size_numeric || 'N/A'}M`);
      console.log(`   1Y Return: ${etf.return_1y_percent || 'N/A'}%`);
      console.log(`   Category: ${etf.category || 'N/A'}`);
      console.log(`   Dividend: ${etf.current_dividend_yield_numeric || 'N/A'}%`);
      console.log(`   DEGIRO Free: ${etf.degiro_free ? '✅' : '❌'}`);
      console.log('   ───────────────────────────────────');
    });

    console.log('\n💡 Analýza:');
    const topETF = topETFs[0];
    console.log(`Nejlepší ETF má score ${topETF.score} protože:`);
    
    if (topETF.ter_numeric <= 0.2) console.log(`✅ Nízké poplatky (${topETF.ter_numeric}%)`);
    if (topETF.degiro_free && testCase.profile.amount === 'small') console.log(`✅ Zdarma na DEGIRO (důležité pro malé investice)`);
    if (topETF.fund_size_numeric >= 1000) console.log(`✅ Velký fond (${topETF.fund_size_numeric}M = dobrá likvidita)`);
    if (testCase.profile.goal === 'income' && topETF.current_dividend_yield_numeric > 2) console.log(`✅ Vysoké dividendy (${topETF.current_dividend_yield_numeric}%)`);
    if (testCase.profile.experience === 'beginner' && topETF.category?.includes('World')) console.log(`✅ Široká diverzifikace vhodná pro začátečníky`);
  }
}

// Spusť test
testRecommendations().catch(console.error);