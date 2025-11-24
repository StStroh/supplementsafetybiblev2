INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
SELECT * FROM (VALUES
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 194'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 99'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 436'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 112'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 784'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 27'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 776'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 100'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 98'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 265'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 60'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 755'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 88'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 922'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 37'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 761'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 84'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 977'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 80'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 213'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 111'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 922'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 139'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 496'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 86'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 660'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 76'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 525'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 65'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 258'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 122'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 65'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 188'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 122'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 408'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 38'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 310'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 122'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 431'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 16'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 866'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 65'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 635'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 132'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 625'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 103'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 51'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 6'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 978'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 74'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 302'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 107'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 66'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 28'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 481'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 103'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 964'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 9'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 566'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 78'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 846'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 143'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 43'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 63'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 164'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 132'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 581'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 137'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 465'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 25'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 687'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 18'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 340'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 94'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 284'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 141'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 693'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 3'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 553'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 93'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 801'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 75'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 523'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 101'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 964'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 49'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 616'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 94'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 692'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 120'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 137'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 89'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 23'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 81'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 439'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 103'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 600'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 119'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 117'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 63'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 63'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 4'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 404'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 56'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 882'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 41'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 348'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 60'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 858'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 6'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 224'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 71'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 649'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 112'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 749'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 18'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 250'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 80'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 339'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 37'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 285'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 51'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 776'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 119'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 376'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 110'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 581'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 28'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 825'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 94'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 551'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 77'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 182'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 116'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 832'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 139'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 383'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 89'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 464'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 110'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 278'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 54'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 307'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 44'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 821'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 77'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 723'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 81'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 902'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 145'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 372'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 107'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 908'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 82'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 138'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 56'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 369'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 1'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 477'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 122'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 160'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 59'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 354'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 56'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 44'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 103'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 709'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 104'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 789'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 116'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 571'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 25'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 526'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 72'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 687'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 28'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 167'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 27'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 198'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 150'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 628'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 84'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 785'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 14'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 428'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 73'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 846'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 146'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 371'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 149'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 101'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 38'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 255'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 14'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 385'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 257'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 137'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 44'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 93'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 63'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 937'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 80'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 582'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 122'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 292'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 120'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 801'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 16'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 731'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 27'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 27'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 75'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 650'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 83'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 542'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 25'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 156'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 148'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 578'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 130'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 747'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 144'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 672'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 51'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 871'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 49'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 374'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 49'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 315'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 102'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 757'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 93'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 35'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 79'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 328'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 109'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 535'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 55'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 51'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 78'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 56'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 13'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 482'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 4'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 97'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 78'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 603'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 9'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 552'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 90'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 788'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 88'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 933'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 135'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 889'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 25'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 674'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 72'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 863'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 9'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 12'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 45'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 647'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 76'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 53'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 39'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 102'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 470'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 2'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 269'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 35'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 874'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 77'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 251'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 136'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 504'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 142'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 719'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 88'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 749'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 128'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 882'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 85'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 271'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 10'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 60'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 130'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 447'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 79'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 384'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 13'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 239'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 5'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 829'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 101'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 105'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 58'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 85'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 12'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 509'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 105'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 368'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 142'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 413'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 27'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 181'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 143'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 712'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 47'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 301'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 35'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 32'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 89'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 406'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 73'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 673'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 51'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 921'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 41'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 903'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 114'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 621'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 64'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 340'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 120'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 896'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 34'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 717'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 75'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 169'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 133'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 914'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 136'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 638'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 4'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 938'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 10'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 470'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 59'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 598'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 113'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 481'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 110'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 677'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 132'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 444'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 52'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 942'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 54'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 860'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 111'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 990'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 37'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 784'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 66'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 520'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 112'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 142'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 142'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 965'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 24'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 161'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 32'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 233'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 44'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 803'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 120'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 226'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 129'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 383'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 71'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 869'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 86'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 122'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 55'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 563'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 127'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 98'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 140'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 38'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 28'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 980'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 4'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 733'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 21'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 783'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 76'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 291'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 141'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 491'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 42'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 692'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 136'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 506'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 72'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 1000'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 98'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 930'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 33'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 847'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 88'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 397'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 102'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 292'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 37'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 559'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 103'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 841'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 111'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 8'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 36'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 9'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 34'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 874'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 36'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 291'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 141'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 292'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 3'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 481'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 100'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 55'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 67'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 16'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 78'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 446'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 30'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 975'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 122'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 728'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 85'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 736'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 69'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 961'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 116'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 748'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 132'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 126'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 72'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 278'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 129'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 939'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 4'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 876'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 90'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 943'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 79'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 513'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 9'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 202'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 93'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 130'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 114'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 638'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 93'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 233'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 137'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 472'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 45'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 44'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 77'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 594'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 95'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 804'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 106'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 481'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 120'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 607'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 80'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 69'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 131'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 185'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 72'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 843'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 2'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 80'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 38'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 706'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 142'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 640'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 66'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 160'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 128'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 736'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 12'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 100'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 734'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 4'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 652'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 106'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 83'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 38'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 96'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 99'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      )
) AS v(supplement_id, medication_id, severity, description, recommendation)
WHERE v.supplement_id IS NOT NULL AND v.medication_id IS NOT NULL;INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
SELECT * FROM (VALUES
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 444'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 99'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
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
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 10'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 886'),
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
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 237'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 3'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 823'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 53'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 185'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 76'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 854'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 17'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 411'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 23'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 138'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 126'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 729'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 92'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 940'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 14'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 770'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 24'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 581'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 20'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 707'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 101'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 963'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 43'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 71'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 58'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 325'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 48'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 485'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 56'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 552'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 45'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 366'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 14'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 846'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 90'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 465'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 44'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 576'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 146'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 638'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 46'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 300'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 68'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 967'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 85'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 354'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 927'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 129'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 682'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 147'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 745'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 40'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 423'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 79'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 339'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 54'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 349'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 57'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 777'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 139'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 530'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 29'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 320'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 37'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 786'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 68'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 117'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 100'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 191'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 64'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 917'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 12'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 926'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 143'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 499'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 39'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 483'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 133'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 114'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 85'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 304'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 5'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 373'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 112'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 229'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 836'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 68'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 548'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 110'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 629'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 67'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 923'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 100'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 782'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 737'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 139'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 325'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 108'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 537'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 102'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 746'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 47'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 325'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 237'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 57'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 976'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 94'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 114'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 323'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 92'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 725'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 17'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 861'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 129'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 804'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 27'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 680'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 55'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 116'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 20'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 921'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 147'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 186'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 116'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 981'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 91'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 766'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 7'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 176'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 82'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 626'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 124'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 388'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 144'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 273'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 75'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 48'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 5'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 465'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 423'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 119'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 885'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 137'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 672'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 96'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 538'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 140'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 507'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 45'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 127'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 121'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 797'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 104'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 666'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 133'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 38'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 139'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 844'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 129'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 720'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 17'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 543'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 101'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 234'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 127'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 65'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 21'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 386'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 91'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 642'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 131'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 111'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 632'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 91'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 454'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 67'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 410'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 992'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 49'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 245'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 17'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 375'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 141'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 1'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 133'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 437'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 23'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 657'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 73'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 255'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 4'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 735'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 117'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 633'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 20'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 930'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 115'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 869'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 112'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 7'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 129'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 796'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 6'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 413'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 84'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 757'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 20'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 15'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 14'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 712'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 26'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 708'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 136'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 186'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 146'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 988'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 100'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 233'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 15'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 781'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 41'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 176'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 85'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 484'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 28'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 8'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 23'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 189'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 391'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 28'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 125'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 106'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 743'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 54'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 510'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 66'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 534'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 42'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 199'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 120'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 859'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 134'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 165'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 79'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 457'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 79'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 628'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 19'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 667'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 37'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 307'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 43'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 904'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 49'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 378'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 70'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 12'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 53'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 438'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 91'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 87'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 27'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 259'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 129'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 655'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 34'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 94'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 21'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 533'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 139'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 281'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 7'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 561'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 106'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 503'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 17'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 620'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 55'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 721'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 621'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 127'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 802'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 20'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 251'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 24'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 297'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 79'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 187'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 102'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 95'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 81'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 120'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 131'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 929'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 7'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 491'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 93'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 618'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 9'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 82'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 6'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 445'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 6'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 471'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 106'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 147'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 150'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 587'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 145'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 318'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 85'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 653'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 48'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 594'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 124'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 366'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 67'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 452'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 75'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 922'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 90'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 191'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 86'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 720'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 39'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 787'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 83'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 617'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 76'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 923'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 69'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 918'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 63'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 680'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 64'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 412'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 101'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 546'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 114'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 47'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 111'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 15'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 101'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 666'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 42'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 218'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 10'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 69'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 456'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 98'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 20'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 84'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 82'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 78'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 348'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 18'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 355'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 124'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 891'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 78'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 908'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 29'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 189'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 11'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 404'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 35'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 945'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 101'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 980'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 24'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 299'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 13'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 11'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 144'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 192'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 60'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 602'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 121'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 543'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 49'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 668'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 100'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 268'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 29'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 151'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 103'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 287'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 83'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 957'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 98'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 577'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 64'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 705'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 27'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 702'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 144'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 92'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 1'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 708'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 855'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 113'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 595'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 46'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 669'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 137'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 202'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 117'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 496'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 537'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 141'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 503'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 132'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 523'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 78'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 670'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 143'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 671'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 115'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 851'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 9'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 401'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 77'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 729'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 112'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 355'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 132'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 396'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 139'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 105'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 9'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 313'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 70'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 30'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 95'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 697'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 117'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 325'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 13'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 52'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 51'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 726'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 96'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 954'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 144'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 533'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 114'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 658'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 57'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 889'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 67'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 430'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 59'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 714'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 82'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 114'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 134'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 271'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 131'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 407'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 77'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 870'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 27'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 11'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 47'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 204'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 50'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 440'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 87'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 231'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 132'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 678'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 149'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 995'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 121'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 680'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 121'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 857'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 12'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 554'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 134'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 691'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 67'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 758'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 140'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      )
) AS v(supplement_id, medication_id, severity, description, recommendation)
WHERE v.supplement_id IS NOT NULL AND v.medication_id IS NOT NULL;INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
SELECT * FROM (VALUES
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 878'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 136'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 470'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 39'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 285'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 41'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 628'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 92'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 708'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 114'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 714'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 50'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 502'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 58'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 7'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 118'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 982'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 78'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 22'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 111'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 509'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 13'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 856'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 62'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 295'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 13'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 475'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 13'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 189'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 25'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 918'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 47'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 829'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 73'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 953'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 57'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 282'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 24'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 930'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 10'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 33'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 273'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 144'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 412'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 66'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 532'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 144'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 635'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 48'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 520'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 39'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 719'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 143'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 144'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 234'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 119'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 820'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 21'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 616'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 14'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 96'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 68'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 85'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 73'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 476'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 31'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 723'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 142'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 781'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 62'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 139'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 127'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 905'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 51'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 713'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 132'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 989'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 55'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 530'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 139'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 504'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 102'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 728'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 53'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 915'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 1'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 245'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 106'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 909'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 56'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 875'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 40'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 806'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 91'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 905'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 38'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 466'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 85'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 779'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 33'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 335'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 72'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 14'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 63'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 746'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 96'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 259'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 78'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 941'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 39'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 164'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 62'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 496'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 302'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 121'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 852'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 78'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 429'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 4'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 882'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 102'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 467'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 1'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 672'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 6'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 570'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 4'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 701'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 107'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 608'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 10'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 706'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 135'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 283'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 330'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 146'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 282'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 100'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 866'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 88'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 308'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 130'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 777'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 64'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 684'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 43'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 244'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 50'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 548'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 147'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 559'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 85'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 333'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 72'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 304'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 128'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 386'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 64'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 575'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 65'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 64'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 126'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 312'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 74'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 769'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 113'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 573'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 22'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 229'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 41'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 147'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 4'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 490'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 122'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 297'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 115'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 565'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 30'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 789'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 76'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 217'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 136'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 606'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 109'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 927'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 3'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 738'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 51'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 857'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 25'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 655'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 24'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 32'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 74'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 627'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 90'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 148'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 101'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 387'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 113'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 103'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 99'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 467'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 149'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 418'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 110'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 564'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 57'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 185'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 17'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 165'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 132'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 419'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 53'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 589'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 7'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 167'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 118'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 679'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 19'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 947'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 39'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 209'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 25'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 354'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 126'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 239'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 16'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 872'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 83'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 536'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 142'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 291'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 66'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 708'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 68'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 755'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 129'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 15'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 66'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 520'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 92'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 607'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 105'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 110'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 15'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 517'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 39'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 381'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 31'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 671'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 136'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 81'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 52'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 428'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 63'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 111'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 17'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 112'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 132'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 559'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 98'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 577'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 42'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 369'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 32'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 13'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 95'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 768'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 8'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 972'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 100'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 808'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 149'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 178'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 86'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 729'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 32'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 582'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 146'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 35'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 137'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 794'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 69'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 341'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 78'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 950'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 134'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 426'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 115'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 686'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 26'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 202'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 13'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 323'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 48'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 423'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 93'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 168'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 29'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 16'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 79'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 174'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 13'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 633'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 147'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 451'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 6'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 144'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 103'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 34'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 75'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 809'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 129'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 93'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 150'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 543'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 114'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 48'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 45'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 386'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 59'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 372'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 148'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 726'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 147'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 571'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 33'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 958'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 124'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 440'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 65'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 839'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 62'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 610'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 58'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 161'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 38'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 222'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 124'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 442'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 130'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 264'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 113'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 934'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 3'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 397'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 117'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 79'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 92'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 529'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 59'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 940'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 50'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 963'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 79'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 443'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 5'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 434'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 106'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 296'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 142'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 340'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 126'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 221'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 112'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 500'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 69'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 537'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 87'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 314'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 1'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 298'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 115'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 168'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 121'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 752'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 69'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 587'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 82'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 698'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 98'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 390'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 8'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 521'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 77'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 979'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 18'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 690'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 128'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 965'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 142'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 597'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 8'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 921'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 11'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 318'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 149'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 93'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 63'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 154'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 96'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 178'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 91'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 810'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 90'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 107'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 129'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 799'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 12'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 277'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 142'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 781'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 113'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 757'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 57'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 4'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 48'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 434'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 106'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 242'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 144'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 217'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 13'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 71'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 50'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 214'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 53'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 99'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 94'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 592'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 2'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 77'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 59'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 586'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 32'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 804'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 76'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 706'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 72'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 786'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 120'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 794'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 30'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 588'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 118'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 995'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 30'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 655'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 6'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 959'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 32'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 873'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 36'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 708'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 117'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 381'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 18'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 602'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 538'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 277'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 105'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 85'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 99'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 957'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 106'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 885'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 37'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 317'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 85'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 514'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 9'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 426'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 12'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 377'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 42'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 630'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 143'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 87'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 120'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 776'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 692'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 140'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 273'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 49'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 209'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 23'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 416'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 32'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 624'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 77'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 209'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 80'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      )
) AS v(supplement_id, medication_id, severity, description, recommendation)
WHERE v.supplement_id IS NOT NULL AND v.medication_id IS NOT NULL;INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
SELECT * FROM (VALUES
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 644'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 94'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 550'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 21'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 635'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 131'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 211'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 97'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 289'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 133'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 283'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 94'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 63'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 88'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 31'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 56'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 509'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 48'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 695'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 31'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 709'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 126'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 892'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 25'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 539'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 40'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 426'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 13'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 185'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 87'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 679'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 20'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 276'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 112'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 846'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 84'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 704'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 78'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 479'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 106'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 846'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 144'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 411'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 2'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 630'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 89'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 676'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 145'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 453'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 144'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 626'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 107'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 324'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 103'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 157'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 113'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 952'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 135'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 386'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 144'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 681'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 147'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 678'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 82'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 39'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 756'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 39'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 430'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 65'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 589'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 25'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 995'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 110'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 487'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 87'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 474'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 139'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 522'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 11'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 597'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 144'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 362'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 72'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 818'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 114'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 353'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 9'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 524'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 98'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 454'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 105'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 412'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 45'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 795'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 133'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 730'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 74'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 24'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 24'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 16'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 72'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 339'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 26'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 884'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 77'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 977'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 97'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 779'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 104'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 570'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 120'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 58'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 53'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 453'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 34'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 261'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 103'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 824'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 45'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 568'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 29'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 857'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 132'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 346'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 98'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 767'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 96'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 814'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 50'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 300'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 14'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 247'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 92'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 60'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 117'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 355'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 20'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 186'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 116'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 59'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 60'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 413'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 21'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 230'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 31'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 966'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 109'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 533'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 99'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 193'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 66'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 946'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 144'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 656'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 87'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 347'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 119'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 415'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 150'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 596'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 37'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 110'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 95'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 806'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 109'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 996'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 62'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 17'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 148'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 847'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 80'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 512'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 90'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 633'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 72'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 597'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 48'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 246'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 42'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 188'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 40'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 486'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 40'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 367'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 114'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 136'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 98'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 883'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 90'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 687'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 148'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 567'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 89'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 102'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 61'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 498'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 103'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 15'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 106'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 153'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 131'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 598'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 6'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 47'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 73'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 195'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 8'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 336'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 143'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 470'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 79'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 771'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 39'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 82'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 14'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 1000'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 87'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 83'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 65'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 433'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 102'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 105'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 928'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 16'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 819'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 67'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 97'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 61'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 39'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 111'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 604'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 5'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 827'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 514'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 36'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 32'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 95'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 19'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 69'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 375'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 212'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 83'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 529'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 87'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 195'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 23'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 464'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 70'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 259'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 51'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 336'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 74'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 514'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 109'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 20'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 12'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 314'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 84'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 337'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 58'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 487'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 23'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 840'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 18'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 682'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 91'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 176'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 7'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 87'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 76'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 700'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 12'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 929'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 25'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 959'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 48'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 777'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 136'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 571'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 116'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 998'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 5'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 47'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 82'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 310'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 50'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 838'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 66'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 290'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 637'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 66'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 278'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 62'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 539'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 104'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 623'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 35'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 619'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 149'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 485'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 72'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 515'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 39'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 666'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 114'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 514'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 48'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 856'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 41'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 976'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 63'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 520'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 79'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 467'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 1'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 521'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 103'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 633'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 116'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 154'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 72'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 461'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 34'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 439'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 29'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 471'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 76'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 445'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 18'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 771'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 22'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 96'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 72'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 386'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 663'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 21'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 193'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 80'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 821'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 108'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 101'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 147'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 196'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 57'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 460'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 96'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 322'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 20'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 805'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 16'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 710'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 23'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 157'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 70'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 15'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 133'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 564'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 78'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 156'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 35'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 590'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 79'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 724'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 36'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 596'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 67'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 174'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 148'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 38'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 54'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 538'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 796'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 72'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 605'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 66'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 343'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 87'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 614'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 86'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 263'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 84'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 874'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 76'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 39'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 28'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 693'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 79'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 872'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 140'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 406'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 13'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 625'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 93'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 749'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 114'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 339'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 31'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 138'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 61'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 305'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 84'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 2'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 74'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 387'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 51'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 218'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 59'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 408'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 135'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 252'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 45'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 386'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 7'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 892'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 115'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 53'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 141'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 247'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 124'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 165'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 15'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 679'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 104'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 775'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 140'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 784'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 97'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 942'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 54'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 114'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 63'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 746'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 59'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 765'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 99'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 710'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 84'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 314'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 112'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 867'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 109'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 729'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 12'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 82'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 118'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 796'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 105'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 578'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 38'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 938'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 29'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 846'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 734'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 50'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 691'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 148'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 148'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 120'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 449'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 98'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 707'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 99'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 975'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 63'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 486'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 92'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 343'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 13'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 67'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 7'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 706'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 70'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 407'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 136'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 850'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 102'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 584'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 67'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 245'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 106'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 559'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 119'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 276'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 16'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 571'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 150'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 831'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 146'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 817'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 105'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 170'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 146'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      )
) AS v(supplement_id, medication_id, severity, description, recommendation)
WHERE v.supplement_id IS NOT NULL AND v.medication_id IS NOT NULL;INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
SELECT * FROM (VALUES
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 47'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 12'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 229'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 127'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 926'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 66'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 262'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 567'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 62'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 923'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 23'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 281'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 96'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 604'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 108'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 306'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 121'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 890'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 33'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 455'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 27'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 773'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 116'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 948'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 98'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 814'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 86'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 568'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 57'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 886'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 108'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 693'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 47'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 717'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 50'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 92'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 77'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 20'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 136'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 885'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 86'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 895'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 124'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 131'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 78'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 644'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 28'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 116'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 903'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 40'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 490'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 68'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 289'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 79'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 929'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 33'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 901'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 11'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 655'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 130'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 382'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 131'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 560'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 82'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 663'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 97'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 673'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 132'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 408'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 58'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 117'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 875'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 104'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 350'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 25'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 971'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 13'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 3'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 10'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 971'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 93'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 520'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 260'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 23'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 613'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 84'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 490'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 101'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 235'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 84'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 892'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 72'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 600'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 74'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 10'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 59'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 712'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 54'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 558'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 51'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 130'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 150'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 772'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 121'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 950'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 97'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 815'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 61'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 845'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 40'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 110'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 111'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 138'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 77'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 995'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 27'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 74'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 52'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 642'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 787'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 40'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 352'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 9'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 122'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 45'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 103'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 108'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 461'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 1'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 299'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 68'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 793'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 83'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 593'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 101'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 872'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 10'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 13'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 108'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 743'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 81'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 211'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 76'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 747'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 32'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 348'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 76'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 405'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 35'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 226'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 54'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 475'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 77'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 840'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 101'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 840'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 141'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 330'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 83'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 233'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 96'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 129'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 24'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 504'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 53'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 204'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 120'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 768'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 99'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 81'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 150'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 256'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 131'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 852'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 3'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 344'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 92'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 198'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 11'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 778'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 77'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 840'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 39'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 795'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 47'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 165'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 144'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 366'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 94'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 161'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 30'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 960'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 59'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 35'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 118'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 380'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 33'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 532'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 932'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 133'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 144'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 149'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 571'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 52'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 442'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 50'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 387'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 63'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 743'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 46'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 649'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 135'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 485'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 134'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 233'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 118'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 930'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 86'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 91'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 12'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 225'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 122'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 50'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 30'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 167'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 91'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 106'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 514'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 55'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 409'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 149'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 282'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 26'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 140'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 40'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 22'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 122'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 148'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 49'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 147'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 136'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 10'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 114'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 424'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 26'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 548'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 150'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 987'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 48'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 658'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 104'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 334'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 146'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 682'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 74'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 336'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 90'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 900'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 108'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 893'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 10'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 171'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 133'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 815'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 119'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 713'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 81'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 852'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 68'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 828'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 37'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 681'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 9'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 799'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 86'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 923'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 35'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 569'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 100'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 133'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 14'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 510'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 30'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 642'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 45'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 158'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 19'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 176'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 32'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 418'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 121'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 320'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 692'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 108'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 731'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 78'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 179'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 67'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 693'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 27'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 100'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 102'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 937'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 101'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 549'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 105'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 692'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 27'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 840'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 52'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 433'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 93'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 960'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 142'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 783'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 73'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 794'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 140'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 744'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 3'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 373'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 83'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 470'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 72'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 948'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 23'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 834'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 80'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 157'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 47'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 295'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 124'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 306'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 43'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 927'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 76'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 701'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 25'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 984'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 60'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 286'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 74'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 220'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 30'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 990'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 62'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 177'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 132'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 602'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 883'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 47'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 364'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 115'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 265'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 49'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 176'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 59'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 193'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 96'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 191'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 84'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 812'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 102'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 899'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 139'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 979'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 18'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 514'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 148'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 221'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 60'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 17'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 55'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 307'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 111'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 101'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 6'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 623'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 8'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 165'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 127'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 43'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 14'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 94'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 41'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 822'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 53'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 278'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 4'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 729'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 118'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 374'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 74'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 443'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 762'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 135'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 118'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 78'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 917'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 74'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 860'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 23'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 697'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 40'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 652'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 136'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 744'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 135'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 883'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 57'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 259'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 93'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 521'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 351'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 21'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 171'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 8'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 406'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 27'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 840'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 89'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 520'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 53'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 522'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 37'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 140'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 562'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 72'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 485'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 50'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 289'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 82'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 293'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 71'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 475'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 81'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 394'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 129'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 474'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 23'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 266'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 53'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 78'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 16'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 144'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 89'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 959'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 13'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 19'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 79'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 627'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 142'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 979'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 144'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 802'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 44'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 231'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 106'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 863'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 144'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 999'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 61'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 434'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 150'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 585'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 148'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 406'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 641'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 50'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 120'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 41'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 907'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 19'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 410'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 8'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 304'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 98'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 344'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 6'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 23'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 140'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 708'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 63'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 296'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 31'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 887'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 31'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      )
) AS v(supplement_id, medication_id, severity, description, recommendation)
WHERE v.supplement_id IS NOT NULL AND v.medication_id IS NOT NULL;INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
SELECT * FROM (VALUES
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 173'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 31'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 668'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 102'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 43'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 64'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 750'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 69'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 586'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 105'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 995'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 83'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 683'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 41'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 523'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 61'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 642'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 68'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 37'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 72'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 16'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 34'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 129'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 31'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 543'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 22'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 597'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 76'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 821'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 99'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 55'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 135'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 855'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 144'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 607'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 106'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 87'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 31'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 532'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 95'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 294'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 119'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 875'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 51'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 326'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 4'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 491'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 55'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 468'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 3'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 675'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 46'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 140'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 30'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 998'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 62'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 914'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 61'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 285'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 145'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 532'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 40'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 529'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 122'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 281'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 69'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 1000'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 35'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 451'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 55'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 209'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 45'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 600'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 29'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 28'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 43'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 779'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 100'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 790'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 731'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 55'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 887'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 131'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 596'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 746'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 94'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 433'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 60'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 616'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 60'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 662'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 39'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 16'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 84'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 630'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 130'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 853'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 131'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 491'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 51'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 68'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 50'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 111'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 141'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 82'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 490'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 79'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 385'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 7'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 527'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 102'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 904'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 147'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 252'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 143'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 938'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 6'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 884'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 22'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 216'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 114'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 822'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 50'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 49'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 55'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 707'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 108'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 383'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 147'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 48'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 36'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 185'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 114'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 277'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 55'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 54'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 86'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 970'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 131'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 668'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 11'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 666'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 7'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 421'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 45'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 444'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 132'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 726'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 128'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 87'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 40'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 131'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 127'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 844'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 100'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 313'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 100'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 591'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 81'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 60'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 51'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 128'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 25'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 38'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 43'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 297'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 22'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 823'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 110'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 182'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 29'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 756'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 104'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 731'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 67'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 682'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 759'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 139'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 284'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 464'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 33'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 934'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 90'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 536'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 38'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 821'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 49'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 8'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 33'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 590'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 12'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 530'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 48'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 176'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 73'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 271'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 18'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 36'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 27'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 342'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 116'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 657'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 27'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 1'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 144'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 153'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 134'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 618'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 128'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 874'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 147'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 161'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 74'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 413'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 145'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 567'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 114'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 688'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 82'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 173'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 148'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 110'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 51'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 514'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 82'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 116'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 902'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 49'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 697'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 17'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 289'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 106'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 833'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 7'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 784'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 63'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 783'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 140'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 823'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 99'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 681'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 269'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 135'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 472'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 50'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 744'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 84'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 764'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 103'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 629'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 126'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 664'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 27'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 504'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 19'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 102'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 119'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 52'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 24'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 34'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 105'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 777'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 95'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 27'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 136'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 78'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 38'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 282'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 115'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 576'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 112'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 69'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 30'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 272'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 68'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 247'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 146'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 787'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 30'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 573'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 89'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 463'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 604'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 134'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 564'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 136'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 130'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 142'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 116'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 116'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 636'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 140'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 393'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 147'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 591'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 15'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 20'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 113'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 659'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 32'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 459'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 53'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 777'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 20'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 299'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 59'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 14'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 100'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 86'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 105'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 191'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 140'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 531'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 112'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 430'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 34'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 211'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 116'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 256'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 19'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 400'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 61'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 259'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 130'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 325'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 34'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 595'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 75'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 219'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 31'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 85'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 70'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 771'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 144'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 788'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 6'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 69'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 129'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 264'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 81'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 192'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 59'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 243'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 81'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 875'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 42'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 626'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 50'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 48'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 20'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 851'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 118'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 198'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 68'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 153'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 95'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 563'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 69'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 528'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 137'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 667'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 41'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 818'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 49'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 29'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 196'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 97'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 956'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 26'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 187'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 57'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 508'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 149'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 839'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 16'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 365'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 60'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 806'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 149'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 764'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 145'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 626'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 50'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 271'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 133'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 5'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 18'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 195'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 35'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 662'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 39'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 207'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 103'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 608'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 7'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 53'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 29'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 40'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 29'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 3'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 131'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 666'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 47'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 715'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 76'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 715'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 44'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 958'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 112'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 936'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 88'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 539'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 46'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 732'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 142'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 902'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 34'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 609'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 214'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 70'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 319'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 135'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 464'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 8'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 446'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 70'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 763'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 34'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 47'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 78'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 303'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 64'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 754'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 102'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 968'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 124'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 148'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 51'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 378'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 103'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 575'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 57'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 420'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 3'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 844'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 14'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 944'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 17'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 811'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 34'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 965'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 44'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 141'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 10'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 339'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 26'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 451'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 17'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 779'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 46'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 751'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 91'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 560'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 147'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 425'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 12'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 234'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 4'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 829'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 54'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 938'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 55'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 361'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 45'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 403'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 2'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 489'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 30'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 284'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 149'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 690'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 130'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 766'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 26'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 654'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 63'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 866'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 25'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 68'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 106'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      )
) AS v(supplement_id, medication_id, severity, description, recommendation)
WHERE v.supplement_id IS NOT NULL AND v.medication_id IS NOT NULL;INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
SELECT * FROM (VALUES
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 690'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 22'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 785'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 139'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 776'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 89'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 189'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 111'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 743'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 135'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 666'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 102'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 503'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 111'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 299'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 119'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 578'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 993'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 5'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 196'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 144'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 450'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 112'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 159'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 54'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 879'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 35'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 702'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 60'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 568'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 84'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 639'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 69'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 984'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 85'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 445'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 111'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 890'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 132'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 233'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 14'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 374'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 104'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 828'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 150'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 969'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 67'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 63'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 58'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 10'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 52'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 554'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 106'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 844'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 14'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 383'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 137'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 514'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 89'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 590'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 13'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 460'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 70'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 350'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 33'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 585'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 108'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 671'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 46'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 129'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 133'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 599'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 126'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 862'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 60'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 304'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 46'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 489'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 118'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 341'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 83'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 747'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 47'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 852'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 128'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 348'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 11'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 878'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 67'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 932'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 107'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 998'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 94'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 163'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 92'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 439'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 84'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 945'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 121'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 563'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 11'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 914'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 6'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 434'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 132'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 566'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 45'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 183'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 95'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 478'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 137'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 593'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 39'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 801'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 9'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 374'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 150'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 702'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 4'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 216'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 98'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 514'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 16'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 172'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 136'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 818'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 118'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 516'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 144'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 735'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 64'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 731'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 58'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 665'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 93'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 209'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 102'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 265'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 473'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 118'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 427'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 101'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 811'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 37'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 159'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 97'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 487'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 2'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 1000'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 84'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 853'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 56'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 397'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 118'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 84'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 23'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 499'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 96'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 376'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 31'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 832'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 10'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 541'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 107'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 19'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 13'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 794'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 146'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 140'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 47'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 140'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 134'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 188'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 137'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 531'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 46'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 5'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 127'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 704'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 111'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 623'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 70'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 887'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 81'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 991'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 64'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 419'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 51'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 568'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 53'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 92'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 51'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 256'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 99'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 107'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 17'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 547'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 51'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 706'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 79'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 321'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 143'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 391'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 88'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 634'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 981'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 23'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 274'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 52'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 688'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 103'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 131'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 591'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 54'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 279'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 145'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 908'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 69'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 242'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 1'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 574'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 109'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 112'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 121'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 891'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 148'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 958'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 10'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 49'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 18'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 987'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 140'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 974'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 148'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 117'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 5'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 560'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 77'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 719'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 78'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 641'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 141'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 693'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 25'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 437'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 3'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 424'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 104'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 244'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 11'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 203'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 116'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 517'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 46'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 71'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 107'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 259'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 94'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 16'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 22'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 666'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 70'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 696'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 139'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 788'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 1'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 583'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 88'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 370'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 106'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 624'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 145'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 259'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 111'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 747'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 42'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 330'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 6'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 518'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 92'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 211'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 44'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 403'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 106'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 75'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 87'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 495'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 84'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 832'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 108'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 448'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 53'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 424'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 92'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 16'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 97'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 222'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 96'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 975'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 1'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 485'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 93'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 146'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 114'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 34'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 21'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 787'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 103'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 522'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 14'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 25'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 101'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 525'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 121'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 337'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 23'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 291'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 74'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 921'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 100'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 968'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 115'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 798'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 76'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 346'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 118'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 922'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 82'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 613'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 729'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 136'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 244'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 5'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 789'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 18'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 85'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 52'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 175'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 28'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 168'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 89'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 186'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 22'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 226'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 143'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 734'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 13'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 460'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 124'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 270'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 24'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 694'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 150'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 814'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 47'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 139'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 849'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 99'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 623'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 80'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 615'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 68'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 22'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 692'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 79'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 652'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 134'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 219'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 91'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 487'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 28'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 82'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 135'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 87'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 22'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 884'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 50'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 17'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 70'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 360'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 11'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 681'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 61'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 205'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 108'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 928'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 148'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 247'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 110'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 125'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 57'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 655'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 106'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 698'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 144'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 659'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 36'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 240'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 101'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 156'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 47'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 311'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 104'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 325'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 134'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 457'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 26'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 215'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 71'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 948'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 19'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 92'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 18'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 692'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 105'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 262'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 72'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 21'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 55'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 18'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 135'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 78'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 97'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 928'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 57'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 241'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 42'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 33'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 121'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 655'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 115'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 690'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 150'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 343'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 34'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 192'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 148'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 755'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 10'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 331'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 28'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 194'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 56'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 589'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 8'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 541'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 68'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 460'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 212'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 65'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 669'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 9'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 983'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 145'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 254'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 78'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 170'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 85'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 515'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 27'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 352'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 91'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 162'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 129'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 678'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 80'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 204'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 2'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 629'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 59'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 100'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 48'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 14'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 102'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 486'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 1'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 857'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 81'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 610'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 105'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 711'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 5'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 529'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 45'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 530'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 40'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 406'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 1'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 976'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 131'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 118'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 57'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      )
) AS v(supplement_id, medication_id, severity, description, recommendation)
WHERE v.supplement_id IS NOT NULL AND v.medication_id IS NOT NULL;INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
SELECT * FROM (VALUES
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 181'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 136'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 68'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 72'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 879'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 86'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 977'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 18'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 917'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 71'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 325'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 150'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 849'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 61'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 137'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 101'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 269'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 41'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 698'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 67'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 455'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 86'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 121'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 568'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 49'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 3'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 54'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 356'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 42'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 525'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 112'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 609'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 22'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 810'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 35'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 188'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 46'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 615'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 67'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 775'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 26'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 249'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 66'),
        'moderate',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 18'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 51'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 776'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 47'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 851'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 59'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 495'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 80'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 120'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 28'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 8'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 46'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 550'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 80'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 567'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 59'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 202'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 98'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 693'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 128'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 263'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 55'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 178'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 90'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 6'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 3'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 173'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 95'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 107'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 61'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 246'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 5'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 240'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 44'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 644'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 76'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 34'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 141'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 501'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 111'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 541'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 99'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 911'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 32'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 6'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 88'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 786'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 114'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 187'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 9'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 831'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 100'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 723'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 117'),
        'low',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 508'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 87'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 416'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 69'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 562'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 65'),
        'severe',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 357'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 110'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 872'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 25'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 482'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 2'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 588'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 64'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 900'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 143'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 260'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 145'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 719'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 92'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 480'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 90'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 982'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 73'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 105'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 99'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 59'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 111'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 124'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 111'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 59'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 110'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 618'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 4'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 627'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 22'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 873'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 10'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 347'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 121'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 138'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 124'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 110'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 146'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 836'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 66'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 984'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 115'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 372'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 64'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 689'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 46'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 840'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 89'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 743'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 31'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 276'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 33'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 145'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 57'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 582'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 130'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 894'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 82'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 304'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 103'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 635'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 95'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 7'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 119'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 566'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 83'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 356'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 140'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 743'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 11'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 154'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 61'),
        'severe',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 854'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 58'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 245'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 69'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 444'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 117'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 364'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 31'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 907'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 72'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 79'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 44'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 224'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 41'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 634'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 49'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 964'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 44'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 465'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 12'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 411'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 111'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 911'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 70'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 36'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 45'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 820'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 112'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 403'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 95'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 88'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 24'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 407'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 108'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 606'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 99'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 924'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 61'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 45'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 38'),
        'moderate',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 43'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 56'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 846'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 117'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 904'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 87'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 930'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 86'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 656'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 43'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 124'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 46'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 374'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 146'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 330'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 88'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 464'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 33'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 440'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 110'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 609'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 559'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 136'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 555'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 66'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 882'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 15'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 102'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 79'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 773'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 79'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 137'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 120'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 457'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 61'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 558'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 7'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 151'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 113'),
        'severe',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 75'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 41'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 516'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 116'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 158'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 23'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 458'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 58'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 612'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 3'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 289'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 143'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 97'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 22'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 578'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 59'),
        'low',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 271'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 78'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 438'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 14'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 437'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 51'),
        'low',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 866'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 148'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 716'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 130'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 664'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 57'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 108'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 139'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 813'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 118'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 518'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 13'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 840'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 32'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 762'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 1'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 210'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 15'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 134'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 34'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 446'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 104'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 64'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 16'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 930'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 63'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 764'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 18'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 865'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 16'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 165'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 57'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 825'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 163'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 7'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 195'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 141'),
        'severe',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 371'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 86'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 820'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 145'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 550'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 1'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 506'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 10'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 46'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 30'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 7'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 61'),
        'severe',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 835'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 121'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 558'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 6'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 11'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 36'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 690'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 141'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 389'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 92'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 529'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 52'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 10'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 98'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 993'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 104'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 527'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 104'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 101'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 6'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 288'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 116'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 507'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 66'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 534'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 140'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 125'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 79'),
        'moderate',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 985'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 114'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 438'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 146'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 665'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 106'),
        'severe',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 474'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 137'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 463'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 62'),
        'moderate',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 499'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 39'),
        'low',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 780'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 31'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 263'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 111'),
        'moderate',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 319'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 121'),
        'high',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 315'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 5'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 929'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 4'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 361'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 101'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 490'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 60'),
        'high',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 430'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 82'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 666'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 79'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 579'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 96'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 504'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 47'),
        'low',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 293'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 34'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 428'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 106'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 354'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 25'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 285'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 97'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 316'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 67'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 213'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 11'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 350'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 36'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 840'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 47'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 204'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 138'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 123'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 149'),
        'low',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 316'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 113'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 336'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 21'),
        'high',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 139'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 16'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 203'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 65'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 433'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 134'),
        'moderate',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 767'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 39'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 567'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 131'),
        'severe',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 695'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 5'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 615'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 62'),
        'severe',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 371'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 103'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 86'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 113'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 107'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 68'),
        'high',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 842'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 125'),
        'low',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 702'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 75'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 923'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 95'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 741'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 89'),
        'high',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 69'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 150'),
        'high',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 471'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 21'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 21'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 134'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 601'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 85'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 229'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 123'),
        'moderate',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 696'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 29'),
        'high',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 376'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 67'),
        'low',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 468'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 109'),
        'moderate',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 52'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 132'),
        'moderate',
        'Absorption reduction (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 841'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 109'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 3'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 56'),
        'high',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 764'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 15'),
        'low',
        'Metabolism inhibition (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 738'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 40'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 216'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 83'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 133'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 1'),
        'severe',
        'Absorption reduction (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 863'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 139'),
        'moderate',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 639'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 9'),
        'low',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 326'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 9'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 114'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 50'),
        'high',
        'Metabolism inhibition (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 46'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 37'),
        'high',
        'Additive effect (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 26'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 150'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 373'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 41'),
        'high',
        'Unknown (Evidence: C)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 285'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 5'),
        'high',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 432'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 116'),
        'severe',
        'Unknown (Evidence: A)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 203'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 39'),
        'severe',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 236'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 38'),
        'low',
        'Additive effect (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 618'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 113'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 366'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 33'),
        'severe',
        'Absorption reduction (Evidence: B)',
        'Auto-generated interaction'
      ),
  (
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement 74'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication 110'),
        'moderate',
        'Metabolism inhibition (Evidence: A)',
        'Auto-generated interaction'
      )
) AS v(supplement_id, medication_id, severity, description, recommendation)
WHERE v.supplement_id IS NOT NULL AND v.medication_id IS NOT NULL;