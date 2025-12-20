# Supabase Singleton Verification

## Issue
"Multiple GoTrueClient instances detected" warning in browser console

## Solution
Global singleton pattern using `window.__supabase_client`

## Verification Results

### ✅ Requirement 1: Exactly ONE Supabase client created
```bash
$ grep -R "createClient(" -n src
src/lib/supabase.ts:23:    client = createClient(url, anon, {
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

### Global Singleton Pattern
**File:** `src/lib/supabase.ts:13-43`

```typescript
declare global {
  interface Window {
    __supabase_client?: Client;
  }
}

function getSupabaseClient(): Client {
  // Check global instance first
  if (typeof window !== 'undefined' && window.__supabase_client) {
    return window.__supabase_client;
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
  }

  return client;
}

export const supabase = getSupabaseClient();
```

### Why This Works
1. **True Global Scope:** Uses `window` object, which persists across module reloads
2. **Lazy Check:** Checks for existing instance before creating new one
3. **Code Splitting Safe:** Even if module is loaded multiple times, only one instance exists
4. **HMR Compatible:** Hot module replacement won't create duplicate instances

## Result
- ✅ Exactly 1 `createClient()` call in entire src directory
- ✅ Single canonical supabase.ts file
- ✅ All imports point to single source
- ✅ Build passes successfully
- ✅ No "Multiple GoTrueClient instances" warning
