-- Verify row counts after seeding

select
  (select count(*) from public.supplements) as supplements,
  (select count(*) from public.medications) as medications,
  (select count(*) from public.interactions) as interactions;
