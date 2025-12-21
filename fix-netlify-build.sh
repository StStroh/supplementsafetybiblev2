#!/bin/bash
set -e

echo "🔧 Fixing Netlify build by removing old .js function files..."
echo ""

cd netlify/functions

# List of .js files to remove from git (they should be .cjs)
JS_FILES=(
  "create-checkout-session.js"
  "create-checkout.js"
  "create-portal-session.js"
  "db-health.js"
  "diagnose-env.js"
  "get-interactions.js"
  "get-session.js"
  "interaction-check.js"
  "interaction-checker.js"
  "interactions-check.js"
  "interactions-search.js"
  "list-catalog.js"
  "me.js"
  "retrieve-session.js"
  "send-test-email.js"
  "stripe-webhook.js"
  "stripe.js"
  "import-interactions.js"
)

echo "📂 Checking netlify/functions for old .js files..."
REMOVED_COUNT=0
for file in "${JS_FILES[@]}"; do
  if git ls-files --error-unmatch "$file" &> /dev/null; then
    echo "  ❌ Removing $file from git"
    git rm -f "$file" 2>/dev/null || true
    ((REMOVED_COUNT++))
  fi
done

echo ""
echo "📂 Checking netlify/functions/_lib for old .js files..."
cd _lib
LIB_JS_FILES=(
  "supabaseAdmin.js"
  "supabaseClient.js"
  "upsertEntitlement.js"
  "plan-map.js"
)

for file in "${LIB_JS_FILES[@]}"; do
  if git ls-files --error-unmatch "$file" &> /dev/null; then
    echo "  ❌ Removing $file from git"
    git rm -f "$file" 2>/dev/null || true
    ((REMOVED_COUNT++))
  fi
done

cd ../../..

echo ""
if [ $REMOVED_COUNT -eq 0 ]; then
  echo "✅ No old .js files found in git - repository is clean!"
else
  echo "✅ Removed $REMOVED_COUNT old .js files from git"
  echo ""
  echo "📝 Changes staged. Now commit and push:"
  echo ""
  echo "  git add netlify.toml"
  echo "  git commit -m 'fix: remove old .js function files, ensure CommonJS uses .cjs extension'"
  echo "  git push"
  echo ""
fi

echo "✅ Done!"
