/*
  # Create PDF Reports Table

  1. New Tables
    - `pdf_reports`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `report_type` (text)
      - `payload` (jsonb)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `pdf_reports` table
    - Add policy for users to insert their own reports
    - Add policy for users to select their own reports
*/

-- Create the pdf_reports table
CREATE TABLE IF NOT EXISTS pdf_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  report_type text NOT NULL,
  payload jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE pdf_reports ENABLE ROW LEVEL SECURITY;

-- Create policy for users to insert their own reports
CREATE POLICY "user can insert own reports"
  ON pdf_reports
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policy for users to select their own reports
CREATE POLICY "user can select own reports"
  ON pdf_reports
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster queries by user_id
CREATE INDEX IF NOT EXISTS idx_pdf_reports_user_id ON pdf_reports(user_id);

-- Create index for faster queries by created_at
CREATE INDEX IF NOT EXISTS idx_pdf_reports_created_at ON pdf_reports(created_at DESC);