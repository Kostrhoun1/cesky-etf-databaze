-- 🚀 KOMPLETNÍ SQL SCRIPT PRO VŠECHNA CHYBĚJÍCÍ POLE
-- Spusť tento script v Supabase SQL editoru

-- 1. CHYBĚJÍCÍ POLE Z JUSTETF (pro 100% přesnou detekci hedging)
ALTER TABLE public.etf_funds 
ADD COLUMN IF NOT EXISTS currency_risk TEXT,
ADD COLUMN IF NOT EXISTS strategy_risk TEXT;

-- 2. PARSOVANÁ POLE Z INVESTMENT_FOCUS (pro lepší performance a filtrování)
ALTER TABLE public.etf_funds 
ADD COLUMN IF NOT EXISTS parsed_asset_class TEXT,
ADD COLUMN IF NOT EXISTS parsed_region TEXT,
ADD COLUMN IF NOT EXISTS parsed_sector TEXT,
ADD COLUMN IF NOT EXISTS parsed_market_cap TEXT,
ADD COLUMN IF NOT EXISTS parsed_investment_style TEXT;

-- 3. INDEXY PRO RYCHLÉ FILTROVÁNÍ
CREATE INDEX IF NOT EXISTS idx_etf_funds_currency_risk ON public.etf_funds(currency_risk);
CREATE INDEX IF NOT EXISTS idx_etf_funds_strategy_risk ON public.etf_funds(strategy_risk);
CREATE INDEX IF NOT EXISTS idx_etf_funds_parsed_asset_class ON public.etf_funds(parsed_asset_class);
CREATE INDEX IF NOT EXISTS idx_etf_funds_parsed_region ON public.etf_funds(parsed_region);
CREATE INDEX IF NOT EXISTS idx_etf_funds_parsed_sector ON public.etf_funds(parsed_sector);
CREATE INDEX IF NOT EXISTS idx_etf_funds_parsed_market_cap ON public.etf_funds(parsed_market_cap);
CREATE INDEX IF NOT EXISTS idx_etf_funds_parsed_investment_style ON public.etf_funds(parsed_investment_style);

-- 4. KOMENTÁŘE PRO DOKUMENTACI
COMMENT ON COLUMN public.etf_funds.currency_risk IS 'Currency hedging info from JustETF (Currency unhedged, EUR hedged, USD hedged, etc.)';
COMMENT ON COLUMN public.etf_funds.strategy_risk IS 'Strategy risk info from JustETF';
COMMENT ON COLUMN public.etf_funds.parsed_asset_class IS 'Parsed asset class from investment_focus (Akcie, Dluhopisy, Nemovitosti, etc.)';
COMMENT ON COLUMN public.etf_funds.parsed_region IS 'Parsed region from investment_focus (Evropa, Severní Amerika, Asie a Pacifik, etc.)';
COMMENT ON COLUMN public.etf_funds.parsed_sector IS 'Parsed sector from investment_focus (Technologie, Zdravotnictví, etc.)';
COMMENT ON COLUMN public.etf_funds.parsed_market_cap IS 'Parsed market cap from investment_focus (Large Cap, Mid Cap, Small Cap)';
COMMENT ON COLUMN public.etf_funds.parsed_investment_style IS 'Parsed investment style from investment_focus (Dividend, Growth, Value, ESG)';

-- 5. OVĚŘENÍ ZMĚN
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'etf_funds' 
  AND column_name IN (
    'currency_risk', 
    'strategy_risk', 
    'parsed_asset_class', 
    'parsed_region', 
    'parsed_sector', 
    'parsed_market_cap', 
    'parsed_investment_style'
  )
ORDER BY column_name;