/*
  # Add Interaction Type Values for Mode Support

  1. Changes
    - Add check constraint for interaction_type values
    - Support both 'supplement-drug' and 'supplement-supplement' types
    - This enables the checker to filter by interaction mode

  2. Notes
    - Existing data uses 'pharmacodynamic' and 'pharmacokinetic'
    - These will be preserved for now, but new data should use the new types
    - Mode filtering will work based on substance types in the pair
*/

-- Add check constraint to allow new interaction_type values
ALTER TABLE checker_interactions 
DROP CONSTRAINT IF EXISTS checker_interactions_interaction_type_check;

-- Allow both old (pharmacodynamic, pharmacokinetic) and new (supplement-drug, supplement-supplement) values
ALTER TABLE checker_interactions
ADD CONSTRAINT checker_interactions_interaction_type_check
CHECK (interaction_type IN ('pharmacodynamic', 'pharmacokinetic', 'supplement-drug', 'supplement-supplement'));
