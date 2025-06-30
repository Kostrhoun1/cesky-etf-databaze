
-- Create a security definer function to check if a user is an admin
-- This prevents RLS recursion issues by bypassing RLS when checking admin status
CREATE OR REPLACE FUNCTION public.is_user_admin(user_email text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.app_admins 
    WHERE app_admins.user_email = $1
  );
$$;
