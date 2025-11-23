
-- Create temporary mapping tables for IDs
CREATE TEMP TABLE IF NOT EXISTS temp_supplement_map AS
SELECT name, id FROM supplements;

CREATE TEMP TABLE IF NOT EXISTS temp_medication_map AS
SELECT name, id FROM medications;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_temp_supp_name ON temp_supplement_map(name);
CREATE INDEX IF NOT EXISTS idx_temp_med_name ON temp_medication_map(name);
