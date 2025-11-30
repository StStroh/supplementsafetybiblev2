import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Free() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName && !trimmedEmail) {
      setMsg({ type: 'error', text: 'Enter your name or email to continue.' });
      return;
    }

    setLoading(true);
    try {
      const ping = await fetch('/.netlify/functions/grant-free', { method: 'GET' });
      const pingJson = await ping.json().catch(() => ({} as any));
      if (!ping.ok) {
        throw new Error('Server unavailable. Try again in a minute.');
      }
      if (pingJson?.env?.service_role_key === 'missing') {
        throw new Error('Server is misconfigured: service key missing.');
      }

      const res = await fetch('/.netlify/functions/grant-free', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmedName, email: trimmedEmail || undefined })
      });

      const data = await res.json().catch(() => ({} as any));

      if (!res.ok || !data?.ok) {
        const detail = data?.detail || data?.error || 'Unknown error';
        throw new Error(typeof detail === 'string' ? detail : 'Activation failed');
      }

      setMsg({ type: 'success', text: "You're in. Free plan activated." });
      setTimeout(() => navigate('/account'), 600);
    } catch (err: any) {
      setMsg({ type: 'error', text: err?.message || 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Don't Mix Blind</h1>
          <p className="text-sm text-gray-600 mt-2">
            Instant free access to our interaction checker.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-white/70 backdrop-blur rounded-2xl border border-gray-200 p-6 shadow-sm"
        >
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Your name
          </label>
          <input
            type="text"
            inputMode="text"
            autoComplete="name"
            placeholder="e.g., Stefan"
            className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Email (optional)
            </label>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="mt-2 text-xs text-gray-500">
              Use email for account recovery and receipts. You can skip it.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ touchAction: 'manipulation' }}
            className={[
              'w-full h-14 mt-6 rounded-xl text-white text-lg font-semibold shadow-md transition duration-200',
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            ].join(' ')}
          >
            {loading ? 'Activating…' : 'Enter'}
          </button>

          {msg && (
            <div
              className={`mt-4 rounded-lg px-4 py-3 text-sm ${
                msg.type === 'error'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}
            >
              {msg.text}
            </div>
          )}

          <p className="mt-4 text-[11px] text-gray-500 text-center">
            By continuing you accept our{' '}
            <a className="underline" href="/terms">Terms</a> and{' '}
            <a className="underline" href="/privacy">Privacy Policy</a>.
          </p>
        </form>
      </div>
    </div>
  );
}
