INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
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
WHERE v.supplement_id IS NOT NULL AND v.medication_id IS NOT NULL;