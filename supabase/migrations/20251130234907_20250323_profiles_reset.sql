/*
  # Reset profiles table for decoupled activation

  1. Changes
    - Drop foreign key constraint profiles_id_fkey if exists
    - Enable pgcrypto extension for gen_random_uuid()
    - Set default gen_random_uuid() on profiles.id
    - Ensure primary key exists on id
    - Make email nullable (free plans don't require auth)
    - Add activated_at column with default now()
    - Add name column for free flow
    - Force schema cache refresh

  2. Security
    - No RLS changes (existing policies remain)
    - Profiles table remains protected
*/

-- Drop FK if present to allow free activation without auth user
do $$
begin
  if exists (
    select 1
    from information_schema.table_constraints
    where constraint_name = 'profiles_id_fkey'
      and table_name = 'profiles'
      and constraint_type = 'FOREIGN KEY'
  ) then
    alter table public.profiles drop constraint profiles_id_fkey;
  end if;
end$$;

-- Ensure UUID default
create extension if not exists "pgcrypto";
alter table public.profiles
  alter column id set default gen_random_uuid();

-- Ensure primary key on id
do $$
begin
  if not exists (
    select 1 from information_schema.table_constraints
    where table_name='profiles' and constraint_type='PRIMARY KEY'
  ) then
    alter table public.profiles add primary key (id);
  end if;
end$$;

-- Make nonessential fields nullable for free activation
alter table public.profiles
  alter column email drop not null;

-- Ensure activated_at present and default
alter table public.profiles
  add column if not exists activated_at timestamptz default now();

-- Optional: name column for free flow
alter table public.profiles
  add column if not exists name text;

-- Nudge schema cache
comment on table public.profiles is 'reset_2025_03_23';
