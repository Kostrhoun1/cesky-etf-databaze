
// Služba pro práci s etfy v databázi Supabase
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

interface EtfFund {
  id: string;
  isin: string;
  name: string;
  primary_ticker: string | null;
  exchange_1_ticker: string | null;
  exchange_2_ticker: string | null;
  exchange_3_ticker: string | null;
  exchange_4_ticker: string | null;
  exchange_5_ticker: string | null;
  primary_exchange: string | null;
  exchange_1_name: string | null;
  exchange_2_name: string | null;
  exchange_3_name: string | null;
  exchange_4_name: string | null;
  exchange_5_name: string | null;
}

function getSupabaseClient() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  return createClient(supabaseUrl, supabaseKey);
}

async function fetchEtfFunds(): Promise<EtfFund[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('etf_funds')
    .select(
      'id, isin, name, primary_ticker, exchange_1_ticker, exchange_2_ticker, exchange_3_ticker, exchange_4_ticker, exchange_5_ticker, primary_exchange, exchange_1_name, exchange_2_name, exchange_3_name, exchange_4_name, exchange_5_name'
    )
    .not('primary_ticker', 'is', null)
    .limit(50);

  if (error) throw new Error(error.message);
  return data || [];
}

async function updateEtfFund(
  etfId: string,
  priceData: {
    currentPrice: number;
    ytdReturnPercent?: number;
    return1yPercent?: number;
    return3yPercent?: number;
    return5yPercent?: number;
    return10yPercent?: number;
  }
) {
  const supabase = getSupabaseClient();

  await supabase
    .from('etf_funds')
    .update({
      current_price: priceData.currentPrice,
      ytd_return_percent: priceData.ytdReturnPercent || 0,
      return_1y_percent: priceData.return1yPercent || 0,
      return_3y_percent: priceData.return3yPercent || 0,
      return_5y_percent: priceData.return5yPercent || 0,
      return_10y_percent: priceData.return10yPercent || 0,
      last_price_update: new Date().toISOString(),
    })
    .eq('id', etfId);
}

export { fetchEtfFunds, updateEtfFund };
