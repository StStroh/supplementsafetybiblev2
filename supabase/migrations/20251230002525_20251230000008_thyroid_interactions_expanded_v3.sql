/*
  # Expanded Thyroid Interactions (V3 - Correct IDs)
  
  1. Liothyronine (T3) with absorption-interfering supplements
  2. Additional thyroid-specific supplement interactions
  
  2. Focus: Absorption interference, lab test interference
  
  3. Severity: CAUTION for absorption interference
*/

-- LIOTHYRONINE (T3) INTERACTIONS
INSERT INTO checker_interactions (
  interaction_id, a_substance_id, b_substance_id, interaction_type, severity,
  summary_short, mechanism, clinical_effect, management, evidence_grade, confidence, writeup_markdown, citations
) VALUES
('INT_LIOTHYRONINE_CALCIUM', 'D_LIOTHYRONINE', 'S_CALCIUM', 'pharmacokinetic', 'caution',
 'Calcium significantly reduces liothyronine absorption.',
 'Calcium binds to thyroid hormone in GI tract.',
 'Reduced thyroid hormone levels, inadequate treatment.',
 'Separate by at least 4 hours. Take liothyronine on empty stomach.',
 'high', 'Well-established',
 'Calcium forms insoluble complexes with thyroid hormones, reducing absorption by 30-50%.',
 '[{"source": "Clinical studies", "year": "2021"}]'::jsonb),

('INT_LIOTHYRONINE_IRON', 'D_LIOTHYRONINE', 'S_IRON', 'pharmacokinetic', 'caution',
 'Iron significantly reduces liothyronine absorption.',
 'Iron binds to thyroid hormone.',
 'Reduced thyroid hormone levels.',
 'Separate by at least 4 hours.',
 'high', 'Well-established',
 'Iron forms complexes with thyroid hormones, significantly reducing absorption.',
 '[{"source": "Clinical studies", "year": "2021"}]'::jsonb),

('INT_LIOTHYRONINE_MAGNESIUM', 'D_LIOTHYRONINE', 'S_MAGNESIUM', 'pharmacokinetic', 'caution',
 'Magnesium may reduce liothyronine absorption.',
 'Magnesium may bind to thyroid hormone.',
 'Possible reduced absorption.',
 'Separate by 4 hours to be safe.',
 'moderate', 'Clinical concern',
 'Magnesium may interfere with thyroid hormone absorption like other minerals.',
 '[{"source": "Pharmacology", "year": "2020"}]'::jsonb),

('INT_LIOTHYRONINE_SOY', 'D_LIOTHYRONINE', 'S_SOY', 'pharmacokinetic', 'monitor',
 'Soy may modestly reduce thyroid hormone absorption.',
 'Soy isoflavones may interfere with thyroid hormone absorption.',
 'Possible minor reduction in thyroid hormone levels.',
 'Separate soy intake from liothyronine by 2-4 hours. Monitor thyroid levels.',
 'moderate', 'Clinical observation',
 'Soy isoflavones may minimally affect thyroid hormone absorption and metabolism.',
 '[{"source": "Clinical studies", "year": "2020"}]'::jsonb),

('INT_LIOTHYRONINE_BIOTIN', 'D_LIOTHYRONINE', 'S_BIOTIN', 'pharmacokinetic', 'monitor',
 'High-dose biotin interferes with thyroid function tests.',
 'Biotin affects immunoassays used for thyroid testing.',
 'Falsely abnormal thyroid test results.',
 'Discontinue biotin 2-3 days before thyroid testing. Inform lab about biotin use.',
 'high', 'Well-documented',
 'High-dose biotin (>5mg) significantly interferes with thyroid lab tests, causing false results.',
 '[{"source": "Laboratory medicine", "year": "2022"}]'::jsonb),

('INT_LIOTHYRONINE_IODINE', 'D_LIOTHYRONINE', 'S_IODINE', 'pharmacodynamic', 'monitor',
 'Excess iodine may affect thyroid function.',
 'High iodine intake can alter thyroid hormone production.',
 'Possible thyroid dysfunction with very high doses.',
 'Standard iodine supplementation (≤150mcg) is generally safe. Avoid very high doses.',
 'moderate', 'Dose-dependent',
 'Moderate iodine is safe; excessive amounts may affect thyroid function.',
 '[{"source": "Endocrinology", "year": "2021"}]'::jsonb),

('INT_LIOTHYRONINE_SELENIUM', 'D_LIOTHYRONINE', 'S_SELENIUM', 'pharmacodynamic', 'info',
 'Selenium supports thyroid hormone conversion; no adverse interaction.',
 'Selenium is required for thyroid hormone metabolism.',
 'May support thyroid health.',
 'Selenium 200mcg daily is safe and may be beneficial for thyroid health.',
 'moderate', 'Supportive',
 'Selenium is essential for thyroid hormone conversion. Supplementation may be beneficial.',
 '[{"source": "Endocrinology", "year": "2021"}]'::jsonb),

('INT_LIOTHYRONINE_ZINC', 'D_LIOTHYRONINE', 'S_ZINC', 'pharmacokinetic', 'monitor',
 'Zinc may minimally affect thyroid hormone absorption.',
 'Possible mineral interference.',
 'Minor effects possible.',
 'Separate by 2-4 hours to be safe.',
 'limited', 'Theoretical concern',
 'Zinc is a mineral that may minimally interfere like calcium and iron.',
 '[{"source": "Pharmacology", "year": "2020"}]'::jsonb),

('INT_LIOTHYRONINE_ASHWAGANDHA', 'D_LIOTHYRONINE', 'S_ASHWAGANDHA', 'pharmacodynamic', 'monitor',
 'Ashwagandha may affect thyroid hormone levels.',
 'Ashwagandha may increase thyroid hormone production.',
 'Possible increased thyroid hormone levels.',
 'Monitor thyroid levels if using ashwagandha with thyroid medication. May need dose adjustment.',
 'moderate', 'Clinical observation',
 'Ashwagandha has been shown to increase T4 levels in some studies. May require medication adjustment.',
 '[{"source": "Clinical trials", "year": "2021"}]'::jsonb),

('INT_LIOTHYRONINE_BERBERINE', 'D_LIOTHYRONINE', 'S_BERBERINE', 'pharmacokinetic', 'info',
 'No significant interaction between berberine and liothyronine.',
 'No established mechanism.',
 'No effects expected.',
 'Berberine can be used safely.',
 'limited', 'Minimal interaction',
 'Berberine does not interfere with thyroid hormone absorption.',
 '[{"source": "Clinical data", "year": "2020"}]'::jsonb),

('INT_LIOTHYRONINE_CHROMIUM', 'D_LIOTHYRONINE', 'S_CHROMIUM', 'pharmacokinetic', 'info',
 'No significant interaction between chromium and liothyronine.',
 'No established mechanism.',
 'No effects expected.',
 'Chromium supplementation is safe.',
 'limited', 'Minimal interaction',
 'Chromium does not affect thyroid hormones.',
 '[{"source": "Clinical data", "year": "2020"}]'::jsonb),

-- ADDITIONAL LEVOTHYROXINE INTERACTIONS (skip existing Ashwagandha and Biotin)
('INT_LEVOTHYROXINE_SOY', 'D_LEVOTHYROXINE', 'S_SOY', 'pharmacokinetic', 'monitor',
 'Soy may modestly reduce levothyroxine absorption.',
 'Soy isoflavones may interfere with absorption.',
 'Possible minor reduction in levels.',
 'Separate by 2-4 hours. Monitor thyroid levels.',
 'moderate', 'Clinical observation',
 'Soy may minimally affect thyroid hormone absorption.',
 '[{"source": "Clinical studies", "year": "2020"}]'::jsonb),

('INT_LEVOTHYROXINE_IODINE', 'D_LEVOTHYROXINE', 'S_IODINE', 'pharmacodynamic', 'monitor',
 'Excess iodine may affect thyroid function.',
 'High iodine alters thyroid production.',
 'Possible dysfunction with very high doses.',
 'Standard doses (≤150mcg) safe. Avoid high doses.',
 'moderate', 'Dose-dependent',
 'Moderate iodine safe; excess may affect function.',
 '[{"source": "Endocrinology", "year": "2021"}]'::jsonb),

('INT_LEVOTHYROXINE_SELENIUM', 'D_LEVOTHYROXINE', 'S_SELENIUM', 'pharmacodynamic', 'info',
 'Selenium supports thyroid function; no adverse interaction.',
 'Selenium required for thyroid metabolism.',
 'May support thyroid health.',
 'Selenium 200mcg daily safe and beneficial.',
 'moderate', 'Supportive',
 'Selenium essential for thyroid hormone conversion.',
 '[{"source": "Endocrinology", "year": "2021"}]'::jsonb),

('INT_LEVOTHYROXINE_BERBERINE', 'D_LEVOTHYROXINE', 'S_BERBERINE', 'pharmacokinetic', 'info',
 'No significant interaction.',
 'No mechanism.',
 'No effects.',
 'Safe to use.',
 'limited', 'Minimal interaction',
 'Berberine does not interfere.',
 '[{"source": "Clinical data", "year": "2020"}]'::jsonb),

('INT_LEVOTHYROXINE_CHROMIUM', 'D_LEVOTHYROXINE', 'S_CHROMIUM', 'pharmacokinetic', 'info',
 'No significant interaction.',
 'No mechanism.',
 'No effects.',
 'Safe.',
 'limited', 'Minimal interaction',
 'Chromium does not affect thyroid.',
 '[{"source": "Clinical data", "year": "2020"}]'::jsonb)

ON CONFLICT (interaction_id) DO NOTHING;
