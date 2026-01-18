# RLS Basics

Enable RLS and use policies per table. Examples (do not run automatically):

```sql
-- Example: profiles readable by the user
-- ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "read own profile"
-- ON public.profiles FOR SELECT
-- USING (auth.uid() = id);

-- Example: read-only catalog
-- ALTER TABLE public.catalog ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "public read"
-- ON public.catalog FOR SELECT
-- TO anon, authenticated
-- USING (true);
```

## Additional Security Best Practices

### Enable RLS on All Tables
```sql
-- Enable RLS on supplements table
-- ALTER TABLE public.supplements ENABLE ROW LEVEL SECURITY;

-- Enable RLS on medications table
-- ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;

-- Enable RLS on interactions table
-- ALTER TABLE public.interactions ENABLE ROW LEVEL SECURITY;
```

### Public Read-Only Access (For Catalog Tables)
```sql
-- Allow anonymous and authenticated users to read supplements
-- CREATE POLICY "supplements_public_read"
-- ON public.supplements FOR SELECT
-- TO anon, authenticated
-- USING (true);

-- Allow anonymous and authenticated users to read medications
-- CREATE POLICY "medications_public_read"
-- ON public.medications FOR SELECT
-- TO anon, authenticated
-- USING (true);

-- Allow anonymous and authenticated users to read interactions
-- CREATE POLICY "interactions_public_read"
-- ON public.interactions FOR SELECT
-- TO anon, authenticated
-- USING (true);
```

### User-Specific Data Access
```sql
-- Only allow users to read their own profile
-- CREATE POLICY "users_read_own_profile"
-- ON public.profiles FOR SELECT
-- USING (auth.uid() = id);

-- Only allow users to update their own profile
-- CREATE POLICY "users_update_own_profile"
-- ON public.profiles FOR UPDATE
-- USING (auth.uid() = id)
-- WITH CHECK (auth.uid() = id);
```

### Premium Content Access
```sql
-- Allow only premium users to access detailed interactions
-- CREATE POLICY "premium_interactions_access"
-- ON public.interactions FOR SELECT
-- USING (
--   EXISTS (
--     SELECT 1 FROM public.profiles
--     WHERE profiles.id = auth.uid()
--     AND profiles.subscription_status = 'active'
--   )
-- );
```

## Important Notes

1. **Never disable RLS** on tables containing user data
2. **Always test policies** before deploying to production
3. **Use service role key** only in trusted backend functions
4. **Review policies regularly** as your application evolves
5. **Document policy intent** for team members

## Testing RLS Policies

```sql
-- Test as anonymous user
-- SET ROLE anon;
-- SELECT * FROM public.supplements;

-- Test as authenticated user
-- SET ROLE authenticated;
-- SELECT * FROM public.profiles WHERE id = auth.uid();
```

## Common Pitfalls

- ❌ Using `USING (true)` on sensitive tables
- ❌ Forgetting to enable RLS after creating a table
- ❌ Not testing policies with different user roles
- ❌ Exposing service role key to frontend
- ❌ Using service role key when anon key is sufficient
