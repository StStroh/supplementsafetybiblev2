# Auth Flow Fix — Magic Link "Page Not Found" Issue

## The Problem

When users click the magic link in their email, they're being redirected to `/auth/callback`, but seeing a "Page Not Found" error. This happens because Supabase needs the redirect URL to be whitelisted.

## Solution

### 1. Configure Supabase Redirect URLs

Go to your Supabase Dashboard:
1. Navigate to: **Authentication → URL Configuration**
2. Find the **Redirect URLs** section
3. Add these URLs (replace with your actual domains):

**For Production:**
```
https://supplementsafetybible.com/auth/callback
https://www.supplementsafetybible.com/auth/callback
```

**For Netlify Deploys:**
```
https://YOUR-NETLIFY-SITE.netlify.app/auth/callback
```

**For Local Development:**
```
http://localhost:5173/auth/callback
http://localhost:8888/auth/callback
```

### 2. Verify Site URL

Your Supabase **Site URL** should match your production domain:
- Go to: **Authentication → URL Configuration**
- Set **Site URL** to: `https://supplementsafetybible.com`

### 3. Check Email Template

In Supabase Dashboard:
1. Go to: **Authentication → Email Templates**
2. Click on **Magic Link**
3. Verify the template uses: `{{ .ConfirmationURL }}`
4. This should automatically redirect to `/auth/callback`

## Current Auth Flow

```
1. User enters email at: /auth
2. Supabase sends magic link email
3. Email link redirects to: {SITE_URL}/auth/callback
4. AuthCallback.tsx activates free plan
5. Redirects to: /account
```

## Testing the Fix

### Test Locally:
1. Start dev server: `npm run dev`
2. Go to: `http://localhost:5173/auth`
3. Enter your email
4. Check your email and click the link
5. Should redirect to: `http://localhost:5173/auth/callback`
6. Then automatically go to: `http://localhost:5173/account`

### Test Production:
1. Deploy to Netlify
2. Go to: `https://YOUR-SITE.netlify.app/auth`
3. Enter your email
4. Click link in email
5. Should work without 404 errors

## Common Issues

### Issue 1: "Invalid Redirect URL" Error
**Cause:** The redirect URL isn't whitelisted in Supabase
**Fix:** Add all your domains to Supabase redirect URLs (see step 1)

### Issue 2: Redirect Goes to Wrong Domain
**Cause:** SITE_URL not configured or Supabase Site URL is wrong
**Fix:**
- Set `VITE_SITE_URL` in Netlify environment variables
- Or rely on `window.location.origin` (automatic)
- Verify Supabase Site URL matches production domain

### Issue 3: Email Link Shows 404
**Cause:** The redirect URL in the email is malformed
**Fix:**
- Check Supabase email template uses `{{ .ConfirmationURL }}`
- Verify Site URL in Supabase matches your domain
- Test with different email providers (Gmail, Outlook, etc.)

## Files Involved

1. **`/src/pages/Auth.tsx`** — Sends magic link with redirect URL
2. **`/src/pages/AuthCallback.tsx`** — Handles the callback
3. **`/src/lib/siteUrl.ts`** — Determines the site URL for redirects
4. **`/src/routes.tsx`** — Defines `/auth/callback` route

## Environment Variables

### Local (.env):
```bash
# Optional - will fall back to window.location.origin if not set
VITE_SITE_URL=http://localhost:5173
```

### Netlify Dashboard:
```bash
# Set this to your production domain
VITE_SITE_URL=https://supplementsafetybible.com
```

## Verification Checklist

- [ ] Redirect URLs added to Supabase (production, staging, local)
- [ ] Supabase Site URL matches production domain
- [ ] Email template uses `{{ .ConfirmationURL }}`
- [ ] `/auth/callback` route exists in routes.tsx
- [ ] `AuthCallback.tsx` component exists
- [ ] Tested magic link locally
- [ ] Tested magic link in production
- [ ] Email arrives within 1 minute
- [ ] Link redirects without 404 errors
- [ ] Free plan is activated after sign-in
- [ ] User lands on `/account` page

## Quick Fix for Testing

If you need to test immediately and can't wait for email:

1. **Manual Session Creation** (for testing only):
```javascript
// In browser console after signing up:
const { data, error } = await supabase.auth.signInWithOtp({
  email: 'your@email.com'
});
// Then manually go to the link in the email
```

2. **Use Different Auth Method** (if magic links keep failing):
   - Consider adding password authentication as backup
   - Or use social auth (Google, GitHub, etc.)

## Support

If the issue persists:
1. Check Supabase logs: **Authentication → Logs**
2. Check browser console for errors
3. Verify email is not in spam
4. Try with a different email address
5. Contact Supabase support if it's a platform issue
