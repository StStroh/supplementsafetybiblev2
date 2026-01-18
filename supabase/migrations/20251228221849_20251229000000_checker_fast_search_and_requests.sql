/*
  # Checker Fast Search and Missing Substance Requests

  1. New RPC Function
    - `checker_search_substances` for fast autocomplete search
    - Supports prefix matching and fuzzy search
    - Returns scored results with substance details

  2. New Table
    - `checker_missing_requests` to track user requests for substances not in database
    - Helps product team prioritize additions

  3. Indexes
    - Optimize search performance for large datasets
    - Support both prefix and trigram matching
*/

-- ============================================================================
-- 1. CREATE FAST SEARCH RPC FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION checker_search_substances(
  q text,
  kind text DEFAULT 'any',
  lim int DEFAULT 10
)
RETURNS TABLE (
  substance_id uuid,
  canonical_name text,
  display_name text,
  substance_type text,
  aliases text[],
  match_score float
)
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  q_norm text;
  q_lower text;
BEGIN
  -- Normalize query using existing norm_token function
  q_norm := norm_token(q);
  q_lower := lower(q);

  -- If normalized query is empty, return nothing
  IF q_norm = '' THEN
    RETURN;
  END IF;

  -- Return results combining:
  -- 1. Exact token matches (score 100)
  -- 2. Prefix token matches (score 80-99 based on length)
  -- 3. Contains matches (score 50-79 based on position)
  -- 4. Similarity matches if pg_trgm available (score 30-49)

  RETURN QUERY
  WITH token_matches AS (
    SELECT DISTINCT ON (cst.substance_id)
      cst.substance_id,
      cst.token,
      CASE
        -- Exact match gets highest score
        WHEN cst.token = q_norm THEN 100.0
        -- Prefix match gets high score, longer = better
        WHEN cst.token LIKE q_norm || '%' THEN 80.0 + (15.0 * length(q_norm)::float / GREATEST(length(cst.token), 1))
        -- Contains match gets medium score, earlier = better
        WHEN cst.token LIKE '%' || q_norm || '%' THEN 50.0 + (25.0 / GREATEST(position(q_norm IN cst.token), 1))
        -- Similarity fallback (if pg_trgm is available)
        WHEN similarity(cst.token, q_norm) > 0.3 THEN 30.0 + (similarity(cst.token, q_norm) * 20.0)
        ELSE 0.0
      END AS score
    FROM checker_substance_tokens cst
    WHERE
      -- Use GIN index for fast prefix search
      cst.token LIKE q_norm || '%'
      OR cst.token LIKE '%' || q_norm || '%'
    ORDER BY cst.substance_id, score DESC
  ),
  ranked_substances AS (
    SELECT
      cs.substance_id,
      cs.canonical_name,
      cs.display_name,
      cs.type AS substance_type,
      cs.aliases,
      tm.score AS match_score
    FROM token_matches tm
    JOIN checker_substances cs ON cs.substance_id = tm.substance_id
    WHERE
      tm.score > 0
      AND (
        kind = 'any'
        OR cs.type = kind
      )
    ORDER BY tm.score DESC, cs.display_name ASC
    LIMIT lim
  )
  SELECT * FROM ranked_substances;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION checker_search_substances(text, text, int) TO authenticated;
GRANT EXECUTE ON FUNCTION checker_search_substances(text, text, int) TO anon;

-- Add comment
COMMENT ON FUNCTION checker_search_substances IS 'Fast autocomplete search for substances with scoring and ranking';

-- ============================================================================
-- 2. CREATE MISSING SUBSTANCE REQUESTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS checker_missing_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  raw_name text NOT NULL,
  kind text NOT NULL CHECK (kind IN ('supplement', 'drug', 'any')),
  user_email text,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  locale text,
  user_agent text,
  page text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'added', 'rejected')),
  notes text,
  reviewed_at timestamptz,
  reviewed_by text,
  CONSTRAINT raw_name_not_empty CHECK (char_length(raw_name) > 0)
);

-- Create indexes for querying
CREATE INDEX IF NOT EXISTS idx_checker_missing_requests_created_at
  ON checker_missing_requests(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_checker_missing_requests_status
  ON checker_missing_requests(status);

CREATE INDEX IF NOT EXISTS idx_checker_missing_requests_kind
  ON checker_missing_requests(kind);

CREATE INDEX IF NOT EXISTS idx_checker_missing_requests_user_email
  ON checker_missing_requests(user_email) WHERE user_email IS NOT NULL;

-- Create index on raw_name for finding duplicates
CREATE INDEX IF NOT EXISTS idx_checker_missing_requests_raw_name
  ON checker_missing_requests(lower(raw_name));

-- ============================================================================
-- 3. ROW LEVEL SECURITY FOR MISSING REQUESTS
-- ============================================================================

ALTER TABLE checker_missing_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can submit missing substance requests" ON checker_missing_requests;
DROP POLICY IF EXISTS "Users can view own requests" ON checker_missing_requests;
DROP POLICY IF EXISTS "Anonymous cannot view requests" ON checker_missing_requests;
DROP POLICY IF EXISTS "Admins can view all requests" ON checker_missing_requests;
DROP POLICY IF EXISTS "Admins can update requests" ON checker_missing_requests;

-- Anyone can insert requests (authenticated or anonymous)
CREATE POLICY "Anyone can submit missing substance requests"
  ON checker_missing_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Users can view their own requests
CREATE POLICY "Users can view own requests"
  ON checker_missing_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR auth.jwt()->>'email' = user_email);

-- Anonymous users cannot view requests (no personal data leak)
CREATE POLICY "Anonymous cannot view requests"
  ON checker_missing_requests
  FOR SELECT
  TO anon
  USING (false);

-- Admins can view all requests (requires admin role in JWT)
CREATE POLICY "Admins can view all requests"
  ON checker_missing_requests
  FOR SELECT
  TO authenticated
  USING (
    (auth.jwt()->>'role' = 'admin')
    OR
    (auth.jwt()->>'email' IN ('support@supplementsafetybible.com', 'admin@supplementsafetybible.com'))
  );

-- Admins can update requests (change status, add notes)
CREATE POLICY "Admins can update requests"
  ON checker_missing_requests
  FOR UPDATE
  TO authenticated
  USING (
    (auth.jwt()->>'role' = 'admin')
    OR
    (auth.jwt()->>'email' IN ('support@supplementsafetybible.com', 'admin@supplementsafetybible.com'))
  )
  WITH CHECK (
    (auth.jwt()->>'role' = 'admin')
    OR
    (auth.jwt()->>'email' IN ('support@supplementsafetybible.com', 'admin@supplementsafetybible.com'))
  );

-- Add comments
COMMENT ON TABLE checker_missing_requests IS 'User requests for substances not found in database';
COMMENT ON COLUMN checker_missing_requests.raw_name IS 'The exact text user typed/searched for';
COMMENT ON COLUMN checker_missing_requests.kind IS 'Type of substance: supplement, drug, or any';
COMMENT ON COLUMN checker_missing_requests.status IS 'Request status: pending, reviewing, added, or rejected';

-- ============================================================================
-- 4. OPTIMIZE EXISTING INDEXES FOR SEARCH
-- ============================================================================

-- Ensure checker_substance_tokens has proper index for prefix search
CREATE INDEX IF NOT EXISTS idx_checker_substance_tokens_token_prefix
  ON checker_substance_tokens(token text_pattern_ops);

-- Add GIN index for faster LIKE queries if not exists (skip if pg_trgm unavailable)
DO $$
BEGIN
  CREATE INDEX IF NOT EXISTS idx_checker_substance_tokens_token_gin
    ON checker_substance_tokens USING gin(token gin_trgm_ops);
EXCEPTION
  WHEN undefined_object THEN
    RAISE NOTICE 'pg_trgm extension not available, skipping GIN index';
END $$;

-- Index on checker_substances for type filtering
CREATE INDEX IF NOT EXISTS idx_checker_substances_type
  ON checker_substances(type);

-- Composite index for filtered searches
CREATE INDEX IF NOT EXISTS idx_checker_substances_type_display
  ON checker_substances(type, display_name);

-- ============================================================================
-- 5. HELPER FUNCTION: Check for similar existing requests (dedupe)
-- ============================================================================

CREATE OR REPLACE FUNCTION checker_find_similar_requests(
  search_name text,
  search_kind text DEFAULT 'any',
  days_back int DEFAULT 30
)
RETURNS TABLE (
  id uuid,
  raw_name text,
  kind text,
  created_at timestamptz,
  status text
)
LANGUAGE sql
STABLE
AS $$
  SELECT id, raw_name, kind, created_at, status
  FROM checker_missing_requests
  WHERE
    lower(raw_name) = lower(search_name)
    AND (search_kind = 'any' OR kind = search_kind)
    AND created_at > now() - (days_back || ' days')::interval
  ORDER BY created_at DESC
  LIMIT 5;
$$;

GRANT EXECUTE ON FUNCTION checker_find_similar_requests(text, text, int) TO authenticated;
GRANT EXECUTE ON FUNCTION checker_find_similar_requests(text, text, int) TO anon;

COMMENT ON FUNCTION checker_find_similar_requests IS 'Find similar missing substance requests to prevent duplicates';
