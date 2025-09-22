-- Performance optimalizace pro ETF databázi
-- Řeší skutečné příčiny pomalého načítání

-- 1. ODSTRANIT DUPLICITNÍ RLS POLICIES
DROP POLICY IF EXISTS "Allow public read access to ETF funds" ON public.etf_funds;
DROP POLICY IF EXISTS "Allow public insert access to ETF funds" ON public.etf_funds;  
DROP POLICY IF EXISTS "Allow public update access to ETF funds" ON public.etf_funds;
DROP POLICY IF EXISTS "ETF funds are publicly readable" ON public.etf_funds;

-- Vytvořit jednu optimalizovanou policy
CREATE POLICY "etf_funds_public_access" 
ON public.etf_funds 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- 2. PŘIDAT COMPOSITE INDEXY PRO RYCHLÉ FILTROVÁNÍ
-- Index pro hlavní filtrování (kategorie + region)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_etf_funds_category_focus 
ON public.etf_funds(category, investment_focus) 
WHERE category IS NOT NULL AND investment_focus IS NOT NULL;

-- Index pro TER filtrování (velmi časté)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_etf_funds_ter_size 
ON public.etf_funds(ter_numeric, fund_size_numeric) 
WHERE ter_numeric > 0;

-- Index pro performance data (returns + volatility)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_etf_funds_performance 
ON public.etf_funds(return_1y, return_3y, volatility_1y) 
WHERE return_1y IS NOT NULL;

-- Index pro nová pole (currency_risk, strategy_risk)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_etf_funds_risk_parsed 
ON public.etf_funds(currency_risk, strategy_risk, parsed_asset_class, parsed_region) 
WHERE currency_risk IS NOT NULL;

-- 3. OPTIMALIZOVAT EXISTUJÍCÍ INDEXY
-- Zlepšit ISIN index (jedinečný pro upsert operace)
DROP INDEX IF EXISTS idx_etf_funds_isin;
CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS idx_etf_funds_isin_unique 
ON public.etf_funds(isin);

-- 4. PŘIDAT PARTIAL INDEXY PRO RYCHLÉ VYHLEDÁVÁNÍ
-- Index pouze pro úspěšně scrapovaná data
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_etf_funds_valid_data 
ON public.etf_funds(name, fund_provider, fund_domicile) 
WHERE scraping_status = 'success' AND name IS NOT NULL;

-- Index pro sorting podle velikosti fondu
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_etf_funds_size_desc 
ON public.etf_funds(fund_size_numeric DESC) 
WHERE fund_size_numeric > 0;

-- 5. STATISTIKY A MAINTENANCE
-- Aktualizovat table statistics pro lepší query planning
ANALYZE public.etf_funds;

-- 6. OPTIMALIZACE PRO WEB QUERIES
-- Index pro homepage (top ETFs by size)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_etf_funds_homepage 
ON public.etf_funds(fund_size_numeric DESC, ter_numeric, return_1y DESC) 
WHERE scraping_status = 'success' AND fund_size_numeric > 0;

-- Index pro comparison queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_etf_funds_comparison 
ON public.etf_funds(isin, name, ter_numeric, fund_size_numeric, return_1y, return_3y, volatility_1y) 
WHERE scraping_status = 'success';

-- Index pro search functionality  
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_etf_funds_search 
ON public.etf_funds USING gin(to_tsvector('english', name || ' ' || COALESCE(investment_focus, '') || ' ' || COALESCE(fund_provider, ''))) 
WHERE scraping_status = 'success';

-- 7. VACUUM A REINDEX PRO OPTIMÁLNÍ PERFORMANCE
-- Poznámka: Tyto příkazy spustit ručně při údržbě
-- VACUUM ANALYZE public.etf_funds;
-- REINDEX TABLE CONCURRENTLY public.etf_funds;

-- 8. MONITORING QUERY - pro sledování performance
-- SELECT schemaname, tablename, attname, n_distinct, correlation 
-- FROM pg_stats 
-- WHERE tablename = 'etf_funds' 
-- ORDER BY n_distinct DESC;