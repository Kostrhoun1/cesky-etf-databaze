-- Enable RLS on etf_funds table and create policy for public read access
ALTER TABLE public.etf_funds ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to ETF funds data
CREATE POLICY "ETF funds are publicly readable" 
ON public.etf_funds 
FOR SELECT 
USING (true);