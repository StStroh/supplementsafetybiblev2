/*
  # Checker Health Check Function

  1. Purpose
    - Provide live counts of substances, tokens, and interactions
    - Verify checker_get_interactions() returns canonical JSON shape
    - Measure RPC performance with sample input sizes

  2. Returns
    - counts: Live database counts
    - sample_runs: Timed test runs with different input sizes
    - verified: Whether RPC returns correct { results, summary } shape

  3. Usage
    SELECT public.checker_healthcheck();

  4. No Schema Changes
    - This migration only adds a helper function
    - Does not modify existing tables or data
*/

CREATE OR REPLACE FUNCTION public.checker_healthcheck()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  v_result jsonb := '{}'::jsonb;
  v_counts jsonb;
  v_sample_runs jsonb := '[]'::jsonb;
  v_sample_tokens text[];
  v_test_result jsonb;
  v_start_time timestamptz;
  v_end_time timestamptz;
  v_elapsed_ms numeric;
  v_has_results boolean;
  v_has_summary boolean;
  v_summary_has_total boolean;
  v_summary_has_avoid boolean;
  v_summary_has_caution boolean;
  v_summary_has_monitor boolean;
  v_summary_has_info boolean;
  v_verified boolean := false;
BEGIN
  -- ==================================================
  -- STEP 1: GATHER COUNTS
  -- ==================================================

  SELECT jsonb_build_object(
    'substances', (SELECT COUNT(*) FROM checker_substances WHERE is_active = true),
    'substances_total', (SELECT COUNT(*) FROM checker_substances),
    'tokens', (SELECT COUNT(*) FROM checker_substance_tokens),
    'interactions', (SELECT COUNT(*) FROM checker_interactions),
    'interactions_by_severity', (
      SELECT jsonb_object_agg(severity, cnt)
      FROM (
        SELECT severity, COUNT(*) as cnt
        FROM checker_interactions
        GROUP BY severity
        ORDER BY
          CASE severity
            WHEN 'avoid' THEN 1
            WHEN 'caution' THEN 2
            WHEN 'monitor' THEN 3
            WHEN 'info' THEN 4
            ELSE 5
          END
      ) severity_counts
    )
  ) INTO v_counts;

  -- ==================================================
  -- STEP 2: GET SAMPLE TOKENS FOR TESTING
  -- ==================================================

  -- Get 20 unique tokens from the database
  SELECT ARRAY_AGG(DISTINCT token ORDER BY token)
  INTO v_sample_tokens
  FROM (
    SELECT token
    FROM checker_substance_tokens
    LIMIT 20
  ) sample;

  -- If we don't have enough tokens, return early with counts only
  IF v_sample_tokens IS NULL OR array_length(v_sample_tokens, 1) < 2 THEN
    RETURN jsonb_build_object(
      'counts', v_counts,
      'sample_runs', '[]'::jsonb,
      'verified', false,
      'error', 'Not enough tokens in database for testing (need at least 2)'
    );
  END IF;

  -- ==================================================
  -- STEP 3: RUN SAMPLE TESTS WITH DIFFERENT INPUT SIZES
  -- ==================================================

  -- Test 1: 2 inputs (minimum)
  IF array_length(v_sample_tokens, 1) >= 2 THEN
    v_start_time := clock_timestamp();

    BEGIN
      SELECT public.checker_get_interactions(v_sample_tokens[1:2])
      INTO v_test_result;

      v_end_time := clock_timestamp();
      v_elapsed_ms := EXTRACT(EPOCH FROM (v_end_time - v_start_time)) * 1000;

      v_sample_runs := v_sample_runs || jsonb_build_object(
        'label', '2 inputs (minimum)',
        'input_count', 2,
        'elapsed_ms', ROUND(v_elapsed_ms::numeric, 3),
        'summary', v_test_result->'summary',
        'results_count', jsonb_array_length(v_test_result->'results'),
        'success', true
      );
    EXCEPTION WHEN OTHERS THEN
      v_sample_runs := v_sample_runs || jsonb_build_object(
        'label', '2 inputs (minimum)',
        'input_count', 2,
        'success', false,
        'error', SQLERRM
      );
    END;
  END IF;

  -- Test 2: 5 inputs
  IF array_length(v_sample_tokens, 1) >= 5 THEN
    v_start_time := clock_timestamp();

    BEGIN
      SELECT public.checker_get_interactions(v_sample_tokens[1:5])
      INTO v_test_result;

      v_end_time := clock_timestamp();
      v_elapsed_ms := EXTRACT(EPOCH FROM (v_end_time - v_start_time)) * 1000;

      v_sample_runs := v_sample_runs || jsonb_build_object(
        'label', '5 inputs',
        'input_count', 5,
        'elapsed_ms', ROUND(v_elapsed_ms::numeric, 3),
        'summary', v_test_result->'summary',
        'results_count', jsonb_array_length(v_test_result->'results'),
        'success', true
      );
    EXCEPTION WHEN OTHERS THEN
      v_sample_runs := v_sample_runs || jsonb_build_object(
        'label', '5 inputs',
        'input_count', 5,
        'success', false,
        'error', SQLERRM
      );
    END;
  END IF;

  -- Test 3: 10 inputs
  IF array_length(v_sample_tokens, 1) >= 10 THEN
    v_start_time := clock_timestamp();

    BEGIN
      SELECT public.checker_get_interactions(v_sample_tokens[1:10])
      INTO v_test_result;

      v_end_time := clock_timestamp();
      v_elapsed_ms := EXTRACT(EPOCH FROM (v_end_time - v_start_time)) * 1000;

      v_sample_runs := v_sample_runs || jsonb_build_object(
        'label', '10 inputs',
        'input_count', 10,
        'elapsed_ms', ROUND(v_elapsed_ms::numeric, 3),
        'summary', v_test_result->'summary',
        'results_count', jsonb_array_length(v_test_result->'results'),
        'success', true
      );
    EXCEPTION WHEN OTHERS THEN
      v_sample_runs := v_sample_runs || jsonb_build_object(
        'label', '10 inputs',
        'input_count', 10,
        'success', false,
        'error', SQLERRM
      );
    END;
  END IF;

  -- Test 4: 20 inputs (if available)
  IF array_length(v_sample_tokens, 1) >= 20 THEN
    v_start_time := clock_timestamp();

    BEGIN
      SELECT public.checker_get_interactions(v_sample_tokens[1:20])
      INTO v_test_result;

      v_end_time := clock_timestamp();
      v_elapsed_ms := EXTRACT(EPOCH FROM (v_end_time - v_start_time)) * 1000;

      v_sample_runs := v_sample_runs || jsonb_build_object(
        'label', '20 inputs',
        'input_count', 20,
        'elapsed_ms', ROUND(v_elapsed_ms::numeric, 3),
        'summary', v_test_result->'summary',
        'results_count', jsonb_array_length(v_test_result->'results'),
        'success', true
      );
    EXCEPTION WHEN OTHERS THEN
      v_sample_runs := v_sample_runs || jsonb_build_object(
        'label', '20 inputs',
        'input_count', 20,
        'success', false,
        'error', SQLERRM
      );
    END;
  END IF;

  -- ==================================================
  -- STEP 4: VERIFY RPC RETURNS CORRECT JSON SHAPE
  -- ==================================================

  -- Check that the most recent test result has the canonical shape
  IF v_test_result IS NOT NULL THEN
    -- Check for 'results' key
    v_has_results := (v_test_result ? 'results');

    -- Check for 'summary' key
    v_has_summary := (v_test_result ? 'summary');

    -- Check summary has required fields
    IF v_has_summary THEN
      v_summary_has_total := (v_test_result->'summary' ? 'total');
      v_summary_has_avoid := (v_test_result->'summary' ? 'avoid');
      v_summary_has_caution := (v_test_result->'summary' ? 'caution');
      v_summary_has_monitor := (v_test_result->'summary' ? 'monitor');
      v_summary_has_info := (v_test_result->'summary' ? 'info');

      v_verified := v_has_results AND v_has_summary AND
                    v_summary_has_total AND v_summary_has_avoid AND
                    v_summary_has_caution AND v_summary_has_monitor AND
                    v_summary_has_info;
    END IF;
  END IF;

  -- ==================================================
  -- STEP 5: BUILD FINAL RESULT
  -- ==================================================

  v_result := jsonb_build_object(
    'counts', v_counts,
    'sample_runs', v_sample_runs,
    'verified', v_verified,
    'verification_details', jsonb_build_object(
      'has_results_key', v_has_results,
      'has_summary_key', v_has_summary,
      'summary_has_total', v_summary_has_total,
      'summary_has_avoid', v_summary_has_avoid,
      'summary_has_caution', v_summary_has_caution,
      'summary_has_monitor', v_summary_has_monitor,
      'summary_has_info', v_summary_has_info
    ),
    'sample_response', v_test_result,
    'timestamp', now()
  );

  RETURN v_result;
END;
$$;

-- Grant execute to anon and authenticated users
GRANT EXECUTE ON FUNCTION public.checker_healthcheck() TO anon, authenticated;

-- Comment
COMMENT ON FUNCTION public.checker_healthcheck IS
  'Returns health check data: counts, sample RPC runs with timing, and JSON shape verification';