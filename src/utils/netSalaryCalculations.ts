export interface NetSalaryParams {
  grossSalary: number;
  isPensioner: boolean;
  hasChildren: boolean;
  numberOfChildren: number;
  isStudent: boolean;
  hasDisability: boolean;
}

export interface NetSalaryData {
  grossSalary: number;
  socialInsurance: number;
  healthInsurance: number;
  totalInsurance: number;
  taxableBase: number;
  incomeTax: number;
  taxRate: number;
  taxDeductions: number;
  netTax: number;
  netSalary: number;
  employerCosts: number;
  taxEffectiveRate: number;
  breakdown: {
    monthlyTaxCredit: number;
    childTaxCredit: number;
    studentTaxCredit: number;
    disabilityTaxCredit: number;
    totalTaxCredits: number;
  };
}

// Konstanty pro rok 2025
const SOCIAL_INSURANCE_RATE = 0.065; // 6.5%
const HEALTH_INSURANCE_RATE = 0.045; // 4.5%
const PENSIONER_SOCIAL_INSURANCE_RATE = 0.0; // 0% pro důchodce
const PENSIONER_HEALTH_INSURANCE_RATE = 0.045; // 4.5% pro důchodce (zůstává)
const SICKNESS_INSURANCE_RATE = 0.006; // 0.6% pro nepracující důchodce

const INCOME_TAX_RATE_BASIC = 0.15; // 15%
const INCOME_TAX_RATE_HIGH = 0.23; // 23%
const AVERAGE_SALARY_2025 = 46557; // Kč
const HIGH_TAX_THRESHOLD_MONTHLY = AVERAGE_SALARY_2025 * 36; // 1,676,052 Kč ročně = 139,671 Kč měsíčně

const MONTHLY_TAX_CREDIT = 2570; // Kč
const CHILD_TAX_CREDIT_MONTHLY = 1267; // Kč na dítě
const STUDENT_TAX_CREDIT_MONTHLY = 335; // Kč pro studenta
const DISABILITY_TAX_CREDIT_1_2_MONTHLY = 210; // Kč pro ZTP 1. a 2. stupně
const DISABILITY_TAX_CREDIT_3_MONTHLY = 420; // Kč pro ZTP/P 3. stupeň

const EMPLOYER_SOCIAL_INSURANCE_RATE = 0.248; // 24.8%
const EMPLOYER_HEALTH_INSURANCE_RATE = 0.09; // 9%

export const calculateNetSalary = (params: NetSalaryParams): NetSalaryData => {
  const { 
    grossSalary, 
    isPensioner, 
    hasChildren, 
    numberOfChildren, 
    isStudent, 
    hasDisability 
  } = params;

  // Výpočet pojistného
  let socialInsurance: number;
  let healthInsurance: number;

  if (isPensioner) {
    // Pracující důchodci - 0% sociální, 4.5% zdravotní
    socialInsurance = 0;
    healthInsurance = grossSalary * PENSIONER_HEALTH_INSURANCE_RATE;
  } else {
    socialInsurance = grossSalary * SOCIAL_INSURANCE_RATE;
    healthInsurance = grossSalary * HEALTH_INSURANCE_RATE;
  }

  const totalInsurance = socialInsurance + healthInsurance;

  // Daňový základ = hrubá mzda - pojistné
  const taxableBase = grossSalary - totalInsurance;

  // Určení daňové sazby
  const annualGross = grossSalary * 12;
  const taxRate = annualGross > HIGH_TAX_THRESHOLD_MONTHLY ? INCOME_TAX_RATE_HIGH : INCOME_TAX_RATE_BASIC;

  // Výpočet daně
  let incomeTax = 0;
  if (annualGross > HIGH_TAX_THRESHOLD_MONTHLY) {
    // Progresivní zdanění
    const basicTaxBase = HIGH_TAX_THRESHOLD_MONTHLY;
    const highTaxBase = annualGross - HIGH_TAX_THRESHOLD_MONTHLY;
    incomeTax = (basicTaxBase * INCOME_TAX_RATE_BASIC + highTaxBase * INCOME_TAX_RATE_HIGH) / 12;
  } else {
    incomeTax = taxableBase * INCOME_TAX_RATE_BASIC;
  }

  // Slevy na dani
  let monthlyTaxCredit = MONTHLY_TAX_CREDIT;
  let childTaxCredit = hasChildren ? numberOfChildren * CHILD_TAX_CREDIT_MONTHLY : 0;
  let studentTaxCredit = isStudent ? STUDENT_TAX_CREDIT_MONTHLY : 0;
  let disabilityTaxCredit = hasDisability ? DISABILITY_TAX_CREDIT_1_2_MONTHLY : 0; // Defaultně 1./2. stupeň

  const totalTaxCredits = monthlyTaxCredit + childTaxCredit + studentTaxCredit + disabilityTaxCredit;

  // Čistá daň (nemůže být záporná)
  const netTax = Math.max(0, incomeTax - totalTaxCredits);

  // Čistá mzda
  const netSalary = grossSalary - totalInsurance - netTax;

  // Náklady zaměstnavatele
  const employerSocialInsurance = grossSalary * EMPLOYER_SOCIAL_INSURANCE_RATE;
  const employerHealthInsurance = grossSalary * EMPLOYER_HEALTH_INSURANCE_RATE;
  const employerCosts = grossSalary + employerSocialInsurance + employerHealthInsurance;

  // Efektivní daňová sazba
  const taxEffectiveRate = (totalInsurance + netTax) / grossSalary;

  return {
    grossSalary,
    socialInsurance,
    healthInsurance,
    totalInsurance,
    taxableBase,
    incomeTax,
    taxRate,
    taxDeductions: totalTaxCredits,
    netTax,
    netSalary,
    employerCosts,
    taxEffectiveRate,
    breakdown: {
      monthlyTaxCredit,
      childTaxCredit,
      studentTaxCredit,
      disabilityTaxCredit,
      totalTaxCredits
    }
  };
};

// Helper funkce pro formátování peněz
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper funkce pro formátování procent
export const formatPercentage = (rate: number): string => {
  return `${(rate * 100).toFixed(1)}%`;
};