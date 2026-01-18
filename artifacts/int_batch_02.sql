INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
SELECT * FROM (VALUES
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 99'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ,
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 984'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 92'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 683'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 30'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 160'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 19'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 426'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 107'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 358'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 113'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 271'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 95'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 243'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 50'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 326'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 146'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 645'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 126'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 570'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 121'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 8'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 80'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 780'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 145'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 705'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 20'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 627'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 12'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 759'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 23'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 291'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 59'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 92'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 95'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 496'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 53'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 474'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 31'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 608'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 744'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 90'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 534'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 95'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 146'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 74'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 362'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 145'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 815'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 137'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 257'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 133'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 481'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 5'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 791'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 98'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 68'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 84'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 349'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 44'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 72'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 139'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 912'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 53'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 679'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 89'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 537'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 29'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 492'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 124'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 456'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 25'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 211'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 96'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 769'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 4'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 102'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 17'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 472'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 80'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 903'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 143'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 918'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 6'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 79'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 137'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 515'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 104'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 408'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 98'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 312'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 78'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 442'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 116'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 8'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 129'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 887'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 3'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 619'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 61'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 139'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 116'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 267'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 74'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 104'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 68'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 179'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 49'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 993'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 10'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 575'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 79'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 426'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 61'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 564'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 35'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 818'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 96'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 19'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 109'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 575'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 73'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 36'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 58'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 731'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 146'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 835'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 68'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 375'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 116'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 500'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 66'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 797'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 39'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 456'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 129'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 167'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 27'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 725'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 40'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 532'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 68'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 915'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 98'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 785'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 8'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 851'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 53'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 875'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 37'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 143'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 94'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 657'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 111'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 887'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 44'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 963'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 18'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 230'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 41'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 449'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 119'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 553'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 29'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 690'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 133'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 2'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 38'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 796'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 1'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 445'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 47'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 975'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 1'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 326'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 97'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 975'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 111'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 625'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 56'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 629'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 8'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 584'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 31'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 374'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 40'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 432'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 4'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 228'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 1'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 20'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 149'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 701'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 131'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 397'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 93'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 313'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 84'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 527'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 26'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 418'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 65'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 733'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 11'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 503'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 39'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 207'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 148'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 104'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 68'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 976'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 12'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 584'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 135'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 28'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 18'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 56'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 302'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 5'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 672'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 144'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 650'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 109'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 617'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 4'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 434'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 32'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 354'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 58'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 774'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 3'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 456'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 140'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 907'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 119'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 82'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 84'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 405'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 82'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 886'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 43'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 478'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 148'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 746'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 77'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 557'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 147'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 596'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 121'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 648'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 67'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 91'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 848'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 3'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 957'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 78'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 756'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 98'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 340'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 144'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 624'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 11'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 498'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 71'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 271'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 142'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 56'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 54'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 465'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 139'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 127'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 115'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 9'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 118'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 13'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 43'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 237'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 115'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 529'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 23'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 133'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 52'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 124'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 74'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 862'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 24'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 758'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 99'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 771'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 96'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 155'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 56'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 980'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 104'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 448'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 62'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 859'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 43'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 655'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 25'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 631'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 29'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 590'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 49'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 565'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 97'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 900'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 26'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 149'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 129'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 708'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 132'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 117'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 46'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 934'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 127'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 518'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 86'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 566'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 85'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 822'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 92'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 861'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 58'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 565'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 15'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 360'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 108'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 600'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 74'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 757'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 134'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 685'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 35'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 959'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 41'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 779'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 46'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 453'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 82'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 879'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 145'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 546'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 80'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 754'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 122'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 299'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 135'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 434'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 66'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 451'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 105'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 650'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 18'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 23'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 20'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 735'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 79'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 528'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 61'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 922'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 11'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 558'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 98'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 244'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 91'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 644'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 72'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 88'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 95'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 179'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 89'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 150'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 94'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 810'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 124'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 613'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 43'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 105'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 42'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 93'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 134'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 382'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 24'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 748'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 109'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 350'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 51'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 144'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 91'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 287'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 87'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 381'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 103'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 898'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 129'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 966'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 19'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 548'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 146'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 576'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 40'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 33'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 126'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 756'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 51'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 564'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 97'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 165'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 101'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 105'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 109'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 439'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 68'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 93'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 55'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 401'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 116'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 872'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 145'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 514'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 128'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 105'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 672'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 49'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 735'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 131'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 138'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 139'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 170'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 78'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 136'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 31'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 610'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 137'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 228'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 61'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 957'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 76'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 937'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 119'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 696'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 129'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 978'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 39'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 107'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 112'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 597'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 99'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 176'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 10'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 679'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 51'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 292'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 20'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 59'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 74'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 470'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 38'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 923'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 90'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 672'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 102'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 45'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 39'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 461'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 130'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 682'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 10'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 703'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 107'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 265'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 35'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 637'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 107'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 777'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 53'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 991'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 12'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 88'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 22'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 836'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 800'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 87'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 645'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 126'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 431'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 83'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 369'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 15'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 851'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 47'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 247'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 115'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      )
) AS v(supplement_id, medication_id, severity, description, recommendation)
WHERE v.supplement_id IS NOT NULL AND v.medication_id IS NOT NULL;INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
SELECT * FROM (VALUES
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 355'),
  SELECT id FROM temp_medication_map WHERE name = 'Medication 10'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      )
) AS v(supplement_id, medication_id, severity, description, recommendation)
WHERE v.supplement_id IS NOT NULL AND v.medication_id IS NOT NULL
ON CONFLICT DO NOTHING;