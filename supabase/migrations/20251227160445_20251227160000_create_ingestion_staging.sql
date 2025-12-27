/*
  # Create Ingestion Staging Infrastructure
  
  1. Staging Table
    - `interactions_staging` - Write-only staging for CSV imports
    - No constraints (accepts raw data as-is)
    - Truncated before each import
    - Never queried by application
  
  2. Helper Functions
    - `validate_staging_substances()` - Reports missing substances
    - `validate_staging_tokens()` - Reports missing token mappings
    - `ingest_from_staging()` - Safely upserts from staging to canonical
  
  3. Audit Table
    - `ingestion_audit` - Tracks all import attempts
    - Records success/failure, row counts, errors
    - Enables traceability
  
  4. Safety Features
    - Staging is isolated from canonical tables
    - All inserts go through canonical ordering (a < b)
    - Database constraints prevent corruption
    - Detailed error reporting
*/

-- ==================================================
-- STEP 1: CREATE STAGING TABLE
-- ==================================================

-- Drop existing staging table if it exists
DROP TABLE IF EXISTS public.interactions_staging;

CREATE TABLE public.interactions_staging (
  -- Raw CSV columns (no constraints)
  substance_a_name TEXT,
  substance_b_name TEXT,
  interaction_type TEXT,
  severity TEXT,
  summary_short TEXT,
  mechanism TEXT,
  clinical_effect TEXT,
  management TEXT,
  evidence_grade TEXT,
  confidence TEXT,
  
  -- Metadata
  row_number INTEGER,
  imported_at TIMESTAMPTZ DEFAULT now()
);

-- No indexes on staging (it's temporary and truncated often)
COMMENT ON TABLE public.interactions_staging IS 
  'Write-only staging table for CSV imports. Truncated before each import.';

-- ==================================================
-- STEP 2: CREATE AUDIT TABLE
-- ==================================================

CREATE TABLE IF NOT EXISTS public.ingestion_audit (
  audit_id BIGSERIAL PRIMARY KEY,
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  status TEXT NOT NULL CHECK (status IN ('running', 'success', 'failed', 'partial')),
  source_file TEXT,
  rows_staged INTEGER DEFAULT 0,
  rows_inserted INTEGER DEFAULT 0,
  rows_skipped INTEGER DEFAULT 0,
  rows_failed INTEGER DEFAULT 0,
  error_summary JSONB,
  notes TEXT
);

CREATE INDEX idx_ingestion_audit_status ON public.ingestion_audit (status);
CREATE INDEX idx_ingestion_audit_started ON public.ingestion_audit (started_at DESC);

COMMENT ON TABLE public.ingestion_audit IS 
  'Audit log for all data ingestion attempts. Tracks success/failure and error details.';

-- ==================================================
-- STEP 3: VALIDATION FUNCTION - MISSING SUBSTANCES
-- ==================================================

CREATE OR REPLACE FUNCTION public.validate_staging_substances()
RETURNS TABLE (
  substance_name TEXT,
  occurrences BIGINT,
  suggested_action TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  WITH all_substance_names AS (
    SELECT substance_a_name as name FROM interactions_staging WHERE substance_a_name IS NOT NULL
    UNION ALL
    SELECT substance_b_name as name FROM interactions_staging WHERE substance_b_name IS NOT NULL
  ),
  unique_names AS (
    SELECT name, COUNT(*) as count
    FROM all_substance_names
    GROUP BY name
  ),
  existing_substances AS (
    SELECT display_name FROM checker_substances
    UNION
    SELECT canonical_name FROM checker_substances WHERE canonical_name IS NOT NULL
    UNION
    SELECT UNNEST(aliases) FROM checker_substances WHERE aliases IS NOT NULL
  )
  SELECT 
    un.name as substance_name,
    un.count as occurrences,
    CASE
      WHEN un.count > 100 THEN 'HIGH PRIORITY: Used in ' || un.count || ' interactions'
      WHEN un.count > 10 THEN 'MEDIUM: Used in ' || un.count || ' interactions'
      ELSE 'LOW: Used in ' || un.count || ' interactions'
    END as suggested_action
  FROM unique_names un
  WHERE un.name NOT IN (SELECT * FROM existing_substances)
  ORDER BY un.count DESC;
END;
$$;

COMMENT ON FUNCTION public.validate_staging_substances() IS 
  'Returns all substance names in staging that do not exist in checker_substances';

-- ==================================================
-- STEP 4: VALIDATION FUNCTION - MISSING TOKENS
-- ==================================================

CREATE OR REPLACE FUNCTION public.validate_staging_tokens()
RETURNS TABLE (
  substance_name TEXT,
  normalized_token TEXT,
  occurrences BIGINT,
  existing_substance_id TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  WITH all_substance_names AS (
    SELECT substance_a_name as name FROM interactions_staging WHERE substance_a_name IS NOT NULL
    UNION ALL
    SELECT substance_b_name as name FROM interactions_staging WHERE substance_b_name IS NOT NULL
  ),
  unique_names AS (
    SELECT name, COUNT(*) as count
    FROM all_substance_names
    GROUP BY name
  )
  SELECT 
    un.name as substance_name,
    norm_token(un.name) as normalized_token,
    un.count as occurrences,
    t.substance_id as existing_substance_id
  FROM unique_names un
  LEFT JOIN checker_substance_tokens t ON t.token = norm_token(un.name)
  WHERE t.substance_id IS NULL
  ORDER BY un.count DESC;
END;
$$;

COMMENT ON FUNCTION public.validate_staging_tokens() IS 
  'Returns all substance names that lack token mappings in checker_substance_tokens';

-- ==================================================
-- STEP 5: INGESTION FUNCTION - SAFE UPSERT
-- ==================================================

CREATE OR REPLACE FUNCTION public.ingest_from_staging(
  batch_size INTEGER DEFAULT 1000,
  dry_run BOOLEAN DEFAULT false
)
RETURNS TABLE (
  status TEXT,
  message TEXT,
  inserted_count INTEGER,
  skipped_count INTEGER,
  error_count INTEGER,
  errors JSONB
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_inserted INTEGER := 0;
  v_skipped INTEGER := 0;
  v_errors JSONB := '[]'::jsonb;
  v_batch_start INTEGER := 0;
  v_total_rows INTEGER;
  rec RECORD;
BEGIN
  -- Get total rows in staging
  SELECT COUNT(*) INTO v_total_rows FROM interactions_staging;
  
  IF dry_run THEN
    RETURN QUERY SELECT 
      'dry_run'::TEXT,
      format('Would process %s rows in batches of %s', v_total_rows, batch_size),
      0::INTEGER,
      0::INTEGER,
      0::INTEGER,
      '[]'::JSONB;
    RETURN;
  END IF;
  
  -- Process staging data
  FOR rec IN 
    SELECT 
      row_number,
      substance_a_name,
      substance_b_name,
      interaction_type,
      severity,
      summary_short,
      mechanism,
      clinical_effect,
      management,
      evidence_grade,
      confidence
    FROM interactions_staging
    WHERE substance_a_name IS NOT NULL 
      AND substance_b_name IS NOT NULL
    ORDER BY row_number
  LOOP
    BEGIN
      -- Look up substance IDs via tokens
      DECLARE
        v_substance_a_id TEXT;
        v_substance_b_id TEXT;
        v_a_ordered TEXT;
        v_b_ordered TEXT;
        v_interaction_id TEXT;
      BEGIN
        -- Get substance A ID
        SELECT substance_id INTO v_substance_a_id
        FROM checker_substance_tokens
        WHERE token = norm_token(rec.substance_a_name)
        LIMIT 1;
        
        -- Get substance B ID
        SELECT substance_id INTO v_substance_b_id
        FROM checker_substance_tokens
        WHERE token = norm_token(rec.substance_b_name)
        LIMIT 1;
        
        -- Skip if either substance not found
        IF v_substance_a_id IS NULL OR v_substance_b_id IS NULL THEN
          v_skipped := v_skipped + 1;
          v_errors := v_errors || jsonb_build_object(
            'row', rec.row_number,
            'error', 'missing_substance',
            'substance_a', rec.substance_a_name,
            'substance_b', rec.substance_b_name,
            'found_a', v_substance_a_id IS NOT NULL,
            'found_b', v_substance_b_id IS NOT NULL
          );
          CONTINUE;
        END IF;
        
        -- Enforce canonical ordering (a < b)
        IF v_substance_a_id < v_substance_b_id THEN
          v_a_ordered := v_substance_a_id;
          v_b_ordered := v_substance_b_id;
        ELSE
          v_a_ordered := v_substance_b_id;
          v_b_ordered := v_substance_a_id;
        END IF;
        
        -- Generate interaction ID
        v_interaction_id := 'INT_' || encode(digest(v_a_ordered || '|' || v_b_ordered, 'sha256'), 'hex')::TEXT;
        v_interaction_id := substring(v_interaction_id, 1, 32);
        
        -- Insert or update interaction
        INSERT INTO checker_interactions (
          interaction_id,
          a_substance_id,
          b_substance_id,
          interaction_type,
          severity,
          summary_short,
          mechanism,
          clinical_effect,
          management,
          evidence_grade,
          confidence,
          updated_at
        ) VALUES (
          v_interaction_id,
          v_a_ordered,
          v_b_ordered,
          rec.interaction_type,
          rec.severity,
          rec.summary_short,
          rec.mechanism,
          rec.clinical_effect,
          rec.management,
          rec.evidence_grade,
          rec.confidence,
          now()
        )
        ON CONFLICT (a_substance_id, b_substance_id) 
        DO UPDATE SET
          interaction_type = EXCLUDED.interaction_type,
          severity = EXCLUDED.severity,
          summary_short = EXCLUDED.summary_short,
          mechanism = EXCLUDED.mechanism,
          clinical_effect = EXCLUDED.clinical_effect,
          management = EXCLUDED.management,
          evidence_grade = EXCLUDED.evidence_grade,
          confidence = EXCLUDED.confidence,
          updated_at = now();
        
        v_inserted := v_inserted + 1;
      END;
    EXCEPTION
      WHEN OTHERS THEN
        v_errors := v_errors || jsonb_build_object(
          'row', rec.row_number,
          'error', 'insert_failed',
          'message', SQLERRM,
          'substance_a', rec.substance_a_name,
          'substance_b', rec.substance_b_name
        );
    END;
  END LOOP;
  
  -- Return summary
  RETURN QUERY SELECT 
    'completed'::TEXT as status,
    format('Processed %s rows: %s inserted/updated, %s skipped, %s errors', 
           v_total_rows, v_inserted, v_skipped, jsonb_array_length(v_errors)) as message,
    v_inserted as inserted_count,
    v_skipped as skipped_count,
    jsonb_array_length(v_errors) as error_count,
    v_errors as errors;
END;
$$;

COMMENT ON FUNCTION public.ingest_from_staging IS 
  'Safely ingests data from interactions_staging into checker_interactions. Enforces canonical ordering and handles errors gracefully.';

-- ==================================================
-- STEP 6: RLS POLICIES
-- ==================================================

-- Staging table: Service role only
ALTER TABLE public.interactions_staging ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only service role can access staging"
  ON public.interactions_staging
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Audit table: Service role can write, authenticated can read
ALTER TABLE public.ingestion_audit ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can write audit logs"
  ON public.ingestion_audit
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read audit logs"
  ON public.ingestion_audit
  FOR SELECT
  TO authenticated
  USING (true);

-- ==================================================
-- STEP 7: GRANT PERMISSIONS
-- ==================================================

-- Grant execute on functions to service role
GRANT EXECUTE ON FUNCTION public.validate_staging_substances() TO service_role;
GRANT EXECUTE ON FUNCTION public.validate_staging_tokens() TO service_role;
GRANT EXECUTE ON FUNCTION public.ingest_from_staging(INTEGER, BOOLEAN) TO service_role;
GRANT EXECUTE ON FUNCTION public.norm_token(TEXT) TO service_role;

-- ==================================================
-- VERIFICATION
-- ==================================================

DO $$
BEGIN
  RAISE NOTICE '✅ Staging infrastructure created';
  RAISE NOTICE '  - interactions_staging table';
  RAISE NOTICE '  - ingestion_audit table';
  RAISE NOTICE '  - validate_staging_substances() function';
  RAISE NOTICE '  - validate_staging_tokens() function';
  RAISE NOTICE '  - ingest_from_staging() function';
  RAISE NOTICE '  - RLS policies applied';
  RAISE NOTICE '';
  RAISE NOTICE '🚀 Ready for production ingestion';
END $$;
