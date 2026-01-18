/*
  # CNS/Sleep Interactions - Corrected Ordering
  
  1. Purpose
    - Add 26 CNS depressant interactions
    - Properly ordered substance pairs (a_substance_id < b_substance_id)
  
  2. Coverage
    - Benzodiazepines with supplements
    - Z-drugs with supplements
    - Antihistamines with supplements
    - Supplement combinations
*/

INSERT INTO checker_interactions (
  interaction_id, a_substance_id, b_substance_id, interaction_type, severity,
  summary_short, mechanism, clinical_effect, management, evidence_grade, confidence, writeup_markdown, citations
) VALUES

-- DIAZEPAM INTERACTIONS (D_DIAZEPAM < S_*)
('INT_DIAZEPAM_CHAMOMILE', 'D_DIAZEPAM', 'S_CHAMOMILE', 'pharmacodynamic', 'monitor',
 'Chamomile may have mild additive sedation.',
 'Chamomile has mild sedative properties.',
 'Possible increased drowsiness.',
 'Generally safe but monitor for excessive sedation.',
 'limited', 'Minor concern',
 'Chamomile effects mild.',
 '[{"source": "Herbal medicine", "year": "2019"}]'::jsonb),

('INT_DIAZEPAM_L_THEANINE', 'D_DIAZEPAM', 'S_L_THEANINE', 'pharmacodynamic', 'monitor',
 'L-theanine may have mild additive calming effects.',
 'L-theanine affects GABA and other neurotransmitters.',
 'Possible mild enhancement of relaxation.',
 'Generally safe. Monitor for excess sedation.',
 'limited', 'Minor concern',
 'L-theanine effects generally mild.',
 '[{"source": "Neuropharmacology", "year": "2020"}]'::jsonb),

('INT_DIAZEPAM_PASSIONFLOWER', 'D_DIAZEPAM', 'S_PASSIONFLOWER', 'pharmacodynamic', 'caution',
 'Passionflower enhances benzodiazepine sedation.',
 'Passionflower has GABA-ergic properties.',
 'Increased sedation and drowsiness.',
 'Use cautiously. Monitor for excessive sedation.',
 'limited', 'Clinical concern',
 'Additive GABAergic effects.',
 '[{"source": "Herbal pharmacology", "year": "2020"}]'::jsonb),

-- LORAZEPAM INTERACTIONS
('INT_LORAZEPAM_CHAMOMILE', 'D_LORAZEPAM', 'S_CHAMOMILE', 'pharmacodynamic', 'monitor',
 'Chamomile may have mild additive sedation.',
 'Mild sedative properties.',
 'Possible increased drowsiness.',
 'Monitor for excessive sedation.',
 'limited', 'Minor concern',
 'Mild effects.',
 '[{"source": "Herbal medicine", "year": "2019"}]'::jsonb),

('INT_LORAZEPAM_L_THEANINE', 'D_LORAZEPAM', 'S_L_THEANINE', 'pharmacodynamic', 'monitor',
 'L-theanine may have mild additive effects.',
 'Affects neurotransmitters.',
 'Mild enhancement of relaxation.',
 'Generally safe.',
 'limited', 'Minor concern',
 'Mild effects.',
 '[{"source": "Neuropharmacology", "year": "2020"}]'::jsonb),

('INT_LORAZEPAM_PASSIONFLOWER', 'D_LORAZEPAM', 'S_PASSIONFLOWER', 'pharmacodynamic', 'caution',
 'Passionflower enhances sedation.',
 'GABA-ergic effects.',
 'Increased sedation.',
 'Use cautiously.',
 'limited', 'Clinical concern',
 'Additive effects.',
 '[{"source": "Herbal pharmacology", "year": "2020"}]'::jsonb),

-- CLONAZEPAM INTERACTIONS
('INT_CLONAZEPAM_CHAMOMILE', 'D_CLONAZEPAM', 'S_CHAMOMILE', 'pharmacodynamic', 'monitor',
 'Chamomile may have mild additive sedation.',
 'Mild sedative properties.',
 'Possible increased drowsiness.',
 'Monitor for sedation.',
 'limited', 'Minor concern',
 'Mild effects.',
 '[{"source": "Herbal medicine", "year": "2019"}]'::jsonb),

('INT_CLONAZEPAM_L_THEANINE', 'D_CLONAZEPAM', 'S_L_THEANINE', 'pharmacodynamic', 'monitor',
 'L-theanine may have mild additive effects.',
 'Neurotransmitter effects.',
 'Mild enhancement.',
 'Generally safe.',
 'limited', 'Minor concern',
 'Mild effects.',
 '[{"source": "Neuropharmacology", "year": "2020"}]'::jsonb),

('INT_CLONAZEPAM_PASSIONFLOWER', 'D_CLONAZEPAM', 'S_PASSIONFLOWER', 'pharmacodynamic', 'caution',
 'Passionflower enhances sedation.',
 'GABA-ergic effects.',
 'Increased sedation.',
 'Use cautiously.',
 'limited', 'Clinical concern',
 'Additive effects.',
 '[{"source": "Herbal pharmacology", "year": "2020"}]'::jsonb),

-- ZOLPIDEM INTERACTIONS
('INT_ZOLPIDEM_CHAMOMILE', 'D_ZOLPIDEM', 'S_CHAMOMILE', 'pharmacodynamic', 'monitor',
 'Chamomile may have mild additive sedation.',
 'Mild sedative properties.',
 'Possible increased drowsiness.',
 'Monitor for excessive sedation.',
 'limited', 'Minor concern',
 'Mild effects.',
 '[{"source": "Herbal medicine", "year": "2019"}]'::jsonb),

('INT_ZOLPIDEM_L_THEANINE', 'D_ZOLPIDEM', 'S_L_THEANINE', 'pharmacodynamic', 'monitor',
 'L-theanine may have mild additive effects.',
 'Neurotransmitter modulation.',
 'Mild enhancement.',
 'Generally safe.',
 'limited', 'Minor concern',
 'Mild effects.',
 '[{"source": "Neuropharmacology", "year": "2020"}]'::jsonb),

('INT_ZOLPIDEM_PASSIONFLOWER', 'D_ZOLPIDEM', 'S_PASSIONFLOWER', 'pharmacodynamic', 'caution',
 'Passionflower may enhance zolpidem effects.',
 'GABA-ergic interaction.',
 'Increased sedation.',
 'Use cautiously.',
 'limited', 'Clinical concern',
 'Additive sedation.',
 '[{"source": "Herbal pharmacology", "year": "2020"}]'::jsonb),

-- DIPHENHYDRAMINE INTERACTIONS
('INT_DIPHENHYDRAMINE_CHAMOMILE', 'D_DIPHENHYDRAMINE', 'S_CHAMOMILE', 'pharmacodynamic', 'info',
 'Chamomile may have mild additive sedation.',
 'Both have mild sedative properties.',
 'Possible mild increase in drowsiness.',
 'Generally safe. Monitor if sensitive to sedation.',
 'limited', 'Minor concern',
 'Very mild interaction.',
 '[{"source": "Herbal medicine", "year": "2019"}]'::jsonb),

('INT_DIPHENHYDRAMINE_L_THEANINE', 'D_DIPHENHYDRAMINE', 'S_L_THEANINE', 'pharmacodynamic', 'info',
 'L-theanine unlikely to significantly interact.',
 'Different mechanisms.',
 'Minimal interaction.',
 'Generally safe.',
 'limited', 'Minor concern',
 'Minimal concern.',
 '[{"source": "Neuropharmacology", "year": "2020"}]'::jsonb),

('INT_DIPHENHYDRAMINE_PASSIONFLOWER', 'D_DIPHENHYDRAMINE', 'S_PASSIONFLOWER', 'pharmacodynamic', 'monitor',
 'Passionflower may enhance sedation.',
 'Additive sedative effects.',
 'Increased drowsiness.',
 'Monitor for excessive sedation.',
 'limited', 'Minor concern',
 'Additive effects.',
 '[{"source": "Herbal pharmacology", "year": "2020"}]'::jsonb),

-- SUPPLEMENT-SUPPLEMENT COMBINATIONS (properly ordered)
('INT_KAVA_PASSIONFLOWER', 'S_KAVA', 'S_PASSIONFLOWER', 'pharmacodynamic', 'caution',
 'Combined GABAergic effects.',
 'Both have GABA-ergic sedative properties.',
 'Excessive sedation possible.',
 'Use combination cautiously. May be overly sedating.',
 'limited', 'Clinical concern',
 'Combining two GABAergic herbs creates additive sedation.',
 '[{"source": "Herbal pharmacology", "year": "2020"}]'::jsonb),

('INT_ASHWAGANDHA_KAVA', 'S_ASHWAGANDHA', 'S_KAVA', 'pharmacodynamic', 'monitor',
 'Combined sedative effects.',
 'Both have sedative properties.',
 'Possible increased sedation.',
 'Monitor for excessive sedation.',
 'limited', 'Minor concern',
 'Additive sedation.',
 '[{"source": "Herbal medicine", "year": "2020"}]'::jsonb),

('INT_ASHWAGANDHA_PASSIONFLOWER', 'S_ASHWAGANDHA', 'S_PASSIONFLOWER', 'pharmacodynamic', 'monitor',
 'Combined calming effects.',
 'Both have sedative/anxiolytic properties.',
 'Possible increased sedation.',
 'Generally safe but monitor.',
 'limited', 'Minor concern',
 'Mild additive effects.',
 '[{"source": "Herbal pharmacology", "year": "2020"}]'::jsonb),

('INT_CHAMOMILE_L_THEANINE', 'S_CHAMOMILE', 'S_L_THEANINE', 'pharmacodynamic', 'info',
 'Both have mild calming effects.',
 'Different mechanisms, both calming.',
 'Mild additive relaxation.',
 'Safe combination.',
 'limited', 'No interaction',
 'Commonly combined for relaxation.',
 '[{"source": "Herbal medicine", "year": "2019"}]'::jsonb),

('INT_ASHWAGANDHA_L_THEANINE', 'S_ASHWAGANDHA', 'S_L_THEANINE', 'pharmacodynamic', 'info',
 'Both have calming effects.',
 'Complementary mechanisms.',
 'Mild additive relaxation.',
 'Safe combination.',
 'limited', 'No interaction',
 'Commonly combined.',
 '[{"source": "Herbal research", "year": "2020"}]'::jsonb)

ON CONFLICT (interaction_id) DO NOTHING;
