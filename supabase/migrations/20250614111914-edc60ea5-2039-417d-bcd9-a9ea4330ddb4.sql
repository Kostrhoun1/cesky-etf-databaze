
-- Přidání nových sloupců pro aktuální ceny a výnosy
ALTER TABLE public.etf_funds 
ADD COLUMN current_price NUMERIC DEFAULT 0,
ADD COLUMN ytd_return_percent NUMERIC DEFAULT 0,
ADD COLUMN return_1y_percent NUMERIC DEFAULT 0,
ADD COLUMN return_3y_percent NUMERIC DEFAULT 0,
ADD COLUMN return_5y_percent NUMERIC DEFAULT 0,
ADD COLUMN return_10y_percent NUMERIC DEFAULT 0,
ADD COLUMN last_price_update TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- Vytvoření indexu pro rychlejší vyhledávání podle tickerů
CREATE INDEX IF NOT EXISTS idx_etf_funds_primary_ticker ON public.etf_funds(primary_ticker);
CREATE INDEX IF NOT EXISTS idx_etf_funds_exchange_tickers ON public.etf_funds(exchange_1_ticker, exchange_2_ticker, exchange_3_ticker);

-- Povolení pg_cron rozšíření pro naplánované úlohy (pokud ještě není povoleno)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Povolení pg_net rozšíření pro HTTP požadavky (pokud ještě není povoleno)  
CREATE EXTENSION IF NOT EXISTS pg_net;
