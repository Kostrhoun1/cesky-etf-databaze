
-- Create app_admins table for admin users
CREATE TABLE IF NOT EXISTS public.app_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on app_admins table
ALTER TABLE public.app_admins ENABLE ROW LEVEL SECURITY;

-- Create policy that allows authenticated users to read admin records
CREATE POLICY "Allow authenticated users to read admin records" 
  ON public.app_admins 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Insert the admin user
INSERT INTO public.app_admins (user_email) 
VALUES ('tomas.kostrhoun@gmail.com')
ON CONFLICT (user_email) DO NOTHING;

-- Add trigger for updating updated_at column
CREATE TRIGGER update_app_admins_updated_at
  BEFORE UPDATE ON public.app_admins
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
