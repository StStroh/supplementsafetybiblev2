/*
  # Interaction Checker Helper Functions

  1. Functions
    - `normalize_name(text)` - Normalize supplement/medication names
    - `upsert_supplement(text)` - Insert or get supplement by normalized name
    - `upsert_medication(text)` - Insert or get medication by normalized name

  2. Normalization Rules
    - Lowercase
    - Trim whitespace
    - Collapse multiple spaces to single space
    - Remove accents/diacritics
*/

-- Normalize name helper
CREATE OR REPLACE FUNCTION normalize_name(input_name text)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  RETURN lower(
    trim(
      regexp_replace(
        unaccent(input_name),
        '\s+', ' ', 'g'
      )
    )
  );
END;
$$;

-- Upsert supplement (returns UUID)
CREATE OR REPLACE FUNCTION upsert_supplement(supp_name text)
RETURNS uuid
LANGUAGE plpgsql
AS $$
DECLARE
  supp_id uuid;
  normalized text;
BEGIN
  normalized := normalize_name(supp_name);

  INSERT INTO supplements (name, name_norm)
  VALUES (supp_name, normalized)
  ON CONFLICT (name_norm) DO UPDATE
    SET name = EXCLUDED.name,
        updated_at = now()
  RETURNING id INTO supp_id;

  RETURN supp_id;
END;
$$;

-- Upsert medication (returns UUID)
CREATE OR REPLACE FUNCTION upsert_medication(med_name text)
RETURNS uuid
LANGUAGE plpgsql
AS $$
DECLARE
  med_id uuid;
  normalized text;
BEGIN
  normalized := normalize_name(med_name);

  INSERT INTO medications (name, name_norm)
  VALUES (med_name, normalized)
  ON CONFLICT (name_norm) DO UPDATE
    SET name = EXCLUDED.name,
        updated_at = now()
  RETURNING id INTO med_id;

  RETURN med_id;
END;
$$;

-- Enable unaccent extension for normalize_name
CREATE EXTENSION IF NOT EXISTS unaccent;
