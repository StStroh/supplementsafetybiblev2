/*
  # Admin Coverage Dashboard Views
  
  1. New Views
    - `v_requested_interactions`
      - Shows most requested substances from checker_requests
      - Groups by normalized input to show what users are searching for
      - Columns: token, raw_input_sample, request_count, last_requested
      - Sorted by request_count descending
    
    - `v_substance_interaction_counts`
      - Shows interaction counts per substance
      - Columns: substance_id, display_name, type, interaction_count
      - Useful for identifying low-coverage substances
    
    - `v_zero_coverage_substances`
      - Shows substances with no interactions at all
      - Columns: substance_id, display_name, type
      - Helps identify gaps in coverage
  
  2. Security
    - Views are public readable (for admin UI)
    - Underlying tables protected by RLS
*/

-- ==================================================
-- VIEW: Most Requested Substances
-- ==================================================

CREATE OR REPLACE VIEW public.v_requested_interactions AS
SELECT 
  normalized_input as token,
  MAX(raw_input) as raw_input_sample,
  COUNT(*) as request_count,
  MAX(created_at) as last_requested
FROM checker_requests
WHERE normalized_input IS NOT NULL 
  AND normalized_input != ''
GROUP BY normalized_input
ORDER BY request_count DESC;

COMMENT ON VIEW public.v_requested_interactions IS 
'Shows the most frequently requested substances from the interaction checker';

-- ==================================================
-- VIEW: Substance Interaction Counts
-- ==================================================

CREATE OR REPLACE VIEW public.v_substance_interaction_counts AS
WITH interaction_pairs AS (
  -- Get all substance pairs from interactions (both directions)
  SELECT a_substance_id as substance_id FROM checker_interactions
  UNION ALL
  SELECT b_substance_id as substance_id FROM checker_interactions
)
SELECT 
  cs.substance_id,
  cs.display_name,
  cs.type,
  cs.canonical_name,
  COALESCE(COUNT(ip.substance_id), 0)::integer as interaction_count
FROM checker_substances cs
LEFT JOIN interaction_pairs ip ON cs.substance_id = ip.substance_id
WHERE cs.is_active = true
GROUP BY cs.substance_id, cs.display_name, cs.type, cs.canonical_name
ORDER BY interaction_count ASC, cs.display_name ASC;

COMMENT ON VIEW public.v_substance_interaction_counts IS 
'Shows how many interactions each substance has, useful for identifying low coverage';

-- ==================================================
-- VIEW: Zero Coverage Substances
-- ==================================================

CREATE OR REPLACE VIEW public.v_zero_coverage_substances AS
SELECT 
  cs.substance_id,
  cs.display_name,
  cs.type,
  cs.canonical_name
FROM checker_substances cs
WHERE NOT EXISTS (
  SELECT 1 
  FROM checker_interactions ci
  WHERE ci.a_substance_id = cs.substance_id 
     OR ci.b_substance_id = cs.substance_id
)
AND cs.is_active = true
ORDER BY cs.type, cs.display_name;

COMMENT ON VIEW public.v_zero_coverage_substances IS 
'Shows active substances that have no interactions in the database';

-- ==================================================
-- PERMISSIONS
-- ==================================================

-- Grant SELECT to authenticated users (admin UI will use authenticated access)
GRANT SELECT ON public.v_requested_interactions TO authenticated;
GRANT SELECT ON public.v_substance_interaction_counts TO authenticated;
GRANT SELECT ON public.v_zero_coverage_substances TO authenticated;

-- Also grant to anon for potential public dashboards
GRANT SELECT ON public.v_requested_interactions TO anon;
GRANT SELECT ON public.v_substance_interaction_counts TO anon;
GRANT SELECT ON public.v_zero_coverage_substances TO anon;
