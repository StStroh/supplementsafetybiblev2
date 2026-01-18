# Automatic Deployment Setup

This project is configured for automatic deployment via GitHub Actions → Netlify.

## Prerequisites

1. **GitHub Repository**: Your code must be in a GitHub repository
2. **Netlify Account**: Create account at https://netlify.com
3. **Netlify Site**: Create a new site linked to your GitHub repo

## Setup Instructions

### 1. Create Netlify Site

1. Log in to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize Netlify
4. Select your repository
5. Netlify will auto-detect `netlify.toml` settings
6. Click "Deploy site"

### 2. Get Netlify Credentials

After site creation:

1. Go to **Site settings** → **General** → Copy your **Site ID**
2. Go to **User settings** → **Applications** → **Personal access tokens**
3. Create a new token with "Full access" scope
4. Copy the token (you won't see it again)

### 3. Add GitHub Secrets

In your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add these secrets:

   - `NETLIFY_AUTH_TOKEN`: Your personal access token
   - `NETLIFY_SITE_ID`: Your site ID

### 4. Environment Variables

Add these in Netlify dashboard under **Site settings** → **Environment variables**:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

## How Automatic Deployment Works

### On Push to Main

1. GitHub Actions workflow triggers
2. Code is checked out
3. Dependencies are installed
4. Linting runs (optional)
5. Application builds
6. Build artifacts are deployed to Netlify
7. Site goes live at your production URL

### On Pull Request

1. Same build process runs
2. Preview deployment is created
3. Preview URL is posted as PR comment
4. Test changes before merging

## Deployment Workflows

### `.github/workflows/deploy.yml`
- Builds and deploys to production on push to `main`
- Creates preview deployments for pull requests
- Runs linting and tests

### `.github/workflows/security-check.yml`
- Runs security audits on push/PR
- Scans for exposed secrets
- Weekly scheduled scans

## Manual Deployment

If you need to deploy manually:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## Rollback

To rollback a deployment:

1. Go to Netlify dashboard → **Deploys**
2. Find the working deployment
3. Click "..." → **Publish deploy**

## Monitoring

- **Build logs**: GitHub Actions → Actions tab
- **Deploy logs**: Netlify dashboard → Deploys
- **Site health**: Netlify monitors uptime automatically

## Troubleshooting

### Build Fails

1. Check GitHub Actions logs
2. Verify environment variables are set
3. Run `npm run build` locally to reproduce

### Deployment Hangs

1. Check Netlify deploy logs
2. Verify NETLIFY_AUTH_TOKEN and NETLIFY_SITE_ID are correct
3. Check Netlify service status

### Site Not Updating

1. Clear Netlify cache: Settings → Build & deploy → Clear cache
2. Trigger manual deploy
3. Check DNS/CDN propagation time (up to 48 hours)

## Additional Resources

- [Netlify Docs](https://docs.netlify.com)
- [GitHub Actions Docs](https://docs.github.com/actions)
- [This Project's Netlify Config](../netlify.toml)

## Support

For deployment issues, check:
1. GitHub Actions logs (build phase)
2. Netlify deploy logs (deployment phase)
3. Browser console (runtime errors)
