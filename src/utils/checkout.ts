export async function startTrialCheckout(plan: "pro" | "premium") {
  try {
    const btn = document.activeElement as HTMLButtonElement | null;
    if (btn) btn.disabled = true;
    const res = await fetch("/.netlify/functions/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    if (!res.ok) throw new Error(await res.text());
    const { url } = await res.json();
    if (!url) throw new Error("No checkout URL");
    window.location.href = url;
  } catch (e) {
    console.error(e);
    alert("Could not start the free trial. Please try again or contact support.");
  }
}
