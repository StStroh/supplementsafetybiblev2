/*
  # CNS Depressant Interactions
  
  1. Benzodiazepines and sleep medications with sedative supplements
    - Alprazolam (expand existing), Diazepam, Lorazepam, Clonazepam
    - Zolpidem, Diphenhydramine
  
  2. Supplements: Melatonin, Valerian, Kava, Passionflower, L-theanine
  
  3. Focus: Additive sedation, cognitive impairment
  
  4. Severity: CAUTION for additive CNS depression
*/

-- ALPRAZOLAM ADDITIONAL INTERACTIONS (already has 16)
INSERT INTO checker_interactions (
  interaction_id, a_substance_id, b_substance_id, interaction_type, severity,
  summary_short, mechanism, clinical_effect, management, evidence_grade, confidence, writeup_markdown, citations
) VALUES
('INT_ALPRAZOLAM_KAVA', 'D_ALPRAZOLAM', 'S_KAVA', 'pharmacodynamic', 'caution',
 'Kava may significantly enhance sedative effects of alprazolam.',
 'Additive CNS depression and GABA effects.',
 'Excessive sedation, cognitive impairment, increased fall risk.',
 'Avoid combination or use with extreme caution. Monitor for excessive sedation.',
 'moderate', 'Clinical concern',
 'Kava has potent anxiolytic and sedative effects. Combined with benzodiazepines, excessive CNS depression may occur.',
 '[{"source": "Clinical pharmacology", "year": "2021"}]'::jsonb),

('INT_ALPRAZOLAM_PASSIONFLOWER', 'D_ALPRAZOLAM', 'S_PASSIONFLOWER', 'pharmacodynamic', 'caution',
 'Passionflower may enhance sedative effects.',
 'Additive GABA-ergic effects.',
 'Increased sedation and drowsiness.',
 'Use cautiously. Monitor for excessive sedation.',
 'moderate', 'Clinical concern',
 'Passionflower has GABAergic properties that may enhance benzodiazepine effects.',
 '[{"source": "Herbology", "year": "2021"}]'::jsonb),

('INT_ALPRAZOLAM_L_THEANINE', 'D_ALPRAZOLAM', 'S_L_THEANINE', 'pharmacodynamic', 'monitor',
 'L-theanine may modestly enhance relaxation effects.',
 'Mild GABA modulation.',
 'Possible mild increase in relaxation.',
 'Generally safe. L-theanine effects are mild.',
 'limited', 'Minimal interaction',
 'L-theanine has mild relaxing effects. Unlikely to cause significant interaction.',
 '[{"source": "Clinical data", "year": "2021"}]'::jsonb),

-- DIAZEPAM INTERACTIONS
('INT_DIAZEPAM_MELATONIN', 'D_DIAZEPAM', 'S_MELATONIN', 'pharmacodynamic', 'caution',
 'Melatonin may enhance sedative effects of diazepam.',
 'Additive CNS depression.',
 'Increased drowsiness, next-day impairment.',
 'Use cautiously. Take only at bedtime. Monitor for excessive sedation.',
 'moderate', 'Additive effects',
 'Melatonin and benzodiazepines both cause sedation. Combined use may cause excessive drowsiness.',
 '[{"source": "Clinical observation", "year": "2021"}]'::jsonb),

('INT_DIAZEPAM_VALERIAN', 'D_DIAZEPAM', 'S_VALERIAN', 'pharmacodynamic', 'caution',
 'Valerian significantly enhances sedative effects.',
 'Additive GABA-ergic CNS depression.',
 'Excessive sedation, cognitive impairment, fall risk.',
 'Avoid combination or use with extreme caution.',
 'high', 'Clinical concern',
 'Valerian has potent GABAergic effects. Combined with benzodiazepines, significant CNS depression occurs.',
 '[{"source": "Clinical studies", "year": "2021"}]'::jsonb),

('INT_DIAZEPAM_KAVA', 'D_DIAZEPAM', 'S_KAVA', 'pharmacodynamic', 'caution',
 'Kava significantly enhances sedative effects.',
 'Additive CNS depression.',
 'Excessive sedation, impairment.',
 'Avoid combination.',
 'moderate', 'Clinical concern',
 'Kava and benzodiazepines both cause significant CNS depression.',
 '[{"source": "Clinical pharmacology", "year": "2021"}]'::jsonb),

('INT_DIAZEPAM_PASSIONFLOWER', 'D_DIAZEPAM', 'S_PASSIONFLOWER', 'pharmacodynamic', 'caution',
 'Passionflower may enhance sedative effects.',
 'Additive GABA effects.',
 'Increased sedation.',
 'Use cautiously.',
 'moderate', 'Clinical concern',
 'Passionflower enhances GABAergic activity.',
 '[{"source": "Herbology", "year": "2021"}]'::jsonb),

('INT_DIAZEPAM_L_THEANINE', 'D_DIAZEPAM', 'S_L_THEANINE', 'pharmacodynamic', 'monitor',
 'L-theanine may modestly enhance relaxation.',
 'Mild effects.',
 'Minimal interaction expected.',
 'Generally safe.',
 'limited', 'Minimal interaction',
 'L-theanine has mild effects.',
 '[{"source": "Clinical data", "year": "2021"}]'::jsonb),

-- LORAZEPAM INTERACTIONS
('INT_LORAZEPAM_MELATONIN', 'D_LORAZEPAM', 'S_MELATONIN', 'pharmacodynamic', 'caution',
 'Melatonin may enhance sedative effects of lorazepam.',
 'Additive CNS depression.',
 'Increased drowsiness.',
 'Use cautiously. Take only at bedtime.',
 'moderate', 'Additive effects',
 'Both cause sedation.',
 '[{"source": "Clinical observation", "year": "2021"}]'::jsonb),

('INT_LORAZEPAM_VALERIAN', 'D_LORAZEPAM', 'S_VALERIAN', 'pharmacodynamic', 'caution',
 'Valerian significantly enhances sedative effects.',
 'Additive GABA effects.',
 'Excessive sedation.',
 'Avoid or use with extreme caution.',
 'high', 'Clinical concern',
 'Valerian has GABAergic effects.',
 '[{"source": "Clinical studies", "year": "2021"}]'::jsonb),

('INT_LORAZEPAM_KAVA', 'D_LORAZEPAM', 'S_KAVA', 'pharmacodynamic', 'caution',
 'Kava significantly enhances sedative effects.',
 'Additive CNS depression.',
 'Excessive sedation.',
 'Avoid combination.',
 'moderate', 'Clinical concern',
 'Kava and benzodiazepines cause significant CNS depression.',
 '[{"source": "Clinical pharmacology", "year": "2021"}]'::jsonb),

('INT_LORAZEPAM_PASSIONFLOWER', 'D_LORAZEPAM', 'S_PASSIONFLOWER', 'pharmacodynamic', 'caution',
 'Passionflower may enhance sedative effects.',
 'Additive GABA effects.',
 'Increased sedation.',
 'Use cautiously.',
 'moderate', 'Clinical concern',
 'Passionflower enhances GABA activity.',
 '[{"source": "Herbology", "year": "2021"}]'::jsonb),

-- CLONAZEPAM INTERACTIONS
('INT_CLONAZEPAM_MELATONIN', 'D_CLONAZEPAM', 'S_MELATONIN', 'pharmacodynamic', 'caution',
 'Melatonin may enhance sedative effects.',
 'Additive CNS depression.',
 'Increased drowsiness.',
 'Use cautiously. Bedtime only.',
 'moderate', 'Additive effects',
 'Both cause sedation.',
 '[{"source": "Clinical observation", "year": "2021"}]'::jsonb),

('INT_CLONAZEPAM_VALERIAN', 'D_CLONAZEPAM', 'S_VALERIAN', 'pharmacodynamic', 'caution',
 'Valerian significantly enhances sedative effects.',
 'Additive GABA effects.',
 'Excessive sedation.',
 'Avoid or use with extreme caution.',
 'high', 'Clinical concern',
 'Valerian has GABAergic effects.',
 '[{"source": "Clinical studies", "year": "2021"}]'::jsonb),

('INT_CLONAZEPAM_KAVA', 'D_CLONAZEPAM', 'S_KAVA', 'pharmacodynamic', 'caution',
 'Kava significantly enhances sedative effects.',
 'Additive CNS depression.',
 'Excessive sedation.',
 'Avoid combination.',
 'moderate', 'Clinical concern',
 'Kava causes significant CNS depression.',
 '[{"source": "Clinical pharmacology", "year": "2021"}]'::jsonb),

('INT_CLONAZEPAM_PASSIONFLOWER', 'D_CLONAZEPAM', 'S_PASSIONFLOWER', 'pharmacodynamic', 'caution',
 'Passionflower may enhance sedative effects.',
 'Additive effects.',
 'Increased sedation.',
 'Use cautiously.',
 'moderate', 'Clinical concern',
 'Passionflower enhances GABA.',
 '[{"source": "Herbology", "year": "2021"}]'::jsonb),

-- ZOLPIDEM INTERACTIONS
('INT_ZOLPIDEM_MELATONIN', 'D_ZOLPIDEM', 'S_MELATONIN', 'pharmacodynamic', 'caution',
 'Melatonin may enhance sedative effects of zolpidem.',
 'Additive sleep-promoting effects.',
 'Increased drowsiness, next-day impairment.',
 'Use cautiously. May cause excessive sedation. Take only at bedtime.',
 'moderate', 'Additive effects',
 'Both promote sleep. Combined use may cause excessive sedation.',
 '[{"source": "Clinical observation", "year": "2021"}]'::jsonb),

('INT_ZOLPIDEM_VALERIAN', 'D_ZOLPIDEM', 'S_VALERIAN', 'pharmacodynamic', 'caution',
 'Valerian may enhance sedative effects.',
 'Additive CNS depression.',
 'Excessive sedation, impaired cognition.',
 'Use with caution. Monitor for excessive effects.',
 'moderate', 'Clinical concern',
 'Valerian and zolpidem both cause sedation.',
 '[{"source": "Clinical studies", "year": "2021"}]'::jsonb),

('INT_ZOLPIDEM_KAVA', 'D_ZOLPIDEM', 'S_KAVA', 'pharmacodynamic', 'caution',
 'Kava may enhance sedative effects.',
 'Additive CNS depression.',
 'Excessive sedation.',
 'Avoid or use with caution.',
 'moderate', 'Clinical concern',
 'Kava causes CNS depression.',
 '[{"source": "Clinical pharmacology", "year": "2021"}]'::jsonb),

('INT_ZOLPIDEM_PASSIONFLOWER', 'D_ZOLPIDEM', 'S_PASSIONFLOWER', 'pharmacodynamic', 'monitor',
 'Passionflower may modestly enhance effects.',
 'Mild additive effects.',
 'Possible increased sedation.',
 'Use cautiously.',
 'limited', 'Mild concern',
 'Passionflower has mild sedative effects.',
 '[{"source": "Herbology", "year": "2021"}]'::jsonb),

-- DIPHENHYDRAMINE INTERACTIONS
('INT_DIPHENHYDRAMINE_MELATONIN', 'D_DIPHENHYDRAMINE', 'S_MELATONIN', 'pharmacodynamic', 'monitor',
 'Melatonin may enhance sedative effects.',
 'Additive sleep effects.',
 'Increased drowsiness.',
 'Use cautiously. Both promote sleep.',
 'moderate', 'Additive effects',
 'Both cause sedation.',
 '[{"source": "Clinical observation", "year": "2021"}]'::jsonb),

('INT_DIPHENHYDRAMINE_VALERIAN', 'D_DIPHENHYDRAMINE', 'S_VALERIAN', 'pharmacodynamic', 'caution',
 'Valerian may enhance sedative effects.',
 'Additive CNS depression.',
 'Excessive sedation.',
 'Use cautiously.',
 'moderate', 'Clinical concern',
 'Valerian and diphenhydramine both sedate.',
 '[{"source": "Clinical studies", "year": "2021"}]'::jsonb),

('INT_DIPHENHYDRAMINE_KAVA', 'D_DIPHENHYDRAMINE', 'S_KAVA', 'pharmacodynamic', 'caution',
 'Kava may enhance sedative effects.',
 'Additive CNS depression.',
 'Excessive sedation.',
 'Avoid or use cautiously.',
 'moderate', 'Clinical concern',
 'Kava causes CNS depression.',
 '[{"source": "Clinical pharmacology", "year": "2021"}]'::jsonb),

('INT_DIPHENHYDRAMINE_L_THEANINE', 'D_DIPHENHYDRAMINE', 'S_L_THEANINE', 'pharmacodynamic', 'info',
 'L-theanine has minimal interaction with diphenhydramine.',
 'Mild relaxation vs antihistamine sedation.',
 'No significant interaction expected.',
 'Generally safe.',
 'limited', 'Minimal interaction',
 'L-theanine effects are mild.',
 '[{"source": "Clinical data", "year": "2021"}]'::jsonb)

ON CONFLICT (interaction_id) DO NOTHING;
