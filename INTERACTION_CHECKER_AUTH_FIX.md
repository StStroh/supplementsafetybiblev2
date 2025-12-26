# Interaction Checker Auth Fix

## Problem
After magic-link login, the Interaction Checker was asking for email again when users tried to submit supplements. This broke the user flow and created a confusing experience.

## Root Cause
The `InteractionChecker.tsx` component was managing its own auth state independently from the global `AuthProvider`. It was:
- Calling `supabase.auth.getUser()` directly
- Managing local auth state (`email`, `role`, `state`)
- Not using the centralized auth context
- Creating a race condition where the component's local auth check ran before or during the global auth check

## Solution
Refactored `InteractionChecker.tsx` to use the global `AuthProvider` as the single source of truth for auth state.

### Changes Made

**File:** `src/components/InteractionChecker.tsx`

#### 1. Import AuthProvider Hook
```typescript
import { useAuth } from '../state/AuthProvider';
import { useNavigate } from 'react-router-dom';
```

#### 2. Use Global Auth State
```typescript
const { user, session, plan, loading: authLoading } = useAuth();
const userRole = plan || 'free';
```

#### 3. Remove Local Auth State
**Removed:**
- `email` state variable
- `role` state variable
- `no_user` state option
- Direct `supabase.auth.getUser()` call

**Kept:**
- `loading`, `free_locked`, `paid`, `data_error`, `result` states (for data loading and UI state)

#### 4. Add Redirect Guard
```typescript
useEffect(() => {
  if (!authLoading && !session) {
    console.info('[InteractionChecker] No session, redirecting to auth');
    navigate('/auth?next=/check', { replace: true });
  }
}, [authLoading, session, navigate]);
```

#### 5. Gate Data Loading on Auth
```typescript
useEffect(() => {
  if (authLoading || !session || !user) {
    return; // Wait for auth to complete
  }

  // Only load data when auth is confirmed
  (async () => {
    // ... load supplements and medications
  })();
}, [authLoading, session, user, userRole]);
```

#### 6. Update Check Function
```typescript
const check = async () => {
  // ...

  if (!user?.email) {
    setErrorMsg('Authentication required. Please sign in again.');
    return;
  }

  const res = await fetch('/.netlify/functions/get-interactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      supplementId,
      medicationId,
      userEmail: user.email  // Use user from AuthProvider
    }),
  });

  // ...
};
```

#### 7. Simplify Render Logic
**Before:**
- `loading` → show loading
- `no_user` → show sign-in panel
- `free_locked` → show upgrade panel
- `paid` → show checker
- `data_error` → show error
- `result` → show results

**After:**
- `authLoading || state === 'loading'` → show loading
- `!session` → return null (redirect handled by useEffect)
- `free_locked` → show upgrade panel
- `paid` → show checker
- `data_error` → show error
- `result` → show results

Removed the `no_user` state entirely since redirect is handled before rendering.

## Auth Flow Diagram

```
┌─────────────────────────────────────┐
│      AuthProvider (Global)          │
│  - Loads session on mount           │
│  - Provides: { session, loading }   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│    InteractionChecker Component     │
└─────────────────────────────────────┘
               │
               ▼
        loading === true?
               │
        ┌──────┴──────┐
        │             │
       YES           NO
        │             │
        ▼             ▼
   Show loading   session exists?
                      │
               ┌──────┴──────┐
               │             │
              YES           NO
               │             │
               ▼             ▼
        Load data      Redirect to
        Show checker   /auth?next=/check
```

## Benefits

1. **Single Source of Truth**
   - Auth state managed in one place
   - No race conditions
   - No duplicate auth checks

2. **Consistent Behavior**
   - Same auth flow as other protected pages (Check.tsx)
   - Predictable redirect behavior
   - Consistent user experience

3. **No Email Prompts**
   - User email is always available from AuthProvider
   - No fallback email collection
   - Seamless post-login experience

4. **Cleaner Code**
   - Removed duplicate auth logic
   - Reduced component complexity
   - Easier to maintain

## Testing Checklist

- [x] Build successful
- [ ] Magic link login redirects to checker
- [ ] Checker loads data without asking for email
- [ ] Free users see upgrade prompt
- [ ] Paid users see full checker
- [ ] Submit works without re-authentication
- [ ] No console errors about missing email

## Related Files

- `src/state/AuthProvider.tsx` - Global auth state provider
- `src/pages/Check.tsx` - Reference implementation (already correct)
- `src/components/InteractionChecker.tsx` - Fixed component
- `src/lib/supabase.ts` - Supabase client singleton

## Migration Notes

This fix ensures all components use the same auth pattern:

**Correct Pattern:**
```typescript
import { useAuth } from '../state/AuthProvider';

function Component() {
  const { user, session, loading } = useAuth();

  if (loading) return <Loading />;
  if (!session) navigate('/auth');

  // Use user.email, session, etc.
}
```

**Incorrect Pattern (removed):**
```typescript
// DON'T DO THIS
useEffect(() => {
  const { data: user } = await supabase.auth.getUser();
  // manage local auth state
}, []);
```

## Deployment

Build successful. Ready for deployment.

Components now properly gated:
- InteractionChecker uses AuthProvider
- No duplicate auth calls
- Clean redirect flow
- No email prompts after login
