/*
 * Guest Checkout - NO AUTH REQUIRED
 * Direct to Stripe, no forced login
 */

type Plan = "pro" | "premium";
type Interval = "monthly" | "annual";

function getFunctionsBaseUrl(): string {
  return "";
}

export async function startCheckout(
  plan: Plan,
  interval: Interval,
  onError?: (message: string) => void
): Promise<void> {
  const btn = document.activeElement as HTMLButtonElement | null;

  try {
    if (btn) {
      btn.disabled = true;
      btn.setAttribute("aria-busy", "true");
      const originalText = btn.textContent;
      btn.textContent = "Redirecting to checkout...";
      btn.dataset.originalText = originalText || "";
    }

    const baseUrl = getFunctionsBaseUrl();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    console.log("[checkout] Starting checkout:", { plan, interval });

    try {
      const res = await fetch(`${baseUrl}/.netlify/functions/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan, interval }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log("[checkout] Response status:", res.status);

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

      window.location.href = data.url;

    } catch (fetchErr: any) {
      clearTimeout(timeoutId);

      if (fetchErr.name === 'AbortError') {
        throw new Error("Request timed out after 15 seconds. Please try again.");
      }

      throw fetchErr;
    }

  } catch (err: any) {
    console.error("[checkout] Error:", err);

    const errorMsg = err?.message || "Could not start checkout. Please try again.";

    if (onError) {
      onError(errorMsg);
    } else {
      alert(errorMsg);
    }

    if (btn) {
      btn.disabled = false;
      btn.removeAttribute("aria-busy");
      btn.textContent = btn.dataset.originalText || "Try Again";
    }
  }
}

// Legacy alias for backward compatibility
export const startTrialCheckout = startCheckout;
