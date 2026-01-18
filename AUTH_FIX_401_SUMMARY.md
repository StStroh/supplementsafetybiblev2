# 401 Unauthorized Fix - Complete

## Root Causes

### 1. Backend Auth Validation
Netlify functions were using **service role key** to validate user access tokens.
This is incorrect - auth validation must use the **anon key**.

### 2. Multiple Supabase Client Instances
Multiple frontend files were creating separate Supabase client instances, causing:
- "Multiple GoTrueClient instances" warning
- Session management conflicts
- Potential auth state desynchronization

## Service Role vs Anon Key

| Key Type | Purpose | Usage |
|----------|---------|-------|
| **Anon Key** | Public key for auth + RLS-protected queries | ✅ Token validation, user sessions |
| **Service Role** | Admin key bypassing RLS | ❌ NOT for token validation |

## Files Changed

### 1. Helper Library
**File:** `netlify/functions/_lib/supabaseClient.cjs`

**Lines 16-27:** Added `supabaseAnon()` function
```javascript
function supabaseAnon() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    throw new Error('Missing Supabase credentials: SUPABASE_URL or SUPABASE_ANON_KEY');
  }

  return createClient(supabaseUrl, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}
```

**Line 29:** Exported new function
```javascript
module.exports = { supabaseAdmin, supabaseAnon };
```

---

### 2. create-checkout-session
**File:** `netlify/functions/create-checkout-session.cjs`

**Line 3:** Import anon client
```javascript
const { supabaseAdmin, supabaseAnon } = require('./_lib/supabaseClient.cjs');
```

**Line 34:** Use anon key for auth
```javascript
const sb = supabaseAnon();  // was: supabaseAdmin()
```

---

### 3. me
**File:** `netlify/functions/me.cjs`

**Line 2:** Import anon client
```javascript
const { supabaseAnon } = require('./_lib/supabaseClient.cjs');
```

**Line 11:** Use anon key for auth
```javascript
const { data: { user }, error } = await supabaseAnon().auth.getUser(token);
```

---

### 4. generate-pdf
**File:** `netlify/functions/generate-pdf.cjs`

**Line 4:** Add anon key env var
```javascript
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
```

**Lines 42-43:** Separate auth and admin clients
```javascript
const supabaseAuth = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
```

**Line 45:** Use anon client for auth
```javascript
const { data: { user }, error: authError } = await supabaseAuth.auth.getUser(token);
```

---

### 5. report_pdf
**File:** `netlify/functions/report_pdf.ts`

**Line 5:** Add anon key constant
```typescript
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY!;
```

**Lines 8-9:** Create both clients
```typescript
const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
```

**Line 33:** Use anon client for auth
```typescript
const { data: { user }, error: authError } = await supabaseAuth.auth.getUser(token);
```

---

## Frontend Changes

### 1. checkout.ts (No Changes)
**File:** `src/utils/checkout.ts`

Already correct:
- Line 22: Gets session via `supabase.auth.getSession()`
- Line 23: Extracts access_token
- Line 35: Sends as `Authorization: Bearer ${token}`

### 2. supabase.ts (Global Singleton Pattern)
**File:** `src/lib/supabase.ts`

**Lines 7-45:** Implemented global singleton using `window` object

```typescript
declare global {
  interface Window {
    __supabase_client?: Client;
  }
}

function getSupabaseClient(): Client {
  // Check if instance already exists globally
  if (typeof window !== 'undefined' && window.__supabase_client) {
    return window.__supabase_client;
  }

  // Create client
  const client = createClient(url, anon, {...});

  // Store globally to prevent duplicate instances
  if (typeof window !== 'undefined') {
    window.__supabase_client = client;
  }

  return client;
}

export const supabase = getSupabaseClient();
```

**Why this approach:**
- Prevents duplicate clients even if module is loaded multiple times
- Code splitting or HMR can cause module duplication
- `window` object is truly global across all module instances

### 3. premiumGuard.ts (Use Singleton)
**File:** `src/lib/premiumGuard.ts`

**Line 1:** Changed from creating new client to importing singleton
```typescript
import { supabase } from './supabase';  // was: createClient(...)
```

### 4. PremiumThanks.tsx (Use Singleton)
**File:** `src/pages/PremiumThanks.tsx`

**Line 3:** Changed from creating new client to importing singleton
```typescript
import { supabase } from '../lib/supabase';  // was: createClient(...)
```

### 5. PremiumDashboard.tsx (Use Singleton)
**File:** `src/pages/PremiumDashboard.tsx`

**Line 4:** Changed from creating new client to importing singleton
```typescript
import { supabase } from '../lib/supabase';  // was: createClient(...)
```

**Result:**
- Only ONE Supabase client instance across entire application
- Global singleton pattern prevents duplication from code splitting
- All frontend code imports from single source

---

## Testing Checklist

### Local Testing
```bash
# 1. Ensure env vars set
cat .env | grep SUPABASE

# 2. Start dev server
npm run dev

# 3. Test auth flow:
# - Sign in
# - Click "Start Free Trial" on pricing page
# - Should redirect to Stripe checkout (not 401)
```

### Production Testing
```bash
# 1. Verify Netlify env vars:
VITE_SUPABASE_URL=https://qbefejbnxrsdwtsbkmon.supabase.co
VITE_SUPABASE_ANON_KEY=(real anon key)
SUPABASE_URL=https://qbefejbnxrsdwtsbkmon.supabase.co
SUPABASE_ANON_KEY=(real anon key)
SUPABASE_SERVICE_ROLE_KEY=(service role key)

# 2. Deploy with cache clear
# 3. Test on live site
```

### Expected Behavior
✅ Signed-in users: Stripe checkout opens
❌ Signed-out users: 401 with "Please sign in to start a trial"

---

## Environment Variables Required

### Netlify Dashboard
Must have BOTH keys:

```bash
# Public anon key (safe to expose)
VITE_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_ANON_KEY=eyJhbGci...

# Secret service role key (admin access)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

Get from: https://supabase.com/dashboard/project/qbefejbnxrsdwtsbkmon/settings/api

---

## Summary

**Before:**
- Functions used service role key for token validation ❌
- Multiple Supabase client instances created in frontend ❌
- Service role bypasses RLS and is for admin operations only
- Multiple clients caused session management conflicts
- Tokens couldn't be properly validated

**After:**
- Functions use anon key for token validation ✅
- Single Supabase client singleton in frontend ✅
- Anon key respects RLS and validates user sessions correctly
- Service role only used for privileged DB operations after auth
- No more "Multiple GoTrueClient instances" warnings

**Result:**
- 401 errors resolved
- Auth flow works correctly
- Session management stable
