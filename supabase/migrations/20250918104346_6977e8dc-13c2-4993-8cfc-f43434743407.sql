-- Add rating component columns to etf_funds table
ALTER TABLE public.etf_funds 
ADD COLUMN rating_ter_score INTEGER,
ADD COLUMN rating_size_score INTEGER,
ADD COLUMN rating_track_record_score INTEGER,
ADD COLUMN rating_provider_score INTEGER,
ADD COLUMN rating_performance_score INTEGER;