import { supabase } from '../lib/supabase';

export async function startTrialCheckout(
  plan: 'pro' | 'premium',
  btn?: HTMLButtonElement
): Promise<void> {
  try {
    if (btn) btn.disabled = true;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      window.location.href = '/auth?redirect=/pricing';
      return;
    }

    const res = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({ plan })
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: { message: 'Unknown error' } }));
      throw new Error(errorData.error?.message || 'Failed to create checkout session');
    }

    const { url } = await res.json();
    if (url) {
      window.location.href = url;
    } else {
      throw new Error('No checkout URL returned');
    }
  } catch (err) {
    console.error('Checkout error:', err);
    alert('Could not start the free trial. Please try again or contact support.');
  } finally {
    if (btn) btn.disabled = false;
  }
}
