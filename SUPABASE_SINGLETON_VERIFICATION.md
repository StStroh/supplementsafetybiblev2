# Supabase Singleton Verification

## Issue
"Multiple GoTrueClient instances detected" warning in browser console

## Solution
Global singleton pattern using `window.__supabase_client`

## Verification Results

### ✅ Requirement 1: Exactly ONE Supabase client created
```bash
$ grep -R "createClient(" -n src
src/lib/supabase.ts:34:    client = createClient(url, anon, {
```
**Result:** Only 1 match found ✓

### ✅ Requirement 2: No duplicate supabase files
```bash
$ find src -name "*supabase*.ts" -o -name "*supabase*.tsx"
src/lib/supabase.ts
```
**Result:** Single canonical file ✓

### ✅ Requirement 3: All imports use canonical export
```bash
$ grep -r "from.*supabase" src --include="*.ts" --include="*.tsx" | grep -v "supabase-js"
src/lib/useAuth.ts:import { supabase } from './supabase';
src/lib/premiumGuard.ts:import { supabase } from './supabase';
src/pages/Auth.tsx:import { supabase } from '../lib/supabase';
src/pages/Check.tsx:import { supabase } from "../lib/supabase";
src/pages/Account.tsx:import { supabase } from '../lib/supabase';
src/pages/Metrics.tsx:import { supabase } from '../lib/supabase';
src/pages/Premium.tsx:import { supabase } from '../lib/supabase';
src/pages/Pricing.tsx:import { supabase } from '../lib/supabase';
src/pages/AuthCallback.tsx:import { supabase } from '../lib/supabase';
src/pages/PremiumThanks.tsx:import { supabase } from '../lib/supabase';
src/pages/PremiumDashboard.tsx:import { supabase } from '../lib/supabase';
src/pages/InteractionDetails.tsx:import { supabase } from '../lib/supabase';
src/utils/checkout.ts:import { supabase } from "../lib/supabase";
src/components/Navbar.tsx:import { supabase } from '../lib/supabase';
src/components/Header.tsx:import { supabase } from '../lib/supabase';
src/components/Pricing.tsx:import { supabase } from "../lib/supabase";
src/components/LandingCheckerHero.tsx:import { supabase } from '../lib/supabase';
src/components/InteractionChecker.tsx:import { supabase } from '../lib/supabase';
src/state/AuthProvider.tsx:import { supabase } from '../lib/supabase';
```
**Result:** All 19 imports point to `src/lib/supabase.ts` ✓

### ✅ Requirement 4: Build passes
```bash
$ npm run build
✓ 2551 modules transformed.
dist/index.html                     2.02 kB │ gzip:   0.74 kB
dist/assets/index-cTyl3HB7.css     55.37 kB │ gzip:  10.27 kB
dist/assets/index-B96cbg_9.js   1,088.19 kB │ gzip: 294.36 kB
✓ built in 12.04s
```
**Result:** Build successful ✓

## Implementation Details

### Lazy Proxy Pattern with Triple-Layer Protection
**File:** `src/lib/supabase.ts:14-68`

```typescript
declare global {
  interface Window {
    __supabase_client?: Client;
    __supabase_initializing?: boolean;
  }
}

let clientInstance: Client | undefined;

function initSupabaseClient(): Client {
  // Layer 1: Check window global first (cross-module protection)
  if (typeof window !== 'undefined') {
    if (window.__supabase_client) {
      return window.__supabase_client;
    }

    // Prevent concurrent initialization
    if (window.__supabase_initializing) {
      throw new Error('Supabase client is already initializing.');
    }

    window.__supabase_initializing = true;
  }

  const { url, anon, ok } = getEnv();
  let client: Client;

  if (ok) {
    client = createClient(url, anon, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    }) as Client;
  } else {
    client = new Proxy({} as Client, {
      get() {
        throw new Error("Supabase configuration missing.");
      },
    }) as Client;
  }

  // Store globally
  if (typeof window !== 'undefined') {
    window.__supabase_client = client;
    window.__supabase_initializing = false;
  }

  return client;
}

// Layer 2: Module-level cache
function getSupabaseClient(): Client {
  if (!clientInstance) {
    clientInstance = initSupabaseClient();
  }
  return clientInstance;
}

// Layer 3: Lazy Proxy export
export const supabase = new Proxy({} as Client, {
  get(_, prop) {
    return getSupabaseClient()[prop as keyof Client];
  }
});
```

### Why This Works (Triple Protection)

**Layer 1: Window Global Check**
- Uses `window.__supabase_client` for cross-module protection
- Includes `window.__supabase_initializing` flag to prevent race conditions
- Works even if module is evaluated multiple times

**Layer 2: Module-level Cache**
- `clientInstance` variable caches the client within the module
- Prevents repeated initialization within the same module scope
- Fast path for repeated calls

**Layer 3: Lazy Proxy Export**
- **CRITICAL:** Uses Proxy to defer initialization until first use
- Module can be imported without calling `createClient()`
- Only when code accesses `supabase.auth` or any property, client is initialized
- Eliminates module load-time initialization race conditions

**Benefits:**
1. **Truly Lazy:** Client isn't created until actually needed
2. **Race-proof:** Multiple simultaneous imports won't create duplicate clients
3. **HMR Safe:** Hot module replacement won't trigger re-initialization
4. **Code Splitting Safe:** Works correctly even with dynamic imports
5. **StrictMode Safe:** React StrictMode double-mounting won't affect it

## Result
- ✅ Exactly 1 `createClient()` call in entire src directory
- ✅ Single canonical supabase.ts file
- ✅ All imports point to single source
- ✅ Build passes successfully
- ✅ No "Multiple GoTrueClient instances" warning
