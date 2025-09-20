
import { useState, useEffect } from 'react';
import { useETFData } from './useETFData';
import { ETFListItem } from '@/types/etf';

// Helper function to sort categories with "Ostatní" at the end
const sortCategories = (categories: string[]): string[] => {
  return categories.sort((a, b) => {
    if (a === 'Ostatní') return 1;  // Move "Ostatní" to end
    if (b === 'Ostatní') return -1; // Move "Ostatní" to end
    return a.localeCompare(b); // Regular alphabetical sort for others
  });
};

export const useETFSearchData = () => {
  const [etfs, setETFs] = useState<ETFListItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [maxTerFromData, setMaxTerFromData] = useState<number>(2);
  const [totalETFCount, setTotalETFCount] = useState<number>(0);
  const { fetchETFs, isLoading, lastUpdated, getETFCount } = useETFData();

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('🚀 Loading all ETF data...');
        
        // Načti všechny ETF najednou (bez dvoufázového načítání)
        const allETFs = await fetchETFs(); // bez limitu = všechny
        
        // Přidej ticker alias pro kompatibilitu
        const allETFsWithTicker = allETFs.map(etf => ({
          ...etf,
          ticker: etf.primary_ticker || etf.exchange_1_ticker || 'N/A'
        }));
        setETFs(allETFsWithTicker);
        
        // Spočítej celkový počet ETF
        const totalCount = await getETFCount();
        setTotalETFCount(totalCount);
        
        // Extract všechny kategorie
        const allCategories = Array.from(new Set(allETFsWithTicker.map(etf => etf.category).filter(Boolean)));
        setCategories(sortCategories(allCategories));
        
        // Calculate max TER ze všech dat
        const allTerValues = allETFsWithTicker.map(etf => etf.ter_numeric).filter(ter => ter && ter > 0);
        if (allTerValues.length > 0) {
          const maxTer = Math.max(...allTerValues);
          setMaxTerFromData(Math.ceil(maxTer * 100) / 100);
        }
        
        console.log(`✅ Loading complete: ${allETFs.length} ETFs loaded`);
        
      } catch (error) {
        console.error('Error loading ETF data:', error);
      }
    };

    loadData();
  }, [fetchETFs, getETFCount]);

  return {
    etfs,
    categories,
    maxTerFromData,
    totalETFCount, // Pro zobrazení celkového počtu
    isLoading,
    isLoadingComplete: !isLoading,
    lastUpdated
  };
};
