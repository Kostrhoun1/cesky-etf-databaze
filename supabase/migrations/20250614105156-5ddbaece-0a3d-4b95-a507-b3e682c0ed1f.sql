
-- Create ETF funds table
CREATE TABLE public.etf_funds (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  isin TEXT NOT NULL UNIQUE,
  name TEXT,
  url TEXT,
  description_en TEXT,
  description_cs TEXT,
  ter TEXT,
  ter_numeric NUMERIC DEFAULT 0,
  fund_size TEXT,
  fund_size_numeric NUMERIC DEFAULT 0,
  fund_size_currency TEXT,
  fund_currency TEXT,
  fund_domicile TEXT,
  fund_provider TEXT,
  inception_date TEXT,
  distribution_policy TEXT,
  distribution_frequency TEXT,
  replication TEXT,
  legal_structure TEXT,
  index_name TEXT,
  investment_focus TEXT,
  sustainability TEXT,
  category TEXT,
  total_holdings INTEGER DEFAULT 0,
  return_1y NUMERIC DEFAULT 0,
  return_3y NUMERIC DEFAULT 0,
  return_5y NUMERIC DEFAULT 0,
  return_ytd NUMERIC DEFAULT 0,
  volatility_1y NUMERIC DEFAULT 0,
  volatility_3y NUMERIC DEFAULT 0,
  volatility_5y NUMERIC DEFAULT 0,
  return_per_risk_1y NUMERIC DEFAULT 0,
  return_per_risk_3y NUMERIC DEFAULT 0,
  return_per_risk_5y NUMERIC DEFAULT 0,
  max_drawdown_1y NUMERIC DEFAULT 0,
  max_drawdown_3y NUMERIC DEFAULT 0,
  max_drawdown_5y NUMERIC DEFAULT 0,
  max_drawdown_inception NUMERIC DEFAULT 0,
  beta NUMERIC DEFAULT 0,
  correlation NUMERIC DEFAULT 0,
  tracking_error NUMERIC DEFAULT 0,
  information_ratio NUMERIC DEFAULT 0,
  primary_exchange TEXT,
  primary_ticker TEXT,
  total_exchanges INTEGER DEFAULT 0,
  scraping_date TEXT,
  scraping_status TEXT,
  retry_count INTEGER DEFAULT 0,
  
  -- Holdings (top 10)
  holding_1_name TEXT,
  holding_1_weight NUMERIC DEFAULT 0,
  holding_2_name TEXT,
  holding_2_weight NUMERIC DEFAULT 0,
  holding_3_name TEXT,
  holding_3_weight NUMERIC DEFAULT 0,
  holding_4_name TEXT,
  holding_4_weight NUMERIC DEFAULT 0,
  holding_5_name TEXT,
  holding_5_weight NUMERIC DEFAULT 0,
  holding_6_name TEXT,
  holding_6_weight NUMERIC DEFAULT 0,
  holding_7_name TEXT,
  holding_7_weight NUMERIC DEFAULT 0,
  holding_8_name TEXT,
  holding_8_weight NUMERIC DEFAULT 0,
  holding_9_name TEXT,
  holding_9_weight NUMERIC DEFAULT 0,
  holding_10_name TEXT,
  holding_10_weight NUMERIC DEFAULT 0,
  
  -- Countries (top 5)
  country_1_name TEXT,
  country_1_weight NUMERIC DEFAULT 0,
  country_2_name TEXT,
  country_2_weight NUMERIC DEFAULT 0,
  country_3_name TEXT,
  country_3_weight NUMERIC DEFAULT 0,
  country_4_name TEXT,
  country_4_weight NUMERIC DEFAULT 0,
  country_5_name TEXT,
  country_5_weight NUMERIC DEFAULT 0,
  
  -- Sectors (top 5)
  sector_1_name TEXT,
  sector_1_weight NUMERIC DEFAULT 0,
  sector_2_name TEXT,
  sector_2_weight NUMERIC DEFAULT 0,
  sector_3_name TEXT,
  sector_3_weight NUMERIC DEFAULT 0,
  sector_4_name TEXT,
  sector_4_weight NUMERIC DEFAULT 0,
  sector_5_name TEXT,
  sector_5_weight NUMERIC DEFAULT 0,
  
  -- Exchanges (up to 5)
  exchange_1_name TEXT,
  exchange_1_currency TEXT,
  exchange_1_ticker TEXT,
  exchange_1_bloomberg TEXT,
  exchange_1_reuters TEXT,
  exchange_1_market_maker TEXT,
  exchange_2_name TEXT,
  exchange_2_currency TEXT,
  exchange_2_ticker TEXT,
  exchange_2_bloomberg TEXT,
  exchange_2_reuters TEXT,
  exchange_2_market_maker TEXT,
  exchange_3_name TEXT,
  exchange_3_currency TEXT,
  exchange_3_ticker TEXT,
  exchange_3_bloomberg TEXT,
  exchange_3_reuters TEXT,
  exchange_3_market_maker TEXT,
  exchange_4_name TEXT,
  exchange_4_currency TEXT,
  exchange_4_ticker TEXT,
  exchange_4_bloomberg TEXT,
  exchange_4_reuters TEXT,
  exchange_4_market_maker TEXT,
  exchange_5_name TEXT,
  exchange_5_currency TEXT,
  exchange_5_ticker TEXT,
  exchange_5_bloomberg TEXT,
  exchange_5_reuters TEXT,
  exchange_5_market_maker TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index on ISIN for faster lookups
CREATE INDEX idx_etf_funds_isin ON public.etf_funds(isin);

-- Create trigger to automatically update updated_at timestamp
CREATE TRIGGER update_etf_funds_updated_at
  BEFORE UPDATE ON public.etf_funds
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column_etf_funds();

-- Enable Row Level Security (make data public for now since no user authentication is mentioned)
ALTER TABLE public.etf_funds ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access to ETF funds" 
  ON public.etf_funds 
  FOR SELECT 
  USING (true);

-- Create policy to allow public insert/update access (you may want to restrict this later)
CREATE POLICY "Allow public insert access to ETF funds" 
  ON public.etf_funds 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public update access to ETF funds" 
  ON public.etf_funds 
  FOR UPDATE 
  USING (true);
