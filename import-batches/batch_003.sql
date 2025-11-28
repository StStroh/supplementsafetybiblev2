INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Chondroitin')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Alpha Lipoic Acid')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Alpha Lipoic Acid')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Selenium')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Selenium')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Selenium')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Calcium')),
  (SELECT id FROM medications WHERE lower(name) = lower('Celecoxib')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Calcium')),
  (SELECT id FROM medications WHERE lower(name) = lower('Meloxicam')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Calcium')),
  (SELECT id FROM medications WHERE lower(name) = lower('Diclofenac')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Calcium')),
  (SELECT id FROM medications WHERE lower(name) = lower('Naproxen')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Calcium')),
  (SELECT id FROM medications WHERE lower(name) = lower('Ibuprofen')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Alprazolam')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Lorazepam')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Diazepam')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Clonazepam')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Vitamin C')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Vitamin C')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Vitamin E')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Vitamin E')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Vitamin E')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Vitamin E')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Vitamin E')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Iron')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Iron')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Iron')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Iron')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Folic Acid')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Biotin')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Biotin')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Niacin')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Niacin')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Melatonin')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Melatonin')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Melatonin')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Valerian Root')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Valerian Root')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Valerian Root')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Echinacea')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Echinacea')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Echinacea')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Ginkgo Biloba')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Ginkgo Biloba')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Ginkgo Biloba')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Garlic')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Garlic')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Garlic')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Ginseng')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Ginseng')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Caffeine')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Caffeine')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Caffeine')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Creatine Monohydrate')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Creatine Monohydrate')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Creatine Monohydrate')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('SAMe')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('SAMe')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('SAMe')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Alpha Lipoic Acid')),
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Caffeine')),
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Calcium')),
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Chromium')),
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Copper')),
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Creatine Monohydrate')),
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Echinacea')),
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Fiber')),
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Ginseng')),
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Iodine')),
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Iron')),
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Manganese')),
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Melatonin')),
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Molybdenum')),
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('SAMe')),
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Selenium')),
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Valerian Root')),
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Vitamin B12')),
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Vitamin C')),
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Vitamin E')),
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
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
  (SELECT id FROM medications WHERE lower(name) = lower('Albuterol')),
  'low',
  'No well-documented significant interaction',
  'Generally safe to combine; consult healthcare provider. Not medical advice.'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;
