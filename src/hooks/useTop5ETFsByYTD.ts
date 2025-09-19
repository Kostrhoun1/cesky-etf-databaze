import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TopETFItem {
  isin: string;
  name: string;
  primary_ticker: string;
  return_ytd: number;
  ter_numeric: number;
  fund_provider: string;
  category: string;
  fund_size_numeric: number;
}

export const useTop5ETFsByYTD = () => {
  const [topETFs, setTopETFs] = useState<TopETFItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTop5ETFs = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching top 5 stock ETFs by YTD performance...');
        
        const { data, error } = await supabase
          .from('etf_funds')
          .select(`
            isin,
            name,
            primary_ticker,
            return_ytd,
            ter_numeric,
            fund_provider,
            category,
            fund_size_numeric,
            is_leveraged
          `)
          // Filter out leveraged ETFs and ensure we have YTD data
          .eq('is_leveraged', false)
          .not('return_ytd', 'is', null)
          // Filter for stock/equity ETFs (exclude bonds, commodities, etc.)
          .not('category', 'like', '%Bond%')
          .not('category', 'like', '%Dluh%')
          .not('category', 'like', '%Komod%')
          .not('category', 'like', '%Nemov%')
          .not('category', 'like', '%REIT%')
          // Ensure reasonable fund size (at least 10M EUR)
          .gte('fund_size_numeric', 10)
          // Order by YTD performance (highest first)
          .order('return_ytd', { ascending: false })
          .limit(5);

        if (error) {
          throw new Error(`Database error: ${error.message}`);
        }

        if (data) {
          console.log('Found top 5 ETFs by YTD:', data);
          setTopETFs(data);
        }

      } catch (err) {
        console.error('Error fetching top ETFs:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTop5ETFs();
  }, []);

  return { topETFs, isLoading, error };
};