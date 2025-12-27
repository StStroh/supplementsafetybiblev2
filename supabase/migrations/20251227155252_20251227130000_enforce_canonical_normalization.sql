/*
  # Enforce Canonical Normalization and Uniqueness
  
  1. Functions
    - Create `norm_token(text)` function for canonical token normalization
    - Converts to lowercase, trims whitespace, removes special chars
  
  2. New Tables
    - `checker_substance_tokens`
      - Links normalized tokens to substances
      - Enforces token uniqueness (one token = one substance)
      - Enforces tokens are always stored normalized
  
  3. Constraints on checker_interactions
    - Add unique constraint on (a_substance_id, b_substance_id)
    - Prevents duplicate interactions
    - Works with existing `ordered_pair` check (a < b)
  
  4. Performance Indexes
    - Index on checker_interactions.a_substance_id
    - Index on checker_interactions.b_substance_id
    - Unique index on checker_substance_tokens.token
    - Optimizes lookup queries
  
  5. Data Integrity
    - All future tokens must be normalized
    - All future interactions are unique and canonical
    - Database rejects bad data by design
*/

-- ==================================================
-- STEP 1: CREATE NORMALIZATION FUNCTION
-- ==================================================

CREATE OR REPLACE FUNCTION public.norm_token(input_text text)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  -- Normalize text for searching:
  -- 1. Convert to lowercase
  -- 2. Trim leading/trailing whitespace
  -- 3. Replace multiple spaces with single space
  -- 4. Remove common punctuation that doesn't affect meaning
  RETURN TRIM(
    REGEXP_REPLACE(
      REGEXP_REPLACE(
        LOWER(input_text),
        '[^\w\s-]',  -- Remove special chars except word chars, spaces, hyphens
        '',
        'g'
      ),
      '\s+',  -- Replace multiple spaces with single space
      ' ',
      'g'
    )
  );
END;
$$;

-- ==================================================
-- STEP 2: CREATE TOKENS TABLE WITH CONSTRAINTS
-- ==================================================

CREATE TABLE IF NOT EXISTS public.checker_substance_tokens (
  token_id BIGSERIAL PRIMARY KEY,
  substance_id TEXT NOT NULL REFERENCES checker_substances(substance_id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  
  -- CONSTRAINT: Token must always be normalized
  CONSTRAINT chk_token_normalized CHECK (token = public.norm_token(token))
);

-- ==================================================
-- STEP 3: ENFORCE TOKEN UNIQUENESS
-- ==================================================

-- UNIQUE INDEX: One token maps to one substance only
CREATE UNIQUE INDEX IF NOT EXISTS uniq_checker_token 
ON public.checker_substance_tokens (token);

-- Performance index for reverse lookup (substance -> tokens)
CREATE INDEX IF NOT EXISTS idx_checker_tokens_substance 
ON public.checker_substance_tokens (substance_id);

-- GIN index for pattern matching on tokens
CREATE INDEX IF NOT EXISTS idx_checker_tokens_gin 
ON public.checker_substance_tokens USING gin (token gin_trgm_ops);

-- ==================================================
-- STEP 4: ENFORCE INTERACTION UNIQUENESS
-- ==================================================

-- UNIQUE INDEX: Each substance pair can only have one interaction
-- Works with existing ordered_pair constraint (a < b)
CREATE UNIQUE INDEX IF NOT EXISTS uniq_checker_interaction_pair
ON public.checker_interactions (a_substance_id, b_substance_id);

-- ==================================================
-- STEP 5: PERFORMANCE INDEXES FOR INTERACTIONS
-- ==================================================

-- Index on first substance for efficient lookups
CREATE INDEX IF NOT EXISTS idx_checker_interactions_a
ON public.checker_interactions (a_substance_id);

-- Index on second substance for efficient lookups
CREATE INDEX IF NOT EXISTS idx_checker_interactions_b
ON public.checker_interactions (b_substance_id);

-- Composite index for severity filtering
CREATE INDEX IF NOT EXISTS idx_checker_interactions_severity
ON public.checker_interactions (severity);

-- ==================================================
-- STEP 6: POPULATE TOKENS FROM EXISTING SUBSTANCES
-- ==================================================

-- Insert tokens for all existing substances
-- Includes display_name, canonical_name, and all aliases
INSERT INTO public.checker_substance_tokens (substance_id, token)
SELECT DISTINCT
  substance_id,
  public.norm_token(token_text) as token
FROM (
  -- Display name
  SELECT substance_id, display_name as token_text
  FROM checker_substances
  WHERE display_name IS NOT NULL
  
  UNION
  
  -- Canonical name
  SELECT substance_id, canonical_name as token_text
  FROM checker_substances
  WHERE canonical_name IS NOT NULL
  
  UNION
  
  -- All aliases
  SELECT substance_id, UNNEST(aliases) as token_text
  FROM checker_substances
  WHERE aliases IS NOT NULL AND ARRAY_LENGTH(aliases, 1) > 0
) all_tokens
WHERE public.norm_token(token_text) != ''
ON CONFLICT (token) DO NOTHING;  -- Skip duplicates

-- ==================================================
-- STEP 7: ADD RLS POLICIES FOR TOKENS
-- ==================================================

-- Enable RLS on tokens table
ALTER TABLE public.checker_substance_tokens ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to read tokens for autocomplete
CREATE POLICY "Anyone can read tokens"
  ON public.checker_substance_tokens
  FOR SELECT
  TO public
  USING (true);

-- Only service role can modify tokens
CREATE POLICY "Only service role can modify tokens"
  ON public.checker_substance_tokens
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ==================================================
-- VERIFICATION SUMMARY
-- ==================================================

-- Log summary of what was created
DO $$
DECLARE
  token_count INTEGER;
  substance_count INTEGER;
  interaction_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO token_count FROM checker_substance_tokens;
  SELECT COUNT(*) INTO substance_count FROM checker_substances;
  SELECT COUNT(*) INTO interaction_count FROM checker_interactions;
  
  RAISE NOTICE 'Migration Complete:';
  RAISE NOTICE '- norm_token() function created';
  RAISE NOTICE '- checker_substance_tokens table created';
  RAISE NOTICE '- % tokens indexed for % substances', token_count, substance_count;
  RAISE NOTICE '- % interactions with unique pairs enforced', interaction_count;
  RAISE NOTICE '- All constraints and indexes applied';
END $$;
