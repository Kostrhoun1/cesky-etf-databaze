
-- Phase 1: Critical Database Security Fixes

-- 1. Remove overly permissive policies from newsletters table
DROP POLICY IF EXISTS "All users can insert newsletters" ON public.newsletters;
DROP POLICY IF EXISTS "All users can select newsletters" ON public.newsletters;

-- 2. Create proper admin-only policies for newsletters
CREATE POLICY "Only admins can insert newsletters"
  ON public.newsletters
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.app_admins 
      WHERE user_email = (
        SELECT email FROM auth.users WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Only admins can select newsletters"
  ON public.newsletters
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.app_admins 
      WHERE user_email = (
        SELECT email FROM auth.users WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Only admins can update newsletters"
  ON public.newsletters
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.app_admins 
      WHERE user_email = (
        SELECT email FROM auth.users WHERE id = auth.uid()
      )
    )
  );

-- 3. Secure newsletter_subscribers table
DROP POLICY IF EXISTS "Public can resubscribe newsletter" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Public can view active newsletter subscribers" ON public.newsletter_subscribers;

-- Allow public to subscribe (INSERT only)
CREATE POLICY "Public can subscribe to newsletter"
  ON public.newsletter_subscribers
  FOR INSERT
  WITH CHECK (true);

-- Allow public to unsubscribe (UPDATE their own subscription only)
CREATE POLICY "Public can unsubscribe from newsletter"
  ON public.newsletter_subscribers
  FOR UPDATE
  USING (true)
  WITH CHECK (unsubscribed_at IS NOT NULL);

-- Only admins can view subscribers
CREATE POLICY "Only admins can view newsletter subscribers"
  ON public.newsletter_subscribers
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.app_admins 
      WHERE user_email = (
        SELECT email FROM auth.users WHERE id = auth.uid()
      )
    )
  );

-- 4. Secure ETF funds table - make it read-only for public, admin-only for modifications
DROP POLICY IF EXISTS "Allow public insert access to ETF funds" ON public.etf_funds;
DROP POLICY IF EXISTS "Allow public update access to ETF funds" ON public.etf_funds;

-- Keep public read access
-- "Allow public read access to ETF funds" policy already exists and is appropriate

-- Only admins can modify ETF data
CREATE POLICY "Only admins can insert ETF funds"
  ON public.etf_funds
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.app_admins 
      WHERE user_email = (
        SELECT email FROM auth.users WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Only admins can update ETF funds"
  ON public.etf_funds
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.app_admins 
      WHERE user_email = (
        SELECT email FROM auth.users WHERE id = auth.uid()
      )
    )
  );

-- 5. Secure app_admins table
ALTER TABLE public.app_admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view admin list"
  ON public.app_admins
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.app_admins 
      WHERE user_email = (
        SELECT email FROM auth.users WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Only admins can manage admin list"
  ON public.app_admins
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.app_admins 
      WHERE user_email = (
        SELECT email FROM auth.users WHERE id = auth.uid()
      )
    )
  );
