
-- Add new columns for dividend information and region
ALTER TABLE public.etf_funds 
ADD COLUMN region TEXT,
ADD COLUMN current_dividend_yield TEXT,
ADD COLUMN current_dividend_yield_numeric NUMERIC DEFAULT 0,
ADD COLUMN dividends_12m TEXT,
ADD COLUMN dividends_12m_numeric NUMERIC DEFAULT 0,
ADD COLUMN dividends_12m_currency TEXT,
ADD COLUMN dividend_extraction_method TEXT;
