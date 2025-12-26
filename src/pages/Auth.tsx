import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Mail, Loader2, CheckCircle, AlertCircle, Clock, Copy, Info } from 'lucide-react';
import { SUPPORT_EMAIL } from '../lib/support';
import { SITE_URL } from '../lib/siteUrl';

const RATE_LIMIT_SECONDS = 30;
const ENABLE_MAGIC_LINK = import.meta.env.VITE_AUTH_ENABLE_MAGIC_LINK !== 'false';
const ENABLE_PASSWORD = import.meta.env.VITE_AUTH_ENABLE_PASSWORD !== 'false';

interface DebugInfo {
  timestamp: string;
  email: string;
  emailDomain: string;
  redirectUrl: string;
  error: string | null;
  success: boolean;
  rateLimited: boolean;
}

export default function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [copied, setCopied] = useState(false);
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const next = urlParams.get('next');
  const resumeCheck = urlParams.get('resumeCheck');
  const redirect = next || urlParams.get('redirect') || '/account';
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
        const finalUrl = resumeCheck ? `${redirect}?resumeCheck=true` : redirect;
        window.location.href = finalUrl;
      }
    })();
  }, [redirect, resumeCheck]);

  // Cooldown timer
  useEffect(() => {
    if (cooldownSeconds > 0) {
      const timer = setTimeout(() => {
        setCooldownSeconds(cooldownSeconds - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownSeconds]);

  const isInCooldown = cooldownSeconds > 0;

  // Get email domain for diagnostics
  const getEmailDomain = (email: string): string => {
    const parts = email.split('@');
    return parts.length === 2 ? parts[1].toLowerCase() : '';
  };

  // Check if email is from problematic provider
  const isProblematicProvider = (email: string): boolean => {
    const domain = getEmailDomain(email);
    return ['msn.com', 'outlook.com', 'hotmail.com', 'live.com'].includes(domain);
  };

  // Validate email format
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (isInCooldown) {
      setError(`Please wait ${cooldownSeconds} seconds before requesting another email`);
      return;
    }

    setLoading(true);
    setError(null);

    const nextUrl = redirect || '/welcome';
    let callbackUrl = `${SITE_URL}/auth/callback?next=${encodeURIComponent(nextUrl)}`;
    if (resumeCheck) {
      callbackUrl += '&resumeCheck=true';
    }
    const redirectUrl = callbackUrl;
    const emailDomain = getEmailDomain(email);
    const timestamp = new Date().toISOString();

    try {
      console.info('[Auth] Attempting to send magic link to:', email);
      console.info('[Auth] Email domain:', emailDomain);
      console.info('[Auth] Redirect URL:', redirectUrl);
      console.info('[Auth] Next URL:', nextUrl);
      console.info('[Auth] Timestamp:', timestamp);

      const { data, error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      // Store debug info
      const debug: DebugInfo = {
        timestamp,
        email,
        emailDomain,
        redirectUrl,
        error: signInError?.message || null,
        success: !signInError,
        rateLimited: signInError?.message?.includes('rate') || false,
      };
      setDebugInfo(debug);

      console.info('[Auth] Response data:', data);
      console.info('[Auth] Response error:', signInError);

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
      setCooldownSeconds(RATE_LIMIT_SECONDS);
      setSent(true);
      setLoading(false);
    } catch (err) {
      console.error('[Auth] Unexpected error:', err);

      const debug: DebugInfo = {
        timestamp,
        email,
        emailDomain,
        redirectUrl,
        error: err instanceof Error ? err.message : 'Unknown error',
        success: false,
        rateLimited: false,
      };
      setDebugInfo(debug);

      setError('An unexpected error occurred. Please try again or use password sign-in.');
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setSent(false);
    setError(null);
    await handleSubmit(new Event('submit') as any);
  };

  const copyDebugInfo = () => {
    if (!debugInfo) return;

    const debugText = `
=== SUPPLEMENT SAFETY BIBLE AUTH DEBUG INFO ===
Timestamp: ${debugInfo.timestamp}
Email: ${debugInfo.email}
Email Domain: ${debugInfo.emailDomain}
Redirect URL: ${debugInfo.redirectUrl}
Success: ${debugInfo.success}
Error: ${debugInfo.error || 'None'}
Rate Limited: ${debugInfo.rateLimited}
Browser: ${navigator.userAgent}
===========================================
    `.trim();

    navigator.clipboard.writeText(debugText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // If magic link is disabled, redirect to password auth
  if (!ENABLE_MAGIC_LINK && ENABLE_PASSWORD) {
    useEffect(() => {
      navigate('/auth/password');
    }, []);
    return null;
  }

  if (sent) {
    const isOutlook = isProblematicProvider(email);

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

          {/* Outlook/MSN Warning */}
          {isOutlook && (
            <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-amber-900 mb-1">Outlook/MSN/Hotmail User?</h3>
                  <p className="text-xs text-amber-800">
                    Microsoft email services sometimes filter or delay authentication emails.
                    Check your <strong>Junk</strong> folder and wait 2-3 minutes.
                    Consider using Gmail or another provider if issues persist.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Troubleshooting */}
          <div className="mb-4">
            <button
              onClick={() => setShowTroubleshooting(!showTroubleshooting)}
              className="w-full flex items-center justify-between text-left px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
            >
              <span className="text-sm font-semibold text-blue-900">
                Email not arriving? Click for help
              </span>
              <Info className="w-4 h-4 text-blue-600" />
            </button>

            {showTroubleshooting && (
              <div className="mt-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">Troubleshooting Steps</h3>
                <ul className="text-xs text-blue-800 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">1.</span>
                    <span>Check your <strong>spam</strong> or <strong>junk</strong> folder</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">2.</span>
                    <span>Verify {email} is spelled correctly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">3.</span>
                    <span>Wait 2-5 minutes for delivery (email can be slow)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">4.</span>
                    <span>Search your inbox for "supplementsafetybible" or "supabase"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">5.</span>
                    <span>If using Outlook/MSN/Hotmail, check "Other" or "Focused" tabs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">6.</span>
                    <span>Try a Gmail address if your provider blocks authentication emails</span>
                  </li>
                </ul>

                {debugInfo && (
                  <div className="mt-3 pt-3 border-t border-blue-300">
                    <button
                      onClick={copyDebugInfo}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-xs font-medium"
                    >
                      <Copy className="w-4 h-4" />
                      {copied ? 'Copied!' : 'Copy debug info for support'}
                    </button>
                    <p className="text-xs text-blue-700 mt-2">
                      If you contact support, include this debug info to help us diagnose the issue.
                    </p>
                  </div>
                )}
              </div>
            )}
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
          {ENABLE_PASSWORD && (
            <div className="border-t pt-4">
              <p className="text-center text-sm text-gray-600 mb-3">
                Having trouble with magic links?
              </p>
              <button
                onClick={() => navigate(`/auth/password?email=${encodeURIComponent(email)}`)}
                className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Sign in with password instead
              </button>
            </div>
          )}

          <p className="text-center text-xs text-gray-500 mt-4">
            You can close this window and check your email now
          </p>
        </div>
      </div>
    );
  }

  const isOutlookEmail = isProblematicProvider(email);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <Mail className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in to your account</h2>
          <p className="text-gray-600">Enter your email to continue</p>
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

          {/* Outlook warning */}
          {isOutlookEmail && email.length > 5 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> Outlook/MSN/Hotmail sometimes delays or filters authentication emails.
                    We recommend using Gmail or trying password sign-in below.
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-red-700">{error}</p>
                  {(error.includes('couldn\'t send') && ENABLE_PASSWORD) && (
                    <button
                      type="button"
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
        {ENABLE_PASSWORD && (
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
              onClick={() => navigate(`/auth/password${email ? `?email=${encodeURIComponent(email)}` : ''}`)}
              className="mt-4 w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Sign in with password
            </button>
          </div>
        )}

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
