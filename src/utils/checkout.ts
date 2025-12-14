export async function startTrialCheckout(plan: 'pro' | 'premium', btn?: HTMLButtonElement) {
  try {
    if (btn) {
      btn.disabled = true;
      btn.innerText = 'Redirecting...';
    }

    const res = await fetch('/.netlify/functions/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan }),
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const { url } = await res.json();
    if (!url) throw new Error('No checkout URL returned');
    window.location.href = url;
  } catch (err) {
    console.error(err);
    alert('Unable to start the free trial. Please check your internet or contact support.');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerText = plan === 'pro' ? 'Try Pro free for 14 days' : 'Try Premium free for 14 days';
    }
  }
}
