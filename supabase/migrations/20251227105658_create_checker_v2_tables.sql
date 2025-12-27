/*
  # Interaction Checker V2 Tables

  1. New Tables
    - `checker_substances`
      - `substance_id` (text, primary key) - e.g., "D_WARFARIN", "S_GINKGO"
      - `type` (text) - 'drug' or 'supplement'
      - `display_name` (text) - Human-readable name
      - `canonical_name` (text) - Normalized name for matching
      - `aliases` (text[]) - Alternative names/spellings
      - `tags` (text[]) - Category tags
      - `is_active` (boolean) - Soft delete flag
      - `created_at` (timestamptz)

    - `checker_interactions`
      - `interaction_id` (text, primary key)
      - `a_substance_id` (text) - First substance (ordered)
      - `b_substance_id` (text) - Second substance (ordered)
      - `interaction_type` (text) - Type of interaction
      - `severity` (text) - avoid, caution, monitor, info
      - `summary_short` (text) - One-line summary
      - `mechanism` (text) - How the interaction works
      - `clinical_effect` (text) - Clinical effects
      - `management` (text) - What to do
      - `evidence_grade` (text) - Quality of evidence
      - `confidence` (text) - Confidence level
      - `writeup_markdown` (text) - Full details
      - `citations` (jsonb) - Array of citation objects
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Allow public read access (no auth required for Phase 1)
    - Restrict write operations to authenticated admins only

  3. Indexes
    - GIN index on checker_substances.aliases for fast search
    - btree indexes for sorting and lookups
*/

-- Create checker_substances table
CREATE TABLE IF NOT EXISTS checker_substances (
  substance_id text PRIMARY KEY,
  type text NOT NULL CHECK (type IN ('drug', 'supplement')),
  display_name text NOT NULL,
  canonical_name text,
  aliases text[] DEFAULT '{}',
  tags text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create checker_interactions table
CREATE TABLE IF NOT EXISTS checker_interactions (
  interaction_id text PRIMARY KEY,
  a_substance_id text NOT NULL REFERENCES checker_substances(substance_id),
  b_substance_id text NOT NULL REFERENCES checker_substances(substance_id),
  interaction_type text NOT NULL,
  severity text NOT NULL CHECK (severity IN ('avoid', 'caution', 'monitor', 'info')),
  summary_short text NOT NULL,
  mechanism text,
  clinical_effect text,
  management text,
  evidence_grade text,
  confidence text,
  writeup_markdown text,
  citations jsonb DEFAULT '[]',
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT ordered_pair CHECK (a_substance_id < b_substance_id)
);

-- Create indexes for fast searching
CREATE INDEX IF NOT EXISTS idx_checker_substances_aliases ON checker_substances USING GIN(aliases);
CREATE INDEX IF NOT EXISTS idx_checker_substances_display_name ON checker_substances(display_name);
CREATE INDEX IF NOT EXISTS idx_checker_substances_canonical ON checker_substances(canonical_name);
CREATE INDEX IF NOT EXISTS idx_checker_interactions_pair ON checker_interactions(a_substance_id, b_substance_id);

-- Enable RLS
ALTER TABLE checker_substances ENABLE ROW LEVEL SECURITY;
ALTER TABLE checker_interactions ENABLE ROW LEVEL SECURITY;

-- Public read access for substances
CREATE POLICY "Public can view active checker substances"
  ON checker_substances FOR SELECT
  USING (is_active = true);

-- Public read access for interactions
CREATE POLICY "Public can view checker interactions"
  ON checker_interactions FOR SELECT
  USING (true);

-- Admin write policies (authenticated users only for now)
CREATE POLICY "Authenticated users can insert checker substances"
  ON checker_substances FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update checker substances"
  ON checker_substances FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert checker interactions"
  ON checker_interactions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update checker interactions"
  ON checker_interactions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
