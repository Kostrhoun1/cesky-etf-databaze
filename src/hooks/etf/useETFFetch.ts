
import { useState, useCallback, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ETFListItem } from '@/types/etf';

export const useETFFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
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
        console.log('Fetching all ETFs with simple query...');
        
        const { data, error } = await supabase
          .from('etf_funds')
          .select(`
            isin,
            name,
            fund_provider,
            category,
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
            region,
            current_dividend_yield_numeric,
            exchange_1_ticker,
            exchange_2_ticker,
            exchange_3_ticker,
            exchange_4_ticker,
            exchange_5_ticker,
            updated_at
          `)
          .order('fund_size_numeric', { ascending: false });

        console.log('Supabase query completed. Error:', error, 'Data length:', data?.length);

        if (error) {
          console.error('Error fetching ETFs:', error);
          console.error('Error details:', error.message, error.details, error.hint);
          throw new Error(`Failed to fetch ETFs: ${error.message}`);
        }

        // Track the latest update date
        let latestUpdate: Date | null = null;
        if (data) {
          data.forEach(item => {
            if (item.updated_at) {
              const updateDate = new Date(item.updated_at);
              if (!latestUpdate || updateDate > latestUpdate) {
                latestUpdate = updateDate;
              }
            }
          });
        }

        setLastUpdated(latestUpdate);
        console.log('Successfully loaded', data?.length || 0, 'ETFs from database (all records)');
        console.log('Latest update date:', latestUpdate);
        return data || [];
      } else {
        // Original logic for when limit is specified
        let query = supabase
          .from('etf_funds')
          .select(`
            isin,
            name,
            fund_provider,
            category,
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
            region,
            current_dividend_yield_numeric,
            exchange_1_ticker,
            exchange_2_ticker,
            exchange_3_ticker,
            exchange_4_ticker,
            exchange_5_ticker,
            updated_at
          `)
          .order('fund_size_numeric', { ascending: false })
          .limit(limit);

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching ETFs:', error);
          throw new Error(`Failed to fetch ETFs: ${error.message}`);
        }

        // Track the latest update date
        let latestUpdate: Date | null = null;
        if (data) {
          data.forEach(item => {
            if (item.updated_at) {
              const updateDate = new Date(item.updated_at);
              if (!latestUpdate || updateDate > latestUpdate) {
                latestUpdate = updateDate;
              }
            }
          });
        }
        
        setLastUpdated(latestUpdate);
        console.log('Successfully loaded', data?.length || 0, 'ETFs from database');
        console.log('Latest update date:', latestUpdate);
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

  return { fetchETFs, isLoading, lastUpdated };
};
