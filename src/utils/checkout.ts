import { supabase } from "../lib/supabase";

type Plan = "pro" | "premium";
type Interval = "monthly" | "annual";

export async function startTrialCheckout(plan: Plan, interval: Interval) {
  const bill = interval === "annual" ? "annual" : "monthly";

  const btn = document.activeElement as HTMLButtonElement | null;
  try {
    if (btn) {
      btn.disabled = true;
      btn.setAttribute("aria-busy", "true");
    }

    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    const res = await fetch("/.netlify/functions/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ plan, cadence: bill }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Checkout failed: HTTP ${res.status} – ${text}`);
    }

    const { url } = await res.json();
    if (!url) throw new Error("Server did not return a checkout URL");
    window.location.href = url;
  } catch (err: any) {
    console.error("startTrialCheckout error:", err);
    const msg = String(err?.message || "");
    if (msg.includes("401") || msg.toLowerCase().includes("unauth")) {
      alert("Please sign in to start your free trial.");
      return;
    }
    alert("Could not start the free trial. Please try again or contact support.");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.removeAttribute("aria-busy");
    }
  }
}
