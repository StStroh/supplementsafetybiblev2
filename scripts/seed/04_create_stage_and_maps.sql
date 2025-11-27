-- Create staging table for CSV import
-- Idempotent: drops and recreates

drop table if exists public.interactions_stage;

create table public.interactions_stage (
  supplement_name text not null,
  medication_name text not null,
  severity text not null,
  description text,
  recommendation text
);

create index if not exists idx_interactions_stage_sup on public.interactions_stage(lower(supplement_name));
create index if not exists idx_interactions_stage_med on public.interactions_stage(lower(medication_name));
