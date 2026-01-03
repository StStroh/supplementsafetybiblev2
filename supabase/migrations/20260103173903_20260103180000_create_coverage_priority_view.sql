/*
  # Create Coverage Priority View

  1. New View
    - `v_coverage_priority`
      - Combines request data with substance coverage data
      - Calculates priority score based on demand vs coverage
      - Orders by priority (high demand, low coverage = highest priority)

  2. Purpose
    - Help admins prioritize which substances need interaction coverage
    - Surface high-demand, low-coverage items first
    - Guide content expansion efforts

  3. Priority Score Logic
    - Higher request count = more important
    - Lower interaction count = more urgent
    - Formula: request_count / (interaction_count + 1)
    - Substances with 0 requests are excluded
*/

CREATE OR REPLACE VIEW v_coverage_priority AS
WITH substance_requests AS (
  -- Count requests per substance by joining tokens with requests
  SELECT 
    st.substance_id,
    COUNT(DISTINCT cr.id) AS request_count
  FROM 
    checker_substance_tokens st
  INNER JOIN 
    checker_requests cr ON cr.normalized_input = st.token
  GROUP BY 
    st.substance_id
),
substance_interactions AS (
  -- Count interactions per substance (both sides)
  SELECT 
    substance_id,
    COUNT(*) AS interaction_count
  FROM (
    SELECT a_substance_id AS substance_id FROM checker_interactions
    UNION ALL
    SELECT b_substance_id AS substance_id FROM checker_interactions
  ) pairs
  GROUP BY substance_id
)
SELECT 
  cs.substance_id,
  cs.display_name,
  cs.type,
  cs.canonical_name,
  COALESCE(sr.request_count, 0) AS request_count,
  COALESCE(si.interaction_count, 0) AS interaction_count,
  -- Priority score: demand divided by (coverage + 1)
  -- Higher score = more requests with less coverage = highest priority
  CASE 
    WHEN COALESCE(sr.request_count, 0) = 0 THEN 0
    ELSE COALESCE(sr.request_count, 0)::numeric / (COALESCE(si.interaction_count, 0) + 1)::numeric
  END AS priority_score
FROM 
  checker_substances cs
LEFT JOIN 
  substance_requests sr ON sr.substance_id = cs.substance_id
LEFT JOIN 
  substance_interactions si ON si.substance_id = cs.substance_id
WHERE 
  cs.is_active = true
  AND COALESCE(sr.request_count, 0) > 0
ORDER BY 
  priority_score DESC,
  request_count DESC,
  cs.display_name ASC;

COMMENT ON VIEW v_coverage_priority IS 
'Priority queue for adding interactions - ranks substances by demand (requests) vs coverage (existing interactions)';

-- Grant permissions
GRANT SELECT ON public.v_coverage_priority TO authenticated;
GRANT SELECT ON public.v_coverage_priority TO anon;