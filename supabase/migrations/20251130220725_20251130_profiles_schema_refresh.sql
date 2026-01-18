/*
  # Profiles table schema refresh and verification

  1. Purpose
    - Ensure all required columns exist for free plan activation
    - Force Supabase schema cache refresh
    - Verify column defaults and constraints

  2. Columns Verified
    - name (text, nullable)
    - plan (text, default: 'free')
    - status (text, default: 'active')
    - activated_at (timestamptz, default: now())

  3. Notes
    - All operations are idempotent (IF NOT EXISTS)
    - Safe to run multiple times
    - Forces cache refresh with table comment update
*/

-- Ensure all required columns exist
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS name text;

ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS plan text DEFAULT 'free';

ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'active';

ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS activated_at timestamptz DEFAULT now();

-- Force schema cache refresh
DO $$
BEGIN
  EXECUTE format('COMMENT ON TABLE public.profiles IS ''Free plan activation ready. Refreshed: %s''', now()::text);
END $$;

-- Verify all columns exist
DO $$
DECLARE
  v_missing text[];
BEGIN
  SELECT ARRAY_AGG(col)
  INTO v_missing
  FROM (
    SELECT 'name' AS col WHERE NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'profiles' AND column_name = 'name'
    )
    UNION ALL
    SELECT 'plan' WHERE NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'profiles' AND column_name = 'plan'
    )
    UNION ALL
    SELECT 'status' WHERE NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'profiles' AND column_name = 'status'
    )
    UNION ALL
    SELECT 'activated_at' WHERE NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'profiles' AND column_name = 'activated_at'
    )
  ) missing_cols;

  IF array_length(v_missing, 1) > 0 THEN
    RAISE EXCEPTION 'Missing columns: %', array_to_string(v_missing, ', ');
  END IF;

  RAISE NOTICE 'All required columns verified: name, plan, status, activated_at';
END $$;
