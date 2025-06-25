
interface FeeScenario {
  name: string;
  totalExpenseRatio: number;
  entryFee: number;
  color: string;
}

interface FeeCalculationResult {
  scenario: FeeScenario;
  year: number;
  grossValue: number;
  netValue: number;
  totalFees: number;
  feeImpact: number;
}

interface CalculationParams {
  scenarios: FeeScenario[];
  initialInvestment: number;
  recurringInvestment: number;
  recurringFrequency: 'monthly' | 'yearly';
  averageReturn: number;
  investmentPeriod: number;
}

export function calculateFeeImpact(params: CalculationParams): FeeCalculationResult[] {
  const { scenarios, initialInvestment, recurringInvestment, recurringFrequency, averageReturn, investmentPeriod } = params;
  const allResults: FeeCalculationResult[] = [];
  const grossAnnualReturn = averageReturn / 100;

  console.log('Starting fee calculation with:', params);

  scenarios.forEach(scenario => {
    let currentValue = initialInvestment;
    let totalInvested = initialInvestment;
    let totalFeesPaid = 0;

    // Aplikuj vstupní poplatek na počáteční investici
    const initialEntryFee = (initialInvestment * scenario.entryFee) / 100;
    currentValue -= initialEntryFee;
    totalFeesPaid += initialEntryFee;

    // Čistý roční výnos po TER poplatcích
    const netAnnualReturn = grossAnnualReturn - (scenario.totalExpenseRatio / 100);

    for (let year = 1; year <= investmentPeriod; year++) {
      let yearlyEntryFees = 0;
      let yearlyTERFees = 0;

      if (recurringFrequency === 'monthly') {
        // Měsíční investování s měsíčním compoundingem
        const monthlyNetReturn = Math.pow(1 + netAnnualReturn, 1/12) - 1;
        const monthlyGrossReturn = Math.pow(1 + grossAnnualReturn, 1/12) - 1;
        
        for (let month = 1; month <= 12; month++) {
          // Přidej měsíční investici na začátku měsíce
          currentValue += recurringInvestment;
          totalInvested += recurringInvestment;
          
          // Aplikuj vstupní poplatek na měsíční investici
          const monthlyEntryFee = (recurringInvestment * scenario.entryFee) / 100;
          currentValue -= monthlyEntryFee;
          yearlyEntryFees += monthlyEntryFee;
          
          // Vypočítej TER poplatek z aktuální hodnoty před výnosem
          const monthlyTERFee = currentValue * (scenario.totalExpenseRatio / 100 / 12);
          yearlyTERFees += monthlyTERFee;
          
          // Aplikuj čistý měsíční výnos (už zahrnuje TER)
          currentValue = currentValue * (1 + monthlyNetReturn);
        }
      } else {
        // Roční investování
        // Přidej roční investici na začátku roku
        currentValue += recurringInvestment;
        totalInvested += recurringInvestment;
        
        // Aplikuj vstupní poplatek na roční investici
        const yearlyEntryFee = (recurringInvestment * scenario.entryFee) / 100;
        currentValue -= yearlyEntryFee;
        yearlyEntryFees += yearlyEntryFee;
        
        // Vypočítej TER poplatek z aktuální hodnoty před výnosem
        yearlyTERFees = currentValue * (scenario.totalExpenseRatio / 100);
        
        // Aplikuj čistý roční výnos (už zahrnuje TER)
        currentValue = currentValue * (1 + netAnnualReturn);
      }

      totalFeesPaid += yearlyEntryFees + yearlyTERFees;

      // Vypočítej hodnotu bez poplatků pro srovnání (hrubý výnos)
      let grossValue = initialInvestment;
      let grossTotalInvested = initialInvestment;
      
      for (let i = 1; i <= year; i++) {
        if (recurringFrequency === 'monthly') {
          const monthlyGrossReturn = Math.pow(1 + grossAnnualReturn, 1/12) - 1;
          for (let m = 1; m <= 12; m++) {
            grossValue += recurringInvestment;
            grossTotalInvested += recurringInvestment;
            grossValue = grossValue * (1 + monthlyGrossReturn);
          }
        } else {
          grossValue += recurringInvestment;
          grossTotalInvested += recurringInvestment;
          grossValue = grossValue * (1 + grossAnnualReturn);
        }
      }

      const feeImpact = grossValue - currentValue;

      console.log(`${scenario.name} - Year ${year}:`, {
        totalInvested,
        currentValue,
        grossValue,
        totalFeesPaid,
        yearlyEntryFees,
        yearlyTERFees,
        feeImpact,
        netAnnualReturn: netAnnualReturn * 100
      });

      allResults.push({
        scenario,
        year,
        grossValue: Math.round(grossValue),
        netValue: Math.round(currentValue),
        totalFees: Math.round(totalFeesPaid),
        feeImpact: Math.round(feeImpact)
      });
    }
  });

  console.log('Fee calculation results:', allResults);
  return allResults;
}
