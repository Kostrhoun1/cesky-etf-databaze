
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
      // Měsíční investování - přidáme všechny měsíční investice na začátku roku
      // a pak aplikujeme roční výnos na celou částku
      const yearlyRecurringAmount = recurringInvestment * 12;
      currentValue += yearlyRecurringAmount;
      totalInvested += yearlyRecurringAmount;
      
      // Aplikuj roční výnos na celou částku
      currentValue = currentValue * (1 + annualReturn);
    } else {
      // Roční investování
      // Přidej roční investici na začátku roku
      currentValue += recurringInvestment;
      totalInvested += recurringInvestment;
      
      // Aplikuj roční výnos
      currentValue = currentValue * (1 + annualReturn);
    }

    const grossGain = currentValue - totalInvested;
    const tax = grossGain > 0 ? grossGain * (taxRate / 100) : 0;
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
