
-- 1. Newsletter subscribers table
CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  subscribed_at timestamp with time zone NOT NULL DEFAULT now(),
  unsubscribed_at timestamp with time zone
);

-- Povolit RLS (řídící automaticky přes edge funkci, ne veřejný SELECT)
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Veřejné přihlášení k odběru (každý může vložit)
CREATE POLICY "Public can subscribe newsletter" 
  ON public.newsletter_subscribers
  FOR INSERT
  WITH CHECK (true);

-- Správce může vidět vše (podle role)
CREATE TABLE public.app_admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL UNIQUE
);

ALTER TABLE public.app_admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage admins table"
  ON public.app_admins
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 2. Odesané/k připravené newslettery pro audit a historii
CREATE TABLE public.newsletters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  subject text NOT NULL,
  body text NOT NULL,
  sent_at timestamp with time zone,
  sent_by uuid,
  csv_etf_data text -- zde se uloží csv (jako text - volitelné)
);

ALTER TABLE public.newsletters ENABLE ROW LEVEL SECURITY;

-- Pouze správce může vkládat, editovat, mazat, číst
CREATE POLICY "Admins manage newsletters"
  ON public.newsletters
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.app_admins WHERE app_admins.user_email = auth.email()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.app_admins WHERE app_admins.user_email = auth.email()));

-- 3. Povolit hromadný výběr všech kontaktů pouze adminům (pro odeslání newsletteru)
CREATE POLICY "Admins can select subscribers"
  ON public.newsletter_subscribers
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.app_admins WHERE app_admins.user_email = auth.email()));

