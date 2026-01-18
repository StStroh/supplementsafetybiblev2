#!/bin/bash

echo "========================================"
echo "Checking Supabase URL in built files..."
echo "========================================"
echo ""

if [ ! -d "dist" ]; then
  echo "❌ dist/ directory not found. Run 'npm run build' first."
  exit 1
fi

echo "Searching for Supabase URLs in dist/ ..."
echo ""

# Check for wrong URL
if grep -r "qbefejbnxrsdwtsbkmon" dist/ 2>/dev/null; then
  echo ""
  echo "❌ FOUND WRONG URL: qbefejbnxrsdwtsbkmon.supabase.co"
  echo "❌ This URL is INCORRECT and will cause connection failures"
  echo ""
  echo "ACTION REQUIRED:"
  echo "1. Go to Netlify Dashboard → Site Settings → Environment Variables"
  echo "2. Change VITE_SUPABASE_URL to: https://cyxfxjoadzxhxwxjqkez.supabase.co"
  echo "3. Redeploy site"
  echo ""
  exit 1
fi

# Check for correct URL
if grep -r "cyxfxjoadzxhxwxjqkez" dist/ 2>/dev/null; then
  echo ""
  echo "✅ CORRECT URL FOUND: cyxfxjoadzxhxwxjqkez.supabase.co"
  echo "✅ Build is using the correct Supabase instance"
  echo ""
  echo "If you're still seeing errors:"
  echo "1. Deploy these changes (git push)"
  echo "2. Clear browser cache (F12 → right-click refresh → hard reload)"
  echo ""
  exit 0
fi

echo "❌ No Supabase URL found in built files"
echo "❌ Environment variables may not be set"
echo ""
exit 1
