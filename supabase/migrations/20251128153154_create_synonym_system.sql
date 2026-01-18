/*
  # Synonym System for Supplement/Medication Name Resolution

  1. New Tables
    - `supplement_synonyms` - Maps alternative names to canonical supplement names
    - `medication_synonyms` - Maps alternative names to canonical medication names
  
  2. Helper Views
    - `v_supp_keys` - Union of canonical names and synonyms for lookups
    - `v_med_keys` - Union of canonical names and synonyms for lookups
  
  3. Purpose
    - Enable flexible name matching for CSV imports
    - Resolve common variations: "Fish Oil (Omega-3)" → "Fish Oil", "CoQ10" → "Coenzyme Q10"
    - Maintain clean canonical names while accepting variants
  
  4. Security
    - No RLS needed (reference data)
*/

-- Supplement synonyms table
CREATE TABLE IF NOT EXISTS supplement_synonyms (
  synonym_key text PRIMARY KEY,           -- lowercased trimmed synonym
  canonical_key text NOT NULL             -- lowercased trimmed supplements.name
);

-- Medication synonyms table
CREATE TABLE IF NOT EXISTS medication_synonyms (
  synonym_key text PRIMARY KEY,
  canonical_key text NOT NULL
);

-- Helper view: canonical resolution for supplements (exact → synonym)
CREATE OR REPLACE VIEW v_supp_keys AS
SELECT lower(trim(name)) AS key, lower(trim(name)) AS canonical 
FROM supplements
UNION
SELECT synonym_key AS key, canonical_key AS canonical 
FROM supplement_synonyms;

-- Helper view: canonical resolution for medications (exact → synonym)
CREATE OR REPLACE VIEW v_med_keys AS
SELECT lower(trim(name)) AS key, lower(trim(name)) AS canonical 
FROM medications
UNION
SELECT synonym_key AS key, canonical_key AS canonical 
FROM medication_synonyms;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_supplement_synonyms_canonical 
  ON supplement_synonyms(canonical_key);

CREATE INDEX IF NOT EXISTS idx_medication_synonyms_canonical 
  ON medication_synonyms(canonical_key);
