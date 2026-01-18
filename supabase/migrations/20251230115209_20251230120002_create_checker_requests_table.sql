/*
  # Create Checker Requests Table
  
  1. Purpose
    - Track user requests for substance additions or reviews
    - Allow users to report missing substances or request manual review
  
  2. Table: checker_requests
    - id: UUID primary key
    - created_at: Timestamp
    - raw_input: User's original input text
    - normalized_input: Normalized version for matching
    - context: Additional context (JSON) - substance type, suggestions, etc.
  
  3. Security
    - Enable RLS
    - Allow anonymous inserts (no auth required for requests)
    - Only admins can read
*/

CREATE TABLE IF NOT EXISTS checker_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  raw_input TEXT NOT NULL,
  normalized_input TEXT,
  context JSONB DEFAULT '{}'::jsonb
);

-- Enable Row Level Security
ALTER TABLE checker_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can submit requests (anonymous allowed)
CREATE POLICY "Anyone can submit checker requests"
  ON checker_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users with admin role can read requests
CREATE POLICY "Admins can read checker requests"
  ON checker_requests
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Index for quick lookups
CREATE INDEX IF NOT EXISTS idx_checker_requests_created_at ON checker_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_checker_requests_normalized ON checker_requests(normalized_input);
