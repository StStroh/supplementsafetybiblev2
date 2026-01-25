/*
  # Fix interaction_requests Status Constraint

  1. Problem
    - Frontend sends status values: 'new', 'priority_new'
    - Old constraint only allows: 'pending', 'in_review', 'added', 'declined'
    - This causes INSERT failures

  2. Changes
    - Drop old status constraint
    - Create new constraint allowing: 'pending', 'in_review', 'added', 'declined', 'new', 'priority_new'
    - Update default from 'pending' to 'pending' (keep backwards compatible)

  3. Security
    - RLS policies already in place (unchanged)
    - Allow both authenticated and anonymous inserts
*/

-- Drop the old constraint
ALTER TABLE interaction_requests 
  DROP CONSTRAINT IF EXISTS interaction_requests_status_check;

-- Add new constraint with all valid status values
ALTER TABLE interaction_requests 
  ADD CONSTRAINT interaction_requests_status_check 
  CHECK (status = ANY (ARRAY[
    'pending'::text, 
    'new'::text,
    'priority_new'::text,
    'in_review'::text, 
    'added'::text,
    'completed'::text,
    'declined'::text
  ]));

-- Update existing 'pending' rows to 'new' if needed (optional migration)
-- Uncomment if you want to migrate old data:
-- UPDATE interaction_requests SET status = 'new' WHERE status = 'pending';

-- Add comment
COMMENT ON COLUMN interaction_requests.status IS 'Request status: new, priority_new, in_review, completed, declined';
