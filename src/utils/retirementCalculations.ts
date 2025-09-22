export interface RetirementParams {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlySavings: number;
  expectedReturn: number;
  inflationRate: number;
  monthlyExpensesInRetirement: number;
  withdrawalStrategy: 'fixed' | 'percentage' | 'dynamic';
  safeWithdrawalRate: number;
  accumulationStrategy?: 'conservative' | 'moderate' | 'aggressive';
  withdrawalPortfolioStrategy?: 'conservative' | 'moderate' | 'aggressive';
}

export interface RetirementData {
  totalSavingsAtRetirement: number;
  realPurchasingPower: number;
  monthlyIncomeInRetirement: number;
  yearsMoneyWillLast: number;
  isFinanciallySecure: boolean;
  recommendedMonthlySavings: number;
  projectionData: RetirementProjection[];
  withdrawalData: WithdrawalProjection[];
  summary: {
    totalContributed: number;
    investmentGains: number;
    inflationImpact: number;
    successProbability: number;
  };
}

export interface RetirementProjection {
  year: number;
  age: number;
  yearlyContribution: number;
  portfolioValue: number;
  realValue: number;
  cumulativeContributions: number;
}

export interface WithdrawalProjection {
  year: number;
  age: number;
  portfolioValue: number;
  realPortfolioValue: number;
  yearlyWithdrawal: number;
  realWithdrawal: number;
  isDepletion: boolean;
}

// Portfolio alokace podle věku a rizikového profilu - upraveno pro český trh
const getPortfolioAllocation = (age: number, riskProfile: 'conservative' | 'moderate' | 'aggressive' = 'moderate') => {
  let baseStockAllocation: number;
  
  // Modernější přístup než klasické "100 - věk" - více akcií v mládí, postupný pokles
  if (riskProfile === 'conservative') {
    // Konzervativní: začíná na 60% akcií, klesá k 30%
    if (age <= 30) baseStockAllocation = 60;
    else if (age <= 40) baseStockAllocation = 55;
    else if (age <= 50) baseStockAllocation = 50;
    else if (age <= 60) baseStockAllocation = 45;
    else if (age <= 70) baseStockAllocation = 40;
    else baseStockAllocation = 30;
  } else if (riskProfile === 'aggressive') {
    // Agresivní: začíná na 90% akcií, klesá k 60%
    if (age <= 30) baseStockAllocation = 90;
    else if (age <= 40) baseStockAllocation = 85;
    else if (age <= 50) baseStockAllocation = 80;
    else if (age <= 60) baseStockAllocation = 75;
    else if (age <= 70) baseStockAllocation = 70;
    else baseStockAllocation = 60;
  } else {
    // Vyvážené: začíná na 80% akcií, klesá k 50%
    if (age <= 30) baseStockAllocation = 80;
    else if (age <= 40) baseStockAllocation = 75;
    else if (age <= 50) baseStockAllocation = 70;
    else if (age <= 60) baseStockAllocation = 65;
    else if (age <= 70) baseStockAllocation = 55;
    else baseStockAllocation = 50;
  }
  
  // Zajištění minimálních a maximálních hodnot
  baseStockAllocation = Math.max(20, Math.min(95, baseStockAllocation));
  const bondAllocation = 100 - baseStockAllocation;
  
  return {
    stocks: baseStockAllocation / 100,
    bonds: bondAllocation / 100
  };
};

// Realističtější výpočet výnosu portfolia
const getPortfolioReturn = (allocation: {stocks: number, bonds: number}, expectedReturn: number, year: number): number => {
  // Základní výnos je průměr očekávaných výnosů akcií a dluhopisů
  // Akcie historicky 7-8%, dluhopisy 3-4% v ČR
  const stockReturn = 7.5; // Historický průměr pro světové akcie
  const bondReturn = 3.5;  // Historický průměr pro české dluhopisy
  
  // Vážený průměr podle alokace
  const portfolioBaseReturn = allocation.stocks * stockReturn + allocation.bonds * bondReturn;
  
  // Přizpůsobení na uživatelem zadaný očekávaný výnos (zachová volatilitu)
  const returnAdjustment = expectedReturn / portfolioBaseReturn;
  const adjustedReturn = portfolioBaseReturn * returnAdjustment;
  
  // Realistická volatilita: akcie ~15-20%, dluhopisy ~3-5%
  const portfolioVolatility = allocation.stocks * 0.18 + allocation.bonds * 0.04;
  
  // Jednoduchá simulace volatility (pro konzistentní výsledky)
  // Používáme deterministický pattern místo random pro reprodukovatelnost
  const cycleFactor = Math.sin((year * 1.618) % (2 * Math.PI)); // Zlatý řez pro "náhodnost"
  const volatilityFactor = cycleFactor * portfolioVolatility * 0.7; // 70% volatility
  
  const finalReturn = adjustedReturn + (adjustedReturn * volatilityFactor);
  
  // Realistické limity: -25% až +30% (historické extrémy)
  return Math.max(-0.25, Math.min(0.30, finalReturn / 100));
};

export const calculateRetirement = (params: RetirementParams): RetirementData => {
  const {
    currentAge,
    retirementAge,
    currentSavings,
    monthlySavings,
    expectedReturn,
    inflationRate,
    monthlyExpensesInRetirement,
    withdrawalStrategy,
    safeWithdrawalRate,
    accumulationStrategy = 'moderate',
    withdrawalPortfolioStrategy = 'conservative'
  } = params;

  const yearsToRetirement = retirementAge - currentAge;
  const monthlyReturn = expectedReturn / 100 / 12;
  const yearlyReturn = expectedReturn / 100;
  const yearlyInflation = inflationRate / 100;

  // Akumulační fáze - výpočet portfolia při odchodu do penze s realistickým portfoliem
  const projectionData: RetirementProjection[] = [];
  let portfolioValue = currentSavings;
  let totalContributed = currentSavings;

  for (let year = 0; year <= yearsToRetirement; year++) {
    const age = currentAge + year;
    const yearlyContribution = year === 0 ? 0 : monthlySavings * 12;
    
    if (year > 0) {
      // Přidání ročních příspěvků
      portfolioValue += yearlyContribution;
      totalContributed += yearlyContribution;
      
      // Zjednodušený výpočet s realističtější volatilitou
      const portfolioReturn = getPortfolioReturn(
        getPortfolioAllocation(age, accumulationStrategy), 
        expectedReturn, 
        year
      );
      
      // Aplikace výnosu
      portfolioValue *= (1 + portfolioReturn);
      
      // Ochrana proti extrémním ztrátám (konzervativnější)
      portfolioValue = Math.max(portfolioValue, totalContributed * 0.7);
    }

    const realValue = portfolioValue / Math.pow(1 + yearlyInflation, year);

    projectionData.push({
      year,
      age,
      yearlyContribution,
      portfolioValue,
      realValue,
      cumulativeContributions: totalContributed
    });
  }

  const totalSavingsAtRetirement = portfolioValue;
  const realPurchasingPower = totalSavingsAtRetirement / Math.pow(1 + yearlyInflation, yearsToRetirement);
  const investmentGains = totalSavingsAtRetirement - totalContributed;

  // Výběrová fáze - simulace čerpání v penzi
  const withdrawalData: WithdrawalProjection[] = [];
  let remainingPortfolio = totalSavingsAtRetirement;
  let yearsMoneyWillLast = 0;
  
  // Výpočet roční potřeby v době odchodu do penze (s inflací)
  const adjustedYearlyExpenses = monthlyExpensesInRetirement * 12 * Math.pow(1 + yearlyInflation, yearsToRetirement);
  
  for (let year = 0; year < 50; year++) { // Simulujeme až 50 let v penzi
    const age = retirementAge + year;
    
    let yearlyWithdrawal: number;
    
    switch (withdrawalStrategy) {
      case 'percentage':
        yearlyWithdrawal = remainingPortfolio * (safeWithdrawalRate / 100);
        break;
      case 'fixed':
        yearlyWithdrawal = adjustedYearlyExpenses * Math.pow(1 + yearlyInflation, year);
        break;
      case 'dynamic':
        // Dynamická strategie - upravuje výběr podle výkonnosti portfolia
        const baseWithdrawal = remainingPortfolio * (safeWithdrawalRate / 100);
        const inflationAdjusted = adjustedYearlyExpenses * Math.pow(1 + yearlyInflation, year);
        yearlyWithdrawal = Math.min(baseWithdrawal, inflationAdjusted * 1.2); // Max 120% plánovaných výdajů
        break;
      default:
        yearlyWithdrawal = remainingPortfolio * (safeWithdrawalRate / 100);
    }

    // Výběr z portfolia
    remainingPortfolio -= yearlyWithdrawal;
    
    // Aplikace konzervativnějšího výnosu v penzi
    if (remainingPortfolio > 0) {
      // V penzi používáme konzervativnější očekávaný výnos (75% původního)
      const conservativeReturn = expectedReturn * 0.75;
      
      const portfolioReturn = getPortfolioReturn(
        getPortfolioAllocation(age, withdrawalPortfolioStrategy),
        conservativeReturn,
        yearsToRetirement + year
      );
      
      remainingPortfolio *= (1 + portfolioReturn);
      remainingPortfolio = Math.max(0, remainingPortfolio);
    }

    const realWithdrawal = yearlyWithdrawal / Math.pow(1 + yearlyInflation, yearsToRetirement + year);
    const realPortfolioValue = Math.max(0, remainingPortfolio) / Math.pow(1 + yearlyInflation, yearsToRetirement + year);
    const isDepletion = remainingPortfolio <= 0;

    withdrawalData.push({
      year,
      age,
      portfolioValue: Math.max(0, remainingPortfolio),
      realPortfolioValue,
      yearlyWithdrawal,
      realWithdrawal,
      isDepletion
    });

    if (!isDepletion && remainingPortfolio > 0) {
      yearsMoneyWillLast = year + 1;
    }

    if (remainingPortfolio <= 0) break;
  }

  // Výpočet měsíčního příjmu v penzi (první rok)
  let monthlyIncomeInRetirement: number;
  
  switch (withdrawalStrategy) {
    case 'percentage':
      // 4% pravidlo - vybírá procento z portfolia
      monthlyIncomeInRetirement = (totalSavingsAtRetirement * (safeWithdrawalRate / 100)) / 12;
      break;
    case 'fixed':
      // Pevná strategie - vybírá podle plánovaných výdajů
      monthlyIncomeInRetirement = adjustedYearlyExpenses / 12;
      break;
    case 'dynamic':
      // Dynamická - menší z obou možností
      const percentageAmount = (totalSavingsAtRetirement * (safeWithdrawalRate / 100)) / 12;
      const fixedAmount = adjustedYearlyExpenses / 12;
      monthlyIncomeInRetirement = Math.min(percentageAmount, fixedAmount * 1.2);
      break;
    default:
      monthlyIncomeInRetirement = (totalSavingsAtRetirement * (safeWithdrawalRate / 100)) / 12;
  }

  // Zjištění, zda je člověk finančně zabezpečený
  const monthlyIncomeNeeded = monthlyExpensesInRetirement * Math.pow(1 + yearlyInflation, yearsToRetirement);
  const isFinanciallySecure = monthlyIncomeInRetirement >= monthlyIncomeNeeded && yearsMoneyWillLast >= 30;

  // Doporučené měsíční spoření pro dosažení BEZPEČNÉHO cíle
  let targetPortfolio: number;
  const adjustedExpenses = monthlyExpensesInRetirement * 12 * Math.pow(1 + yearlyInflation, yearsToRetirement);
  
  if (withdrawalStrategy === 'percentage') {
    // Pro 4% pravidlo: cílíme na 25x roční výdaje (konzervativní odhad)
    // Ale upravíme podle zvoleného withdrawal rate
    const multiplier = 100 / safeWithdrawalRate; // 4% = 25x, 3% = 33x, 5% = 20x
    targetPortfolio = adjustedExpenses * multiplier;
    
  } else if (withdrawalStrategy === 'fixed') {
    // Pro fixed: potřebujeme pokrýt 30 let s růstem portfolia
    let totalNeeded = 0;
    for (let year = 0; year < 30; year++) {
      const yearlyExpense = adjustedExpenses * Math.pow(1 + yearlyInflation, year);
      const discountedExpense = yearlyExpense / Math.pow(1 + yearlyReturn, year);
      totalNeeded += discountedExpense;
    }
    // Přidáme 20% bezpečnostní rezervu
    targetPortfolio = totalNeeded * 1.2;
    
  } else { // dynamic
    // Pro hybridní: použijeme vyšší z obou výpočtů = nejbezpečnější
    const percentageTarget = adjustedExpenses * (100 / safeWithdrawalRate);
    
    let fixedTarget = 0;
    for (let year = 0; year < 30; year++) {
      const yearlyExpense = adjustedExpenses * Math.pow(1 + yearlyInflation, year);
      const discountedExpense = yearlyExpense / Math.pow(1 + yearlyReturn, year);
      fixedTarget += discountedExpense;
    }
    fixedTarget *= 1.2; // 20% rezerva
    
    targetPortfolio = Math.max(percentageTarget, fixedTarget);
  }
  
  // Výpočet potřebného dodatečného spoření
  const futureValueOfCurrentSavings = currentSavings * Math.pow(1 + yearlyReturn, yearsToRetirement);
  const additionalNeeded = Math.max(0, targetPortfolio - futureValueOfCurrentSavings);
  
  // PMT výpočet pro pravidelné spoření (vzorec pro anuitu)
  const recommendedMonthlySavings = additionalNeeded > 0 && yearsToRetirement > 0
    ? (additionalNeeded * monthlyReturn) / (Math.pow(1 + monthlyReturn, yearsToRetirement * 12) - 1)
    : 0;

  // Realističtější pravděpodobnost úspěchu založená na Trinity Study a českých podmínkách
  let successProbability: number;
  
  // Základní faktory ovlivňující úspěšnost
  const portfolioBalance = totalSavingsAtRetirement / (adjustedYearlyExpenses * 25); // Poměr k 4% rule
  const duration = Math.min(50, yearsMoneyWillLast); // Limit na 50 let
  
  if (withdrawalStrategy === 'percentage') {
    // Trinity Study data pro různé withdrawal rates a délky důchodu
    if (safeWithdrawalRate <= 3.0) {
      successProbability = duration >= 40 ? 94 : 98; // 3% rule je velmi bezpečná
    } else if (safeWithdrawalRate <= 3.5) {
      successProbability = duration >= 40 ? 88 : 95;
    } else if (safeWithdrawalRate <= 4.0) {
      successProbability = duration >= 40 ? 79 : 87; // Klasické 4% rule
    } else if (safeWithdrawalRate <= 4.5) {
      successProbability = duration >= 40 ? 68 : 78;
    } else if (safeWithdrawalRate <= 5.0) {
      successProbability = duration >= 40 ? 55 : 67;
    } else if (safeWithdrawalRate <= 5.5) {
      successProbability = duration >= 40 ? 43 : 55;
    } else {
      successProbability = 30; // Nad 5.5% je velmi rizikové
    }
    
    // Úprava podle kvality portfolia (poměr akcií/dluhopisů pomáhá)
    const stockAllocation = getPortfolioAllocation(retirementAge, withdrawalPortfolioStrategy).stocks;
    if (stockAllocation >= 0.6 && stockAllocation <= 0.8) {
      successProbability += 3; // Optimální alokace 60-80% akcií
    } else if (stockAllocation < 0.4 || stockAllocation > 0.9) {
      successProbability -= 5; // Extrémní alokace snižuje úspěšnost
    }
    
  } else if (withdrawalStrategy === 'fixed') {
    // Pro fixed strategii - závisí hlavně na velikosti portfolia
    if (portfolioBalance >= 2.0) {
      successProbability = 95; // Dvojnásobek potřeby = velmi bezpečné
    } else if (portfolioBalance >= 1.5) {
      successProbability = 85; // 150% potřeby = bezpečné
    } else if (portfolioBalance >= 1.25) {
      successProbability = 72; // 125% potřeby = docela bezpečné
    } else if (portfolioBalance >= 1.0) {
      successProbability = 55; // Přesně podle potřeby = riskantní
    } else if (portfolioBalance >= 0.8) {
      successProbability = 35; // Pod potřebami
    } else {
      successProbability = 15; // Výrazně nedostatečné
    }
    
    // Úprava podle délky důchodu
    if (duration > 35) successProbability -= 10; // Delší důchod = rizikovější
    if (duration > 45) successProbability -= 5;
    
  } else { // dynamic
    // Hybridní strategie kombinuje výhody obou přístupů
    const baseRate = Math.min(safeWithdrawalRate, 4.5); // Omezíme rate na 4.5%
    let hybridProb: number;
    
    if (baseRate <= 3.5 && portfolioBalance >= 1.2) {
      hybridProb = 92; // Konzervativní rate + dostatek peněz
    } else if (baseRate <= 4.0 && portfolioBalance >= 1.1) {
      hybridProb = 84; // Standardní rate + trochu navíc
    } else if (baseRate <= 4.5 && portfolioBalance >= 1.0) {
      hybridProb = 74; // Vyšší rate ale dostatek peněz
    } else if (portfolioBalance >= 0.9) {
      hybridProb = 62; // Blízko k potřebě
    } else {
      hybridProb = 40; // Pod potřebami
    }
    
    // Hybridní má bonus za flexibilitu (může snížit výběry v zlých letech)
    successProbability = Math.min(97, hybridProb + 5);
  }
  
  // Aplikace českých specifik
  // Nižší volatilita českého trhu ale také nižší výnosy
  successProbability *= 0.95; // Mírná redukce kvůli menší historii českého trhu
  
  // Ochrana proti extrémním hodnotám
  successProbability = Math.min(97, Math.max(10, successProbability));

  return {
    totalSavingsAtRetirement,
    realPurchasingPower,
    monthlyIncomeInRetirement,
    yearsMoneyWillLast,
    isFinanciallySecure,
    recommendedMonthlySavings,
    projectionData,
    withdrawalData,
    summary: {
      totalContributed,
      investmentGains,
      inflationImpact: totalSavingsAtRetirement - realPurchasingPower,
      successProbability
    }
  };
};