-- Seed base supplements
-- Idempotent: uses ON CONFLICT DO NOTHING

insert into public.supplements (name)
values
('Vitamin C'),('Vitamin D3'),('Vitamin E'),('Vitamin K'),('Vitamin B12'),
('Magnesium'),('Zinc'),('Iron'),('Calcium'),('Potassium'),
('Creatine Monohydrate'),('Whey Protein'),('Fish Oil'),('Omega-3'),('CoQ10'),
('Turmeric'),('Curcumin'),('Ginger'),('Garlic'),('Echinacea'),
('Ginseng'),('Ashwagandha'),('Rhodiola'),('Valerian Root'),('Melatonin'),
('Probiotics'),('Prebiotics'),('Fiber'),('Collagen'),('Biotin'),
('Folic Acid'),('Niacin'),('Riboflavin'),('Thiamine'),('Selenium'),
('Chromium'),('Copper'),('Manganese'),('Molybdenum'),('Iodine'),
('Alpha Lipoic Acid'),('Resveratrol'),('Quercetin'),('Green Tea Extract'),('Caffeine'),
('L-Theanine'),('5-HTP'),('SAMe'),('Glucosamine'),('Chondroitin')
on conflict (name) do nothing;
