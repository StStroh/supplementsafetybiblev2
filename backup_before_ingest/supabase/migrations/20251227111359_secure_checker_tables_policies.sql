/*
  # Secure Checker Tables - Remove Public Write Access

  1. Security Changes
    - Drop all public INSERT policies on checker tables
    - Drop all public UPDATE policies on checker tables
    - Maintain public SELECT (read) access only
    - Write operations require service role (admin/seed scripts only)

  2. Policies After This Migration
    - checker_substances: Public can SELECT only
    - checker_interactions: Public can SELECT only
    - All INSERT/UPDATE operations require service role

  Note: Seeding must be done via:
  - Direct SQL with service role key
  - Server-side scripts using service role
  - NOT via frontend/anon key
*/

-- Drop any existing public write policies
DROP POLICY IF EXISTS "Public can insert checker substances for seeding" ON checker_substances;
DROP POLICY IF EXISTS "Public can update checker substances for seeding" ON checker_substances;
DROP POLICY IF EXISTS "Public can insert checker interactions for seeding" ON checker_interactions;
DROP POLICY IF EXISTS "Public can update checker interactions for seeding" ON checker_interactions;
DROP POLICY IF EXISTS "Authenticated users can insert checker substances" ON checker_substances;
DROP POLICY IF EXISTS "Authenticated users can update checker substances" ON checker_substances;
DROP POLICY IF EXISTS "Authenticated users can insert checker interactions" ON checker_interactions;
DROP POLICY IF EXISTS "Authenticated users can update checker interactions" ON checker_interactions;

-- Ensure public read access remains (already created in initial migration, but recreate if needed)
DROP POLICY IF EXISTS "Public can view active checker substances" ON checker_substances;
DROP POLICY IF EXISTS "Public can view checker interactions" ON checker_interactions;

CREATE POLICY "Public can view active checker substances"
  ON checker_substances FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can view checker interactions"
  ON checker_interactions FOR SELECT
  USING (true);

-- No INSERT or UPDATE policies for anon or authenticated users
-- Service role bypasses RLS and can perform all operations
