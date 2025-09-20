-- Add new performance columns to etf_funds table
ALTER TABLE etf_funds 
ADD COLUMN return_1m DECIMAL(10,4),
ADD COLUMN return_3m DECIMAL(10,4),
ADD COLUMN return_6m DECIMAL(10,4),
ADD COLUMN return_2024 DECIMAL(10,4),
ADD COLUMN return_2023 DECIMAL(10,4),
ADD COLUMN return_2022 DECIMAL(10,4),
ADD COLUMN return_2021 DECIMAL(10,4),
ADD COLUMN return_inception DECIMAL(10,4),
ADD COLUMN performance_last_updated TIMESTAMP WITH TIME ZONE;

-- Create indexes for better performance
CREATE INDEX idx_etf_funds_return_1m ON etf_funds (return_1m);
CREATE INDEX idx_etf_funds_return_3m ON etf_funds (return_3m);
CREATE INDEX idx_etf_funds_return_6m ON etf_funds (return_6m);
CREATE INDEX idx_etf_funds_performance_last_updated ON etf_funds (performance_last_updated);