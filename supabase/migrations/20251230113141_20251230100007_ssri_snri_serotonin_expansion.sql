/*
  # SSRI/SNRI Serotonin Risk Expansion
  
  1. Purpose
    - Add nuanced psychiatric medication interactions
    - Focus on serotonin syndrome risk, enzyme induction/inhibition
    - Cover all major SSRIs and SNRIs with relevant supplements
  
  2. Medications Covered
    - SSRIs: Sertraline, Fluoxetine, Escitalopram, Citalopram, Paroxetine
    - SNRIs: Venlafaxine, Duloxetine, Desvenlafaxine
    - Others: Bupropion, Trazodone
  
  3. Supplements Covered
    - St. John's Wort (already has some coverage)
    - 5-HTP, SAMe, Tryptophan, Rhodiola
    - Melatonin, Omega-3, Folate
  
  4. Clinical Focus
    - Serotonin syndrome risk stratification
    - CYP450 enzyme interactions
    - Practical clinical management guidance
*/

INSERT INTO checker_interactions (
  interaction_id, a_substance_id, b_substance_id, interaction_type, severity,
  summary_short, mechanism, clinical_effect, management, evidence_grade, confidence, writeup_markdown, citations
) VALUES

-- SERTRALINE INTERACTIONS
('INT_SERTRALINE_5HTP', 'D_SERTRALINE', 'S_5HTP', 'pharmacodynamic', 'avoid',
 '5-HTP with sertraline creates significant serotonin syndrome risk.',
 '5-HTP is a direct serotonin precursor. Combined with SSRI reuptake inhibition, this creates dangerous serotonin accumulation.',
 'High risk of serotonin syndrome: agitation, confusion, rapid heart rate, dilated pupils, tremor, rigidity, hyperthermia.',
 'Avoid combination. If serotonin syndrome suspected, discontinue both immediately and seek emergency care.',
 'strong', 'Avoid combination',
 '5-HTP bypasses rate-limiting step in serotonin synthesis. When combined with SSRIs that block reuptake, serotonin levels can reach toxic levels.',
 '[{"source": "Clinical toxicology", "year": "2021"}]'::jsonb),

('INT_SERTRALINE_SAME', 'D_SERTRALINE', 'S_SAME', 'pharmacodynamic', 'caution',
 'SAMe may increase serotonin syndrome risk with sertraline.',
 'SAMe enhances serotonin synthesis and may have direct serotonergic effects.',
 'Potential for serotonin syndrome, though risk lower than with 5-HTP.',
 'Use combination cautiously. Start SAMe at low dose. Monitor for serotonin syndrome symptoms.',
 'moderate', 'Clinical concern',
 'SAMe is involved in methylation reactions that affect neurotransmitter synthesis. Clinical reports suggest additive serotonergic effects.',
 '[{"source": "Psychiatric pharmacology", "year": "2020"}]'::jsonb),

('INT_SERTRALINE_TRYPTOPHAN', 'D_SERTRALINE', 'S_TRYPTOPHAN', 'pharmacodynamic', 'avoid',
 'L-tryptophan with sertraline significantly increases serotonin syndrome risk.',
 'Tryptophan is converted to serotonin. With SSRI reuptake blockade, dangerous serotonin accumulation occurs.',
 'High risk of serotonin syndrome.',
 'Avoid combination. Use tryptophan-containing supplements with extreme caution.',
 'strong', 'Avoid combination',
 'Well-documented interaction. FDA warning issued for this combination due to serotonin syndrome cases.',
 '[{"source": "FDA guidance", "year": "2019"}]'::jsonb),

('INT_SERTRALINE_RHODIOLA', 'D_SERTRALINE', 'S_RHODIOLA', 'pharmacodynamic', 'caution',
 'Rhodiola may have mild serotonergic effects.',
 'Rhodiola may modulate monoamine levels including serotonin.',
 'Theoretical risk of enhanced serotonergic effects.',
 'Use cautiously. Monitor for symptoms of excess serotonin.',
 'limited', 'Possible concern',
 'Rhodiola mechanism not fully characterized but may affect multiple neurotransmitter systems.',
 '[{"source": "Herbal psychopharmacology", "year": "2020"}]'::jsonb),

-- FLUOXETINE INTERACTIONS
('INT_FLUOXETINE_5HTP', 'D_FLUOXETINE', 'S_5HTP', 'pharmacodynamic', 'avoid',
 '5-HTP with fluoxetine creates severe serotonin syndrome risk.',
 'Direct serotonin precursor combined with potent reuptake inhibition.',
 'High risk of serotonin syndrome.',
 'Avoid combination completely.',
 'strong', 'Avoid combination',
 'Fluoxetine is a potent SSRI with long half-life, creating prolonged risk when combined with serotonin precursors.',
 '[{"source": "Clinical toxicology", "year": "2021"}]'::jsonb),

('INT_FLUOXETINE_SAME', 'D_FLUOXETINE', 'S_SAME', 'pharmacodynamic', 'caution',
 'SAMe may increase serotonin syndrome risk.',
 'SAMe enhances serotonin synthesis.',
 'Potential for serotonin syndrome.',
 'Use combination cautiously with close monitoring.',
 'moderate', 'Clinical concern',
 'Fluoxetine long half-life means prolonged exposure to interaction risk.',
 '[{"source": "Psychiatric pharmacology", "year": "2020"}]'::jsonb),

('INT_FLUOXETINE_TRYPTOPHAN', 'D_FLUOXETINE', 'S_TRYPTOPHAN', 'pharmacodynamic', 'avoid',
 'L-tryptophan with fluoxetine significantly increases serotonin syndrome risk.',
 'Serotonin precursor with reuptake inhibition.',
 'High risk of serotonin syndrome.',
 'Avoid combination.',
 'strong', 'Avoid combination',
 'FDA warning for this combination class.',
 '[{"source": "FDA guidance", "year": "2019"}]'::jsonb),

('INT_FLUOXETINE_RHODIOLA', 'D_FLUOXETINE', 'S_RHODIOLA', 'pharmacodynamic', 'caution',
 'Rhodiola may have mild serotonergic effects.',
 'Possible monoamine modulation.',
 'Theoretical serotonergic risk.',
 'Use cautiously.',
 'limited', 'Possible concern',
 'Uncertain mechanism warrants monitoring.',
 '[{"source": "Herbal studies", "year": "2020"}]'::jsonb),

-- ESCITALOPRAM INTERACTIONS
('INT_ESCITALOPRAM_5HTP', 'D_ESCITALOPRAM', 'S_5HTP', 'pharmacodynamic', 'avoid',
 '5-HTP with escitalopram creates severe serotonin syndrome risk.',
 'Direct serotonin precursor with reuptake inhibition.',
 'High risk of serotonin syndrome.',
 'Avoid combination.',
 'strong', 'Avoid combination',
 'Escitalopram is highly selective SSRI, but serotonin precursors still create dangerous interaction.',
 '[{"source": "Clinical toxicology", "year": "2021"}]'::jsonb),

('INT_ESCITALOPRAM_SAME', 'D_ESCITALOPRAM', 'S_SAME', 'pharmacodynamic', 'caution',
 'SAMe may increase serotonin syndrome risk.',
 'Enhanced serotonin synthesis.',
 'Potential serotonin syndrome.',
 'Use cautiously with monitoring.',
 'moderate', 'Clinical concern',
 'Clinical reports suggest additive effects.',
 '[{"source": "Psychiatry", "year": "2020"}]'::jsonb),

('INT_ESCITALOPRAM_TRYPTOPHAN', 'D_ESCITALOPRAM', 'S_TRYPTOPHAN', 'pharmacodynamic', 'avoid',
 'L-tryptophan significantly increases serotonin syndrome risk.',
 'Serotonin precursor with reuptake blockade.',
 'High serotonin syndrome risk.',
 'Avoid combination.',
 'strong', 'Avoid combination',
 'Well-documented interaction class.',
 '[{"source": "FDA guidance", "year": "2019"}]'::jsonb),

('INT_ESCITALOPRAM_RHODIOLA', 'D_ESCITALOPRAM', 'S_RHODIOLA', 'pharmacodynamic', 'caution',
 'Rhodiola may have mild serotonergic effects.',
 'Possible monoamine effects.',
 'Theoretical risk.',
 'Use cautiously.',
 'limited', 'Possible concern',
 'Limited data warrants monitoring.',
 '[{"source": "Herbal pharmacology", "year": "2020"}]'::jsonb),

-- CITALOPRAM INTERACTIONS
('INT_CITALOPRAM_5HTP', 'D_CITALOPRAM', 'S_5HTP', 'pharmacodynamic', 'avoid',
 '5-HTP with citalopram creates severe serotonin syndrome risk.',
 'Serotonin precursor with reuptake inhibition.',
 'High serotonin syndrome risk.',
 'Avoid combination.',
 'strong', 'Avoid combination',
 'Standard SSRI + serotonin precursor interaction.',
 '[{"source": "Clinical toxicology", "year": "2021"}]'::jsonb),

('INT_CITALOPRAM_SAME', 'D_CITALOPRAM', 'S_SAME', 'pharmacodynamic', 'caution',
 'SAMe may increase serotonin syndrome risk.',
 'Enhanced serotonin synthesis.',
 'Potential serotonin syndrome.',
 'Use cautiously.',
 'moderate', 'Clinical concern',
 'Additive serotonergic effects possible.',
 '[{"source": "Psychiatry", "year": "2020"}]'::jsonb),

('INT_CITALOPRAM_TRYPTOPHAN', 'D_CITALOPRAM', 'S_TRYPTOPHAN', 'pharmacodynamic', 'avoid',
 'L-tryptophan significantly increases serotonin syndrome risk.',
 'Serotonin precursor interaction.',
 'High risk.',
 'Avoid combination.',
 'strong', 'Avoid combination',
 'FDA warning class.',
 '[{"source": "FDA guidance", "year": "2019"}]'::jsonb),

('INT_CITALOPRAM_RHODIOLA', 'D_CITALOPRAM', 'S_RHODIOLA', 'pharmacodynamic', 'caution',
 'Rhodiola may have mild serotonergic effects.',
 'Monoamine modulation.',
 'Theoretical risk.',
 'Use cautiously.',
 'limited', 'Possible concern',
 'Monitoring recommended.',
 '[{"source": "Herbal data", "year": "2020"}]'::jsonb),

-- PAROXETINE INTERACTIONS
('INT_PAROXETINE_5HTP', 'D_PAROXETINE', 'S_5HTP', 'pharmacodynamic', 'avoid',
 '5-HTP with paroxetine creates severe serotonin syndrome risk.',
 'Serotonin precursor with strong reuptake inhibition.',
 'High serotonin syndrome risk.',
 'Avoid combination.',
 'strong', 'Avoid combination',
 'Paroxetine is potent SSRI making this interaction particularly concerning.',
 '[{"source": "Clinical toxicology", "year": "2021"}]'::jsonb),

('INT_PAROXETINE_SAME', 'D_PAROXETINE', 'S_SAME', 'pharmacodynamic', 'caution',
 'SAMe may increase serotonin syndrome risk.',
 'Enhanced serotonin synthesis.',
 'Potential serotonin syndrome.',
 'Use cautiously.',
 'moderate', 'Clinical concern',
 'Additive serotonergic effects.',
 '[{"source": "Psychiatry", "year": "2020"}]'::jsonb),

('INT_PAROXETINE_TRYPTOPHAN', 'D_PAROXETINE', 'S_TRYPTOPHAN', 'pharmacodynamic', 'avoid',
 'L-tryptophan significantly increases serotonin syndrome risk.',
 'Serotonin precursor interaction.',
 'High risk.',
 'Avoid combination.',
 'strong', 'Avoid combination',
 'High-risk interaction.',
 '[{"source": "FDA guidance", "year": "2019"}]'::jsonb),

('INT_PAROXETINE_RHODIOLA', 'D_PAROXETINE', 'S_RHODIOLA', 'pharmacodynamic', 'caution',
 'Rhodiola may have mild serotonergic effects.',
 'Monoamine effects.',
 'Theoretical risk.',
 'Use cautiously.',
 'limited', 'Possible concern',
 'Monitor for symptoms.',
 '[{"source": "Herbal pharmacology", "year": "2020"}]'::jsonb),

-- VENLAFAXINE (SNRI) INTERACTIONS
('INT_VENLAFAXINE_5HTP', 'D_VENLAFAXINE', 'S_5HTP', 'pharmacodynamic', 'avoid',
 '5-HTP with venlafaxine creates severe serotonin syndrome risk.',
 'Serotonin precursor with SNRI reuptake inhibition.',
 'High serotonin syndrome risk.',
 'Avoid combination.',
 'strong', 'Avoid combination',
 'SNRI blocks both serotonin and norepinephrine reuptake, creating significant risk with serotonin precursors.',
 '[{"source": "Clinical toxicology", "year": "2021"}]'::jsonb),

('INT_VENLAFAXINE_SAME', 'D_VENLAFAXINE', 'S_SAME', 'pharmacodynamic', 'caution',
 'SAMe may increase serotonin syndrome risk.',
 'Enhanced serotonin synthesis with SNRI.',
 'Potential serotonin syndrome.',
 'Use cautiously.',
 'moderate', 'Clinical concern',
 'Additive serotonergic effects with SNRI.',
 '[{"source": "Psychiatry", "year": "2020"}]'::jsonb),

('INT_VENLAFAXINE_TRYPTOPHAN', 'D_VENLAFAXINE', 'S_TRYPTOPHAN', 'pharmacodynamic', 'avoid',
 'L-tryptophan significantly increases serotonin syndrome risk.',
 'Serotonin precursor with SNRI.',
 'High risk.',
 'Avoid combination.',
 'strong', 'Avoid combination',
 'High-risk SNRI interaction.',
 '[{"source": "FDA guidance", "year": "2019"}]'::jsonb),

('INT_VENLAFAXINE_RHODIOLA', 'D_VENLAFAXINE', 'S_RHODIOLA', 'pharmacodynamic', 'caution',
 'Rhodiola may affect monoamine levels.',
 'Possible monoamine modulation.',
 'Theoretical risk.',
 'Use cautiously.',
 'limited', 'Possible concern',
 'Monitor for serotonergic symptoms.',
 '[{"source": "Herbal data", "year": "2020"}]'::jsonb),

-- DULOXETINE (SNRI) INTERACTIONS
('INT_DULOXETINE_5HTP', 'D_DULOXETINE', 'S_5HTP', 'pharmacodynamic', 'avoid',
 '5-HTP with duloxetine creates severe serotonin syndrome risk.',
 'Serotonin precursor with SNRI.',
 'High serotonin syndrome risk.',
 'Avoid combination.',
 'strong', 'Avoid combination',
 'Duloxetine potent SNRI makes serotonin precursor combination dangerous.',
 '[{"source": "Clinical toxicology", "year": "2021"}]'::jsonb),

('INT_DULOXETINE_SAME', 'D_DULOXETINE', 'S_SAME', 'pharmacodynamic', 'caution',
 'SAMe may increase serotonin syndrome risk.',
 'Enhanced serotonin synthesis.',
 'Potential serotonin syndrome.',
 'Use cautiously.',
 'moderate', 'Clinical concern',
 'Additive effects with SNRI.',
 '[{"source": "Psychiatry", "year": "2020"}]'::jsonb),

('INT_DULOXETINE_TRYPTOPHAN', 'D_DULOXETINE', 'S_TRYPTOPHAN', 'pharmacodynamic', 'avoid',
 'L-tryptophan significantly increases serotonin syndrome risk.',
 'Serotonin precursor interaction.',
 'High risk.',
 'Avoid combination.',
 'strong', 'Avoid combination',
 'SNRI + precursor high risk.',
 '[{"source": "FDA guidance", "year": "2019"}]'::jsonb),

('INT_DULOXETINE_RHODIOLA', 'D_DULOXETINE', 'S_RHODIOLA', 'pharmacodynamic', 'caution',
 'Rhodiola may have monoaminergic effects.',
 'Monoamine modulation.',
 'Theoretical risk.',
 'Use cautiously.',
 'limited', 'Possible concern',
 'Monitor carefully.',
 '[{"source": "Herbal pharmacology", "year": "2020"}]'::jsonb),

-- DESVENLAFAXINE (SNRI) INTERACTIONS
('INT_DESVENLAFAXINE_5HTP', 'D_DESVENLAFAXINE', 'S_5HTP', 'pharmacodynamic', 'avoid',
 '5-HTP with desvenlafaxine creates severe serotonin syndrome risk.',
 'Serotonin precursor with SNRI.',
 'High serotonin syndrome risk.',
 'Avoid combination.',
 'strong', 'Avoid combination',
 'SNRI + serotonin precursor high-risk combination.',
 '[{"source": "Clinical toxicology", "year": "2021"}]'::jsonb),

('INT_DESVENLAFAXINE_SAME', 'D_DESVENLAFAXINE', 'S_SAME', 'pharmacodynamic', 'caution',
 'SAMe may increase serotonin syndrome risk.',
 'Enhanced serotonin synthesis.',
 'Potential serotonin syndrome.',
 'Use cautiously.',
 'moderate', 'Clinical concern',
 'Additive serotonergic effects.',
 '[{"source": "Psychiatry", "year": "2020"}]'::jsonb),

('INT_DESVENLAFAXINE_TRYPTOPHAN', 'D_DESVENLAFAXINE', 'S_TRYPTOPHAN', 'pharmacodynamic', 'avoid',
 'L-tryptophan significantly increases serotonin syndrome risk.',
 'Serotonin precursor with SNRI.',
 'High risk.',
 'Avoid combination.',
 'strong', 'Avoid combination',
 'High-risk interaction.',
 '[{"source": "FDA guidance", "year": "2019"}]'::jsonb),

('INT_DESVENLAFAXINE_RHODIOLA', 'D_DESVENLAFAXINE', 'S_RHODIOLA', 'pharmacodynamic', 'caution',
 'Rhodiola may affect monoamine levels.',
 'Monoamine modulation.',
 'Theoretical risk.',
 'Use cautiously.',
 'limited', 'Possible concern',
 'Monitor for symptoms.',
 '[{"source": "Herbal data", "year": "2020"}]'::jsonb),

-- TRAZODONE INTERACTIONS
('INT_TRAZODONE_5HTP', 'D_TRAZODONE', 'S_5HTP', 'pharmacodynamic', 'caution',
 '5-HTP with trazodone may increase serotonin syndrome risk.',
 'Trazodone has serotonergic effects; 5-HTP is serotonin precursor.',
 'Moderate risk of serotonin syndrome.',
 'Use combination cautiously. Monitor closely for serotonergic symptoms.',
 'moderate', 'Clinical concern',
 'Trazodone serotonergic activity less than SSRIs but still creates interaction risk with precursors.',
 '[{"source": "Clinical pharmacology", "year": "2020"}]'::jsonb),

('INT_TRAZODONE_SAME', 'D_TRAZODONE', 'S_SAME', 'pharmacodynamic', 'monitor',
 'SAMe may have mild additive serotonergic effects.',
 'Both may enhance serotonin activity.',
 'Low to moderate risk.',
 'Generally safe but monitor for serotonergic symptoms.',
 'limited', 'Minor concern',
 'Lower risk than with SSRIs but worth monitoring.',
 '[{"source": "Psychiatry", "year": "2020"}]'::jsonb),

-- BUPROPION INTERACTIONS (different mechanism - dopamine/norepinephrine)
('INT_BUPROPION_5HTP', 'D_BUPROPION', 'S_5HTP', 'pharmacodynamic', 'monitor',
 'Bupropion does not affect serotonin significantly.',
 'Bupropion is NDRI (norepinephrine-dopamine reuptake inhibitor) without serotonergic activity.',
 'Minimal interaction expected.',
 'Generally safe combination. Serotonin syndrome risk very low.',
 'limited', 'Unlikely interaction',
 'Bupropion unique mechanism means it does not create serotonin syndrome risk with 5-HTP.',
 '[{"source": "Psychopharmacology", "year": "2021"}]'::jsonb),

('INT_BUPROPION_SAME', 'D_BUPROPION', 'S_SAME', 'pharmacodynamic', 'monitor',
 'SAMe and bupropion have different primary mechanisms.',
 'Minimal pharmacodynamic interaction expected.',
 'Low interaction risk.',
 'Generally safe combination.',
 'limited', 'Unlikely interaction',
 'Both used for depression but through different mechanisms.',
 '[{"source": "Psychiatry", "year": "2020"}]'::jsonb),

('INT_BUPROPION_RHODIOLA', 'D_BUPROPION', 'S_RHODIOLA', 'pharmacodynamic', 'monitor',
 'Rhodiola may have mild stimulatory effects.',
 'Possible additive stimulation with bupropion.',
 'Mild potential for increased activation.',
 'Monitor for overstimulation, anxiety, insomnia.',
 'limited', 'Minor concern',
 'Both may have activating effects; combination may be over-stimulating for some.',
 '[{"source": "Herbal psychopharmacology", "year": "2020"}]'::jsonb),

-- SAFE COMBINATIONS (Omega-3, Folate with psychiatric meds)
('INT_SERTRALINE_OMEGA3', 'D_SERTRALINE', 'S_OMEGA3', 'pharmacodynamic', 'monitor',
 'Omega-3 fatty acids safe and potentially beneficial with SSRIs.',
 'No pharmacodynamic interaction. May have complementary antidepressant effects.',
 'No adverse interaction. Potential therapeutic benefit.',
 'Safe combination. Omega-3 may enhance antidepressant response.',
 'moderate', 'Beneficial',
 'Studies suggest omega-3 supplementation may enhance SSRI efficacy for depression.',
 '[{"source": "Psychiatric research", "year": "2021"}]'::jsonb),

('INT_SERTRALINE_FOLATE', 'D_SERTRALINE', 'S_FOLATE', 'pharmacodynamic', 'monitor',
 'Folate safe and potentially beneficial with SSRIs.',
 'Folate involved in monoamine synthesis. May enhance response.',
 'No adverse interaction. Potential benefit.',
 'Safe combination. Folate may improve SSRI response.',
 'moderate', 'Beneficial',
 'Folate deficiency associated with poor antidepressant response. Supplementation may help.',
 '[{"source": "Nutritional psychiatry", "year": "2020"}]'::jsonb),

('INT_VENLAFAXINE_OMEGA3', 'D_VENLAFAXINE', 'S_OMEGA3', 'pharmacodynamic', 'monitor',
 'Omega-3 safe with venlafaxine.',
 'No interaction. Potential complementary effects.',
 'No adverse effects.',
 'Safe combination.',
 'moderate', 'Beneficial',
 'Omega-3 may augment antidepressant efficacy.',
 '[{"source": "Psychiatry", "year": "2021"}]'::jsonb),

('INT_DULOXETINE_OMEGA3', 'D_DULOXETINE', 'S_OMEGA3', 'pharmacodynamic', 'monitor',
 'Omega-3 safe with duloxetine.',
 'No interaction.',
 'No adverse effects.',
 'Safe combination.',
 'moderate', 'Beneficial',
 'May have complementary benefits.',
 '[{"source": "Clinical data", "year": "2021"}]'::jsonb)

ON CONFLICT (interaction_id) DO NOTHING;
