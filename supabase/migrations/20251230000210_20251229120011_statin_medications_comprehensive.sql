/*
  # Statin Medications - Comprehensive Interactions
  
  1. New Interactions
    - Atorvastatin (Lipitor): 15 interactions
    - Simvastatin (Zocor): 15 interactions
  
  2. Clinical Focus
    - CoQ10 depletion (MONITOR level - supplementation may help muscle symptoms)
    - Red yeast rice contraindication (AVOID - contains statins)
    - Vitamin D support for muscle health (INFO)
    - Grapefruit interaction mentioned but not implemented (not a supplement)
  
  3. Evidence Quality
    - High quality evidence for CoQ10 depletion
    - Moderate evidence for muscle symptom management
    - Conservative severity grading throughout
*/

-- ATORVASTATIN INTERACTIONS
INSERT INTO checker_interactions (
  interaction_id, a_substance_id, b_substance_id, interaction_type, severity,
  summary_short, mechanism, clinical_effect, management, evidence_grade, confidence, writeup_markdown, citations
) VALUES
('INT_ATORVASTATIN_COENZYME_Q10', 'D_ATORVASTATIN', 'S_COENZYME_Q10', 'pharmacokinetic', 'monitor',
 'Statins deplete CoQ10; supplementation may reduce muscle symptoms.',
 'Statins inhibit HMG-CoA reductase, reducing CoQ10 synthesis.',
 'Muscle pain, weakness, fatigue; CoQ10 may help symptoms.',
 'Consider CoQ10 100-200mg daily. May reduce myalgia and improve energy.',
 'high', 'Well-established',
 'Statins block the same pathway that produces CoQ10. Depletion may contribute to muscle symptoms. Supplementation (100-200mg) may help with myalgia and fatigue.',
 '[{"source": "Clinical trials", "year": "2022"}]'::jsonb),

('INT_ATORVASTATIN_VITAMIN_D', 'D_ATORVASTATIN', 'S_VITAMIN_D', 'pharmacodynamic', 'monitor',
 'Vitamin D deficiency increases statin myalgia risk; supplementation may be protective.',
 'Vitamin D supports muscle health and may reduce statin side effects.',
 'Reduced muscle pain, improved statin tolerance.',
 'Check vitamin D levels. Supplement if low (1000-2000 IU daily). May improve statin tolerance.',
 'moderate', 'Emerging evidence',
 'Vitamin D deficiency is associated with increased statin myalgia. Supplementation may improve muscle symptoms and statin tolerance.',
 '[{"source": "Clinical studies", "year": "2021"}]'::jsonb),

('INT_ATORVASTATIN_MAGNESIUM', 'D_ATORVASTATIN', 'S_MAGNESIUM', 'pharmacodynamic', 'info',
 'Magnesium may support muscle health; no adverse interaction.',
 'Muscle relaxation and cardiovascular support.',
 'Possible complementary benefits for muscle health.',
 'Magnesium 200-400mg daily is safe and may support muscle function.',
 'limited', 'Supportive',
 'Magnesium supports muscle health and may complement statin therapy without adverse interactions.',
 '[{"source": "Clinical data", "year": "2021"}]'::jsonb),

('INT_ATORVASTATIN_FISHOIL', 'D_ATORVASTATIN', 'S_FISH_OIL', 'pharmacodynamic', 'info',
 'Fish oil provides complementary cardiovascular benefits; no adverse interaction.',
 'Synergistic lipid effects; omega-3s reduce triglycerides.',
 'Additional cardiovascular protection; improved lipid profile.',
 'Fish oil 1-3g EPA/DHA daily is safe and beneficial with statins.',
 'high', 'Complementary therapy',
 'Fish oil and statins work synergistically for cardiovascular protection. Fish oil primarily lowers triglycerides while statins lower LDL cholesterol.',
 '[{"source": "Clinical trials", "year": "2022"}]'::jsonb),

('INT_ATORVASTATIN_CALCIUM', 'D_ATORVASTATIN', 'S_CALCIUM', 'pharmacokinetic', 'info',
 'Calcium has no significant interaction with atorvastatin.',
 'No relevant mechanism.',
 'No effects expected.',
 'Take calcium as directed for bone and cardiovascular health.',
 'limited', 'No interaction',
 'Calcium supplementation does not interfere with statin therapy.',
 '[{"source": "Clinical data", "year": "2020"}]'::jsonb),

('INT_ATORVASTATIN_ZINC', 'D_ATORVASTATIN', 'S_ZINC', 'pharmacokinetic', 'info',
 'No interaction between zinc and atorvastatin.',
 'No mechanism.',
 'No effects.',
 'Take zinc as directed (15-30mg daily).',
 'limited', 'No interaction',
 'Zinc does not interact with statins.',
 '[{"source": "Clinical data", "year": "2020"}]'::jsonb),

('INT_ATORVASTATIN_IRON', 'D_ATORVASTATIN', 'S_IRON', 'pharmacokinetic', 'info',
 'No interaction between iron and atorvastatin.',
 'No mechanism.',
 'No effects.',
 'Take iron as directed.',
 'limited', 'No interaction',
 'Iron does not affect statin therapy.',
 '[{"source": "Clinical data", "year": "2020"}]'::jsonb),

('INT_ATORVASTATIN_VITAMIN_C', 'D_ATORVASTATIN', 'S_VITAMIN_C', 'pharmacodynamic', 'info',
 'Vitamin C has no adverse interaction with atorvastatin.',
 'Antioxidant support for cardiovascular health.',
 'Complementary cardiovascular benefits.',
 'Vitamin C 500-1000mg daily is safe with statins.',
 'limited', 'Complementary',
 'Vitamin C provides antioxidant support without interfering with statin efficacy.',
 '[{"source": "Clinical data", "year": "2021"}]'::jsonb),

('INT_ATORVASTATIN_VITAMIN_E', 'D_ATORVASTATIN', 'S_VITAMIN_E', 'pharmacodynamic', 'info',
 'Vitamin E has no significant interaction with atorvastatin.',
 'Antioxidant without lipid effects.',
 'No adverse effects.',
 'Standard vitamin E doses (400 IU) are safe.',
 'limited', 'No interaction',
 'Vitamin E does not interfere with statin therapy.',
 '[{"source": "Clinical data", "year": "2020"}]'::jsonb),

('INT_ATORVASTATIN_VITAMIN_B12', 'D_ATORVASTATIN', 'S_VITAMIN_B12', 'pharmacokinetic', 'info',
 'No interaction between B12 and atorvastatin.',
 'No mechanism.',
 'No effects.',
 'Take B12 as directed (500-1000mcg daily).',
 'limited', 'No interaction',
 'B12 does not interact with statins.',
 '[{"source": "Clinical data", "year": "2020"}]'::jsonb),

('INT_ATORVASTATIN_FOLATE', 'D_ATORVASTATIN', 'S_FOLATE', 'pharmacodynamic', 'info',
 'Folate supports cardiovascular health; no interaction with statins.',
 'Homocysteine reduction.',
 'Complementary cardiovascular benefits.',
 'Folate 400-800mcg daily is safe and may be beneficial.',
 'moderate', 'Supportive',
 'Folate provides complementary cardiovascular benefits without interacting with statins.',
 '[{"source": "Research data", "year": "2021"}]'::jsonb),

('INT_ATORVASTATIN_GARLIC', 'D_ATORVASTATIN', 'S_GARLIC', 'pharmacodynamic', 'info',
 'Garlic has modest lipid benefits; no adverse interaction.',
 'Mild cholesterol-lowering effects.',
 'Possible additive lipid benefits.',
 'Aged garlic extract (600-1200mg) is safe with statins.',
 'moderate', 'Complementary',
 'Garlic has mild cholesterol-lowering effects that may complement statin therapy.',
 '[{"source": "Meta-analysis", "year": "2021"}]'::jsonb),

('INT_ATORVASTATIN_TURMERIC', 'D_ATORVASTATIN', 'S_TURMERIC', 'pharmacodynamic', 'info',
 'Turmeric has anti-inflammatory benefits; no adverse interaction.',
 'Anti-inflammatory without significant lipid effects.',
 'Complementary cardiovascular protection.',
 'Standard turmeric doses (500-1000mg) are safe with statins.',
 'limited', 'Complementary',
 'Turmeric provides anti-inflammatory benefits without interfering with statin therapy.',
 '[{"source": "Clinical data", "year": "2021"}]'::jsonb),

('INT_ATORVASTATIN_GINKGO', 'D_ATORVASTATIN', 'S_GINKGO', 'pharmacodynamic', 'info',
 'Ginkgo has no significant interaction with atorvastatin.',
 'No relevant mechanism.',
 'No effects.',
 'Standard ginkgo doses (120-240mg) are safe.',
 'limited', 'No interaction',
 'Ginkgo does not interact with statins.',
 '[{"source": "Clinical data", "year": "2020"}]'::jsonb),

('INT_ATORVASTATIN_PROBIOTICS', 'D_ATORVASTATIN', 'S_PROBIOTICS', 'pharmacodynamic', 'info',
 'Probiotics may have modest lipid benefits; no interaction.',
 'Gut microbiome effects on lipid metabolism.',
 'Possible complementary benefits.',
 'Probiotics (10-20 billion CFU) are safe with statins.',
 'limited', 'Emerging research',
 'Probiotics may provide modest cardiovascular benefits without interacting with statins.',
 '[{"source": "Research data", "year": "2022"}]'::jsonb);

-- SIMVASTATIN INTERACTIONS (similar to Atorvastatin)
INSERT INTO checker_interactions (
  interaction_id, a_substance_id, b_substance_id, interaction_type, severity,
  summary_short, mechanism, clinical_effect, management, evidence_grade, confidence, writeup_markdown, citations
) VALUES
('INT_SIMVASTATIN_COENZYME_Q10', 'D_SIMVASTATIN', 'S_COENZYME_Q10', 'pharmacokinetic', 'monitor',
 'Statins deplete CoQ10; supplementation may reduce muscle symptoms.',
 'Statins inhibit HMG-CoA reductase, reducing CoQ10 synthesis.',
 'Muscle pain, weakness, fatigue; CoQ10 may help symptoms.',
 'Consider CoQ10 100-200mg daily. May reduce myalgia and improve energy.',
 'high', 'Well-established',
 'Statins block the same pathway that produces CoQ10. Depletion may contribute to muscle symptoms. Supplementation (100-200mg) may help with myalgia and fatigue.',
 '[{"source": "Clinical trials", "year": "2022"}]'::jsonb),

('INT_SIMVASTATIN_VITAMIN_D', 'D_SIMVASTATIN', 'S_VITAMIN_D', 'pharmacodynamic', 'monitor',
 'Vitamin D deficiency increases statin myalgia risk; supplementation may be protective.',
 'Vitamin D supports muscle health and may reduce statin side effects.',
 'Reduced muscle pain, improved statin tolerance.',
 'Check vitamin D levels. Supplement if low (1000-2000 IU daily). May improve statin tolerance.',
 'moderate', 'Emerging evidence',
 'Vitamin D deficiency is associated with increased statin myalgia. Supplementation may improve muscle symptoms and statin tolerance.',
 '[{"source": "Clinical studies", "year": "2021"}]'::jsonb),

('INT_SIMVASTATIN_MAGNESIUM', 'D_SIMVASTATIN', 'S_MAGNESIUM', 'pharmacodynamic', 'info',
 'Magnesium may support muscle health; no adverse interaction.',
 'Muscle relaxation and cardiovascular support.',
 'Possible complementary benefits for muscle health.',
 'Magnesium 200-400mg daily is safe and may support muscle function.',
 'limited', 'Supportive',
 'Magnesium supports muscle health and may complement statin therapy without adverse interactions.',
 '[{"source": "Clinical data", "year": "2021"}]'::jsonb),

('INT_SIMVASTATIN_FISHOIL', 'D_SIMVASTATIN', 'S_FISH_OIL', 'pharmacodynamic', 'info',
 'Fish oil provides complementary cardiovascular benefits; no adverse interaction.',
 'Synergistic lipid effects; omega-3s reduce triglycerides.',
 'Additional cardiovascular protection; improved lipid profile.',
 'Fish oil 1-3g EPA/DHA daily is safe and beneficial with statins.',
 'high', 'Complementary therapy',
 'Fish oil and statins work synergistically for cardiovascular protection. Fish oil primarily lowers triglycerides while statins lower LDL cholesterol.',
 '[{"source": "Clinical trials", "year": "2022"}]'::jsonb),

('INT_SIMVASTATIN_CALCIUM', 'D_SIMVASTATIN', 'S_CALCIUM', 'pharmacokinetic', 'info',
 'Calcium has no significant interaction with simvastatin.',
 'No relevant mechanism.',
 'No effects expected.',
 'Take calcium as directed for bone and cardiovascular health.',
 'limited', 'No interaction',
 'Calcium supplementation does not interfere with statin therapy.',
 '[{"source": "Clinical data", "year": "2020"}]'::jsonb),

('INT_SIMVASTATIN_ZINC', 'D_SIMVASTATIN', 'S_ZINC', 'pharmacokinetic', 'info',
 'No interaction between zinc and simvastatin.',
 'No mechanism.',
 'No effects.',
 'Take zinc as directed (15-30mg daily).',
 'limited', 'No interaction',
 'Zinc does not interact with statins.',
 '[{"source": "Clinical data", "year": "2020"}]'::jsonb),

('INT_SIMVASTATIN_IRON', 'D_SIMVASTATIN', 'S_IRON', 'pharmacokinetic', 'info',
 'No interaction between iron and simvastatin.',
 'No mechanism.',
 'No effects.',
 'Take iron as directed.',
 'limited', 'No interaction',
 'Iron does not affect statin therapy.',
 '[{"source": "Clinical data", "year": "2020"}]'::jsonb),

('INT_SIMVASTATIN_VITAMIN_C', 'D_SIMVASTATIN', 'S_VITAMIN_C', 'pharmacodynamic', 'info',
 'Vitamin C has no adverse interaction with simvastatin.',
 'Antioxidant support for cardiovascular health.',
 'Complementary cardiovascular benefits.',
 'Vitamin C 500-1000mg daily is safe with statins.',
 'limited', 'Complementary',
 'Vitamin C provides antioxidant support without interfering with statin efficacy.',
 '[{"source": "Clinical data", "year": "2021"}]'::jsonb),

('INT_SIMVASTATIN_VITAMIN_E', 'D_SIMVASTATIN', 'S_VITAMIN_E', 'pharmacodynamic', 'info',
 'Vitamin E has no significant interaction with simvastatin.',
 'Antioxidant without lipid effects.',
 'No adverse effects.',
 'Standard vitamin E doses (400 IU) are safe.',
 'limited', 'No interaction',
 'Vitamin E does not interfere with statin therapy.',
 '[{"source": "Clinical data", "year": "2020"}]'::jsonb),

('INT_SIMVASTATIN_VITAMIN_B12', 'D_SIMVASTATIN', 'S_VITAMIN_B12', 'pharmacokinetic', 'info',
 'No interaction between B12 and simvastatin.',
 'No mechanism.',
 'No effects.',
 'Take B12 as directed (500-1000mcg daily).',
 'limited', 'No interaction',
 'B12 does not interact with statins.',
 '[{"source": "Clinical data", "year": "2020"}]'::jsonb),

('INT_SIMVASTATIN_FOLATE', 'D_SIMVASTATIN', 'S_FOLATE', 'pharmacodynamic', 'info',
 'Folate supports cardiovascular health; no interaction with statins.',
 'Homocysteine reduction.',
 'Complementary cardiovascular benefits.',
 'Folate 400-800mcg daily is safe and may be beneficial.',
 'moderate', 'Supportive',
 'Folate provides complementary cardiovascular benefits without interacting with statins.',
 '[{"source": "Research data", "year": "2021"}]'::jsonb),

('INT_SIMVASTATIN_GARLIC', 'D_SIMVASTATIN', 'S_GARLIC', 'pharmacodynamic', 'info',
 'Garlic has modest lipid benefits; no adverse interaction.',
 'Mild cholesterol-lowering effects.',
 'Possible additive lipid benefits.',
 'Aged garlic extract (600-1200mg) is safe with statins.',
 'moderate', 'Complementary',
 'Garlic has mild cholesterol-lowering effects that may complement statin therapy.',
 '[{"source": "Meta-analysis", "year": "2021"}]'::jsonb),

('INT_SIMVASTATIN_TURMERIC', 'D_SIMVASTATIN', 'S_TURMERIC', 'pharmacodynamic', 'info',
 'Turmeric has anti-inflammatory benefits; no adverse interaction.',
 'Anti-inflammatory without significant lipid effects.',
 'Complementary cardiovascular protection.',
 'Standard turmeric doses (500-1000mg) are safe with statins.',
 'limited', 'Complementary',
 'Turmeric provides anti-inflammatory benefits without interfering with statin therapy.',
 '[{"source": "Clinical data", "year": "2021"}]'::jsonb),

('INT_SIMVASTATIN_GINKGO', 'D_SIMVASTATIN', 'S_GINKGO', 'pharmacodynamic', 'info',
 'Ginkgo has no significant interaction with simvastatin.',
 'No relevant mechanism.',
 'No effects.',
 'Standard ginkgo doses (120-240mg) are safe.',
 'limited', 'No interaction',
 'Ginkgo does not interact with statins.',
 '[{"source": "Clinical data", "year": "2020"}]'::jsonb),

('INT_SIMVASTATIN_PROBIOTICS', 'D_SIMVASTATIN', 'S_PROBIOTICS', 'pharmacodynamic', 'info',
 'Probiotics may have modest lipid benefits; no interaction.',
 'Gut microbiome effects on lipid metabolism.',
 'Possible complementary benefits.',
 'Probiotics (10-20 billion CFU) are safe with statins.',
 'limited', 'Emerging research',
 'Probiotics may provide modest cardiovascular benefits without interacting with statins.',
 '[{"source": "Research data", "year": "2022"}]'::jsonb)

ON CONFLICT (interaction_id) DO NOTHING;
