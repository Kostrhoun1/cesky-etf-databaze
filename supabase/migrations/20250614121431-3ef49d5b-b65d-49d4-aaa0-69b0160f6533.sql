
-- Vymazání dat ve sloupci description_cs pro všechny ETF fondy
UPDATE public.etf_funds 
SET description_cs = NULL;
