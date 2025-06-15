
import { useState, useCallback } from 'react';
import { ETFListItem } from '@/types/etf';
import { useToast } from '@/hooks/use-toast';

export const useETFComparison = () => {
  const [selectedETFs, setSelectedETFs] = useState<ETFListItem[]>([]);
  const { toast } = useToast();

  const addETFToComparison = useCallback((etf: ETFListItem) => {
    if (selectedETFs.length >= 3) {
      toast({
        title: "Maximum dosažen",
        description: "Můžete porovnat maximálně 3 ETF fondy současně.",
        variant: "destructive",
      });
      return false;
    }

    if (selectedETFs.some(selected => selected.isin === etf.isin)) {
      toast({
        title: "Fond již vybrán",
        description: "Tento fond je již v porovnání.",
        variant: "destructive",
      });
      return false;
    }

    setSelectedETFs(prev => [...prev, etf]);
    toast({
      title: "Fond přidán",
      description: `${etf.name} byl přidán do porovnání.`,
    });
    return true;
  }, [selectedETFs, toast]);

  const removeETFFromComparison = useCallback((isin: string) => {
    setSelectedETFs(prev => prev.filter(etf => etf.isin !== isin));
    toast({
      title: "Fond odebrán",
      description: "Fond byl odebrán z porovnání.",
    });
  }, [toast]);

  const clearComparison = useCallback(() => {
    setSelectedETFs([]);
    toast({
      title: "Porovnání vymazáno",
      description: "Všechny fondy byly odebrány z porovnání.",
    });
  }, [toast]);

  const isETFSelected = useCallback((isin: string) => {
    return selectedETFs.some(etf => etf.isin === isin);
  }, [selectedETFs]);

  return {
    selectedETFs,
    addETFToComparison,
    removeETFFromComparison,
    clearComparison,
    isETFSelected,
    canAddMore: selectedETFs.length < 3,
  };
};
