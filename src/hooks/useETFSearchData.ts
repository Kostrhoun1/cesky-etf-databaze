
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
  const [isLoadingComplete, setIsLoadingComplete] = useState<boolean>(false);
  const { fetchETFs, isLoading, lastUpdated, getETFCount } = useETFData();

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('🚀 Starting two-phase ETF loading...');
        
        // FÁZE 1: Rychle načti top 100 největších ETF pro okamžité zobrazení
        console.log('📊 Phase 1: Loading top 100 ETFs...');
        const topETFs = await fetchETFs(100);
        
        // Přidej ticker alias pro kompatibilitu
        const topETFsWithTicker = topETFs.map(etf => ({
          ...etf,
          ticker: etf.primary_ticker || etf.exchange_1_ticker || 'N/A'
        }));
        setETFs(topETFsWithTicker);
        
        // Rychle spočítej celkový počet ETF pro zobrazení
        const totalCount = await getETFCount();
        setTotalETFCount(totalCount);
        
        // Extract categories z top ETF (alespoň něco)
        const initialCategories = Array.from(new Set(topETFsWithTicker.map(etf => etf.category).filter(Boolean)));
        setCategories(sortCategories(initialCategories));
        
        // Calculate max TER z top ETF
        const initialTerValues = topETFsWithTicker.map(etf => etf.ter_numeric).filter(ter => ter && ter > 0);
        if (initialTerValues.length > 0) {
          const maxTer = Math.max(...initialTerValues);
          setMaxTerFromData(Math.ceil(maxTer * 100) / 100);
        }
        
        console.log(`✅ Phase 1 complete: ${topETFs.length} ETFs loaded, total in DB: ${totalCount}`);
        
        // FÁZE 2: V pozadí načti všechny ETF pro kompletní filtrování
        console.log('🔄 Phase 2: Loading all ETFs in background...');
        const allETFs = await fetchETFs(); // bez limitu = všechny
        
        // Přidej ticker alias pro kompatibilitu
        const allETFsWithTicker = allETFs.map(etf => ({
          ...etf,
          ticker: etf.primary_ticker || etf.exchange_1_ticker || 'N/A'
        }));
        setETFs(allETFsWithTicker);
        setIsLoadingComplete(true);
        
        // Aktualizuj kategorie a max TER ze všech dat
        const allCategories = Array.from(new Set(allETFsWithTicker.map(etf => etf.category).filter(Boolean)));
        setCategories(sortCategories(allCategories));
        
        const allTerValues = allETFsWithTicker.map(etf => etf.ter_numeric).filter(ter => ter && ter > 0);
        if (allTerValues.length > 0) {
          const maxTer = Math.max(...allTerValues);
          setMaxTerFromData(Math.ceil(maxTer * 100) / 100);
        }
        
        console.log(`🎉 Phase 2 complete: ${allETFs.length} ETFs total loaded`);
        
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
    isLoadingComplete, // True když jsou načtená všechna data
    lastUpdated
  };
};
