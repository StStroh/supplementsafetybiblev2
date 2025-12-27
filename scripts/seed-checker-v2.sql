-- Seed data for Checker V2
-- ~30 substances (mix of drugs and supplements)
-- ~50 interactions across all severities

-- Insert substances (drugs)
INSERT INTO checker_substances (substance_id, type, display_name, canonical_name, aliases, tags) VALUES
('D_WARFARIN', 'drug', 'Warfarin', 'warfarin', ARRAY['coumadin', 'jantoven'], ARRAY['anticoagulant', 'blood thinner']),
('D_ASPIRIN', 'drug', 'Aspirin', 'aspirin', ARRAY['asa', 'acetylsalicylic acid'], ARRAY['nsaid', 'antiplatelet']),
('D_SERTRALINE', 'drug', 'Sertraline', 'sertraline', ARRAY['zoloft'], ARRAY['ssri', 'antidepressant']),
('D_FLUOXETINE', 'drug', 'Fluoxetine', 'fluoxetine', ARRAY['prozac'], ARRAY['ssri', 'antidepressant']),
('D_METFORMIN', 'drug', 'Metformin', 'metformin', ARRAY['glucophage'], ARRAY['diabetes', 'biguanide']),
('D_LEVOTHYROXINE', 'drug', 'Levothyroxine', 'levothyroxine', ARRAY['synthroid', 'levoxyl'], ARRAY['thyroid', 'hormone']),
('D_LISINOPRIL', 'drug', 'Lisinopril', 'lisinopril', ARRAY['prinivil', 'zestril'], ARRAY['ace inhibitor', 'blood pressure']),
('D_ATORVASTATIN', 'drug', 'Atorvastatin', 'atorvastatin', ARRAY['lipitor'], ARRAY['statin', 'cholesterol']),
('D_ALPRAZOLAM', 'drug', 'Alprazolam', 'alprazolam', ARRAY['xanax'], ARRAY['benzodiazepine', 'anxiety']),
('D_OMEPRAZOLE', 'drug', 'Omeprazole', 'omeprazole', ARRAY['prilosec'], ARRAY['ppi', 'acid reducer']),
('D_CLOPIDOGREL', 'drug', 'Clopidogrel', 'clopidogrel', ARRAY['plavix'], ARRAY['antiplatelet', 'blood thinner']),
('D_METOPROLOL', 'drug', 'Metoprolol', 'metoprolol', ARRAY['lopressor', 'toprol'], ARRAY['beta blocker', 'blood pressure'])
ON CONFLICT (substance_id) DO NOTHING;

-- Insert substances (supplements)
INSERT INTO checker_substances (substance_id, type, display_name, canonical_name, aliases, tags) VALUES
('S_STJOHNSWORT', 'supplement', 'St. John''s Wort', 'st johns wort', ARRAY['hypericum', 'st john wort', 'stjohnswort'], ARRAY['herbal', 'mood']),
('S_GINKGO', 'supplement', 'Ginkgo Biloba', 'ginkgo biloba', ARRAY['ginkgo', 'gingko'], ARRAY['herbal', 'cognitive']),
('S_GARLIC', 'supplement', 'Garlic', 'garlic', ARRAY['allium'], ARRAY['herbal', 'cardiovascular']),
('S_FISHOIL', 'supplement', 'Fish Oil', 'fish oil', ARRAY['omega 3', 'omega-3', 'dha', 'epa'], ARRAY['omega-3', 'cardiovascular']),
('S_VITAMINE', 'supplement', 'Vitamin E', 'vitamin e', ARRAY['tocopherol', 'vit e'], ARRAY['vitamin', 'antioxidant']),
('S_VITAMINK', 'supplement', 'Vitamin K', 'vitamin k', ARRAY['phylloquinone', 'vit k'], ARRAY['vitamin', 'blood clotting']),
('S_MELATONIN', 'supplement', 'Melatonin', 'melatonin', ARRAY[], ARRAY['hormone', 'sleep']),
('S_5HTP', 'supplement', '5-HTP', '5-hydroxytryptophan', ARRAY['5 htp', '5htp', 'hydroxytryptophan'], ARRAY['amino acid', 'mood']),
('S_MAGNESIUM', 'supplement', 'Magnesium', 'magnesium', ARRAY['mg'], ARRAY['mineral', 'electrolyte']),
('S_CALCIUM', 'supplement', 'Calcium', 'calcium', ARRAY['ca'], ARRAY['mineral', 'bone health']),
('S_IRON', 'supplement', 'Iron', 'iron', ARRAY['ferrous sulfate', 'fe'], ARRAY['mineral', 'anemia']),
('S_ZINC', 'supplement', 'Zinc', 'zinc', ARRAY['zn'], ARRAY['mineral', 'immune']),
('S_VITAMINC', 'supplement', 'Vitamin C', 'vitamin c', ARRAY['ascorbic acid', 'vit c'], ARRAY['vitamin', 'antioxidant']),
('S_VITAMIND', 'supplement', 'Vitamin D', 'vitamin d', ARRAY['cholecalciferol', 'vit d'], ARRAY['vitamin', 'bone health']),
('S_COENZQ10', 'supplement', 'CoQ10', 'coenzyme q10', ARRAY['coq10', 'ubiquinone'], ARRAY['antioxidant', 'energy']),
('S_GINSENG', 'supplement', 'Ginseng', 'ginseng', ARRAY['panax ginseng'], ARRAY['herbal', 'energy']),
('S_VALERIAN', 'supplement', 'Valerian Root', 'valerian', ARRAY['valerian root'], ARRAY['herbal', 'sleep']),
('S_TURMERIC', 'supplement', 'Turmeric', 'turmeric', ARRAY['curcumin'], ARRAY['herbal', 'anti-inflammatory'])
ON CONFLICT (substance_id) DO NOTHING;

-- Insert interactions (AVOID severity)
INSERT INTO checker_interactions (interaction_id, a_substance_id, b_substance_id, interaction_type, severity, summary_short, mechanism, clinical_effect, management, evidence_grade, confidence, citations) VALUES
('INT_001', 'D_SERTRALINE', 'S_5HTP', 'pharmacodynamic', 'avoid', 'Risk of serotonin syndrome when combining SSRIs with 5-HTP',
'Both increase serotonin levels through different mechanisms. 5-HTP is converted to serotonin, while sertraline blocks serotonin reuptake.',
'May cause serotonin syndrome: agitation, confusion, rapid heart rate, high blood pressure, dilated pupils, muscle rigidity, sweating, diarrhea.',
'Avoid concurrent use. If necessary, use only under close medical supervision with low doses.',
'B', 'high', '[{"source":"Journal of Clinical Psychopharmacology","title":"Serotonin Syndrome Risk with SSRIs and 5-HTP","url":"https://pubmed.ncbi.nlm.nih.gov/example1"}]'::jsonb),

('INT_002', 'D_FLUOXETINE', 'S_STJOHNSWORT', 'pharmacodynamic', 'avoid', 'Severe risk of serotonin syndrome',
'St. John''s Wort inhibits serotonin reuptake and may have MAO inhibitory effects, combined with SSRI increases serotonin toxicity risk.',
'Serotonin syndrome symptoms: confusion, agitation, muscle twitching, sweating, tremor, fever.',
'Avoid combination. Discontinue St. John''s Wort at least 2 weeks before starting SSRI.',
'A', 'high', '[{"source":"British Journal of Clinical Pharmacology","title":"St. John''s Wort-SSRI Interactions","url":"https://pubmed.ncbi.nlm.nih.gov/example2"}]'::jsonb)
ON CONFLICT (interaction_id) DO NOTHING;

-- Insert interactions (CAUTION severity)
INSERT INTO checker_interactions (interaction_id, a_substance_id, b_substance_id, interaction_type, severity, summary_short, mechanism, clinical_effect, management, evidence_grade, confidence, citations) VALUES
('INT_003', 'D_WARFARIN', 'S_GINKGO', 'pharmacodynamic', 'caution', 'Increased bleeding risk when combining warfarin with ginkgo',
'Ginkgo has antiplatelet effects and may inhibit platelet-activating factor, potentially enhancing warfarin''s anticoagulant effects.',
'Increased risk of bleeding, bruising, or hemorrhage. May affect INR stability.',
'Monitor INR more frequently. Watch for signs of bleeding. Consider avoiding or using with close monitoring.',
'B', 'moderate', '[{"source":"Thrombosis Research","title":"Ginkgo Biloba and Anticoagulant Interactions","url":"https://pubmed.ncbi.nlm.nih.gov/example3"}]'::jsonb),

('INT_004', 'D_WARFARIN', 'S_GARLIC', 'pharmacodynamic', 'caution', 'Garlic may enhance anticoagulant effects',
'Garlic has antiplatelet properties and may affect platelet aggregation, potentially increasing bleeding risk.',
'Increased bleeding tendency, prolonged bleeding time, bruising.',
'Monitor INR closely if taking high-dose garlic supplements. Use garlic in food amounts generally considered safe.',
'B', 'moderate', '[{"source":"Pharmacotherapy","title":"Garlic-Warfarin Interactions","url":"https://pubmed.ncbi.nlm.nih.gov/example4"}]'::jsonb),

('INT_005', 'D_WARFARIN', 'S_FISHOIL', 'pharmacodynamic', 'caution', 'Fish oil may increase bleeding risk',
'Omega-3 fatty acids have mild antiplatelet effects that may enhance anticoagulation.',
'Potential for increased bleeding, particularly at high doses (>3g/day).',
'Use fish oil doses under 3g/day. Monitor for bleeding signs. Check INR more frequently.',
'B', 'moderate', '[{"source":"American Journal of Cardiology","title":"Omega-3 and Anticoagulation","url":"https://pubmed.ncbi.nlm.nih.gov/example5"}]'::jsonb),

('INT_006', 'D_WARFARIN', 'S_VITAMINE', 'pharmacodynamic', 'caution', 'Vitamin E may enhance anticoagulant effects',
'Vitamin E at high doses (>400 IU) may inhibit platelet aggregation and enhance anticoagulation.',
'Increased bleeding risk, especially at doses above 400 IU daily.',
'Limit vitamin E to <400 IU daily. Monitor INR if taking higher doses.',
'B', 'moderate', '[{"source":"Archives of Internal Medicine","title":"Vitamin E-Warfarin Interaction","url":"https://pubmed.ncbi.nlm.nih.gov/example6"}]'::jsonb),

('INT_007', 'D_SERTRALINE', 'S_STJOHNSWORT', 'pharmacodynamic', 'caution', 'May cause serotonin syndrome or reduced SSRI effectiveness',
'St. John''s Wort induces CYP3A4 and may lower SSRI levels, while also having serotonergic effects.',
'Either serotonin syndrome or breakthrough depression due to reduced drug levels.',
'Avoid combination. If used together, monitor closely for both toxicity and reduced effectiveness.',
'A', 'high', '[{"source":"Clinical Pharmacokinetics","title":"St. John''s Wort Drug Interactions","url":"https://pubmed.ncbi.nlm.nih.gov/example7"}]'::jsonb),

('INT_008', 'D_ALPRAZOLAM', 'S_MELATONIN', 'pharmacodynamic', 'caution', 'Additive sedative effects',
'Both substances cause CNS depression and sedation through different mechanisms.',
'Excessive drowsiness, dizziness, impaired coordination, risk of falls.',
'Use together only under medical supervision. Avoid activities requiring alertness. Consider timing doses separately.',
'C', 'moderate', '[{"source":"Journal of Clinical Sleep Medicine","title":"Melatonin-Benzodiazepine Interactions","url":"https://pubmed.ncbi.nlm.nih.gov/example8"}]'::jsonb),

('INT_009', 'D_ALPRAZOLAM', 'S_VALERIAN', 'pharmacodynamic', 'caution', 'Enhanced sedation and CNS depression',
'Valerian has GABAergic effects that may potentiate benzodiazepine action.',
'Increased drowsiness, impaired motor function, risk of respiratory depression.',
'Avoid combination if possible. If used together, use lowest effective doses and monitor closely.',
'C', 'moderate', '[{"source":"Pharmacotherapy","title":"Valerian-Benzodiazepine Interactions","url":"https://pubmed.ncbi.nlm.nih.gov/example9"}]'::jsonb),

('INT_010', 'D_CLOPIDOGREL', 'S_GINKGO', 'pharmacodynamic', 'caution', 'Increased bleeding risk',
'Both have antiplatelet effects that may be additive.',
'Enhanced bleeding tendency, prolonged bleeding time.',
'Monitor for bleeding signs. Avoid high doses of ginkgo. Consider alternative supplements.',
'B', 'moderate', '[{"source":"Journal of Thrombosis and Haemostasis","title":"Antiplatelet Drug-Herb Interactions","url":"https://pubmed.ncbi.nlm.nih.gov/example10"}]'::jsonb),

('INT_011', 'D_ATORVASTATIN', 'S_COENZQ10', 'pharmacodynamic', 'caution', 'Statins deplete CoQ10; supplementation may be beneficial',
'Statins inhibit HMG-CoA reductase, which also reduces CoQ10 production.',
'Muscle pain, weakness (myopathy) may worsen with low CoQ10. Supplementation may help mitigate statin side effects.',
'CoQ10 supplementation (100-200mg/day) may be beneficial for those experiencing statin-related muscle symptoms.',
'B', 'moderate', '[{"source":"American Journal of Cardiology","title":"CoQ10 and Statin Myopathy","url":"https://pubmed.ncbi.nlm.nih.gov/example11"}]'::jsonb)
ON CONFLICT (interaction_id) DO NOTHING;

-- Insert interactions (MONITOR severity)
INSERT INTO checker_interactions (interaction_id, a_substance_id, b_substance_id, interaction_type, severity, summary_short, mechanism, clinical_effect, management, evidence_grade, confidence, citations) VALUES
('INT_012', 'D_WARFARIN', 'S_VITAMINK', 'pharmacodynamic', 'monitor', 'Vitamin K antagonizes warfarin effects',
'Vitamin K is required for clotting factor synthesis. High vitamin K intake reduces warfarin effectiveness.',
'Decreased INR, reduced anticoagulation, increased clotting risk.',
'Maintain consistent vitamin K intake. Avoid sudden increases in vitamin K-rich foods or supplements.',
'A', 'high', '[{"source":"Blood","title":"Vitamin K-Warfarin Interaction","url":"https://pubmed.ncbi.nlm.nih.gov/example12"}]'::jsonb),

('INT_013', 'D_LEVOTHYROXINE', 'S_IRON', 'pharmacokinetic', 'monitor', 'Iron reduces levothyroxine absorption',
'Iron chelates with levothyroxine in the GI tract, forming insoluble complexes.',
'Reduced thyroid hormone levels, potential hypothyroid symptoms.',
'Separate doses by at least 4 hours. Monitor TSH levels.',
'A', 'high', '[{"source":"Thyroid","title":"Iron-Levothyroxine Interactions","url":"https://pubmed.ncbi.nlm.nih.gov/example13"}]'::jsonb),

('INT_014', 'D_LEVOTHYROXINE', 'S_CALCIUM', 'pharmacokinetic', 'monitor', 'Calcium reduces levothyroxine absorption',
'Calcium binds to levothyroxine in the GI tract, reducing bioavailability.',
'Decreased thyroid hormone levels, possible need for dose adjustment.',
'Take levothyroxine at least 4 hours apart from calcium. Monitor TSH.',
'A', 'high', '[{"source":"Thyroid","title":"Calcium-Levothyroxine Interaction","url":"https://pubmed.ncbi.nlm.nih.gov/example14"}]'::jsonb),

('INT_015', 'D_METFORMIN', 'S_VITAMINC', 'pharmacokinetic', 'monitor', 'High-dose vitamin C may affect metformin absorption',
'Vitamin C may interfere with cellular glucose uptake mechanisms, though clinical significance is debated.',
'Potential minor effects on blood glucose control at very high vitamin C doses.',
'Monitor blood glucose if taking >1000mg vitamin C daily. Generally not clinically significant.',
'C', 'low', '[{"source":"Diabetes Care","title":"Vitamin C and Diabetes Medications","url":"https://pubmed.ncbi.nlm.nih.gov/example15"}]'::jsonb),

('INT_016', 'D_LISINOPRIL', 'S_MAGNESIUM', 'pharmacodynamic', 'monitor', 'May cause additive effects on blood pressure',
'Both may lower blood pressure through different mechanisms.',
'Potential for excessive blood pressure lowering, dizziness, lightheadedness.',
'Monitor blood pressure regularly. Watch for symptoms of hypotension.',
'C', 'low', '[{"source":"American Journal of Hypertension","title":"Magnesium and ACE Inhibitors","url":"https://pubmed.ncbi.nlm.nih.gov/example16"}]'::jsonb),

('INT_017', 'D_OMEPRAZOLE', 'S_CALCIUM', 'pharmacokinetic', 'monitor', 'PPIs may reduce calcium absorption',
'Reduced stomach acid impairs calcium carbonate absorption (but not calcium citrate).',
'Potential for reduced calcium absorption, long-term bone health concerns.',
'Consider calcium citrate form which doesn''t require acid for absorption. Monitor bone density long-term.',
'B', 'moderate', '[{"source":"JAMA Internal Medicine","title":"PPI Effects on Calcium Absorption","url":"https://pubmed.ncbi.nlm.nih.gov/example17"}]'::jsonb),

('INT_018', 'D_OMEPRAZOLE', 'S_MAGNESIUM', 'pharmacokinetic', 'monitor', 'Long-term PPI use may lower magnesium levels',
'PPIs interfere with magnesium absorption in the intestine.',
'Hypomagnesemia with long-term use (>1 year), muscle spasms, arrhythmias.',
'Monitor magnesium levels with prolonged PPI use. Supplementation may be needed.',
'B', 'moderate', '[{"source":"FDA Drug Safety Communication","title":"PPI-Associated Hypomagnesemia","url":"https://www.fda.gov/example18"}]'::jsonb),

('INT_019', 'D_METOPROLOL', 'S_COENZQ10', 'pharmacodynamic', 'monitor', 'CoQ10 supplementation may be beneficial',
'Beta-blockers may reduce CoQ10 levels. Supplementation might help with fatigue.',
'Potential benefit for beta-blocker-related fatigue, though evidence is mixed.',
'CoQ10 supplementation generally safe and may help with medication-related fatigue.',
'C', 'low', '[{"source":"Journal of Cardiovascular Pharmacology","title":"CoQ10 and Beta Blockers","url":"https://pubmed.ncbi.nlm.nih.gov/example19"}]'::jsonb),

('INT_020', 'D_ASPIRIN', 'S_FISHOIL', 'pharmacodynamic', 'monitor', 'Mild increase in bleeding risk',
'Both have antiplatelet effects, though fish oil''s effect is modest.',
'Slightly increased bleeding risk, particularly at fish oil doses >3g/day.',
'Generally safe at moderate fish oil doses (<3g/day). Monitor for unusual bleeding.',
'B', 'low', '[{"source":"American Journal of Clinical Nutrition","title":"Fish Oil and Aspirin","url":"https://pubmed.ncbi.nlm.nih.gov/example20"}]'::jsonb),

('INT_021', 'D_ASPIRIN', 'S_VITAMINE', 'pharmacodynamic', 'monitor', 'Possible additive antiplatelet effects',
'Both may affect platelet function, though vitamin E''s effect is dose-dependent.',
'Minor increase in bleeding risk at high vitamin E doses (>400 IU).',
'Keep vitamin E under 400 IU daily. Monitor for unusual bruising or bleeding.',
'C', 'low', '[{"source":"American Heart Journal","title":"Vitamin E-Aspirin Interactions","url":"https://pubmed.ncbi.nlm.nih.gov/example21"}]'::jsonb)
ON CONFLICT (interaction_id) DO NOTHING;

-- Insert interactions (INFO severity - informational only)
INSERT INTO checker_interactions (interaction_id, a_substance_id, b_substance_id, interaction_type, severity, summary_short, mechanism, clinical_effect, management, evidence_grade, confidence, citations) VALUES
('INT_022', 'D_METFORMIN', 'S_MAGNESIUM', 'pharmacodynamic', 'info', 'Magnesium may support diabetes management',
'Magnesium plays a role in glucose metabolism and insulin sensitivity.',
'May provide minor benefits for blood glucose control and reduce metformin side effects.',
'Safe to combine. Magnesium supplementation may be beneficial for diabetic patients.',
'C', 'low', '[{"source":"Diabetes & Metabolism","title":"Magnesium in Type 2 Diabetes","url":"https://pubmed.ncbi.nlm.nih.gov/example22"}]'::jsonb),

('INT_023', 'S_CALCIUM', 'S_VITAMIND', 'pharmacodynamic', 'info', 'Vitamin D enhances calcium absorption',
'Vitamin D is required for optimal calcium absorption in the intestine.',
'Beneficial combination for bone health. Vitamin D improves calcium utilization.',
'Recommended to take together for bone health. Common and safe combination.',
'A', 'high', '[{"source":"Journal of Bone and Mineral Research","title":"Calcium and Vitamin D Synergy","url":"https://pubmed.ncbi.nlm.nih.gov/example23"}]'::jsonb),

('INT_024', 'S_MAGNESIUM', 'S_ZINC', 'pharmacokinetic', 'info', 'High doses may compete for absorption',
'Both are divalent cations that may compete for intestinal absorption transporters.',
'Minimal clinical significance at typical supplement doses. High doses (>50mg zinc) may reduce magnesium absorption.',
'Take at different times of day if using very high doses. Standard doses generally no issue.',
'C', 'low', '[{"source":"Journal of Nutrition","title":"Mineral Absorption Interactions","url":"https://pubmed.ncbi.nlm.nih.gov/example24"}]'::jsonb),

('INT_025', 'S_IRON', 'S_VITAMINC', 'pharmacokinetic', 'info', 'Vitamin C enhances iron absorption',
'Vitamin C reduces ferric iron to ferrous form, which is more readily absorbed.',
'Beneficial interaction. Vitamin C significantly improves non-heme iron absorption.',
'Recommended to take together, especially for plant-based iron sources.',
'A', 'high', '[{"source":"American Journal of Clinical Nutrition","title":"Vitamin C and Iron Absorption","url":"https://pubmed.ncbi.nlm.nih.gov/example25"}]'::jsonb),

('INT_026', 'D_LISINOPRIL', 'S_VITAMIND', 'pharmacodynamic', 'info', 'No significant interaction',
'Both may affect cardiovascular system through independent mechanisms.',
'Generally safe to combine. Vitamin D may have cardiovascular benefits.',
'Safe combination. Vitamin D supplementation appropriate for deficiency.',
'C', 'low', '[{"source":"Circulation","title":"Vitamin D and ACE Inhibitors","url":"https://pubmed.ncbi.nlm.nih.gov/example26"}]'::jsonb),

('INT_027', 'S_TURMERIC', 'S_FISHOIL', 'pharmacodynamic', 'info', 'Both have anti-inflammatory effects',
'Complementary mechanisms for reducing inflammation.',
'May provide additive benefits for inflammatory conditions.',
'Safe to combine. Popular combination for joint health and inflammation.',
'C', 'low', '[{"source":"Journal of Medicinal Food","title":"Turmeric and Omega-3","url":"https://pubmed.ncbi.nlm.nih.gov/example27"}]'::jsonb),

('INT_028', 'S_GINSENG', 'S_VITAMINC', 'pharmacodynamic', 'info', 'No significant interaction',
'No known mechanism of interaction.',
'Safe to combine. No adverse effects expected.',
'Safe combination.',
'C', 'low', '[{"source":"Phytotherapy Research","title":"Ginseng Safety Profile","url":"https://pubmed.ncbi.nlm.nih.gov/example28"}]'::jsonb)
ON CONFLICT (interaction_id) DO NOTHING;

-- Add a few more interactions to reach ~50 total
INSERT INTO checker_interactions (interaction_id, a_substance_id, b_substance_id, interaction_type, severity, summary_short, mechanism, clinical_effect, management, evidence_grade, confidence, citations) VALUES
('INT_029', 'D_SERTRALINE', 'S_MELATONIN', 'pharmacodynamic', 'monitor', 'May enhance sedation',
'Both can cause drowsiness through different mechanisms.',
'Increased sedation, particularly when initiating treatment.',
'Monitor for excessive drowsiness. Consider timing doses separately.',
'C', 'low', '[{"source":"Journal of Clinical Psychiatry","title":"Melatonin-SSRI Interaction","url":"https://pubmed.ncbi.nlm.nih.gov/example29"}]'::jsonb),

('INT_030', 'S_GARLIC', 'S_GINKGO', 'pharmacodynamic', 'caution', 'Both have antiplatelet effects',
'Additive antiplatelet effects may increase bleeding risk.',
'Increased bleeding tendency when combined.',
'Use together with caution. Monitor for unusual bleeding or bruising.',
'C', 'moderate', '[{"source":"Thrombosis Research","title":"Herbal Antiplatelet Interactions","url":"https://pubmed.ncbi.nlm.nih.gov/example30"}]'::jsonb),

('INT_031', 'S_IRON', 'S_CALCIUM', 'pharmacokinetic', 'monitor', 'Calcium reduces iron absorption',
'Both compete for the same intestinal absorption pathways.',
'Reduced iron absorption, potential for iron deficiency with chronic co-administration.',
'Separate doses by 2-4 hours for optimal absorption of both.',
'A', 'high', '[{"source":"American Journal of Clinical Nutrition","title":"Calcium-Iron Interaction","url":"https://pubmed.ncbi.nlm.nih.gov/example31"}]'::jsonb),

('INT_032', 'S_IRON', 'S_ZINC', 'pharmacokinetic', 'monitor', 'May compete for absorption',
'Both are divalent cations competing for intestinal transporters.',
'High doses of either may reduce absorption of the other.',
'Separate doses if taking high amounts. Standard multivitamin amounts generally OK.',
'B', 'moderate', '[{"source":"Journal of Nutrition","title":"Iron-Zinc Absorption","url":"https://pubmed.ncbi.nlm.nih.gov/example32"}]'::jsonb),

('INT_033', 'D_ATORVASTATIN', 'S_GINKGO', 'pharmacokinetic', 'info', 'No significant interaction',
'No known mechanism of clinically significant interaction.',
'Generally safe to combine.',
'Safe combination. No dose adjustments needed.',
'C', 'low', '[{"source":"Clinical Pharmacokinetics","title":"Statin-Herb Interactions","url":"https://pubmed.ncbi.nlm.nih.gov/example33"}]'::jsonb),

('INT_034', 'D_METFORMIN', 'S_COENZQ10', 'pharmacodynamic', 'info', 'CoQ10 may be beneficial',
'Metformin may reduce CoQ10 levels. Supplementation might be beneficial.',
'Potential benefit for mitochondrial function and reducing metformin side effects.',
'Safe and potentially beneficial combination.',
'C', 'low', '[{"source":"Diabetes Research and Clinical Practice","title":"Metformin and CoQ10","url":"https://pubmed.ncbi.nlm.nih.gov/example34"}]'::jsonb),

('INT_035', 'S_STJOHNSWORT', 'S_5HTP', 'pharmacodynamic', 'avoid', 'High risk of serotonin syndrome',
'Both increase serotonin levels through different mechanisms.',
'Severe risk of serotonin toxicity: agitation, confusion, tremor, rapid heart rate.',
'Avoid combination. Never use together without medical supervision.',
'B', 'high', '[{"source":"Psychosomatics","title":"Serotonergic Supplement Interactions","url":"https://pubmed.ncbi.nlm.nih.gov/example35"}]'::jsonb),

('INT_036', 'D_ASPIRIN', 'S_GARLIC', 'pharmacodynamic', 'caution', 'Increased bleeding risk',
'Both have antiplatelet effects that may be additive.',
'Enhanced bleeding tendency, prolonged bleeding time.',
'Use together with caution. Monitor for bleeding. Use garlic in food amounts generally safer.',
'B', 'moderate', '[{"source":"Platelets","title":"Garlic-Aspirin Interaction","url":"https://pubmed.ncbi.nlm.nih.gov/example36"}]'::jsonb),

('INT_037', 'D_FLUOXETINE', 'S_5HTP', 'pharmacodynamic', 'avoid', 'Severe serotonin syndrome risk',
'Both increase serotonin availability through different pathways.',
'Life-threatening serotonin syndrome possible.',
'Never combine. Avoid 5-HTP while taking SSRIs.',
'A', 'high', '[{"source":"Clinical Toxicology","title":"5-HTP SSRI Serotonin Syndrome","url":"https://pubmed.ncbi.nlm.nih.gov/example37"}]'::jsonb),

('INT_038', 'D_OMEPRAZOLE', 'S_IRON', 'pharmacokinetic', 'monitor', 'Reduced iron absorption',
'PPIs reduce stomach acid, impairing iron absorption (especially non-heme iron).',
'Potential for iron deficiency with long-term PPI use.',
'Monitor iron levels. Consider iron supplementation if deficient. Vitamin C may help absorption.',
'B', 'moderate', '[{"source":"American Journal of Gastroenterology","title":"PPI Iron Malabsorption","url":"https://pubmed.ncbi.nlm.nih.gov/example38"}]'::jsonb),

('INT_039', 'S_GINSENG', 'S_GINKGO', 'pharmacodynamic', 'info', 'Commonly combined for cognitive support',
'Both used for cognitive enhancement through different mechanisms.',
'May have complementary benefits. Generally well tolerated together.',
'Safe combination. Popular in cognitive support supplements.',
'C', 'low', '[{"source":"Phytomedicine","title":"Ginseng-Ginkgo Combination","url":"https://pubmed.ncbi.nlm.nih.gov/example39"}]'::jsonb),

('INT_040', 'S_MELATONIN', 'S_MAGNESIUM', 'pharmacodynamic', 'info', 'May enhance sleep quality',
'Complementary mechanisms for promoting sleep and relaxation.',
'May provide additive benefits for sleep quality.',
'Safe and commonly combined for sleep support.',
'C', 'low', '[{"source":"Journal of Sleep Research","title":"Melatonin Magnesium Combo","url":"https://pubmed.ncbi.nlm.nih.gov/example40"}]'::jsonb),

('INT_041', 'D_CLOPIDOGREL', 'S_TURMERIC', 'pharmacodynamic', 'caution', 'Increased bleeding risk',
'Turmeric/curcumin has antiplatelet effects that may be additive.',
'Enhanced bleeding risk, particularly at high curcumin doses.',
'Use together with caution. Monitor for unusual bleeding. Limit turmeric supplement doses.',
'C', 'moderate', '[{"source":"Blood Coagulation & Fibrinolysis","title":"Curcumin Antiplatelet Effects","url":"https://pubmed.ncbi.nlm.nih.gov/example41"}]'::jsonb),

('INT_042', 'D_WARFARIN', 'S_TURMERIC', 'pharmacodynamic', 'caution', 'May enhance anticoagulant effects',
'Turmeric may have antiplatelet and mild anticoagulant effects.',
'Potential for increased bleeding risk, INR changes.',
'Monitor INR closely. Use turmeric in food amounts generally safer than high-dose supplements.',
'C', 'moderate', '[{"source":"Annals of Pharmacotherapy","title":"Turmeric-Warfarin Interaction","url":"https://pubmed.ncbi.nlm.nih.gov/example42"}]'::jsonb),

('INT_043', 'S_CALCIUM', 'S_MAGNESIUM', 'pharmacokinetic', 'info', 'May compete for absorption at high doses',
'Both are divalent cations that may compete for intestinal absorption.',
'Minimal clinical significance at typical supplement doses. Best absorbed when ratio is balanced.',
'Generally safe together. Ideal ratio often 2:1 calcium:magnesium.',
'C', 'low', '[{"source":"Magnesium Research","title":"Calcium Magnesium Balance","url":"https://pubmed.ncbi.nlm.nih.gov/example43"}]'::jsonb),

('INT_044', 'D_LISINOPRIL', 'S_FISHOIL', 'pharmacodynamic', 'info', 'May provide additive cardiovascular benefits',
'Both support cardiovascular health through different mechanisms.',
'Potential for complementary benefits on blood pressure and heart health.',
'Safe combination. Fish oil may provide additional cardiovascular benefits.',
'B', 'low', '[{"source":"Journal of the American College of Cardiology","title":"Omega-3 and ACE Inhibitors","url":"https://pubmed.ncbi.nlm.nih.gov/example44"}]'::jsonb),

('INT_045', 'D_METOPROLOL', 'S_MAGNESIUM', 'pharmacodynamic', 'monitor', 'May enhance blood pressure lowering',
'Both can reduce blood pressure through different mechanisms.',
'Potential for additive hypotensive effects.',
'Monitor blood pressure. Usually well tolerated. Magnesium generally safe with beta blockers.',
'C', 'low', '[{"source":"American Journal of Hypertension","title":"Magnesium and Beta Blockers","url":"https://pubmed.ncbi.nlm.nih.gov/example45"}]'::jsonb),

('INT_046', 'S_VITAMINC', 'S_VITAMINE', 'pharmacodynamic', 'info', 'Vitamin C may help regenerate vitamin E',
'Vitamin C can reduce oxidized vitamin E back to its active form.',
'Potential synergistic antioxidant effect.',
'Safe and potentially beneficial combination.',
'C', 'low', '[{"source":"Free Radical Biology and Medicine","title":"Vitamin C and E Synergy","url":"https://pubmed.ncbi.nlm.nih.gov/example46"}]'::jsonb),

('INT_047', 'D_SERTRALINE', 'S_FISHOIL', 'pharmacodynamic', 'info', 'Fish oil may provide additional mood support',
'Omega-3s may have mood-stabilizing effects complementary to SSRIs.',
'Potential for enhanced antidepressant effects.',
'Safe combination. Fish oil may augment SSRI therapy.',
'B', 'low', '[{"source":"Journal of Clinical Psychiatry","title":"Omega-3 SSRI Augmentation","url":"https://pubmed.ncbi.nlm.nih.gov/example47"}]'::jsonb),

('INT_048', 'D_ATORVASTATIN', 'S_FISHOIL', 'pharmacodynamic', 'info', 'May provide additive cardiovascular benefits',
'Complementary mechanisms for improving lipid profiles.',
'Potential for enhanced lipid-lowering effects.',
'Safe combination. Fish oil may provide additional triglyceride reduction.',
'B', 'low', '[{"source":"Atherosclerosis","title":"Statins and Omega-3","url":"https://pubmed.ncbi.nlm.nih.gov/example48"}]'::jsonb),

('INT_049', 'S_VALERIAN', 'S_MELATONIN', 'pharmacodynamic', 'monitor', 'Additive sedative effects',
'Both promote sleep through different mechanisms.',
'Enhanced sedation, may improve sleep quality but increase morning grogginess.',
'Use together with caution. Start with low doses. Avoid activities requiring alertness.',
'C', 'moderate', '[{"source":"Sleep Medicine Reviews","title":"Herbal Sleep Aids Combinations","url":"https://pubmed.ncbi.nlm.nih.gov/example49"}]'::jsonb),

('INT_050', 'D_ALPRAZOLAM', 'S_GINSENG', 'pharmacodynamic', 'info', 'Ginseng may reduce sedation',
'Ginseng has mild stimulant effects that may partially counteract benzodiazepine sedation.',
'May slightly reduce sedative effects of benzodiazepines.',
'Generally safe. Ginseng unlikely to significantly affect benzodiazepine efficacy.',
'C', 'low', '[{"source":"Journal of Ethnopharmacology","title":"Ginseng CNS Effects","url":"https://pubmed.ncbi.nlm.nih.gov/example50"}]'::jsonb)
ON CONFLICT (interaction_id) DO NOTHING;
