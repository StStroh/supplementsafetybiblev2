-- Core tables for supplement-medication interactions
-- Idempotent: safe to rerun

create table if not exists public.supplements (
  id uuid primary key default gen_random_uuid(),
  name text unique not null
);

create table if not exists public.medications (
  id uuid primary key default gen_random_uuid(),
  name text unique not null
);

create table if not exists public.interactions (
  id uuid primary key default gen_random_uuid(),
  supplement_id uuid not null references public.supplements(id) on delete cascade,
  medication_id uuid not null references public.medications(id) on delete cascade,
  severity text not null,
  description text,
  recommendation text,
  unique (supplement_id, medication_id)
);

-- Disable RLS for seeding (app manages its own policies)
alter table public.supplements disable row level security;
alter table public.medications disable row level security;
alter table public.interactions disable row level security;
