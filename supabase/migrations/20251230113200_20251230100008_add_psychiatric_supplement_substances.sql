/*
  # Add Psychiatric Supplement Substances
  
  1. Purpose
    - Add 5-HTP, SAMe, Tryptophan, Rhodiola to checker_substances
    - Required for SSRI/SNRI interaction expansion
  
  2. Substances Added
    - 5-HTP: Serotonin precursor, high serotonin syndrome risk
    - SAMe: S-Adenosyl methionine, moderate serotonin risk
    - L-Tryptophan: Amino acid serotonin precursor
    - Rhodiola: Adaptogenic herb with monoamine effects
  
  3. Clinical Relevance
    - All have serotonergic or monoaminergic activity
    - Important interactions with antidepressants
*/

INSERT INTO checker_substances (substance_id, canonical_name, type, display_name, aliases, tags, is_active)
VALUES
  ('S_5HTP', '5-htp', 'supplement', '5-HTP', ARRAY['5-htp', '5-hydroxytryptophan', 'oxitriptan']::text[], ARRAY['serotonin precursor', 'mood']::text[], true),
  ('S_SAME', 'same', 'supplement', 'SAMe', ARRAY['same', 's-adenosyl methionine', 's-adenosylmethionine']::text[], ARRAY['methylation', 'mood', 'liver']::text[], true),
  ('S_TRYPTOPHAN', 'tryptophan', 'supplement', 'L-Tryptophan', ARRAY['tryptophan', 'l-tryptophan']::text[], ARRAY['amino acid', 'serotonin precursor', 'sleep']::text[], true),
  ('S_RHODIOLA', 'rhodiola', 'supplement', 'Rhodiola', ARRAY['rhodiola', 'rhodiola rosea', 'golden root']::text[], ARRAY['adaptogen', 'energy', 'mood']::text[], true)
ON CONFLICT (substance_id) DO NOTHING;
