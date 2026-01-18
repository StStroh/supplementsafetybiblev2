/*
  # Create Requested Tokens Missing View

  1. Purpose
    - Shows tokens that users requested but don't exist in checker_substance_tokens
    - Helps admins identify missing substances in the database
    - Prioritized by request frequency

  2. View Details
    - `v_requested_tokens_missing`
    - Aggregates substance_name and interaction_with from interaction_requests
    - Normalizes tokens using norm_token() function
    - Counts requests per token
    - Filters to tokens NOT in checker_substance_tokens
    - Ordered by request count (most requested first)

  3. Columns
    - token: normalized token that was requested
    - cnt: number of times this token was requested

  4. Usage
    - Admin coverage dashboard to identify gaps
    - Shows what users are searching for but can't find
    - Prioritizes token additions by user demand
*/

-- Drop existing view if it exists
DROP VIEW IF EXISTS public.v_requested_tokens_missing;

-- Create view for requested tokens that don't exist in database
CREATE OR REPLACE VIEW public.v_requested_tokens_missing AS
WITH req AS (
  -- Collect all substance_name values from requests
  SELECT substance_name AS token_raw FROM public.interaction_requests
  UNION ALL
  -- Collect all interaction_with values from requests
  SELECT interaction_with AS token_raw FROM public.interaction_requests
),
agg AS (
  -- Normalize and aggregate token counts
  SELECT norm_token(token_raw) AS token, COUNT(*) AS cnt
  FROM req
  GROUP BY norm_token(token_raw)
)
-- Find tokens that were requested but don't exist in database
SELECT a.token, a.cnt
FROM agg a
LEFT JOIN public.checker_substance_tokens t
  ON t.token = a.token
WHERE t.token IS NULL
ORDER BY a.cnt DESC;

-- Grant read access to authenticated users (admins only via RLS)
GRANT SELECT ON public.v_requested_tokens_missing TO authenticated;

COMMENT ON VIEW public.v_requested_tokens_missing IS 'Shows normalized tokens from user requests that do not exist in checker_substance_tokens, ordered by request frequency. Helps identify missing substances.';