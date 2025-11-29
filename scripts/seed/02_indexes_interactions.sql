/*
  # Interaction Checker Indexes - Performance Optimized

  1. Indexes
    - `ix_supplements_name_norm` - Fast supplement name lookup
    - `ix_medications_name_norm` - Fast medication name lookup
    - `ix_interactions_pair` - Fast interaction pair lookup
    - `ix_interactions_severity` - Filter by severity
    - `ix_interactions_active` - Filter active interactions
    - `ix_supplements_name_trgm` - Trigram search on supplement names (fuzzy)
    - `ix_medications_name_trgm` - Trigram search on medication names (fuzzy)

  2. Performance Targets
    - Search queries: < 150ms p50
    - Check queries: < 350ms p50 (warm cache)
    - Support 2,400+ interaction pairs
*/

-- Enable pg_trgm extension for fuzzy text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Supplement indexes
CREATE INDEX IF NOT EXISTS ix_supplements_name_norm
  ON supplements(name_norm);

CREATE INDEX IF NOT EXISTS ix_supplements_name_trgm
  ON supplements USING gin(name gin_trgm_ops);

-- Medication indexes
CREATE INDEX IF NOT EXISTS ix_medications_name_norm
  ON medications(name_norm);

CREATE INDEX IF NOT EXISTS ix_medications_name_trgm
  ON medications USING gin(name gin_trgm_ops);

-- Interaction indexes
CREATE INDEX IF NOT EXISTS ix_interactions_pair
  ON interactions(supplement_id, medication_id);

CREATE INDEX IF NOT EXISTS ix_interactions_severity
  ON interactions(severity) WHERE is_active = true;

CREATE INDEX IF NOT EXISTS ix_interactions_active
  ON interactions(is_active);

CREATE INDEX IF NOT EXISTS ix_interactions_supplement
  ON interactions(supplement_id) WHERE is_active = true;

CREATE INDEX IF NOT EXISTS ix_interactions_medication
  ON interactions(medication_id) WHERE is_active = true;

-- Quarantine index
CREATE INDEX IF NOT EXISTS ix_quarantine_created
  ON interactions_quarantine(created_at DESC);

-- Events log index
CREATE INDEX IF NOT EXISTS ix_events_type
  ON events_log(event_type, processed_at DESC);
