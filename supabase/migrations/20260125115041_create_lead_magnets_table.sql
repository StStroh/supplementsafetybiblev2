/*
  # Create lead_magnets Table for Email Lead Capture

  1. New Table
    - `lead_magnets`
      - `id` (uuid, primary key)
      - `email` (text, not null)
      - `source` (text, default 'homepage')
      - `lead_magnet` (text, default 'top-20-dangerous-interactions')
      - `status` (text, default 'pending') - pending|sent|failed
      - `error` (text, nullable)
      - `created_at` (timestamptz, default now())
      - `sent_at` (timestamptz, nullable)

  2. Constraints
    - Unique constraint on (email, lead_magnet) to prevent duplicate submissions
    - Check constraint on status values

  3. Indexes
    - Index on email for fast lookups
    - Index on created_at for reporting
    - Index on status for filtering

  4. Security
    - Enable RLS
    - Allow inserts from anyone (public)
    - Only allow admins to view/update records
*/

-- Create the lead_magnets table
CREATE TABLE IF NOT EXISTS lead_magnets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  source text DEFAULT 'homepage',
  lead_magnet text DEFAULT 'top-20-dangerous-interactions',
  status text DEFAULT 'pending',
  error text,
  created_at timestamptz DEFAULT now(),
  sent_at timestamptz
);

-- Add unique constraint to prevent duplicate submissions
CREATE UNIQUE INDEX IF NOT EXISTS idx_lead_magnets_email_magnet 
  ON lead_magnets(email, lead_magnet);

-- Add check constraint for status values
ALTER TABLE lead_magnets 
  DROP CONSTRAINT IF EXISTS lead_magnets_status_check;

ALTER TABLE lead_magnets 
  ADD CONSTRAINT lead_magnets_status_check 
  CHECK (status IN ('pending', 'sent', 'failed'));

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_lead_magnets_email 
  ON lead_magnets(email);

CREATE INDEX IF NOT EXISTS idx_lead_magnets_created_at 
  ON lead_magnets(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_lead_magnets_status 
  ON lead_magnets(status);

-- Enable RLS
ALTER TABLE lead_magnets ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for lead capture forms)
CREATE POLICY "Anyone can submit lead magnet requests"
  ON lead_magnets
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only admins can view all records
CREATE POLICY "Admins can view all lead magnets"
  ON lead_magnets
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Only admins can update records (for status changes)
CREATE POLICY "Admins can update lead magnets"
  ON lead_magnets
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Add helpful comments
COMMENT ON TABLE lead_magnets IS 'Tracks email lead capture submissions and delivery status';
COMMENT ON COLUMN lead_magnets.email IS 'Email address of the lead';
COMMENT ON COLUMN lead_magnets.source IS 'Where the lead came from (homepage, pricing, etc)';
COMMENT ON COLUMN lead_magnets.lead_magnet IS 'Which lead magnet was requested';
COMMENT ON COLUMN lead_magnets.status IS 'Delivery status: pending, sent, failed';
COMMENT ON COLUMN lead_magnets.error IS 'Error message if delivery failed';
COMMENT ON COLUMN lead_magnets.sent_at IS 'Timestamp when email was successfully sent';
