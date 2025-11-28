-- CLEANUP: remove any placeholders & empties (safe for re-run)
DELETE FROM interactions
WHERE supplement_key IN (SELECT lower(name) FROM supplements WHERE name ~* '^(supplement)\s+\d+$')
   OR medication_key  IN (SELECT lower(name) FROM medications  WHERE name ~* '^(medication)\s+\d+$');

DELETE FROM supplements WHERE name ~* '^(supplement)\s+\d+$' OR trim(name)='' OR name IS NULL;
DELETE FROM medications WHERE name ~* '^(medication)\s+\d+$' OR trim(name)='' OR name IS NULL;

-- QUALITY CONSTRAINTS (wrapped to be idempotent on re-runs)
DO $$ BEGIN
  ALTER TABLE supplements
    ADD CONSTRAINT supplements_no_placeholder CHECK (name !~* '^(supplement)\s+\d+$');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE medications
    ADD CONSTRAINT medications_no_placeholder CHECK (name !~* '^(medication)\s+\d+$');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE supplements
    ADD CONSTRAINT supplements_min_quality CHECK (length(trim(name)) >= 2 AND name !~ '^[0-9]+$');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE medications
    ADD CONSTRAINT medications_min_quality CHECK (length(trim(name)) >= 2 AND name !~ '^[0-9]+$');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- CASE-INSENSITIVE UNIQUENESS
CREATE UNIQUE INDEX IF NOT EXISTS uq_supp_name_ci ON supplements (lower(name));
CREATE UNIQUE INDEX IF NOT EXISTS uq_med_name_ci  ON medications (lower(name));

-- INTERACTIONS uniqueness + severity guard
CREATE UNIQUE INDEX IF NOT EXISTS uq_interactions_pair ON interactions (supplement_key, medication_key);

DO $$ BEGIN
  ALTER TABLE interactions
    ADD CONSTRAINT interactions_severity_chk CHECK (severity IN ('low','moderate','high','severe'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ENABLE RLS
ALTER TABLE supplements           ENABLE ROW LEVEL SECURITY;
ALTER TABLE medications           ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions          ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplement_synonyms   ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_synonyms   ENABLE ROW LEVEL SECURITY;

-- READ policies for anon (idempotent by name)
DO $$ BEGIN EXECUTE 'CREATE POLICY read_supp ON supplements FOR SELECT TO anon USING (true)'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN EXECUTE 'CREATE POLICY read_med ON medications FOR SELECT TO anon USING (true)'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN EXECUTE 'CREATE POLICY read_inter ON interactions FOR SELECT TO anon USING (true)'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN EXECUTE 'CREATE POLICY read_supp_syn ON supplement_synonyms FOR SELECT TO anon USING (true)'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN EXECUTE 'CREATE POLICY read_med_syn ON medication_synonyms FOR SELECT TO anon USING (true)'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- WRITE policies for service_role (idempotent by name)
DO $$ BEGIN EXECUTE 'CREATE POLICY write_supp ON supplements FOR ALL TO service_role USING (true) WITH CHECK (true)'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN EXECUTE 'CREATE POLICY write_med ON medications FOR ALL TO service_role USING (true) WITH CHECK (true)'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN EXECUTE 'CREATE POLICY write_inter ON interactions FOR ALL TO service_role USING (true) WITH CHECK (true)'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN EXECUTE 'CREATE POLICY write_supp_syn ON supplement_synonyms FOR ALL TO service_role USING (true) WITH CHECK (true)'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN EXECUTE 'CREATE POLICY write_med_syn ON medication_synonyms FOR ALL TO service_role USING (true) WITH CHECK (true)'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- FINAL SANITY
-- (no-op select to ensure script compiles fully)
SELECT 1;
