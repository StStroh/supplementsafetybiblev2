/*
  # Supplement-Drug Interaction Checker Schema

  1. Extensions
    - `unaccent` for text normalization

  2. Functions
    - `normalize_name(text)` - Removes accents, lowercases, strips non-alphanumeric

  3. Tables
    - `supplements` - Supplement catalog with normalized name
    - `medications` - Medication catalog with normalized name
    - `interactions` - Supplement-medication interactions with severity

  4. Indexes
    - Normalized name indexes for fast lookups
    - Severity index for filtering

  5. Views
    - `interactions_view` - Denormalized view with names

  6. Search Function
    - `search_interactions(q)` - Full-text search with severity ordering
*/

create extension if not exists unaccent;

create or replace function normalize_name(txt text)
returns text language sql immutable as $$
  select regexp_replace(lower(unaccent(coalesce(txt,''))), '[^a-z0-9]+', '', 'g')
$$;

-- Drop existing tables if they exist (will be empty at first migration)
drop table if exists interactions cascade;
drop table if exists medications cascade;
drop table if exists supplements cascade;

create table supplements (
  id bigserial primary key,
  name text not null unique,
  category text,
  description text,
  common_uses text,
  name_normalized text generated always as (normalize_name(name)) stored
);

create table medications (
  id bigserial primary key,
  name text not null unique,
  drug_class text,
  name_normalized text generated always as (normalize_name(name)) stored
);

create table interactions (
  id bigserial primary key,
  supplement_id bigint not null references supplements(id) on delete cascade,
  medication_id bigint not null references medications(id) on delete cascade,
  severity text check (severity in ('low','moderate','high','severe')),
  description text,
  recommendation text,
  unique (supplement_id, medication_id, severity)
);

create index idx_supplements_norm on supplements (name_normalized);
create index idx_medications_norm on medications (name_normalized);
create index idx_interactions_sev on interactions (severity);

create view interactions_view as
select
  i.id,
  s.name  as supplement_name,
  m.name  as medication_name,
  i.severity,
  coalesce(i.description,'')    as description,
  coalesce(i.recommendation,'') as recommendation
from interactions i
join supplements s on s.id = i.supplement_id
join medications m on m.id = i.medication_id;

create or replace function search_interactions(q text)
returns table (
  id bigint,
  supplement_name text,
  medication_name text,
  severity text,
  description text,
  recommendation text
) language sql stable as $$
  with parts as (
    select normalize_name(regexp_replace(q, '\+', ' ', 'g')) as qnorm
  )
  select v.*
  from interactions_view v, parts p
  where
    normalize_name(v.supplement_name) like '%' || p.qnorm || '%'
    or normalize_name(v.medication_name) like '%' || p.qnorm || '%'
    or (normalize_name(v.supplement_name) || normalize_name(v.medication_name)) like '%' || p.qnorm || '%'
  order by
    case severity when 'severe' then 1 when 'high' then 2 when 'moderate' then 3 else 4 end,
    v.supplement_name, v.medication_name
  limit 100;
$$;

-- sanity check
select
  (select count(*) from supplements) as supplements,
  (select count(*) from medications) as medications,
  (select count(*) from interactions) as interactions;