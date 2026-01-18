/*
  # Lock Checker Tables to Read-Only for Public

  1. Changes
    - Remove all INSERT/UPDATE/DELETE policies for authenticated users
    - Keep only SELECT policies for public (anon) and authenticated users
    - Only service role can write (via scripts with SUPABASE_SERVICE_ROLE_KEY)

  2. Security
    - Prevents any accidental data modification via client
    - All data ingestion must go through server-side scripts
    - Maintains read access for the checker UI
*/

-- Drop existing write policies for authenticated users
DROP POLICY IF EXISTS "Authenticated users can insert checker substances" ON checker_substances;
DROP POLICY IF EXISTS "Authenticated users can update checker substances" ON checker_substances;
DROP POLICY IF EXISTS "Authenticated users can insert checker interactions" ON checker_interactions;
DROP POLICY IF EXISTS "Authenticated users can update checker interactions" ON checker_interactions;

-- Ensure public read access includes both anon and authenticated
DROP POLICY IF EXISTS "Public can view active checker substances" ON checker_substances;
DROP POLICY IF EXISTS "Public can view checker interactions" ON checker_interactions;

-- Create read-only policies for all users (anon and authenticated)
CREATE POLICY "Anyone can view active checker substances"
  ON checker_substances FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Anyone can view checker interactions"
  ON checker_interactions FOR SELECT
  TO anon, authenticated
  USING (true);

-- No INSERT/UPDATE/DELETE policies = only service role can write
-- This enforces server-side data ingestion only
