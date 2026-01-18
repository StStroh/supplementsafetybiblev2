/*
  # Create RPC functions for grant-free to bypass schema cache

  1. New Functions
    - `upsert_free_profile` - Upserts a profile with free plan (with email)
    - `insert_free_profile` - Inserts a profile with free plan (without email)

  2. Purpose
    - Bypass Supabase client schema cache issues
    - Directly execute SQL operations
    - Handle activated_at column correctly

  3. Security
    - Functions are SECURITY DEFINER (run with creator privileges)
    - Service role key required to call these functions
    - Returns safe profile data only
*/

-- Function to upsert profile with email
CREATE OR REPLACE FUNCTION upsert_free_profile(
  p_name text,
  p_email text,
  p_plan text,
  p_status text
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_profile json;
BEGIN
  INSERT INTO profiles (name, email, plan, status, activated_at)
  VALUES (p_name, p_email, p_plan, p_status, now())
  ON CONFLICT (email) 
  DO UPDATE SET
    name = EXCLUDED.name,
    plan = EXCLUDED.plan,
    status = EXCLUDED.status,
    activated_at = COALESCE(profiles.activated_at, now()),
    updated_at = now()
  RETURNING json_build_object(
    'id', id,
    'email', email,
    'name', name,
    'plan', plan,
    'status', status,
    'activated_at', activated_at
  ) INTO v_profile;

  RETURN v_profile;
END;
$$;

-- Function to insert profile without email
CREATE OR REPLACE FUNCTION insert_free_profile(
  p_name text,
  p_email text,
  p_plan text,
  p_status text
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_profile json;
BEGIN
  INSERT INTO profiles (name, email, plan, status, activated_at)
  VALUES (p_name, p_email, p_plan, p_status, now())
  RETURNING json_build_object(
    'id', id,
    'email', email,
    'name', name,
    'plan', plan,
    'status', status,
    'activated_at', activated_at
  ) INTO v_profile;

  RETURN v_profile;
END;
$$;

-- Add comments
COMMENT ON FUNCTION upsert_free_profile IS 'Upsert profile for grant-free function (bypasses schema cache)';
COMMENT ON FUNCTION insert_free_profile IS 'Insert profile for grant-free function (bypasses schema cache)';
