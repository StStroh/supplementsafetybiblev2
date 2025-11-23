/*
  # Lock Interaction Checker to Paid Users

  ## Overview
  Restricts access to supplements, medications, and interactions tables to authenticated users
  with Pro or Premium subscriptions only. Free users and anonymous users cannot read this data.

  ## Changes

  1. **Drop Existing Permissive Policies**
     - Drops "Supplements are publicly readable" from supplements table
     - Drops "Medications are publicly readable" from medications table
     - Drops "Interactions are publicly readable" from interactions table

  2. **New Restrictive Policies**
     - supplements: "Paid users can read supplements" - SELECT for authenticated users with role in ('pro','premium')
     - medications: "Paid users can read medications" - SELECT for authenticated users with role in ('pro','premium')
     - interactions: "Paid users can read interactions" - SELECT for authenticated users with role in ('pro','premium')

  3. **Access Control**
     - All policies check: EXISTS (SELECT 1 FROM public.profiles WHERE email = auth.email() AND role IN ('pro','premium'))
     - Anonymous users: NO ACCESS
     - Authenticated free users: NO ACCESS
     - Authenticated pro/premium users: READ ACCESS

  ## Security Notes
  - RLS remains enabled on all three tables
  - Service role (webhooks) can still write via admin client
  - Frontend must use authenticated Supabase client
  - Access is enforced at database level, not application level
*/

-- Drop existing permissive policies
DROP POLICY IF EXISTS "Supplements are publicly readable" ON public.supplements;
DROP POLICY IF EXISTS "Medications are publicly readable" ON public.medications;
DROP POLICY IF EXISTS "Interactions are publicly readable" ON public.interactions;

-- Create restrictive policies for paid users only
CREATE POLICY "Paid users can read supplements"
  ON public.supplements
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.email = (SELECT email FROM auth.users WHERE id = auth.uid())
        AND profiles.role IN ('pro', 'premium')
    )
  );

CREATE POLICY "Paid users can read medications"
  ON public.medications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.email = (SELECT email FROM auth.users WHERE id = auth.uid())
        AND profiles.role IN ('pro', 'premium')
    )
  );

CREATE POLICY "Paid users can read interactions"
  ON public.interactions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.email = (SELECT email FROM auth.users WHERE id = auth.uid())
        AND profiles.role IN ('pro', 'premium')
    )
  );

-- Verify RLS is enabled (should already be enabled)
ALTER TABLE public.supplements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interactions ENABLE ROW LEVEL SECURITY;
