import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CheckCircle, AlertTriangle, Loader2, ArrowLeft } from 'lucide-react';

type AuthState = 'loading' | 'success' | 'error' | 'no_session';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [state, setState] = useState<AuthState>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        console.info('[AuthCallback] Processing authentication callback...');

        // Get the 'next' redirect parameter from URL
        const urlParams = new URLSearchParams(window.location.search);
        const nextUrl = urlParams.get('next') || '/welcome';
        console.info('[AuthCallback] Next URL:', nextUrl);

        // Wait a moment for Supabase to fully process the auth exchange
        await new Promise(resolve => setTimeout(resolve, 500));

        // First, try to get the session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        console.info('[AuthCallback] Session data:', sessionData);
        console.info('[AuthCallback] Session error:', sessionError);

        if (sessionError) {
          console.error('[AuthCallback] Error getting session:', sessionError);
          setState('error');
          setErrorMessage(
            sessionError.message || 'Failed to establish session'
          );
          return;
        }

        const token = sessionData.session?.access_token;

        if (!token) {
          console.warn('[AuthCallback] No session token found');

          // Check if there's a hash in the URL (magic link)
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const errorDescription = hashParams.get('error_description');
          const error = hashParams.get('error');

          if (error || errorDescription) {
            console.error('[AuthCallback] Auth error in URL:', error, errorDescription);
            setState('error');

            // Parse specific error messages
            if (errorDescription?.includes('expired')) {
              setErrorMessage('This sign-in link has expired. Please request a new one.');
            } else if (errorDescription?.includes('already been used')) {
              setErrorMessage('This sign-in link has already been used. Please request a new one.');
            } else if (errorDescription?.includes('invalid')) {
              setErrorMessage('This sign-in link is invalid or has been revoked.');
            } else {
              setErrorMessage(errorDescription || error || 'Authentication failed');
            }
          } else {
            setState('no_session');
            setErrorMessage('No active session found. The link may have expired.');
          }
          return;
        }

        console.info('[AuthCallback] Valid session found, activating account...');
        setState('loading');

        // Try to activate free tier
        try {
          const res = await fetch('/.netlify/functions/grant-free', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` }
          });

          console.info('[AuthCallback] Free tier activation response:', res.status);

          if (res.ok) {
            setState('success');
            setShowToast(true);

            // Try to send welcome email
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.email) {
              fetch('/.netlify/functions/send-welcome', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email, plan: 'free' })
              }).catch(e => console.warn('Welcome email skipped:', e));
            }

            // Redirect after short delay
            setTimeout(() => {
              console.info('[AuthCallback] Redirecting to:', nextUrl);
              navigate(nextUrl, { replace: true });
            }, 1500);
          } else {
            // Free tier activation failed, but user is authenticated
            console.warn('[AuthCallback] Free tier activation failed, redirecting anyway');
            setState('success');
            setTimeout(() => navigate(nextUrl, { replace: true }), 1000);
          }
        } catch (err) {
          console.error('[AuthCallback] Failed to activate free tier:', err);
          // Still redirect even if free tier failed
          setState('success');
          setTimeout(() => navigate(nextUrl, { replace: true }), 1000);
        }
      } catch (err) {
        console.error('[AuthCallback] Unexpected error:', err);
        setState('error');
        setErrorMessage(
          err instanceof Error ? err.message : 'An unexpected error occurred'
        );
      }
    })();
  }, [navigate]);

  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-lg text-gray-700 mb-2">Setting up your account...</p>
          <p className="text-sm text-gray-500">This usually takes just a few seconds</p>
        </div>
      </div>
    );
  }

  if (state === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome!</h2>
          <p className="text-gray-600 mb-4">Your account is ready. Redirecting...</p>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
        </div>
        {showToast && (
          <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <p className="font-semibold">Free plan activated</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (state === 'error' || state === 'no_session') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <AlertTriangle className="w-16 h-16 text-amber-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {state === 'no_session' ? 'Session Expired' : 'Authentication Failed'}
            </h2>
            <p className="text-gray-600">{errorMessage}</p>
          </div>

          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">Common causes:</h3>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• The sign-in link has expired (links are valid for 60 minutes)</li>
                <li>• The link has already been used once</li>
                <li>• The redirect URL is not properly configured</li>
                <li>• Your browser blocked the authentication</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-amber-900 mb-2">What to do:</h3>
              <ul className="text-xs text-amber-800 space-y-1">
                <li>• Request a new sign-in link from the login page</li>
                <li>• Try using password sign-in instead</li>
                <li>• Make sure you're clicking the most recent link</li>
                <li>• Clear your browser cache and try again</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={() => navigate('/auth')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Sign In
            </button>

            <button
              onClick={() => navigate('/auth/password')}
              className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Try Password Sign-In
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            Still having issues?{' '}
            <a href="mailto:support@supplementsafetybible.com" className="text-blue-600 hover:underline">
              Contact support
            </a>
          </p>
        </div>
      </div>
    );
  }

  return null;
}
