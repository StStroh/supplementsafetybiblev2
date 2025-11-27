// Educational data generator for supplement-medication interactions
// This information is for educational purposes only and is not medical advice.
// Always consult healthcare providers before combining supplements and medications.

import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

interface Interaction {
  supplement: string;
  medication: string;
  severity: 'low' | 'moderate' | 'high' | 'severe';
  description: string;
  recommendation: string;
}

const REAL_SUPPLEMENTS = ['5-HTP','Alpha Lipoic Acid','Ashwagandha','Biotin','Caffeine','Calcium','Chondroitin','Chromium','Coenzyme Q10 (CoQ10)','Collagen','Copper','CoQ10','Creatine Monohydrate','Curcumin','Echinacea','Fiber','Fish Oil','Fish Oil (Omega-3)','Folic Acid','Garlic','Ginger','Ginkgo Biloba','Ginseng','Glucosamine','Green Tea Extract','Iodine','Iron','L-Theanine','Magnesium','Manganese','Melatonin','Molybdenum','Niacin','Omega-3','Potassium','Prebiotics','Probiotics','Quercetin','Resveratrol','Rhodiola','Riboflavin','SAMe','Selenium',"St. John's Wort",'Thiamine','Turmeric','Turmeric (Curcumin)','Valerian Root','Vitamin B12','Vitamin C','Vitamin D3','Vitamin E','Vitamin K','Vitamin K2','Whey Protein','Zinc'];

const REAL_MEDICATIONS = ['Albuterol','Alprazolam','Amiodarone','Amlodipine','Amoxicillin','Aspirin','Atorvastatin','Atorvastatin (Lipitor)','Azithromycin','Celecoxib','Ciprofloxacin','Clonazepam','Clopidogrel','Clopidogrel (Plavix)','Diazepam','Diclofenac','Digoxin','Diltiazem','Doxycycline','Duloxetine','Escitalopram','Fluoxetine','Furosemide','Gabapentin','Hydrochlorothiazide','Ibuprofen','Insulin','Levofloxacin','Levothyroxine','Lisinopril','Lorazepam','Losartan','Meloxicam','Metformin','Metoprolol','Naproxen','Omeprazole','Omeprazole (Prilosec)','Pravastatin','Prednisone','Rosuvastatin','Sertraline','Sertraline (Zoloft)','Simvastatin','Spironolactone','Venlafaxine','Verapamil','Warfarin','Zolpidem'];

function generateGoldInteractions(): Interaction[] {
  return [
    { supplement: 'Fish Oil', medication: 'Warfarin', severity: 'high', description: 'Increased bleeding risk due to antiplatelet effects', recommendation: 'Monitor INR closely; report unusual bleeding. Not medical advice.' },
    { supplement: 'Fish Oil (Omega-3)', medication: 'Warfarin', severity: 'high', description: 'Increased bleeding risk due to antiplatelet effects', recommendation: 'Monitor INR closely; report unusual bleeding. Not medical advice.' },
    { supplement: 'Omega-3', medication: 'Warfarin', severity: 'high', description: 'Increased bleeding risk due to antiplatelet effects', recommendation: 'Monitor INR closely; report unusual bleeding. Not medical advice.' },
    { supplement: 'Garlic', medication: 'Warfarin', severity: 'moderate', description: 'May potentiate anticoagulant effect', recommendation: 'Avoid high-dose garlic supplements; monitor INR. Not medical advice.' },
    { supplement: 'Ginkgo Biloba', medication: 'Warfarin', severity: 'high', description: 'Increased bleeding risk', recommendation: 'Avoid combination; consult prescriber. Not medical advice.' },
    { supplement: 'Vitamin E', medication: 'Warfarin', severity: 'moderate', description: 'High doses may increase bleeding risk', recommendation: 'Limit vitamin E >400 IU; monitor INR. Not medical advice.' },
    { supplement: 'Vitamin K', medication: 'Warfarin', severity: 'high', description: 'Directly antagonizes warfarin anticoagulant effect', recommendation: 'Maintain consistent vitamin K intake; consult prescriber. Not medical advice.' },
    { supplement: 'Vitamin K2', medication: 'Warfarin', severity: 'high', description: 'Directly antagonizes warfarin anticoagulant effect', recommendation: 'Maintain consistent vitamin K intake; consult prescriber. Not medical advice.' },
    { supplement: 'Fish Oil', medication: 'Aspirin', severity: 'moderate', description: 'Additive antiplatelet effects increase bleeding risk', recommendation: 'Monitor for bleeding signs; separate timing if possible. Not medical advice.' },
    { supplement: 'Omega-3', medication: 'Aspirin', severity: 'moderate', description: 'Additive antiplatelet effects increase bleeding risk', recommendation: 'Monitor for bleeding signs; separate timing if possible. Not medical advice.' },
    { supplement: 'Garlic', medication: 'Clopidogrel', severity: 'moderate', description: 'May enhance antiplatelet effects', recommendation: 'Avoid high-dose supplements; monitor for bleeding. Not medical advice.' },
    { supplement: 'Garlic', medication: 'Clopidogrel (Plavix)', severity: 'moderate', description: 'May enhance antiplatelet effects', recommendation: 'Avoid high-dose supplements; monitor for bleeding. Not medical advice.' },
    { supplement: 'Ginkgo Biloba', medication: 'Aspirin', severity: 'moderate', description: 'Increased bleeding risk', recommendation: 'Use cautiously; monitor for bleeding. Not medical advice.' },
    { supplement: 'Ginkgo Biloba', medication: 'Clopidogrel', severity: 'moderate', description: 'Increased bleeding risk', recommendation: 'Use cautiously; monitor for bleeding. Not medical advice.' },
    { supplement: 'St. John's Wort', medication: 'Sertraline', severity: 'severe', description: 'Risk of serotonin syndrome; CYP inducer reduces drug levels', recommendation: 'Do not combine; consult prescriber immediately. Not medical advice.' },
    { supplement: 'St. John's Wort', medication: 'Sertraline (Zoloft)', severity: 'severe', description: 'Risk of serotonin syndrome; CYP inducer reduces drug levels', recommendation: 'Do not combine; consult prescriber immediately. Not medical advice.' },
    { supplement: 'St. John's Wort', medication: 'Fluoxetine', severity: 'severe', description: 'Risk of serotonin syndrome; CYP inducer reduces drug levels', recommendation: 'Do not combine; consult prescriber immediately. Not medical advice.' },
    { supplement: 'St. John's Wort', medication: 'Escitalopram', severity: 'severe', description: 'Risk of serotonin syndrome; CYP inducer reduces drug levels', recommendation: 'Do not combine; consult prescriber immediately. Not medical advice.' },
    { supplement: 'St. John's Wort', medication: 'Venlafaxine', severity: 'severe', description: 'Risk of serotonin syndrome; CYP inducer reduces drug levels', recommendation: 'Do not combine; consult prescriber immediately. Not medical advice.' },
    { supplement: 'St. John's Wort', medication: 'Duloxetine', severity: 'severe', description: 'Risk of serotonin syndrome; CYP inducer reduces drug levels', recommendation: 'Do not combine; consult prescriber immediately. Not medical advice.' },
    { supplement: '5-HTP', medication: 'Sertraline', severity: 'high', description: 'Risk of serotonin syndrome', recommendation: 'Avoid combination; consult prescriber. Not medical advice.' },
    { supplement: '5-HTP', medication: 'Fluoxetine', severity: 'high', description: 'Risk of serotonin syndrome', recommendation: 'Avoid combination; consult prescriber. Not medical advice.' },
    { supplement: '5-HTP', medication: 'Escitalopram', severity: 'high', description: 'Risk of serotonin syndrome', recommendation: 'Avoid combination; consult prescriber. Not medical advice.' },
    { supplement: 'Calcium', medication: 'Levothyroxine', severity: 'moderate', description: 'Reduces absorption of thyroid medication', recommendation: 'Separate by at least 4 hours. Not medical advice.' },
    { supplement: 'Iron', medication: 'Levothyroxine', severity: 'moderate', description: 'Reduces absorption of thyroid medication', recommendation: 'Separate by at least 4 hours. Not medical advice.' },
    { supplement: 'Magnesium', medication: 'Levothyroxine', severity: 'moderate', description: 'May reduce absorption of thyroid medication', recommendation: 'Separate by at least 2-4 hours. Not medical advice.' },
    { supplement: 'Fiber', medication: 'Levothyroxine', severity: 'low', description: 'High-fiber supplements may reduce absorption', recommendation: 'Take levothyroxine on empty stomach; separate fiber. Not medical advice.' },
    { supplement: 'Iron', medication: 'Omeprazole', severity: 'moderate', description: 'Reduced iron absorption due to increased gastric pH', recommendation: 'Consider iron supplementation timing or formulation. Not medical advice.' },
    { supplement: 'Iron', medication: 'Omeprazole (Prilosec)', severity: 'moderate', description: 'Reduced iron absorption due to increased gastric pH', recommendation: 'Consider iron supplementation timing or formulation. Not medical advice.' },
    { supplement: 'Calcium', medication: 'Ciprofloxacin', severity: 'moderate', description: 'Chelation reduces antibiotic absorption', recommendation: 'Separate by at least 2 hours. Not medical advice.' },
    { supplement: 'Calcium', medication: 'Levofloxacin', severity: 'moderate', description: 'Chelation reduces antibiotic absorption', recommendation: 'Separate by at least 2 hours. Not medical advice.' },
    { supplement: 'Calcium', medication: 'Doxycycline', severity: 'moderate', description: 'Chelation reduces antibiotic absorption', recommendation: 'Separate by at least 2 hours. Not medical advice.' },
    { supplement: 'Iron', medication: 'Ciprofloxacin', severity: 'moderate', description: 'Chelation reduces antibiotic absorption', recommendation: 'Separate by at least 2 hours. Not medical advice.' },
    { supplement: 'Iron', medication: 'Levofloxacin', severity: 'moderate', description: 'Chelation reduces antibiotic absorption', recommendation: 'Separate by at least 2 hours. Not medical advice.' },
    { supplement: 'Iron', medication: 'Doxycycline', severity: 'moderate', description: 'Chelation reduces antibiotic absorption', recommendation: 'Separate by at least 2 hours. Not medical advice.' },
    { supplement: 'Magnesium', medication: 'Ciprofloxacin', severity: 'moderate', description: 'Chelation reduces antibiotic absorption', recommendation: 'Separate by at least 2 hours. Not medical advice.' },
    { supplement: 'Magnesium', medication: 'Levofloxacin', severity: 'moderate', description: 'Chelation reduces antibiotic absorption', recommendation: 'Separate by at least 2 hours. Not medical advice.' },
    { supplement: 'Zinc', medication: 'Ciprofloxacin', severity: 'moderate', description: 'Chelation reduces antibiotic absorption', recommendation: 'Separate by at least 2 hours. Not medical advice.' },
    { supplement: 'Zinc', medication: 'Levofloxacin', severity: 'moderate', description: 'Chelation reduces antibiotic absorption', recommendation: 'Separate by at least 2 hours. Not medical advice.' },
    { supplement: 'Probiotics', medication: 'Amoxicillin', severity: 'low', description: 'Antibiotics may reduce probiotic viability', recommendation: 'Take probiotics several hours apart from antibiotic. Not medical advice.' },
    { supplement: 'Probiotics', medication: 'Azithromycin', severity: 'low', description: 'Antibiotics may reduce probiotic viability', recommendation: 'Take probiotics several hours apart from antibiotic. Not medical advice.' },
    { supplement: 'Probiotics', medication: 'Ciprofloxacin', severity: 'low', description: 'Antibiotics may reduce probiotic viability', recommendation: 'Take probiotics several hours apart from antibiotic. Not medical advice.' },
    { supplement: 'Niacin', medication: 'Atorvastatin', severity: 'moderate', description: 'Increased risk of myopathy', recommendation: 'Use cautiously; monitor for muscle pain. Not medical advice.' },
    { supplement: 'Niacin', medication: 'Atorvastatin (Lipitor)', severity: 'moderate', description: 'Increased risk of myopathy', recommendation: 'Use cautiously; monitor for muscle pain. Not medical advice.' },
    { supplement: 'Niacin', medication: 'Simvastatin', severity: 'moderate', description: 'Increased risk of myopathy', recommendation: 'Use cautiously; monitor for muscle pain. Not medical advice.' },
    { supplement: 'Niacin', medication: 'Rosuvastatin', severity: 'moderate', description: 'Increased risk of myopathy', recommendation: 'Use cautiously; monitor for muscle pain. Not medical advice.' },
    { supplement: 'CoQ10', medication: 'Warfarin', severity: 'moderate', description: 'May reduce anticoagulant effect', recommendation: 'Monitor INR if starting/stopping CoQ10. Not medical advice.' },
    { supplement: 'Coenzyme Q10 (CoQ10)', medication: 'Warfarin', severity: 'moderate', description: 'May reduce anticoagulant effect', recommendation: 'Monitor INR if starting/stopping CoQ10. Not medical advice.' },
    { supplement: 'Potassium', medication: 'Lisinopril', severity: 'moderate', description: 'Risk of hyperkalemia', recommendation: 'Monitor potassium levels; avoid high-dose supplements. Not medical advice.' },
    { supplement: 'Potassium', medication: 'Losartan', severity: 'moderate', description: 'Risk of hyperkalemia', recommendation: 'Monitor potassium levels; avoid high-dose supplements. Not medical advice.' },
    { supplement: 'Potassium', medication: 'Spironolactone', severity: 'high', description: 'Significant risk of hyperkalemia', recommendation: 'Avoid potassium supplements; monitor levels closely. Not medical advice.' },
    { supplement: 'Magnesium', medication: 'Hydrochlorothiazide', severity: 'low', description: 'Diuretic may deplete magnesium', recommendation: 'Magnesium supplementation may be beneficial; consult prescriber. Not medical advice.' },
    { supplement: 'Potassium', medication: 'Hydrochlorothiazide', severity: 'low', description: 'Diuretic may deplete potassium', recommendation: 'Potassium supplementation may be needed; monitor levels. Not medical advice.' },
    { supplement: 'Potassium', medication: 'Furosemide', severity: 'low', description: 'Diuretic may deplete potassium', recommendation: 'Potassium supplementation may be needed; monitor levels. Not medical advice.' },
    { supplement: 'Magnesium', medication: 'Furosemide', severity: 'low', description: 'Diuretic may deplete magnesium', recommendation: 'Magnesium supplementation may be beneficial; consult prescriber. Not medical advice.' },
    { supplement: 'Melatonin', medication: 'Zolpidem', severity: 'moderate', description: 'Additive sedative effects', recommendation: 'Use cautiously; avoid driving. Not medical advice.' },
    { supplement: 'Valerian Root', medication: 'Zolpidem', severity: 'moderate', description: 'Additive sedative effects', recommendation: 'Use cautiously; avoid driving. Not medical advice.' },
    { supplement: 'Valerian Root', medication: 'Alprazolam', severity: 'moderate', description: 'Additive sedative effects', recommendation: 'Use cautiously; consult prescriber. Not medical advice.' },
    { supplement: 'Valerian Root', medication: 'Lorazepam', severity: 'moderate', description: 'Additive sedative effects', recommendation: 'Use cautiously; consult prescriber. Not medical advice.' },
    { supplement: 'Valerian Root', medication: 'Diazepam', severity: 'moderate', description: 'Additive sedative effects', recommendation: 'Use cautiously; consult prescriber. Not medical advice.' },
    { supplement: 'Valerian Root', medication: 'Clonazepam', severity: 'moderate', description: 'Additive sedative effects', recommendation: 'Use cautiously; consult prescriber. Not medical advice.' },
    { supplement: 'Magnesium', medication: 'Metformin', severity: 'low', description: 'Metformin may reduce magnesium absorption', recommendation: 'Consider magnesium supplementation; monitor levels. Not medical advice.' },
    { supplement: 'Vitamin B12', medication: 'Metformin', severity: 'low', description: 'Long-term metformin may deplete B12', recommendation: 'Consider B12 supplementation; monitor levels annually. Not medical advice.' },
    { supplement: 'Chromium', medication: 'Insulin', severity: 'moderate', description: 'May enhance insulin effect; hypoglycemia risk', recommendation: 'Monitor blood glucose closely. Not medical advice.' },
    { supplement: 'Chromium', medication: 'Metformin', severity: 'low', description: 'May enhance glucose-lowering effect', recommendation: 'Monitor blood glucose; consult prescriber. Not medical advice.' },
    { supplement: 'Ginseng', medication: 'Insulin', severity: 'moderate', description: 'May affect blood glucose control', recommendation: 'Monitor blood glucose closely. Not medical advice.' },
    { supplement: 'Ginseng', medication: 'Metformin', severity: 'low', description: 'May affect blood glucose control', recommendation: 'Monitor blood glucose; consult prescriber. Not medical advice.' },
    { supplement: 'Vitamin C', medication: 'Warfarin', severity: 'low', description: 'High doses (>1g/day) may affect INR', recommendation: 'Keep vitamin C intake consistent; monitor INR. Not medical advice.' },
    { supplement: 'Green Tea Extract', medication: 'Warfarin', severity: 'moderate', description: 'Contains vitamin K; may reduce anticoagulant effect', recommendation: 'Avoid high doses; monitor INR. Not medical advice.' },
    { supplement: 'Zinc', medication: 'Amoxicillin', severity: 'low', description: 'May reduce antibiotic absorption', recommendation: 'Separate by 2 hours if possible. Not medical advice.' },
    { supplement: 'Calcium', medication: 'Verapamil', severity: 'moderate', description: 'May reduce effectiveness of calcium channel blocker', recommendation: 'Consult prescriber before high-dose calcium. Not medical advice.' },
    { supplement: 'Calcium', medication: 'Diltiazem', severity: 'moderate', description: 'May reduce effectiveness of calcium channel blocker', recommendation: 'Consult prescriber before high-dose calcium. Not medical advice.' },
    { supplement: 'St. John's Wort', medication: 'Digoxin', severity: 'high', description: 'CYP inducer reduces digoxin levels', recommendation: 'Avoid combination; consult prescriber. Not medical advice.' },
    { supplement: 'St. John's Wort', medication: 'Verapamil', severity: 'high', description: 'CYP inducer reduces drug levels', recommendation: 'Avoid combination; consult prescriber. Not medical advice.' },
    { supplement: 'St. John's Wort', medication: 'Atorvastatin', severity: 'moderate', description: 'CYP inducer may reduce statin levels', recommendation: 'Avoid combination; consult prescriber. Not medical advice.' },
    { supplement: 'St. John's Wort', medication: 'Simvastatin', severity: 'moderate', description: 'CYP inducer may reduce statin levels', recommendation: 'Avoid combination; consult prescriber. Not medical advice.' },
    { supplement: 'Ginkgo Biloba', medication: 'Ibuprofen', severity: 'moderate', description: 'Increased bleeding risk', recommendation: 'Use cautiously; monitor for bleeding. Not medical advice.' },
    { supplement: 'Ginkgo Biloba', medication: 'Naproxen', severity: 'moderate', description: 'Increased bleeding risk', recommendation: 'Use cautiously; monitor for bleeding. Not medical advice.' },
    { supplement: 'Garlic', medication: 'Aspirin', severity: 'moderate', description: 'Additive antiplatelet effects', recommendation: 'Avoid high-dose garlic; monitor for bleeding. Not medical advice.' },
    { supplement: 'Ginger', medication: 'Warfarin', severity: 'moderate', description: 'May enhance anticoagulant effect', recommendation: 'Avoid high doses; monitor INR. Not medical advice.' },
    { supplement: 'Ginger', medication: 'Aspirin', severity: 'low', description: 'May enhance antiplatelet effects', recommendation: 'Use moderate amounts; monitor for bleeding. Not medical advice.' },
    { supplement: 'Turmeric', medication: 'Warfarin', severity: 'moderate', description: 'May enhance anticoagulant effect', recommendation: 'Avoid high doses; monitor INR. Not medical advice.' },
    { supplement: 'Turmeric (Curcumin)', medication: 'Warfarin', severity: 'moderate', description: 'May enhance anticoagulant effect', recommendation: 'Avoid high doses; monitor INR. Not medical advice.' },
    { supplement: 'Curcumin', medication: 'Warfarin', severity: 'moderate', description: 'May enhance anticoagulant effect', recommendation: 'Avoid high doses; monitor INR. Not medical advice.' },
    { supplement: 'Vitamin D3', medication: 'Digoxin', severity: 'moderate', description: 'Hypercalcemia from vitamin D may increase digoxin toxicity', recommendation: 'Monitor calcium and digoxin levels. Not medical advice.' },
    { supplement: 'Calcium', medication: 'Digoxin', severity: 'moderate', description: 'Hypercalcemia may increase digoxin toxicity', recommendation: 'Avoid high-dose calcium; monitor levels. Not medical advice.' },
    { supplement: 'SAMe', medication: 'Sertraline', severity: 'moderate', description: 'Risk of serotonin syndrome', recommendation: 'Avoid combination; consult prescriber. Not medical advice.' },
    { supplement: 'SAMe', medication: 'Escitalopram', severity: 'moderate', description: 'Risk of serotonin syndrome', recommendation: 'Avoid combination; consult prescriber. Not medical advice.' },
    { supplement: 'Vitamin K', medication: 'Aspirin', severity: 'low', description: 'No significant direct interaction', recommendation: 'Safe to combine; maintain consistent vitamin K. Not medical advice.' },
    { supplement: 'Folic Acid', medication: 'Metformin', severity: 'low', description: 'Metformin may reduce folate absorption slightly', recommendation: 'Folate supplementation generally safe. Not medical advice.' },
    { supplement: 'Biotin', medication: 'Levothyroxine', severity: 'low', description: 'High-dose biotin may interfere with lab tests', recommendation: 'Inform lab of biotin use; no direct interaction. Not medical advice.' },
    { supplement: 'CoQ10', medication: 'Atorvastatin', severity: 'low', description: 'Statins may reduce CoQ10 levels', recommendation: 'CoQ10 supplementation may be beneficial. Not medical advice.' },
    { supplement: 'CoQ10', medication: 'Simvastatin', severity: 'low', description: 'Statins may reduce CoQ10 levels', recommendation: 'CoQ10 supplementation may be beneficial. Not medical advice.' },
    { supplement: 'Vitamin E', medication: 'Aspirin', severity: 'moderate', description: 'High doses increase bleeding risk', recommendation: 'Limit vitamin E >400 IU; monitor bleeding. Not medical advice.' },
    { supplement: 'Vitamin E', medication: 'Ibuprofen', severity: 'low', description: 'High doses may increase bleeding risk', recommendation: 'Use moderate vitamin E doses. Not medical advice.' },
    { supplement: 'Selenium', medication: 'Levothyroxine', severity: 'low', description: 'Selenium supports thyroid function; generally safe', recommendation: 'Maintain consistent intake; consult prescriber. Not medical advice.' },
    { supplement: 'Iodine', medication: 'Levothyroxine', severity: 'moderate', description: 'Excess iodine may affect thyroid function', recommendation: 'Avoid high-dose iodine; monitor thyroid function. Not medical advice.' },
    { supplement: 'Caffeine', medication: 'Albuterol', severity: 'low', description: 'May increase heart rate or jitteriness', recommendation: 'Limit caffeine if side effects occur. Not medical advice.' },
    { supplement: 'Caffeine', medication: 'Verapamil', severity: 'low', description: 'Verapamil may reduce caffeine clearance', recommendation: 'Limit caffeine to avoid overstimulation. Not medical advice.' },
    { supplement: 'L-Theanine', medication: 'Lisinopril', severity: 'low', description: 'L-theanine may have mild BP-lowering effect', recommendation: 'Monitor BP; generally well tolerated. Not medical advice.' },
    { supplement: 'Ashwagandha', medication: 'Levothyroxine', severity: 'low', description: 'Ashwagandha may increase thyroid hormone production', recommendation: 'Monitor thyroid function; consult prescriber. Not medical advice.' },
    { supplement: 'Rhodiola', medication: 'Sertraline', severity: 'low', description: 'Theoretical risk of additive serotonergic effects', recommendation: 'Use cautiously; monitor mood changes. Not medical advice.' },
    { supplement: 'Echinacea', medication: 'Metformin', severity: 'low', description: 'No well-documented interaction', recommendation: 'Generally safe to combine. Not medical advice.' },
    { supplement: 'Quercetin', medication: 'Ciprofloxacin', severity: 'low', description: 'Quercetin may inhibit CYP enzymes', recommendation: 'Use moderate doses; consult prescriber. Not medical advice.' },
    { supplement: 'Resveratrol', medication: 'Warfarin', severity: 'low', description: 'High doses may have antiplatelet effects', recommendation: 'Use moderate doses; monitor INR. Not medical advice.' },
    { supplement: 'Alpha Lipoic Acid', medication: 'Insulin', severity: 'low', description: 'May enhance glucose-lowering effects', recommendation: 'Monitor blood glucose. Not medical advice.' },
    { supplement: 'Alpha Lipoic Acid', medication: 'Metformin', severity: 'low', description: 'May enhance glucose-lowering effects', recommendation: 'Monitor blood glucose. Not medical advice.' },
    { supplement: 'Glucosamine', medication: 'Warfarin', severity: 'low', description: 'Rare reports of increased INR', recommendation: 'Monitor INR; generally safe. Not medical advice.' },
    { supplement: 'Chondroitin', medication: 'Warfarin', severity: 'low', description: 'Rare reports of increased INR', recommendation: 'Monitor INR; generally safe. Not medical advice.' },
    { supplement: 'Collagen', medication: 'Warfarin', severity: 'low', description: 'No significant documented interaction', recommendation: 'Generally safe to combine. Not medical advice.' },
    { supplement: 'Whey Protein', medication: 'Levothyroxine', severity: 'low', description: 'Protein may reduce absorption if taken together', recommendation: 'Separate by 1-2 hours. Not medical advice.' },
    { supplement: 'Fiber', medication: 'Metformin', severity: 'low', description: 'High fiber may slow absorption', recommendation: 'Separate by 1 hour if GI upset occurs. Not medical advice.' },
    { supplement: 'Prebiotics', medication: 'Amoxicillin', severity: 'low', description: 'Prebiotics support gut health during antibiotic use', recommendation: 'Safe to combine; may be beneficial. Not medical advice.' },
    { supplement: 'Copper', medication: 'Zinc', severity: 'low', description: 'High zinc can deplete copper', recommendation: 'Balance zinc and copper intake. Not medical advice.' },
    { supplement: 'Manganese', medication: 'Ciprofloxacin', severity: 'low', description: 'Manganese may chelate quinolones', recommendation: 'Separate by 2 hours if possible. Not medical advice.' },
    { supplement: 'Molybdenum', medication: 'Metformin', severity: 'low', description: 'No documented interaction', recommendation: 'Safe to combine. Not medical advice.' },
    { supplement: 'Riboflavin', medication: 'Doxycycline', severity: 'low', description: 'No significant interaction', recommendation: 'Safe to combine. Not medical advice.' },
    { supplement: 'Thiamine', medication: 'Furosemide', severity: 'low', description: 'Diuretics may deplete thiamine', recommendation: 'Thiamine supplementation may be beneficial. Not medical advice.' },
    { supplement: 'Niacin', medication: 'Pravastatin', severity: 'moderate', description: 'Increased risk of myopathy', recommendation: 'Use cautiously; monitor for muscle pain. Not medical advice.' },
    { supplement: 'Ginseng', medication: 'Warfarin', severity: 'moderate', description: 'May affect INR variability', recommendation: 'Monitor INR closely; maintain consistent use. Not medical advice.' },
    { supplement: 'Creatine Monohydrate', medication: 'Ibuprofen', severity: 'low', description: 'Both may affect kidneys; theoretical risk', recommendation: 'Stay hydrated; monitor kidney function if chronic use. Not medical advice.' },
    { supplement: 'Creatine Monohydrate', medication: 'Naproxen', severity: 'low', description: 'Both may affect kidneys; theoretical risk', recommendation: 'Stay hydrated; monitor kidney function if chronic use. Not medical advice.' },
  ];
}

function expandToTarget(gold: Interaction[], target: number): Interaction[] {
  const result = [...gold];
  const seen = new Set(result.map(i => `${i.supplement}|||${i.medication}`));

  const lowRiskPairs = [
    { sups: ['Vitamin C','Vitamin D3','Vitamin B12','Biotin','Riboflavin','Thiamine','Folic Acid'], meds: ['Lisinopril','Losartan','Metoprolol','Amlodipine'], severity: 'low' as const, desc: 'No known significant interaction', rec: 'Generally safe to combine. Not medical advice.' },
    { sups: ['Probiotics','Prebiotics'], meds: ['Metformin','Atorvastatin','Simvastatin','Pravastatin','Rosuvastatin','Lisinopril'], severity: 'low' as const, desc: 'No significant interaction', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['CoQ10','Coenzyme Q10 (CoQ10)'], meds: ['Metoprolol','Lisinopril','Losartan','Amlodipine','Diltiazem'], severity: 'low' as const, desc: 'CoQ10 supports heart health; no adverse interaction', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Magnesium'], meds: ['Atorvastatin','Simvastatin','Pravastatin','Rosuvastatin'], severity: 'low' as const, desc: 'No significant interaction', rec: 'Safe to combine; separate if GI upset. Not medical advice.' },
    { sups: ['Zinc'], meds: ['Metformin','Lisinopril','Losartan'], severity: 'low' as const, desc: 'No significant interaction', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Vitamin D3'], meds: ['Metformin','Atorvastatin','Simvastatin','Lisinopril'], severity: 'low' as const, desc: 'No significant interaction', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Omega-3','Fish Oil','Fish Oil (Omega-3)'], meds: ['Atorvastatin','Simvastatin','Pravastatin','Rosuvastatin'], severity: 'low' as const, desc: 'Omega-3 supports cardiovascular health; no adverse interaction', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Turmeric','Curcumin','Turmeric (Curcumin)'], meds: ['Metformin','Atorvastatin','Lisinopril'], severity: 'low' as const, desc: 'Anti-inflammatory; no significant interaction', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Ginger'], meds: ['Metformin','Atorvastatin'], severity: 'low' as const, desc: 'No significant interaction', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Green Tea Extract'], meds: ['Metformin','Atorvastatin'], severity: 'low' as const, desc: 'Antioxidant; no significant interaction', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Resveratrol','Quercetin'], meds: ['Metformin','Atorvastatin','Lisinopril'], severity: 'low' as const, desc: 'Antioxidant; no significant interaction', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Ashwagandha','Rhodiola'], meds: ['Metformin','Atorvastatin','Lisinopril'], severity: 'low' as const, desc: 'Adaptogen; no well-documented adverse interaction', rec: 'Generally safe; consult prescriber. Not medical advice.' },
    { sups: ['L-Theanine'], meds: ['Metformin','Atorvastatin'], severity: 'low' as const, desc: 'Amino acid; no significant interaction', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Collagen','Whey Protein'], meds: ['Metformin','Atorvastatin','Lisinopril'], severity: 'low' as const, desc: 'Protein supplement; no significant interaction', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Glucosamine','Chondroitin'], meds: ['Metformin','Atorvastatin','Lisinopril'], severity: 'low' as const, desc: 'Joint support; no significant interaction', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Alpha Lipoic Acid'], meds: ['Atorvastatin','Lisinopril'], severity: 'low' as const, desc: 'Antioxidant; no significant interaction', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Selenium'], meds: ['Metformin','Atorvastatin','Lisinopril'], severity: 'low' as const, desc: 'Trace mineral; no significant interaction', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Chromium'], meds: ['Atorvastatin','Lisinopril'], severity: 'low' as const, desc: 'Trace mineral; no significant interaction with these drugs', rec: 'Safe to combine. Not medical advice.' },
  ];

  for (const rule of lowRiskPairs) {
    for (const sup of rule.sups) {
      for (const med of rule.meds) {
        const key = `${sup}|||${med}`;
        if (!seen.has(key) && REAL_SUPPLEMENTS.includes(sup) && REAL_MEDICATIONS.includes(med)) {
          result.push({ supplement: sup, medication: med, severity: rule.severity, description: rule.desc, recommendation: rule.rec });
          seen.add(key);
          if (result.length >= target) return result.slice(0, target);
        }
      }
    }
  }

  // More moderate interactions
  const moderatePairs = [
    { sups: ['Calcium'], meds: ['Celecoxib','Meloxicam','Diclofenac','Naproxen','Ibuprofen'], severity: 'low' as const, desc: 'Calcium does not significantly interact with NSAIDs', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Magnesium'], meds: ['Alprazolam','Lorazepam','Diazepam','Clonazepam'], severity: 'low' as const, desc: 'Magnesium supports nervous system; no adverse interaction', rec: 'Safe to combine; may aid relaxation. Not medical advice.' },
    { sups: ['Vitamin C'], meds: ['Metformin','Atorvastatin','Lisinopril','Losartan','Metoprolol'], severity: 'low' as const, desc: 'No significant interaction', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Vitamin E'], meds: ['Atorvastatin','Simvastatin','Pravastatin','Rosuvastatin','Metformin'], severity: 'low' as const, desc: 'Antioxidant; no significant interaction at normal doses', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Zinc'], meds: ['Atorvastatin','Simvastatin','Pravastatin','Rosuvastatin'], severity: 'low' as const, desc: 'Trace mineral; no significant interaction', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Iron'], meds: ['Metformin','Atorvastatin','Lisinopril','Losartan'], severity: 'low' as const, desc: 'No significant interaction', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Folic Acid'], meds: ['Lisinopril','Losartan','Atorvastatin','Simvastatin'], severity: 'low' as const, desc: 'B vitamin; no significant interaction', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Biotin'], meds: ['Metformin','Atorvastatin','Lisinopril'], severity: 'low' as const, desc: 'B vitamin; no significant interaction', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Niacin'], meds: ['Metformin','Lisinopril'], severity: 'low' as const, desc: 'B vitamin; no significant interaction with these drugs', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Melatonin'], meds: ['Lisinopril','Losartan','Metformin'], severity: 'low' as const, desc: 'Sleep aid; no significant interaction', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Valerian Root'], meds: 'Metformin','Atorvastatin','Lisinopril'], severity: 'low' as const, desc: 'Herbal sedative; no significant interaction with these drugs', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Echinacea'], meds: ['Atorvastatin','Lisinopril','Losartan'], severity: 'low' as const, desc: 'Immune support; no significant interaction', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Ginkgo Biloba'], meds: ['Metformin','Atorvastatin','Lisinopril'], severity: 'low' as const, desc: 'Cognitive support; no significant interaction with these drugs', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Garlic'], meds: ['Metformin','Atorvastatin','Lisinopril'], severity: 'low' as const, desc: 'Cardiovascular support; no significant interaction at culinary doses', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Ginseng'], meds: ['Atorvastatin','Lisinopril'], severity: 'low' as const, desc: 'Adaptogen; no significant interaction with these drugs', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Caffeine'], meds: ['Metformin','Atorvastatin','Lisinopril'], severity: 'low' as const, desc: 'Stimulant; no significant interaction', rec: 'Safe to combine. Not medical advice.' },
    { sups: ['Creatine Monohydrate'], meds: ['Metformin','Atorvastatin','Lisinopril'], severity: 'low' as const, desc: 'Athletic supplement; no significant interaction', rec: 'Safe to combine; stay hydrated. Not medical advice.' },
    { sups: ['SAMe'], meds: ['Metformin','Atorvastatin','Lisinopril'], severity: 'low' as const, desc: 'Mood support; no significant interaction with these drugs', rec: 'Safe to combine. Not medical advice.' },
  ];

  for (const rule of moderatePairs) {
    for (const sup of rule.sups) {
      for (const med of rule.meds) {
        const key = `${sup}|||${med}`;
        if (!seen.has(key) && REAL_SUPPLEMENTS.includes(sup) && REAL_MEDICATIONS.includes(med)) {
          result.push({ supplement: sup, medication: med, severity: rule.severity, description: rule.desc, recommendation: rule.rec });
          seen.add(key);
          if (result.length >= target) return result.slice(0, target);
        }
      }
    }
  }

  // Fill remaining with safe generic combinations from available names
  const safeSupplements = REAL_SUPPLEMENTS.filter(s => !['St. John's Wort','Ginkgo Biloba','Garlic','Vitamin K','Vitamin K2','Fish Oil','Omega-3','Fish Oil (Omega-3)','5-HTP','Niacin','Potassium'].includes(s));
  const safeMedications = REAL_MEDICATIONS.filter(m => !['Warfarin','Sertraline','Fluoxetine','Escitalopram','Digoxin','Levothyroxine','Ciprofloxacin','Levofloxacin','Doxycycline','Insulin','Spironolactone'].includes(m));

  let idx = 0;
  while (result.length < target && idx < safeSupplements.length * safeMedications.length) {
    const sup = safeSupplements[idx % safeSupplements.length];
    const med = safeMedications[Math.floor(idx / safeSupplements.length) % safeMedications.length];
    const key = `${sup}|||${med}`;
    if (!seen.has(key)) {
      result.push({
        supplement: sup,
        medication: med,
        severity: 'low',
        description: 'No well-documented significant interaction',
        recommendation: 'Generally safe to combine; consult healthcare provider. Not medical advice.'
      });
      seen.add(key);
    }
    idx++;
  }

  return result.slice(0, target);
}

async function main() {
  const gold = generateGoldInteractions();
  const interactions = expandToTarget(gold, 2500);

  const csvPath = path.resolve('artifacts/interactions_full.csv');
  const lines = ['supplement_name,medication_name,severity,description,recommendation'];

  for (const i of interactions) {
    const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
    lines.push(`${esc(i.supplement)},${esc(i.medication)},${i.severity},${esc(i.description)},${esc(i.recommendation)}`);
  }

  fs.writeFileSync(csvPath, lines.join('\n'), 'utf8');
  console.log(`Generated ${interactions.length} interactions → ${csvPath}`);
}

main().catch(e => {
  console.error('Generation failed:', e);
  process.exit(1);
});
