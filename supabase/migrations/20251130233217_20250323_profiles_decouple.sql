/*
  # Decouple profiles from auth.users

  1. Changes
    - Drop foreign key constraint profiles_id_fkey if exists
    - Enable pgcrypto extension for gen_random_uuid()
    - Set default gen_random_uuid() on profiles.id
    - Ensure primary key exists on id
    - Make email nullable (free plans don't require auth)
    - Force schema cache refresh

  2. Security
    - No RLS changes (existing policies remain)
    - Profiles table remains protected
*/

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

create extension if not exists "pgcrypto";

alter table public.profiles
  alter column id set default gen_random_uuid();

-- ensure primary key exists on id (no-op if already present)
do $$
begin
  if not exists (
    select 1 from information_schema.table_constraints
    where table_name='profiles' and constraint_type='PRIMARY KEY'
  ) then
    alter table public.profiles add primary key (id);
  end if;
end$$;

-- free plan doesn't require email
alter table public.profiles
  alter column email drop not null;

-- nudge schema cache
comment on table public.profiles is 'decoupled_2025_03_23';
