
-- Nejprve zkontrolujme, co je skutečně v tabulce
SELECT * FROM public.app_admins;

-- Pak vložíme správný záznam
DELETE FROM public.app_admins WHERE user_email = 'tomas.kostrhoun1@gmail.com';
INSERT INTO public.app_admins (user_email) VALUES ('tomas.kostrhoun1@gmail.com');

-- A ověříme, že je tam
SELECT * FROM public.app_admins WHERE user_email = 'tomas.kostrhoun1@gmail.com';
