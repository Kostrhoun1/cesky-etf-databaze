
-- This index will speed up the sorting of ETFs by fund size, which is a common operation on the site.
CREATE INDEX IF NOT EXISTS idx_etf_funds_fund_size_numeric_desc ON public.etf_funds (fund_size_numeric DESC NULLS LAST);
