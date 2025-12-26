/*
  # Create Safety Packs Table for Brand Content Generation
  
  1. New Tables
    - `safety_packs`
      - `id` (bigint, primary key)
      - `user_id` (uuid, references auth.users)
      - `brand_name` (text)
      - `support_email` (text)
      - `product_name` (text)
      - `product_url` (text)
      - `qr_url` (text)
      - `accent_color` (text)
      - `surgery_window` (text)
      - `logo_url` (text, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on `safety_packs` table
    - Users can only view and manage their own safety packs
*/

CREATE TABLE IF NOT EXISTS safety_packs (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  brand_name text,
  support_email text,
  product_name text,
  product_url text DEFAULT 'https://supplementsafetybible.com/check',
  qr_url text DEFAULT 'https://supplementsafetybible.com/check',
  accent_color text DEFAULT '#7c3aed',
  surgery_window text DEFAULT '2–3 weeks',
  logo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE safety_packs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own safety packs"
  ON safety_packs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own safety packs"
  ON safety_packs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own safety packs"
  ON safety_packs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own safety packs"
  ON safety_packs
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster user lookups
CREATE INDEX IF NOT EXISTS idx_safety_packs_user_id ON safety_packs(user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_safety_packs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER safety_packs_updated_at
  BEFORE UPDATE ON safety_packs
  FOR EACH ROW
  EXECUTE FUNCTION update_safety_packs_updated_at();
