INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
SELECT * FROM (VALUES
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 886',
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 131'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 261'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 2'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 999'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 16'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 479'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 139'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 843'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 100'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 960'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 79'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 767'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 133'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 573'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 124'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 821'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 46'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 286'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 94'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 66'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 100'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 577'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 133'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 797'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 14'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 912'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 90'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 183'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 99'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 904'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 137'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 253'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 37'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 142'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 23'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 11'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 1'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 53'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 147'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 535'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 106'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 851'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 952'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 43'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 182'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 149'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 975'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 41'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 48'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 110'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 395'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 16'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 785'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 86'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 948'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 71'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 80'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 1'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 50'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 19'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 134'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 40'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 516'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 39'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 311'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 115'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 369'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 46'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 987'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 12'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 750'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 19'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 30'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 29'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 35'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 20'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 792'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 17'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 302'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 120'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 886'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 104'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 851'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 14'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 254'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 121'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 501'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 348'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 13'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 430'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 8'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 934'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 5'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 700'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 107'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 58'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 143'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 577'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 99'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 390'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 58'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 553'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 71'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 114'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 18'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 905'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 15'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 610'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 70'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 223'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 68'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 833'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 42'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 707'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 11'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 410'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 44'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 519'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 57'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 121'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 29'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 233'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 117'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 467'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 34'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 852'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 40'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 670'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 106'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 680'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 114'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 159'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 62'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 113'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 134'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 390'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 105'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 816'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 77'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 771'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 108'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 807'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 121'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 84'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 45'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 709'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 30'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 975'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 96'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 155'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 110'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 31'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 59'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 206'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 91'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 178'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 130'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 868'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 110'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 344'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 89'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 160'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 47'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 71'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 124'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 770'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 65'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 604'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 88'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 563'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 146'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 40'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 57'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 807'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 105'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 426'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 77'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 168'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 460'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 99'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 414'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 121'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 671'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 30'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 123'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 72'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 226'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 38'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 424'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 103'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 61'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 59'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 111'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 24'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 20'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 66'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 108'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 142'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 779'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 137'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 485'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 29'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 773'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 30'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 343'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 75'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 480'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 144'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 317'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 22'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 952'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 46'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 342'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 117'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 984'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 60'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 106'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 92'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 783'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 49'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 194'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 129'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 652'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 133'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 108'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 6'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 885'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 92'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 382'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 146'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 538'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 130'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 560'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 71'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 383'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 5'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 446'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 95'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 378'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 88'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 252'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 75'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 470'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 4'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 679'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 100'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 204'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 114'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 52'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 56'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 356'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 127'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 775'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 34'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 424'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 67'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 938'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 55'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 952'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 74'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 342'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 54'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 73'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 136'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 607'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 89'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 122'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 104'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 804'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 67'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 197'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 70'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 898'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 98'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 653'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 37'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 33'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 111'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 743'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 85'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 551'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 55'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 463'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 39'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 907'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 149'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 802'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 49'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 5'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 36'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 107'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 146'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 446'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 117'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 914'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 30'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 975'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 60'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 661'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 57'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 109'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 36'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 137'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 58'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 81'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 25'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 727'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 24'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 496'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 139'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 866'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 71'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 201'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 103'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 980'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 11'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 135'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 1'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 357'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 17'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 945'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 44'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 279'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 62'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 598'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 124'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 145'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 61'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 803'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 112'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 565'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 56'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 433'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 5'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 304'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 53'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 511'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 6'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 973'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 30'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 16'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 69'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 386'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 53'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 299'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 70'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 975'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 53'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 111'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 53'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 947'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 134'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 274'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 146'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 934'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 99'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 385'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 3'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 868'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 27'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 795'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 132'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 565'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 149'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 921'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 109'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 190'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 62'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 79'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 109'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 277'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 55'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 246'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 64'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 677'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 22'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 454'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 115'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 89'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 77'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 154'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 17'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 970'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 85'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 708'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 29'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 939'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 88'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 55'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 111'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 742'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 148'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 102'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 34'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 110'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 14'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 928'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 132'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 234'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 8'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 649'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 12'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 680'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 55'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 199'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 19'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 344'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 2'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 331'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 147'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 767'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 70'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 457'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 52'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 112'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 6'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 897'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 100'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 41'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 46'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 593'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 33'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 562'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 29'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 416'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 101'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 215'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 114'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 713'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 23'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 926'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 115'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 518'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 149'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 435'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 113'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 123'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 117'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 236'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 98'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 164'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 133'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 263'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 148'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 235'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 17'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 68'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 44'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 888'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 56'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 587'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 132'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 585'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 507'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 100'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 79'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 796'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 94'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 978'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 43'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 225'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 55'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 389'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 56'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 102'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 69'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 403'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 102'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 670'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 105'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 161'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 8'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 206'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 5'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 57'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 6'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 419'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 25'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 660'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 72'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 811'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 4'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 782'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 104'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 544'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 69'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 698'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 145'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 509'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 87'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 213'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 23'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      )
) AS v(supplement_id, medication_id, severity, description, recommendation)
WHERE v.supplement_id IS NOT NULL AND v.medication_id IS NOT NULL;INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
SELECT * FROM (VALUES
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 662'),
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 17'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 237')
) AS v(supplement_id, medication_id, severity, description, recommendation)
WHERE v.supplement_id IS NOT NULL AND v.medication_id IS NOT NULL
ON CONFLICT DO NOTHING;