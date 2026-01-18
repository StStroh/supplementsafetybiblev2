/*
  # Admin Token Management RPC Functions
  
  1. Functions
    - `rpc_search_substances(q text, limit_n integer)`
      - Searches substances by display_name, canonical_name, or aliases
      - Returns substance details for admin selection
      - Uses ILIKE pattern matching
    
    - `rpc_add_alias_token(token_raw text, target_substance_id text)`
      - Adds a new alias token for a substance
      - Returns status object: {status: 'ok'|'conflict'|'error', message, existing_substance_id}
      - Handles conflicts gracefully (when token already exists for different substance)
      - Normalizes token automatically using norm_token()
  
  2. Security
    - rpc_search_substances: Public read access (for admin UI)
    - rpc_add_alias_token: Service role only (protected operation)
*/

-- ==================================================
-- FUNCTION: Search Substances
-- ==================================================

CREATE OR REPLACE FUNCTION public.rpc_search_substances(
  q text,
  limit_n integer DEFAULT 20
)
RETURNS TABLE (
  substance_id text,
  type text,
  display_name text,
  canonical_name text,
  aliases text[],
  is_active boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    cs.substance_id,
    cs.type,
    cs.display_name,
    cs.canonical_name,
    cs.aliases,
    cs.is_active
  FROM checker_substances cs
  WHERE 
    cs.is_active = true
    AND (
      cs.display_name ILIKE '%' || q || '%'
      OR cs.canonical_name ILIKE '%' || q || '%'
      OR EXISTS (
        SELECT 1 FROM UNNEST(cs.aliases) AS alias
        WHERE alias ILIKE '%' || q || '%'
      )
    )
  ORDER BY 
    CASE 
      WHEN cs.display_name ILIKE q || '%' THEN 1
      WHEN cs.canonical_name ILIKE q || '%' THEN 2
      ELSE 3
    END,
    cs.display_name
  LIMIT limit_n;
END;
$$;

-- ==================================================
-- FUNCTION: Add Alias Token
-- ==================================================

CREATE OR REPLACE FUNCTION public.rpc_add_alias_token(
  token_raw text,
  target_substance_id text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  normalized_token text;
  existing_substance_id text;
  existing_display_name text;
  result jsonb;
BEGIN
  -- Normalize the input token
  normalized_token := public.norm_token(token_raw);
  
  -- Validate inputs
  IF normalized_token = '' OR normalized_token IS NULL THEN
    RETURN jsonb_build_object(
      'status', 'error',
      'message', 'Token cannot be empty or contain only special characters'
    );
  END IF;
  
  IF target_substance_id = '' OR target_substance_id IS NULL THEN
    RETURN jsonb_build_object(
      'status', 'error',
      'message', 'Target substance_id is required'
    );
  END IF;
  
  -- Check if target substance exists
  IF NOT EXISTS (SELECT 1 FROM checker_substances WHERE substance_id = target_substance_id) THEN
    RETURN jsonb_build_object(
      'status', 'error',
      'message', 'Target substance does not exist: ' || target_substance_id
    );
  END IF;
  
  -- Check if token already exists
  SELECT cst.substance_id, cs.display_name
  INTO existing_substance_id, existing_display_name
  FROM checker_substance_tokens cst
  JOIN checker_substances cs ON cst.substance_id = cs.substance_id
  WHERE cst.token = normalized_token
  LIMIT 1;
  
  -- If token exists for a different substance, return conflict
  IF existing_substance_id IS NOT NULL AND existing_substance_id != target_substance_id THEN
    RETURN jsonb_build_object(
      'status', 'conflict',
      'message', format('Token "%s" already exists for %s (%s)', normalized_token, existing_display_name, existing_substance_id),
      'existing_substance_id', existing_substance_id,
      'existing_display_name', existing_display_name,
      'normalized_token', normalized_token
    );
  END IF;
  
  -- If token already exists for the same substance, it's a no-op success
  IF existing_substance_id = target_substance_id THEN
    RETURN jsonb_build_object(
      'status', 'ok',
      'message', format('Token "%s" already exists for this substance', normalized_token),
      'token', normalized_token,
      'substance_id', target_substance_id
    );
  END IF;
  
  -- Insert the new token
  BEGIN
    INSERT INTO checker_substance_tokens (substance_id, token)
    VALUES (target_substance_id, normalized_token);
    
    RETURN jsonb_build_object(
      'status', 'ok',
      'message', format('Token "%s" added successfully', normalized_token),
      'token', normalized_token,
      'substance_id', target_substance_id
    );
  EXCEPTION
    WHEN unique_violation THEN
      -- Race condition: token was added between our check and insert
      RETURN jsonb_build_object(
        'status', 'conflict',
        'message', format('Token "%s" was just added by another operation', normalized_token),
        'normalized_token', normalized_token
      );
    WHEN OTHERS THEN
      RETURN jsonb_build_object(
        'status', 'error',
        'message', 'Database error: ' || SQLERRM
      );
  END;
END;
$$;

-- ==================================================
-- GRANT PERMISSIONS
-- ==================================================

-- Allow public to search substances (for admin UI)
GRANT EXECUTE ON FUNCTION public.rpc_search_substances TO public;

-- Restrict token addition to service role only
GRANT EXECUTE ON FUNCTION public.rpc_add_alias_token TO service_role;

-- ==================================================
-- VERIFICATION
-- ==================================================

DO $$
BEGIN
  RAISE NOTICE 'Admin Token Management RPCs Created:';
  RAISE NOTICE '- rpc_search_substances(q, limit_n) - Search substances for admin UI';
  RAISE NOTICE '- rpc_add_alias_token(token_raw, target_substance_id) - Add alias tokens';
  RAISE NOTICE '- Permissions: search is public, add is service_role only';
END $$;
