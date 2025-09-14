
import { useState, useEffect } from 'react';
import { useETFData } from './useETFData';
import { ETFListItem } from '@/types/etf';

export const useETFSearchData = () => {
  const [etfs, setETFs] = useState<ETFListItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [maxTerFromData, setMaxTerFromData] = useState<number>(2);
  const { fetchETFs, isLoading, lastUpdated } = useETFData();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchETFs();
        setETFs(data);
        
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.map(etf => etf.category).filter(Boolean)));
        setCategories(uniqueCategories);
        
        // Calculate max TER from data
        const terValues = data.map(etf => etf.ter_numeric).filter(ter => ter && ter > 0);
        const maxTer = Math.max(...terValues);
        setMaxTerFromData(Math.ceil(maxTer * 100) / 100); // Round up to 2 decimal places
      } catch (error) {
        console.error('Error loading ETF data:', error);
      }
    };

    loadData();
  }, [fetchETFs]);

  return {
    etfs,
    categories,
    maxTerFromData,
    isLoading,
    lastUpdated
  };
};
