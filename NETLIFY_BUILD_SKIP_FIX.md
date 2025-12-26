# Fix: Netlify Build Skipped

## Problem

Netlify deploy log shows:
- Building: **Skipped**
- Deploying: **Skipped**
- Cleanup: **Skipped**

This means Netlify's Smart Build Detection is preventing builds from running.

## Why This Happens

Netlify skips builds when:
1. No file changes detected in Git commit
2. Only markdown/documentation files changed
3. Build optimization is enabled and detects identical build inputs
4. Previous build is cached and still valid

## Solution 1: Force a Build (Immediate Fix)

### Option A: Clear Cache and Retry Deploy

1. Go to **Netlify Dashboard** → Your Site
2. Click **Deploys** tab
3. Click **Trigger deploy** dropdown
4. Select **"Clear cache and deploy site"**

This forces a fresh build without using cached artifacts.

### Option B: Manual Deploy from CLI

```bash
# Clear local build first
rm -rf dist node_modules/.vite

# Build locally
npm run build

# Deploy with Netlify CLI
netlify deploy --prod --dir=dist

# Follow prompts to authorize and deploy
```

## Solution 2: Disable Smart Build Detection

### In Netlify Dashboard

1. Go to **Site Settings** → **Build & deploy**
2. Scroll to **Build settings**
3. Look for **"Build optimization"** or **"Smart builds"**
4. Click **"Edit settings"**
5. Toggle **OFF** or set to **"Always build"**
6. Save changes

### Or Add to netlify.toml

Add this to force builds:

```toml
[build]
  command = "npm run build"
  publish = "dist"
  ignore = "exit 0"  # Always build (exit 0 = false, don't ignore)
```

**Or explicitly set when to ignore:**

```toml
[build]
  command = "npm run build"
  publish = "dist"
  # Only skip if this command exits with 1
  ignore = "git diff --quiet $CACHED_COMMIT_REF $COMMIT_REF -- src/ public/ netlify/ package.json"
```

## Solution 3: Ensure Git Changes Are Pushed

If you're using Git-based deployment:

```bash
# Check what files changed
git status

# Add all changed files
git add -A

# Commit with message
git commit -m "Fix: checkout error banner and pricing consistency"

# Push to GitHub/GitLab
git push origin main

# This will trigger a new Netlify build
```

## Solution 4: Add Build Trigger File

Create a file that changes with each build to force rebuilds:

```bash
# Add to package.json scripts
"prebuild": "echo $(date +%s) > build-timestamp.txt && node scripts/prebuild-guard.cjs"
```

Then add to .gitignore:
```
build-timestamp.txt
```

This creates a new file on each build, forcing Netlify to detect changes.

## Solution 5: Use Netlify Build Plugin

Create a custom plugin to control builds:

### Create `netlify-plugin-force-build.js`:

```javascript
module.exports = {
  onPreBuild: ({ netlifyConfig, utils }) => {
    // Always allow builds
    console.log('✅ Force build enabled');
  },
};
```

### Update `netlify.toml`:

```toml
[[plugins]]
  package = "./netlify-plugin-force-build.js"
```

## Recommended Fix for Your Situation

Since you just made critical code changes (checkout error fix), you need to deploy them immediately:

### Step 1: Commit and Push Changes

```bash
# Commit the fixes
git add netlify/functions/create-checkout-session.cjs
git add .env
git commit -m "Fix: Remove customer_creation parameter causing Stripe error"

# Push to trigger build
git push origin main
```

### Step 2: Verify in Netlify

1. Go to **Netlify Dashboard** → **Deploys**
2. You should see a new deploy triggered
3. If still skipped, click **"Clear cache and deploy site"**

### Step 3: Monitor Build

Watch the build log to ensure:
- ✅ Building: **Complete**
- ✅ Deploying: **Complete**
- ✅ Cleanup: **Complete**

## Debug: Check What Changed

To see why Netlify thinks nothing changed:

```bash
# See what files changed in last commit
git show --name-only

# Compare with previous commit
git diff HEAD~1 HEAD --stat

# Check if changes affect build
git diff HEAD~1 HEAD -- src/ public/ netlify/ package.json
```

## Permanent Solution

Add this to `netlify.toml` to control when builds are skipped:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
  NPM_FLAGS = "--legacy-peer-deps"
  HARDENING_SKIP = "true"

# Only ignore builds if no changes in these paths
[build.ignore]
  command = """
    if [ "$CONTEXT" = "production" ]; then
      # Always build production
      exit 0
    fi
    # Skip build if only docs changed
    git diff --quiet $CACHED_COMMIT_REF $COMMIT_REF -- docs/ *.md && exit 1 || exit 0
  """
```

This ensures:
- **Production builds always run**
- **Preview builds skip only if just documentation changed**

## Quick Fix Right Now

**Fastest way to deploy your fixes:**

```bash
# Option 1: Clear cache in Netlify Dashboard
# Deploys → Trigger deploy → Clear cache and deploy site

# Option 2: Force rebuild via CLI
netlify deploy --prod --build

# Option 3: Touch a critical file to force change detection
echo "// Force rebuild $(date)" >> src/main.tsx
git add src/main.tsx
git commit -m "Force rebuild"
git push origin main
```

## Verify Fix Deployed

After build completes:

1. Visit: `https://your-domain.com/pricing`
2. Check: No red error banner
3. Click: "Sign up" button
4. Verify: Redirects to Stripe Checkout

## Prevention

To prevent this in future:

1. **Disable aggressive build optimization** in Netlify settings
2. **Always commit real code changes** (not just markdown)
3. **Use clear cache** when deploying critical fixes
4. **Monitor build logs** to catch skipped builds early

---

**Status:** Ready to fix
**Impact:** High - Critical checkout fixes not deployed
**Next Step:** Clear cache and redeploy in Netlify Dashboard
