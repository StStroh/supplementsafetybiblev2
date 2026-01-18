/*
  # Create Stripe Event Tracking System

  1. New Tables
    - `stripe_events`
      - `id` (text, primary key) - Stripe event ID
      - `type` (text) - Event type (checkout.session.completed, etc.)
      - `checkout_session_id` (text, indexed) - For idempotency
      - `customer_id` (text) - Stripe customer ID
      - `email` (text) - Customer email
      - `status` (text) - processing, completed, failed
      - `processed_at` (timestamptz) - When successfully processed
      - `error` (text) - Error message if failed
      - `created_at` (timestamptz) - Event creation time
      - `raw_data` (jsonb) - Full event data for debugging

  2. Security
    - Enable RLS on `stripe_events` table
    - No public access (service role only)

  3. Indexes
    - Primary key on id (Stripe event ID)
    - Unique index on checkout_session_id for idempotency
    - Index on email for lookups
    - Index on created_at for time-based queries

  4. Purpose
    - Prevents duplicate processing of webhook events
    - Provides audit trail of all Stripe events
    - Enables debugging and reconciliation
*/

-- Create stripe_events table
CREATE TABLE IF NOT EXISTS stripe_events (
  id text PRIMARY KEY,
  type text NOT NULL,
  checkout_session_id text,
  customer_id text,
  email text,
  status text NOT NULL DEFAULT 'processing' CHECK (status IN ('processing', 'completed', 'failed')),
  processed_at timestamptz,
  error text,
  created_at timestamptz DEFAULT now(),
  raw_data jsonb DEFAULT '{}'::jsonb
);

-- Enable RLS (service role only)
ALTER TABLE stripe_events ENABLE ROW LEVEL SECURITY;

-- No public policies - service role only
COMMENT ON TABLE stripe_events IS 'Tracks all Stripe webhook events for idempotency and audit trail';

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_stripe_events_checkout_session
  ON stripe_events(checkout_session_id)
  WHERE checkout_session_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_stripe_events_email
  ON stripe_events(email)
  WHERE email IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_stripe_events_created_at
  ON stripe_events(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_stripe_events_status
  ON stripe_events(status);

-- Add unique constraint on checkout_session_id for idempotency
CREATE UNIQUE INDEX IF NOT EXISTS idx_stripe_events_checkout_session_unique
  ON stripe_events(checkout_session_id)
  WHERE checkout_session_id IS NOT NULL;

-- Add column to profiles to track which checkout session provisioned access
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS provisioned_by_checkout_session text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS provisioned_via text DEFAULT 'manual' CHECK (provisioned_via IN ('manual', 'webhook', 'success_page'));
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_provisioned_at timestamptz;

-- Index for lookup
CREATE INDEX IF NOT EXISTS idx_profiles_checkout_session
  ON profiles(provisioned_by_checkout_session)
  WHERE provisioned_by_checkout_session IS NOT NULL;
