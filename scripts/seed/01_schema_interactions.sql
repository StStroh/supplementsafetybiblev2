/*
  # Interaction Checker Schema - Production Grade

  1. Tables
    - `supplements` - Normalized supplement catalog
    - `medications` - Normalized medication catalog
    - `interactions` - Curated interaction pairs with evidence
    - `interactions_quarantine` - Failed/duplicate imports for review
    - `events_log` - Webhook/import event tracking (idempotency)

  2. Features
    - UUID primary keys for all tables
    - Normalized name columns for fast exact matching
    - JSONB sources for flexible evidence storage
    - Quarantine table prevents data loss on import conflicts
    - is_active flag for soft deletion

  3. Security
    - RLS enabled on all tables
    - Public read access for interactions (free tier)
    - Admin-only write access
*/

-- Supplements table
CREATE TABLE IF NOT EXISTS supplements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_norm text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Medications table
CREATE TABLE IF NOT EXISTS medications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_norm text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Interactions table
CREATE TABLE IF NOT EXISTS interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplement_id uuid REFERENCES supplements(id) ON DELETE CASCADE,
  medication_id uuid REFERENCES medications(id) ON DELETE CASCADE,
  severity text NOT NULL CHECK (severity IN ('low', 'moderate', 'high', 'severe')),
  description text NOT NULL,
  recommendation text NOT NULL,
  mechanism text,
  last_reviewed date,
  sources jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(supplement_id, medication_id)
);

-- Quarantine table for problematic imports
CREATE TABLE IF NOT EXISTS interactions_quarantine (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  raw jsonb NOT NULL,
  reason text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Events log for idempotency (webhook/import tracking)
CREATE TABLE IF NOT EXISTS events_log (
  event_id text PRIMARY KEY,
  event_type text NOT NULL,
  payload jsonb,
  processed_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE supplements ENABLE ROW LEVEL SECURITY;
ALTER TABLE medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions_quarantine ENABLE ROW LEVEL SECURITY;
ALTER TABLE events_log ENABLE ROW LEVEL SECURITY;

-- Public read access for supplements/medications/interactions
CREATE POLICY IF NOT EXISTS "Public can read supplements"
  ON supplements FOR SELECT
  USING (true);

CREATE POLICY IF NOT EXISTS "Public can read medications"
  ON medications FOR SELECT
  USING (true);

CREATE POLICY IF NOT EXISTS "Public can read active interactions"
  ON interactions FOR SELECT
  USING (is_active = true);

-- Admin-only policies (service role only)
CREATE POLICY IF NOT EXISTS "Service role can manage supplements"
  ON supplements FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY IF NOT EXISTS "Service role can manage medications"
  ON medications FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY IF NOT EXISTS "Service role can manage interactions"
  ON interactions FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY IF NOT EXISTS "Service role can read quarantine"
  ON interactions_quarantine FOR SELECT
  USING (auth.role() = 'service_role');

CREATE POLICY IF NOT EXISTS "Service role can manage events"
  ON events_log FOR ALL
  USING (auth.role() = 'service_role');
