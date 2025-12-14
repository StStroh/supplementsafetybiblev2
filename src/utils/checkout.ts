import { supabase } from "../lib/supabase";

type Plan = "pro" | "premium";
type Interval = "monthly" | "annual";

function getFunctionsBaseUrl(): string {
  const h = window.location.hostname;
  const isProd = h === "supplementsafetybible.com" || h.endsWith(".netlify.app");
  return isProd ? "" : "https://supplementsafetybible.com";
}

export async function startTrialCheckout(plan: Plan, interval: Interval, showAlert?: (message: string, type?: "error" | "success") => void) {
  const bill = interval === "annual" ? "annual" : "monthly";

  const btn = document.activeElement as HTMLButtonElement | null;
  try {
    if (btn) {
      btn.disabled = true;
      btn.setAttribute("aria-busy", "true");
    }

    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    const baseUrl = getFunctionsBaseUrl();
    const res = await fetch(`${baseUrl}/.netlify/functions/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ plan, cadence: bill }),
    });

    if (!res.ok) {
      const text = await res.text();
      if (res.status === 404) {
        throw new Error("Preview mode can't reach local functions; using live endpoint.");
      }
      if (res.status === 401) {
        throw new Error("Please sign in to start a trial.");
      }
      throw new Error(`Checkout failed: HTTP ${res.status} – ${text}`);
    }

    const { url } = await res.json();
    if (!url) throw new Error("Server did not return a checkout URL");
    window.location.href = url;
  } catch (err: any) {
    console.error("startTrialCheckout error:", err);
    const msg = String(err?.message || "");
    if (msg.includes("401") || msg.toLowerCase().includes("unauth")) {
      const errorMsg = "Please sign in to start your free trial.";
      if (showAlert) {
        showAlert(errorMsg, "error");
      } else {
        alert(errorMsg);
      }
      return;
    }
    const errorMsg = "Could not start the free trial. Please try again or contact support.";
    if (showAlert) {
      showAlert(errorMsg, "error");
    } else {
      alert(errorMsg);
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.removeAttribute("aria-busy");
    }
  }
}
