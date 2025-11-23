INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
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