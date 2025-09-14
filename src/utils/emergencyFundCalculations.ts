export interface EmergencyFundParams {
  monthlyExpenses: number;
  jobStability: 'stable' | 'moderate' | 'unstable';
  familySize: number;
  hasSecondIncome: boolean;
  hasHealthInsurance: boolean;
  hasDebt: boolean;
  industryRisk: 'low' | 'medium' | 'high';
  currentSavings: number;
  monthlySavingCapacity: number;
}

export interface EmergencyFundData {
  recommendedAmount: number;
  recommendedMonths: number;
  currentCoverage: number;
  shortfall: number;
  monthsToTarget: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: {
    whereToKeep: WhereToKeepOption[];
    savingStrategy: SavingStrategy;
    priorityLevel: 'critical' | 'high' | 'moderate' | 'sufficient';
  };
  breakdown: {
    baseAmount: number;
    riskAdjustment: number;
    familyAdjustment: number;
    finalAmount: number;
  };
}

export interface WhereToKeepOption {
  option: string;
  percentage: number;
  pros: string[];
  cons: string[];
  expectedReturn: number;
  liquidity: 'immediate' | 'within_days' | 'within_week';
}

export interface SavingStrategy {
  phase1: {
    target: number;
    description: string;
    timeline: string;
  };
  phase2: {
    target: number;
    description: string;
    timeline: string;
  };
  phase3: {
    target: number;
    description: string;
    timeline: string;
  };
}

export const calculateEmergencyFund = (params: EmergencyFundParams): EmergencyFundData => {
  const {
    monthlyExpenses,
    jobStability,
    familySize,
    hasSecondIncome,
    hasHealthInsurance,
    hasDebt,
    industryRisk,
    currentSavings,
    monthlySavingCapacity
  } = params;

  // Základní výpočet podle stability zaměstnání
  let baseMonths: number;
  switch (jobStability) {
    case 'stable':
      baseMonths = 3;
      break;
    case 'moderate':
      baseMonths = 6;
      break;
    case 'unstable':
      baseMonths = 9;
      break;
  }

  // Rizikové úpravy
  let riskMultiplier = 1;

  // Odvětví
  if (industryRisk === 'medium') riskMultiplier += 0.5;
  if (industryRisk === 'high') riskMultiplier += 1;

  // Druhý příjem snižuje riziko
  if (!hasSecondIncome) riskMultiplier += 0.5;

  // Zdravotní pojištění
  if (!hasHealthInsurance) riskMultiplier += 1;

  // Dluhy zvyšují potřebu
  if (hasDebt) riskMultiplier += 0.5;

  // Velikost rodiny
  let familyMultiplier = 1;
  if (familySize > 2) familyMultiplier += (familySize - 2) * 0.25;

  // Finální výpočet
  const adjustedMonths = baseMonths * riskMultiplier * familyMultiplier;
  const recommendedMonths = Math.max(3, Math.min(12, adjustedMonths)); // Min 3, max 12 měsíců
  const recommendedAmount = monthlyExpenses * recommendedMonths;

  // Současné pokrytí
  const currentCoverage = currentSavings / monthlyExpenses;
  const shortfall = Math.max(0, recommendedAmount - currentSavings);
  const monthsToTarget = monthlySavingCapacity > 0 ? Math.ceil(shortfall / monthlySavingCapacity) : 0;

  // Určení rizikové úrovně
  let riskLevel: 'low' | 'medium' | 'high';
  if (adjustedMonths <= 4) riskLevel = 'low';
  else if (adjustedMonths <= 7) riskLevel = 'medium';
  else riskLevel = 'high';

  // Kde držet peníze
  const whereToKeep: WhereToKeepOption[] = [
    {
      option: 'Spořicí účet',
      percentage: 60,
      pros: ['Okamžitá dostupnost', 'Pojištěno do 100k€', 'Nulové riziko ztráty'],
      cons: ['Nízký úrok', 'Reálná ztráta inflací'],
      expectedReturn: 2.5,
      liquidity: 'immediate'
    },
    {
      option: 'Termínovaný vklad (kratší)',
      percentage: 25,
      pros: ['Vyšší úrok', 'Garance', 'Pojištěno'],
      cons: ['Omezená dostupnost', 'Penále za předčasný výběr'],
      expectedReturn: 4,
      liquidity: 'within_days'
    },
    {
      option: 'Money Market ETF',
      percentage: 15,
      pros: ['Vyšší výnos', 'Likvidita během 1-2 dní', 'Diverzifikace'],
      cons: ['Mírné riziko', 'Možné fluktuace', 'Poplatky'],
      expectedReturn: 3.5,
      liquidity: 'within_days'
    }
  ];

  // Strategie spoření
  const phase1Target = monthlyExpenses * 1; // První měsíc
  const phase2Target = monthlyExpenses * Math.min(3, recommendedMonths); // 3 měsíce
  const phase3Target = recommendedAmount; // Celá částka

  const savingStrategy: SavingStrategy = {
    phase1: {
      target: phase1Target,
      description: 'Nouzová základna - pokryje první měsíc bez příjmu',
      timeline: monthlySavingCapacity > 0 ? `${Math.ceil(phase1Target / monthlySavingCapacity)} měsíců` : 'N/A'
    },
    phase2: {
      target: phase2Target,
      description: 'Základní rezerva - pokryje 3 měsíce běžných výdajů',
      timeline: monthlySavingCapacity > 0 ? `${Math.ceil(phase2Target / monthlySavingCapacity)} měsíců` : 'N/A'
    },
    phase3: {
      target: phase3Target,
      description: 'Plná rezerva - optimální pokrytí podle vašeho rizikového profilu',
      timeline: monthlySavingCapacity > 0 ? `${Math.ceil(phase3Target / monthlySavingCapacity)} měsíců` : 'N/A'
    }
  };

  // Priorita spoření
  let priorityLevel: 'critical' | 'high' | 'moderate' | 'sufficient';
  if (currentCoverage < 1) priorityLevel = 'critical';
  else if (currentCoverage < 3) priorityLevel = 'high';
  else if (currentCoverage < recommendedMonths * 0.8) priorityLevel = 'moderate';
  else priorityLevel = 'sufficient';

  return {
    recommendedAmount,
    recommendedMonths,
    currentCoverage,
    shortfall,
    monthsToTarget,
    riskLevel,
    recommendations: {
      whereToKeep,
      savingStrategy,
      priorityLevel
    },
    breakdown: {
      baseAmount: monthlyExpenses * baseMonths,
      riskAdjustment: monthlyExpenses * baseMonths * (riskMultiplier - 1),
      familyAdjustment: monthlyExpenses * baseMonths * riskMultiplier * (familyMultiplier - 1),
      finalAmount: recommendedAmount
    }
  };
};