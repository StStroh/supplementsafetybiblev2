/*
  # Prevent Low-Quality Filler Interactions (Adjusted)
  
  1. Purpose
    - Block insertion of placeholder/filler interaction content
    - Enforce quality standards without breaking existing valid short text
    - Prevent future database pollution with meaningless entries
  
  2. Constraints Added
    - checker_interactions_no_filler_text: Blocks common filler phrases
    - checker_interactions_minimum_meaningful_text: Enforces basic length (10 chars minimum)
  
  3. Forbidden Content
    - Exact matches (case-insensitive, trimmed):
      * "No interaction.", "No significant interaction."
      * "No mechanism.", "No mechanism"
      * "No effects.", "No effects"
      * "Safe.", "None", "N/A", "OK"
  
  4. Minimum Length Requirements (relaxed)
    - All key fields: >= 10 characters (allows valid short text like "Use caution.")
    - Blocks truly empty or single-word placeholders
*/

-- Constraint 1: Block known filler phrases (case-insensitive, trimmed)
ALTER TABLE checker_interactions
ADD CONSTRAINT checker_interactions_no_filler_text CHECK (
  -- Prevent filler in summary_short
  LOWER(TRIM(summary_short)) NOT IN (
    'no interaction.',
    'no significant interaction.',
    'no interaction',
    'none',
    'none.',
    'n/a',
    'na',
    'safe.',
    'safe',
    'ok',
    'ok.'
  )
  AND
  -- Prevent filler in mechanism
  LOWER(TRIM(mechanism)) NOT IN (
    'no mechanism.',
    'no mechanism',
    'none',
    'none.',
    'n/a',
    'na',
    'safe.',
    'safe',
    'ok',
    'ok.'
  )
  AND
  -- Prevent filler in clinical_effect
  LOWER(TRIM(clinical_effect)) NOT IN (
    'no effects.',
    'no effects',
    'none',
    'none.',
    'n/a',
    'na',
    'safe.',
    'safe',
    'ok',
    'ok.'
  )
  AND
  -- Prevent filler in management
  LOWER(TRIM(management)) NOT IN (
    'safe.',
    'safe',
    'none',
    'none.',
    'n/a',
    'na',
    'ok',
    'ok.'
  )
);

-- Constraint 2: Enforce minimum meaningful length (10 chars - allows valid short text)
ALTER TABLE checker_interactions
ADD CONSTRAINT checker_interactions_minimum_meaningful_text CHECK (
  LENGTH(TRIM(summary_short)) >= 10
  AND LENGTH(TRIM(mechanism)) >= 10
  AND LENGTH(TRIM(clinical_effect)) >= 10
  AND LENGTH(TRIM(management)) >= 10
);

-- Verification: Check that all existing rows pass the new constraints
DO $$
DECLARE
  filler_count INTEGER;
  short_text_count INTEGER;
BEGIN
  -- Check for filler content
  SELECT COUNT(*) INTO filler_count
  FROM checker_interactions
  WHERE LOWER(TRIM(summary_short)) IN ('no interaction.', 'no significant interaction.', 'no interaction', 'none', 'none.', 'n/a', 'na', 'safe.', 'safe', 'ok', 'ok.')
     OR LOWER(TRIM(mechanism)) IN ('no mechanism.', 'no mechanism', 'none', 'none.', 'n/a', 'na', 'safe.', 'safe', 'ok', 'ok.')
     OR LOWER(TRIM(clinical_effect)) IN ('no effects.', 'no effects', 'none', 'none.', 'n/a', 'na', 'safe.', 'safe', 'ok', 'ok.')
     OR LOWER(TRIM(management)) IN ('safe.', 'safe', 'none', 'none.', 'n/a', 'na', 'ok', 'ok.');
  
  -- Check for too-short text
  SELECT COUNT(*) INTO short_text_count
  FROM checker_interactions
  WHERE LENGTH(TRIM(summary_short)) < 10
     OR LENGTH(TRIM(mechanism)) < 10
     OR LENGTH(TRIM(clinical_effect)) < 10
     OR LENGTH(TRIM(management)) < 10;
  
  -- Report results
  RAISE NOTICE 'Verification complete:';
  RAISE NOTICE '  - Rows with filler content: %', filler_count;
  RAISE NOTICE '  - Rows with text too short: %', short_text_count;
  
  IF filler_count > 0 OR short_text_count > 0 THEN
    RAISE EXCEPTION 'Database contains % filler rows and % short-text rows. Clean data before applying constraints.', filler_count, short_text_count;
  ELSE
    RAISE NOTICE '✓ All existing rows pass quality checks. Constraints applied successfully.';
  END IF;
END $$;
