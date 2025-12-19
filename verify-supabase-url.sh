#!/bin/bash
# Verification script for Supabase URL fix

CORRECT_URL="qbefejbnxrsdwtsbkmon"
WRONG_URL="cyxfxjoadzxhxwxjqkez"

echo "=================================================="
echo "🔍 Supabase Project URL Verification"
echo "=================================================="
echo ""

# Check .env file
echo "1️⃣  Checking .env file..."
if grep -q "$CORRECT_URL" .env 2>/dev/null; then
    echo "   ✅ Correct URL found in .env"
else
    echo "   ❌ Correct URL NOT found in .env"
fi

if grep -q "$WRONG_URL" .env 2>/dev/null; then
    echo "   ⚠️  WARNING: Old URL still present in .env"
else
    echo "   ✅ Old URL not found in .env"
fi

# Check netlify.toml
echo ""
echo "2️⃣  Checking netlify.toml CSP..."
if grep -q "$CORRECT_URL" netlify.toml 2>/dev/null; then
    echo "   ✅ Correct URL found in CSP"
else
    echo "   ❌ Correct URL NOT found in CSP"
fi

if grep "Content-Security-Policy" netlify.toml | grep -q "$WRONG_URL" 2>/dev/null; then
    echo "   ⚠️  WARNING: Old URL still in CSP"
else
    echo "   ✅ Old URL not in CSP"
fi

# Check if service role key is in .env (it shouldn't be)
echo ""
echo "3️⃣  Security check..."
if grep -E "^SUPABASE_SERVICE_ROLE_KEY=ey" .env 2>/dev/null; then
    echo "   ⚠️  WARNING: Service role key found in .env (should only be in Netlify)"
else
    echo "   ✅ Service role key not in .env (correct)"
fi

# Check if anon key needs updating
echo ""
echo "4️⃣  Checking anon key..."
if grep -q "VITE_SUPABASE_ANON_KEY=PASTE_" .env 2>/dev/null; then
    echo "   ⚠️  ACTION NEEDED: Update VITE_SUPABASE_ANON_KEY with real key"
elif grep -q "VITE_SUPABASE_ANON_KEY=ey" .env 2>/dev/null; then
    echo "   ✅ Anon key is set"
    # Check if it's the old key
    if grep -q "cyxfxjoadzxhxwxjqkez" .env 2>/dev/null; then
        echo "   ⚠️  WARNING: Anon key appears to be from old project"
    fi
else
    echo "   ❌ VITE_SUPABASE_ANON_KEY not found"
fi

# Check built files (if dist exists)
if [ -d "dist" ]; then
    echo ""
    echo "5️⃣  Checking built files..."

    if grep -r "$CORRECT_URL" dist/ >/dev/null 2>&1; then
        echo "   ✅ Correct URL found in built files"
    else
        echo "   ⚠️  Correct URL NOT found in built files (rebuild needed?)"
    fi

    if grep -r "$WRONG_URL" dist/ >/dev/null 2>&1; then
        echo "   ❌ Old URL still in built files (REBUILD REQUIRED)"
    else
        echo "   ✅ Old URL not in built files"
    fi
else
    echo ""
    echo "5️⃣  No dist/ folder found (run 'npm run build' to create)"
fi

echo ""
echo "=================================================="
echo "📋 Summary"
echo "=================================================="
echo ""
echo "Next steps:"
echo "  1. Update VITE_SUPABASE_ANON_KEY in .env with key from:"
echo "     https://supabase.com/dashboard/project/qbefejbnxrsdwtsbkmon/settings/api"
echo ""
echo "  2. Set Netlify environment variables:"
echo "     - VITE_SUPABASE_URL=https://qbefejbnxrsdwtsbkmon.supabase.co"
echo "     - SUPABASE_URL=https://qbefejbnxrsdwtsbkmon.supabase.co"
echo "     - VITE_SUPABASE_ANON_KEY=(anon key)"
echo "     - SUPABASE_SERVICE_ROLE_KEY=(service_role key)"
echo ""
echo "  3. Trigger 'Clear cache and deploy' in Netlify"
echo ""
echo "  4. Test authentication at your deployed site"
echo ""
