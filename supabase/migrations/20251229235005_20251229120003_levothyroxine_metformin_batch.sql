/*
  # Levothyroxine and Metformin Interactions (Batch 2)
  
  Adds ~40 interactions for:
  - Levothyroxine (both formulations)
  - Metformin
*/

-- ============================================================================
-- LEVOTHYROXINE - Complete interactions
-- ============================================================================
INSERT INTO checker_interactions (interaction_id, a_substance_id, b_substance_id, interaction_type, severity, summary_short, mechanism, clinical_effect, management, evidence_grade, confidence) VALUES
('INT_LEVOTHYROXINE_MAGNESIUM', 'D_LEVOTHYROXINE', 'S_MAGNESIUM', 'pharmacokinetic', 'caution', 'Magnesium reduces levothyroxine absorption.', 'Divalent cations bind levothyroxine.', 'May decrease thyroid hormone levels.', 'Separate by at least 4 hours.', 'moderate', 'Clinical observations'),
('INT_LEVOTHYROXINE_BIOTIN', 'D_LEVOTHYROXINE', 'S_BIOTIN', 'supplement-drug', 'monitor', 'Biotin interferes with thyroid test results, not levothyroxine action.', 'High-dose biotin (>5mg) interferes with immunoassays.', 'Can cause falsely abnormal test results.', 'Discontinue 2-3 days before thyroid testing.', 'high', 'Well-documented lab interference'),
('INT_LEVOTHYROXINE_VITAMIN_D', 'D_LEVOTHYROXINE', 'S_VITAMIN_D', 'supplement-drug', 'info', 'Vitamin D does not interact.', 'No known interaction.', 'Safe to combine.', 'No separation required.', 'high', 'No interaction'),
('INT_LEVOTHYROXINE_FISH_OIL', 'D_LEVOTHYROXINE', 'S_FISH_OIL', 'supplement-drug', 'info', 'Fish oil does not interact.', 'No known mechanism.', 'Safe to combine.', 'No special precautions.', 'high', 'No interaction'),
('INT_LEVOTHYROXINE_COQ10', 'D_LEVOTHYROXINE', 'S_COENZYME_Q10', 'supplement-drug', 'info', 'CoQ10 does not interact.', 'No known interaction.', 'Safe to combine.', 'No special precautions.', 'high', 'No interaction'),
('INT_LEVOTHYROXINE_B12', 'D_LEVOTHYROXINE', 'S_VITAMIN_B12', 'supplement-drug', 'info', 'Vitamin B12 does not interact.', 'No known mechanism.', 'Safe to combine.', 'No special precautions.', 'high', 'No interaction'),
('INT_LEVOTHYROXINE_FOLATE', 'D_LEVOTHYROXINE', 'S_FOLATE', 'supplement-drug', 'info', 'Folate does not interact.', 'No known interaction.', 'Safe to combine.', 'No special precautions.', 'high', 'No interaction'),
('INT_LEVOTHYROXINE_ZINC', 'D_LEVOTHYROXINE', 'S_ZINC', 'supplement-drug', 'info', 'Zinc does not interact.', 'No known mechanism.', 'Safe to combine.', 'No special precautions.', 'high', 'No interaction'),
('INT_LEVOTHYROXINE_PROBIOTICS', 'D_LEVOTHYROXINE', 'S_PROBIOTICS', 'supplement-drug', 'info', 'Probiotics do not interact.', 'No known interaction.', 'Safe to combine.', 'No special precautions.', 'high', 'No interaction'),
('INT_LEVOTHYROXINE_MELATONIN', 'D_LEVOTHYROXINE', 'S_MELATONIN', 'supplement-drug', 'info', 'Melatonin does not interact.', 'No known mechanism.', 'Safe to combine.', 'No special precautions.', 'high', 'No interaction'),
('INT_LEVOTHYROXINE_VITAMIN_C', 'D_LEVOTHYROXINE', 'S_VITAMIN_C', 'supplement-drug', 'info', 'Vitamin C does not interact.', 'No known interaction.', 'Safe to combine.', 'No special precautions.', 'high', 'No interaction'),
('INT_LEVOTHYROXINE_VITAMIN_E', 'D_LEVOTHYROXINE', 'S_VITAMIN_E', 'supplement-drug', 'info', 'Vitamin E does not interact.', 'No known mechanism.', 'Safe to combine.', 'No special precautions.', 'high', 'No interaction'),
('INT_LEVOTHYROXINE_OMEGA3', 'D_LEVOTHYROXINE', 'S_OMEGA3', 'supplement-drug', 'info', 'Omega-3 does not interact.', 'No known interaction.', 'Safe to combine.', 'No special precautions.', 'high', 'No interaction'),
('INT_LEVOTHYROXINE_GINKGO', 'D_LEVOTHYROXINE', 'S_GINKGO', 'supplement-drug', 'info', 'Ginkgo does not interact.', 'No known mechanism.', 'Safe to combine.', 'No special precautions.', 'high', 'No interaction'),
('INT_LEVOTHYROXINE_GARLIC', 'D_LEVOTHYROXINE', 'S_GARLIC', 'supplement-drug', 'info', 'Garlic does not interact.', 'No known interaction.', 'Safe to combine.', 'No special precautions.', 'high', 'No interaction'),

-- SYNTHROID (Levothyroxine brand name) - same interactions
('INT_SYNTHROID_MAGNESIUM', 'D_LEVOTHYROXINE_2', 'S_MAGNESIUM', 'pharmacokinetic', 'caution', 'Magnesium reduces Synthroid absorption.', 'Divalent cations bind levothyroxine.', 'May decrease hormone levels.', 'Separate by at least 4 hours.', 'moderate', 'Clinical observations'),
('INT_SYNTHROID_BIOTIN', 'D_LEVOTHYROXINE_2', 'S_BIOTIN', 'supplement-drug', 'monitor', 'Biotin interferes with thyroid tests.', 'Interferes with immunoassays.', 'Falsely abnormal results.', 'Stop 2-3 days before testing.', 'high', 'Lab interference'),
('INT_SYNTHROID_VITAMIN_D', 'D_LEVOTHYROXINE_2', 'S_VITAMIN_D', 'supplement-drug', 'info', 'Vitamin D does not interact.', 'No interaction.', 'Safe to combine.', 'No separation needed.', 'high', 'No interaction'),
('INT_SYNTHROID_FISH_OIL', 'D_LEVOTHYROXINE_2', 'S_FISH_OIL', 'supplement-drug', 'info', 'Fish oil does not interact.', 'No mechanism.', 'Safe to combine.', 'No precautions.', 'high', 'No interaction'),
('INT_SYNTHROID_COQ10', 'D_LEVOTHYROXINE_2', 'S_COENZYME_Q10', 'supplement-drug', 'info', 'CoQ10 does not interact.', 'No interaction.', 'Safe to combine.', 'No precautions.', 'high', 'No interaction'),

-- ============================================================================
-- METFORMIN - Complete interactions
-- ============================================================================
('INT_METFORMIN_B12', 'D_METFORMIN', 'S_VITAMIN_B12', 'pharmacokinetic', 'monitor', 'Metformin reduces B12 absorption; supplementation may be beneficial.', 'Interferes with calcium-dependent B12 absorption.', 'B12 deficiency in 10-30% with long-term use.', 'Consider B12 500-1000mcg daily or annual monitoring.', 'high', 'Well-established'),
('INT_METFORMIN_FOLATE', 'D_METFORMIN', 'S_FOLATE', 'pharmacokinetic', 'monitor', 'Metformin may reduce folate levels.', 'May interfere with absorption.', 'Some evidence of reduced folate.', 'Consider monitoring or 400-800mcg daily.', 'moderate', 'Some evidence'),
('INT_METFORMIN_COQ10', 'D_METFORMIN', 'S_COENZYME_Q10', 'supplement-drug', 'info', 'CoQ10 may complement metformin.', 'Supports mitochondrial function.', 'Safe to combine.', 'Typical dose: 100-200mg daily.', 'limited', 'Emerging research'),
('INT_METFORMIN_MAGNESIUM', 'D_METFORMIN', 'S_MAGNESIUM', 'supplement-drug', 'monitor', 'Magnesium may complement glucose control.', 'Plays role in insulin sensitivity.', 'May improve glycemic control.', 'Monitor blood glucose. Typical: 200-400mg.', 'moderate', 'Some evidence'),
('INT_METFORMIN_VITAMIN_D', 'D_METFORMIN', 'S_VITAMIN_D', 'supplement-drug', 'info', 'Vitamin D may complement metformin.', 'Associated with insulin sensitivity.', 'Safe to combine.', 'No special precautions.', 'limited', 'Some evidence'),
('INT_METFORMIN_PROBIOTICS', 'D_METFORMIN', 'S_PROBIOTICS', 'supplement-drug', 'info', 'Probiotics may reduce GI side effects.', 'May improve gut tolerance.', 'May reduce nausea, diarrhea.', 'Safe to combine.', 'limited', 'Emerging evidence'),
('INT_METFORMIN_FISH_OIL', 'D_METFORMIN', 'S_FISH_OIL', 'supplement-drug', 'info', 'Fish oil does not interact.', 'No known interaction.', 'Safe to combine.', 'No special precautions.', 'high', 'No interaction'),
('INT_METFORMIN_VITAMIN_C', 'D_METFORMIN', 'S_VITAMIN_C', 'supplement-drug', 'info', 'Vitamin C does not interact.', 'No known mechanism.', 'Safe to combine.', 'No special precautions.', 'high', 'No interaction'),
('INT_METFORMIN_CALCIUM', 'D_METFORMIN', 'S_CALCIUM', 'supplement-drug', 'info', 'Calcium does not interact.', 'No known interaction.', 'Safe to combine.', 'No special precautions.', 'high', 'No interaction'),
('INT_METFORMIN_IRON', 'D_METFORMIN', 'S_IRON', 'supplement-drug', 'info', 'Iron does not interact.', 'No known mechanism.', 'Safe to combine.', 'No special precautions.', 'high', 'No interaction'),
('INT_METFORMIN_ZINC', 'D_METFORMIN', 'S_ZINC', 'supplement-drug', 'info', 'Zinc does not interact.', 'No known interaction.', 'Safe to combine.', 'No special precautions.', 'high', 'No interaction'),
('INT_METFORMIN_ECHINACEA', 'D_METFORMIN', 'S_ECHINACEA', 'supplement-drug', 'info', 'Echinacea does not interact.', 'No known mechanism.', 'Safe to combine.', 'No special precautions.', 'high', 'No interaction'),
('INT_METFORMIN_BIOTIN', 'D_METFORMIN', 'S_BIOTIN', 'supplement-drug', 'info', 'Biotin does not interact.', 'No known interaction.', 'Safe to combine.', 'No special precautions.', 'high', 'No interaction'),
('INT_METFORMIN_VITAMIN_E', 'D_METFORMIN', 'S_VITAMIN_E', 'supplement-drug', 'info', 'Vitamin E does not interact.', 'No known mechanism.', 'Safe to combine.', 'No special precautions.', 'high', 'No interaction'),
('INT_METFORMIN_MELATONIN', 'D_METFORMIN', 'S_MELATONIN', 'supplement-drug', 'info', 'Melatonin does not interact.', 'No known interaction.', 'Safe to combine.', 'No special precautions.', 'high', 'No interaction'),
('INT_METFORMIN_GINSENG', 'D_METFORMIN', 'S_GINSENG', 'supplement-drug', 'monitor', 'Ginseng may affect blood glucose.', 'May have hypoglycemic effects.', 'Monitor blood glucose.', 'Watch for hypoglycemia signs.', 'limited', 'Limited evidence'),
('INT_METFORMIN_ASHWAGANDHA', 'D_METFORMIN', 'S_ASHWAGANDHA', 'supplement-drug', 'info', 'Ashwagandha does not significantly interact.', 'No well-documented interaction.', 'Safe to combine.', 'Standard diabetes monitoring.', 'limited', 'No reports'),
('INT_METFORMIN_GARLIC', 'D_METFORMIN', 'S_GARLIC', 'supplement-drug', 'info', 'Garlic does not significantly interact.', 'No concerning interaction.', 'Safe to combine.', 'No special precautions.', 'high', 'No interaction'),
('INT_METFORMIN_TURMERIC', 'D_METFORMIN', 'S_TURMERIC', 'supplement-drug', 'info', 'Turmeric does not interact.', 'No known mechanism.', 'Safe to combine.', 'No special precautions.', 'high', 'No interaction'),
('INT_METFORMIN_GINKGO', 'D_METFORMIN', 'S_GINKGO', 'supplement-drug', 'info', 'Ginkgo does not interact.', 'No known interaction.', 'Safe to combine.', 'No special precautions.', 'high', 'No interaction')
ON CONFLICT (interaction_id) DO NOTHING;
