#!/bin/bash
# Clean up old .js function files that should be .cjs

echo "🧹 Cleaning up old .js function files..."

cd netlify/functions

# List of files that should be .cjs (not .ts)
FILES_TO_REMOVE=(
  "create-checkout-session.js"
  "create-checkout.js"
  "create-portal-session.js"
  "db-health.js"
  "diagnose-env.js"
  "get-interactions.js"
  "get-session.js"
  "interaction-check.js"
  "interaction-checker.js"
  "list-catalog.js"
  "me.js"
  "retrieve-session.js"
  "send-test-email.js"
  "stripe-webhook.js"
  "stripe.js"
  "import-interactions.js"
)

for file in "${FILES_TO_REMOVE[@]}"; do
  if [ -f "$file" ]; then
    echo "  ❌ Removing $file (duplicate of ${file%.js}.cjs)"
    rm "$file"
  fi
done

# Check _lib directory
cd _lib
LIB_FILES=(
  "supabaseAdmin.js"
  "supabaseClient.js"
  "upsertEntitlement.js"
  "plan-map.js"
)

for file in "${LIB_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "  ❌ Removing _lib/$file (duplicate of ${file%.js}.cjs)"
    rm "$file"
  fi
done

cd ../..

echo "✅ Cleanup complete!"
echo ""
echo "Next steps:"
echo "1. git add netlify/functions"
echo "2. git commit -m 'Remove duplicate .js function files'"
echo "3. git push"
