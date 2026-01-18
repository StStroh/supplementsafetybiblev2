# GitHub Actions Automatic Deployment Setup

This guide ensures 100% of your code changes are automatically deployed to Netlify when you push to GitHub.

## ✅ What's Already Done

1. **Git Repository**: Initialized and ready
2. **GitHub Actions Workflow**: Created at `.github/workflows/netlify-deploy.yml`
3. **Build Process**: Tested and working successfully
4. **Netlify Configuration**: Ready in `netlify.toml`

## 🚀 Setup Steps (One-Time Configuration)

### Step 1: Create GitHub Repository

```bash
# On GitHub, create a new repository (e.g., safetybible-app)
# Then run these commands in your project:

git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git commit -m "Initial commit - SafetyBible production app"
git push -u origin main
```

### Step 2: Get Netlify Credentials

1. Log in to [Netlify](https://app.netlify.com/)
2. Go to **User Settings** → **Applications** → **Personal Access Tokens**
3. Click **New access token** and copy it (this is your `NETLIFY_AUTH_TOKEN`)
4. Go to your Netlify site → **Site settings** → **General**
5. Copy your **Site ID** (this is your `NETLIFY_SITE_ID`)

### Step 3: Add GitHub Secrets

Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add these secrets (get values from your `.env` file):

#### Required Secrets:

```
NETLIFY_AUTH_TOKEN=<from Step 2>
NETLIFY_SITE_ID=<from Step 2>

VITE_SUPABASE_URL=<your Supabase project URL>
VITE_SUPABASE_ANON_KEY=<your Supabase anon key>

VITE_STRIPE_PUBLISHABLE_KEY=<your Stripe publishable key>
VITE_STRIPE_PRICE_PRO=<Pro monthly price ID>
VITE_STRIPE_PRICE_PRO_ANNUAL=<Pro annual price ID>
VITE_STRIPE_PRICE_PREMIUM=<Premium monthly price ID>
VITE_STRIPE_PRICE_PREMIUM_ANNUAL=<Premium annual price ID>

VITE_SITE_URL=https://safetybible.com
```

### Step 4: Set Netlify Environment Variables

Go to your Netlify site → **Site settings** → **Environment variables**

Add these (NEVER commit these to GitHub):

```
SUPABASE_URL=<your Supabase URL>
SUPABASE_SERVICE_ROLE_KEY=<your Supabase service role key>
DATABASE_URL=<your PostgreSQL connection string>

STRIPE_SECRET_KEY=<your Stripe secret key>
STRIPE_WEBHOOK_SECRET=<your Stripe webhook secret>

SMTP_HOST=<your SMTP host>
SMTP_PORT=587
SMTP_USER=<your SMTP username>
SMTP_PASS=<your SMTP password>
SMTP_FROM_NAME="SafetyBible"
SMTP_FROM_EMAIL="support@safetybible.com"
```

## 🔄 How It Works (100% Automatic)

Once configured:

1. **You make changes** → Edit any file in your project
2. **Commit and push** → `git add . && git commit -m "Your changes" && git push`
3. **GitHub Actions triggers** → Automatically starts the deployment
4. **Build runs** → Compiles your app with all environment variables
5. **Deploy to Netlify** → Uploads to your production site
6. **Live in 2-3 minutes** → Your changes are live!

## 📊 Monitoring Deployments

- **GitHub**: Check the **Actions** tab to see build logs
- **Netlify**: Check the **Deploys** tab to see deployment status
- **Automatic comments**: GitHub Actions will comment on commits/PRs with deployment status

## 🔒 Security Features

- All secrets stored securely in GitHub (not in code)
- Environment variables separated by context (frontend/backend)
- Netlify functions have access to backend secrets only
- CSP headers protect against XSS attacks
- HTTPS enforced with HSTS

## ⚡ Quick Commands

```bash
# Make changes and deploy
git add .
git commit -m "Update feature X"
git push

# Check build status
# Go to: https://github.com/YOUR_USERNAME/YOUR_REPO/actions

# Force rebuild (if needed)
git commit --allow-empty -m "Trigger rebuild"
git push
```

## 🎯 What Gets Deployed

Every push includes:
- ✅ All React components and pages
- ✅ All Netlify serverless functions
- ✅ All styles and assets
- ✅ Database migrations (manual via Supabase dashboard)
- ✅ Environment-specific configurations
- ✅ Security headers and CSP policies

## 🚨 Important Notes

1. **Database migrations** must be applied manually in Supabase dashboard
2. **Environment variables** changes require updating GitHub secrets
3. **Pull requests** create preview deployments automatically
4. **Main branch** deploys to production automatically

## 🐛 Troubleshooting

If deployment fails:

1. Check **GitHub Actions** logs for build errors
2. Verify all **secrets are set** in GitHub
3. Verify all **environment variables** are set in Netlify
4. Check **Netlify function logs** for runtime errors
5. Review the build output for missing dependencies

## ✨ Benefits

- **Zero manual steps**: Push code, get deployed
- **100% reproducible**: Same build every time
- **Preview deployments**: Test PRs before merging
- **Rollback support**: Revert to any previous deployment
- **Build logs**: Full visibility into what's happening
- **No local CLI needed**: Everything runs in the cloud

---

**Status**: ✅ Ready to deploy
**Build time**: ~2-3 minutes
**Deployment**: Automatic on every push to main
