-- Add is_leveraged field to etf_funds table
ALTER TABLE public.etf_funds 
ADD COLUMN is_leveraged boolean DEFAULT false;