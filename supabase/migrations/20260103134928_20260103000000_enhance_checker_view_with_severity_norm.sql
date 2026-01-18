/*
  # Enhance Checker Interactions View with Normalized Severity

  1. New Computed Fields
    - severity_norm: Maps severity to major/moderate/minor/monitor/unknown
    - user_action: Short actionable guidance text
    - severity_raw: Original severity value (for reference)

  2. Purpose
    - Provide better UX with normalized severity labels
    - Surface actionable guidance prominently
    - Maintain backwards compatibility with severity_raw

  3. Mapping Logic
    - avoid → major
    - caution → moderate
    - monitor → monitor
    - info → minor
    - anything else → unknown
*/

-- Drop existing view
DROP VIEW IF EXISTS public.checker_interactions_enriched_v2;

-- Recreate view with enhanced fields
CREATE OR REPLACE VIEW public.checker_interactions_enriched_v2 AS
SELECT
  ci.interaction_id,
  ci.a_substance_id AS substance_a_id,
  ci.b_substance_id AS substance_b_id,
  sa.display_name AS substance_a_name,
  sa.type AS substance_a_type,
  sb.display_name AS substance_b_name,
  sb.type AS substance_b_type,
  ci.interaction_type,
  -- New computed field: severity_norm
  CASE ci.severity
    WHEN 'avoid' THEN 'major'
    WHEN 'caution' THEN 'moderate'
    WHEN 'monitor' THEN 'monitor'
    WHEN 'info' THEN 'minor'
    ELSE 'unknown'
  END AS severity_norm,
  -- New computed field: user_action
  CASE ci.severity
    WHEN 'avoid' THEN 'Avoid this combination unless directed by your healthcare provider'
    WHEN 'caution' THEN 'Use with caution and inform your healthcare provider'
    WHEN 'monitor' THEN 'Monitor for effects and discuss with your healthcare provider'
    WHEN 'info' THEN 'Be aware of potential minor interactions'
    ELSE 'Consult your healthcare provider'
  END AS user_action,
  -- Keep original severity as severity_raw
  ci.severity AS severity_raw,
  ci.summary_short,
  ci.clinical_effect,
  ci.mechanism,
  ci.management,
  ci.evidence_grade,
  ci.confidence,
  ci.writeup_markdown,
  ci.citations
FROM public.checker_interactions ci
JOIN public.checker_substances sa ON sa.substance_id = ci.a_substance_id
JOIN public.checker_substances sb ON sb.substance_id = ci.b_substance_id;

-- Grant read access to anon and authenticated users
GRANT SELECT ON public.checker_interactions_enriched_v2 TO anon, authenticated;

-- Add helpful comment
COMMENT ON VIEW public.checker_interactions_enriched_v2 IS
  'Enhanced view with normalized severity (major/moderate/minor/monitor) and user action guidance';
