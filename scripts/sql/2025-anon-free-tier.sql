create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  name text,
  email text,
  plan text not null default 'free',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "read-own" on public.profiles
  for select using (auth.uid() = id);

create policy "update-own" on public.profiles
  for update using (auth.uid() = id);

-- free plan setter (for anonymous users)
create or replace function public.set_free_plan()
returns void
language sql
security definer
as $$
  update public.profiles
     set plan = 'free', updated_at = now()
   where id = auth.uid();
$$;

grant execute on function public.set_free_plan() to authenticated;
