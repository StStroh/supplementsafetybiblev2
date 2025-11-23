INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
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
WHERE v.supplement_id IS NOT NULL AND v.medication_id IS NOT NULL;