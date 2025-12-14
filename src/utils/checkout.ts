export async function startTrialCheckout(plan: "pro" | "premium") {
  try {
    const btn = document.activeElement as HTMLButtonElement | null;
    if (btn) btn.disabled = true;
    const res = await fetch("/.netlify/functions/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    const { url } = await res.json();
    if (!url) throw new Error("No checkout URL from server");
    window.location.href = url;
  } catch (err: any) {
    console.error("startTrialCheckout error:", err);
    alert(err?.message || "Could not start the free trial. Please try again or contact support.");
  }
}
