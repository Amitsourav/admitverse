-- Disable RLS on all tables for testing
-- Run this in Supabase SQL Editor

ALTER TABLE colleges DISABLE ROW LEVEL SECURITY;
ALTER TABLE courses DISABLE ROW LEVEL SECURITY;
ALTER TABLE specializations DISABLE ROW LEVEL SECURITY;
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Grant permissions to service role
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- Alternative: Create permissive policies
-- DELETE FROM auth.policies WHERE schemaname = 'public';

-- CREATE POLICY "Enable all access for service role" ON colleges
--   FOR ALL USING (auth.role() = 'service_role');

-- CREATE POLICY "Enable all access for service role" ON courses
--   FOR ALL USING (auth.role() = 'service_role');

-- CREATE POLICY "Enable all access for service role" ON specializations
--   FOR ALL USING (auth.role() = 'service_role');

-- CREATE POLICY "Enable all access for service role" ON leads
--   FOR ALL USING (auth.role() = 'service_role');