
// Hlavní orchestrace ETL procesu — edge function
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { fetchEtfFunds, updateEtfFund } from "./services/etfService.ts";
import { fetchYahooFinanceData } from "./services/yahooFinanceService.ts";
import { getYahooSuffix, delay } from "./utils/helpers.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// @ts-ignore
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  let successCount = 0;
  let errorCount = 0;

  try {
    const etfs = await fetchEtfFunds();

    if (!etfs || etfs.length === 0) {
      return new Response(JSON.stringify({ message: 'No ETFs with tickers found' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    for (const etf of etfs) {
      try {
        const tickerPairs = [
          { ticker: etf.primary_ticker, exchange: etf.primary_exchange },
          { ticker: etf.exchange_1_ticker, exchange: etf.exchange_1_name },
          { ticker: etf.exchange_2_ticker, exchange: etf.exchange_2_name },
          { ticker: etf.exchange_3_ticker, exchange: etf.exchange_3_name },
          { ticker: etf.exchange_4_ticker, exchange: etf.exchange_4_name },
          { ticker: etf.exchange_5_ticker, exchange: etf.exchange_5_name },
        ].filter(pair => pair.ticker && pair.ticker.trim() !== '');

        let priceData = null;

        for (const { ticker, exchange } of tickerPairs) {
          const suffix = getYahooSuffix(exchange);

          // Nejprve zkusíme ticker+suffix
          if (suffix) {
            const tickerWithSuffix = `${ticker}${suffix}`;
            priceData = await fetchYahooFinanceData(tickerWithSuffix);
            if (priceData && priceData.currentPrice) break;
            await delay(100);
          }
          // Pak čistý ticker bez suffixu
          priceData = await fetchYahooFinanceData(ticker);
          if (priceData && priceData.currentPrice) break;
          await delay(100);
        }

        if (priceData && priceData.currentPrice) {
          await updateEtfFund(etf.id, priceData);
          successCount++;
        } else {
          errorCount++;
        }

        await delay(200);
      } catch {
        errorCount++;
      }
    }

    const result = {
      message: 'ETF price fetch completed',
      processed: etfs.length,
      successful: successCount,
      errors: errorCount,
      timestamp: new Date().toISOString(),
    };
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
