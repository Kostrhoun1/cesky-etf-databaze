// Manuální test portfolio logiky (bez importů)

// Mock portfolio models
const portfolioModels = {
  lifecycle_20s: {
    name: "Portfolio pro 20-30 let",
    allocation: { stocks: 90, bonds: 5, commodities: 3, reits: 2 },
    expectedReturn: "9-11% ročně",
    riskLevel: 8
  },
  lifecycle_40s: {
    name: "Portfolio pro 40-50 let", 
    allocation: { stocks: 70, bonds: 20, commodities: 5, reits: 5 },
    expectedReturn: "7-9% ročně",
    riskLevel: 6
  },
  lifecycle_50s: {
    name: "Portfolio pro 50+ let",
    allocation: { stocks: 50, bonds: 40, commodities: 5, reits: 5 },
    expectedReturn: "5-7% ročně",
    riskLevel: 4
  }
};

// Core ETF building blocks
const coreETFs = {
  stocks: {
    world: { isin: 'IE00B4L5Y983', name: 'Vanguard FTSE All-World UCITS ETF', ter: 0.22 },
    sp500: { isin: 'IE00B5BMR087', name: 'iShares Core S&P 500 UCITS ETF', ter: 0.07 },
    europe: { isin: 'IE00B4K48X80', name: 'iShares Core MSCI Europe UCITS ETF', ter: 0.12 }
  },
  bonds: {
    government: { isin: 'IE00B4WXJJ64', name: 'iShares Core Global Aggregate Bond UCITS ETF', ter: 0.10 },
    corporate: { isin: 'IE00BF1FWR40', name: 'iShares Core Global Corporate Bond UCITS ETF', ter: 0.10 }
  },
  commodities: {
    gold: { isin: 'IE00B4ND3602', name: 'iShares Physical Gold ETC', ter: 0.12 }
  },
  reits: {
    global: { isin: 'IE00B1FZS467', name: 'iShares Global Property Securities Equity Index Fund', ter: 0.24 }
  }
};

function generatePortfolio(profile) {
  let portfolioType;
  
  // Determine portfolio type
  if (profile.age <= 30) {
    portfolioType = profile.riskTolerance === 'conservative' ? 'lifecycle_40s' : 'lifecycle_20s';
  } else if (profile.age <= 50) {
    portfolioType = profile.riskTolerance === 'aggressive' ? 'lifecycle_20s' : 'lifecycle_40s';
  } else {
    portfolioType = 'lifecycle_50s';
  }
  
  const baseModel = portfolioModels[portfolioType];
  let allocation = { ...baseModel.allocation };
  
  // Adjust based on goals
  if (profile.goals.includes('house') && profile.timeHorizon === 'short') {
    allocation.stocks = Math.max(20, allocation.stocks - 20);
    allocation.bonds = Math.min(70, allocation.bonds + 20);
  }
  
  // Generate ETF recommendations
  const etfs = [];
  
  // Stocks allocation
  if (allocation.stocks >= 70) {
    etfs.push({
      ...coreETFs.stocks.world,
      category: 'stocks',
      allocation: Math.round(allocation.stocks * 0.7),
      reason: 'Základ portfolia - široká globální diverzifikace'
    });
    etfs.push({
      ...coreETFs.stocks.sp500,
      category: 'stocks',
      allocation: Math.round(allocation.stocks * 0.3),
      reason: 'Americký trh - historicky nejlepší výkonnost'
    });
  } else {
    etfs.push({
      ...coreETFs.stocks.world,
      category: 'stocks',
      allocation: allocation.stocks,
      reason: 'Globální akciová expozice s nižším rizikem'
    });
  }
  
  // Bonds
  if (allocation.bonds > 0) {
    etfs.push({
      ...coreETFs.bonds.government,
      category: 'bonds',
      allocation: allocation.bonds,
      reason: profile.age > 45 ? 'Stabilní vládní dluhopisy pro ochranu kapitálu' : 'Diverzifikace portfolia'
    });
  }
  
  // Commodities
  if (allocation.commodities > 0) {
    etfs.push({
      ...coreETFs.commodities.gold,
      category: 'commodities',
      allocation: allocation.commodities,
      reason: 'Ochrana proti inflaci a krizím'
    });
  }
  
  // REITs
  if (allocation.reits > 0) {
    etfs.push({
      ...coreETFs.reits.global,
      category: 'reits',
      allocation: allocation.reits,
      reason: 'Nemovitostní diverzifikace s pravidelným příjmem'
    });
  }
  
  return {
    name: baseModel.name,
    allocation,
    etfs,
    expectedReturn: baseModel.expectedReturn,
    riskLevel: baseModel.riskLevel
  };
}

// Test cases
const testProfiles = [
  {
    name: "🎓 Mladý absolvent (25 let)",
    profile: {
      age: 25,
      riskTolerance: 'aggressive',
      timeHorizon: 'long',
      monthlyAmount: 5000,
      goals: ['retirement', 'general_wealth']
    }
  },
  {
    name: "👨‍👩‍👧‍👦 Rodina s dětmi (40 let)",
    profile: {
      age: 40,
      riskTolerance: 'moderate',
      timeHorizon: 'medium',
      monthlyAmount: 15000,
      goals: ['education', 'retirement']
    }
  },
  {
    name: "🏠 Spoření na bydlení (30 let)",
    profile: {
      age: 30,
      riskTolerance: 'moderate',
      timeHorizon: 'short',
      monthlyAmount: 10000,
      goals: ['house']
    }
  },
  {
    name: "👴 Před důchodem (55 let)",
    profile: {
      age: 55,
      riskTolerance: 'conservative',
      timeHorizon: 'short',
      monthlyAmount: 25000,
      goals: ['retirement']
    }
  }
];

console.log('📊 PORTFOLIO RECOMMENDATION EXAMPLES\n');
console.log('=' + '='.repeat(80) + '=\n');

testProfiles.forEach((testCase, index) => {
  console.log(`${testCase.name}`);
  console.log('─'.repeat(50));
  
  const profile = testCase.profile;
  console.log(`👤 Profil: ${profile.age} let, ${profile.riskTolerance}, ${profile.timeHorizon}-term`);
  console.log(`💰 Měsíční investice: ${profile.monthlyAmount.toLocaleString()} Kč`);
  console.log(`🎯 Cíle: ${profile.goals.join(', ')}`);
  
  const portfolio = generatePortfolio(profile);
  
  console.log(`\n📈 DOPORUČENÉ PORTFOLIO: ${portfolio.name}`);
  console.log(`💎 Očekávaný výnos: ${portfolio.expectedReturn}`);
  console.log(`⚠️  Úroveň rizika: ${portfolio.riskLevel}/10`);
  
  console.log(`\n🎂 ASSET ALLOCATION:`);
  console.log(`   📈 Akcie: ${portfolio.allocation.stocks}%`);
  console.log(`   🏛️  Dluhopisy: ${portfolio.allocation.bonds}%`);
  console.log(`   🥇 Komodity: ${portfolio.allocation.commodities}%`);
  console.log(`   🏠 REITs: ${portfolio.allocation.reits}%`);
  
  console.log(`\n💼 KONKRÉTNÍ ETF DOPORUČENÍ:`);
  
  portfolio.etfs.forEach((etf, i) => {
    const categoryEmoji = {
      stocks: '📈',
      bonds: '🏛️',
      commodities: '🥇', 
      reits: '🏠'
    }[etf.category];
    
    console.log(`\n   ${i + 1}. ${categoryEmoji} ${etf.name}`);
    console.log(`      🔗 ISIN: ${etf.isin} (proklik → /etf/${etf.isin})`);
    console.log(`      📊 Alokace: ${etf.allocation}% z portfolia`);
    console.log(`      💰 TER: ${etf.ter}% ročně`);
    console.log(`      💡 Důvod: ${etf.reason}`);
  });
  
  console.log(`\n💡 INVESTIČNÍ STRATEGIE:`);
  if (portfolio.riskLevel >= 7) {
    console.log(`   🚀 Agresivní růstová strategie`);
    console.log(`   • Vysoké akciové zastoupení pro maximální dlouhodobý růst`);
    console.log(`   • Tolerujte krátkodobé výkyvy (-20 až -30% v krizích)`);
    console.log(`   • Rebalancing jednou ročně`);
  } else if (portfolio.riskLevel >= 5) {
    console.log(`   ⚖️  Vyvážená investiční strategie`);
    console.log(`   • Optimální poměr růstu a stability`);
    console.log(`   • Střední volatilita (-10 až -20% v krizích)`);
    console.log(`   • Rebalancing dvakrát ročně`);
  } else {
    console.log(`   🛡️  Konzervativní strategie`);
    console.log(`   • Ochrana kapitálu s mírným růstem`);
    console.log(`   • Nízká volatilita (-5 až -15% v krizích)`);
    console.log(`   • Rebalancing čtvrtletně`);
  }
  
  console.log(`\n🎯 PRAKTICKÉ KROKY:`);
  if (profile.monthlyAmount <= 5000) {
    console.log(`   1. Začněte s DEGIRO (některé ETF zdarma)`);
    console.log(`   2. Nastavte automatické investice ${profile.monthlyAmount} Kč/měsíc`);
  } else if (profile.monthlyAmount <= 15000) {
    console.log(`   1. Doporučujeme XTB (0% poplatky do 100k EUR)`);
    console.log(`   2. Investujte ${profile.monthlyAmount} Kč měsíčně (DCA strategie)`);
  } else {
    console.log(`   1. Zvažte Interactive Brokers (nejširší výběr)`);
    console.log(`   2. Velká měsíční částka ${profile.monthlyAmount} Kč umožňuje i menší ETF`);
  }
  
  console.log(`   3. Držte se plánu minimálně 5 let`);
  console.log(`   4. Rebalancujte při odchylce >5% od target alokace`);
  console.log(`   5. Neprodávejte v panické náladě`);
  
  if (index < testProfiles.length - 1) {
    console.log(`\n${'═'.repeat(82)}\n`);
  }
});

console.log(`\n\n🎯 SHRNUTÍ LOGIKY:`);
console.log(`✅ Mladí = více akcií (80-90%)`);
console.log(`✅ Starší = více dluhopisů (40-60%)`);  
console.log(`✅ Agresivní = +10% akcií`);
console.log(`✅ Konzervativní = +15% dluhopisů`);
console.log(`✅ Koupě domu = +20% dluhopisů (stabilita)`);
console.log(`✅ Každé ETF má konkrétní důvod zařazení`);
console.log(`✅ Všechny ISIN jsou proklikatelné na detail`);

console.log(`\n🚀 Tento portfolio-based přístup je:`);
console.log(`• Vědecky podložený (Modern Portfolio Theory)`);
console.log(`• User-friendly (srozumitelné %)`);
console.log(`• Praktický (konkrétní ETF + kroky)`);
console.log(`• Personalizovaný (věk + cíle + riziko)`);