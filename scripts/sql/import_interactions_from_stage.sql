-- 1) Create staging table (drop if exists to stay idempotent)
drop table if exists public.interactions_stage;
create table public.interactions_stage (
  supplement_name text,
  medication_name text,
  severity text,
  mechanism text,
  evidence text,
  recommendation text,
  supplement_ext_id bigint null,
  medication_ext_id bigint null
);

-- 2) (Run in Supabase UI) Import CSV into public.interactions_stage using the Table Editor "Import data" button.

-- 3) Move to final table by joining to real ids (names first, fallback to ext_ids if present)
insert into public.interactions (supplement_id, medication_id, severity, mechanism, evidence, recommendation)
select
  coalesce(s.id, s2.id) as supplement_id,
  coalesce(m.id, m2.id) as medication_id,
  st.severity,
  st.mechanism,
  st.evidence,
  st.recommendation
from public.interactions_stage st
left join public.supplements s
  on s.name = st.supplement_name
left join public.medications m
  on m.name = st.medication_name
left join public.supplements s2
  on st.supplement_ext_id is not null and cast(s2.external_id as bigint) = st.supplement_ext_id
left join public.medications m2
  on st.medication_ext_id is not null and cast(m2.external_id as bigint) = st.medication_ext_id
where coalesce(s.id, s2.id) is not null
  and coalesce(m.id, m2.id) is not null
on conflict do nothing;

-- 4) Verification
select
  (select count(*) from public.interactions) as interactions,
  (select count(*) from public.interactions_stage) as staged_rows,
  coalesce((select count(*) from public.interactions i
            left join public.supplements ss on ss.id = i.supplement_id
            where ss.id is null),0) as broken_supp_fk,
  coalesce((select count(*) from public.interactions i
            left join public.medications mm on mm.id = i.medication_id
            where mm.id is null),0) as broken_med_fk;

-- 5) Optional cleanup
-- drop table if exists public.interactions_stage;
