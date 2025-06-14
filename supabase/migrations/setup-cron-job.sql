
-- Schedule the ETF price fetch function to run every 30 minutes
-- This will call the fetch-etf-prices edge function automatically

SELECT cron.schedule(
  'fetch-etf-prices-every-30min',
  '*/30 * * * *', -- Every 30 minutes
  $$
  SELECT
    net.http_post(
        url:='https://nbhwnatadyubiuadfakx.supabase.co/functions/v1/fetch-etf-prices',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NDQ3NDQsImV4cCI6MjA2NDQyMDc0NH0.yQgSv0JMi6ebwIu7fQHIXE4VblkQ3pJfy-lXvFgd_CY"}'::jsonb,
        body:='{"scheduled": true}'::jsonb
    ) as request_id;
  $$
);

-- Check if the cron job was created successfully
SELECT * FROM cron.job WHERE jobname = 'fetch-etf-prices-every-30min';
