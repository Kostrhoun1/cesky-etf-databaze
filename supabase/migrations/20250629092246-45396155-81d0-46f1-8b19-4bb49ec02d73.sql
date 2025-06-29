
-- Fix the infinite recursion issue with app_admins RLS policy
DROP POLICY IF EXISTS "Allow authenticated users to read admin records" ON public.app_admins;

-- Create a simpler policy that allows all authenticated users to read admin records
-- without causing recursion
CREATE POLICY "Allow authenticated users to read admin records" 
  ON public.app_admins 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Ensure RLS is enabled
ALTER TABLE public.app_admins ENABLE ROW LEVEL SECURITY;
