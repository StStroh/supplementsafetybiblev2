/*
  # Fix Checker Search Issues
  
  1. Changes
    - Drop unique constraint on checker_substance_tokens.token (tokens need to map to multiple substances)
    - Drop and recreate checker_search_substances function to return TEXT instead of UUID for substance_id
  
  2. Rationale
    - Current schema expects UUID but table uses TEXT for substance_id
    - Multiple substances can share common tokens (e.g., "vitamin")
*/

-- Drop the unique constraint on token (same token can belong to multiple substances)
DROP INDEX IF EXISTS uniq_checker_token;

-- Create non-unique index for performance
CREATE INDEX IF NOT EXISTS idx_checker_tokens_token_lookup 
  ON checker_substance_tokens(token);

-- Drop the old function with UUID return type
DROP FUNCTION IF EXISTS checker_search_substances(text, text, integer);

-- Recreate the search function with correct return type (text instead of uuid)
CREATE OR REPLACE FUNCTION checker_search_substances(
  q text,
  kind text DEFAULT 'any',
  lim integer DEFAULT 10
)
RETURNS TABLE(
  substance_id text,
  canonical_name text,
  display_name text,
  substance_type text,
  aliases text[],
  match_score double precision
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
      -- Use index for fast prefix search
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
      AND cs.is_active = true
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
