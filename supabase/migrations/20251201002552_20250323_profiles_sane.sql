/*
  # Profiles Table Sanity Migration

  1. Changes
    - Drop FK constraint to auth.users (free tier must not require auth)
    - Ensure primary key and UUID default generation
    - Add free tier fields (name, activated_at)
    - Make email nullable for free tier

  2. Security
    - Maintains existing RLS policies
    - No data loss operations
*/

-- Drop FK to auth if present (free tier must not require auth)
do $$
begin
  if exists (
    select 1 from information_schema.table_constraints
    where table_name='profiles'
      and constraint_name='profiles_id_fkey'
      and constraint_type='FOREIGN KEY'
  ) then
    alter table public.profiles drop constraint profiles_id_fkey;
  end if;
end$$;

-- Ensure pgcrypto extension for UUID generation
create extension if not exists "pgcrypto";

-- Ensure primary key + default UUID
alter table public.profiles
  alter column id set default gen_random_uuid();

do $$
begin
  if not exists (
    select 1 from information_schema.table_constraints
    where table_name='profiles' and constraint_type='PRIMARY KEY'
  ) then
    alter table public.profiles add primary key (id);
  end if;
end$$;

-- Free tier fields
alter table public.profiles add column if not exists name text;
alter table public.profiles add column if not exists activated_at timestamptz default now();

-- Make email nullable for free tier
do $$
begin
  alter table public.profiles alter column email drop not null;
exception when others then
  null;
end$$;