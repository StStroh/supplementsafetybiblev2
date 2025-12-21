import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Mail, Loader2, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { SUPPORT_EMAIL } from '../lib/support';
import { SITE_URL } from '../lib/siteUrl';

const RATE_LIMIT_SECONDS = 60;

export default function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [lastSentTime, setLastSentTime] = useState<number | null>(null);

  const urlParams = new URLSearchParams(window.location.search);
  const redirect = urlParams.get('redirect') || '/account';
  const prefillEmail = urlParams.get('email') || '';

  // Prefill email from URL param
  useEffect(() => {
    if (prefillEmail) {
      setEmail(prefillEmail);
    }
  }, [prefillEmail]);

  // Check if user is already logged in
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        console.info('[Auth] User already logged in, redirecting to:', redirect);
        window.location.href = redirect;
      }
    })();
  }, [redirect]);

  // Cooldown timer
  useEffect(() => {
    if (cooldownSeconds > 0) {
      const timer = setTimeout(() => {
        setCooldownSeconds(cooldownSeconds - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownSeconds]);

  // Check if still in cooldown period
  const isInCooldown = cooldownSeconds > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isInCooldown) {
      setError(`Please wait ${cooldownSeconds} seconds before requesting another email`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.info('[Auth] Attempting to send magic link to:', email);
      console.info('[Auth] Redirect URL:', `${SITE_URL}/auth/callback`);

      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${SITE_URL}/auth/callback`,
        },
      });

      if (signInError) {
        console.error('[Auth] Error sending magic link:', signInError);

        // User-friendly error messages
        let errorMessage = signInError.message;

        if (signInError.message.includes('rate')) {
          errorMessage = 'Too many attempts. Please try again in a few minutes.';
        } else if (signInError.message.includes('SMTP') || signInError.message.includes('email')) {
          errorMessage = 'We couldn\'t send your sign-in link. Please try again or use password sign-in.';
        } else if (signInError.message.includes('Invalid')) {
          errorMessage = 'Please enter a valid email address.';
        }

        setError(errorMessage);
        setLoading(false);
        return;
      }

      console.info('[Auth] Magic link sent successfully to:', email);

      // Set cooldown
      const now = Date.now();
      setLastSentTime(now);
      setCooldownSeconds(RATE_LIMIT_SECONDS);

      setSent(true);
    } catch (err) {
      console.error('[Auth] Unexpected error:', err);
      setError('An unexpected error occurred. Please try again or use password sign-in.');
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setSent(false);
    setError(null);
    // The form will handle the resend with rate limiting
    await handleSubmit(new Event('submit') as any);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
            <p className="text-gray-600 mb-2">
              We sent a sign-in link to <strong>{email}</strong>.
            </p>
            <p className="text-gray-600 mb-4">
              Click the link in the email to continue.
            </p>
          </div>

          {/* Help section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Email not arriving?</h3>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Check your spam or junk folder</li>
              <li>• Make sure {email} is correct</li>
              <li>• Wait a few minutes for delivery</li>
              <li>• Use "Resend Email" below if needed</li>
            </ul>
          </div>

          {/* Resend section */}
          {isInCooldown ? (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
              <Clock className="w-4 h-4" />
              <span>You can resend in {cooldownSeconds} seconds</span>
            </div>
          ) : (
            <button
              onClick={handleResend}
              disabled={loading}
              className="w-full bg-blue-100 text-blue-700 py-2 rounded-lg font-medium hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition mb-4"
            >
              {loading ? 'Sending...' : 'Resend Email'}
            </button>
          )}

          {/* Alternative auth option */}
          <div className="border-t pt-4">
            <p className="text-center text-sm text-gray-600 mb-3">
              Having trouble with magic links?
            </p>
            <button
              onClick={() => navigate('/auth/password')}
              className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Sign in with password instead
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 mt-4">
            You can close this window and check your email now
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
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-red-700">{error}</p>
                  {error.includes('couldn\'t send') && (
                    <button
                      onClick={() => navigate('/auth/password')}
                      className="text-sm text-red-600 underline mt-1 hover:text-red-800"
                    >
                      Try password sign-in instead
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {isInCooldown && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-700">
                  Please wait {cooldownSeconds} seconds before requesting another email
                </p>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !email || isInCooldown}
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

        {/* Alternative: Password sign-in */}
        <div className="mt-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/auth/password')}
            className="mt-4 w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Sign in with password
          </button>
        </div>

        <div className="mt-6 space-y-3">
          <p className="text-center text-sm text-gray-500">
            By signing in, you agree to our{' '}
            <a href="/terms" className="text-blue-600 hover:underline">
              Terms
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </p>
          <p className="text-center text-sm text-gray-500">
            For account issues, email{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-600 hover:underline">
              {SUPPORT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
