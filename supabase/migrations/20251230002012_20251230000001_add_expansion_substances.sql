/*
  # Add Expansion Substances for 520 Interaction Target
  
  1. New Medications (Anticoagulants, Psychiatric, Diabetes, CNS)
    - Anticoagulants: Apixaban, Rivaroxaban, Dabigatran, Aspirin, Clopidogrel, Ticagrelor, Prasugrel
    - Psychiatric: Paroxetine, Venlafaxine, Duloxetine, Desvenlafaxine, Bupropion, Trazodone, Lithium
    - Thyroid: Liothyronine
    - Diabetes: Insulin, Glipizide, Glyburide, Glimepiride, Semaglutide, Liraglutide, Empagliflozin
    - CNS: Diazepam, Lorazepam, Clonazepam, Zolpidem, Diphenhydramine
  
  2. New Supplements
    - Anticoagulant-related: Cranberry
    - Psychiatric: 5-HTP, SAMe, Tryptophan, Rhodiola
    - Thyroid: Soy, Iodine, Selenium, Chromium, Berberine
    - Diabetes: Cinnamon, Alpha-lipoic acid, Fenugreek, Gymnema
    - CNS: Kava, Passionflower, L-theanine
*/

-- Add medications
INSERT INTO checker_substances (substance_id, type, display_name, canonical_name, aliases, tags, is_active) VALUES
-- Anticoagulants/Antiplatelets
('D_APIXABAN', 'drug', 'Apixaban', 'apixaban', ARRAY['eliquis'], ARRAY['anticoagulant', 'blood thinner', 'cardiovascular'], true),
('D_RIVAROXABAN', 'drug', 'Rivaroxaban', 'rivaroxaban', ARRAY['xarelto'], ARRAY['anticoagulant', 'blood thinner', 'cardiovascular'], true),
('D_DABIGATRAN', 'drug', 'Dabigatran', 'dabigatran', ARRAY['pradaxa'], ARRAY['anticoagulant', 'blood thinner', 'cardiovascular'], true),
('D_ASPIRIN', 'drug', 'Aspirin', 'aspirin', ARRAY['asa', 'acetylsalicylic acid'], ARRAY['antiplatelet', 'blood thinner', 'cardiovascular'], true),
('D_CLOPIDOGREL', 'drug', 'Clopidogrel', 'clopidogrel', ARRAY['plavix'], ARRAY['antiplatelet', 'blood thinner', 'cardiovascular'], true),
('D_TICAGRELOR', 'drug', 'Ticagrelor', 'ticagrelor', ARRAY['brilinta'], ARRAY['antiplatelet', 'blood thinner', 'cardiovascular'], true),
('D_PRASUGREL', 'drug', 'Prasugrel', 'prasugrel', ARRAY['effient'], ARRAY['antiplatelet', 'blood thinner', 'cardiovascular'], true),

-- Psychiatric
('D_PAROXETINE', 'drug', 'Paroxetine', 'paroxetine', ARRAY['paxil'], ARRAY['ssri', 'antidepressant', 'psychiatric'], true),
('D_VENLAFAXINE', 'drug', 'Venlafaxine', 'venlafaxine', ARRAY['effexor'], ARRAY['snri', 'antidepressant', 'psychiatric'], true),
('D_DULOXETINE', 'drug', 'Duloxetine', 'duloxetine', ARRAY['cymbalta'], ARRAY['snri', 'antidepressant', 'psychiatric'], true),
('D_DESVENLAFAXINE', 'drug', 'Desvenlafaxine', 'desvenlafaxine', ARRAY['pristiq'], ARRAY['snri', 'antidepressant', 'psychiatric'], true),
('D_BUPROPION', 'drug', 'Bupropion', 'bupropion', ARRAY['wellbutrin', 'zyban'], ARRAY['antidepressant', 'psychiatric'], true),
('D_TRAZODONE', 'drug', 'Trazodone', 'trazodone', ARRAY['desyrel'], ARRAY['antidepressant', 'sleep', 'psychiatric'], true),
('D_LITHIUM', 'drug', 'Lithium', 'lithium', ARRAY['lithobid'], ARRAY['mood stabilizer', 'psychiatric'], true),

-- Thyroid
('D_LIOTHYRONINE', 'drug', 'Liothyronine', 'liothyronine', ARRAY['cytomel', 't3'], ARRAY['thyroid', 'hormone'], true),

-- Diabetes
('D_INSULIN', 'drug', 'Insulin', 'insulin', ARRAY['humalog', 'novolog', 'lantus'], ARRAY['diabetes', 'hormone'], true),
('D_GLIPIZIDE', 'drug', 'Glipizide', 'glipizide', ARRAY['glucotrol'], ARRAY['diabetes', 'sulfonylurea'], true),
('D_GLYBURIDE', 'drug', 'Glyburide', 'glyburide', ARRAY['diabeta', 'glibenclamide'], ARRAY['diabetes', 'sulfonylurea'], true),
('D_GLIMEPIRIDE', 'drug', 'Glimepiride', 'glimepiride', ARRAY['amaryl'], ARRAY['diabetes', 'sulfonylurea'], true),
('D_SEMAGLUTIDE', 'drug', 'Semaglutide', 'semaglutide', ARRAY['ozempic', 'wegovy'], ARRAY['diabetes', 'glp1'], true),
('D_LIRAGLUTIDE', 'drug', 'Liraglutide', 'liraglutide', ARRAY['victoza', 'saxenda'], ARRAY['diabetes', 'glp1'], true),
('D_EMPAGLIFLOZIN', 'drug', 'Empagliflozin', 'empagliflozin', ARRAY['jardiance'], ARRAY['diabetes', 'sglt2'], true),

-- CNS Depressants
('D_DIAZEPAM', 'drug', 'Diazepam', 'diazepam', ARRAY['valium'], ARRAY['benzodiazepine', 'anxiety', 'cns'], true),
('D_LORAZEPAM', 'drug', 'Lorazepam', 'lorazepam', ARRAY['ativan'], ARRAY['benzodiazepine', 'anxiety', 'cns'], true),
('D_CLONAZEPAM', 'drug', 'Clonazepam', 'clonazepam', ARRAY['klonopin'], ARRAY['benzodiazepine', 'anxiety', 'cns'], true),
('D_ZOLPIDEM', 'drug', 'Zolpidem', 'zolpidem', ARRAY['ambien'], ARRAY['sleep', 'hypnotic', 'cns'], true),
('D_DIPHENHYDRAMINE', 'drug', 'Diphenhydramine', 'diphenhydramine', ARRAY['benadryl'], ARRAY['antihistamine', 'sleep', 'cns'], true)

ON CONFLICT (substance_id) DO NOTHING;

-- Add supplements
INSERT INTO checker_substances (substance_id, type, display_name, canonical_name, aliases, tags, is_active) VALUES
-- Anticoagulant-related
('S_CRANBERRY', 'supplement', 'Cranberry', 'cranberry', ARRAY['cranberry extract'], ARRAY['fruit', 'urinary'], true),

-- Psychiatric
('S_5HTP', 'supplement', '5-HTP', '5-htp', ARRAY['5-hydroxytryptophan', 'hydroxytryptophan'], ARRAY['mood', 'sleep', 'serotonin'], true),
('S_SAME', 'supplement', 'SAMe', 'same', ARRAY['s-adenosyl methionine', 's-adenosylmethionine'], ARRAY['mood', 'liver', 'joint'], true),
('S_TRYPTOPHAN', 'supplement', 'L-Tryptophan', 'tryptophan', ARRAY['l-tryptophan'], ARRAY['amino acid', 'mood', 'sleep'], true),
('S_RHODIOLA', 'supplement', 'Rhodiola', 'rhodiola', ARRAY['rhodiola rosea', 'golden root'], ARRAY['adaptogen', 'mood', 'energy'], true),

-- Thyroid
('S_SOY', 'supplement', 'Soy', 'soy', ARRAY['soy isoflavones', 'soy protein'], ARRAY['plant', 'hormone'], true),
('S_IODINE', 'supplement', 'Iodine', 'iodine', ARRAY['potassium iodide'], ARRAY['mineral', 'thyroid'], true),
('S_SELENIUM', 'supplement', 'Selenium', 'selenium', ARRAY['selenomethionine'], ARRAY['mineral', 'thyroid', 'antioxidant'], true),
('S_CHROMIUM', 'supplement', 'Chromium', 'chromium', ARRAY['chromium picolinate'], ARRAY['mineral', 'blood sugar'], true),
('S_BERBERINE', 'supplement', 'Berberine', 'berberine', ARRAY['berberine hcl'], ARRAY['alkaloid', 'blood sugar', 'metabolic'], true),

-- Diabetes
('S_CINNAMON', 'supplement', 'Cinnamon', 'cinnamon', ARRAY['cinnamon extract', 'ceylon cinnamon'], ARRAY['spice', 'blood sugar'], true),
('S_ALPHA_LIPOIC_ACID', 'supplement', 'Alpha-Lipoic Acid', 'alpha-lipoic acid', ARRAY['ala', 'lipoic acid'], ARRAY['antioxidant', 'nerve', 'blood sugar'], true),
('S_FENUGREEK', 'supplement', 'Fenugreek', 'fenugreek', ARRAY['fenugreek seed'], ARRAY['herb', 'blood sugar'], true),
('S_GYMNEMA', 'supplement', 'Gymnema', 'gymnema', ARRAY['gymnema sylvestre'], ARRAY['herb', 'blood sugar'], true),

-- CNS
('S_KAVA', 'supplement', 'Kava', 'kava', ARRAY['kava kava', 'piper methysticum'], ARRAY['herb', 'anxiety', 'sleep'], true),
('S_PASSIONFLOWER', 'supplement', 'Passionflower', 'passionflower', ARRAY['passiflora'], ARRAY['herb', 'anxiety', 'sleep'], true),
('S_L_THEANINE', 'supplement', 'L-Theanine', 'l-theanine', ARRAY['theanine'], ARRAY['amino acid', 'relaxation', 'focus'], true)

ON CONFLICT (substance_id) DO NOTHING;
