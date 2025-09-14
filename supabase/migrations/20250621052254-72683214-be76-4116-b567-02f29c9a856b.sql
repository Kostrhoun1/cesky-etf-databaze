
-- Nejdříve zkontrolujeme a opravíme RLS politiky pro app_admins tabulku
-- Zakážeme RLS na app_admins tabulce, protože způsobuje nekonečnou rekurzi
ALTER TABLE public.app_admins DISABLE ROW LEVEL SECURITY;

-- Odstraníme všechny existující politiky z etf_funds tabulky
DROP POLICY IF EXISTS "etf_funds_public_select" ON public.etf_funds;
DROP POLICY IF EXISTS "etf_funds_authenticated_all" ON public.etf_funds;

-- Vytvoříme jednoduché politiky pro etf_funds bez závislosti na auth
CREATE POLICY "allow_public_read_etf_funds" 
  ON public.etf_funds 
  FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "allow_public_insert_etf_funds" 
  ON public.etf_funds 
  FOR INSERT 
  TO public 
  WITH CHECK (true);

CREATE POLICY "allow_public_update_etf_funds" 
  ON public.etf_funds 
  FOR UPDATE 
  TO public 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY "allow_public_delete_etf_funds" 
  ON public.etf_funds 
  FOR DELETE 
  TO public 
  USING (true);

-- Ujistíme se, že RLS je povolena na etf_funds
ALTER TABLE public.etf_funds ENABLE ROW LEVEL SECURITY;
