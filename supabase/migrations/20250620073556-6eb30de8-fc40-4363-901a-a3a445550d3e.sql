
-- First, let's see what RLS policies currently exist on the etf_funds table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'etf_funds';

-- Drop any existing policies that might be causing issues
DROP POLICY IF EXISTS "Allow public read access to ETF funds" ON public.etf_funds;
DROP POLICY IF EXISTS "Allow authenticated users to manage ETF funds" ON public.etf_funds;

-- Create new policies with different names to avoid conflicts
CREATE POLICY "etf_funds_public_select" 
  ON public.etf_funds 
  FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "etf_funds_authenticated_all" 
  ON public.etf_funds 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE public.etf_funds ENABLE ROW LEVEL SECURITY;
