-- Rychlá oprava RLS cyklické závislosti
-- Spusťte v Supabase SQL editoru

-- 1. Dočasně vypnout problematické policies
DROP POLICY IF EXISTS "etf_funds_admin_write" ON etf_funds;
DROP POLICY IF EXISTS "etf_funds_admin_update" ON etf_funds;
DROP POLICY IF EXISTS "etf_funds_admin_delete" ON etf_funds;

-- 2. Vytvořit jednoduché policies pouze pro service_role
CREATE POLICY "etf_funds_service_write" ON etf_funds 
    FOR INSERT
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "etf_funds_service_update" ON etf_funds 
    FOR UPDATE
    USING (auth.role() = 'service_role');

CREATE POLICY "etf_funds_service_delete" ON etf_funds 
    FOR DELETE
    USING (auth.role() = 'service_role');

-- 3. Ověření
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd
FROM pg_policies 
WHERE tablename = 'etf_funds'
ORDER BY policyname;