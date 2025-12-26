/*
  # Auto-create profiles for new users

  1. Changes
    - Creates a trigger function to automatically create profile records when users sign up
    - Applies trigger to auth.users table
    - Ensures every authenticated user has a corresponding profile
  
  2. Security
    - Maintains existing RLS policies
    - Only creates profiles for new auth.users inserts
*/

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    role,
    free_checks_count,
    trial_used
  )
  VALUES (
    NEW.id,
    NEW.email,
    'free',
    0,
    false
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Create trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Backfill: Create profiles for existing users who don't have one
INSERT INTO public.profiles (id, email, role, free_checks_count, trial_used)
SELECT 
  au.id,
  au.email,
  'free',
  0,
  false
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;
