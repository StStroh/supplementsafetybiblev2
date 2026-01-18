/*
  # Add Hawthorn Supplement
  
  1. New Substance
    - `S_HAWTHORN` - Hawthorn supplement (cardiovascular herb)
  
  2. Rationale
    - Required for BP medication interactions
    - Common cardiovascular supplement with clinical interactions
*/

INSERT INTO checker_substances (substance_id, type, display_name, canonical_name, aliases, tags, is_active)
VALUES (
  'S_HAWTHORN',
  'supplement',
  'Hawthorn',
  'hawthorn',
  ARRAY['hawthorn berry', 'crataegus', 'hawthorn extract'],
  ARRAY['herb', 'cardiovascular', 'heart'],
  true
)
ON CONFLICT (substance_id) DO NOTHING;
