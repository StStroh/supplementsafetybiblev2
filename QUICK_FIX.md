# Quick Fix for Netlify Build Error

## The Problem
```
✘ [ERROR] Could not resolve "nodemailer"
    netlify/functions/send-test-email.js:1:27:
```

**Root cause**: Old `.js` function files exist in your git repo. They should be `.cjs` (CommonJS) but are being treated as ESM because `package.json` has `"type": "module"`.

## The Solution

Run this in your project directory:

```bash
bash fix-netlify-build.sh
```

Then commit and push:

```bash
git add netlify.toml
git commit -m "fix: remove old .js function files, ensure CommonJS uses .cjs"
git push
```

## What This Does

1. Removes old `.js` function files from git (keeping `.cjs` versions)
2. Updates `netlify.toml` with proper function configuration
3. Tells Netlify to bundle all external dependencies correctly

## Why It Failed

- `nodemailer` **IS** in package.json (line 23) ✅
- The issue is `send-test-email.js` exists in git when it should be `send-test-email.cjs`
- When `"type": "module"`, Node treats `.js` as ESM, but the file uses `require()` (CommonJS)
- This confuses the bundler and causes the build to fail

## After Push

Netlify will automatically rebuild and succeed. Build time: ~1-2 minutes.
