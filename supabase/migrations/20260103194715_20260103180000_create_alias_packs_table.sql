/*
  # Create Alias Packs System

  1. New Tables
    - `alias_packs`
      - `alias_id` (uuid, primary key) - Unique identifier for each alias
      - `brand_name` (text, not null) - Brand/common name (e.g., "Tylenol", "Advil", "Fish Oil")
      - `canonical_name` (text, not null) - Generic/canonical name (e.g., "acetaminophen", "ibuprofen")
      - `substance_id` (text, foreign key) - Links to checker_substances
      - `created_at` (timestamptz) - When alias was created
      - `is_active` (boolean) - For soft deletes, defaults to true
      - `notes` (text, nullable) - Optional notes about the alias

  2. Indexes
    - Index on brand_name for fast lookups
    - Index on canonical_name for reverse lookups
    - Index on substance_id for joins

  3. Security
    - Enable RLS on alias_packs table
    - Allow public read access (authenticated and anon users can read)
    - Only admins can insert/update/delete
    
  4. Purpose
    - Maps brand names to generic substance names
    - Enables "smart" autocomplete that understands common brand names
    - Examples: "Tylenol" → "acetaminophen", "Advil" → "ibuprofen"
    - Improves UX by reducing dead ends in autocomplete
*/

-- Create alias_packs table
CREATE TABLE IF NOT EXISTS alias_packs (
  alias_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_name text NOT NULL,
  canonical_name text NOT NULL,
  substance_id text REFERENCES checker_substances(substance_id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true,
  notes text,
  
  -- Ensure brand_name is unique per substance
  CONSTRAINT unique_brand_per_substance UNIQUE (brand_name, substance_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_alias_packs_brand_name ON alias_packs(brand_name);
CREATE INDEX IF NOT EXISTS idx_alias_packs_canonical_name ON alias_packs(canonical_name);
CREATE INDEX IF NOT EXISTS idx_alias_packs_substance_id ON alias_packs(substance_id);
CREATE INDEX IF NOT EXISTS idx_alias_packs_active ON alias_packs(is_active) WHERE is_active = true;

-- Enable RLS
ALTER TABLE alias_packs ENABLE ROW LEVEL SECURITY;

-- Public can read active aliases
CREATE POLICY "Anyone can view active aliases"
  ON alias_packs
  FOR SELECT
  USING (is_active = true);

-- Only service role can modify (admin operations)
CREATE POLICY "Service role can insert aliases"
  ON alias_packs
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update aliases"
  ON alias_packs
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete aliases"
  ON alias_packs
  FOR DELETE
  TO service_role
  USING (true);

-- Add some common brand name aliases
INSERT INTO alias_packs (brand_name, canonical_name, substance_id, notes)
SELECT 
  'Tylenol',
  'acetaminophen',
  substance_id,
  'Common pain reliever brand name'
FROM checker_substances 
WHERE canonical_name = 'acetaminophen'
ON CONFLICT (brand_name, substance_id) DO NOTHING;

INSERT INTO alias_packs (brand_name, canonical_name, substance_id, notes)
SELECT 
  'Advil',
  'ibuprofen',
  substance_id,
  'Common NSAID brand name'
FROM checker_substances 
WHERE canonical_name = 'ibuprofen'
ON CONFLICT (brand_name, substance_id) DO NOTHING;

INSERT INTO alias_packs (brand_name, canonical_name, substance_id, notes)
SELECT 
  'Motrin',
  'ibuprofen',
  substance_id,
  'Another common NSAID brand name'
FROM checker_substances 
WHERE canonical_name = 'ibuprofen'
ON CONFLICT (brand_name, substance_id) DO NOTHING;

INSERT INTO alias_packs (brand_name, canonical_name, substance_id, notes)
SELECT 
  'Aleve',
  'naproxen',
  substance_id,
  'Common NSAID brand name'
FROM checker_substances 
WHERE canonical_name = 'naproxen'
ON CONFLICT (brand_name, substance_id) DO NOTHING;

-- Fish Oil variations
INSERT INTO alias_packs (brand_name, canonical_name, substance_id, notes)
SELECT 
  'Fish Oil',
  'omega-3 fatty acids',
  substance_id,
  'Common supplement name'
FROM checker_substances 
WHERE canonical_name = 'omega-3 fatty acids'
ON CONFLICT (brand_name, substance_id) DO NOTHING;

INSERT INTO alias_packs (brand_name, canonical_name, substance_id, notes)
SELECT 
  'Omega-3',
  'omega-3 fatty acids',
  substance_id,
  'Shortened supplement name'
FROM checker_substances 
WHERE canonical_name = 'omega-3 fatty acids'
ON CONFLICT (brand_name, substance_id) DO NOTHING;

-- Magnesium variations
INSERT INTO alias_packs (brand_name, canonical_name, substance_id, notes)
SELECT 
  'Mag Glycinate',
  'magnesium glycinate',
  substance_id,
  'Common shorthand for magnesium glycinate'
FROM checker_substances 
WHERE canonical_name = 'magnesium glycinate'
ON CONFLICT (brand_name, substance_id) DO NOTHING;

-- Create helper function to search with aliases included
CREATE OR REPLACE FUNCTION search_with_aliases(search_term text)
RETURNS TABLE (
  substance_id text,
  display_name text,
  canonical_name text,
  type text,
  match_source text
) AS $$
BEGIN
  RETURN QUERY
  -- First, search direct matches in substances
  SELECT 
    s.substance_id,
    s.display_name,
    s.canonical_name,
    s.type,
    'direct'::text as match_source
  FROM checker_substances s
  WHERE 
    s.canonical_name ILIKE '%' || search_term || '%'
    OR s.display_name ILIKE '%' || search_term || '%'
  
  UNION
  
  -- Then, search aliases
  SELECT 
    s.substance_id,
    s.display_name,
    s.canonical_name,
    s.type,
    'alias'::text as match_source
  FROM checker_substances s
  JOIN alias_packs ap ON s.substance_id = ap.substance_id
  WHERE 
    ap.is_active = true
    AND ap.brand_name ILIKE '%' || search_term || '%'
  
  ORDER BY match_source, display_name;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
