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

// Portfolio alokace podle věku a rizikového profilu
const getPortfolioAllocation = (age: number, riskProfile: 'conservative' | 'moderate' | 'aggressive' = 'moderate') => {
  let baseStockAllocation: number;
  
  // Klasické pravidlo: 100 - věk = % akcií, ale upravené podle rizikového profilu
  if (riskProfile === 'conservative') {
    baseStockAllocation = Math.max(20, 90 - age); // Konzervativnější
  } else if (riskProfile === 'aggressive') {
    baseStockAllocation = Math.min(90, 110 - age); // Agresivnější  
  } else {
    baseStockAllocation = Math.max(30, 100 - age); // Klasické pravidlo
  }
  
  const bondAllocation = 100 - baseStockAllocation;
  
  return {
    stocks: baseStockAllocation / 100,
    bonds: bondAllocation / 100
  };
};

// Zjednodušený, ale přesnější výpočet výnosu portfolia
const getPortfolioReturn = (allocation: {stocks: number, bonds: number}, expectedReturn: number, year: number): number => {
  // Zjednodušená volatilita - průměrný výnos s mírnou variabilitou
  const baseReturn = expectedReturn;
  
  // Mírná volatilita pro realističnost (+/- 20% od základního výnosu)
  const volatilityFactor = Math.sin(year * 2.718) * 0.2; // -0.2 až +0.2
  
  // Aplikace volatility na celkové portfolio
  const portfolioReturn = baseReturn * (1 + volatilityFactor);
  
  // Realistické limity
  return Math.max(-30, Math.min(40, portfolioReturn)) / 100;
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

  // Pravděpodobnost úspěchu (na základě simulace Trinity Study)
  let successProbability: number;
  
  if (withdrawalStrategy === 'percentage') {
    // Pro 4% pravidlo - založeno na Trinity Study
    if (safeWithdrawalRate <= 3) {
      successProbability = 95; // 3% má 95%+ úspěšnost na 30 let
    } else if (safeWithdrawalRate <= 4) {
      successProbability = 85; // 4% má ~85% úspěšnost na 30 let
    } else if (safeWithdrawalRate <= 5) {
      successProbability = 70; // 5% má ~70% úspěšnost na 30 let  
    } else {
      successProbability = 50; // Nad 5% je rizikové
    }
    
    // Upravit podle délky penze (více let = nižší pravděpodobnost)
    if (yearsMoneyWillLast < 25) successProbability *= 0.7;
    else if (yearsMoneyWillLast < 30) successProbability *= 0.8;
    
  } else if (withdrawalStrategy === 'fixed') {
    // Pro fixed strategii - závisí na poměru portfolio vs potřeba
    const portfolioToNeedRatio = totalSavingsAtRetirement / (adjustedYearlyExpenses * 25);
    
    if (portfolioToNeedRatio >= 1.5) {
      successProbability = 90; // 150%+ požadované částky = velmi bezpečné
    } else if (portfolioToNeedRatio >= 1.2) {
      successProbability = 75; // 120%+ = docela bezpečné
    } else if (portfolioToNeedRatio >= 1.0) {
      successProbability = 60; // Přesně na hranici
    } else if (portfolioToNeedRatio >= 0.8) {
      successProbability = 40; // Pod požadavky
    } else {
      successProbability = 20; // Výrazně nedostatečné
    }
    
  } else { // dynamic
    // Pro hybridní - kombinace obou přístupů = vyšší bezpečnost
    const percentageProb = safeWithdrawalRate <= 4 ? 85 : 70;
    const portfolioToNeedRatio = totalSavingsAtRetirement / (adjustedYearlyExpenses * 25);
    const fixedProb = portfolioToNeedRatio >= 1.2 ? 75 : (portfolioToNeedRatio >= 1.0 ? 60 : 40);
    
    // Hybridní strategie je bezpečnější - bere vyšší z obou
    successProbability = Math.min(95, Math.max(percentageProb, fixedProb) * 1.1);
  }
  
  successProbability = Math.min(100, Math.max(0, successProbability));

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