# Zero-Downtime Deploy Flow

## Overview

This project uses Netlify's atomic deployment system to ensure zero-downtime deployments and easy rollbacks.

## Deployment Process

### 1. Open Pull Request

When you create a PR, Netlify automatically:
- Builds a **Deploy Preview** (atomic, isolated build)
- Generates a unique preview URL: `https://deploy-preview-{PR-NUMBER}--supplementsafetybible.netlify.app`
- Runs all build steps and functions
- Posts the preview URL as a comment on the PR

### 2. QA the Preview

Before merging, test the preview URL:

**Critical Pages:**
- `/` - Homepage
- `/pricing` - Pricing page
- `/premium` - Premium signup
- `/premium/dashboard` - Premium dashboard
- `/auth` - Authentication

**Critical Functions:**
- `/.netlify/functions/create-checkout-session` - Stripe checkout
- `/.netlify/functions/create-portal-session` - Billing portal
- `/.netlify/functions/stripe-webhook` - Webhook handler

**Test Checklist:**
- [ ] All pages load without errors
- [ ] No console errors in browser
- [ ] Functions return proper responses (not 500 errors)
- [ ] Supabase authentication works
- [ ] Premium features require authentication
- [ ] Stripe checkout redirects correctly

### 3. Merge PR

When the PR is approved and merged to main:
- Netlify automatically builds the main branch (atomic build)
- The new build goes live at: `https://supplementsafetybible.com`
- Previous build is preserved for instant rollback
- Zero downtime during deployment

### 4. Monitor Production

After deployment:
- Check Netlify deploy logs for errors
- Verify production site loads correctly
- Monitor function logs for any issues
- Check monitoring alerts (if configured)

### 5. Rollback (if needed)

If issues are detected:
1. Go to Netlify Dashboard → Deploys
2. Find the previous working deploy
3. Click "Publish deploy" to instantly rollback
4. No build required - rollback is instant

## Optional: Traffic Splitting

For canary deployments or A/B testing, uncomment this in `netlify.toml`:

```toml
# [split_testing]
# paths = ["/"]
# traffic = [
#   { branch = "main",   percent = 90 },
#   { branch = "staging", percent = 10 }
# ]
```

This routes 10% of traffic to the staging branch for testing new features.

## Branch Deployment Strategy

### Main Branch
- **Purpose:** Production
- **URL:** `https://supplementsafetybible.com`
- **Deploys:** Automatic on merge to main
- **Protection:** Require PR reviews before merge

### Feature Branches
- **Purpose:** Development
- **URL:** `https://branch-NAME--supplementsafetybible.netlify.app`
- **Deploys:** Automatic on push (optional)
- **Protection:** None

### Deploy Previews
- **Purpose:** PR testing
- **URL:** `https://deploy-preview-{NUMBER}--supplementsafetybible.netlify.app`
- **Deploys:** Automatic on PR creation/update
- **Lifespan:** Deleted when PR is closed

## Environment Variables

### Production Environment
Set in: Netlify Dashboard → Site Settings → Environment Variables → Production

Critical variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `STRIPE_SECRET_KEY`
- `VITE_STRIPE_PRICE_*`

### Deploy Preview Environment
Set in: Netlify Dashboard → Site Settings → Environment Variables → Deploy Previews

Use test/sandbox credentials:
- `STRIPE_SECRET_KEY` = test key (sk_test_...)
- `VITE_STRIPE_PRICE_*` = test price IDs

## Build Performance

### Current Build Times
- **Average:** 5-6 seconds
- **Modules:** 1602 transformed
- **Bundle:** 251 KB (gzipped: 77 KB)

### Optimization Tips
- Keep dependencies minimal
- Use code splitting for large pages
- Lazy load non-critical components
- Optimize images and assets

## Troubleshooting

### Build Fails
1. Check Netlify deploy logs
2. Verify environment variables are set
3. Test build locally: `npm run build`
4. Check for TypeScript errors

### Functions Fail
1. Check function logs in Netlify Dashboard
2. Verify environment variables (STRIPE_SECRET_KEY, etc.)
3. Test locally: `netlify dev`
4. Check for missing dependencies

### Site Not Loading
1. Check browser console for errors
2. Verify DNS settings (if custom domain)
3. Check Netlify deploy status
4. Try hard refresh (Ctrl+Shift+R)

## Best Practices

1. **Always test in preview before merging**
2. **Keep PRs small and focused**
3. **Write descriptive commit messages**
4. **Monitor production after deployment**
5. **Keep environment variables in sync**
6. **Document breaking changes**
7. **Use semantic versioning for releases**

## CI/CD Pipeline

```
┌─────────────┐
│  Git Push   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  PR Created │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ Netlify Builds  │
│ Deploy Preview  │
└──────┬──────────┘
       │
       ▼
┌─────────────┐
│  QA Testing │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ PR Approved │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│Merge to Main│
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ Netlify Builds  │
│   Production    │
└──────┬──────────┘
       │
       ▼
┌─────────────┐
│  Live 🚀    │
└─────────────┘
```

## Monitoring

### Automated Monitoring
- Monitor bot pings critical endpoints every 10 minutes
- Sends alerts to webhook on failures
- Configured in `netlify/functions/monitor.cjs`

### Manual Monitoring
- Check Netlify Analytics
- Review function logs
- Monitor Stripe Dashboard for payment issues
- Check Supabase logs for database issues

## Support

For deployment issues:
1. Check Netlify status page
2. Review deploy logs
3. Test locally first
4. Contact support if needed
