/*
 * Stripe Checkout Session Verification (Read-Only)
 *
 * Lightweight verification endpoint for /billing/success page.
 * Returns session payment status and customer email for UI display.
 *
 * IMPORTANT: This is READ-ONLY. Access provisioning is handled by:
 * 1) stripe-webhook.cjs (primary, failsafe)
 * 2) billing-success.cjs (secondary, immediate)
 *
 * This endpoint only retrieves and returns Stripe session data.
 * Multiple calls are safe (idempotent).
 */
const Stripe = require("stripe");

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
    body: JSON.stringify(body),
  };
}

function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return json(200, { ok: true });
  }

  // Only allow GET
  if (event.httpMethod !== "GET") {
    return json(405, {
      ok: false,
      error: "Method not allowed. Use GET."
    });
  }

  const params = event.queryStringParameters || {};
  const sessionId = params.session_id;

  // Production-safe logging (no secrets, no PII)
  const sessionPrefix = sessionId ? sessionId.substring(0, 8) : 'none';
  console.log('[stripe-verify-session] Request:', { session_prefix: sessionPrefix });

  // Validate session_id parameter
  if (!sessionId) {
    console.error('[stripe-verify-session] Missing session_id');
    return json(400, {
      ok: false,
      error: "Missing session_id"
    });
  }

  // Validate Stripe configuration
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('[stripe-verify-session] STRIPE_SECRET_KEY not configured');
    return json(500, {
      ok: false,
      error: "Payment system not configured"
    });
  }

  try {
    // Detect key mode for validation (prevent test/live mismatch)
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const keyMode = stripeKey.startsWith('sk_test') ? 'test' :
                   stripeKey.startsWith('sk_live') ? 'live' : 'unknown';
    const sessionMode = sessionId.startsWith('cs_test_') ? 'test' :
                       sessionId.startsWith('cs_live_') ? 'live' : 'unknown';

    // Log mode check (production-safe)
    console.log('[stripe-verify-session] Mode:', { key: keyMode, session: sessionMode });

    // Validate mode match
    if (keyMode !== 'unknown' && sessionMode !== 'unknown' && keyMode !== sessionMode) {
      console.error('[stripe-verify-session] Mode mismatch');
      return json(400, {
        ok: false,
        error: "Session mode mismatch with API key"
      });
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2024-06-20",
    });

    // Retrieve session with expanded data
    console.log('[stripe-verify-session] Retrieving:', sessionPrefix + '...');

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription', 'customer'],
    });

    if (!session) {
      console.error('[stripe-verify-session] Session not found');
      return json(404, {
        ok: false,
        error: "Session not found"
      });
    }

    // Extract session data
    const email = session.customer_details?.email || null;
    const paid = session.payment_status === 'paid';
    const status = session.status;
    const paymentStatus = session.payment_status;
    const subscriptionStatus = typeof session.subscription === 'object'
      ? session.subscription?.status
      : null;

    // Production-safe logging (no PII)
    console.log('[stripe-verify-session] Result:', {
      prefix: sessionPrefix + '...',
      status,
      payment_status: paymentStatus,
      subscription_status: subscriptionStatus || 'none',
      email_present: !!email,
      paid,
    });

    // Validate email format if present
    if (email && !isValidEmail(email)) {
      console.warn('[stripe-verify-session] Invalid email format');
      // Return null email if invalid format
      return json(200, {
        ok: true,
        paid,
        email: null,
        status,
        payment_status: paymentStatus,
        subscription_status: subscriptionStatus,
      });
    }

    // Return verification result (read-only, no side effects)
    return json(200, {
      ok: true,
      paid,
      email,
      status,
      payment_status: paymentStatus,
      subscription_status: subscriptionStatus,
    });

  } catch (error) {
    // Log error without exposing sensitive data
    console.error('[stripe-verify-session] Error:', {
      message: error.message,
      type: error.type || error.constructor?.name,
      code: error.code,
    });

    // Handle Stripe-specific errors
    if (error.type === 'StripeInvalidRequestError') {
      return json(400, {
        ok: false,
        error: "Invalid session ID"
      });
    }

    if (error.type === 'StripeAuthenticationError') {
      return json(500, {
        ok: false,
        error: "Payment system authentication error"
      });
    }

    // Generic error response
    return json(500, {
      ok: false,
      error: error.message || "Verification failed"
    });
  }
};
