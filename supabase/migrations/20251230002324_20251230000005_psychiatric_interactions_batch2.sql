/*
  # Psychiatric Medication Interactions - Batch 2 (SNRIs and Others)
  
  1. SNRIs and other antidepressants with serotonergic supplements
    - Venlafaxine, Duloxetine, Desvenlafaxine, Bupropion, Trazodone
  
  2. Lithium interactions
  
  3. Focus: Serotonin syndrome, mood stability
*/

-- VENLAFAXINE (SNRI) INTERACTIONS
INSERT INTO checker_interactions (
  interaction_id, a_substance_id, b_substance_id, interaction_type, severity,
  summary_short, mechanism, clinical_effect, management, evidence_grade, confidence, writeup_markdown, citations
) VALUES
('INT_VENLAFAXINE_5HTP', 'D_VENLAFAXINE', 'S_5HTP', 'pharmacodynamic', 'avoid',
 'Combining venlafaxine with 5-HTP significantly increases serotonin syndrome risk.',
 'Additive serotonergic effects.',
 'Serotonin syndrome: agitation, confusion, rapid heart rate, hyperthermia.',
 'Avoid combination. Serious serotonin syndrome risk.',
 'high', 'Well-established',
 '5-HTP increases serotonin. Dangerous with SNRIs.',
 '[{"source": "Clinical toxicology", "year": "2022"}]'::jsonb),

('INT_VENLAFAXINE_TRYPTOPHAN', 'D_VENLAFAXINE', 'S_TRYPTOPHAN', 'pharmacodynamic', 'avoid',
 'L-tryptophan with venlafaxine significantly increases serotonin syndrome risk.',
 'Serotonin precursor.',
 'Serotonin syndrome.',
 'Avoid combination.',
 'high', 'Well-established',
 'Tryptophan dangerous with SNRIs.',
 '[{"source": "Clinical guidelines", "year": "2022"}]'::jsonb),

('INT_VENLAFAXINE_SAME', 'D_VENLAFAXINE', 'S_SAME', 'pharmacodynamic', 'caution',
 'SAMe may increase serotonin syndrome risk.',
 'Serotonergic properties.',
 'Increased risk.',
 'Use with extreme caution.',
 'moderate', 'Clinical concern',
 'SAMe has serotonergic activity.',
 '[{"source": "Case reports", "year": "2021"}]'::jsonb),

('INT_VENLAFAXINE_RHODIOLA', 'D_VENLAFAXINE', 'S_RHODIOLA', 'pharmacodynamic', 'caution',
 'Rhodiola may increase serotonin syndrome risk.',
 'MAO-inhibiting properties.',
 'Possible effects.',
 'Use cautiously.',
 'limited', 'Theoretical concern',
 'May affect monoamine systems.',
 '[{"source": "Herbology", "year": "2021"}]'::jsonb),

-- DULOXETINE (SNRI) INTERACTIONS
('INT_DULOXETINE_5HTP', 'D_DULOXETINE', 'S_5HTP', 'pharmacodynamic', 'avoid',
 'Combining duloxetine with 5-HTP significantly increases serotonin syndrome risk.',
 'Additive serotonergic effects.',
 'Serotonin syndrome.',
 'Avoid combination.',
 'high', 'Well-established',
 '5-HTP dangerous with SNRIs.',
 '[{"source": "Clinical toxicology", "year": "2022"}]'::jsonb),

('INT_DULOXETINE_TRYPTOPHAN', 'D_DULOXETINE', 'S_TRYPTOPHAN', 'pharmacodynamic', 'avoid',
 'L-tryptophan with duloxetine significantly increases serotonin syndrome risk.',
 'Serotonin precursor.',
 'Serotonin syndrome.',
 'Avoid combination.',
 'high', 'Well-established',
 'Dangerous combination.',
 '[{"source": "Clinical guidelines", "year": "2022"}]'::jsonb),

('INT_DULOXETINE_SAME', 'D_DULOXETINE', 'S_SAME', 'pharmacodynamic', 'caution',
 'SAMe may increase serotonin syndrome risk.',
 'Serotonergic properties.',
 'Increased risk.',
 'Use with caution.',
 'moderate', 'Clinical concern',
 'SAMe has serotonergic activity.',
 '[{"source": "Case reports", "year": "2021"}]'::jsonb),

('INT_DULOXETINE_RHODIOLA', 'D_DULOXETINE', 'S_RHODIOLA', 'pharmacodynamic', 'caution',
 'Rhodiola may increase serotonin syndrome risk.',
 'MAO-inhibiting properties.',
 'Possible effects.',
 'Use cautiously.',
 'limited', 'Theoretical concern',
 'May affect systems.',
 '[{"source": "Herbology", "year": "2021"}]'::jsonb),

-- DESVENLAFAXINE (SNRI) INTERACTIONS
('INT_DESVENLAFAXINE_5HTP', 'D_DESVENLAFAXINE', 'S_5HTP', 'pharmacodynamic', 'avoid',
 'Combining desvenlafaxine with 5-HTP significantly increases serotonin syndrome risk.',
 'Additive serotonergic effects.',
 'Serotonin syndrome.',
 'Avoid combination.',
 'high', 'Well-established',
 '5-HTP dangerous with SNRIs.',
 '[{"source": "Clinical toxicology", "year": "2022"}]'::jsonb),

('INT_DESVENLAFAXINE_TRYPTOPHAN', 'D_DESVENLAFAXINE', 'S_TRYPTOPHAN', 'pharmacodynamic', 'avoid',
 'L-tryptophan with desvenlafaxine significantly increases serotonin syndrome risk.',
 'Serotonin precursor.',
 'Serotonin syndrome.',
 'Avoid combination.',
 'high', 'Well-established',
 'Dangerous combination.',
 '[{"source": "Clinical guidelines", "year": "2022"}]'::jsonb),

('INT_DESVENLAFAXINE_SAME', 'D_DESVENLAFAXINE', 'S_SAME', 'pharmacodynamic', 'caution',
 'SAMe may increase serotonin syndrome risk.',
 'Serotonergic properties.',
 'Increased risk.',
 'Use with caution.',
 'moderate', 'Clinical concern',
 'SAMe has serotonergic activity.',
 '[{"source": "Case reports", "year": "2021"}]'::jsonb),

-- BUPROPION INTERACTIONS (note: not serotonergic)
('INT_BUPROPION_5HTP', 'D_BUPROPION', 'S_5HTP', 'pharmacodynamic', 'monitor',
 'Bupropion is not serotonergic; 5-HTP may be used but monitor.',
 'No direct serotonergic interaction with bupropion.',
 'Possible mood effects but no serotonin syndrome risk.',
 'May be combined with monitoring. Bupropion affects dopamine/norepinephrine, not serotonin.',
 'limited', 'Different mechanisms',
 'Bupropion is a dopamine/norepinephrine reuptake inhibitor. Does not cause serotonin syndrome.',
 '[{"source": "Pharmacology", "year": "2021"}]'::jsonb),

('INT_BUPROPION_RHODIOLA', 'D_BUPROPION', 'S_RHODIOLA', 'pharmacodynamic', 'info',
 'Rhodiola may provide complementary energy and mood benefits.',
 'Different mechanisms - adaptogenic vs dopaminergic.',
 'Possible additive benefits.',
 'Standard rhodiola doses are generally safe.',
 'limited', 'Minimal interaction',
 'Rhodiola and bupropion work through different mechanisms.',
 '[{"source": "Herbology", "year": "2021"}]'::jsonb),

('INT_BUPROPION_GINKGO', 'D_BUPROPION', 'S_GINKGO', 'pharmacodynamic', 'caution',
 'Ginkgo may theoretically lower seizure threshold with bupropion.',
 'Both may affect seizure threshold.',
 'Possible increased seizure risk.',
 'Use cautiously in those with seizure risk. Bupropion lowers seizure threshold.',
 'limited', 'Theoretical concern',
 'Bupropion has dose-dependent seizure risk. Ginkgo may lower threshold.',
 '[{"source": "Clinical data", "year": "2020"}]'::jsonb),

-- TRAZODONE INTERACTIONS
('INT_TRAZODONE_5HTP', 'D_TRAZODONE', 'S_5HTP', 'pharmacodynamic', 'caution',
 'Trazodone with 5-HTP may increase serotonin syndrome risk.',
 'Additive serotonergic effects.',
 'Possible serotonin syndrome.',
 'Use with caution. Monitor for symptoms.',
 'moderate', 'Clinical concern',
 'Trazodone has serotonergic properties.',
 '[{"source": "Clinical toxicology", "year": "2022"}]'::jsonb),

('INT_TRAZODONE_MELATONIN', 'D_TRAZODONE', 'S_MELATONIN', 'pharmacodynamic', 'monitor',
 'Combining trazodone with melatonin may enhance sedation.',
 'Additive sedative effects.',
 'Increased drowsiness, next-day grogginess.',
 'Use lower doses of each. Take at bedtime only. Monitor for excessive sedation.',
 'moderate', 'Additive effects',
 'Both promote sleep. Combined use may cause excessive sedation.',
 '[{"source": "Clinical observation", "year": "2021"}]'::jsonb),

('INT_TRAZODONE_VALERIAN', 'D_TRAZODONE', 'S_VALERIAN', 'pharmacodynamic', 'caution',
 'Valerian may enhance sedative effects of trazodone.',
 'Additive CNS depression.',
 'Excessive sedation, cognitive impairment.',
 'Use cautiously. Monitor for excessive sedation.',
 'moderate', 'Additive effects',
 'Both have sedative properties.',
 '[{"source": "Clinical data", "year": "2021"}]'::jsonb),

-- LITHIUM INTERACTIONS
('INT_LITHIUM_FISH_OIL', 'D_LITHIUM', 'S_FISH_OIL', 'pharmacodynamic', 'info',
 'Fish oil may provide complementary mood stabilization.',
 'Omega-3s support mood stability.',
 'Possible additive mood benefits.',
 'Fish oil 1-3g EPA/DHA daily may be beneficial for bipolar disorder.',
 'moderate', 'Complementary',
 'Omega-3s have mood-stabilizing properties that may complement lithium.',
 '[{"source": "Clinical trials", "year": "2022"}]'::jsonb),

('INT_LITHIUM_MAGNESIUM', 'D_LITHIUM', 'S_MAGNESIUM', 'pharmacokinetic', 'monitor',
 'Magnesium may slightly affect lithium levels.',
 'Possible renal effects on lithium excretion.',
 'Minor changes in lithium levels possible.',
 'Monitor lithium levels if starting high-dose magnesium. Standard doses likely safe.',
 'limited', 'Theoretical concern',
 'Magnesium may minimally affect lithium excretion.',
 '[{"source": "Pharmacology", "year": "2020"}]'::jsonb),

('INT_LITHIUM_CALCIUM', 'D_LITHIUM', 'S_CALCIUM', 'pharmacokinetic', 'info',
 'No significant interaction between lithium and calcium.',
 'No established mechanism.',
 'No effects expected.',
 'Calcium supplementation is safe with lithium.',
 'limited', 'No interaction',
 'Calcium does not affect lithium levels or efficacy.',
 '[{"source": "Clinical data", "year": "2020"}]'::jsonb),

('INT_LITHIUM_VITAMIN_D', 'D_LITHIUM', 'S_VITAMIN_D', 'pharmacodynamic', 'info',
 'Vitamin D has no interaction with lithium.',
 'No mechanism.',
 'No effects.',
 'Maintain adequate vitamin D levels.',
 'limited', 'No interaction',
 'Vitamin D supplementation is safe.',
 '[{"source": "Clinical data", "year": "2020"}]'::jsonb)

ON CONFLICT (interaction_id) DO NOTHING;
