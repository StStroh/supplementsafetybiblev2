import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Loader2, CheckCircle } from 'lucide-react';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const urlParams = new URLSearchParams(window.location.search);
  const redirect = urlParams.get('redirect') || '/account';

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        console.info('[Auth] User already logged in, redirecting to:', redirect);
        window.location.href = redirect;
      }
    })();
  }, [redirect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}${redirect}`,
        },
      });

      if (signInError) {
        console.error('[Auth] Error sending magic link:', signInError);
        setError(signInError.message);
        setLoading(false);
        return;
      }

      console.info('[Auth] Magic link sent to:', email);
      setSent(true);
    } catch (err) {
      console.error('[Auth] Unexpected error:', err);
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
          <p className="text-gray-600 mb-6">
            We sent a sign-in link to <strong>{email}</strong>. Click the link in the email to continue.
          </p>
          <p className="text-sm text-gray-500">
            You can close this window and check your email now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <Mail className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in to your account</h2>
          <p className="text-gray-600">Enter your email to receive a magic sign-in link</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Sending link...
              </>
            ) : (
              'Send me a sign-in link'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          By signing in, you agree to our{' '}
          <a href="/terms" className="text-blue-600 hover:underline">
            Terms
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
