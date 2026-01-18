/*
  # Add Potassium Supplement
  
  1. New Substance
    - `S_POTASSIUM` - Potassium supplement (critical for ACE-I/ARB/diuretic interactions)
  
  2. Rationale
    - Potassium is essential for BP medication interactions (hyperkalemia risk)
    - Required to complete Tier 1 BP medication coverage
    - Clinically critical interaction (avoid level with ACE inhibitors)
*/

-- Add potassium supplement if not exists
INSERT INTO checker_substances (substance_id, type, display_name, canonical_name, aliases, tags, is_active)
VALUES (
  'S_POTASSIUM',
  'supplement',
  'Potassium',
  'potassium',
  ARRAY['potassium chloride', 'potassium citrate', 'potassium gluconate', 'K supplement'],
  ARRAY['mineral', 'electrolyte', 'cardiovascular'],
  true
)
ON CONFLICT (substance_id) DO NOTHING;
