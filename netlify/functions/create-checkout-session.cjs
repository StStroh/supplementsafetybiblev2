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
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });

    const { plan, interval, priceId } = JSON.parse(event.body || "{}");

    if (!plan || !["pro", "premium"].includes(plan)) {
      return json(400, { error: "Invalid plan. Must be 'pro' or 'premium'." });
    }

    const billing = interval === "annual" ? "annual" : "monthly";

    // Select price ID based on plan and interval
    let selectedPriceId = priceId;
    if (!selectedPriceId) {
      if (plan === "pro" && billing === "annual") {
        selectedPriceId = process.env.VITE_STRIPE_PRICE_PRO_ANNUAL;
      } else if (plan === "pro") {
        selectedPriceId = process.env.VITE_STRIPE_PRICE_PRO;
      } else if (plan === "premium" && billing === "annual") {
        selectedPriceId = process.env.VITE_STRIPE_PRICE_PREMIUM_ANNUAL;
      } else {
        selectedPriceId = process.env.VITE_STRIPE_PRICE_PREMIUM;
      }
    }

    if (!selectedPriceId) {
      return json(500, { error: `Price ID not configured for ${plan} ${billing}` });
    }

    const origin = getOrigin(event);

    // Use env vars with fallbacks
    const successUrl = process.env.CHECKOUT_SUCCESS_URL ||
      `${origin}/billing/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = process.env.CHECKOUT_CANCEL_URL ||
      `${origin}/billing/cancel`;

    // Check if user is authenticated (optional)
    const authHeader = event.headers.authorization || event.headers.Authorization;
    let userId = null;
    let existingCustomerId = null;
    let isGuestCheckout = true;

    if (authHeader) {
      try {
        const supabase = createClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY,
          { auth: { persistSession: false } }
        );

        const token = authHeader.replace('Bearer ', '');
        const { data: { user } } = await supabase.auth.getUser(token);

        if (user) {
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
          }
        }
      } catch (authError) {
        console.log("[create-checkout-session] Auth token invalid or expired, proceeding as guest");
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
      // Enable ALL automatic payment methods (Amazon Pay, Cash App, Klarna, Link, etc.)
      // DO NOT specify payment_method_types - let Stripe automatically show all supported methods
      payment_method_collection: 'always',
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'always', // Required for Amazon Pay and other redirect-based methods
      },
      automatic_tax: { enabled: false },
      metadata: {
        plan,
        interval: billing,
        guest_checkout: isGuestCheckout.toString(),
        ...(userId && { user_id: userId }),
      },
      subscription_data: {
        trial_period_days: parseInt(process.env.TRIAL_DAYS_PRO || "14"),
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
    } else {
      // For new customers, let Stripe collect email
      sessionConfig.customer_email = null; // Stripe will prompt for email
      // Use client_reference_id to track guest checkouts
      sessionConfig.client_reference_id = userId || `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    if (isGuestCheckout) {
      console.log("[create-checkout-session] ✅ GUEST checkout session created:", session.id);
    } else {
      console.log("[create-checkout-session] ✅ AUTHENTICATED checkout session created:", session.id);
    }

    return json(200, { url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("[create-checkout-session] Error:", error);
    return json(500, {
      error: error.message || "Failed to create checkout session",
      details: error.toString()
    });
  }
};
