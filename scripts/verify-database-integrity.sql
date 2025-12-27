-- ==================================================
-- DATABASE INTEGRITY VERIFICATION SCRIPT
-- ==================================================
-- Run this script anytime to verify database integrity
-- All queries should return ZERO rows
-- If any query returns rows, data corruption exists

\echo '╔══════════════════════════════════════════════════════════════════════════════╗'
\echo '║                   DATABASE INTEGRITY VERIFICATION                            ║'
\echo '╚══════════════════════════════════════════════════════════════════════════════╝'
\echo ''

-- ==================================================
-- TEST 1: Non-normalized tokens (MUST BE ZERO)
-- ==================================================
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
\echo 'TEST 1: Non-normalized tokens'
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

SELECT
  COUNT(*) as non_normalized_tokens,
  CASE
    WHEN COUNT(*) = 0 THEN '✅ PASS'
    ELSE '❌ FAIL'
  END as status
FROM checker_substance_tokens
WHERE token <> norm_token(token);

\echo ''

-- ==================================================
-- TEST 2: Invalid interaction ordering (MUST BE ZERO)
-- ==================================================
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
\echo 'TEST 2: Invalid interaction ordering'
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

SELECT
  COUNT(*) as unordered_interactions,
  CASE
    WHEN COUNT(*) = 0 THEN '✅ PASS'
    ELSE '❌ FAIL'
  END as status
FROM checker_interactions
WHERE a_substance_id >= b_substance_id;

\echo ''

-- ==================================================
-- TEST 3: Orphan tokens (MUST BE ZERO)
-- ==================================================
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
\echo 'TEST 3: Orphan tokens (tokens without substances)'
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

SELECT
  COUNT(*) as orphan_tokens,
  CASE
    WHEN COUNT(*) = 0 THEN '✅ PASS'
    ELSE '❌ FAIL'
  END as status
FROM checker_substance_tokens t
LEFT JOIN checker_substances s ON s.substance_id = t.substance_id
WHERE s.substance_id IS NULL;

\echo ''

-- ==================================================
-- TEST 4: Orphan interactions (MUST BE ZERO)
-- ==================================================
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
\echo 'TEST 4: Orphan interactions (interactions without substances)'
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

SELECT
  COUNT(*) as orphan_interactions,
  CASE
    WHEN COUNT(*) = 0 THEN '✅ PASS'
    ELSE '❌ FAIL'
  END as status
FROM checker_interactions i
LEFT JOIN checker_substances sa ON sa.substance_id = i.a_substance_id
LEFT JOIN checker_substances sb ON sb.substance_id = i.b_substance_id
WHERE sa.substance_id IS NULL OR sb.substance_id IS NULL;

\echo ''

-- ==================================================
-- TEST 5: Duplicate tokens (MUST BE ZERO)
-- ==================================================
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
\echo 'TEST 5: Duplicate tokens'
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

SELECT
  COUNT(*) as duplicate_tokens,
  CASE
    WHEN COUNT(*) = 0 THEN '✅ PASS'
    ELSE '❌ FAIL'
  END as status
FROM (
  SELECT token
  FROM checker_substance_tokens
  GROUP BY token
  HAVING COUNT(*) > 1
) duplicates;

\echo ''

-- ==================================================
-- TEST 6: Duplicate interaction pairs (MUST BE ZERO)
-- ==================================================
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
\echo 'TEST 6: Duplicate interaction pairs'
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

SELECT
  COUNT(*) as duplicate_pairs,
  CASE
    WHEN COUNT(*) = 0 THEN '✅ PASS'
    ELSE '❌ FAIL'
  END as status
FROM (
  SELECT a_substance_id, b_substance_id
  FROM checker_interactions
  GROUP BY a_substance_id, b_substance_id
  HAVING COUNT(*) > 1
) duplicates;

\echo ''

-- ==================================================
-- TEST 7: Symmetric duplicates (MUST BE ZERO)
-- ==================================================
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
\echo 'TEST 7: Symmetric duplicates (A+B and B+A both exist)'
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

SELECT
  COUNT(*) as symmetric_duplicates,
  CASE
    WHEN COUNT(*) = 0 THEN '✅ PASS'
    ELSE '❌ FAIL'
  END as status
FROM checker_interactions i1
JOIN checker_interactions i2
  ON i1.a_substance_id = i2.b_substance_id
  AND i1.b_substance_id = i2.a_substance_id
  AND i1.interaction_id < i2.interaction_id;

\echo ''

-- ==================================================
-- SUMMARY STATISTICS
-- ==================================================
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
\echo 'DATABASE STATISTICS'
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

SELECT
  'Substances' as entity,
  COUNT(*) as count,
  (SELECT COUNT(*) FROM checker_substances WHERE type = 'drug') as drugs,
  (SELECT COUNT(*) FROM checker_substances WHERE type = 'supplement') as supplements
FROM checker_substances

UNION ALL

SELECT
  'Tokens' as entity,
  COUNT(*) as count,
  NULL as drugs,
  NULL as supplements
FROM checker_substance_tokens

UNION ALL

SELECT
  'Interactions' as entity,
  COUNT(*) as count,
  NULL as drugs,
  NULL as supplements
FROM checker_interactions;

\echo ''

-- ==================================================
-- CONSTRAINT STATUS
-- ==================================================
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
\echo 'CONSTRAINT STATUS'
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

SELECT
  table_name,
  constraint_name,
  constraint_type,
  CASE
    WHEN constraint_type = 'CHECK' THEN '🔒 Active'
    WHEN constraint_type = 'UNIQUE' THEN '🔑 Active'
    WHEN constraint_type = 'FOREIGN KEY' THEN '🔗 Active'
    ELSE '✅ Active'
  END as status
FROM information_schema.table_constraints
WHERE table_schema = 'public'
  AND table_name IN ('checker_substances', 'checker_interactions', 'checker_substance_tokens')
  AND constraint_name IN (
    'chk_token_normalized',
    'uniq_checker_token',
    'ordered_pair',
    'uniq_checker_interaction_pair'
  )
ORDER BY table_name, constraint_type;

\echo ''
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
\echo '✅ VERIFICATION COMPLETE'
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
\echo ''
\echo 'If all tests show ✅ PASS, your database is healthy.'
\echo 'If any test shows ❌ FAIL, investigate immediately.'
\echo ''
