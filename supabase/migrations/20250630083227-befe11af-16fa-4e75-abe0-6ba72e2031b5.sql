
-- Nejdříve zkontrolujeme, zda existuje záznam pro váš email
SELECT * FROM public.app_admins WHERE user_email = 'tomas.kostrhoun1@gmail.com';

-- Pokud záznam neexistuje, vložíme ho
INSERT INTO public.app_admins (user_email) 
VALUES ('tomas.kostrhoun1@gmail.com')
ON CONFLICT (user_email) DO NOTHING;

-- Ověříme, že funkce funguje správně
SELECT public.is_user_admin('tomas.kostrhoun1@gmail.com');
