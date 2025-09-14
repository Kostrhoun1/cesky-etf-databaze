
-- Dočasně povolíme INSERT všem uživatelům do tabulky newsletters
DROP POLICY IF EXISTS "Admins manage newsletters" ON public.newsletters;

CREATE POLICY "All users can insert newsletters"
  ON public.newsletters
  FOR INSERT
  WITH CHECK (true);
