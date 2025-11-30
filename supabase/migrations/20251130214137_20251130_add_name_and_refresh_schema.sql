/*
  # Add name column and force schema refresh

  1. Changes
    - Add `name` column to `profiles` table (text, nullable)
    - Ensure `activated_at` column exists with proper default
    - Force Supabase schema cache refresh

  2. Purpose
    - Fix "activated_at column does not exist" cache error
    - Support name field in grant-free function
    - Refresh schema metadata in Supabase

  3. Notes
    - Uses IF NOT EXISTS for idempotency
    - Forces cache refresh with table comment update
    - Safe to run multiple times
*/

-- Add name column if missing
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS name text;

-- Ensure activated_at exists with proper default
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS activated_at timestamptz DEFAULT now();

-- Force schema cache refresh by updating table comment
DO $$
BEGIN
  EXECUTE 'COMMENT ON TABLE profiles IS ''User profiles with subscription data. Refreshed: ' || now()::text || '''';
END $$;

-- Verify columns exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'name'
  ) THEN
    RAISE EXCEPTION 'name column was not created';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'activated_at'
  ) THEN
    RAISE EXCEPTION 'activated_at column was not created';
  END IF;

  RAISE NOTICE 'Schema refresh complete. All columns verified.';
END $$;
