// Test s populárními ETF
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://nbhwnatadyubiuadfakx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NDQ3NDQsImV4cCI6MjA2NDQyMDc0NH0.yQgSv0JMi6ebwIu7fQHIXE4VblkQ3pJfy-lXvFgd_CY'
);

function calculateETFScore(etf, profile) {
  let score = 0;
  const breakdown = [];

  // Base fundamentals (40 bodů)
  if (etf.ter_numeric <= 0.1) {
    score += 20;
    breakdown.push(`TER ≤0.1% (+20)`);
  } else if (etf.ter_numeric <= 0.2) {
    score += 15;
    breakdown.push(`TER ≤0.2% (+15)`);
  } else if (etf.ter_numeric <= 0.5) {
    score += 10;
    breakdown.push(`TER ≤0.5% (+10)`);
  }

  if (etf.fund_size_numeric >= 10000) {
    score += 15;
    breakdown.push(`Fund size 10B+ (+15)`);
  } else if (etf.fund_size_numeric >= 5000) {
    score += 12;
    breakdown.push(`Fund size 5B+ (+12)`);
  } else if (etf.fund_size_numeric >= 1000) {
    score += 10;
    breakdown.push(`Fund size 1B+ (+10)`);
  }

  if (etf.return_1y_percent > 15) {
    score += 10;
    breakdown.push(`Return 1Y >15% (+10)`);
  } else if (etf.return_1y_percent > 8) {
    score += 8;
    breakdown.push(`Return 1Y >8% (+8)`);
  } else if (etf.return_1y_percent > 0) {
    score += 5;
    breakdown.push(`Return 1Y >0% (+5)`);
  }

  // Experience scoring
  if (profile.experience === 'beginner') {
    if (etf.category?.includes('World') || etf.category?.includes('Global') || etf.name?.includes('World') || etf.name?.includes('All-World')) {
      score += 15;
      breakdown.push(`World ETF pro začátečníky (+15)`);
    }
    if (etf.degiro_free) {
      score += 8;
      breakdown.push(`DEGIRO zdarma (+8)`);
    }
  }

  // Goal scoring
  if (profile.goal === 'growth') {
    if (etf.name?.includes('S&P 500') || etf.category?.includes('US') || etf.region?.includes('North America')) {
      score += 12;
      breakdown.push(`US/S&P 500 pro růst (+12)`);
    }
    if (etf.current_dividend_yield_numeric < 2) {
      score += 5;
      breakdown.push(`Nízké dividendy = růst (+5)`);
    }
  }

  if (profile.goal === 'income') {
    if (etf.current_dividend_yield_numeric > 3) {
      score += 15;
      breakdown.push(`Vysoké dividendy >3% (+15)`);
    } else if (etf.current_dividend_yield_numeric > 2) {
      score += 10;
      breakdown.push(`Střední dividendy >2% (+10)`);
    }
  }

  if (profile.goal === 'balanced') {
    if (etf.name?.includes('World') || etf.name?.includes('All-World') || etf.category?.includes('World')) {
      score += 12;
      breakdown.push(`World ETF pro vyvážený přístup (+12)`);
    }
  }

  // Amount scoring
  if (profile.amount === 'small' && etf.degiro_free) {
    score += 15;
    breakdown.push(`DEGIRO zdarma pro malé investice (+15)`);
  }

  if (profile.amount === 'large' && etf.fund_size_numeric >= 5000) {
    score += 8;
    breakdown.push(`Velký fond pro velké investice (+8)`);
  }

  return { score: Math.round(score * 100) / 100, breakdown };
}

async function testWithPopularETFs() {
  console.log('🧪 Test algoritmu s populárními ETF\n');

  // Načti top populární ETF
  const { data: etfs, error } = await supabase
    .from('etf_funds')
    .select(`
      isin, name, category, ter_numeric, fund_size_numeric,
      return_1y_percent, return_3y_percent, volatility_1y,
      degiro_free, current_dividend_yield_numeric, region
    `)
    .or('name.ilike.%Vanguard%,name.ilike.%iShares%,name.ilike.%SPDR%')
    .not('ter_numeric', 'is', null)
    .gte('fund_size_numeric', 1000)
    .order('fund_size_numeric', { ascending: false })
    .limit(15);

  if (error) {
    console.error('Chyba:', error);
    return;
  }

  // Test profil: Mladý začátečník
  const beginnerProfile = {
    experience: 'beginner',
    goal: 'growth', 
    amount: 'small',
    timeHorizon: 'long'
  };

  console.log('🎯 PROFIL: Mladý začátečník (growth, small, long-term)');
  console.log('━'.repeat(60));

  const scoredETFs = etfs.map(etf => {
    const result = calculateETFScore(etf, beginnerProfile);
    return { ...etf, ...result };
  });

  const topETFs = scoredETFs
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  topETFs.forEach((etf, index) => {
    console.log(`\n${index + 1}. ${etf.name}`);
    console.log(`   📊 Score: ${etf.score}/100`);
    console.log(`   🏷️  ISIN: ${etf.isin}`);
    console.log(`   💰 TER: ${etf.ter_numeric}%`);
    console.log(`   📈 Size: ${(etf.fund_size_numeric/1000).toFixed(1)}B EUR`);
    console.log(`   🎯 DEGIRO: ${etf.degiro_free ? '✅ Zdarma' : '❌ Placený'}`);
    console.log(`   📋 Scoring:`);
    etf.breakdown.forEach(reason => console.log(`      • ${reason}`));
  });

  console.log('\n💡 Analýza pro začátečníka:');
  const winner = topETFs[0];
  console.log(`✅ Vítěz: ${winner.name}`);
  console.log(`   Perfektní pro začátečníky protože:`);
  console.log(`   • Extrémně nízké poplatky (${winner.ter_numeric}%)`);
  console.log(`   • Obří fond (${(winner.fund_size_numeric/1000).toFixed(0)}B = maximální likvidita)`);
  if (winner.name.includes('S&P 500')) {
    console.log(`   • S&P 500 = historicky nejlepší dlouhodobý růst`);
  }
  if (winner.name.includes('World')) {
    console.log(`   • Světová diverzifikace = nižší riziko`);
  }

  // Test profil: Dividend investor
  console.log('\n\n🎯 PROFIL: Pokročilý dividend investor (income, large, medium-term)');
  console.log('━'.repeat(60));

  const incomeProfile = {
    experience: 'advanced',
    goal: 'income',
    amount: 'large', 
    timeHorizon: 'medium'
  };

  const dividendETFs = etfs.map(etf => {
    const result = calculateETFScore(etf, incomeProfile);
    return { ...etf, ...result };
  });

  const topDividendETFs = dividendETFs
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  topDividendETFs.forEach((etf, index) => {
    console.log(`\n${index + 1}. ${etf.name}`);
    console.log(`   📊 Score: ${etf.score}/100`);
    console.log(`   💰 TER: ${etf.ter_numeric}%`);
    console.log(`   💎 Dividend Yield: ${etf.current_dividend_yield_numeric || 'N/A'}%`);
    console.log(`   📋 Scoring:`);
    etf.breakdown.forEach(reason => console.log(`      • ${reason}`));
  });
}

testWithPopularETFs().catch(console.error);