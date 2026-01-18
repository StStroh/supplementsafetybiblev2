# Netlify Build Fix

## Problem

The Netlify build is failing with:
```
✘ [ERROR] Could not resolve "nodemailer"
```

## Root Cause

Your git repository contains old `.js` function files that use CommonJS syntax (`require`/`exports`), but your `package.json` has `"type": "module"`. This causes Node/esbuild to treat them as ESM modules, leading to bundling errors.

## Solution

Run the cleanup script to remove duplicate `.js` files (keeping only `.cjs` versions):

```bash
bash clean-functions.sh
```

Then commit and push:

```bash
git add netlify/functions
git commit -m "fix: remove duplicate .js function files, use .cjs for CommonJS"
git push
```

## What Changed

1. **Updated `netlify.toml`**: Added wildcard function configuration to ensure all functions use the same external module settings
2. **Removed duplicate files**: The cleanup script removes `.js` versions when `.cjs` versions exist

## Files Affected

The following files should ONLY exist as `.cjs` (not `.js`):
- create-checkout-session.cjs
- create-portal-session.cjs
- db-health.cjs
- diagnose-env.cjs
- get-interactions.cjs
- get-session.cjs
- interaction-check.cjs
- interaction-checker.cjs
- list-catalog.cjs
- me.cjs
- retrieve-session.cjs
- send-test-email.cjs
- stripe-webhook.cjs
- stripe.cjs

And in `_lib/`:
- supabaseAdmin.cjs
- supabaseClient.cjs
- upsertEntitlement.cjs
- plan-map.cjs

## Why .cjs?

When `package.json` has `"type": "module"`:
- `.js` files = ESM (import/export)
- `.cjs` files = CommonJS (require/exports)
- `.mjs` files = ESM explicitly

Since our Netlify functions use `require` and `exports.handler`, they MUST be `.cjs`.

## Verify It Works

After pushing, Netlify should build successfully. The local build already works:
```bash
npm run build
# ✅ Built successfully
```
