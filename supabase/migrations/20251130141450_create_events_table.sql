/*
  # Create events table for analytics

  1. New Tables
    - `events`
      - `id` (bigserial, primary key)
      - `ts` (timestamptz, default now())
      - `user_id` (uuid, nullable)
      - `route` (text)
      - `status` (int)
  
  2. Security
    - Enable RLS on `events` table
    - No public policies (admin/service-role only)
  
  3. Indexes
    - Index on ts for time-based queries
    - Index on route for filtering by endpoint
*/

CREATE TABLE IF NOT EXISTS events (
  id bigserial PRIMARY KEY,
  ts timestamptz DEFAULT now(),
  user_id uuid,
  route text,
  status int
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_events_ts ON events(ts DESC);
CREATE INDEX IF NOT EXISTS idx_events_route ON events(route);
CREATE INDEX IF NOT EXISTS idx_events_user_id ON events(user_id);
