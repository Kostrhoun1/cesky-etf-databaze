
-- First, add the missing updated_at column to app_admins table
ALTER TABLE public.app_admins 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Drop the existing trigger if it exists
DROP TRIGGER IF EXISTS update_app_admins_updated_at ON public.app_admins;

-- Create the trigger again now that the updated_at column exists
CREATE TRIGGER update_app_admins_updated_at
  BEFORE UPDATE ON public.app_admins
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Update the admin email to match the actual login email
UPDATE public.app_admins 
SET user_email = 'tomas.kostrhoun1@gmail.com' 
WHERE user_email = 'tomas.kostrhoun@gmail.com';
