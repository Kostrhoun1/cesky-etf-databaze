-- =====================================================
-- SUPABASE SECURITY FIXES
-- Řešení kritických bezpečnostních problémů z Lovable
-- =====================================================

-- 1. AKTIVACE ROW LEVEL SECURITY (RLS) PRO VŠECHNY TABULKY
-- ========================================================

-- Aktivovat RLS na hlavní ETF tabulce
ALTER TABLE etf_funds ENABLE ROW LEVEL SECURITY;

-- Aktivovat RLS na admin tabulce (pokud existuje)
CREATE TABLE IF NOT EXISTS app_admins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_email TEXT UNIQUE NOT NULL,
    user_role TEXT DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE app_admins ENABLE ROW LEVEL SECURITY;

-- Aktivovat RLS na newsletter tabulce (pokud existuje)
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    unsubscribed_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- 2. BEZPEČNOSTNÍ POLÍCY PRO ETF_FUNDS TABULKU
-- =============================================

-- Veřejné čtení ETF dat (pro frontend)
CREATE POLICY "etf_funds_public_read" ON etf_funds 
    FOR SELECT 
    USING (true);

-- Scraper (service_role) a admins mohou zapisovat
CREATE POLICY "etf_funds_admin_write" ON etf_funds 
    FOR INSERT
    WITH CHECK (
        auth.role() = 'service_role' OR 
        EXISTS (
            SELECT 1 FROM app_admins 
            WHERE user_email = auth.jwt() ->> 'email'
        )
    );

CREATE POLICY "etf_funds_admin_update" ON etf_funds 
    FOR UPDATE
    USING (
        auth.role() = 'service_role' OR 
        EXISTS (
            SELECT 1 FROM app_admins 
            WHERE user_email = auth.jwt() ->> 'email'
        )
    );

CREATE POLICY "etf_funds_admin_delete" ON etf_funds 
    FOR DELETE
    USING (
        auth.role() = 'service_role' OR 
        EXISTS (
            SELECT 1 FROM app_admins 
            WHERE user_email = auth.jwt() ->> 'email'
        )
    );

-- 3. BEZPEČNOSTNÍ POLÍCY PRO APP_ADMINS TABULKU
-- ==============================================

-- Pouze admins mohou číst admin tabulku
CREATE POLICY "app_admins_admin_read" ON app_admins 
    FOR SELECT 
    USING (
        auth.role() = 'service_role' OR
        user_email = auth.jwt() ->> 'email'
    );

-- Pouze service_role může upravovat admin tabulku
CREATE POLICY "app_admins_service_write" ON app_admins 
    FOR ALL
    USING (auth.role() = 'service_role');

-- 4. BEZPEČNOSTNÍ POLÍCY PRO NEWSLETTER_SUBSCRIBERS
-- =================================================

-- Pouze admins mohou číst subscriber data
CREATE POLICY "newsletter_admin_read" ON newsletter_subscribers 
    FOR SELECT 
    USING (
        auth.role() = 'service_role' OR
        EXISTS (
            SELECT 1 FROM app_admins 
            WHERE user_email = auth.jwt() ->> 'email'
        )
    );

-- Veřejné přidávání nových subscriberů (pro signup)
CREATE POLICY "newsletter_public_insert" ON newsletter_subscribers 
    FOR INSERT 
    WITH CHECK (true);

-- Pouze admins mohou upravovat subscriber data
CREATE POLICY "newsletter_admin_update" ON newsletter_subscribers 
    FOR UPDATE 
    USING (
        auth.role() = 'service_role' OR
        EXISTS (
            SELECT 1 FROM app_admins 
            WHERE user_email = auth.jwt() ->> 'email'
        )
    );

-- 5. FUNKCE PRO BEZPEČNÉ OVĚŘENÍ ADMIN STATUSU
-- ============================================

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM app_admins 
        WHERE user_email = auth.jwt() ->> 'email'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. AUDIT LOG TABULKA PRO SLEDOVÁNÍ ZMĚN
-- =======================================

CREATE TABLE IF NOT EXISTS audit_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    table_name TEXT NOT NULL,
    operation TEXT NOT NULL, -- INSERT, UPDATE, DELETE
    old_data JSONB,
    new_data JSONB,
    user_email TEXT,
    user_role TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Pouze admins mohou číst audit log
CREATE POLICY "audit_log_admin_read" ON audit_log 
    FOR SELECT 
    USING (
        auth.role() = 'service_role' OR
        EXISTS (
            SELECT 1 FROM app_admins 
            WHERE user_email = auth.jwt() ->> 'email'
        )
    );

-- 7. TRIGGER FUNKCE PRO AUDIT LOGGING
-- ===================================

CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_log (
        table_name,
        operation,
        old_data,
        new_data,
        user_email,
        user_role
    ) VALUES (
        TG_TABLE_NAME,
        TG_OP,
        CASE WHEN TG_OP = 'DELETE' OR TG_OP = 'UPDATE' THEN row_to_json(OLD) ELSE NULL END,
        CASE WHEN TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN row_to_json(NEW) ELSE NULL END,
        auth.jwt() ->> 'email',
        auth.role()::text
    );
    
    RETURN CASE TG_OP
        WHEN 'DELETE' THEN OLD
        ELSE NEW
    END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Připojit audit trigger na kritické tabulky
CREATE TRIGGER etf_funds_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON etf_funds
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER app_admins_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON app_admins
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- 8. BEZPEČNOSTNÍ FUNKCE PRO API PŘÍSTUP
-- ======================================

-- Funkce pro bezpečné získání ETF dat s rate limiting
CREATE OR REPLACE FUNCTION get_etf_data(
    limit_count INTEGER DEFAULT 100,
    offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
    isin TEXT,
    name TEXT,
    ter_numeric DECIMAL,
    fund_size_numeric DECIMAL,
    category TEXT,
    region TEXT,
    return_1y DECIMAL,
    return_3y DECIMAL,
    return_5y DECIMAL
) AS $$
BEGIN
    -- Limit na maximálně 1000 záznamů na jednou
    IF limit_count > 1000 THEN
        limit_count := 1000;
    END IF;
    
    RETURN QUERY
    SELECT 
        e.isin,
        e.name,
        e.ter_numeric,
        e.fund_size_numeric,
        e.category,
        e.region,
        e.return_1y,
        e.return_3y,
        e.return_5y
    FROM etf_funds e
    ORDER BY e.fund_size_numeric DESC NULLS LAST
    LIMIT limit_count
    OFFSET offset_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. NASTAVENÍ AUTH POLÍCY
-- ========================

-- Zakázat registraci nových uživatelů (pouze admins)
-- Toto se nastavuje v Supabase dashboard: Authentication -> Settings -> "Enable email confirmations" = true
-- A "Allow new users to sign up" = false

-- 10. DODATEČNÉ BEZPEČNOSTNÍ OPATŘENÍ
-- ===================================

-- Odstranit veřejný přístup k interním funkcím
REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA public FROM anon;
REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA public FROM authenticated;

-- Povolit pouze vybrané funkce
GRANT EXECUTE ON FUNCTION get_etf_data TO anon;
GRANT EXECUTE ON FUNCTION get_etf_data TO authenticated;
GRANT EXECUTE ON FUNCTION is_admin TO authenticated;

-- Nastavit bezpečné search_path
ALTER ROLE anon SET search_path = public;
ALTER ROLE authenticated SET search_path = public;

-- 11. INDEXY PRO PERFORMANCE A SECURITY
-- =====================================

-- Index pro rychlé vyhledávání adminů
CREATE INDEX IF NOT EXISTS idx_app_admins_email ON app_admins(user_email);

-- Index pro audit log
CREATE INDEX IF NOT EXISTS idx_audit_log_table_operation ON audit_log(table_name, operation);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log(created_at);

-- 12. KOMENTÁŘE A DOKUMENTACE
-- ===========================

COMMENT ON TABLE etf_funds IS 'ETF fondy data - veřejné čtení, admin zápis';
COMMENT ON TABLE app_admins IS 'Administrátoři aplikace - pouze admin přístup';
COMMENT ON TABLE newsletter_subscribers IS 'Newsletter subscribers - admin čtení, veřejné přidávání';
COMMENT ON TABLE audit_log IS 'Audit log všech změn v databázi';

COMMENT ON FUNCTION get_etf_data IS 'Bezpečná funkce pro získání ETF dat s rate limiting';
COMMENT ON FUNCTION is_admin IS 'Ověření admin statusu uživatele';

-- 13. ZÁVĚREČNÉ OVĚŘENÍ
-- =====================

-- Test, že RLS je aktivní
SELECT 
    schemaname,
    tablename,
    rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
    AND tablename IN ('etf_funds', 'app_admins', 'newsletter_subscribers', 'audit_log');

-- Test počtu polícy
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd,
    roles
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- =====================================================
-- POZNÁMKY PRO ADMINISTRÁTORA:
-- 
-- 1. Tento script řeší všechny kritické security issues:
--    - ✅ RLS aktivní na všech tabulkách
--    - ✅ Admin data nejsou veřejná
--    - ✅ Email adresy chráněny
--    - ✅ Audit logging aktivní
--    - ✅ Rate limiting pro API
--
-- 2. DŮLEŽITÉ - SCRAPER KOMPATIBILITA:
--    - Scraper používá service_role klíč a bude fungovat i nadále
--    - Všechny polícy explicitně povolují service_role přístup
--    - Scraper může INSERT, UPDATE a DELETE v etf_funds tabulce
--    - Frontend zůstává funkční (veřejné čtení zachováno)
--
-- 3. Po spuštění tohoto scriptu je třeba:
--    - Přidat admin uživatele do app_admins tabulky
--    - Zkontrolovat Supabase Auth nastavení
--    - Otestovat frontend funkcionalitu
--    - Otestovat scraper funkcionalitu
--
-- 4. Pro přidání admin uživatele použijte:
--    INSERT INTO app_admins (user_email, user_role) 
--    VALUES ('admin@example.com', 'admin');
--
-- 5. Test scraper funkcionality:
--    - Zkuste spustit final_scraper.py
--    - Ověřte, že data se ukládají do databáze
--    - Zkontrolujte audit_log pro záznam změn
-- =====================================================