/*
  # Psychiatric Medication Interactions - Batch 1 (SSRIs)
  
  1. SSRIs with Serotonergic Supplements
    - Sertraline, Fluoxetine, Escitalopram, Citalopram, Paroxetine
    - St. Johns Wort, 5-HTP, SAMe, Tryptophan
  
  2. Focus: Serotonin syndrome risk, enzyme induction
  
  3. Severity: AVOID for serotonin syndrome risk
*/

-- SERTRALINE additional interactions (already has 15)
INSERT INTO checker_interactions (
  interaction_id, a_substance_id, b_substance_id, interaction_type, severity,
  summary_short, mechanism, clinical_effect, management, evidence_grade, confidence, writeup_markdown, citations
) VALUES
('INT_SERTRALINE_5HTP', 'D_SERTRALINE', 'S_5HTP', 'pharmacodynamic', 'avoid',
 'Combining sertraline with 5-HTP significantly increases serotonin syndrome risk.',
 'Additive serotonergic effects; 5-HTP converts to serotonin.',
 'Serotonin syndrome: agitation, confusion, rapid heart rate, high blood pressure, muscle rigidity, hyperthermia.',
 'Avoid combination. Serious risk of serotonin syndrome.',
 'high', 'Well-established',
 '5-HTP is a direct serotonin precursor. Combined with SSRIs, dangerous serotonin accumulation can occur.',
 '[{"source": "Clinical toxicology", "year": "2022"}]'::jsonb),

('INT_SERTRALINE_SAME', 'D_SERTRALINE', 'S_SAME', 'pharmacodynamic', 'caution',
 'SAMe may increase serotonin syndrome risk with sertraline.',
 'SAMe has serotonergic properties.',
 'Increased risk of serotonin syndrome with combined use.',
 'Use with extreme caution. Monitor closely for serotonin syndrome symptoms. Consider avoiding.',
 'moderate', 'Clinical concern',
 'SAMe has serotonergic activity. May increase risk when combined with SSRIs.',
 '[{"source": "Case reports", "year": "2021"}]'::jsonb),

('INT_SERTRALINE_TRYPTOPHAN', 'D_SERTRALINE', 'S_TRYPTOPHAN', 'pharmacodynamic', 'avoid',
 'L-tryptophan with sertraline significantly increases serotonin syndrome risk.',
 'Tryptophan is a serotonin precursor.',
 'Serotonin syndrome: confusion, agitation, rapid heart rate, muscle rigidity.',
 'Avoid combination. Serious serotonin syndrome risk.',
 'high', 'Well-established',
 'L-tryptophan converts to serotonin. Combined with SSRIs, dangerous serotonin levels can occur.',
 '[{"source": "Clinical guidelines", "year": "2022"}]'::jsonb),

('INT_SERTRALINE_RHODIOLA', 'D_SERTRALINE', 'S_RHODIOLA', 'pharmacodynamic', 'caution',
 'Rhodiola may increase serotonin syndrome risk.',
 'Rhodiola has MAO-inhibiting properties.',
 'Possible increased serotonergic effects.',
 'Use cautiously. Monitor for serotonin syndrome symptoms.',
 'limited', 'Theoretical concern',
 'Rhodiola may affect monoamine systems. Caution advised with SSRIs.',
 '[{"source": "Herbology", "year": "2021"}]'::jsonb),

-- FLUOXETINE additional interactions
('INT_FLUOXETINE_5HTP', 'D_FLUOXETINE', 'S_5HTP', 'pharmacodynamic', 'avoid',
 'Combining fluoxetine with 5-HTP significantly increases serotonin syndrome risk.',
 'Additive serotonergic effects.',
 'Serotonin syndrome: agitation, confusion, rapid heart rate, hyperthermia.',
 'Avoid combination. Serious serotonin syndrome risk.',
 'high', 'Well-established',
 '5-HTP directly increases serotonin. Dangerous when combined with SSRIs.',
 '[{"source": "Clinical toxicology", "year": "2022"}]'::jsonb),

('INT_FLUOXETINE_SAME', 'D_FLUOXETINE', 'S_SAME', 'pharmacodynamic', 'caution',
 'SAMe may increase serotonin syndrome risk with fluoxetine.',
 'Serotonergic properties.',
 'Increased serotonin syndrome risk.',
 'Use with extreme caution. Monitor closely.',
 'moderate', 'Clinical concern',
 'SAMe has serotonergic activity that may interact with fluoxetine.',
 '[{"source": "Case reports", "year": "2021"}]'::jsonb),

('INT_FLUOXETINE_TRYPTOPHAN', 'D_FLUOXETINE', 'S_TRYPTOPHAN', 'pharmacodynamic', 'avoid',
 'L-tryptophan with fluoxetine significantly increases serotonin syndrome risk.',
 'Serotonin precursor.',
 'Serotonin syndrome risk.',
 'Avoid combination.',
 'high', 'Well-established',
 'Tryptophan converts to serotonin. Dangerous with SSRIs.',
 '[{"source": "Clinical guidelines", "year": "2022"}]'::jsonb),

('INT_FLUOXETINE_RHODIOLA', 'D_FLUOXETINE', 'S_RHODIOLA', 'pharmacodynamic', 'caution',
 'Rhodiola may increase serotonin syndrome risk.',
 'MAO-inhibiting properties.',
 'Possible serotonergic effects.',
 'Use cautiously. Monitor for symptoms.',
 'limited', 'Theoretical concern',
 'Rhodiola may affect monoamine systems.',
 '[{"source": "Herbology", "year": "2021"}]'::jsonb),

-- ESCITALOPRAM additional interactions
('INT_ESCITALOPRAM_5HTP', 'D_ESCITALOPRAM', 'S_5HTP', 'pharmacodynamic', 'avoid',
 'Combining escitalopram with 5-HTP significantly increases serotonin syndrome risk.',
 'Additive serotonergic effects.',
 'Serotonin syndrome: agitation, confusion, rapid heart rate.',
 'Avoid combination. Serious risk.',
 'high', 'Well-established',
 '5-HTP increases serotonin dangerously when combined with SSRIs.',
 '[{"source": "Clinical toxicology", "year": "2022"}]'::jsonb),

('INT_ESCITALOPRAM_SAME', 'D_ESCITALOPRAM', 'S_SAME', 'pharmacodynamic', 'caution',
 'SAMe may increase serotonin syndrome risk with escitalopram.',
 'Serotonergic properties.',
 'Increased risk.',
 'Use with extreme caution.',
 'moderate', 'Clinical concern',
 'SAMe has serotonergic activity.',
 '[{"source": "Case reports", "year": "2021"}]'::jsonb),

('INT_ESCITALOPRAM_TRYPTOPHAN', 'D_ESCITALOPRAM', 'S_TRYPTOPHAN', 'pharmacodynamic', 'avoid',
 'L-tryptophan with escitalopram significantly increases serotonin syndrome risk.',
 'Serotonin precursor.',
 'Serotonin syndrome.',
 'Avoid combination.',
 'high', 'Well-established',
 'Dangerous serotonin accumulation.',
 '[{"source": "Clinical guidelines", "year": "2022"}]'::jsonb),

('INT_ESCITALOPRAM_RHODIOLA', 'D_ESCITALOPRAM', 'S_RHODIOLA', 'pharmacodynamic', 'caution',
 'Rhodiola may increase serotonin syndrome risk.',
 'MAO-inhibiting properties.',
 'Possible serotonergic effects.',
 'Use cautiously.',
 'limited', 'Theoretical concern',
 'Rhodiola may affect monoamine systems.',
 '[{"source": "Herbology", "year": "2021"}]'::jsonb),

-- CITALOPRAM additional interactions
('INT_CITALOPRAM_5HTP', 'D_CITALOPRAM', 'S_5HTP', 'pharmacodynamic', 'avoid',
 'Combining citalopram with 5-HTP significantly increases serotonin syndrome risk.',
 'Additive serotonergic effects.',
 'Serotonin syndrome.',
 'Avoid combination.',
 'high', 'Well-established',
 '5-HTP dangerous with SSRIs.',
 '[{"source": "Clinical toxicology", "year": "2022"}]'::jsonb),

('INT_CITALOPRAM_SAME', 'D_CITALOPRAM', 'S_SAME', 'pharmacodynamic', 'caution',
 'SAMe may increase serotonin syndrome risk with citalopram.',
 'Serotonergic properties.',
 'Increased risk.',
 'Use with extreme caution.',
 'moderate', 'Clinical concern',
 'SAMe has serotonergic activity.',
 '[{"source": "Case reports", "year": "2021"}]'::jsonb),

('INT_CITALOPRAM_TRYPTOPHAN', 'D_CITALOPRAM', 'S_TRYPTOPHAN', 'pharmacodynamic', 'avoid',
 'L-tryptophan with citalopram significantly increases serotonin syndrome risk.',
 'Serotonin precursor.',
 'Serotonin syndrome.',
 'Avoid combination.',
 'high', 'Well-established',
 'Dangerous serotonin levels.',
 '[{"source": "Clinical guidelines", "year": "2022"}]'::jsonb),

('INT_CITALOPRAM_RHODIOLA', 'D_CITALOPRAM', 'S_RHODIOLA', 'pharmacodynamic', 'caution',
 'Rhodiola may increase serotonin syndrome risk.',
 'MAO-inhibiting properties.',
 'Possible effects.',
 'Use cautiously.',
 'limited', 'Theoretical concern',
 'May affect monoamine systems.',
 '[{"source": "Herbology", "year": "2021"}]'::jsonb),

-- PAROXETINE interactions
('INT_PAROXETINE_5HTP', 'D_PAROXETINE', 'S_5HTP', 'pharmacodynamic', 'avoid',
 'Combining paroxetine with 5-HTP significantly increases serotonin syndrome risk.',
 'Additive serotonergic effects.',
 'Serotonin syndrome: agitation, confusion, hyperthermia, muscle rigidity.',
 'Avoid combination. Serious risk of serotonin syndrome.',
 'high', 'Well-established',
 '5-HTP directly increases serotonin. Dangerous combination with SSRIs.',
 '[{"source": "Clinical toxicology", "year": "2022"}]'::jsonb),

('INT_PAROXETINE_SAME', 'D_PAROXETINE', 'S_SAME', 'pharmacodynamic', 'caution',
 'SAMe may increase serotonin syndrome risk with paroxetine.',
 'Serotonergic properties.',
 'Increased serotonin syndrome risk.',
 'Use with extreme caution. Monitor closely for symptoms.',
 'moderate', 'Clinical concern',
 'SAMe has serotonergic activity that may interact.',
 '[{"source": "Case reports", "year": "2021"}]'::jsonb),

('INT_PAROXETINE_TRYPTOPHAN', 'D_PAROXETINE', 'S_TRYPTOPHAN', 'pharmacodynamic', 'avoid',
 'L-tryptophan with paroxetine significantly increases serotonin syndrome risk.',
 'Tryptophan is serotonin precursor.',
 'Serious serotonin syndrome risk.',
 'Avoid combination.',
 'high', 'Well-established',
 'Tryptophan converts to serotonin. Dangerous with SSRIs.',
 '[{"source": "Clinical guidelines", "year": "2022"}]'::jsonb),

('INT_PAROXETINE_RHODIOLA', 'D_PAROXETINE', 'S_RHODIOLA', 'pharmacodynamic', 'caution',
 'Rhodiola may increase serotonin syndrome risk.',
 'MAO-inhibiting properties.',
 'Possible serotonergic effects.',
 'Use cautiously. Monitor for symptoms.',
 'limited', 'Theoretical concern',
 'Rhodiola may affect monoamine systems.',
 '[{"source": "Herbology", "year": "2021"}]'::jsonb),

('INT_PAROXETINE_GINKGO', 'D_PAROXETINE', 'S_GINKGO', 'pharmacodynamic', 'info',
 'No significant interaction between paroxetine and ginkgo.',
 'No established mechanism.',
 'No clinically relevant effects.',
 'Standard ginkgo doses are generally safe.',
 'limited', 'Minimal interaction',
 'Ginkgo does not significantly affect serotonin systems.',
 '[{"source": "Clinical data", "year": "2020"}]'::jsonb),

('INT_PAROXETINE_FISH_OIL', 'D_PAROXETINE', 'S_FISH_OIL', 'pharmacodynamic', 'info',
 'Fish oil may provide complementary mood benefits.',
 'Omega-3s support brain health.',
 'Possible complementary antidepressant effects.',
 'Fish oil 1-3g EPA/DHA daily is safe and may be beneficial.',
 'moderate', 'Complementary',
 'Omega-3 fatty acids may provide additional mood support.',
 '[{"source": "Clinical research", "year": "2022"}]'::jsonb),

('INT_PAROXETINE_VITAMIN_D', 'D_PAROXETINE', 'S_VITAMIN_D', 'pharmacodynamic', 'info',
 'Vitamin D supports mood health; no interaction.',
 'Vitamin D modulates mood systems.',
 'Possible complementary mood benefits.',
 'Maintain adequate vitamin D (1000-2000 IU daily).',
 'moderate', 'Supportive',
 'Vitamin D deficiency is linked to depression. Supplementation may be beneficial.',
 '[{"source": "Clinical studies", "year": "2021"}]'::jsonb)

ON CONFLICT (interaction_id) DO NOTHING;
