/*
  # Add Subscription Tracking to Profiles

  1. Changes
    - Add `subscription_id` column to profiles table
    - Add `subscription_status` column to profiles table
    - Add `is_premium` column to profiles table
    - Update existing profiles to set is_premium based on role

  2. Security
    - No RLS changes needed (profiles already has RLS enabled)
    - Users can still only read their own profile
*/

-- Add subscription tracking columns
alter table public.profiles
  add column if not exists subscription_id text,
  add column if not exists subscription_status text,
  add column if not exists is_premium boolean default false;

-- Update existing profiles to set is_premium based on role
update public.profiles
set is_premium = (role in ('pro', 'premium'))
where is_premium is null or is_premium = false;

-- Create index for faster lookups by stripe_customer_id
create index if not exists idx_profiles_stripe_customer on public.profiles(stripe_customer_id);

-- Create index for faster lookups by email
create index if not exists idx_profiles_email on public.profiles(email);
