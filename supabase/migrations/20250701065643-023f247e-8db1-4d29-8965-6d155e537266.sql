
-- Vypnout RLS na app_admins tabulce úplně
ALTER TABLE public.app_admins DISABLE ROW LEVEL SECURITY;

-- Odstranit všechny existující politiky
DROP POLICY IF EXISTS "Allow all authenticated to read admins" ON public.app_admins;
DROP POLICY IF EXISTS "Allow authenticated users to read admin records" ON public.app_admins;

-- Ujistit se, že máme správný admin záznam
INSERT INTO public.app_admins (user_email) 
VALUES ('tomas.kostrhoun1@gmail.com')
ON CONFLICT (user_email) DO NOTHING;

-- Ověřit, že záznam existuje
SELECT * FROM public.app_admins WHERE user_email = 'tomas.kostrhoun1@gmail.com';
