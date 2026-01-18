/*
  # Add Missing Columns to Interactions Table
  
  1. Changes
    - Add `mechanism` column (text) - explains how the interaction works
    - Add `sources` column (jsonb) - stores array of source references
    - Add `last_reviewed` column (timestamptz) - tracks when data was last reviewed
  
  2. Notes
    - All columns are nullable for backward compatibility
    - Existing interactions will have NULL values for these fields
*/

-- Add missing columns to interactions table
DO $$ 
BEGIN
  -- Add mechanism column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'interactions' AND column_name = 'mechanism'
  ) THEN
    ALTER TABLE interactions ADD COLUMN mechanism text;
  END IF;

  -- Add sources column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'interactions' AND column_name = 'sources'
  ) THEN
    ALTER TABLE interactions ADD COLUMN sources jsonb DEFAULT '[]'::jsonb;
  END IF;

  -- Add last_reviewed column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'interactions' AND column_name = 'last_reviewed'
  ) THEN
    ALTER TABLE interactions ADD COLUMN last_reviewed timestamptz;
  END IF;
END $$;
