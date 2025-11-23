/*
  # Core Tables for Supplement Safety Bible

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - matches auth.users.id
      - `email` (text, unique) - user email
      - `role` (text) - 'free', 'pro', or 'premium'
      - `stripe_customer_id` (text) - Stripe customer ID
      - `current_period_end` (bigint) - subscription end timestamp
      - `updated_at` (timestamptz) - last update timestamp

    - `supplements`
      - `id` (uuid, primary key)
      - `name` (text) - supplement name
      - `category` (text) - supplement category
      - `aliases` (text) - alternative names
      - `description` (text) - supplement description

    - `medications`
      - `id` (uuid, primary key)
      - `name` (text) - medication name
      - `class` (text) - medication class
      - `otc_rx` (text) - OTC or prescription indicator

    - `interactions`
      - `id` (uuid, primary key)
      - `supplement_id` (uuid, FK to supplements)
      - `medication_id` (uuid, FK to medications)
      - `severity` (text) - interaction severity level
      - `mechanism` (text) - mechanism of interaction
      - `evidence_grade` (text) - quality of evidence (A-D)
      - `summary` (text) - interaction summary
      - `recommendation` (text) - clinical recommendation

  2. Security
    - Enable RLS on all tables
    - Paid users (pro/premium) can read supplements, medications, and interactions
    - All authenticated users can read their own profile
*/

-- Create tables
create table if not exists public.profiles (
  id uuid primary key,
  email text unique,
  role text not null default 'free',
  stripe_customer_id text,
  current_period_end bigint,
  updated_at timestamptz default now()
);

create table if not exists public.supplements (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  aliases text,
  description text
);

create table if not exists public.medications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  class text,
  otc_rx text
);

create table if not exists public.interactions (
  id uuid primary key default gen_random_uuid(),
  supplement_id uuid references public.supplements(id) on delete cascade,
  medication_id uuid references public.medications(id) on delete cascade,
  severity text check (severity in ('None','Minor','Moderate','Major','Contraindicated')),
  mechanism text,
  evidence_grade text check (evidence_grade in ('A','B','C','D')),
  summary text,
  recommendation text
);

-- Enable RLS
alter table public.supplements enable row level security;
alter table public.medications enable row level security;
alter table public.interactions enable row level security;
alter table public.profiles enable row level security;

-- Create indexes for performance
create index if not exists idx_interactions_supplement on public.interactions(supplement_id);
create index if not exists idx_interactions_medication on public.interactions(medication_id);
create index if not exists idx_supplements_name on public.supplements(name);
create index if not exists idx_medications_name on public.medications(name);

-- Create policies
do $$
begin
  -- Paid users can read supplements
  if not exists (
    select 1 from pg_policies
    where schemaname='public'
    and tablename='supplements'
    and policyname='paid_read_supplements'
  ) then
    create policy paid_read_supplements on public.supplements for select
    using (
      exists (
        select 1 from public.profiles p
        where p.id = auth.uid()
        and p.role in ('pro','premium')
      )
    );
  end if;

  -- Paid users can read medications
  if not exists (
    select 1 from pg_policies
    where schemaname='public'
    and tablename='medications'
    and policyname='paid_read_medications'
  ) then
    create policy paid_read_medications on public.medications for select
    using (
      exists (
        select 1 from public.profiles p
        where p.id = auth.uid()
        and p.role in ('pro','premium')
      )
    );
  end if;

  -- Paid users can read interactions
  if not exists (
    select 1 from pg_policies
    where schemaname='public'
    and tablename='interactions'
    and policyname='paid_read_interactions'
  ) then
    create policy paid_read_interactions on public.interactions for select
    using (
      exists (
        select 1 from public.profiles p
        where p.id = auth.uid()
        and p.role in ('pro','premium')
      )
    );
  end if;

  -- Users can read their own profile
  if not exists (
    select 1 from pg_policies
    where schemaname='public'
    and tablename='profiles'
    and policyname='self_read_profiles'
  ) then
    create policy self_read_profiles on public.profiles for select
    using (id = auth.uid());
  end if;
end $$;