-- Map staged interactions to IDs and upsert
-- Idempotent: uses ON CONFLICT to update existing records

insert into public.interactions (supplement_id, medication_id, severity, description, recommendation)
select
  s.id,
  m.id,
  i.severity,
  i.description,
  i.recommendation
from public.interactions_stage i
join public.supplements s on lower(s.name) = lower(i.supplement_name)
join public.medications m on lower(m.name) = lower(i.medication_name)
on conflict (supplement_id, medication_id) do update
  set severity = excluded.severity,
      description = excluded.description,
      recommendation = excluded.recommendation;
