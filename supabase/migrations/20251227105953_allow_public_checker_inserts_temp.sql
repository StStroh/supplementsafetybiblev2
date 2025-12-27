/*
  # Temporarily Allow Public Inserts for Seeding

  Allow public (anon) inserts for seeding purposes.
  These policies should be removed or restricted in production.
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can insert checker substances" ON checker_substances;
DROP POLICY IF EXISTS "Authenticated users can insert checker interactions" ON checker_interactions;

-- Allow public inserts (temporary for seeding)
CREATE POLICY "Public can insert checker substances for seeding"
  ON checker_substances FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can insert checker interactions for seeding"
  ON checker_interactions FOR INSERT
  WITH CHECK (true);
