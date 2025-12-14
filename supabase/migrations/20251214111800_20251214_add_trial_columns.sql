/*
  # Add Trial Tracking Columns

  1. Changes
    - Add `stripe_subscription_id` to track active subscription
    - Add `plan` column to track detailed plan state (starter, pro_trial, premium_trial, pro, premium)
    - Add `trial_end` to track when trial expires
    - Add `trial_used` to enforce one-trial-per-customer rule

  2. Notes
    - Keeps existing `role` column for backward compatibility
    - Non-destructive: all new columns allow NULL or have defaults
    - `plan` defaults to 'starter' (equivalent to 'free' role)
*/

-- Add trial tracking columns
alter table public.profiles
  add column if not exists stripe_subscription_id text,
  add column if not exists plan text default 'starter' check (plan in ('starter','pro_trial','premium_trial','pro','premium')),
  add column if not exists trial_end timestamptz,
  add column if not exists trial_used boolean default false;

-- Create index for subscription lookups
create index if not exists idx_profiles_subscription on public.profiles(stripe_subscription_id);

-- Update RLS policies to include trial users
do $$
begin
  -- Drop and recreate policies to include trial states
  drop policy if exists paid_read_supplements on public.supplements;
  create policy paid_read_supplements on public.supplements for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.plan in ('pro','premium','pro_trial','premium_trial')
    )
  );

  drop policy if exists paid_read_medications on public.medications;
  create policy paid_read_medications on public.medications for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.plan in ('pro','premium','pro_trial','premium_trial')
    )
  );

  drop policy if exists paid_read_interactions on public.interactions;
  create policy paid_read_interactions on public.interactions for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.plan in ('pro','premium','pro_trial','premium_trial')
    )
  );
end $$;