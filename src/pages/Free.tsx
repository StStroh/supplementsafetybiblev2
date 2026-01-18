import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Free() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please enter your name.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/.netlify/functions/free-ok', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed })
      });

      let data: any = {};
      try { data = await res.json(); } catch {}

      if (!res.ok || data?.error) {
        const msg = data?.error?.message || data?.error || `HTTP ${res.status}`;
        setError(String(msg));
        setLoading(false);
        return;
      }

      localStorage.setItem('free_active', 'true');
      setError(null);
      navigate('/free/thanks');
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 text-center">Get Free Access</h1>
        <p className="mt-2 text-center text-gray-600">
          Enter your name to activate your free plan instantly.
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Jane Doe"
          />

          {error && (
            <div className="mt-3 text-sm text-red-600">{String(error)}</div>
          )}

          <button
            type="submit"
            disabled={loading || name.trim().length < 1}
            className={`
              w-full h-14 mt-6
              ${loading || name.trim().length < 1 ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}
              text-white text-lg font-semibold
              rounded-xl shadow-md transition duration-200
              disabled:cursor-not-allowed
            `}
            style={{ touchAction: 'manipulation' }}
          >
            {loading ? 'Activating…' : 'Enter'}
          </button>

          <p className="mt-3 text-xs text-gray-500 text-center">
            By continuing you agree to our Terms & Privacy.
          </p>
        </form>
      </div>
    </div>
  );
}
