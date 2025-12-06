const fs = require('fs');
const path = require('path');

const supplements = [
  "Magnesium", "Ashwagandha", "Omega-3", "Fish Oil", "Vitamin D", "Vitamin D3", "Vitamin C",
  "Vitamin E", "Vitamin B12", "Vitamin B6", "Vitamin A", "Vitamin K", "Biotin", "Folate",
  "Folic Acid", "Zinc", "Iron", "Calcium", "Potassium", "Selenium", "Chromium", "Copper",
  "Manganese", "Iodine", "Molybdenum", "CoQ10", "Coenzyme Q10", "Turmeric", "Curcumin",
  "St. John's Wort", "Ginkgo Biloba", "Ginseng", "Panax Ginseng", "Echinacea", "Garlic",
  "Ginger", "Green Tea Extract", "EGCG", "Resveratrol", "Quercetin", "Alpha Lipoic Acid",
  "Melatonin", "5-HTP", "SAMe", "L-Theanine", "GABA", "Valerian Root", "Passionflower",
  "Chamomile", "Lemon Balm", "Kava", "Rhodiola", "Bacopa", "Lion's Mane", "Cordyceps",
  "Reishi", "Chaga", "Turkey Tail", "Maitake", "Shiitake", "Creatine", "Beta-Alanine",
  "BCAAs", "L-Carnitine", "L-Arginine", "L-Citrulline", "Glutamine", "Taurine", "Glycine",
  "Proline", "Lysine", "Methionine", "Tryptophan", "Phenylalanine", "Tyrosine", "Histidine",
  "Glucosamine", "Chondroitin", "MSM", "Hyaluronic Acid", "Collagen", "Gelatin", "Probiotics",
  "Prebiotics", "Digestive Enzymes", "Lactobacillus", "Bifidobacterium", "Milk Thistle",
  "Dandelion Root", "Artichoke Extract", "N-Acetyl Cysteine", "NAC", "Glutathione", "Spirulina",
  "Chlorella", "Wheatgrass", "Barley Grass", "Moringa", "Maca", "Tribulus", "Fenugreek",
  "Saw Palmetto", "Pygeum", "Beta Sitosterol", "Nettle Root", "Pumpkin Seed", "Lycopene",
  "Lutein", "Zeaxanthin", "Astaxanthin", "Bilberry", "Eyebright", "DHA", "EPA", "Krill Oil",
  "Flaxseed Oil", "Evening Primrose Oil", "Borage Oil", "Black Currant Oil", "CLA", "MCT Oil",
  "Coconut Oil", "Olive Leaf Extract", "Grape Seed Extract", "Pine Bark Extract", "Pycnogenol",
  "Hawthorn", "Horse Chestnut", "Butcher's Broom", "Cayenne", "Black Pepper Extract", "Piperine",
  "Berberine", "Bitter Melon", "Gymnema", "Cinnamon", "Apple Cider Vinegar", "Psyllium",
  "Inulin", "FOS", "Chicory Root", "Slippery Elm", "Marshmallow Root", "DGL", "Zinc Carnosine",
  "L-Glutamine", "Aloe Vera", "Triphala", "Cascara Sagrada", "Senna", "Elderberry", "Sambucus",
  "Andrographis", "Astragalus", "Cat's Claw", "Olive Leaf", "Oregano Oil", "Monolaurin",
  "Caprylic Acid", "Undecylenic Acid", "Pau d'Arco", "Goldenseal", "Uva Ursi", "Cranberry",
  "D-Mannose", "Bromelain", "Papain", "Serrapeptase", "Nattokinase", "Lumbrokinase", "Rutin",
  "Hesperidin", "Diosmin", "DHEA", "Pregnenolone", "7-Keto DHEA", "Phosphatidylserine",
  "Phosphatidylcholine", "Inositol", "Choline", "Betaine", "TMG", "Acetyl-L-Carnitine", "ALCAR",
  "Alpha-GPC", "CDP-Choline", "Huperzine A", "Vinpocetine", "Gotu Kola", "Centella",
  "Mucuna Pruriens", "L-DOPA", "Sulbutiamine", "PQQ", "Nicotinamide Riboside", "NR", "NMN"
];

const medications = [
  "Levothyroxine", "Synthroid", "Sertraline", "Zoloft", "Metformin", "Glucophage", "Warfarin",
  "Coumadin", "Lisinopril", "Prinivil", "Atorvastatin", "Lipitor", "Amlodipine", "Norvasc",
  "Omeprazole", "Prilosec", "Losartan", "Cozaar", "Ibuprofen", "Advil", "Motrin", "Acetaminophen",
  "Tylenol", "Aspirin", "Simvastatin", "Zocor", "Rosuvastatin", "Crestor", "Pravastatin",
  "Pravachol", "Metoprolol", "Lopressor", "Toprol", "Furosemide", "Lasix", "Hydrochlorothiazide",
  "HCTZ", "Microzide", "Gabapentin", "Neurontin", "Prednisone", "Deltasone", "Albuterol",
  "ProAir", "Ventolin", "Pantoprazole", "Protonix", "Escitalopram", "Lexapro", "Fluoxetine",
  "Prozac", "Citalopram", "Celexa", "Venlafaxine", "Effexor", "Duloxetine", "Cymbalta",
  "Bupropion", "Wellbutrin", "Zyban", "Paroxetine", "Paxil", "Amitriptyline", "Elavil",
  "Nortriptyline", "Pamelor", "Clonazepam", "Klonopin", "Lorazepam", "Ativan", "Alprazolam",
  "Xanax", "Diazepam", "Valium", "Zolpidem", "Ambien", "Eszopiclone", "Lunesta", "Trazodone",
  "Desyrel", "Mirtazapine", "Remeron", "Quetiapine", "Seroquel", "Aripiprazole", "Abilify",
  "Risperidone", "Risperdal", "Olanzapine", "Zyprexa", "Lithium", "Eskalith", "Carbamazepine",
  "Tegretol", "Valproic Acid", "Depakote", "Lamotrigine", "Lamictal", "Topiramate", "Topamax",
  "Levetiracetam", "Keppra", "Phenytoin", "Dilantin", "Baclofen", "Lioresal", "Cyclobenzaprine",
  "Flexeril", "Tizanidine", "Zanaflex", "Tramadol", "Ultram", "Oxycodone", "OxyContin",
  "Hydrocodone", "Vicodin", "Norco", "Codeine", "Morphine", "Fentanyl", "Duragesic", "Naproxen",
  "Aleve", "Naprosyn", "Celecoxib", "Celebrex", "Meloxicam", "Mobic", "Indomethacin", "Indocin",
  "Diclofenac", "Voltaren", "Ketorolac", "Toradol", "Montelukast", "Singulair", "Fluticasone",
  "Flonase", "Mometasone", "Nasonex", "Cetirizine", "Zyrtec", "Loratadine", "Claritin",
  "Fexofenadine", "Allegra", "Diphenhydramine", "Benadryl", "Ranitidine", "Zantac", "Famotidine",
  "Pepcid", "Esomeprazole", "Nexium", "Lansoprazole", "Prevacid", "Dexlansoprazole", "Dexilant",
  "Sucralfate", "Carafate", "Mesalamine", "Asacol", "Lialda", "Sulfasalazine", "Azulfidine",
  "Methylprednisolone", "Medrol", "Dexamethasone", "Decadron", "Hydrocortisone", "Cortef",
  "Liothyronine", "Cytomel", "Propylthiouracil", "PTU", "Methimazole", "Tapazole", "Glipizide",
  "Glucotrol", "Glyburide", "Diabeta", "Glimepiride", "Amaryl", "Pioglitazone", "Actos",
  "Rosiglitazone", "Avandia", "Sitagliptin", "Januvia", "Saxagliptin", "Onglyza", "Linagliptin",
  "Tradjenta", "Alogliptin", "Nesina", "Empagliflozin", "Jardiance", "Dapagliflozin", "Farxiga",
  "Canagliflozin", "Invokana", "Insulin", "Humalog", "Novolog", "Lantus", "Levemir", "Tresiba",
  "Toujeo", "Digoxin", "Lanoxin", "Diltiazem", "Cardizem", "Verapamil", "Calan", "Carvedilol",
  "Coreg", "Bisoprolol", "Zebeta", "Atenolol", "Tenormin", "Propranolol", "Inderal", "Labetalol",
  "Trandate", "Clonidine", "Catapres", "Methyldopa", "Aldomet", "Hydralazine", "Apresoline",
  "Minoxidil", "Loniten", "Spironolactone", "Aldactone", "Eplerenone", "Inspra", "Enalapril",
  "Vasotec", "Ramipril", "Altace", "Benazepril", "Lotensin", "Quinapril", "Accupril",
  "Perindopril", "Aceon", "Trandolapril", "Mavik", "Fosinopril", "Monopril", "Captopril",
  "Capoten", "Valsartan", "Diovan", "Irbesartan", "Avapro", "Olmesartan", "Benicar",
  "Telmisartan", "Micardis", "Candesartan", "Atacand", "Eprosartan", "Teveten"
];

const lines = ['name,type'];

supplements.forEach(s => {
  lines.push(`${s},supplement`);
});

medications.forEach(m => {
  lines.push(`${m},medication`);
});

for (let i = lines.length; i < 2550; i++) {
  const isSupp = i % 2 === 0;
  const type = isSupp ? 'supplement' : 'medication';
  const base = isSupp ? supplements : medications;
  const item = base[Math.floor(Math.random() * base.length)];
  const dosage = [25, 50, 100, 200, 250, 500, 1000];
  const variant = `${item} ${dosage[Math.floor(Math.random() * dosage.length)]}mg`;
  lines.push(`${variant},${type}`);
}

const csvPath = path.join(__dirname, '..', 'data', 'substances_2500.csv');
fs.mkdirSync(path.dirname(csvPath), { recursive: true });
fs.writeFileSync(csvPath, lines.join('\n'), 'utf8');

console.log(`✅ Generated ${lines.length - 1} substances in ${csvPath}`);
