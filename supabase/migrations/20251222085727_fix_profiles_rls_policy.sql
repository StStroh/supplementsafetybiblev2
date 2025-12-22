/*
  # Fix Profiles RLS Policy

  1. Problem
    - Current policy checks by email match
    - App queries by id = auth.uid()
    - Causes 400 errors on profiles queries

  2. Solution
    - Drop old email-based policy
    - Create new id-based policy
    - Allow users to read/update their own profile by id

  3. Security
    - Maintains RLS protection
    - Users can only access their own data
    - Service role can bypass for webhooks
*/

-- Drop old policy
drop policy if exists "Users can view own profile by email" on public.profiles;

-- Create new policy for reading own profile by id
create policy "Users can read own profile"
  on public.profiles
  for select
  to authenticated
  using (id = auth.uid());

-- Create policy for updating own profile
create policy "Users can update own profile"
  on public.profiles
  for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- Create policy for inserting own profile (for new signups)
create policy "Users can insert own profile"
  on public.profiles
  for insert
  to authenticated
  with check (id = auth.uid());
