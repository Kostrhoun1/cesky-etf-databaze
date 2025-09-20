-- Rozšíření databáze pro kratší performance období
-- Pro lepší týdenní reporty potřebujeme 1M a 3M data

-- Přidat nové sloupce pro kratší výkonnostní období
ALTER TABLE etf_funds 
ADD COLUMN IF NOT EXISTS return_1m DECIMAL(10,4),  -- 1 měsíc výkonnost
ADD COLUMN IF NOT EXISTS return_3m DECIMAL(10,4),  -- 3 měsíce výkonnost  
ADD COLUMN IF NOT EXISTS return_6m DECIMAL(10,4);  -- 6 měsíců výkonnost

-- Přidat sloupce pro roční výkonnost (pro historické srovnání)
ALTER TABLE etf_funds
ADD COLUMN IF NOT EXISTS return_2024 DECIMAL(10,4),  -- Výkonnost 2024
ADD COLUMN IF NOT EXISTS return_2023 DECIMAL(10,4),  -- Výkonnost 2023
ADD COLUMN IF NOT EXISTS return_2022 DECIMAL(10,4),  -- Výkonnost 2022
ADD COLUMN IF NOT EXISTS return_2021 DECIMAL(10,4);  -- Výkonnost 2021

-- Přidat sloupec pro inception výkonnost
ALTER TABLE etf_funds
ADD COLUMN IF NOT EXISTS return_inception DECIMAL(10,4);  -- Od založení (MAX)

-- Přidat indexy pro rychlejší dotazy na nová pole
CREATE INDEX IF NOT EXISTS idx_etf_funds_return_1m ON etf_funds(return_1m);
CREATE INDEX IF NOT EXISTS idx_etf_funds_return_3m ON etf_funds(return_3m);
CREATE INDEX IF NOT EXISTS idx_etf_funds_return_6m ON etf_funds(return_6m);

-- Přidat komentáře k novým sloupcům
COMMENT ON COLUMN etf_funds.return_1m IS 'Výkonnost za poslední 1 měsíc v procentech';
COMMENT ON COLUMN etf_funds.return_3m IS 'Výkonnost za poslední 3 měsíce v procentech';
COMMENT ON COLUMN etf_funds.return_6m IS 'Výkonnost za poslední 6 měsíců v procentech';
COMMENT ON COLUMN etf_funds.return_2024 IS 'Výkonnost za rok 2024 v procentech';
COMMENT ON COLUMN etf_funds.return_2023 IS 'Výkonnost za rok 2023 v procentech';
COMMENT ON COLUMN etf_funds.return_2022 IS 'Výkonnost za rok 2022 v procentech';
COMMENT ON COLUMN etf_funds.return_2021 IS 'Výkonnost za rok 2021 v procentech';
COMMENT ON COLUMN etf_funds.return_inception IS 'Výkonnost od založení fondu v procentech';

-- Přidat timestamp pro tracking změn výkonnostních dat
ALTER TABLE etf_funds
ADD COLUMN IF NOT EXISTS performance_last_updated TIMESTAMP DEFAULT NOW();

COMMENT ON COLUMN etf_funds.performance_last_updated IS 'Čas posledního update výkonnostních dat';

-- Vytvořit index pro performance tracking
CREATE INDEX IF NOT EXISTS idx_etf_funds_performance_updated ON etf_funds(performance_last_updated);

-- Ukázka dotazu pro týdenní reporty (TOP 10 fondů za poslední měsíc)
/*
SELECT name, primary_ticker, return_1m, return_3m, return_ytd, category, ter_numeric
FROM etf_funds 
WHERE return_1m IS NOT NULL 
  AND is_leveraged = false
  AND category = 'Akcie'
ORDER BY return_1m DESC 
LIMIT 10;
*/