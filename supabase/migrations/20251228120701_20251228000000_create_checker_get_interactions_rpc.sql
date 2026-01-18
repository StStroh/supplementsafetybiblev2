/*
  # Create checker_get_interactions RPC Function

  1. Purpose
    - Accept array of substance names
    - Resolve names to substance IDs via token lookup
    - Find all pairwise interactions
    - Return structured results with summary

  2. Returns
    - results: Array of interaction objects with substance details
    - summary: Count of interactions by severity level

  3. Security
    - Public function (no auth required)
    - Read-only operation
*/

CREATE OR REPLACE FUNCTION public.checker_get_interactions(input_names text[])
RETURNS jsonb
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  v_result jsonb;
  v_results jsonb := '[]'::jsonb;
  v_summary jsonb;
  v_substance_ids text[];
  v_avoid_count int := 0;
  v_caution_count int := 0;
  v_monitor_count int := 0;
  v_info_count int := 0;
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
        'avoid', 0,
        'caution', 0,
        'monitor', 0,
        'info', 0
      )
    );
  END IF;

  -- Step 2: Find all interactions between these substances
  FOR v_result IN
    SELECT jsonb_build_object(
      'interaction_id', i.interaction_id,
      'substance_a', jsonb_build_object(
        'id', sa.substance_id,
        'name', sa.display_name,
        'type', sa.type
      ),
      'substance_b', jsonb_build_object(
        'id', sb.substance_id,
        'name', sb.display_name,
        'type', sb.type
      ),
      'interaction_type', i.interaction_type,
      'severity', i.severity,
      'summary_short', i.summary_short,
      'mechanism', i.mechanism,
      'clinical_effect', i.clinical_effect,
      'management', i.management,
      'evidence_grade', i.evidence_grade,
      'confidence', i.confidence,
      'writeup_markdown', i.writeup_markdown,
      'citations', i.citations
    ) as interaction_data
    FROM checker_interactions i
    JOIN checker_substances sa ON sa.substance_id = i.a_substance_id
    JOIN checker_substances sb ON sb.substance_id = i.b_substance_id
    WHERE i.a_substance_id = ANY(v_substance_ids)
      AND i.b_substance_id = ANY(v_substance_ids)
      AND i.a_substance_id < i.b_substance_id  -- Enforce canonical ordering
    ORDER BY
      CASE i.severity
        WHEN 'avoid' THEN 1
        WHEN 'caution' THEN 2
        WHEN 'monitor' THEN 3
        WHEN 'info' THEN 4
        ELSE 5
      END,
      sa.display_name,
      sb.display_name
  LOOP
    v_results := v_results || v_result.interaction_data;

    -- Count by severity
    CASE (v_result.interaction_data->>'severity')
      WHEN 'avoid' THEN v_avoid_count := v_avoid_count + 1;
      WHEN 'caution' THEN v_caution_count := v_caution_count + 1;
      WHEN 'monitor' THEN v_monitor_count := v_monitor_count + 1;
      WHEN 'info' THEN v_info_count := v_info_count + 1;
      ELSE NULL;
    END CASE;
  END LOOP;

  -- Step 3: Build summary
  v_summary := jsonb_build_object(
    'total', v_avoid_count + v_caution_count + v_monitor_count + v_info_count,
    'avoid', v_avoid_count,
    'caution', v_caution_count,
    'monitor', v_monitor_count,
    'info', v_info_count
  );

  -- Return complete result
  RETURN jsonb_build_object(
    'results', v_results,
    'summary', v_summary
  );
END;
$$;

-- Grant execute to public (anon users)
GRANT EXECUTE ON FUNCTION public.checker_get_interactions(text[]) TO anon, authenticated;

-- Comment
COMMENT ON FUNCTION public.checker_get_interactions IS
  'Accepts array of substance names, resolves to IDs via tokens, returns all pairwise interactions with summary';