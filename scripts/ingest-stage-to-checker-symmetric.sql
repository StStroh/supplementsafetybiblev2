/*
  Symmetric Interaction Ingestion Script

  This script:
  1. Creates a SYMMETRIC unique index on checker_interactions
  2. Processes stage_interactions into checker_interactions
  3. Deduplicates symmetric pairs (A,B) = (B,A)
  4. Keeps the best record per pair based on severity, evidence grade, and confidence
*/

-- Step 1: Drop old asymmetric index and create symmetric unique index
DROP INDEX IF EXISTS uniq_checker_interaction_pair;

CREATE UNIQUE INDEX IF NOT EXISTS idx_checker_interactions_symmetric_pair
ON checker_interactions (
  LEAST(a_substance_id, b_substance_id),
  GREATEST(a_substance_id, b_substance_id)
);

-- Step 2: Ingest from stage_interactions with symmetric deduplication
WITH ranked_stage AS (
  SELECT
    s.*,
    d.substance_id AS drug_id,
    sup.substance_id AS supp_id,
    LEAST(d.substance_id, sup.substance_id) AS min_id,
    GREATEST(d.substance_id, sup.substance_id) AS max_id,
    ROW_NUMBER() OVER (
      PARTITION BY
        LEAST(d.substance_id, sup.substance_id),
        GREATEST(d.substance_id, sup.substance_id)
      ORDER BY
        -- Prioritize by severity (avoid > caution > monitor)
        CASE s.severity
          WHEN 'avoid' THEN 3
          WHEN 'caution' THEN 2
          WHEN 'monitor' THEN 1
        END DESC,
        -- Then by evidence grade (A > B > C > D)
        CASE s.evidence_grade
          WHEN 'A' THEN 4
          WHEN 'B' THEN 3
          WHEN 'C' THEN 2
          WHEN 'D' THEN 1
        END DESC,
        -- Finally by confidence score
        s.confidence DESC
    ) AS rn
  FROM stage_interactions s
  INNER JOIN checker_substances d
    ON LOWER(TRIM(s.med_name)) = LOWER(TRIM(d.display_name))
    AND d.type = 'drug'
  INNER JOIN checker_substances sup
    ON LOWER(TRIM(s.supplement_name)) = LOWER(TRIM(sup.display_name))
    AND sup.type = 'supplement'
  WHERE s.processed = false
),
best_records AS (
  SELECT * FROM ranked_stage WHERE rn = 1
),
upserted AS (
  INSERT INTO checker_interactions (
    interaction_id,
    a_substance_id,
    b_substance_id,
    interaction_type,
    severity,
    summary_short,
    clinical_effect,
    mechanism,
    management,
    evidence_grade,
    confidence,
    citations
  )
  SELECT
    min_id || '_' || max_id,  -- Generate stable interaction_id
    min_id,                    -- Always use min as a_substance_id
    max_id,                    -- Always use max as b_substance_id
    'drug_supplement',         -- Interaction type
    severity,
    summary_short,
    clinical_effect,
    mechanism,
    management,
    evidence_grade,
    confidence::text,          -- Cast integer to text
    CASE
      WHEN citations IS NOT NULL AND citations <> '' THEN
        jsonb_build_array(
          jsonb_build_object('url', citations)
        )
      ELSE NULL
    END
  FROM best_records
  ON CONFLICT (LEAST(a_substance_id, b_substance_id), GREATEST(a_substance_id, b_substance_id))
  DO UPDATE SET
    severity = CASE
      -- Only update if new severity is worse
      WHEN CASE EXCLUDED.severity WHEN 'avoid' THEN 3 WHEN 'caution' THEN 2 WHEN 'monitor' THEN 1 END >
           CASE checker_interactions.severity WHEN 'avoid' THEN 3 WHEN 'caution' THEN 2 WHEN 'monitor' THEN 1 END
      THEN EXCLUDED.severity
      ELSE checker_interactions.severity
    END,
    summary_short = EXCLUDED.summary_short,
    clinical_effect = EXCLUDED.clinical_effect,
    mechanism = EXCLUDED.mechanism,
    management = EXCLUDED.management,
    evidence_grade = EXCLUDED.evidence_grade,
    confidence = EXCLUDED.confidence,
    citations = EXCLUDED.citations,
    updated_at = now()
  RETURNING 1
)
SELECT COUNT(*) AS upserted_count FROM upserted;

-- Step 3: Mark processed records
UPDATE stage_interactions
SET processed = true
WHERE stage_id IN (
  SELECT s.stage_id
  FROM stage_interactions s
  INNER JOIN checker_substances d
    ON LOWER(TRIM(s.med_name)) = LOWER(TRIM(d.display_name))
    AND d.type = 'drug'
  INNER JOIN checker_substances sup
    ON LOWER(TRIM(s.supplement_name)) = LOWER(TRIM(sup.display_name))
    AND sup.type = 'supplement'
  WHERE s.processed = false
);

-- Step 4: Validation report
SELECT
  'Stage Records Total' AS metric,
  COUNT(*)::text AS value
FROM stage_interactions
UNION ALL
SELECT
  'Processed Successfully',
  COUNT(*)::text
FROM stage_interactions
WHERE processed = true
UNION ALL
SELECT
  'Failed to Process',
  COUNT(*)::text
FROM stage_interactions
WHERE processed = false
UNION ALL
SELECT
  'Checker Interactions Total',
  COUNT(*)::text
FROM checker_interactions;
