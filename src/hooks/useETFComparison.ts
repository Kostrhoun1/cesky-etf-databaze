
import { useState, useCallback } from 'react';
import { ETFListItem, ETF } from '@/types/etf';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useETFComparison = () => {
  const [selectedETFs, setSelectedETFs] = useState<ETF[]>([]);
  const { toast } = useToast();

  const fetchFullETFData = async (isin: string): Promise<ETF | null> => {
    try {
      const { data, error } = await supabase
        .from('etf_funds')
        .select('*')
        .eq('isin', isin)
        .single();

      if (error) {
        console.error('Error fetching full ETF data:', error);
        return null;
      }

      return data as ETF;
    } catch (error) {
      console.error('Error fetching full ETF data:', error);
      return null;
    }
  };

  const addETFToComparison = useCallback(async (etf: ETFListItem) => {
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

    // Fetch full ETF data with all fields needed for comparison
    const fullETFData = await fetchFullETFData(etf.isin);
    if (!fullETFData) {
      toast({
        title: "Chyba",
        description: "Nepodařilo se načíst kompletní data fondu.",
        variant: "destructive",
      });
      return false;
    }

    setSelectedETFs(prev => [...prev, fullETFData]);
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
