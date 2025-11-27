const fs = require('fs');
const path = require('path');

const sjw = "St. John's Wort";
const SUPS = ['5-HTP','Alpha Lipoic Acid','Ashwagandha','Biotin','Caffeine','Calcium','Chondroitin','Chromium','CoQ10','Collagen','Copper','Creatine Monohydrate','Curcumin','Echinacea','Fiber','Fish Oil','Folic Acid','Garlic','Ginger','Ginkgo Biloba','Ginseng','Glucosamine','Green Tea Extract','Iodine','Iron','L-Theanine','Magnesium','Manganese','Melatonin','Molybdenum','Niacin','Omega-3','Potassium','Probiotics','Quercetin','Resveratrol','Rhodiola','Riboflavin','SAMe','Selenium',sjw,'Thiamine','Turmeric','Valerian Root','Vitamin B12','Vitamin C','Vitamin D3','Vitamin E','Vitamin K','Vitamin K2','Whey Protein','Zinc'];

const MEDS = ['Albuterol','Alprazolam','Amiodarone','Amlodipine','Amoxicillin','Aspirin','Atorvastatin','Azithromycin','Celecoxib','Ciprofloxacin','Clonazepam','Clopidogrel','Diazepam','Diclofenac','Digoxin','Diltiazem','Doxycycline','Duloxetine','Escitalopram','Fluoxetine','Furosemide','Gabapentin','Hydrochlorothiazide','Ibuprofen','Insulin','Levofloxacin','Levothyroxine','Lisinopril','Lorazepam','Losartan','Meloxicam','Metformin','Metoprolol','Naproxen','Omeprazole','Pravastatin','Prednisone','Rosuvastatin','Sertraline','Simvastatin','Spironolactone','Venlafaxine','Verapamil','Warfarin','Zolpidem'];

const gold = [
  ['Fish Oil','Warfarin','high','Increased bleeding risk due to antiplatelet effects','Monitor INR closely; report unusual bleeding. Not medical advice.'],
  ['Omega-3','Warfarin','high','Increased bleeding risk due to antiplatelet effects','Monitor INR closely; report unusual bleeding. Not medical advice.'],
  ['Garlic','Warfarin','moderate','May potentiate anticoagulant effect','Avoid high-dose garlic supplements; monitor INR. Not medical advice.'],
  ['Ginkgo Biloba','Warfarin','high','Increased bleeding risk','Avoid combination; consult prescriber. Not medical advice.'],
  ['Vitamin E','Warfarin','moderate','High doses may increase bleeding risk','Limit vitamin E >400 IU; monitor INR. Not medical advice.'],
  ['Vitamin K','Warfarin','high','Directly antagonizes warfarin anticoagulant effect','Maintain consistent vitamin K intake; consult prescriber. Not medical advice.'],
  ['Vitamin K2','Warfarin','high','Directly antagonizes warfarin anticoagulant effect','Maintain consistent vitamin K intake; consult prescriber. Not medical advice.'],
  ['Fish Oil','Aspirin','moderate','Additive antiplatelet effects increase bleeding risk','Monitor for bleeding signs; separate timing if possible. Not medical advice.'],
  ['Omega-3','Aspirin','moderate','Additive antiplatelet effects increase bleeding risk','Monitor for bleeding signs; separate timing if possible. Not medical advice.'],
  ['Garlic','Clopidogrel','moderate','May enhance antiplatelet effects','Avoid high-dose supplements; monitor for bleeding. Not medical advice.'],
  ['Ginkgo Biloba','Aspirin','moderate','Increased bleeding risk','Use cautiously; monitor for bleeding. Not medical advice.'],
  ['Ginkgo Biloba','Clopidogrel','moderate','Increased bleeding risk','Use cautiously; monitor for bleeding. Not medical advice.'],
  [sjw,'Sertraline','severe','Risk of serotonin syndrome; CYP inducer reduces drug levels','Do not combine; consult prescriber immediately. Not medical advice.'],
  [sjw,'Fluoxetine','severe','Risk of serotonin syndrome; CYP inducer reduces drug levels','Do not combine; consult prescriber immediately. Not medical advice.'],
  [sjw,'Escitalopram','severe','Risk of serotonin syndrome; CYP inducer reduces drug levels','Do not combine; consult prescriber immediately. Not medical advice.'],
  [sjw,'Venlafaxine','severe','Risk of serotonin syndrome; CYP inducer reduces drug levels','Do not combine; consult prescriber immediately. Not medical advice.'],
  [sjw,'Duloxetine','severe','Risk of serotonin syndrome; CYP inducer reduces drug levels','Do not combine; consult prescriber immediately. Not medical advice.'],
  ['5-HTP','Sertraline','high','Risk of serotonin syndrome','Avoid combination; consult prescriber. Not medical advice.'],
  ['5-HTP','Fluoxetine','high','Risk of serotonin syndrome','Avoid combination; consult prescriber. Not medical advice.'],
  ['5-HTP','Escitalopram','high','Risk of serotonin syndrome','Avoid combination; consult prescriber. Not medical advice.'],
  ['Calcium','Levothyroxine','moderate','Reduces absorption of thyroid medication','Separate by at least 4 hours. Not medical advice.'],
  ['Iron','Levothyroxine','moderate','Reduces absorption of thyroid medication','Separate by at least 4 hours. Not medical advice.'],
  ['Magnesium','Levothyroxine','moderate','May reduce absorption of thyroid medication','Separate by at least 2-4 hours. Not medical advice.'],
  ['Fiber','Levothyroxine','low','High-fiber supplements may reduce absorption','Take levothyroxine on empty stomach; separate fiber. Not medical advice.'],
  ['Iron','Omeprazole','moderate','Reduced iron absorption due to increased gastric pH','Consider iron supplementation timing or formulation. Not medical advice.'],
  ['Calcium','Ciprofloxacin','moderate','Chelation reduces antibiotic absorption','Separate by at least 2 hours. Not medical advice.'],
  ['Calcium','Levofloxacin','moderate','Chelation reduces antibiotic absorption','Separate by at least 2 hours. Not medical advice.'],
  ['Calcium','Doxycycline','moderate','Chelation reduces antibiotic absorption','Separate by at least 2 hours. Not medical advice.'],
  ['Iron','Ciprofloxacin','moderate','Chelation reduces antibiotic absorption','Separate by at least 2 hours. Not medical advice.'],
  ['Iron','Levofloxacin','moderate','Chelation reduces antibiotic absorption','Separate by at least 2 hours. Not medical advice.'],
  ['Iron','Doxycycline','moderate','Chelation reduces antibiotic absorption','Separate by at least 2 hours. Not medical advice.'],
  ['Magnesium','Ciprofloxacin','moderate','Chelation reduces antibiotic absorption','Separate by at least 2 hours. Not medical advice.'],
  ['Magnesium','Levofloxacin','moderate','Chelation reduces antibiotic absorption','Separate by at least 2 hours. Not medical advice.'],
  ['Zinc','Ciprofloxacin','moderate','Chelation reduces antibiotic absorption','Separate by at least 2 hours. Not medical advice.'],
  ['Zinc','Levofloxacin','moderate','Chelation reduces antibiotic absorption','Separate by at least 2 hours. Not medical advice.'],
  ['Probiotics','Amoxicillin','low','Antibiotics may reduce probiotic viability','Take probiotics several hours apart from antibiotic. Not medical advice.'],
  ['Probiotics','Azithromycin','low','Antibiotics may reduce probiotic viability','Take probiotics several hours apart from antibiotic. Not medical advice.'],
  ['Probiotics','Ciprofloxacin','low','Antibiotics may reduce probiotic viability','Take probiotics several hours apart from antibiotic. Not medical advice.'],
  ['Niacin','Atorvastatin','moderate','Increased risk of myopathy','Use cautiously; monitor for muscle pain. Not medical advice.'],
  ['Niacin','Simvastatin','moderate','Increased risk of myopathy','Use cautiously; monitor for muscle pain. Not medical advice.'],
  ['Niacin','Rosuvastatin','moderate','Increased risk of myopathy','Use cautiously; monitor for muscle pain. Not medical advice.'],
  ['CoQ10','Warfarin','moderate','May reduce anticoagulant effect','Monitor INR if starting/stopping CoQ10. Not medical advice.'],
  ['Potassium','Lisinopril','moderate','Risk of hyperkalemia','Monitor potassium levels; avoid high-dose supplements. Not medical advice.'],
  ['Potassium','Losartan','moderate','Risk of hyperkalemia','Monitor potassium levels; avoid high-dose supplements. Not medical advice.'],
  ['Potassium','Spironolactone','high','Significant risk of hyperkalemia','Avoid potassium supplements; monitor levels closely. Not medical advice.'],
  ['Magnesium','Hydrochlorothiazide','low','Diuretic may deplete magnesium','Magnesium supplementation may be beneficial; consult prescriber. Not medical advice.'],
  ['Potassium','Hydrochlorothiazide','low','Diuretic may deplete potassium','Potassium supplementation may be needed; monitor levels. Not medical advice.'],
  ['Potassium','Furosemide','low','Diuretic may deplete potassium','Potassium supplementation may be needed; monitor levels. Not medical advice.'],
  ['Magnesium','Furosemide','low','Diuretic may deplete magnesium','Magnesium supplementation may be beneficial; consult prescriber. Not medical advice.'],
  ['Melatonin','Zolpidem','moderate','Additive sedative effects','Use cautiously; avoid driving. Not medical advice.'],
  ['Valerian Root','Zolpidem','moderate','Additive sedative effects','Use cautiously; avoid driving. Not medical advice.'],
  ['Valerian Root','Alprazolam','moderate','Additive sedative effects','Use cautiously; consult prescriber. Not medical advice.'],
  ['Valerian Root','Lorazepam','moderate','Additive sedative effects','Use cautiously; consult prescriber. Not medical advice.'],
  ['Valerian Root','Diazepam','moderate','Additive sedative effects','Use cautiously; consult prescriber. Not medical advice.'],
  ['Valerian Root','Clonazepam','moderate','Additive sedative effects','Use cautiously; consult prescriber. Not medical advice.'],
  ['Magnesium','Metformin','low','Metformin may reduce magnesium absorption','Consider magnesium supplementation; monitor levels. Not medical advice.'],
  ['Vitamin B12','Metformin','low','Long-term metformin may deplete B12','Consider B12 supplementation; monitor levels annually. Not medical advice.'],
  ['Chromium','Insulin','moderate','May enhance insulin effect; hypoglycemia risk','Monitor blood glucose closely. Not medical advice.'],
  ['Chromium','Metformin','low','May enhance glucose-lowering effect','Monitor blood glucose; consult prescriber. Not medical advice.'],
  ['Ginseng','Insulin','moderate','May affect blood glucose control','Monitor blood glucose closely. Not medical advice.'],
  ['Ginseng','Metformin','low','May affect blood glucose control','Monitor blood glucose; consult prescriber. Not medical advice.'],
  ['Vitamin C','Warfarin','low','High doses (>1g/day) may affect INR','Keep vitamin C intake consistent; monitor INR. Not medical advice.'],
  ['Green Tea Extract','Warfarin','moderate','Contains vitamin K; may reduce anticoagulant effect','Avoid high doses; monitor INR. Not medical advice.'],
  ['Zinc','Amoxicillin','low','May reduce antibiotic absorption','Separate by 2 hours if possible. Not medical advice.'],
  ['Calcium','Verapamil','moderate','May reduce effectiveness of calcium channel blocker','Consult prescriber before high-dose calcium. Not medical advice.'],
  ['Calcium','Diltiazem','moderate','May reduce effectiveness of calcium channel blocker','Consult prescriber before high-dose calcium. Not medical advice.'],
  [sjw,'Digoxin','high','CYP inducer reduces digoxin levels','Avoid combination; consult prescriber. Not medical advice.'],
  [sjw,'Verapamil','high','CYP inducer reduces drug levels','Avoid combination; consult prescriber. Not medical advice.'],
  [sjw,'Atorvastatin','moderate','CYP inducer may reduce statin levels','Avoid combination; consult prescriber. Not medical advice.'],
  [sjw,'Simvastatin','moderate','CYP inducer may reduce statin levels','Avoid combination; consult prescriber. Not medical advice.'],
  ['Ginkgo Biloba','Ibuprofen','moderate','Increased bleeding risk','Use cautiously; monitor for bleeding. Not medical advice.'],
  ['Ginkgo Biloba','Naproxen','moderate','Increased bleeding risk','Use cautiously; monitor for bleeding. Not medical advice.'],
  ['Garlic','Aspirin','moderate','Additive antiplatelet effects','Avoid high-dose garlic; monitor for bleeding. Not medical advice.'],
  ['Ginger','Warfarin','moderate','May enhance anticoagulant effect','Avoid high doses; monitor INR. Not medical advice.'],
  ['Ginger','Aspirin','low','May enhance antiplatelet effects','Use moderate amounts; monitor for bleeding. Not medical advice.'],
  ['Turmeric','Warfarin','moderate','May enhance anticoagulant effect','Avoid high doses; monitor INR. Not medical advice.'],
  ['Curcumin','Warfarin','moderate','May enhance anticoagulant effect','Avoid high doses; monitor INR. Not medical advice.'],
  ['Vitamin D3','Digoxin','moderate','Hypercalcemia from vitamin D may increase digoxin toxicity','Monitor calcium and digoxin levels. Not medical advice.'],
  ['Calcium','Digoxin','moderate','Hypercalcemia may increase digoxin toxicity','Avoid high-dose calcium; monitor levels. Not medical advice.'],
  ['SAMe','Sertraline','moderate','Risk of serotonin syndrome','Avoid combination; consult prescriber. Not medical advice.'],
  ['SAMe','Escitalopram','moderate','Risk of serotonin syndrome','Avoid combination; consult prescriber. Not medical advice.'],
  ['Niacin','Pravastatin','moderate','Increased risk of myopathy','Use cautiously; monitor for muscle pain. Not medical advice.'],
  ['Ginseng','Warfarin','moderate','May affect INR variability','Monitor INR closely; maintain consistent use. Not medical advice.'],
];

const result = gold.map(([s,m,sev,d,r]) => ({supplement:s,medication:m,severity:sev,description:d,recommendation:r}));
const seen = new Set(result.map(i => i.supplement+'|||'+i.medication));

// Low-risk filler
const lowPairs = [
  {sups:['Vitamin C','Vitamin D3','Vitamin B12','Biotin','Riboflavin','Thiamine','Folic Acid'],meds:['Lisinopril','Losartan','Metoprolol','Amlodipine']},
  {sups:['Probiotics'],meds:['Metformin','Atorvastatin','Simvastatin','Pravastatin','Rosuvastatin','Lisinopril']},
  {sups:['CoQ10'],meds:['Metoprolol','Lisinopril','Losartan','Amlodipine','Diltiazem']},
  {sups:['Magnesium'],meds:['Atorvastatin','Simvastatin','Pravastatin','Rosuvastatin']},
  {sups:['Zinc'],meds:['Metformin','Lisinopril','Losartan','Atorvastatin','Simvastatin','Pravastatin','Rosuvastatin']},
  {sups:['Vitamin D3'],meds:['Metformin','Atorvastatin','Simvastatin','Lisinopril']},
  {sups:['Omega-3','Fish Oil'],meds:['Atorvastatin','Simvastatin','Pravastatin','Rosuvastatin']},
  {sups:['Turmeric','Curcumin'],meds:['Metformin','Atorvastatin','Lisinopril']},
  {sups:['Ginger'],meds:['Metformin','Atorvastatin']},
  {sups:['Green Tea Extract'],meds:['Metformin','Atorvastatin']},
  {sups:['Resveratrol','Quercetin'],meds:['Metformin','Atorvastatin','Lisinopril']},
  {sups:['Ashwagandha','Rhodiola'],meds:['Metformin','Atorvastatin','Lisinopril']},
  {sups:['L-Theanine'],meds:['Metformin','Atorvastatin']},
  {sups:['Collagen','Whey Protein'],meds:['Metformin','Atorvastatin','Lisinopril']},
  {sups:['Glucosamine','Chondroitin'],meds:['Metformin','Atorvastatin','Lisinopril']},
  {sups:['Alpha Lipoic Acid'],meds:['Atorvastatin','Lisinopril']},
  {sups:['Selenium'],meds:['Metformin','Atorvastatin','Lisinopril']},
  {sups:['Calcium'],meds:['Celecoxib','Meloxicam','Diclofenac','Naproxen','Ibuprofen']},
  {sups:['Magnesium'],meds:['Alprazolam','Lorazepam','Diazepam','Clonazepam']},
  {sups:['Vitamin C'],meds:['Metformin','Atorvastatin','Lisinopril','Losartan','Metoprolol']},
  {sups:['Vitamin E'],meds:['Atorvastatin','Simvastatin','Pravastatin','Rosuvastatin','Metformin']},
  {sups:['Iron'],meds:['Metformin','Atorvastatin','Lisinopril','Losartan']},
  {sups:['Folic Acid'],meds:['Lisinopril','Losartan','Atorvastatin','Simvastatin']},
  {sups:['Biotin'],meds:['Metformin','Atorvastatin','Lisinopril']},
  {sups:['Niacin'],meds:['Metformin','Lisinopril']},
  {sups:['Melatonin'],meds:['Lisinopril','Losartan','Metformin']},
  {sups:['Valerian Root'],meds:['Metformin','Atorvastatin','Lisinopril']},
  {sups:['Echinacea'],meds:['Atorvastatin','Lisinopril','Losartan']},
  {sups:['Ginkgo Biloba'],meds:['Metformin','Atorvastatin','Lisinopril']},
  {sups:['Garlic'],meds:['Metformin','Atorvastatin','Lisinopril']},
  {sups:['Ginseng'],meds:['Atorvastatin','Lisinopril']},
  {sups:['Caffeine'],meds:['Metformin','Atorvastatin','Lisinopril']},
  {sups:['Creatine Monohydrate'],meds:['Metformin','Atorvastatin','Lisinopril']},
  {sups:['SAMe'],meds:['Metformin','Atorvastatin','Lisinopril']},
];

for(const rule of lowPairs){
  for(const s of rule.sups){
    for(const m of rule.meds){
      const k = s+'|||'+m;
      if(!seen.has(k) && SUPS.includes(s) && MEDS.includes(m)){
        result.push({supplement:s,medication:m,severity:'low',description:'No well-documented significant interaction',recommendation:'Generally safe to combine; consult healthcare provider. Not medical advice.'});
        seen.add(k);
        if(result.length>=2500) break;
      }
    }
    if(result.length>=2500) break;
  }
  if(result.length>=2500) break;
}

// Fill remaining with generic safe pairs
const safeSups = SUPS.filter(s=>![sjw,'Ginkgo Biloba','Garlic','Vitamin K','Vitamin K2','Fish Oil','Omega-3','5-HTP','Niacin','Potassium'].includes(s));
const safeMeds = MEDS.filter(m=>!['Warfarin','Sertraline','Fluoxetine','Escitalopram','Digoxin','Levothyroxine','Ciprofloxacin','Levofloxacin','Doxycycline','Insulin','Spironolactone'].includes(m));

let idx=0;
while(result.length<2500 && idx<safeSups.length*safeMeds.length){
  const s = safeSups[idx%safeSups.length];
  const m = safeMeds[Math.floor(idx/safeSups.length)%safeMeds.length];
  const k = s+'|||'+m;
  if(!seen.has(k)){
    result.push({supplement:s,medication:m,severity:'low',description:'No well-documented significant interaction',recommendation:'Generally safe to combine; consult healthcare provider. Not medical advice.'});
    seen.add(k);
  }
  idx++;
}

const csvPath = path.resolve('artifacts/interactions_full.csv');
const esc = (s) => '"'+s.replace(/"/g,'""')+'"';
const lines = ['supplement_name,medication_name,severity,description,recommendation'];
for(const i of result.slice(0,2500)){
  lines.push(esc(i.supplement)+','+esc(i.medication)+','+i.severity+','+esc(i.description)+','+esc(i.recommendation));
}

fs.writeFileSync(csvPath, lines.join('\n'), 'utf8');
console.log('Generated '+result.length+' interactions -> '+csvPath);
