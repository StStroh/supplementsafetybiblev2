INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Biotin')),
  (SELECT id FROM medications WHERE lower(name) = lower('Lisinopril')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Biotin')),
  (SELECT id FROM medications WHERE lower(name) = lower('Losartan')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Biotin')),
  (SELECT id FROM medications WHERE lower(name) = lower('Metoprolol')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Biotin')),
  (SELECT id FROM medications WHERE lower(name) = lower('Amlodipine')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Riboflavin')),
  (SELECT id FROM medications WHERE lower(name) = lower('Lisinopril')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Riboflavin')),
  (SELECT id FROM medications WHERE lower(name) = lower('Losartan')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Riboflavin')),
  (SELECT id FROM medications WHERE lower(name) = lower('Metoprolol')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Riboflavin')),
  (SELECT id FROM medications WHERE lower(name) = lower('Amlodipine')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Thiamine')),
  (SELECT id FROM medications WHERE lower(name) = lower('Lisinopril')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Thiamine')),
  (SELECT id FROM medications WHERE lower(name) = lower('Losartan')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Thiamine')),
  (SELECT id FROM medications WHERE lower(name) = lower('Metoprolol')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Thiamine')),
  (SELECT id FROM medications WHERE lower(name) = lower('Amlodipine')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Folic Acid')),
  (SELECT id FROM medications WHERE lower(name) = lower('Lisinopril')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Folic Acid')),
  (SELECT id FROM medications WHERE lower(name) = lower('Losartan')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Folic Acid')),
  (SELECT id FROM medications WHERE lower(name) = lower('Metoprolol')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Folic Acid')),
  (SELECT id FROM medications WHERE lower(name) = lower('Amlodipine')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Probiotics')),
  (SELECT id FROM medications WHERE lower(name) = lower('Metformin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Probiotics')),
  (SELECT id FROM medications WHERE lower(name) = lower('Atorvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Probiotics')),
  (SELECT id FROM medications WHERE lower(name) = lower('Simvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Probiotics')),
  (SELECT id FROM medications WHERE lower(name) = lower('Pravastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Probiotics')),
  (SELECT id FROM medications WHERE lower(name) = lower('Rosuvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Probiotics')),
  (SELECT id FROM medications WHERE lower(name) = lower('Lisinopril')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Prebiotics')),
  (SELECT id FROM medications WHERE lower(name) = lower('Metformin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Prebiotics')),
  (SELECT id FROM medications WHERE lower(name) = lower('Atorvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Prebiotics')),
  (SELECT id FROM medications WHERE lower(name) = lower('Simvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Prebiotics')),
  (SELECT id FROM medications WHERE lower(name) = lower('Pravastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Prebiotics')),
  (SELECT id FROM medications WHERE lower(name) = lower('Rosuvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Prebiotics')),
  (SELECT id FROM medications WHERE lower(name) = lower('Lisinopril')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('CoQ10')),
  (SELECT id FROM medications WHERE lower(name) = lower('Metoprolol')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('CoQ10')),
  (SELECT id FROM medications WHERE lower(name) = lower('Lisinopril')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('CoQ10')),
  (SELECT id FROM medications WHERE lower(name) = lower('Losartan')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('CoQ10')),
  (SELECT id FROM medications WHERE lower(name) = lower('Amlodipine')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('CoQ10')),
  (SELECT id FROM medications WHERE lower(name) = lower('Diltiazem')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Coenzyme Q10 (CoQ10)')),
  (SELECT id FROM medications WHERE lower(name) = lower('Metoprolol')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Coenzyme Q10 (CoQ10)')),
  (SELECT id FROM medications WHERE lower(name) = lower('Lisinopril')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Coenzyme Q10 (CoQ10)')),
  (SELECT id FROM medications WHERE lower(name) = lower('Losartan')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Coenzyme Q10 (CoQ10)')),
  (SELECT id FROM medications WHERE lower(name) = lower('Amlodipine')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Coenzyme Q10 (CoQ10)')),
  (SELECT id FROM medications WHERE lower(name) = lower('Diltiazem')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Magnesium')),
  (SELECT id FROM medications WHERE lower(name) = lower('Atorvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Magnesium')),
  (SELECT id FROM medications WHERE lower(name) = lower('Simvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Magnesium')),
  (SELECT id FROM medications WHERE lower(name) = lower('Pravastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Magnesium')),
  (SELECT id FROM medications WHERE lower(name) = lower('Rosuvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Zinc')),
  (SELECT id FROM medications WHERE lower(name) = lower('Metformin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Zinc')),
  (SELECT id FROM medications WHERE lower(name) = lower('Lisinopril')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Zinc')),
  (SELECT id FROM medications WHERE lower(name) = lower('Losartan')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Zinc')),
  (SELECT id FROM medications WHERE lower(name) = lower('Atorvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Zinc')),
  (SELECT id FROM medications WHERE lower(name) = lower('Simvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Zinc')),
  (SELECT id FROM medications WHERE lower(name) = lower('Pravastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;
INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Zinc')),
  (SELECT id FROM medications WHERE lower(name) = lower('Rosuvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Vitamin D3')),
  (SELECT id FROM medications WHERE lower(name) = lower('Metformin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Vitamin D3')),
  (SELECT id FROM medications WHERE lower(name) = lower('Atorvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Vitamin D3')),
  (SELECT id FROM medications WHERE lower(name) = lower('Simvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Omega-3')),
  (SELECT id FROM medications WHERE lower(name) = lower('Atorvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Omega-3')),
  (SELECT id FROM medications WHERE lower(name) = lower('Simvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Omega-3')),
  (SELECT id FROM medications WHERE lower(name) = lower('Pravastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Omega-3')),
  (SELECT id FROM medications WHERE lower(name) = lower('Rosuvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Fish Oil')),
  (SELECT id FROM medications WHERE lower(name) = lower('Atorvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Fish Oil')),
  (SELECT id FROM medications WHERE lower(name) = lower('Simvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Fish Oil')),
  (SELECT id FROM medications WHERE lower(name) = lower('Pravastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Fish Oil')),
  (SELECT id FROM medications WHERE lower(name) = lower('Rosuvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Fish Oil (Omega-3)')),
  (SELECT id FROM medications WHERE lower(name) = lower('Atorvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Fish Oil (Omega-3)')),
  (SELECT id FROM medications WHERE lower(name) = lower('Simvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Fish Oil (Omega-3)')),
  (SELECT id FROM medications WHERE lower(name) = lower('Pravastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Fish Oil (Omega-3)')),
  (SELECT id FROM medications WHERE lower(name) = lower('Rosuvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Turmeric')),
  (SELECT id FROM medications WHERE lower(name) = lower('Metformin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Turmeric')),
  (SELECT id FROM medications WHERE lower(name) = lower('Atorvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Turmeric')),
  (SELECT id FROM medications WHERE lower(name) = lower('Lisinopril')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Curcumin')),
  (SELECT id FROM medications WHERE lower(name) = lower('Metformin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Curcumin')),
  (SELECT id FROM medications WHERE lower(name) = lower('Atorvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Curcumin')),
  (SELECT id FROM medications WHERE lower(name) = lower('Lisinopril')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Turmeric (Curcumin)')),
  (SELECT id FROM medications WHERE lower(name) = lower('Metformin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Turmeric (Curcumin)')),
  (SELECT id FROM medications WHERE lower(name) = lower('Atorvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Turmeric (Curcumin)')),
  (SELECT id FROM medications WHERE lower(name) = lower('Lisinopril')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Ginger')),
  (SELECT id FROM medications WHERE lower(name) = lower('Metformin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Ginger')),
  (SELECT id FROM medications WHERE lower(name) = lower('Atorvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Green Tea Extract')),
  (SELECT id FROM medications WHERE lower(name) = lower('Metformin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Green Tea Extract')),
  (SELECT id FROM medications WHERE lower(name) = lower('Atorvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Resveratrol')),
  (SELECT id FROM medications WHERE lower(name) = lower('Metformin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Resveratrol')),
  (SELECT id FROM medications WHERE lower(name) = lower('Atorvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Resveratrol')),
  (SELECT id FROM medications WHERE lower(name) = lower('Lisinopril')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Quercetin')),
  (SELECT id FROM medications WHERE lower(name) = lower('Metformin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Quercetin')),
  (SELECT id FROM medications WHERE lower(name) = lower('Atorvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Quercetin')),
  (SELECT id FROM medications WHERE lower(name) = lower('Lisinopril')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Ashwagandha')),
  (SELECT id FROM medications WHERE lower(name) = lower('Metformin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Ashwagandha')),
  (SELECT id FROM medications WHERE lower(name) = lower('Atorvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Ashwagandha')),
  (SELECT id FROM medications WHERE lower(name) = lower('Lisinopril')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Rhodiola')),
  (SELECT id FROM medications WHERE lower(name) = lower('Metformin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Rhodiola')),
  (SELECT id FROM medications WHERE lower(name) = lower('Atorvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Rhodiola')),
  (SELECT id FROM medications WHERE lower(name) = lower('Lisinopril')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('L-Theanine')),
  (SELECT id FROM medications WHERE lower(name) = lower('Metformin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('L-Theanine')),
  (SELECT id FROM medications WHERE lower(name) = lower('Atorvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Collagen')),
  (SELECT id FROM medications WHERE lower(name) = lower('Metformin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Collagen')),
  (SELECT id FROM medications WHERE lower(name) = lower('Atorvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Collagen')),
  (SELECT id FROM medications WHERE lower(name) = lower('Lisinopril')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Whey Protein')),
  (SELECT id FROM medications WHERE lower(name) = lower('Metformin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Whey Protein')),
  (SELECT id FROM medications WHERE lower(name) = lower('Atorvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Whey Protein')),
  (SELECT id FROM medications WHERE lower(name) = lower('Lisinopril')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Glucosamine')),
  (SELECT id FROM medications WHERE lower(name) = lower('Metformin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;
INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Glucosamine')),
  (SELECT id FROM medications WHERE lower(name) = lower('Atorvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Glucosamine')),
  (SELECT id FROM medications WHERE lower(name) = lower('Lisinopril')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Chondroitin')),
  (SELECT id FROM medications WHERE lower(name) = lower('Metformin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;


INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Chondroitin')),
  (SELECT id FROM medications WHERE lower(name) = lower('Atorvastatin')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;
