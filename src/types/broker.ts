
export interface Broker {
  id: string;
  name: string;
  logo: string;
  description: string;
  rating: number;
  regulation: string;
  protection: string;
  etfFee: string;
  managementFee: string;
  fxFee: string;
  fractional: boolean;
  czSupport: boolean;
  czDividends: string;
  minDeposit: string;
  platforms: string[];
  markets: string[] | string;
  etfCount: string;
  languages: string[];
  customerSupport: string;
  specialFeatures: string[];
  pros: string[];
  cons: string[];
}

export interface ComparisonRow {
  feature: string;
  degiro: string;
  xtb: string;
  fio: string;
  trading212: string;
  ibkr: string;
}
