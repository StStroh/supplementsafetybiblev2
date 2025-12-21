# Fix Netlify Build - Definitive Solution

## The Real Problem

Your **git repository** contains old `.js` function files (like `send-test-email.js`) that were renamed to `.cjs` but never deleted from git. When Netlify clones your repo, it gets these ghost files and tries to bundle them as ESM (because `"type": "module"`), but they use CommonJS syntax - causing the build to fail.

**Note**: `nodemailer` IS already in package.json - that's not the issue.

## The Fix (3 steps)

### Step 1: Tell git to remove the old files

Even though they don't exist locally, you need to tell git to remove them:

```bash
cd netlify/functions

# Remove ghost .js files from git
git rm -f create-checkout-session.js 2>/dev/null || true
git rm -f create-portal-session.js 2>/dev/null || true
git rm -f db-health.js 2>/dev/null || true
git rm -f diagnose-env.js 2>/dev/null || true
git rm -f get-interactions.js 2>/dev/null || true
git rm -f get-session.js 2>/dev/null || true
git rm -f interaction-check.js 2>/dev/null || true
git rm -f interaction-checker.js 2>/dev/null || true
git rm -f list-catalog.js 2>/dev/null || true
git rm -f me.js 2>/dev/null || true
git rm -f retrieve-session.js 2>/dev/null || true
git rm -f send-test-email.js 2>/dev/null || true
git rm -f stripe-webhook.js 2>/dev/null || true
git rm -f stripe.js 2>/dev/null || true

cd _lib
git rm -f supabaseAdmin.js 2>/dev/null || true
git rm -f supabaseClient.js 2>/dev/null || true
git rm -f upsertEntitlement.js 2>/dev/null || true
git rm -f plan-map.js 2>/dev/null || true

cd ../../..
```

### Step 2: Commit the updated netlify.toml and the deletions

```bash
git add netlify.toml
git commit -m "fix: remove old .js function files, ensure CommonJS uses .cjs extension"
```

### Step 3: Push and redeploy

```bash
git push
```

Netlify will automatically trigger a new build, and this time it will succeed.

## Why This Happened

When `package.json` has `"type": "module"`:
- `.js` files are treated as **ESM** (import/export)
- `.cjs` files are treated as **CommonJS** (require/exports)

Your Netlify functions use `require()` and `exports.handler`, so they MUST be `.cjs`.

## Verification

After pushing, check the Netlify build logs. You should see:
```
✓ built in 3.12s
Functions bundling
✓ All functions bundled successfully
```

## Alternative: Quick Script

Or run this one-liner:

```bash
cd netlify/functions && \
git rm -f *.js 2>/dev/null; \
cd _lib && git rm -f *.js 2>/dev/null; \
cd ../../.. && \
git add netlify.toml && \
git commit -m "fix: remove old .js function files" && \
git push
```
