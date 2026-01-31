/*
  # Add first_name and magnet_type to lead_magnets table

  1. Changes
    - Add `first_name` column to lead_magnets table
    - Add `magnet_type` column to replace lead_magnet (better naming)
    - Both columns are nullable to support existing records

  2. Notes
    - Existing records will have NULL first_name
    - New submissions will include first_name for personalization
    - magnet_type provides clearer intent than lead_magnet
*/

-- Add first_name column
ALTER TABLE lead_magnets
  ADD COLUMN IF NOT EXISTS first_name text;

-- Add magnet_type column (better naming than lead_magnet)
ALTER TABLE lead_magnets
  ADD COLUMN IF NOT EXISTS magnet_type text;

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_lead_magnets_first_name
  ON lead_magnets(first_name);

CREATE INDEX IF NOT EXISTS idx_lead_magnets_magnet_type
  ON lead_magnets(magnet_type);

-- Add helpful comments
COMMENT ON COLUMN lead_magnets.first_name IS 'First name of the lead for email personalization';
COMMENT ON COLUMN lead_magnets.magnet_type IS 'Type of lead magnet requested (top_20_guide, etc)';
