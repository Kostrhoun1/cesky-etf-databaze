
import { ETF } from '@/types/etf';
import { ETF_ISIN_TO_TICKER } from './etfTickerMapping';

// Function to map categories based on ETF properties
const mapETFCategory = (etf: any): string => {
  const name = (etf.name || '').toLowerCase();
  const investmentFocus = (etf.investment_focus || '').toLowerCase();
  const indexName = (etf.index_name || '').toLowerCase();
  const description = (etf.description_en || '').toLowerCase();
  
  // Real Estate / REIT ETFs
  if (
    name.includes('real estate') || 
    name.includes('reit') || 
    name.includes('property') || 
    name.includes('immobil') ||
    investmentFocus.includes('real estate') ||
    indexName.includes('real estate') ||
    indexName.includes('reit') ||
    indexName.includes('property') ||
    description.includes('real estate') ||
    description.includes('reit') ||
    description.includes('property')
  ) {
    return 'Nemovitosti';
  }
  
  // Bond ETFs
  if (
    name.includes('bond') || 
    name.includes('govt') || 
    name.includes('government') ||
    name.includes('treasury') ||
    name.includes('corporate bond') ||
    investmentFocus.includes('bond') ||
    indexName.includes('bond') ||
    indexName.includes('government') ||
    description.includes('bond')
  ) {
    return 'Dluhopisy';
  }
  
  // Commodity ETFs
  if (
    name.includes('gold') || 
    name.includes('silver') || 
    name.includes('commodity') ||
    name.includes('energy') ||
    name.includes('oil') ||
    name.includes('gas') ||
    investmentFocus.includes('commodities') ||
    indexName.includes('commodity') ||
    description.includes('commodity')
  ) {
    return 'Komodity';
  }
  
  // Crypto ETFs
  if (
    name.includes('bitcoin') || 
    name.includes('crypto') || 
    name.includes('blockchain') ||
    investmentFocus.includes('crypto') ||
    description.includes('bitcoin') ||
    description.includes('crypto')
  ) {
    return 'Krypto';
  }
  
  // Default: if it contains "equity" or stock-related terms, it's stocks
  if (
    investmentFocus.includes('equity') ||
    description.includes('equity') ||
    description.includes('stocks') ||
    description.includes('shares')
  ) {
    return 'Akcie';
  }
  
  // Fallback to original category or "Ostatní"
  return etf.category || 'Ostatní';
};

export const parseCSV = (csvContent: string): ETF[] => {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(';');
  
  console.log('CSV Headers:', headers);
  console.log('Total lines:', lines.length);
  
  // List of numeric fields that should be converted to numbers
  const numericFields = [
    'ter_numeric',
    'fund_size_numeric', 
    'total_holdings',
    'return_1y',
    'return_3y', 
    'return_5y',
    'return_ytd',
    'volatility_1y',
    'volatility_3y',
    'volatility_5y',
    'return_per_risk_1y',
    'return_per_risk_3y', 
    'return_per_risk_5y',
    'max_drawdown_1y',
    'max_drawdown_3y',
    'max_drawdown_5y',
    'max_drawdown_inception',
    'beta',
    'correlation',
    'tracking_error',
    'information_ratio',
    'total_exchanges',
    'current_dividend_yield_numeric',
    'dividends_12m_numeric',
    'retry_count',
    'holding_1_weight',
    'holding_2_weight',
    'holding_3_weight',
    'holding_4_weight',
    'holding_5_weight',
    'holding_6_weight',
    'holding_7_weight',
    'holding_8_weight',
    'holding_9_weight',
    'holding_10_weight',
    'country_1_weight',
    'country_2_weight',
    'country_3_weight',
    'country_4_weight',
    'country_5_weight',
    'sector_1_weight',
    'sector_2_weight',
    'sector_3_weight',
    'sector_4_weight',
    'sector_5_weight'
  ];
  
  const etfs: ETF[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(';');
    
    if (values.length !== headers.length) {
      console.warn(`Line ${i + 1} has ${values.length} values but expected ${headers.length}`);
      continue;
    }
    
    const etf: any = {};
    
    headers.forEach((header, index) => {
      const value = values[index]?.trim();
      
      // Convert numeric fields
      if (numericFields.includes(header)) {
        const numValue = value && value !== '' ? parseFloat(value.replace(',', '.')) : 0;
        etf[header] = numValue;
        
        // Debug dividend and region related fields
        if (header.includes('dividend') || header === 'region') {
          console.log(`Processing field "${header}":`, value, '-> converted to:', numValue);
        }
      } else {
        etf[header] = value || '';
        
        // Debug dividend and region related fields
        if (header.includes('dividend') || header === 'region') {
          console.log(`Processing field "${header}":`, value);
        }
      }
    });
    
    // Debug first few ETFs dividend and region values
    if (i <= 3) {
      console.log(`ETF ${i} dividend/region values:`, {
        current_dividend_yield: etf.current_dividend_yield,
        current_dividend_yield_numeric: etf.current_dividend_yield_numeric,
        dividends_12m: etf.dividends_12m,
        dividends_12m_numeric: etf.dividends_12m_numeric,
        dividends_12m_currency: etf.dividends_12m_currency,
        dividend_extraction_method: etf.dividend_extraction_method,
        region: etf.region,
        name: etf.name
      });
    }
    
    // Apply smart categorization
    etf.category = mapETFCategory(etf);
    
    // Fix known ticker issues
    if (etf.isin === 'IE00B5BMR087' && etf.primary_ticker === 'SXR8') {
      // This is iShares Core S&P 500 - should be CSPX
      etf.primary_ticker = 'CSPX';
    }
    
    etfs.push(etf as ETF);
  }
  
  console.log('Parsed ETFs:', etfs.length);
  
  // Debug: Check dividend/region values in first few parsed ETFs
  console.log('Sample dividend/region values from parsed ETFs:', 
    etfs.slice(0, 5).map(etf => ({
      name: etf.name,
      current_dividend_yield: etf.current_dividend_yield,
      current_dividend_yield_numeric: etf.current_dividend_yield_numeric,
      region: etf.region
    }))
  );
  
  return etfs;
};

export const formatCurrency = (amount: number, currency: string): string => {
  if (!amount) return 'N/A';
  
  const formatter = new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: currency || 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  return formatter.format(amount);
};

export const formatPercentage = (value: number): string => {
  if (value === null || value === undefined || isNaN(value)) return 'N/A';
  return `${value.toFixed(2)}%`;
};

export const formatTER = (value: number): string => {
  if (value === null || value === undefined || isNaN(value) || value === 0) return 'N/A';
  return `${value.toFixed(2)}%`;
};
