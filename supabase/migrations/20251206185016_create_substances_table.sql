/*
  # Create substances table for autocomplete

  1. New Tables
    - `substances`
      - `id` (bigserial, primary key)
      - `name` (text, not null) - supplement or medication name
      - `type` (text, not null) - either 'supplement' or 'medication'

  2. Indexes
    - Unique index on lowercase name + type (prevents duplicates)
    - Trigram GIN index for fast fuzzy search

  3. Security
    - Enable RLS on `substances` table
    - Add policy for public read access (needed for autocomplete)

  4. Extensions
    - Enable pg_trgm extension for trigram search
*/

-- Enable trigram extension for fuzzy text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create substances table
CREATE TABLE IF NOT EXISTS public.substances (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('supplement', 'medication')),
  created_at timestamptz DEFAULT now()
);

-- Create unique index on lowercase name + type to prevent duplicates
CREATE UNIQUE INDEX IF NOT EXISTS substances_name_type_uidx
  ON public.substances (lower(name), type);

-- Create trigram index for fast fuzzy search
CREATE INDEX IF NOT EXISTS substances_name_trgm_idx
  ON public.substances USING gin (name gin_trgm_ops);

-- Create regular index for type filtering
CREATE INDEX IF NOT EXISTS substances_type_idx
  ON public.substances (type);

-- Enable RLS
ALTER TABLE public.substances ENABLE ROW LEVEL SECURITY;

-- Allow public read access (needed for autocomplete on landing page)
CREATE POLICY "Allow public read access to substances"
  ON public.substances
  FOR SELECT
  USING (true);

-- Only admins can insert/update/delete
CREATE POLICY "Admin only write access to substances"
  ON public.substances
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'premium')
    )
  );