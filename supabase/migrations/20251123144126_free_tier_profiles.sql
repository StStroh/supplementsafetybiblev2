alter table profiles add column if not exists free_checks_count integer default 0;

alter table profiles add column if not exists free_last_check_at timestamptz;

drop policy if exists "Free users read supplements" on supplements;

create policy "Free users read supplements" on supplements for select to authenticated using (true);

drop policy if exists "Free users read medications" on medications;

create policy "Free users read medications" on medications for select to authenticated using (true);

drop policy if exists "Paid users read interactions" on interactions;

drop policy if exists "Free users limited read interactions" on interactions;

create policy "Paid users read interactions" on interactions
for select to authenticated
using (
  exists (
    select 1 from profiles p
    where p.email = auth.email()
      and p.role in ('pro','premium')
  )
);

create policy "Free users limited read interactions" on interactions
for select to authenticated
using (
  exists (
    select 1 from profiles p
    where p.email = auth.email()
      and p.role = 'free'
      and (
        p.free_last_check_at is null
        or date_part('year', now()) > date_part('year', p.free_last_check_at)
        or (
          date_part('year', now()) = date_part('year', p.free_last_check_at)
          and date_part('month', now()) > date_part('month', p.free_last_check_at)
        )
        or coalesce(p.free_checks_count,0) < 1
      )
  )
);

-- safety: ensure profiles row exists for the user who signs in
create or replace function public.ensure_profile_exists()
returns trigger as $$
begin
  insert into profiles (id, email, role)
  values (new.id, new.email, coalesce((select role from profiles where email=new.email), 'free'))
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_ensure_profile on auth.users;

create trigger trg_ensure_profile
  after insert on auth.users
  for each row execute function public.ensure_profile_exists();
