-- Remove all RLS policies from etf_funds table 
DROP POLICY IF EXISTS "Only admins can insert ETF funds" ON public.etf_funds;
DROP POLICY IF EXISTS "Only admins can update ETF funds" ON public.etf_funds;
DROP POLICY IF EXISTS "allow_public_read_etf_funds" ON public.etf_funds;
DROP POLICY IF EXISTS "allow_public_insert_etf_funds" ON public.etf_funds;
DROP POLICY IF EXISTS "allow_public_update_etf_funds" ON public.etf_funds;
DROP POLICY IF EXISTS "allow_public_delete_etf_funds" ON public.etf_funds;

-- Ensure RLS is disabled
ALTER TABLE public.etf_funds DISABLE ROW LEVEL SECURITY;