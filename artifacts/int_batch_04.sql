INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
SELECT * FROM (VALUES
  (SELECT id FROM temp_medication_map WHERE name = 'Medication 3'),
        'moderate',
        'Additive effect (Evidence: C)',
        'Auto-generated interaction'
      ,
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
  SELECT id FROM temp_medication_map WHERE name = 'Medication 39'),
        'low',
        'Unknown (Evidence: B)',
        'Auto-generated interaction'
      )
) AS v(supplement_id, medication_id, severity, description, recommendation)
WHERE v.supplement_id IS NOT NULL AND v.medication_id IS NOT NULL
ON CONFLICT DO NOTHING;