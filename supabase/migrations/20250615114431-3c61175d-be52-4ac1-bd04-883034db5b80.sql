
-- Allow public users to UPDATE their newsletter subscription to re-subscribe
CREATE POLICY "Public can resubscribe newsletter"
  ON public.newsletter_subscribers
  FOR UPDATE
  USING (true)
  WITH CHECK (true);
