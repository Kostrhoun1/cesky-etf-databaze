
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface YahooFinanceResponse {
  chart: {
    result: Array<{
      meta: {
        regularMarketPrice: number;
        previousClose: number;
        fiftyTwoWeekHigh: number;
        fiftyTwoWeekLow: number;
      };
      timestamp: number[];
      indicators: {
        quote: Array<{
          close: number[];
        }>;
      };
    }>;
  };
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchYahooFinanceData(ticker: string): Promise<any> {
  try {
    // Yahoo Finance API endpoint
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?range=5y&interval=1mo`;
    
    console.log(`Fetching data for ticker: ${ticker}`);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      console.error(`HTTP error for ${ticker}: ${response.status}`);
      return null;
    }

    const data: YahooFinanceResponse = await response.json();
    
    if (!data.chart?.result?.[0]) {
      console.error(`No data found for ticker: ${ticker}`);
      return null;
    }

    const result = data.chart.result[0];
    const currentPrice = result.meta.regularMarketPrice;
    const previousClose = result.meta.previousClose;
    
    // Get historical prices for return calculations
    const timestamps = result.timestamp;
    const closePrices = result.indicators.quote[0].close;
    
    if (!timestamps || !closePrices || closePrices.length === 0) {
      console.error(`No historical data for ticker: ${ticker}`);
      return { currentPrice, previousClose };
    }

    // Calculate returns
    const now = new Date();
    const currentYear = now.getFullYear();
    const startOfYear = new Date(currentYear, 0, 1).getTime() / 1000;
    
    // Find prices for different periods
    let ytdPrice = null;
    let oneYearPrice = null;
    let threeYearPrice = null;
    let fiveYearPrice = null;
    let tenYearPrice = null;

    const oneYearAgo = now.getTime() / 1000 - (365 * 24 * 60 * 60);
    const threeYearsAgo = now.getTime() / 1000 - (3 * 365 * 24 * 60 * 60);
    const fiveYearsAgo = now.getTime() / 1000 - (5 * 365 * 24 * 60 * 60);
    const tenYearsAgo = now.getTime() / 1000 - (10 * 365 * 24 * 60 * 60);

    for (let i = 0; i < timestamps.length; i++) {
      const timestamp = timestamps[i];
      const price = closePrices[i];
      
      if (!price) continue;

      // YTD
      if (!ytdPrice && timestamp >= startOfYear) {
        ytdPrice = price;
      }
      
      // 1 year
      if (!oneYearPrice && timestamp >= oneYearAgo) {
        oneYearPrice = price;
      }
      
      // 3 years
      if (!threeYearPrice && timestamp >= threeYearsAgo) {
        threeYearPrice = price;
      }
      
      // 5 years
      if (!fiveYearPrice && timestamp >= fiveYearsAgo) {
        fiveYearPrice = price;
      }
      
      // 10 years
      if (!tenYearPrice && timestamp >= tenYearsAgo) {
        tenYearPrice = price;
      }
    }

    // Calculate percentage returns
    const calculateReturn = (currentPrice: number, oldPrice: number | null): number => {
      if (!oldPrice || oldPrice === 0) return 0;
      return ((currentPrice - oldPrice) / oldPrice) * 100;
    };

    const returns = {
      currentPrice,
      previousClose,
      ytdReturnPercent: calculateReturn(currentPrice, ytdPrice),
      return1yPercent: calculateReturn(currentPrice, oneYearPrice),
      return3yPercent: calculateReturn(currentPrice, threeYearPrice),
      return5yPercent: calculateReturn(currentPrice, fiveYearPrice),
      return10yPercent: calculateReturn(currentPrice, tenYearPrice),
    };

    console.log(`Successfully processed ${ticker}:`, returns);
    return returns;

  } catch (error) {
    console.error(`Error fetching data for ${ticker}:`, error);
    return null;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Starting ETF price fetch process...');

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch ETFs that have tickers
    console.log('Fetching ETFs with tickers from database...');
    const { data: etfs, error: fetchError } = await supabase
      .from('etf_funds')
      .select('id, isin, name, primary_ticker, exchange_1_ticker, exchange_2_ticker, exchange_3_ticker, exchange_4_ticker, exchange_5_ticker')
      .not('primary_ticker', 'is', null)
      .limit(50); // Process in batches to avoid timeouts

    if (fetchError) {
      console.error('Error fetching ETFs:', fetchError);
      return new Response(JSON.stringify({ error: 'Failed to fetch ETFs' }), { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    if (!etfs || etfs.length === 0) {
      console.log('No ETFs with tickers found');
      return new Response(JSON.stringify({ message: 'No ETFs with tickers found' }), { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    console.log(`Found ${etfs.length} ETFs with tickers`);

    let successCount = 0;
    let errorCount = 0;

    // Process each ETF
    for (const etf of etfs) {
      try {
        // Try primary ticker first, then fallback to exchange tickers
        const tickers = [
          etf.primary_ticker,
          etf.exchange_1_ticker,
          etf.exchange_2_ticker,
          etf.exchange_3_ticker,
          etf.exchange_4_ticker,
          etf.exchange_5_ticker
        ].filter(ticker => ticker && ticker.trim() !== '');

        let priceData = null;
        
        for (const ticker of tickers) {
          priceData = await fetchYahooFinanceData(ticker);
          if (priceData && priceData.currentPrice) {
            console.log(`Successfully fetched data for ${etf.name} using ticker ${ticker}`);
            break;
          }
          // Add small delay between requests to avoid rate limiting
          await delay(100);
        }

        if (priceData && priceData.currentPrice) {
          // Update the database
          const { error: updateError } = await supabase
            .from('etf_funds')
            .update({
              current_price: priceData.currentPrice,
              ytd_return_percent: priceData.ytdReturnPercent || 0,
              return_1y_percent: priceData.return1yPercent || 0,
              return_3y_percent: priceData.return3yPercent || 0,
              return_5y_percent: priceData.return5yPercent || 0,
              return_10y_percent: priceData.return10yPercent || 0,
              last_price_update: new Date().toISOString()
            })
            .eq('id', etf.id);

          if (updateError) {
            console.error(`Error updating ETF ${etf.name}:`, updateError);
            errorCount++;
          } else {
            successCount++;
          }
        } else {
          console.log(`No price data found for ${etf.name} with any available ticker`);
          errorCount++;
        }

        // Add delay between ETF processing to avoid overwhelming the API
        await delay(200);

      } catch (error) {
        console.error(`Error processing ETF ${etf.name}:`, error);
        errorCount++;
      }
    }

    const result = {
      message: 'ETF price fetch completed',
      processed: etfs.length,
      successful: successCount,
      errors: errorCount,
      timestamp: new Date().toISOString()
    };

    console.log('Price fetch summary:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in fetch-etf-prices function:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
})
