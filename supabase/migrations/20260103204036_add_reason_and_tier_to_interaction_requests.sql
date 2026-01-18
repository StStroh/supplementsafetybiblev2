/*
  # Add reason and user_tier to interaction_requests

  1. Changes
    - Add reason column (missing_token, missing_interaction, unclear_result)
    - Add user_tier column (free, pro, clinical)

  2. Notes
    - Reason helps categorize requests
    - User tier enables priority-based triage
*/

-- Add reason column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'interaction_requests' AND column_name = 'reason'
  ) THEN
    ALTER TABLE interaction_requests ADD COLUMN reason TEXT;
  END IF;
END $$;

-- Add user_tier column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'interaction_requests' AND column_name = 'user_tier'
  ) THEN
    ALTER TABLE interaction_requests ADD COLUMN user_tier TEXT DEFAULT 'free';
  END IF;
END $$;
