/*
  # Add CNS/Sleep Supplement Substances
  
  1. Purpose
    - Add Chamomile, L-theanine, CBD to checker_substances
    - Required for CNS/sleep interaction expansion
    - Kava and Passionflower already exist
  
  2. Substances Added
    - Chamomile: Mild sedative herb
    - L-theanine: Amino acid with calming effects
    - CBD: Cannabidiol with anxiolytic/sedative properties
  
  3. Clinical Relevance
    - All have sedative or anxiolytic activity
    - Important interactions with CNS depressants
*/

INSERT INTO checker_substances (substance_id, canonical_name, type, display_name, aliases, tags, is_active)
VALUES
  ('S_CHAMOMILE', 'chamomile', 'supplement', 'Chamomile', ARRAY['chamomile', 'matricaria', 'german chamomile']::text[], ARRAY['herb', 'sedative', 'sleep']::text[], true),
  ('S_L_THEANINE', 'l-theanine', 'supplement', 'L-Theanine', ARRAY['l-theanine', 'theanine']::text[], ARRAY['amino acid', 'calming', 'focus']::text[], true),
  ('S_CBD', 'cbd', 'supplement', 'CBD', ARRAY['cbd', 'cannabidiol']::text[], ARRAY['cannabinoid', 'anxiolytic']::text[], true)
ON CONFLICT (substance_id) DO NOTHING;
