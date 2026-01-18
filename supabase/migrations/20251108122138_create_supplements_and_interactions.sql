/*
  # Supplement Safety Bible Database Schema

  1. New Tables
    - `supplements`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `category` (text)
      - `description` (text)
      - `common_uses` (text)
      - `created_at` (timestamptz)
    
    - `medications`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `category` (text)
      - `description` (text)
      - `created_at` (timestamptz)
    
    - `interactions`
      - `id` (uuid, primary key)
      - `supplement_id` (uuid, foreign key)
      - `medication_id` (uuid, foreign key)
      - `severity` (text: 'low', 'moderate', 'high', 'severe')
      - `description` (text)
      - `recommendation` (text)
      - `created_at` (timestamptz)
    
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `subscription_tier` (text: 'starter', 'pro', 'premium')
      - `stripe_customer_id` (text)
      - `stripe_subscription_id` (text)
      - `subscription_status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Supplements and medications are publicly readable
    - Interactions are publicly readable
    - User profiles are only accessible by the owner
*/

-- Create supplements table
CREATE TABLE IF NOT EXISTS supplements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  category text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  common_uses text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE supplements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Supplements are publicly readable"
  ON supplements
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create medications table
CREATE TABLE IF NOT EXISTS medications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  category text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE medications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Medications are publicly readable"
  ON medications
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create interactions table
CREATE TABLE IF NOT EXISTS interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplement_id uuid NOT NULL REFERENCES supplements(id) ON DELETE CASCADE,
  medication_id uuid NOT NULL REFERENCES medications(id) ON DELETE CASCADE,
  severity text NOT NULL CHECK (severity IN ('low', 'moderate', 'high', 'severe')),
  description text NOT NULL DEFAULT '',
  recommendation text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  UNIQUE(supplement_id, medication_id)
);

ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Interactions are publicly readable"
  ON interactions
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  subscription_tier text NOT NULL DEFAULT 'starter' CHECK (subscription_tier IN ('starter', 'pro', 'premium')),
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_supplements_name ON supplements(name);
CREATE INDEX IF NOT EXISTS idx_medications_name ON medications(name);
CREATE INDEX IF NOT EXISTS idx_interactions_supplement ON interactions(supplement_id);
CREATE INDEX IF NOT EXISTS idx_interactions_medication ON interactions(medication_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_stripe_customer ON user_profiles(stripe_customer_id);
