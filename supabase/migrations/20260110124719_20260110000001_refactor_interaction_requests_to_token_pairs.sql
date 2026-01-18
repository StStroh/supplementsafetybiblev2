/*
  # Refactor interaction_requests to use token_a/token_b

  1. Changes
    - Rename substance_name → token_a
    - Rename interaction_with → token_b
    - Add token_a_norm (normalized version)
    - Add token_b_norm (normalized version)
    - Rename notes → note for consistency
    - Remove substance_type (not needed with token pairs)
    - Remove request_count (not needed)
    - Remove priority_score (can derive from user_tier)
    
  2. Notes
    - Drops dependent views first
    - Preserves existing data where possible
    - Normalizes existing substance names
    - Maintains status, reason, user_tier, user_id, created_at
*/

-- Drop dependent views first
DROP VIEW IF EXISTS interaction_request_summary CASCADE;
DROP VIEW IF EXISTS v_requested_tokens_missing CASCADE;

-- Add new columns if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'interaction_requests' AND column_name = 'token_a'
  ) THEN
    ALTER TABLE interaction_requests 
    ADD COLUMN token_a TEXT,
    ADD COLUMN token_b TEXT,
    ADD COLUMN token_a_norm TEXT,
    ADD COLUMN token_b_norm TEXT,
    ADD COLUMN note TEXT;
  END IF;
END $$;

-- Migrate existing data
DO $$
BEGIN
  -- Copy substance_name to token_a and interaction_with to token_b
  UPDATE interaction_requests
  SET 
    token_a = substance_name,
    token_b = interaction_with,
    token_a_norm = lower(trim(regexp_replace(substance_name, '\s+', ' ', 'g'))),
    token_b_norm = CASE 
      WHEN interaction_with IS NOT NULL 
      THEN lower(trim(regexp_replace(interaction_with, '\s+', ' ', 'g')))
      ELSE NULL
    END,
    note = COALESCE(notes, '')
  WHERE token_a IS NULL;
END $$;

-- Make token_a NOT NULL after migration
DO $$
BEGIN
  ALTER TABLE interaction_requests 
  ALTER COLUMN token_a SET NOT NULL;
EXCEPTION
  WHEN others THEN 
    RAISE NOTICE 'Could not set token_a to NOT NULL, some rows may be missing data';
END $$;

-- Drop old columns
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'interaction_requests' AND column_name = 'substance_name'
  ) THEN
    ALTER TABLE interaction_requests 
    DROP COLUMN substance_name,
    DROP COLUMN substance_type,
    DROP COLUMN interaction_with,
    DROP COLUMN notes,
    DROP COLUMN request_count,
    DROP COLUMN priority_score;
  END IF;
END $$;

-- Update status values to align with new schema
UPDATE interaction_requests
SET status = CASE
  WHEN status = 'pending' THEN 'new'
  WHEN status = 'in_review' THEN 'in_review'
  WHEN status = 'added' THEN 'completed'
  WHEN status = 'declined' THEN 'declined'
  WHEN status = 'priority_new' THEN 'priority_new'
  ELSE 'new'
END
WHERE status IN ('pending', 'in_review', 'added', 'declined');

-- Create indexes on token pairs for quick lookups
CREATE INDEX IF NOT EXISTS idx_interaction_requests_tokens 
  ON interaction_requests(token_a, token_b);

CREATE INDEX IF NOT EXISTS idx_interaction_requests_normalized 
  ON interaction_requests(token_a_norm, token_b_norm);

CREATE INDEX IF NOT EXISTS idx_interaction_requests_status_created 
  ON interaction_requests(status, created_at DESC);

-- Recreate v_requested_tokens_missing view with new schema
CREATE OR REPLACE VIEW v_requested_tokens_missing AS
SELECT 
  token_a_norm as token,
  COUNT(*) as request_count,
  MAX(created_at) as last_requested,
  ARRAY_AGG(DISTINCT user_tier) FILTER (WHERE user_tier IS NOT NULL) as tiers,
  status
FROM interaction_requests
WHERE token_a_norm IS NOT NULL
GROUP BY token_a_norm, status
ORDER BY request_count DESC, last_requested DESC;

COMMENT ON VIEW v_requested_tokens_missing IS 'Shows most frequently requested tokens from interaction requests';

GRANT SELECT ON v_requested_tokens_missing TO authenticated;
GRANT SELECT ON v_requested_tokens_missing TO anon;

-- Add table comments
COMMENT ON TABLE interaction_requests IS 'User requests for interaction reviews between two substances';
COMMENT ON COLUMN interaction_requests.token_a IS 'First substance name (as entered by user)';
COMMENT ON COLUMN interaction_requests.token_b IS 'Second substance name (as entered by user)';
COMMENT ON COLUMN interaction_requests.token_a_norm IS 'Normalized version of token_a (lowercase, trimmed, spaces collapsed)';
COMMENT ON COLUMN interaction_requests.token_b_norm IS 'Normalized version of token_b (lowercase, trimmed, spaces collapsed)';
COMMENT ON COLUMN interaction_requests.note IS 'User-provided note or context for the request';
COMMENT ON COLUMN interaction_requests.reason IS 'Reason for request: missing_token, missing_interaction, unclear_result';
COMMENT ON COLUMN interaction_requests.user_tier IS 'User plan tier at time of request: free, pro, clinical';
COMMENT ON COLUMN interaction_requests.status IS 'Request status: new, priority_new, in_review, completed, declined';
