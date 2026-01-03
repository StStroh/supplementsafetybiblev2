/*
  # Update checker_get_interactions to Return New Fields

  1. Changes
    - Return severity_norm, user_action, and severity_raw
    - Use enhanced view for complete field set
    - Maintain backward compatibility

  2. Purpose
    - Support new world-class results UI
    - Provide normalized severity and user action guidance
*/

DROP FUNCTION IF EXISTS checker_get_interactions(text[]);

CREATE OR REPLACE FUNCTION checker_get_interactions(input_names text[])
RETURNS jsonb
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  v_results jsonb := '[]'::jsonb;
  v_summary jsonb;
  v_substance_ids text[];
  v_major_count int := 0;
  v_moderate_count int := 0;
  v_minor_count int := 0;
  v_monitor_count int := 0;
  v_interaction jsonb;
  v_severity_norm text;
BEGIN
  -- Step 1: Resolve input names to substance IDs via token lookup
  SELECT array_agg(DISTINCT substance_id)
  INTO v_substance_ids
  FROM checker_substance_tokens
  WHERE token = ANY(
    SELECT norm_token(unnest(input_names))
  );
  
  -- If we found fewer than 2 substances, return empty results
  IF v_substance_ids IS NULL OR array_length(v_substance_ids, 1) < 2 THEN
    RETURN jsonb_build_object(
      'results', '[]'::jsonb,
      'summary', jsonb_build_object(
        'total', 0,
        'major', 0,
        'moderate', 0,
        'minor', 0,
        'monitor', 0
      )
    );
  END IF;
  
  -- Step 2: Find all interactions using the enhanced view
  FOR v_interaction, v_severity_norm IN
    SELECT 
      jsonb_build_object(
        'interaction_id', v.interaction_id,
        'substance_a', jsonb_build_object(
          'id', v.substance_a_id,
          'name', v.substance_a_name,
          'type', v.substance_a_type
        ),
        'substance_b', jsonb_build_object(
          'id', v.substance_b_id,
          'name', v.substance_b_name,
          'type', v.substance_b_type
        ),
        'interaction_type', v.interaction_type,
        'severity_norm', v.severity_norm,
        'severity_raw', v.severity_raw,
        'user_action', v.user_action,
        'summary_short', v.summary_short,
        'mechanism', v.mechanism,
        'clinical_effect', v.clinical_effect,
        'management', v.management,
        'evidence_grade', v.evidence_grade,
        'confidence', v.confidence,
        'writeup_markdown', v.writeup_markdown,
        'citations', v.citations
      ) as interaction_data,
      v.severity_norm
    FROM checker_interactions_enriched_v2 v
    WHERE v.substance_a_id = ANY(v_substance_ids)
      AND v.substance_b_id = ANY(v_substance_ids)
      AND v.substance_a_id < v.substance_b_id
    ORDER BY
      CASE v.severity_norm
        WHEN 'major' THEN 1
        WHEN 'moderate' THEN 2
        WHEN 'minor' THEN 3
        WHEN 'monitor' THEN 4
        ELSE 5
      END,
      v.substance_a_name,
      v.substance_b_name
  LOOP
    v_results := v_results || v_interaction;
    
    -- Count by normalized severity
    CASE v_severity_norm
      WHEN 'major' THEN v_major_count := v_major_count + 1;
      WHEN 'moderate' THEN v_moderate_count := v_moderate_count + 1;
      WHEN 'minor' THEN v_minor_count := v_minor_count + 1;
      WHEN 'monitor' THEN v_monitor_count := v_monitor_count + 1;
      ELSE NULL;
    END CASE;
  END LOOP;
  
  -- Step 3: Build summary with normalized severity counts
  v_summary := jsonb_build_object(
    'total', v_major_count + v_moderate_count + v_minor_count + v_monitor_count,
    'major', v_major_count,
    'moderate', v_moderate_count,
    'minor', v_minor_count,
    'monitor', v_monitor_count
  );
  
  -- Return complete result
  RETURN jsonb_build_object(
    'results', v_results,
    'summary', v_summary
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.checker_get_interactions(text[]) TO anon, authenticated;

COMMENT ON FUNCTION public.checker_get_interactions IS
  'Returns interactions with normalized severity (major/moderate/minor/monitor) and user action guidance';
