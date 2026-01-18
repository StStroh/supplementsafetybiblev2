-- Batch 1 of 25: Seeding 100 interactions
INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
SELECT 
  s.id,
  m.id,
  v.severity::text,
  v.description,
  v.recommendation
FROM (VALUES
  ('Fish Oil','Warfarin','high','Increased bleeding risk due to antiplatelet effects','Monitor INR closely; report unusual bleeding. Not medical advice.'),
  ('Fish Oil (Omega-3)','Warfarin','high','Increased bleeding risk due to antiplatelet effects','Monitor INR closely; report unusual bleeding. Not medical advice.'),
  ('Omega-3','Warfarin','high','Increased bleeding risk due to antiplatelet effects','Monitor INR closely; report unusual bleeding. Not medical advice.'),
  ('Garlic','Warfarin','moderate','May potentiate anticoagulant effect','Avoid high-dose garlic supplements; monitor INR. Not medical advice.'),
  ('Ginkgo Biloba','Warfarin','high','Increased bleeding risk','Avoid combination; consult prescriber. Not medical advice.')
) AS v(sup_name, med_name, severity, description, recommendation)
JOIN supplements s ON lower(s.name) = lower(v.sup_name)
JOIN medications m ON lower(m.name) = lower(v.med_name)
ON CONFLICT (supplement_id, medication_id) DO UPDATE
SET severity = EXCLUDED.severity,
    description = EXCLUDED.description,
    recommendation = EXCLUDED.recommendation;
