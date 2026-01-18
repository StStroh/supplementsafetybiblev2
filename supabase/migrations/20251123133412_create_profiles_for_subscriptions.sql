/*
  # Create Profiles Table for Subscription Management

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - user identifier, can be used without auth
      - `email` (text, unique) - customer email from Stripe
      - `role` (text, default 'free') - subscription tier: free, pro, premium
      - `stripe_customer_id` (text) - Stripe customer ID
      - `current_period_end` (bigint) - subscription end timestamp (unix)
      - `updated_at` (timestamptz) - last update timestamp

  2. Security
    - Enable RLS on profiles table
    - Profiles can be read by authenticated users (their own)
    - Service role can insert/update for webhook operations
    - Public read access disabled for privacy

  3. Notes
    - This table is managed by Stripe webhooks
    - The webhook uses Supabase Admin client to bypass RLS
    - Users can view their own profile data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'free' CHECK (role IN ('free', 'pro', 'premium')),
  stripe_customer_id text,
  current_period_end bigint,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read their own profile by email
CREATE POLICY "Users can view own profile by email"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Create index for fast lookups
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer_id ON profiles(stripe_customer_id);
