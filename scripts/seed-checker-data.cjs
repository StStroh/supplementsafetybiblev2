const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Use service role for seeding (bypasses RLS)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

const substances = [
  // Drugs
  { substance_id: 'D_WARFARIN', type: 'drug', display_name: 'Warfarin', canonical_name: 'warfarin', aliases: ['coumadin', 'jantoven'], tags: ['anticoagulant', 'blood thinner'] },
  { substance_id: 'D_ASPIRIN', type: 'drug', display_name: 'Aspirin', canonical_name: 'aspirin', aliases: ['asa', 'acetylsalicylic acid'], tags: ['nsaid', 'antiplatelet'] },
  { substance_id: 'D_SERTRALINE', type: 'drug', display_name: 'Sertraline', canonical_name: 'sertraline', aliases: ['zoloft'], tags: ['ssri', 'antidepressant'] },
  { substance_id: 'D_FLUOXETINE', type: 'drug', display_name: 'Fluoxetine', canonical_name: 'fluoxetine', aliases: ['prozac'], tags: ['ssri', 'antidepressant'] },
  { substance_id: 'D_METFORMIN', type: 'drug', display_name: 'Metformin', canonical_name: 'metformin', aliases: ['glucophage'], tags: ['diabetes', 'biguanide'] },
  { substance_id: 'D_LEVOTHYROXINE', type: 'drug', display_name: 'Levothyroxine', canonical_name: 'levothyroxine', aliases: ['synthroid', 'levoxyl'], tags: ['thyroid', 'hormone'] },
  { substance_id: 'D_LISINOPRIL', type: 'drug', display_name: 'Lisinopril', canonical_name: 'lisinopril', aliases: ['prinivil', 'zestril'], tags: ['ace inhibitor', 'blood pressure'] },
  { substance_id: 'D_ATORVASTATIN', type: 'drug', display_name: 'Atorvastatin', canonical_name: 'atorvastatin', aliases: ['lipitor'], tags: ['statin', 'cholesterol'] },
  { substance_id: 'D_ALPRAZOLAM', type: 'drug', display_name: 'Alprazolam', canonical_name: 'alprazolam', aliases: ['xanax'], tags: ['benzodiazepine', 'anxiety'] },
  { substance_id: 'D_OMEPRAZOLE', type: 'drug', display_name: 'Omeprazole', canonical_name: 'omeprazole', aliases: ['prilosec'], tags: ['ppi', 'acid reducer'] },
  { substance_id: 'D_CLOPIDOGREL', type: 'drug', display_name: 'Clopidogrel', canonical_name: 'clopidogrel', aliases: ['plavix'], tags: ['antiplatelet', 'blood thinner'] },
  { substance_id: 'D_METOPROLOL', type: 'drug', display_name: 'Metoprolol', canonical_name: 'metoprolol', aliases: ['lopressor', 'toprol'], tags: ['beta blocker', 'blood pressure'] },

  // Supplements
  { substance_id: 'S_STJOHNSWORT', type: 'supplement', display_name: "St. John's Wort", canonical_name: 'st johns wort', aliases: ['hypericum', 'st john wort', 'stjohnswort'], tags: ['herbal', 'mood'] },
  { substance_id: 'S_GINKGO', type: 'supplement', display_name: 'Ginkgo Biloba', canonical_name: 'ginkgo biloba', aliases: ['ginkgo', 'gingko'], tags: ['herbal', 'cognitive'] },
  { substance_id: 'S_GARLIC', type: 'supplement', display_name: 'Garlic', canonical_name: 'garlic', aliases: ['allium'], tags: ['herbal', 'cardiovascular'] },
  { substance_id: 'S_FISHOIL', type: 'supplement', display_name: 'Fish Oil', canonical_name: 'fish oil', aliases: ['omega 3', 'omega-3', 'dha', 'epa'], tags: ['omega-3', 'cardiovascular'] },
  { substance_id: 'S_VITAMINE', type: 'supplement', display_name: 'Vitamin E', canonical_name: 'vitamin e', aliases: ['tocopherol', 'vit e'], tags: ['vitamin', 'antioxidant'] },
  { substance_id: 'S_VITAMINK', type: 'supplement', display_name: 'Vitamin K', canonical_name: 'vitamin k', aliases: ['phylloquinone', 'vit k'], tags: ['vitamin', 'blood clotting'] },
  { substance_id: 'S_MELATONIN', type: 'supplement', display_name: 'Melatonin', canonical_name: 'melatonin', aliases: [], tags: ['hormone', 'sleep'] },
  { substance_id: 'S_5HTP', type: 'supplement', display_name: '5-HTP', canonical_name: '5-hydroxytryptophan', aliases: ['5 htp', '5htp', 'hydroxytryptophan'], tags: ['amino acid', 'mood'] },
  { substance_id: 'S_MAGNESIUM', type: 'supplement', display_name: 'Magnesium', canonical_name: 'magnesium', aliases: ['mg'], tags: ['mineral', 'electrolyte'] },
  { substance_id: 'S_CALCIUM', type: 'supplement', display_name: 'Calcium', canonical_name: 'calcium', aliases: ['ca'], tags: ['mineral', 'bone health'] },
  { substance_id: 'S_IRON', type: 'supplement', display_name: 'Iron', canonical_name: 'iron', aliases: ['ferrous sulfate', 'fe'], tags: ['mineral', 'anemia'] },
  { substance_id: 'S_ZINC', type: 'supplement', display_name: 'Zinc', canonical_name: 'zinc', aliases: ['zn'], tags: ['mineral', 'immune'] },
  { substance_id: 'S_VITAMINC', type: 'supplement', display_name: 'Vitamin C', canonical_name: 'vitamin c', aliases: ['ascorbic acid', 'vit c'], tags: ['vitamin', 'antioxidant'] },
  { substance_id: 'S_VITAMIND', type: 'supplement', display_name: 'Vitamin D', canonical_name: 'vitamin d', aliases: ['cholecalciferol', 'vit d'], tags: ['vitamin', 'bone health'] },
  { substance_id: 'S_COENZQ10', type: 'supplement', display_name: 'CoQ10', canonical_name: 'coenzyme q10', aliases: ['coq10', 'ubiquinone'], tags: ['antioxidant', 'energy'] },
  { substance_id: 'S_GINSENG', type: 'supplement', display_name: 'Ginseng', canonical_name: 'ginseng', aliases: ['panax ginseng'], tags: ['herbal', 'energy'] },
  { substance_id: 'S_VALERIAN', type: 'supplement', display_name: 'Valerian Root', canonical_name: 'valerian', aliases: ['valerian root'], tags: ['herbal', 'sleep'] },
  { substance_id: 'S_TURMERIC', type: 'supplement', display_name: 'Turmeric', canonical_name: 'turmeric', aliases: ['curcumin'], tags: ['herbal', 'anti-inflammatory'] }
];

async function seed() {
  console.log('Inserting substances...');

  // Insert substances in batches
  for (let i = 0; i < substances.length; i += 10) {
    const batch = substances.slice(i, i + 10);
    const { error } = await supabase.from('checker_substances').upsert(batch, { onConflict: 'substance_id' });
    if (error) {
      console.error('Error inserting substances batch', i, ':', error.message);
    } else {
      console.log('Inserted substances', i, '-', Math.min(i + 10, substances.length));
    }
  }

  // Count substances
  const { count: subCount } = await supabase.from('checker_substances').select('*', { count: 'exact', head: true });
  console.log('✅ Total substances:', subCount);

  console.log('\\n✅ Seed complete! Now run the SQL file for interactions.');
}

seed().catch(console.error);
