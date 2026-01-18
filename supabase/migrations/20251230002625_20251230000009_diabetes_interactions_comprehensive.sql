/*
  # Comprehensive Diabetes Medication Interactions
  
  1. Diabetes medications with glucose-lowering supplements
    - Insulin, Metformin (expand), Sulfonylureas (Glipizide, Glyburide, Glimepiride)
    - GLP-1s (Semaglutide, Liraglutide), SGLT2 (Empagliflozin)
  
  2. Supplements: Berberine, Cinnamon, Chromium, Alpha-lipoic acid, Fenugreek, Gymnema
  
  3. Focus: Additive hypoglycemia risk
  
  4. Severity: CAUTION/MONITOR for hypoglycemia risk
*/

-- INSULIN INTERACTIONS
INSERT INTO checker_interactions (
  interaction_id, a_substance_id, b_substance_id, interaction_type, severity,
  summary_short, mechanism, clinical_effect, management, evidence_grade, confidence, writeup_markdown, citations
) VALUES
('INT_INSULIN_BERBERINE', 'D_INSULIN', 'S_BERBERINE', 'pharmacodynamic', 'caution',
 'Berberine significantly lowers blood glucose; may enhance insulin effects.',
 'Berberine improves insulin sensitivity and glucose uptake.',
 'Increased hypoglycemia risk, especially with higher berberine doses.',
 'Monitor blood glucose closely. May need insulin dose reduction. Start berberine at low dose.',
 'high', 'Well-established',
 'Berberine has potent glucose-lowering effects comparable to metformin. Can cause hypoglycemia with insulin.',
 '[{"source": "Clinical trials", "year": "2022"}]'::jsonb),

('INT_INSULIN_CINNAMON', 'D_INSULIN', 'S_CINNAMON', 'pharmacodynamic', 'monitor',
 'Cinnamon may modestly lower blood glucose.',
 'Improves insulin sensitivity.',
 'Possible additive glucose lowering.',
 'Monitor blood glucose. Cinnamon effects are modest but monitor for hypoglycemia.',
 'moderate', 'Clinical observation',
 'Cinnamon has mild glucose-lowering effects. Monitor when combined with insulin.',
 '[{"source": "Meta-analysis", "year": "2021"}]'::jsonb),

('INT_INSULIN_CHROMIUM', 'D_INSULIN', 'S_CHROMIUM', 'pharmacodynamic', 'monitor',
 'Chromium may improve insulin sensitivity.',
 'Enhances insulin signaling.',
 'Possible modest glucose lowering.',
 'Monitor blood glucose. Chromium effects are generally mild.',
 'moderate', 'Mixed evidence',
 'Chromium picolinate may modestly improve glucose control in some individuals.',
 '[{"source": "Clinical studies", "year": "2021"}]'::jsonb),

('INT_INSULIN_ALPHA_LIPOIC_ACID', 'D_INSULIN', 'S_ALPHA_LIPOIC_ACID', 'pharmacodynamic', 'monitor',
 'Alpha-lipoic acid may improve insulin sensitivity.',
 'Enhances glucose uptake.',
 'Possible additive glucose lowering.',
 'Monitor blood glucose. ALA generally safe but monitor for hypoglycemia.',
 'moderate', 'Clinical observation',
 'Alpha-lipoic acid improves insulin sensitivity. May enhance insulin effects.',
 '[{"source": "Clinical trials", "year": "2021"}]'::jsonb),

('INT_INSULIN_FENUGREEK', 'D_INSULIN', 'S_FENUGREEK', 'pharmacodynamic', 'caution',
 'Fenugreek significantly lowers blood glucose.',
 'Slows carbohydrate absorption and improves insulin sensitivity.',
 'Increased hypoglycemia risk.',
 'Monitor blood glucose closely. May need insulin dose reduction.',
 'moderate', 'Clinical concern',
 'Fenugreek has significant glucose-lowering effects. Can cause hypoglycemia with insulin.',
 '[{"source": "Clinical studies", "year": "2021"}]'::jsonb),

('INT_INSULIN_GYMNEMA', 'D_INSULIN', 'S_GYMNEMA', 'pharmacodynamic', 'caution',
 'Gymnema lowers blood glucose and may enhance insulin effects.',
 'Increases insulin secretion and improves sensitivity.',
 'Increased hypoglycemia risk.',
 'Monitor blood glucose closely. May need insulin dose adjustment.',
 'moderate', 'Clinical concern',
 'Gymnema has glucose-lowering properties. Monitor closely with insulin.',
 '[{"source": "Herbology", "year": "2021"}]'::jsonb),

-- METFORMIN ADDITIONAL INTERACTIONS (already has 20)
('INT_METFORMIN_BERBERINE', 'D_METFORMIN', 'S_BERBERINE', 'pharmacodynamic', 'monitor',
 'Berberine and metformin have similar glucose-lowering mechanisms.',
 'Both affect hepatic glucose production and insulin sensitivity.',
 'Additive glucose lowering; generally safe but monitor.',
 'Monitor blood glucose. Combination may be beneficial but watch for GI side effects.',
 'high', 'Well-studied',
 'Berberine and metformin work similarly. Combination may enhance benefits.',
 '[{"source": "Clinical trials", "year": "2022"}]'::jsonb),

('INT_METFORMIN_CINNAMON', 'D_METFORMIN', 'S_CINNAMON', 'pharmacodynamic', 'info',
 'Cinnamon may provide modest additional glucose benefits.',
 'Complementary insulin sensitivity effects.',
 'Possible additive benefits.',
 'Safe combination. Monitor blood glucose.',
 'moderate', 'Complementary',
 'Cinnamon and metformin may work synergistically.',
 '[{"source": "Clinical studies", "year": "2021"}]'::jsonb),

('INT_METFORMIN_CHROMIUM', 'D_METFORMIN', 'S_CHROMIUM', 'pharmacodynamic', 'info',
 'Chromium may complement metformin effects.',
 'Both improve insulin sensitivity.',
 'Possible modest benefits.',
 'Safe combination.',
 'limited', 'Minimal interaction',
 'Chromium and metformin may have complementary effects.',
 '[{"source": "Clinical data", "year": "2021"}]'::jsonb),

-- GLIPIZIDE INTERACTIONS (Sulfonylurea)
('INT_GLIPIZIDE_BERBERINE', 'D_GLIPIZIDE', 'S_BERBERINE', 'pharmacodynamic', 'caution',
 'Berberine may significantly increase hypoglycemia risk with glipizide.',
 'Additive glucose-lowering effects.',
 'Serious hypoglycemia risk.',
 'Monitor blood glucose closely. May need glipizide dose reduction.',
 'high', 'Clinical concern',
 'Sulfonylureas cause hypoglycemia. Berberine adds significant risk.',
 '[{"source": "Clinical pharmacology", "year": "2022"}]'::jsonb),

('INT_GLIPIZIDE_FENUGREEK', 'D_GLIPIZIDE', 'S_FENUGREEK', 'pharmacodynamic', 'caution',
 'Fenugreek may increase hypoglycemia risk.',
 'Additive glucose lowering.',
 'Increased hypoglycemia risk.',
 'Monitor closely. May need dose adjustment.',
 'moderate', 'Clinical concern',
 'Fenugreek enhances hypoglycemia risk with sulfonylureas.',
 '[{"source": "Clinical studies", "year": "2021"}]'::jsonb),

('INT_GLIPIZIDE_GYMNEMA', 'D_GLIPIZIDE', 'S_GYMNEMA', 'pharmacodynamic', 'caution',
 'Gymnema may increase hypoglycemia risk.',
 'Additive insulin secretion and sensitivity.',
 'Increased hypoglycemia risk.',
 'Monitor closely.',
 'moderate', 'Clinical concern',
 'Gymnema may enhance sulfonylurea effects.',
 '[{"source": "Herbology", "year": "2021"}]'::jsonb),

('INT_GLIPIZIDE_CINNAMON', 'D_GLIPIZIDE', 'S_CINNAMON', 'pharmacodynamic', 'monitor',
 'Cinnamon may modestly increase glucose lowering.',
 'Mild insulin sensitivity effects.',
 'Possible additive effects.',
 'Monitor blood glucose.',
 'moderate', 'Clinical observation',
 'Cinnamon has mild effects but monitor with sulfonylureas.',
 '[{"source": "Clinical data", "year": "2021"}]'::jsonb),

-- GLYBURIDE INTERACTIONS (Sulfonylurea)
('INT_GLYBURIDE_BERBERINE', 'D_GLYBURIDE', 'S_BERBERINE', 'pharmacodynamic', 'caution',
 'Berberine significantly increases hypoglycemia risk with glyburide.',
 'Additive glucose-lowering effects.',
 'Serious hypoglycemia risk.',
 'Monitor blood glucose closely. May need dose reduction.',
 'high', 'Clinical concern',
 'Glyburide has high hypoglycemia risk. Berberine adds significant risk.',
 '[{"source": "Clinical pharmacology", "year": "2022"}]'::jsonb),

('INT_GLYBURIDE_FENUGREEK', 'D_GLYBURIDE', 'S_FENUGREEK', 'pharmacodynamic', 'caution',
 'Fenugreek may increase hypoglycemia risk.',
 'Additive glucose lowering.',
 'Increased hypoglycemia risk.',
 'Monitor closely. May need adjustment.',
 'moderate', 'Clinical concern',
 'Fenugreek enhances hypoglycemia risk.',
 '[{"source": "Clinical studies", "year": "2021"}]'::jsonb),

('INT_GLYBURIDE_GYMNEMA', 'D_GLYBURIDE', 'S_GYMNEMA', 'pharmacodynamic', 'caution',
 'Gymnema may increase hypoglycemia risk.',
 'Additive effects.',
 'Increased hypoglycemia risk.',
 'Monitor closely.',
 'moderate', 'Clinical concern',
 'Gymnema may enhance effects.',
 '[{"source": "Herbology", "year": "2021"}]'::jsonb),

-- GLIMEPIRIDE INTERACTIONS (Sulfonylurea)
('INT_GLIMEPIRIDE_BERBERINE', 'D_GLIMEPIRIDE', 'S_BERBERINE', 'pharmacodynamic', 'caution',
 'Berberine significantly increases hypoglycemia risk with glimepiride.',
 'Additive glucose-lowering effects.',
 'Serious hypoglycemia risk.',
 'Monitor blood glucose closely. May need dose reduction.',
 'high', 'Clinical concern',
 'Sulfonylureas cause hypoglycemia. Berberine adds significant risk.',
 '[{"source": "Clinical pharmacology", "year": "2022"}]'::jsonb),

('INT_GLIMEPIRIDE_FENUGREEK', 'D_GLIMEPIRIDE', 'S_FENUGREEK', 'pharmacodynamic', 'caution',
 'Fenugreek may increase hypoglycemia risk.',
 'Additive glucose lowering.',
 'Increased hypoglycemia risk.',
 'Monitor closely.',
 'moderate', 'Clinical concern',
 'Fenugreek enhances hypoglycemia risk.',
 '[{"source": "Clinical studies", "year": "2021"}]'::jsonb),

('INT_GLIMEPIRIDE_GYMNEMA', 'D_GLIMEPIRIDE', 'S_GYMNEMA', 'pharmacodynamic', 'caution',
 'Gymnema may increase hypoglycemia risk.',
 'Additive effects.',
 'Increased hypoglycemia risk.',
 'Monitor closely.',
 'moderate', 'Clinical concern',
 'Gymnema may enhance effects.',
 '[{"source": "Herbology", "year": "2021"}]'::jsonb),

-- SEMAGLUTIDE INTERACTIONS (GLP-1)
('INT_SEMAGLUTIDE_BERBERINE', 'D_SEMAGLUTIDE', 'S_BERBERINE', 'pharmacodynamic', 'monitor',
 'Berberine may enhance glucose-lowering effects.',
 'Additive glucose control.',
 'Possible enhanced glucose lowering.',
 'Monitor blood glucose. GLP-1s have low hypoglycemia risk alone.',
 'moderate', 'Clinical observation',
 'Berberine and GLP-1s may work synergistically with low hypoglycemia risk.',
 '[{"source": "Clinical data", "year": "2022"}]'::jsonb),

('INT_SEMAGLUTIDE_ALPHA_LIPOIC_ACID', 'D_SEMAGLUTIDE', 'S_ALPHA_LIPOIC_ACID', 'pharmacodynamic', 'info',
 'Alpha-lipoic acid may provide complementary benefits.',
 'Different mechanisms.',
 'Possible additive benefits.',
 'Safe combination.',
 'limited', 'Complementary',
 'ALA and GLP-1s work through different pathways.',
 '[{"source": "Clinical data", "year": "2021"}]'::jsonb),

-- LIRAGLUTIDE INTERACTIONS (GLP-1)
('INT_LIRAGLUTIDE_BERBERINE', 'D_LIRAGLUTIDE', 'S_BERBERINE', 'pharmacodynamic', 'monitor',
 'Berberine may enhance glucose-lowering effects.',
 'Additive glucose control.',
 'Possible enhanced effects.',
 'Monitor blood glucose. Low hypoglycemia risk.',
 'moderate', 'Clinical observation',
 'Berberine and GLP-1s may work synergistically.',
 '[{"source": "Clinical data", "year": "2022"}]'::jsonb),

('INT_LIRAGLUTIDE_CINNAMON', 'D_LIRAGLUTIDE', 'S_CINNAMON', 'pharmacodynamic', 'info',
 'Cinnamon may provide modest additional benefits.',
 'Complementary effects.',
 'Possible mild benefits.',
 'Safe combination.',
 'limited', 'Complementary',
 'Cinnamon and GLP-1s safe together.',
 '[{"source": "Clinical data", "year": "2021"}]'::jsonb),

-- EMPAGLIFLOZIN INTERACTIONS (SGLT2)
('INT_EMPAGLIFLOZIN_BERBERINE', 'D_EMPAGLIFLOZIN', 'S_BERBERINE', 'pharmacodynamic', 'monitor',
 'Berberine may enhance glucose-lowering effects.',
 'Different but complementary mechanisms.',
 'Possible enhanced glucose control.',
 'Monitor blood glucose. SGLT2s have low hypoglycemia risk alone.',
 'moderate', 'Clinical observation',
 'Berberine and SGLT2 inhibitors work through different pathways.',
 '[{"source": "Clinical data", "year": "2022"}]'::jsonb),

('INT_EMPAGLIFLOZIN_CHROMIUM', 'D_EMPAGLIFLOZIN', 'S_CHROMIUM', 'pharmacodynamic', 'info',
 'Chromium may complement SGLT2 effects.',
 'Different mechanisms.',
 'Possible modest benefits.',
 'Safe combination.',
 'limited', 'Complementary',
 'Chromium and SGLT2s safe together.',
 '[{"source": "Clinical data", "year": "2021"}]'::jsonb),

('INT_EMPAGLIFLOZIN_MAGNESIUM', 'D_EMPAGLIFLOZIN', 'S_MAGNESIUM', 'pharmacokinetic', 'info',
 'No significant interaction.',
 'No established mechanism.',
 'No effects expected.',
 'Magnesium supplementation is safe.',
 'limited', 'No interaction',
 'Magnesium does not affect SGLT2 inhibitors.',
 '[{"source": "Clinical data", "year": "2020"}]'::jsonb)

ON CONFLICT (interaction_id) DO NOTHING;
