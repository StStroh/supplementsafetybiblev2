/*
  # Reports System for PDF Export

  1. New Tables
    - `reports`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamptz)
      - `title` (text) - Report title
      - `input_json` (jsonb) - User inputs (supplements, medications)
      - `result_json` (jsonb) - Interaction results
      - `pdf_path` (text) - Storage path in reports bucket
      - `plan_at_time` (text) - User's plan when generated
      - `shared` (boolean) - Whether report is shared

  2. Security
    - Enable RLS on `reports` table
    - Users can only access their own reports
*/

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  title text NOT NULL,
  input_json jsonb NOT NULL DEFAULT '{}'::jsonb,
  result_json jsonb NOT NULL DEFAULT '{}'::jsonb,
  pdf_path text,
  plan_at_time text DEFAULT 'free',
  shared boolean DEFAULT false,
  updated_at timestamptz DEFAULT now()
);

-- Create index for faster user queries
CREATE INDEX IF NOT EXISTS idx_reports_user_id ON reports(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at DESC);

-- Enable RLS
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only access their own reports
CREATE POLICY "Users can view own reports"
  ON reports FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reports"
  ON reports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reports"
  ON reports FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reports"
  ON reports FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);