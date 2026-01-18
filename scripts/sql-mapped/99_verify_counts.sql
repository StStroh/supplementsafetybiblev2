-- Verification queries
SELECT 'supplements' as table_name, COUNT(*) as count FROM supplements
UNION ALL
SELECT 'medications' as table_name, COUNT(*) as count FROM medications
UNION ALL
SELECT 'interactions' as table_name, COUNT(*) as count FROM interactions;