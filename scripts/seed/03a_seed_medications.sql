-- Seed base medications
-- Idempotent: uses ON CONFLICT DO NOTHING

insert into public.medications (name)
values
('Warfarin'),('Aspirin'),('Metformin'),('Atorvastatin'),('Omeprazole'),
('Lisinopril'),('Amlodipine'),('Levothyroxine'),('Metoprolol'),('Losartan'),
('Albuterol'),('Gabapentin'),('Prednisone'),('Insulin'),('Clopidogrel'),
('Sertraline'),('Fluoxetine'),('Escitalopram'),('Duloxetine'),('Venlafaxine'),
('Alprazolam'),('Lorazepam'),('Diazepam'),('Zolpidem'),('Clonazepam'),
('Hydrochlorothiazide'),('Furosemide'),('Spironolactone'),('Digoxin'),('Amiodarone'),
('Diltiazem'),('Verapamil'),('Simvastatin'),('Rosuvastatin'),('Pravastatin'),
('Ibuprofen'),('Naproxen'),('Celecoxib'),('Meloxicam'),('Diclofenac'),
('Amoxicillin'),('Azithromycin'),('Ciprofloxacin'),('Doxycycline'),('Levofloxacin')
on conflict (name) do nothing;
