# Clinical Home UI Deployment Guide

**Repository:** https://github.com/StStroh/supplementsafetybiblev2
**Target Branch:** main
**Production URL:** https://supplementsafetybible.com

---

## 🚀 Automated Deployment Script

I've created an automated deployment script that handles all the steps. However, **I cannot execute it directly** because I don't have access to GitHub or Netlify.

### Option 1: Run the Automated Script (Recommended)

```bash
# Copy the script to your local machine
# Then run:
bash deploy-clinical-home.sh
```

The script will:
1. ✅ Clone the repo
2. ✅ Create feature branch `feat/clinical-home-ui`
3. ✅ Create all new component files (NavClinical, FooterClinical, Home, overrides.css)
4. ✅ Fix CSS import order
5. ✅ Check/install dependencies (lucide-react)
6. ✅ Run build to verify
7. ✅ Commit and push to GitHub
8. ℹ️ Provide instructions for creating PR

---

## Option 2: Manual Step-by-Step

### Step 1: Clone & Setup

```bash
git clone https://github.com/StStroh/supplementsafetybiblev2.git
cd supplementsafetybiblev2
git checkout -b feat/clinical-home-ui
```

### Step 2: Create Component Files

#### `src/components/NavClinical.tsx`
```tsx
import { Link, NavLink } from 'react-router-dom';

export default function NavClinical(){
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600"/>
          <span className="font-semibold tracking-tight">Supplement Safety Bible</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/" className={({isActive})=>isActive?"text-indigo-700 font-medium":"text-slate-700 hover:text-indigo-700"}>Home</NavLink>
          <NavLink to="/pricing" className={({isActive})=>isActive?"text-indigo-700 font-medium":"text-slate-700 hover:text-indigo-700"}>Pricing</NavLink>
          <NavLink to="/premium" className={({isActive})=>isActive?"text-indigo-700 font-medium":"text-slate-700 hover:text-indigo-700"}>Premium</NavLink>
          <a href="#faq" className="text-slate-700 hover:text-indigo-700">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm">Sign in</Link>
          <Link to="/pricing" className="px-3 py-2 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-700 shadow-sm">Get Premium</Link>
        </div>
      </div>
    </header>
  );
}
```

#### `src/components/FooterClinical.tsx`
```tsx
export default function FooterClinical(){
  return (
    <footer className="border-t mt-24">
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <div className="h-8 w-8 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 mb-3" />
          <p className="text-slate-600">Practical, clinically-oriented guidance to avoid risky supplement–medication combinations.</p>
        </div>
        <div>
          <p className="font-medium mb-2">Product</p>
          <ul className="space-y-2 text-slate-600">
            <li><a href="/pricing" className="hover:text-indigo-700">Pricing</a></li>
            <li><a href="#features" className="hover:text-indigo-700">Features</a></li>
            <li><a href="#faq" className="hover:text-indigo-700">FAQ</a></li>
          </ul>
        </div>
        <div>
          <p className="font-medium mb-2">Company</p>
          <ul className="space-y-2 text-slate-600">
            <li><a href="/about" className="hover:text-indigo-700">About</a></li>
            <li><a href="/contact" className="hover:text-indigo-700">Contact</a></li>
          </ul>
        </div>
        <div>
          <p className="font-medium mb-2">Legal</p>
          <ul className="space-y-2 text-slate-600">
            <li><a href="/terms" className="hover:text-indigo-700">Terms</a></li>
            <li><a href="/privacy" className="hover:text-indigo-700">Privacy</a></li>
            <li><a href="/disclaimer" className="hover:text-indigo-700">Medical Disclaimer</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-10 text-xs text-slate-500">© {new Date().getFullYear()} Supplement Safety Bible</div>
    </footer>
  );
}
```

#### `src/pages/Home.tsx`
Copy the full Home.tsx content from the script above (127 lines).

#### `src/styles/overrides.css`
```css
/* Optional: subtle shadow polish for clinical look */
.shadow-lg{ box-shadow: 0 10px 30px rgba(2,6,23,0.08) }
```

### Step 3: Fix CSS Import Order

Edit `src/index.css` (or main CSS file) to ensure imports come BEFORE @tailwind:

```css
@import "./styles/overrides.css";

@tailwind base;
@tailwind components;
@tailwind utilities;

/* rest of file... */
```

### Step 4: Check Dependencies

```bash
# Verify lucide-react is installed
grep "lucide-react" package.json

# If not present, install it
npm install lucide-react
# or: yarn add lucide-react
# or: pnpm add lucide-react
```

### Step 5: Build & Test

```bash
npm run build
# Verify build succeeds with no errors
```

### Step 6: Commit & Push

```bash
git add .
git commit -m "feat(ui): clinical Home page + navbar/footer; route wired"
git push origin feat/clinical-home-ui
```

### Step 7: Create Pull Request

1. Go to https://github.com/StStroh/supplementsafetybiblev2/pulls
2. Click "New pull request"
3. Select `feat/clinical-home-ui` → `main`
4. Title: **feat(ui): clinical Home page + navbar/footer; route wired**
5. Add description of changes
6. Create PR
7. Merge to main

### Step 8: Deploy to Netlify

**If auto-deploy is enabled:**
- Netlify will automatically build and deploy when you merge to main
- Monitor at https://app.netlify.com

**If manual deploy needed:**
1. Go to https://app.netlify.com
2. Select your site
3. Go to **Deploys** tab
4. Click **Trigger deploy** → **Clear cache and deploy site**
5. Wait for build to complete (~5-8 minutes)

### Step 9: Verify Production

Run the verification script:

```bash
bash verify-deployment.sh
```

Or manually test these URLs:
- https://supplementsafetybible.com/ (new clinical home)
- https://supplementsafetybible.com/pricing
- https://supplementsafetybible.com/premium
- https://supplementsafetybible.com/premium/dashboard

---

## 🎨 What's New in Clinical Home UI

### Components
- **NavClinical:** Sticky header with gradient logo, responsive nav, CTA buttons
- **FooterClinical:** 4-column footer grid with company info and links
- **Home Page:** Full clinical landing page with:
  - Hero section with gradient background
  - Interactive preview card mockup
  - Features section (3 cards)
  - CTA section for premium upgrade
  - FAQ section
  - Schema.org structured data

### Design System
- **Colors:** Indigo/Sky gradient theme (professional clinical look)
- **Typography:** Clean, tight tracking for headlines
- **Shadows:** Custom subtle shadows for depth
- **Responsive:** Mobile-first design with breakpoints

### Routes Preserved
All existing routes remain functional:
- `/pricing` → Pricing page (unchanged)
- `/premium` → Premium page (unchanged)
- `/premium/dashboard` → Premium dashboard (unchanged)
- `/premium/thanks` → Thank you page (unchanged)
- All auth routes remain intact

---

## 📋 Files Modified/Created

### New Files
- `src/components/NavClinical.tsx` (24 lines)
- `src/components/FooterClinical.tsx` (36 lines)
- `src/pages/Home.tsx` (127 lines) - **replaces old home**
- `src/styles/overrides.css` (2 lines)

### Modified Files
- `src/index.css` - Added CSS import at top
- `package.json` - May add lucide-react if missing

### Backup
- Old home page automatically saved as `src/pages/Home.backup.tsx`

---

## 🔍 Troubleshooting

### Build fails with CSS import error
**Error:** `@import must precede all other statements`

**Fix:** Move `@import "./styles/overrides.css";` to the **first line** of your main CSS file, before all `@tailwind` directives.

### Missing lucide-react icons
**Error:** `Cannot find module 'lucide-react'`

**Fix:**
```bash
npm install lucide-react
```

### Routes not working
**Check:** Verify `src/App.tsx` has route for `/` that renders `Home` component:
```tsx
import Home from './pages/Home';
// ...
if (path === '/') return <Home />;
```

### Netlify deploy fails
1. Check Netlify build logs
2. Verify environment variables are set (.env values)
3. Clear Netlify cache and rebuild
4. Check that all dependencies are in `package.json` (not devDependencies)

---

## ✅ Success Criteria

After deployment, verify:

- [ ] Home page shows new clinical UI with indigo gradient
- [ ] NavClinical header is sticky with working navigation
- [ ] All CTAs link correctly (Get Premium, See features, etc)
- [ ] Pricing page unchanged
- [ ] Premium page unchanged
- [ ] Premium dashboard unchanged
- [ ] Mobile responsive design works
- [ ] No console errors in browser
- [ ] Build completes without errors/warnings
- [ ] Netlify deploy shows success status

---

## 🆘 Support

If you encounter issues:

1. Check build logs for specific errors
2. Verify all files were created correctly
3. Ensure CSS import order is correct
4. Test locally with `npm run dev` before deploying
5. Check Netlify deploy logs for server-side issues

---

## 📊 Deployment Timeline

| Step | Time | Status |
|------|------|--------|
| Clone & branch | 1 min | ⏳ Pending |
| Create files | 2 min | ⏳ Pending |
| Build & test | 3 min | ⏳ Pending |
| Push to GitHub | 1 min | ⏳ Pending |
| Create & merge PR | 2 min | ⏳ Pending |
| Netlify build | 5-8 min | ⏳ Pending |
| **Total** | **14-17 min** | ⏳ Pending |

---

**Generated:** 2025-11-28
**Repository:** https://github.com/StStroh/supplementsafetybiblev2
**Production:** https://supplementsafetybible.com
