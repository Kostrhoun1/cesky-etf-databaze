-- Add rating columns to etf_funds table
ALTER TABLE public.etf_funds 
ADD COLUMN rating INTEGER DEFAULT 0,
ADD COLUMN rating_score INTEGER DEFAULT 0;

-- Add comments to document the columns
COMMENT ON COLUMN public.etf_funds.rating IS 'ETF rating in stars (1-5), based on fees, fund size, performance and provider reliability';
COMMENT ON COLUMN public.etf_funds.rating_score IS 'Detailed ETF score (0-100 points) for more granular rating calculation';

-- Create index for better performance when filtering/sorting by rating
CREATE INDEX idx_etf_funds_rating ON public.etf_funds(rating DESC);
CREATE INDEX idx_etf_funds_rating_score ON public.etf_funds(rating_score DESC);