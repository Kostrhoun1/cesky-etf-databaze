-- Rozšíření databáze pro kompletní exchange listings
-- Podporuje až 10 burz místo současných 5

-- Přidat sloupce pro exchanges 6-10
ALTER TABLE public.etf_funds 
ADD COLUMN IF NOT EXISTS exchange_6_name TEXT,
ADD COLUMN IF NOT EXISTS exchange_6_currency TEXT,
ADD COLUMN IF NOT EXISTS exchange_6_ticker TEXT,
ADD COLUMN IF NOT EXISTS exchange_6_bloomberg TEXT,
ADD COLUMN IF NOT EXISTS exchange_6_reuters TEXT,
ADD COLUMN IF NOT EXISTS exchange_6_market_maker TEXT,

ADD COLUMN IF NOT EXISTS exchange_7_name TEXT,
ADD COLUMN IF NOT EXISTS exchange_7_currency TEXT,
ADD COLUMN IF NOT EXISTS exchange_7_ticker TEXT,
ADD COLUMN IF NOT EXISTS exchange_7_bloomberg TEXT,
ADD COLUMN IF NOT EXISTS exchange_7_reuters TEXT,
ADD COLUMN IF NOT EXISTS exchange_7_market_maker TEXT,

ADD COLUMN IF NOT EXISTS exchange_8_name TEXT,
ADD COLUMN IF NOT EXISTS exchange_8_currency TEXT,
ADD COLUMN IF NOT EXISTS exchange_8_ticker TEXT,
ADD COLUMN IF NOT EXISTS exchange_8_bloomberg TEXT,
ADD COLUMN IF NOT EXISTS exchange_8_reuters TEXT,
ADD COLUMN IF NOT EXISTS exchange_8_market_maker TEXT,

ADD COLUMN IF NOT EXISTS exchange_9_name TEXT,
ADD COLUMN IF NOT EXISTS exchange_9_currency TEXT,
ADD COLUMN IF NOT EXISTS exchange_9_ticker TEXT,
ADD COLUMN IF NOT EXISTS exchange_9_bloomberg TEXT,
ADD COLUMN IF NOT EXISTS exchange_9_reuters TEXT,
ADD COLUMN IF NOT EXISTS exchange_9_market_maker TEXT,

ADD COLUMN IF NOT EXISTS exchange_10_name TEXT,
ADD COLUMN IF NOT EXISTS exchange_10_currency TEXT,
ADD COLUMN IF NOT EXISTS exchange_10_ticker TEXT,
ADD COLUMN IF NOT EXISTS exchange_10_bloomberg TEXT,
ADD COLUMN IF NOT EXISTS exchange_10_reuters TEXT,
ADD COLUMN IF NOT EXISTS exchange_10_market_maker TEXT;

-- Přidat index pro rychlé vyhledávání ve všech ticker polích
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_etf_funds_all_tickers 
ON public.etf_funds USING gin((
  COALESCE(primary_ticker, '') || ' ' ||
  COALESCE(exchange_1_ticker, '') || ' ' ||
  COALESCE(exchange_2_ticker, '') || ' ' ||
  COALESCE(exchange_3_ticker, '') || ' ' ||
  COALESCE(exchange_4_ticker, '') || ' ' ||
  COALESCE(exchange_5_ticker, '') || ' ' ||
  COALESCE(exchange_6_ticker, '') || ' ' ||
  COALESCE(exchange_7_ticker, '') || ' ' ||
  COALESCE(exchange_8_ticker, '') || ' ' ||
  COALESCE(exchange_9_ticker, '') || ' ' ||
  COALESCE(exchange_10_ticker, '')
) gin_trgm_ops);

-- Komentář pro dokumentaci
COMMENT ON TABLE public.etf_funds IS 'ETF funds with extended exchange listings support (up to 10 exchanges)';
COMMENT ON COLUMN public.etf_funds.exchange_6_name IS 'Exchange 6 name (additional listing)';
COMMENT ON COLUMN public.etf_funds.exchange_7_name IS 'Exchange 7 name (additional listing)';
COMMENT ON COLUMN public.etf_funds.exchange_8_name IS 'Exchange 8 name (additional listing)';
COMMENT ON COLUMN public.etf_funds.exchange_9_name IS 'Exchange 9 name (additional listing)';
COMMENT ON COLUMN public.etf_funds.exchange_10_name IS 'Exchange 10 name (additional listing)';