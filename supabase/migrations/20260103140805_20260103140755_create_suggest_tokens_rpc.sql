/*
  # Create Suggest Tokens RPC Function

  1. New Function
    - `rpc_suggest_tokens(prefix text, limit_n integer)` - returns matching tokens
      - Returns rows with: token (text), substance_id (text)
      - Searches checker_substance_tokens table
      - Uses norm_token() for normalized matching
      - Limits results to specified number (default 10)

  2. Performance
    - Uses index on token for fast prefix matching
    - Returns distinct results to avoid duplicates
    - Orders alphabetically for consistent UX

  3. Security
    - Public function (SECURITY DEFINER not needed)
    - Read-only operation
    - No sensitive data exposed
*/

-- Create RPC function for token suggestions
CREATE OR REPLACE FUNCTION public.rpc_suggest_tokens(
  prefix text,
  limit_n integer DEFAULT 10
)
RETURNS TABLE(token text, substance_id text)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT
    t.token,
    t.substance_id
  FROM public.checker_substance_tokens t
  WHERE t.token LIKE norm_token(prefix) || '%'
  ORDER BY t.token ASC
  LIMIT limit_n;
END;
$$;

-- Grant execute permission to public
GRANT EXECUTE ON FUNCTION public.rpc_suggest_tokens(text, integer) TO anon;
GRANT EXECUTE ON FUNCTION public.rpc_suggest_tokens(text, integer) TO authenticated;

-- Add helpful comment
COMMENT ON FUNCTION public.rpc_suggest_tokens IS 'Returns token suggestions for autocomplete based on prefix match';
