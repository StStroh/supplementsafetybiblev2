/*
 * Guest Checkout - NO AUTH REQUIRED
 * Direct to Stripe, no email validation, no forced login
 * Stripe collects email during checkout
 */

type Plan = "pro" | "premium";
type Interval = "monthly" | "annual";

function getFunctionsBaseUrl(): string {
  return "";
}

function isValidPlan(plan: string): plan is Plan {
  return plan === "pro" || plan === "premium";
}

function isValidInterval(interval: string): interval is Interval {
  return interval === "monthly" || interval === "annual";
}

export async function startCheckout(
  plan: Plan,
  interval: Interval,
  onError?: (message: string, type?: 'error' | 'success') => void
): Promise<void> {
  const btn = document.activeElement as HTMLButtonElement | null;

  try {
    // Validate inputs
    if (!isValidPlan(plan)) {
      throw new Error(`Invalid plan: ${plan}`);
    }
    if (!isValidInterval(interval)) {
      throw new Error(`Invalid interval: ${interval}`);
    }

    if (btn) {
      btn.disabled = true;
      btn.setAttribute("aria-busy", "true");
      const originalText = btn.textContent;
      btn.textContent = "Redirecting to checkout...";
      btn.dataset.originalText = originalText || "";
    }

    const baseUrl = getFunctionsBaseUrl();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // Increased to 20s

    // Try to get auth token if user is logged in (optional)
    let authToken: string | null = null;
    try {
      const { supabase } = await import('../lib/supabase');
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        authToken = session.access_token;
        console.log("[checkout] Authenticated checkout - token found");
      } else {
        console.log("[checkout] Guest checkout - no auth token");
      }
    } catch (err) {
      console.log("[checkout] Could not get auth token, proceeding as guest");
    }

    console.log("[checkout] Starting checkout:", { plan, interval, authenticated: !!authToken });

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      // Add Authorization header only if user is logged in
      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      const requestUrl = `${baseUrl}/.netlify/functions/create-checkout-session`;
      const payload = { plan, interval };

      console.log("[checkout] ========== CHECKOUT REQUEST ==========");
      console.log("[checkout] URL:", requestUrl);
      console.log("[checkout] Method: POST");
      console.log("[checkout] POST checkout payload:", payload);
      console.log("[checkout] Headers:", Object.keys(headers));
      console.log("[checkout] ===========================================");

      const res = await fetch(requestUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log("[checkout] Response received - status:", res.status);
      console.log("[checkout] Response ok:", res.ok);

      if (!res.ok) {
        let errorMessage = `Checkout failed (HTTP ${res.status})`;
        try {
          const errorData = await res.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
          console.error("[checkout] Error response:", errorData);
        } catch (parseError) {
          const text = await res.text();
          console.error("[checkout] Error text:", text);
          errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await res.json();
      console.log("[checkout] Success:", data);

      if (!data.url) {
        throw new Error("Server did not return a checkout URL");
      }

      // Extract session_id from Stripe checkout URL and store in localStorage for recovery
      try {
        const checkoutUrl = new URL(data.url);
        // Stripe checkout URLs have format: https://checkout.stripe.com/c/pay/cs_test_...
        // The session ID is in the path after /pay/
        const pathParts = checkoutUrl.pathname.split('/');
        const sessionId = pathParts[pathParts.length - 1];
        if (sessionId && sessionId.startsWith('cs_')) {
          localStorage.setItem('last_checkout_session_id', sessionId);
          console.log("[checkout] Stored session_id in localStorage for recovery");
        }
      } catch (urlError) {
        console.warn("[checkout] Could not extract session_id from URL:", urlError);
      }

      console.log("[checkout] Redirecting to:", data.url);

      // Small delay to ensure console logs are visible
      setTimeout(() => {
        window.location.href = data.url;
      }, 100);

      // Note: Loading state will remain active until redirect completes
      // This is intentional - user should see "Redirecting..." until navigation happens

    } catch (fetchErr: any) {
      clearTimeout(timeoutId);

      if (fetchErr.name === 'AbortError') {
        throw new Error("Request timed out after 20 seconds. Please check your connection and try again.");
      }

      throw fetchErr;
    }

  } catch (err: any) {
    console.error("[checkout] Error:", err);

    // Ensure error message is always a string
    const errorMsg = err?.message || "Could not start checkout. Please try again.";

    // Call error handler with safe message
    if (onError) {
      try {
        onError(errorMsg, 'error');
      } catch (handlerErr) {
        console.error("[checkout] Error handler failed:", handlerErr);
        // Fallback to alert if error handler crashes
        alert(errorMsg);
      }
    } else {
      alert(errorMsg);
    }

    // Reset button state safely
    if (btn) {
      try {
        btn.disabled = false;
        btn.removeAttribute("aria-busy");
        btn.textContent = btn.dataset.originalText || "Try Again";
      } catch (btnErr) {
        console.error("[checkout] Failed to reset button:", btnErr);
      }
    }

    // Re-throw error to be caught by parent try/catch in Pricing.tsx
    throw err;
  }
}

// Legacy alias for backward compatibility
export const startTrialCheckout = startCheckout;
