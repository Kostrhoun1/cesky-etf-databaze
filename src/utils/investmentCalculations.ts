
export interface CalculationData {
  year: number;
  totalInvested: number;
  grossValue: number;
  netValue: number;
  grossGain: number;
  netGain: number;
  tax: number;
}

export interface InvestmentParams {
  initialInvestment: number;
  recurringInvestment: number;
  recurringFrequency: 'monthly' | 'yearly';
  averageReturn: number;
  investmentPeriod: number;
  taxRate: number;
}

export const calculateInvestment = (params: InvestmentParams): CalculationData[] => {
  const {
    initialInvestment,
    recurringInvestment,
    recurringFrequency,
    averageReturn,
    investmentPeriod,
    taxRate
  } = params;

  const data: CalculationData[] = [];
  const annualReturn = averageReturn / 100;
  
  console.log('Starting calculation with:', params);

  let currentValue = initialInvestment;
  let totalInvested = initialInvestment;

  for (let year = 1; year <= investmentPeriod; year++) {
    if (recurringFrequency === 'monthly') {
      // Měsíční investování - simulujeme měsíc po měsíci pro přesný výpočet
      const monthlyReturn = annualReturn / 12; // Převod na měsíční výnos
      
      for (let month = 1; month <= 12; month++) {
        // Přidej měsíční investici
        currentValue += recurringInvestment;
        totalInvested += recurringInvestment;
        
        // Aplikuj měsíční výnos na celou aktuální hodnotu
        currentValue = currentValue * (1 + monthlyReturn);
      }
    } else {
      // Roční investování
      // Přidej roční investici na začátku roku
      currentValue += recurringInvestment;
      totalInvested += recurringInvestment;
      
      // Aplikuj roční výnos
      currentValue = currentValue * (1 + annualReturn);
    }

    const grossGain = currentValue - totalInvested;
    
    // Daň z kapitálových výnosů v ČR:
    // - 0% při držení 3+ roky (časový test) 
    // - 15%/23% při aktivním obchodování (kratší držení)
    // Pro aktivní obchodníky simulujeme roční zdanění realizovaných zisků
    const tax = (taxRate > 0 && grossGain > 0) ? grossGain * (taxRate / 100) : 0;
    const netValue = currentValue - tax;
    const netGain = netValue - totalInvested;

    console.log(`Year ${year}:`, {
      totalInvested,
      currentValue,
      grossGain,
      tax,
      netValue,
      netGain
    });

    data.push({
      year,
      totalInvested: Math.round(totalInvested),
      grossValue: Math.round(currentValue),
      netValue: Math.round(netValue),
      grossGain: Math.round(grossGain),
      netGain: Math.round(netGain),
      tax: Math.round(tax)
    });
  }

  console.log('Final results:', data);
  return data;
};
