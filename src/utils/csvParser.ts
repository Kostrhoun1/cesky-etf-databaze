
import { ETF } from '@/types/etf';

export const parseCSV = (csvContent: string): ETF[] => {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(';');
  
  console.log('CSV Headers:', headers);
  console.log('Total lines:', lines.length);
  
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
      if (header.includes('_numeric') || 
          header.includes('return_') || 
          header.includes('volatility_') || 
          header.includes('max_drawdown_') ||
          header.includes('_weight') ||
          header === 'total_holdings' ||
          header === 'total_exchanges' ||
          header === 'retry_count' ||
          header === 'beta' ||
          header === 'correlation' ||
          header === 'tracking_error' ||
          header === 'information_ratio') {
        etf[header] = value && value !== '' ? parseFloat(value) : 0;
      } else {
        etf[header] = value || '';
      }
    });
    
    etfs.push(etf as ETF);
  }
  
  console.log('Parsed ETFs:', etfs.length);
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
