/*
  # Add New Supplement Substances (Corrected Schema)
  
  1. Purpose
    - Add Bromelain, Ginger, Dong Quai to checker_substances
    - Required for anticoagulant interaction expansion
  
  2. Substances Added
    - Bromelain: Proteolytic enzyme with fibrinolytic activity
    - Ginger: Antiplatelet herb
    - Dong Quai: Herbal supplement with coumarin content
  
  3. Clinical Relevance
    - All have documented or theoretical bleeding risk interactions
    - Commonly used supplements requiring monitoring with anticoagulants
*/

INSERT INTO checker_substances (substance_id, canonical_name, type, display_name, aliases, tags, is_active)
VALUES
  ('S_BROMELAIN', 'bromelain', 'supplement', 'Bromelain', ARRAY['bromelain']::text[], ARRAY['enzyme', 'anti-inflammatory']::text[], true),
  ('S_GINGER', 'ginger', 'supplement', 'Ginger', ARRAY['ginger', 'zingiber']::text[], ARRAY['herb', 'antiplatelet']::text[], true),
  ('S_DONG_QUAI', 'dong quai', 'supplement', 'Dong Quai', ARRAY['dong quai', 'angelica sinensis']::text[], ARRAY['herb', 'anticoagulant']::text[], true)
ON CONFLICT (substance_id) DO NOTHING;
