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
WHERE v.supplement_id IS NOT NULL AND v.medication_id IS NOT NULL;