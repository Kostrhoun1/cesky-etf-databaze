
import { useState, useEffect, useMemo } from 'react';
import { ETFListItem } from '@/types/etf';
import { useETFData } from '@/hooks/useETFData';

export const useETFSearchData = () => {
  const { fetchETFs, isLoading } = useETFData();
  const [etfs, setEtfs] = useState<ETFListItem[]>([]);

  const maxTerFromData = useMemo(() => {
    if (etfs.length === 0) return 1;
    return Math.max(...etfs.map(etf => etf.ter_numeric || 0), 1);
  }, [etfs]);

  const categories = useMemo(() => 
    [...new Set(etfs.map(etf => etf.category).filter(Boolean))].sort(),
  [etfs]);

  // Load all ETFs without limit
  useEffect(() => {
    const loadETFs = async () => {
      console.log('Loading all ETFs for search section...');
      try {
        const data = await fetchETFs(); // Remove the limit parameter
        console.log('Successfully loaded', data.length, 'ETFs for search section');
        setEtfs(data);
        
        // Debug: Show sample of ticker data
        console.log('=== Ticker Data Sample (first 10 ETFs) ===');
        data.slice(0, 10).forEach((etf, index) => {
          console.log(`ETF ${index + 1}:`, {
            name: etf.name,
            isin: etf.isin,
            primary_ticker: etf.primary_ticker,
            exchange_1_ticker: etf.exchange_1_ticker,
            exchange_2_ticker: etf.exchange_2_ticker,
            exchange_3_ticker: etf.exchange_3_ticker,
            exchange_4_ticker: etf.exchange_4_ticker,
            exchange_5_ticker: etf.exchange_5_ticker,
          });
        });
        
        // Debug: Look for any ticker containing "SXR"
        console.log('=== ETFs with SXR in ticker ===');
        const sxrETFs = data.filter(etf => {
          const hasSXR = 
            (etf.primary_ticker && etf.primary_ticker.toLowerCase().includes('sxr')) ||
            (etf.exchange_1_ticker && etf.exchange_1_ticker.toLowerCase().includes('sxr')) ||
            (etf.exchange_2_ticker && etf.exchange_2_ticker.toLowerCase().includes('sxr')) ||
            (etf.exchange_3_ticker && etf.exchange_3_ticker.toLowerCase().includes('sxr')) ||
            (etf.exchange_4_ticker && etf.exchange_4_ticker.toLowerCase().includes('sxr')) ||
            (etf.exchange_5_ticker && etf.exchange_5_ticker.toLowerCase().includes('sxr'));
          return hasSXR;
        });
        console.log('Found', sxrETFs.length, 'ETFs with SXR in ticker');
        sxrETFs.forEach(etf => {
          console.log('SXR ETF:', {
            name: etf.name,
            isin: etf.isin,
            primary_ticker: etf.primary_ticker,
            exchange_1_ticker: etf.exchange_1_ticker,
            exchange_2_ticker: etf.exchange_2_ticker,
            exchange_3_ticker: etf.exchange_3_ticker,
            exchange_4_ticker: etf.exchange_4_ticker,
            exchange_5_ticker: etf.exchange_5_ticker,
          });
        });
        
      } catch (error) {
        console.error('Error loading ETFs for search section:', error);
      }
    };

    loadETFs();
  }, [fetchETFs]);

  return {
    etfs,
    categories,
    maxTerFromData,
    isLoading
  };
};
