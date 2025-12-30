/*
  # Remove Low-Quality Filler Interactions
  
  1. Purpose
    - Remove 102 filler interactions with placeholder content
    - These contain meaningless text: "No interaction", "No mechanism", "Safe"
    - Harm database credibility and user trust
  
  2. Deletion Criteria
    - summary_short = 'No interaction.'
    - summary_short = 'No significant interaction.'
    - mechanism = 'No mechanism.'
    - clinical_effect = 'No effects.'
    - management = 'Safe.'
  
  3. Expected Impact
    - ~102 rows deleted
    - Remaining: ~419 high-quality interactions
    - Will be replaced with credible clinical content
*/

-- Delete all filler interactions with placeholder content
DELETE FROM checker_interactions
WHERE 
  summary_short IN ('No interaction.', 'No significant interaction.')
  OR mechanism IN ('No mechanism.', 'No mechanism')
  OR clinical_effect IN ('No effects.', 'No effects')
  OR management = 'Safe.';
