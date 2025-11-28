INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 44')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 45')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 46')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 47')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 48')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 49')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 50')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Alpha Lipoic Acid')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Ashwagandha')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Caffeine')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Calcium')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Chondroitin')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Chromium')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Collagen')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Copper')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Creatine Monohydrate')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Curcumin')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Fiber')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Ginger')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Ginseng')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Glucosamine')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Green Tea Extract')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Iodine')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('L-Theanine')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Magnesium')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Manganese')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Molybdenum')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Prebiotics')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Probiotics')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Quercetin')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Resveratrol')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Rhodiola')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('SAMe')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Selenium')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Turmeric')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Turmeric (Curcumin)')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Valerian Root')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Vitamin E')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Whey Protein')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 1')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 2')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 3')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 4')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 5')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 6')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 7')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 8')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 9')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 10')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 11')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 12')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 13')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 14')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 15')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 16')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 17')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 18')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 19')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 20')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 21')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 22')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 23')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 24')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 25')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 26')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 27')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 28')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 29')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 30')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 31')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 32')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 33')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 34')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 35')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 36')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 37')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 38')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 39')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 40')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 41')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 42')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 43')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 44')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 45')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 46')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 47')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 48')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 49')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Supplement 50')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Alpha Lipoic Acid')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Ashwagandha')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Biotin')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Caffeine')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Chondroitin')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Chromium')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Coenzyme Q10 (CoQ10)')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Collagen')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Copper')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('CoQ10')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Creatine Monohydrate')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Curcumin')),
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
  (SELECT id FROM supplements WHERE lower(name) = lower('Echinacea')),
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
