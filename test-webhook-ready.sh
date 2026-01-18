#!/bin/bash
# Quick webhook readiness check
# Run after setting env vars in Netlify

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 WEBHOOK CONFIGURATION READINESS CHECK"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if netlify CLI is available
if ! command -v netlify &> /dev/null; then
    echo "⚠️  Netlify CLI not found. Install with: npm install -g netlify-cli"
    exit 1
fi

echo "1️⃣  Checking Netlify deployment status..."
netlify status 2>/dev/null
if [ $? -eq 0 ]; then
    echo "✅ Connected to Netlify"
else
    echo "❌ Not connected to Netlify. Run: netlify link"
    exit 1
fi

echo ""
echo "2️⃣  Checking if stripe-webhook function exists..."
if netlify functions:list 2>/dev/null | grep -q "stripe-webhook"; then
    echo "✅ stripe-webhook function found"
else
    echo "⚠️  stripe-webhook function not deployed yet"
    echo "   Deploy with: git push origin main"
fi

echo ""
echo "3️⃣  Checking environment variables..."
echo "   (Note: Values are hidden for security)"

ENV_VARS=$(netlify env:list 2>/dev/null)

check_env_var() {
    local var_name=$1
    if echo "$ENV_VARS" | grep -q "$var_name"; then
        echo "   ✅ $var_name (set)"
    else
        echo "   ❌ $var_name (MISSING)"
        return 1
    fi
}

MISSING_VARS=0

# Server-side vars
check_env_var "STRIPE_SECRET_KEY" || ((MISSING_VARS++))
check_env_var "STRIPE_WEBHOOK_SECRET" || ((MISSING_VARS++))
check_env_var "SUPABASE_URL" || ((MISSING_VARS++))
check_env_var "SUPABASE_SERVICE_ROLE_KEY" || ((MISSING_VARS++))

# Frontend vars
check_env_var "VITE_SUPABASE_URL" || ((MISSING_VARS++))
check_env_var "VITE_SUPABASE_ANON_KEY" || ((MISSING_VARS++))
check_env_var "VITE_STRIPE_PUBLISHABLE_KEY" || ((MISSING_VARS++))

echo ""
if [ $MISSING_VARS -eq 0 ]; then
    echo "✅ All required environment variables are set"
else
    echo "❌ $MISSING_VARS environment variable(s) missing"
    echo "   Set them in: Netlify Dashboard → Site Settings → Environment Variables"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 NEXT STEPS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ $MISSING_VARS -gt 0 ]; then
    echo "1. Set missing environment variables in Netlify Dashboard"
    echo "2. Deploy: git push origin main"
    echo "3. Run this script again"
else
    echo "✅ Configuration complete!"
    echo ""
    echo "1. Deploy (if not deployed): git push origin main"
    echo ""
    echo "2. Test webhook in Stripe Dashboard:"
    echo "   • Go to: https://dashboard.stripe.com/webhooks"
    echo "   • Click your endpoint"
    echo "   • Click 'Send test webhook'"
    echo "   • Select: checkout.session.completed"
    echo ""
    echo "3. Watch logs:"
    echo "   netlify functions:log stripe-webhook --tail"
    echo ""
    echo "Expected log output:"
    echo "   [StripeWebhook] boot ok | supabase: kmon"
    echo "   [StripeWebhook] ✅ Signature verified"
    echo "   [StripeWebhook] ✅ PROVISIONING COMPLETE"
fi

echo ""
