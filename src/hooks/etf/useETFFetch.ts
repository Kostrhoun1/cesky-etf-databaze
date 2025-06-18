
import { useState, useCallback, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ETFListItem } from '@/types/etf';

export const useETFFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const loadingRef = useRef(false);

  const fetchETFs = useCallback(async (limit?: number): Promise<ETFListItem[]> => {
    // Prevent duplicate calls
    if (loadingRef.current) {
      console.log('fetchETFs already in progress, skipping...');
      return [];
    }

    loadingRef.current = true;
    setIsLoading(true);
    
    try {
      console.log('Starting to fetch ETFs from database...');

      // If no limit specified, fetch all records in batches to avoid Supabase limits
      if (!limit) {
        console.log('Fetching all ETFs without limit...');
        let allData: any[] = [];
        let hasMore = true;
        let offset = 0;
        const batchSize = 1000;

        while (hasMore) {
          const { data, error } = await supabase
            .from('etf_funds')
            .select(`
              isin,
              name,
              fund_provider,
              category,
              region,
              ter_numeric,
              return_1y,
              return_3y,
              return_5y,
              return_ytd,
              fund_size_numeric,
              degiro_free,
              primary_ticker,
              distribution_policy,
              index_name,
              fund_currency,
              replication,
              current_dividend_yield_numeric,
              dividends_12m_numeric,
              dividends_12m_currency,
              exchange_1_ticker,
              exchange_2_ticker,
              exchange_3_ticker,
              exchange_4_ticker,
              exchange_5_ticker
            `)
            .order('fund_size_numeric', { ascending: false })
            .range(offset, offset + batchSize - 1);

          if (error) {
            console.error('Error fetching ETFs batch:', error);
            throw new Error(`Failed to fetch ETFs: ${error.message}`);
          }

          if (data && data.length > 0) {
            allData = [...allData, ...data];
            offset += batchSize;
            console.log(`Loaded batch: ${data.length} ETFs, total so far: ${allData.length}`);
            
            // If we got less than batchSize, we've reached the end
            if (data.length < batchSize) {
              hasMore = false;
            }
          } else {
            hasMore = false;
          }
        }

        console.log('Successfully loaded', allData.length, 'ETFs from database (all records)');
        return allData || [];
      } else {
        // Original logic for when limit is specified
        let query = supabase
          .from('etf_funds')
          .select(`
            isin,
            name,
            fund_provider,
            category,
            region,
            ter_numeric,
            return_1y,
            return_3y,
            return_5y,
            return_ytd,
            fund_size_numeric,
            degiro_free,
            primary_ticker,
            distribution_policy,
            index_name,
            fund_currency,
            replication,
            current_dividend_yield_numeric,
            dividends_12m_numeric,
            dividends_12m_currency,
            exchange_1_ticker,
            exchange_2_ticker,
            exchange_3_ticker,
            exchange_4_ticker,
            exchange_5_ticker
          `)
          .order('fund_size_numeric', { ascending: false })
          .limit(limit);

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching ETFs:', error);
          throw new Error(`Failed to fetch ETFs: ${error.message}`);
        }

        console.log('Successfully loaded', data?.length || 0, 'ETFs from database');
        return data || [];
      }
    } catch (error) {
      console.error('Error in fetchETFs:', error);
      toast({
        title: "Chyba při načítání",
        description: error instanceof Error ? error.message : "Nepodařilo se načíst data z databáze.",
        variant: "destructive",
      });
      return [];
    } finally {
      setIsLoading(false);
      loadingRef.current = false;
    }
  }, [toast]);

  return { fetchETFs, isLoading };
};
