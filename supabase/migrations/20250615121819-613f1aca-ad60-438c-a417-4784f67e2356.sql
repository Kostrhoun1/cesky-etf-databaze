
-- Povolit všem SELECT z tabulky newsletters
DROP POLICY IF EXISTS "Admins can select newsletters" ON public.newsletters;

CREATE POLICY "All users can select newsletters"
  ON public.newsletters
  FOR SELECT
  USING (true);
