#!/bin/bash

echo "════════════════════════════════════════════════════════════"
echo "   PRODUCTION DEPLOYMENT - SUPPLEMENT SAFETY BIBLE"
echo "════════════════════════════════════════════════════════════"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}STEP 1: Pre-Deployment Verification${NC}"
echo ""

# Check netlify.toml
echo "Checking netlify.toml SPA redirect..."
if grep -q 'from = "/\*"' netlify.toml && grep -q 'to = "/index.html"' netlify.toml; then
    echo -e "${GREEN}✓ SPA redirect configured correctly${NC}"
else
    echo -e "${RED}✗ SPA redirect missing or incorrect${NC}"
    exit 1
fi

# Check Free.tsx error handling
echo "Checking Free.tsx error handling..."
if grep -q 'data?.error?.message || data?.error' src/pages/Free.tsx; then
    echo -e "${GREEN}✓ Error handling fixed in Free.tsx${NC}"
else
    echo -e "${RED}✗ Error handling not fixed${NC}"
    exit 1
fi

# Check environment variables
echo "Checking environment variables..."
if [ ! -z "$VITE_SUPABASE_URL" ] && [ ! -z "$VITE_SUPABASE_ANON_KEY" ] && [ ! -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    echo -e "${GREEN}✓ All required environment variables present${NC}"
else
    echo -e "${YELLOW}⚠ Some environment variables may be missing${NC}"
    echo "  Required: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY"
fi

echo ""
echo -e "${YELLOW}STEP 2: Build Verification${NC}"
echo ""

# Run build
echo "Running production build..."
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build successful${NC}"
else
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi

echo ""
echo "════════════════════════════════════════════════════════════"
echo -e "${GREEN}   PRE-DEPLOYMENT CHECKS PASSED${NC}"
echo "════════════════════════════════════════════════════════════"
echo ""

echo -e "${YELLOW}NEXT STEPS:${NC}"
echo ""
echo "1. Go to Netlify Dashboard"
echo "2. Navigate to Site settings → Environment variables"
echo "3. Verify these variables exist in Production scope:"
echo "   - VITE_SUPABASE_URL"
echo "   - VITE_SUPABASE_ANON_KEY"
echo "   - SUPABASE_SERVICE_ROLE_KEY"
echo "   - STRIPE_SECRET_KEY (optional)"
echo ""
echo "4. Go to Deploys tab"
echo "5. Click 'Trigger deploy' → 'Clear cache and deploy site'"
echo "6. Wait for deployment to complete"
echo ""
echo "7. After deployment, run these tests:"
echo ""
echo "   # Test 1: Function health"
echo "   curl https://supplementsafetybible.com/.netlify/functions/grant-free?diag=1"
echo ""
echo "   # Test 2: POST activation"
echo "   curl -X POST https://supplementsafetybible.com/.netlify/functions/grant-free \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{\"name\":\"Production Test\"}'"
echo ""
echo "   # Test 3: Visit /free page and submit a name"
echo ""
echo "════════════════════════════════════════════════════════════"

