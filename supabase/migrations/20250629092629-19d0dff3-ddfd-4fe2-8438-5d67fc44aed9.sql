
-- Vypnout RLS na app_admins tabulce úplně pro admin kontrolu
ALTER TABLE public.app_admins DISABLE ROW LEVEL SECURITY;

-- Odstranit všechny existující politiky
DROP POLICY IF EXISTS "Allow authenticated users to read admin records" ON public.app_admins;

-- Znovu povolit RLS ale s jednoduchou politikou
ALTER TABLE public.app_admins ENABLE ROW LEVEL SECURITY;

-- Vytvořit jednoduchou politiku která dovolí všem autentifikovaným uživatelům číst admin záznamy
CREATE POLICY "Allow all authenticated to read admins" 
  ON public.app_admins 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Ujistit se, že máme správný admin záznam
INSERT INTO public.app_admins (user_email) 
VALUES ('tomas.kostrhoun1@gmail.com')
ON CONFLICT (user_email) DO NOTHING;
