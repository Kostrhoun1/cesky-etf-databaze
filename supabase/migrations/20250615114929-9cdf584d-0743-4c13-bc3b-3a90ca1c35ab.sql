
-- Povolit SELECT pro public na aktivní odběratele newsletteru
CREATE POLICY "Public can view active newsletter subscribers"
  ON public.newsletter_subscribers
  FOR SELECT
  USING (unsubscribed_at IS NULL);

-- Ujistit se, že je RLS zapnut pro newsletter_subscribers
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
