/*
  # Fix Checker Update Policies

  Remove restrictive update policies temporarily for seeding.
*/

-- Drop update policies
DROP POLICY IF EXISTS "Authenticated users can update checker substances" ON checker_substances;
DROP POLICY IF EXISTS "Authenticated users can update checker interactions" ON checker_interactions;

-- Allow public updates (temporary for seeding with upsert)
CREATE POLICY "Public can update checker substances for seeding"
  ON checker_substances FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can update checker interactions for seeding"
  ON checker_interactions FOR UPDATE
  USING (true)
  WITH CHECK (true);
