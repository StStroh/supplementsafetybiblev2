# Push to GitHub - Quick Start

Your code is ready. Run these commands to push to GitHub:

## Step 1: Create GitHub Repository

Go to https://github.com/new and create a new repository (e.g., `safetybible-app`)

**Important**: Do NOT initialize with README, .gitignore, or license (your project already has these)

## Step 2: Push Your Code

Replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub username and repository name:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Example:
```bash
git remote add origin https://github.com/johndoe/safetybible-app.git
git push -u origin main
```

## Step 3: Add GitHub Secrets

Go to your repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add each secret (copy from your `.env` file):

### Netlify Credentials
```
NETLIFY_AUTH_TOKEN=<get from Netlify User Settings → Personal Access Tokens>
NETLIFY_SITE_ID=<get from Netlify Site Settings → Site ID>
```

### Supabase (Frontend)
```
VITE_SUPABASE_URL=<your Supabase URL>
VITE_SUPABASE_ANON_KEY=<your Supabase anon key>
```

### Stripe (Frontend)
```
VITE_STRIPE_PUBLISHABLE_KEY=<your Stripe publishable key>
VITE_STRIPE_PRICE_PRO=<Pro monthly price ID>
VITE_STRIPE_PRICE_PRO_ANNUAL=<Pro annual price ID>
VITE_STRIPE_PRICE_PREMIUM=<Premium monthly price ID>
VITE_STRIPE_PRICE_PREMIUM_ANNUAL=<Premium annual price ID>
```

### Site Configuration
```
VITE_SITE_URL=https://safetybible.com
```

## Step 4: Verify Deployment

After pushing, GitHub Actions will automatically:
1. Build your project
2. Deploy to Netlify
3. Comment on your commit with deployment status

Check progress:
- **GitHub**: Repository → Actions tab
- **Netlify**: Dashboard → Deploys tab

## Future Deployments

Every time you make changes:

```bash
git add .
git commit -m "Your change description"
git push
```

That's it! Automatic deployment happens in ~2-3 minutes.

---

**Current Status**:
- ✅ 571 files committed
- ✅ Build tested and working
- ✅ GitHub Actions workflow ready
- ⏳ Waiting for GitHub push
