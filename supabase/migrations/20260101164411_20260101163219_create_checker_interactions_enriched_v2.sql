/*
  # Create checker_interactions_enriched_v2 View

  1. Purpose
    - Enhanced version of enriched view with human-readable substance names
    - Include both IDs (for filtering) and display names (for UI)
    - Supports bidirectional querying (A+B and B+A)

  2. Schema
    - interaction_id: Primary key
    - substance_a_id, substance_b_id: FK to substances (for filtering)
    - substance_a_name, substance_b_name: Display names (for UI)
    - All interaction fields: severity, summary, management, etc.

  3. Security
    - Inherits RLS from underlying tables
    - Read-only view (no INSERT/UPDATE/DELETE)
*/

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
  ci.severity,
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
  'Enhanced enriched view of checker_interactions with bidirectional query support for customer-facing UI';
