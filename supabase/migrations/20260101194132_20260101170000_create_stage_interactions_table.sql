/*
  # Create stage_interactions table for CSV imports

  1. New Tables
    - `stage_interactions`
      - `stage_id` (bigserial, primary key) - Auto-increment ID
      - `med_name` (text) - Medication name from CSV
      - `supplement_name` (text) - Supplement name from CSV
      - `severity` (text) - avoid, caution, monitor
      - `summary_short` (text) - Brief summary
      - `clinical_effect` (text) - Clinical effects description
      - `mechanism` (text) - Mechanism of interaction
      - `management` (text) - Management recommendations
      - `evidence_grade` (text) - A, B, C, D
      - `confidence` (integer) - 0-100
      - `citations` (text) - Pipe-separated URLs
      - `imported_at` (timestamptz) - When row was imported
      - `processed` (boolean) - Whether it's been moved to checker_interactions
      - `import_batch` (text) - Batch identifier for bulk imports

  2. Security
    - Enable RLS on stage_interactions
    - Allow authenticated users to read/write (admin only in practice)

  3. Indexes
    - Index on processed flag for filtering
    - Index on import_batch for batch operations
*/

-- Create stage_interactions table
CREATE TABLE IF NOT EXISTS stage_interactions (
  stage_id bigserial PRIMARY KEY,
  med_name text NOT NULL,
  supplement_name text NOT NULL,
  severity text NOT NULL CHECK (severity IN ('avoid', 'caution', 'monitor')),
  summary_short text NOT NULL,
  clinical_effect text NOT NULL,
  mechanism text NOT NULL,
  management text NOT NULL,
  evidence_grade text NOT NULL CHECK (evidence_grade IN ('A', 'B', 'C', 'D')),
  confidence integer NOT NULL CHECK (confidence >= 0 AND confidence <= 100),
  citations text NOT NULL,
  imported_at timestamptz DEFAULT now(),
  processed boolean DEFAULT false,
  import_batch text
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_stage_interactions_processed ON stage_interactions(processed);
CREATE INDEX IF NOT EXISTS idx_stage_interactions_batch ON stage_interactions(import_batch);
CREATE INDEX IF NOT EXISTS idx_stage_interactions_names ON stage_interactions(med_name, supplement_name);

-- Enable RLS
ALTER TABLE stage_interactions ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can read/write (admin check in application layer)
CREATE POLICY "Authenticated users can read stage_interactions"
  ON stage_interactions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert stage_interactions"
  ON stage_interactions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update stage_interactions"
  ON stage_interactions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete stage_interactions"
  ON stage_interactions
  FOR DELETE
  TO authenticated
  USING (true);
