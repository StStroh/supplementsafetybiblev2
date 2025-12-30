/*
 * Guest Checkout - NO AUTH REQUIRED
 * Customer clicks checkout → immediately goes to Stripe
 * After payment, webhook provisions access based on email
 * Supports Amazon Pay via automatic payment methods
 */
const Stripe = require("stripe");
const { createClient } = require('@supabase/supabase-js');

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(body),
  };
}

function getOrigin(event) {
  const headers = event.headers || {};
  const host = headers.host || headers.Host || "supplementsafetybible.com";
  const proto = headers["x-forwarded-proto"] || (host.includes("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

exports.handler = async (event) => {
  try {
    // Log the incoming request for debugging
    console.log('[create-checkout-session] Request received:', {
      method: event.httpMethod,
      hasAuth: !!(event.headers.authorization || event.headers.Authorization),
    });

    if (event.httpMethod !== "POST") {
      return json(405, {
        error: "Method not allowed",
        type: "MethodNotAllowed"
      });
    }

    // EXPLICIT DIAGNOSTIC: Check all required environment variables
    console.log('[create-checkout-session] ========== ENVIRONMENT CHECK ==========');
    console.log('[create-checkout-session] STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? '✅ Present' : '❌ MISSING');
    console.log('[create-checkout-session] SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ Present' : '⚠️ Missing (optional for guest checkout)');
    console.log('[create-checkout-session] SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Present' : '⚠️ Missing (optional for guest checkout)');
    console.log('[create-checkout-session] VITE_STRIPE_PRICE_PRO:', process.env.VITE_STRIPE_PRICE_PRO ? '✅ Present' : '❌ MISSING');
    console.log('[create-checkout-session] VITE_STRIPE_PRICE_PRO_ANNUAL:', process.env.VITE_STRIPE_PRICE_PRO_ANNUAL ? '✅ Present' : '❌ MISSING');
    console.log('[create-checkout-session] VITE_STRIPE_PRICE_PREMIUM:', process.env.VITE_STRIPE_PRICE_PREMIUM ? '✅ Present' : '❌ MISSING');
    console.log('[create-checkout-session] VITE_STRIPE_PRICE_PREMIUM_ANNUAL:', process.env.VITE_STRIPE_PRICE_PREMIUM_ANNUAL ? '✅ Present' : '❌ MISSING');
    console.log('[create-checkout-session] CHECKOUT_SUCCESS_URL:', process.env.CHECKOUT_SUCCESS_URL ? '✅ Present' : 'ℹ️ Using default');
    console.log('[create-checkout-session] CHECKOUT_CANCEL_URL:', process.env.CHECKOUT_CANCEL_URL ? '✅ Present' : 'ℹ️ Using default');
    console.log('[create-checkout-session] ====================================');

    // Validate Stripe key exists
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('[create-checkout-session] ❌ CRITICAL: STRIPE_SECRET_KEY not configured in Netlify environment variables');
      console.error('[create-checkout-session] Go to: Netlify Dashboard → Site Settings → Environment Variables');
      console.error('[create-checkout-session] Add: STRIPE_SECRET_KEY with value from Stripe Dashboard');
      return json(500, {
        error: "Payment system not configured. Please contact support.",
        type: "ConfigurationError"
      });
    }

    // Detect if using test or live mode (DO NOT print the actual key)
    const stripeKeyPrefix = process.env.STRIPE_SECRET_KEY.substring(0, 8);
    const isTestMode = stripeKeyPrefix.includes('test');
    const isLiveMode = stripeKeyPrefix.includes('live');
    console.log('[create-checkout-session] Stripe mode:', isTestMode ? '🧪 TEST MODE' : isLiveMode ? '🚀 LIVE MODE' : '⚠️ UNKNOWN');
    console.log('[create-checkout-session] Key prefix:', stripeKeyPrefix.replace(/_.*/, '_***')); // Show sk_test_*** or sk_live_***

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });

    // Parse request body safely
    let requestBody;
    try {
      requestBody = JSON.parse(event.body || "{}");

      // Log parsed body keys (WITHOUT logging any values that could be secrets)
      console.log('[create-checkout-session] ========== REQUEST PAYLOAD ==========');
      console.log('[create-checkout-session] Body keys present:', Object.keys(requestBody));
      console.log('[create-checkout-session] Has plan:', !!requestBody.plan);
      console.log('[create-checkout-session] Has interval:', !!requestBody.interval);
      console.log('[create-checkout-session] Has tier:', !!requestBody.tier);
      console.log('[create-checkout-session] Has priceId:', !!requestBody.priceId);
      console.log('[create-checkout-session] plan value:', requestBody.plan || 'undefined');
      console.log('[create-checkout-session] interval value:', requestBody.interval || 'undefined');
      console.log('[create-checkout-session] tier value:', requestBody.tier || 'undefined');
      console.log('[create-checkout-session] ====================================');

    } catch (parseErr) {
      console.error('[create-checkout-session] ❌ Invalid JSON in request body:', parseErr.message);
      return json(400, {
        error: "Invalid JSON in request body",
        type: "BadRequest",
        received: {
          bodyLength: event.body?.length || 0,
          bodyPreview: event.body?.substring(0, 100) || 'empty'
        }
      });
    }

    // NORMALIZE PAYLOAD - Accept 3 variants:
    // A) { plan: "pro"|"premium", interval: "monthly"|"annual" }
    // B) { tier: "pro_monthly"|"pro_annual"|"premium_monthly"|"premium_annual" }
    // C) { priceId: "price_..." }

    let plan = requestBody.plan;
    let interval = requestBody.interval;
    let priceId = requestBody.priceId;

    // Variant B: tier format
    if (!plan && requestBody.tier) {
      console.log('[create-checkout-session] Normalizing from tier format:', requestBody.tier);
      const tierMap = {
        'pro_monthly': { plan: 'pro', interval: 'monthly' },
        'pro_annual': { plan: 'pro', interval: 'annual' },
        'premium_monthly': { plan: 'premium', interval: 'monthly' },
        'premium_annual': { plan: 'premium', interval: 'annual' },
      };

      const normalized = tierMap[requestBody.tier];
      if (normalized) {
        plan = normalized.plan;
        interval = normalized.interval;
        console.log('[create-checkout-session] ✅ Normalized to:', { plan, interval });
      } else {
        console.error('[create-checkout-session] ❌ Invalid tier value:', requestBody.tier);
        return json(400, {
          error: `Invalid tier. Must be one of: ${Object.keys(tierMap).join(', ')}`,
          type: "BadRequest",
          received: {
            hasPlan: !!requestBody.plan,
            hasInterval: !!requestBody.interval,
            hasTier: !!requestBody.tier,
            hasPriceId: !!requestBody.priceId,
            tierValue: requestBody.tier
          }
        });
      }
    }

    // Variant C: Direct priceId override - skip plan/interval validation
    if (priceId && !plan) {
      console.log('[create-checkout-session] Using direct priceId override (no plan validation)');
      // We'll use the priceId directly below, set dummy values for logging
      plan = 'custom';
      interval = 'custom';
    }

    // Validate plan (unless using direct priceId)
    if (!priceId) {
      if (!plan) {
        console.error('[create-checkout-session] ❌ Missing required field: plan or priceId');
        return json(400, {
          error: "Missing required field: must provide either { plan, interval } or { tier } or { priceId }",
          type: "BadRequest",
          received: {
            hasPlan: !!requestBody.plan,
            hasInterval: !!requestBody.interval,
            hasTier: !!requestBody.tier,
            hasPriceId: !!requestBody.priceId
          }
        });
      }

      if (!["pro", "premium"].includes(plan)) {
        console.error('[create-checkout-session] ❌ Invalid plan value:', plan);
        return json(400, {
          error: "Invalid plan. Must be 'pro' or 'premium'.",
          type: "BadRequest",
          received: {
            hasPlan: !!requestBody.plan,
            hasInterval: !!requestBody.interval,
            hasTier: !!requestBody.tier,
            hasPriceId: !!requestBody.priceId,
            planValue: plan
          }
        });
      }
    }

    const billing = interval === "annual" ? "annual" : "monthly";
    console.log('[create-checkout-session] ✅ Plan configuration:', { plan, billing });

    // Select price ID based on plan and interval
    let selectedPriceId = priceId;
    let envVarName = '';

    if (!selectedPriceId) {
      console.log('[create-checkout-session] No priceId in request body, selecting from environment...');

      if (plan === "pro" && billing === "annual") {
        envVarName = 'VITE_STRIPE_PRICE_PRO_ANNUAL';
        selectedPriceId = process.env.VITE_STRIPE_PRICE_PRO_ANNUAL;
      } else if (plan === "pro") {
        envVarName = 'VITE_STRIPE_PRICE_PRO';
        selectedPriceId = process.env.VITE_STRIPE_PRICE_PRO;
      } else if (plan === "premium" && billing === "annual") {
        envVarName = 'VITE_STRIPE_PRICE_PREMIUM_ANNUAL';
        selectedPriceId = process.env.VITE_STRIPE_PRICE_PREMIUM_ANNUAL;
      } else {
        envVarName = 'VITE_STRIPE_PRICE_PREMIUM';
        selectedPriceId = process.env.VITE_STRIPE_PRICE_PREMIUM;
      }
      console.log('[create-checkout-session] Selected env var:', envVarName);
    } else {
      console.log('[create-checkout-session] ✅ Using priceId from request body:', selectedPriceId);
    }

    if (!selectedPriceId) {
      console.error('[create-checkout-session] ❌ CRITICAL: Price ID not configured');
      console.error('[create-checkout-session] Plan:', plan, '| Billing:', billing);
      console.error('[create-checkout-session] Looking for env var:', envVarName);
      console.error('[create-checkout-session] Value found:', selectedPriceId || 'EMPTY/UNDEFINED');
      console.error('[create-checkout-session] Fix: Go to Netlify → Environment Variables → Add', envVarName);
      return json(500, {
        error: `Price configuration missing for ${plan} ${billing}. Please contact support.`,
        type: "ConfigurationError",
        missingVar: envVarName
      });
    }

    console.log('[create-checkout-session] ✅ Using price ID:', selectedPriceId);

    const origin = getOrigin(event);

    // ALWAYS derive URLs from origin - ignore env vars to prevent misconfiguration
    const successUrl = `${origin}/billing/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${origin}/pricing?canceled=true`;

    console.log('[create-checkout-session] URLs configured:', { successUrl, cancelUrl });

    // Check if user is authenticated (optional - guest checkout is fully supported)
    const authHeader = event.headers.authorization || event.headers.Authorization;
    let userId = null;
    let existingCustomerId = null;
    let isGuestCheckout = true;

    if (authHeader) {
      try {
        // Validate Supabase env vars
        if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
          console.warn("[create-checkout-session] Supabase not configured, treating as guest");
        } else {
          const supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY,
            { auth: { persistSession: false } }
          );

          const token = authHeader.replace('Bearer ', '');
          const { data: { user }, error: authError } = await supabase.auth.getUser(token);

          if (authError) {
            console.log("[create-checkout-session] Auth error, proceeding as guest:", authError.message);
          } else if (user) {
            userId = user.id;
            isGuestCheckout = false;

            // Try to get existing Stripe customer ID
            const { data: profile } = await supabase
              .from('profiles')
              .select('stripe_customer_id')
              .eq('id', user.id)
              .maybeSingle();

            if (profile?.stripe_customer_id) {
              existingCustomerId = profile.stripe_customer_id;
              console.log("[create-checkout-session] Found existing customer ID");
            }
          }
        }
      } catch (authError) {
        console.log("[create-checkout-session] Auth token invalid or expired, proceeding as guest:", authError);
      }
    }

    console.log("[create-checkout-session] Creating session:", {
      plan,
      interval: billing,
      priceId: selectedPriceId,
      isGuestCheckout,
      userId: userId || 'guest',
      successUrl,
      cancelUrl,
      origin,
    });

    // Build checkout session config
    const sessionConfig = {
      mode: "subscription",
      line_items: [{ price: selectedPriceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      // Specify allowed payment methods explicitly
      payment_method_collection: 'always',
      payment_method_types: ['card'],
      automatic_tax: { enabled: false },
      metadata: {
        plan,
        interval: billing,
        guest_checkout: isGuestCheckout.toString(),
        ...(userId && { user_id: userId }),
      },
      subscription_data: {
        // No trial_period_days defined; subscriptions start immediately
        metadata: {
          plan,
          interval: billing,
          guest_checkout: isGuestCheckout.toString(),
          ...(userId && { user_id: userId }),
        },
      },
    };

    // If we have an existing customer, use it
    if (existingCustomerId) {
      sessionConfig.customer = existingCustomerId;
      console.log('[create-checkout-session] ✅ Using existing Stripe customer');
    } else {
      // For new customers, let Stripe collect email - NO EMAIL REQUIRED FROM FRONTEND
      console.log('[create-checkout-session] ℹ️ New customer - Stripe will collect email during checkout (no frontend email validation)');
      // Don't set customer_email - let Stripe prompt for it
      // Use client_reference_id to track guest checkouts
      sessionConfig.client_reference_id = userId || `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    console.log('[create-checkout-session] Creating Stripe checkout session...');
    const session = await stripe.checkout.sessions.create(sessionConfig);

    if (isGuestCheckout) {
      console.log("[create-checkout-session] ✅ GUEST checkout session created:", session.id);
    } else {
      console.log("[create-checkout-session] ✅ AUTHENTICATED checkout session created:", session.id);
    }

    return json(200, { url: session.url, sessionId: session.id });

  } catch (error) {
    // COMPREHENSIVE ERROR LOGGING
    console.error("[create-checkout-session] ❌ ============ ERROR OCCURRED ============");
    console.error("[create-checkout-session] Message:", error.message);
    console.error("[create-checkout-session] Type:", error.constructor?.name);
    console.error("[create-checkout-session] Stack:", error.stack);

    // Log Stripe-specific errors with enhanced diagnostics
    if (error.type) {
      console.error("[create-checkout-session] Stripe Error Type:", error.type);
      console.error("[create-checkout-session] Stripe Error Code:", error.code);
      console.error("[create-checkout-session] Stripe Error Param:", error.param);

      // Special handling for "No such price" errors
      if (error.message && error.message.includes("No such price")) {
        console.error("[create-checkout-session] ❌ PRICE NOT FOUND IN STRIPE DASHBOARD");

        // Detect key mode (DO NOT print the actual key)
        const stripeKey = process.env.STRIPE_SECRET_KEY || '';
        const keyMode = stripeKey.includes('sk_test') ? '🧪 TEST MODE' :
                       stripeKey.includes('sk_live') ? '🚀 LIVE MODE' :
                       '⚠️ UNKNOWN MODE';

        console.error("[create-checkout-session] Current Stripe key mode:", keyMode);
        console.error("[create-checkout-session]");
        console.error("[create-checkout-session] TROUBLESHOOTING STEPS:");
        console.error("[create-checkout-session]   1. Go to https://dashboard.stripe.com");
        console.error("[create-checkout-session]   2. Ensure you're in the correct mode (toggle Test/Live in top right)");
        console.error("[create-checkout-session]   3. Go to Products → Prices");
        console.error("[create-checkout-session]   4. Find the price for your plan and copy the price ID (starts with price_)");
        console.error("[create-checkout-session]   5. Go to Netlify → Site Settings → Environment Variables");
        console.error("[create-checkout-session]   6. Update the corresponding VITE_STRIPE_PRICE_* variable");
        console.error("[create-checkout-session]   7. Redeploy the site");
      }
    }

    // Return user-friendly error message
    let userMessage = error.message || "Failed to create checkout session";
    const statusCode = error.statusCode || 500;

    // Provide specific guidance for common errors
    if (userMessage.includes("No such price")) {
      userMessage = "Plan configuration error. The selected plan is not available. Please contact support.";
    } else if (userMessage.includes("API key") || userMessage.includes("api_key")) {
      userMessage = "Payment system authentication error. Please contact support.";
    } else if (userMessage.includes("authenticated") || userMessage.includes("authorization")) {
      userMessage = "Authentication error. Please try again.";
    } else if (userMessage.includes("Invalid")) {
      userMessage = "Invalid request. Please try again or contact support.";
    }

    console.error("[create-checkout-session] ❌ Returning error to client:", userMessage);
    console.error("[create-checkout-session] ❌ ==========================================");

    return json(statusCode, {
      error: userMessage,
      type: error.type || error.constructor?.name || 'Unknown',
      details: process.env.NODE_ENV === 'development' ? error.toString() : undefined
    });
  }
};
