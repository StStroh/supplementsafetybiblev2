/*
  # Create Lead Signals Table for B2B Sales Intent Tracking

  1. New Tables
    - `lead_signals`
      - `id` (uuid, primary key) - Unique signal identifier
      - `session_id` (text, not null) - Browser session ID for grouping
      - `user_id` (uuid, nullable) - Linked user if authenticated
      - `created_at` (timestamptz) - Signal timestamp
      - `event_type` (text) - Type of event: search, checker_run, page_view
      - `page_path` (text) - URL path where event occurred
      - `search_terms` (text[]) - Search keywords entered
      - `checker_items` (text[]) - Substances checked
      - `repeat_count` (int) - Number of times event repeated
      - `time_on_page_seconds` (int) - Time spent on page
      - `intent_level` (text) - RESEARCH, VALIDATION, PRE_PURCHASE, PURCHASE_READY
      - `confidence` (int) - Agent confidence 0-100
      - `urgency` (text) - low, medium, high
      - `offer` (text) - Recommended offer from Certified Nutra Labs
      - `cta` (text) - Call-to-action text
      - `sales_message` (text) - Human-readable sales message
      - `lead_score` (int) - Calculated lead quality score 0-100
      - `follow_up` (text) - Recommended action: email, call, wait
      - `timing` (text) - Recommended timing: now, 24h, 72h, 7d
      - `raw_payload` (jsonb) - Complete event payload for analysis

  2. Indexes
    - created_at descending for recent signals
    - intent_level + lead_score for priority sorting
    - session_id for journey tracking
    - user_id for authenticated user tracking

  3. Security
    - Enable RLS
    - Admin-only access (no public read/write)
    - Service role bypasses RLS for backend writes
*/

-- Create lead_signals table
CREATE TABLE public.lead_signals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),

  -- Event data
  event_type text NOT NULL,
  page_path text,
  search_terms text[],
  checker_items text[],
  repeat_count int,
  time_on_page_seconds int,

  -- Agent analysis outputs
  intent_level text NOT NULL,
  confidence int NOT NULL CHECK (confidence >= 0 AND confidence <= 100),
  urgency text NOT NULL,
  offer text,
  cta text,
  sales_message text,
  lead_score int NOT NULL DEFAULT 0 CHECK (lead_score >= 0 AND lead_score <= 100),
  follow_up text NOT NULL DEFAULT 'wait',
  timing text NOT NULL DEFAULT '7d',
  raw_payload jsonb NOT NULL DEFAULT '{}'::jsonb
);

-- Create indexes for performance
CREATE INDEX idx_lead_signals_created_at ON public.lead_signals(created_at DESC);
CREATE INDEX idx_lead_signals_priority ON public.lead_signals(intent_level, lead_score DESC);
CREATE INDEX idx_lead_signals_session ON public.lead_signals(session_id);
CREATE INDEX idx_lead_signals_user ON public.lead_signals(user_id);

-- Enable RLS
ALTER TABLE public.lead_signals ENABLE ROW LEVEL SECURITY;

-- Admin-only access policy for viewing
CREATE POLICY "Admin can view all lead signals"
  ON public.lead_signals
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Admin-only access policy for management
CREATE POLICY "Admin can manage lead signals"
  ON public.lead_signals
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
