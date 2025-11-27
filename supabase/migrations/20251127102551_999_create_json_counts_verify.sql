create or replace function public.json_counts_verify()
returns json language plpgsql security definer as $$
declare
  s bigint;
  m bigint;
  i bigint;
  broken_s bigint;
  broken_m bigint;
begin
  select count(*) into s from public.supplements;
  select count(*) into m from public.medications;
  select count(*) into i from public.interactions;

  select count(*) into broken_s
  from public.interactions x
  left join public.supplements s2 on s2.id = x.supplement_id
  where s2.id is null;

  select count(*) into broken_m
  from public.interactions x
  left join public.medications m2 on m2.id = x.medication_id
  where m2.id is null;

  return json_build_object(
    'rows', json_build_object('supplements', s, 'medications', m, 'interactions', i),
    'foreign_keys', json_build_object('supplement_fk_broken', broken_s, 'medication_fk_broken', broken_m)
  );
end $$;

grant execute on function public.json_counts_verify() to anon, authenticated, service_role;