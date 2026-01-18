#!/bin/bash
set -e

# Clinical Home UI Deployment Script
# Repo: https://github.com/StStroh/supplementsafetybiblev2

echo "=========================================="
echo "CLINICAL HOME UI DEPLOYMENT"
echo "=========================================="
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# STEP 0: Clone and checkout
echo "STEP 0: Cloning repository..."
WORK_DIR="/tmp/supplement-deploy-$(date +%s)"
mkdir -p "$WORK_DIR"
cd "$WORK_DIR"

git clone https://github.com/StStroh/supplementsafetybiblev2.git
cd supplementsafetybiblev2

DEFAULT_BRANCH=$(git symbolic-ref refs/remotes/origin/HEAD | sed 's@^refs/remotes/origin/@@')
echo "Default branch: $DEFAULT_BRANCH"

git checkout -b feat/clinical-home-ui

# STEP 1: Sanity checks
echo ""
echo "STEP 1: Running sanity checks..."

if [ ! -f "package.json" ]; then
  echo -e "${RED}ERROR: package.json not found${NC}"
  exit 1
fi

if [ ! -d "src" ]; then
  echo -e "${RED}ERROR: src/ directory not found${NC}"
  exit 1
fi

# Check for Tailwind
MAIN_CSS=""
if [ -f "src/index.css" ]; then
  MAIN_CSS="src/index.css"
elif [ -f "src/styles.css" ]; then
  MAIN_CSS="src/styles.css"
else
  echo -e "${RED}ERROR: No main CSS file found (index.css or styles.css)${NC}"
  exit 1
fi

echo "Main CSS file: $MAIN_CSS"

# Backup original Home.tsx if exists
if [ -f "src/pages/Home.tsx" ]; then
  echo "Backing up existing Home.tsx..."
  cp src/pages/Home.tsx src/pages/Home.backup.tsx
fi

# STEP 2: Create new files
echo ""
echo "STEP 2: Creating new component files..."

# Create NavClinical.tsx
mkdir -p src/components
cat > src/components/NavClinical.tsx << 'EOF'
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
EOF

echo "✓ Created src/components/NavClinical.tsx"

# Create FooterClinical.tsx
cat > src/components/FooterClinical.tsx << 'EOF'
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
EOF

echo "✓ Created src/components/FooterClinical.tsx"

# Create Home.tsx
mkdir -p src/pages
cat > src/pages/Home.tsx << 'EOF'
import NavClinical from '../components/NavClinical';
import FooterClinical from '../components/FooterClinical';
import { Link } from 'react-router-dom';
import { ShieldCheck, Activity, Clock } from 'lucide-react';
import { useEffect } from 'react';

export default function Home(){
  useEffect(()=>{ document.title = 'Supplement Safety Bible — Know Your Supplement–Medication Interactions'; },[]);

  const jsonLd = {
    '@context':'https://schema.org', '@type':'WebSite',
    name:'Supplement Safety Bible',
    url: typeof window!== 'undefined' ? window.location.origin : 'https://supplementsafetybible.com',
    potentialAction:{ '@type':'SearchAction', target: `${typeof window!=='undefined'?window.location.origin:'https://supplementsafetybible.com'}/search?q={query}`, 'query-input':'required name=query' }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
      <NavClinical />

      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <div className="h-[560px] bg-gradient-to-b from-indigo-100 via-indigo-50 to-white"/>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-14 pb-10 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="inline-block text-xs px-2 py-1 rounded-full bg-indigo-600/10 text-indigo-700">Clinically-oriented • Educational</p>
            <h1 className="mt-4 text-5xl font-bold tracking-tight">
              Know Your <span className="text-indigo-700">Supplement–Medication</span> Interactions
            </h1>
            <p className="mt-4 text-lg text-slate-600">Fast, practical guidance to avoid risky combinations. Clear severity labels with step-by-step recommendations.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/pricing" className="px-5 py-3 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm">Get Premium</Link>
              <a href="#features" className="px-5 py-3 rounded-2xl border hover:bg-white">See features</a>
            </div>
            <p className="mt-3 text-xs text-slate-500">Educational use only — not a substitute for medical advice.</p>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-3xl border bg-white shadow-lg">
              <div className="p-6">
                <p className="font-semibold">Interaction Checker Preview</p>
                <p className="text-sm text-slate-600">Add two items → instantly see severity and what to do next.</p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border p-3">
                    <p className="text-slate-500">Supplement</p>
                    <div className="mt-1 h-9 rounded-lg border bg-slate-50"/>
                  </div>
                  <div className="rounded-xl border p-3">
                    <p className="text-slate-500">Medication</p>
                    <div className="mt-1 h-9 rounded-lg border bg-slate-50"/>
                  </div>
                  <div className="col-span-2 rounded-xl border p-3">
                    <p className="text-slate-500">Result</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="inline-flex px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">High</span>
                      <span className="text-sm text-slate-600">Separate doses 2–6 hours; consult prescriber if symptomatic.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* floating cards */}
            <div className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur rounded-2xl border px-3 py-2 shadow-sm text-xs">Evidence-based</div>
            <div className="absolute -top-4 -right-4 bg-white/80 backdrop-blur rounded-2xl border px-3 py-2 shadow-sm text-xs">Fast & clear</div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border p-6 bg-white shadow-sm">
            <ShieldCheck className="h-5 w-5 text-indigo-600"/>
            <p className="mt-3 font-semibold">Severity you can trust</p>
            <p className="text-sm text-slate-600">Low • Moderate • High • Severe, each with clear next steps.</p>
          </div>
          <div className="rounded-2xl border p-6 bg-white shadow-sm">
            <Activity className="h-5 w-5 text-indigo-600"/>
            <p className="mt-3 font-semibold">Clean, fast search</p>
            <p className="text-sm text-slate-600">Find supplements and meds and see conflicts instantly.</p>
          </div>
          <div className="rounded-2xl border p-6 bg-white shadow-sm">
            <Clock className="h-5 w-5 text-indigo-600"/>
            <p className="mt-3 font-semibold">Built for workflows</p>
            <p className="text-sm text-slate-600">Useful for QA/QC, pharmacists, clinicians, and informed consumers.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="rounded-3xl overflow-hidden border shadow-sm">
          <div className="bg-gradient-to-r from-indigo-600 to-sky-600 text-white p-10 grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl font-bold">Upgrade to Premium</h2>
              <p className="text-white/90 mt-2">Unlimited checks, clinician-style guidance, and priority improvements.</p>
            </div>
            <div className="flex md:justify-end">
              <Link to="/pricing" className="px-5 py-3 rounded-2xl bg-white text-indigo-700 font-medium hover:bg-white/90">Choose a plan</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ anchor */}
      <section id="faq" className="max-w-7xl mx-auto px-4 pb-10">
        <h3 className="text-xl font-semibold mb-4">Frequently asked</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="font-medium">Is this medical advice?</p>
            <p className="text-slate-600 text-sm mt-1">No. This is educational content intended to improve conversations with qualified professionals.</p>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="font-medium">How accurate is the severity scale?</p>
            <p className="text-slate-600 text-sm mt-1">It reflects curated evidence and best practice, and is continuously refined.</p>
          </div>
        </div>
      </section>

      <FooterClinical />
    </div>
  );
}
EOF

echo "✓ Created src/pages/Home.tsx"

# Create overrides.css
mkdir -p src/styles
cat > src/styles/overrides.css << 'EOF'
/* Optional: subtle shadow polish for clinical look */
.shadow-lg{ box-shadow: 0 10px 30px rgba(2,6,23,0.08) }
EOF

echo "✓ Created src/styles/overrides.css"

# STEP 3: Fix CSS import order
echo ""
echo "STEP 3: Fixing CSS import order..."

# Check if overrides import exists
if grep -q "overrides.css" "$MAIN_CSS"; then
  echo "overrides.css already imported"
else
  # Add import at the top (before @tailwind directives)
  echo '@import "./styles/overrides.css";' | cat - "$MAIN_CSS" > temp && mv temp "$MAIN_CSS"
  echo "✓ Added overrides.css import to $MAIN_CSS"
fi

# STEP 4: Check dependencies
echo ""
echo "STEP 4: Checking dependencies..."

if ! grep -q '"lucide-react"' package.json; then
  echo "Adding lucide-react..."

  # Detect package manager
  if [ -f "pnpm-lock.yaml" ]; then
    pnpm add lucide-react
  elif [ -f "yarn.lock" ]; then
    yarn add lucide-react
  else
    npm install lucide-react
  fi
else
  echo "✓ lucide-react already present"
fi

# STEP 5: Build
echo ""
echo "STEP 5: Building project..."

if [ -f "pnpm-lock.yaml" ]; then
  pnpm run build
elif [ -f "yarn.lock" ]; then
  yarn build
else
  npm run build
fi

if [ $? -ne 0 ]; then
  echo -e "${RED}Build failed! Check errors above.${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Build successful${NC}"

# STEP 6: Commit and push
echo ""
echo "STEP 6: Committing changes..."

git add .
git commit -m "feat(ui): clinical Home page + navbar/footer; route wired"
git push origin feat/clinical-home-ui

echo ""
echo -e "${GREEN}✓ Changes pushed to feat/clinical-home-ui${NC}"
echo ""
echo "=========================================="
echo "NEXT STEPS (MANUAL):"
echo "=========================================="
echo ""
echo "1. Create PR: https://github.com/StStroh/supplementsafetybiblev2/compare/feat/clinical-home-ui?expand=1"
echo ""
echo "2. Merge the PR on GitHub"
echo ""
echo "3. Monitor Netlify deploy:"
echo "   - Go to https://app.netlify.com"
echo "   - Select your site"
echo "   - Watch for production deploy to complete"
echo ""
echo "4. If needed, trigger deploy manually:"
echo "   - Deploys > Trigger deploy > Clear cache and deploy site"
echo ""
echo "5. Test live site:"
echo "   - https://supplementsafetybible.com/"
echo "   - https://supplementsafetybible.com/pricing"
echo "   - https://supplementsafetybible.com/premium"
echo ""
echo "Working directory: $WORK_DIR/supplementsafetybiblev2"
echo ""
