import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Lock, Mail, Loader2, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { SUPPORT_EMAIL } from '../lib/support';

export default function AuthPassword() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
        console.info('[AuthPassword] User already logged in, redirecting to:', redirect);
        window.location.href = redirect;
      }
    })();
  }, [redirect]);

  // Password validation
  const isPasswordValid = (pwd: string): { valid: boolean; message?: string } => {
    if (pwd.length < 8) {
      return { valid: false, message: 'Password must be at least 8 characters' };
    }
    if (!/[A-Z]/.test(pwd)) {
      return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(pwd)) {
      return { valid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!/[0-9]/.test(pwd)) {
      return { valid: false, message: 'Password must contain at least one number' };
    }
    return { valid: true };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (mode === 'signup') {
        // Validate password
        const validation = isPasswordValid(password);
        if (!validation.valid) {
          setError(validation.message || 'Invalid password');
          setLoading(false);
          return;
        }

        // Check password confirmation
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        console.info('[AuthPassword] Creating account for:', email);

        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (signUpError) {
          console.error('[AuthPassword] Sign up error:', signUpError);

          let errorMessage = signUpError.message;
          if (signUpError.message.includes('already registered')) {
            errorMessage = 'This email is already registered. Try signing in instead.';
          } else if (signUpError.message.includes('Invalid')) {
            errorMessage = 'Please enter a valid email address.';
          }

          setError(errorMessage);
          setLoading(false);
          return;
        }

        console.info('[AuthPassword] Account created successfully');

        // Check if email confirmation is required
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
          // No email confirmation required, redirect immediately
          setSuccess('Account created successfully! Redirecting...');
          setTimeout(() => {
            window.location.href = redirect;
          }, 1500);
        } else {
          // Email confirmation required
          setSuccess('Account created! Please check your email to confirm your account.');
        }

      } else {
        // Sign in mode
        console.info('[AuthPassword] Signing in:', email);

        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          console.error('[AuthPassword] Sign in error:', signInError);

          let errorMessage = signInError.message;
          if (signInError.message.includes('Invalid')) {
            errorMessage = 'Invalid email or password. Please try again.';
          } else if (signInError.message.includes('not confirmed')) {
            errorMessage = 'Please confirm your email address before signing in.';
          }

          setError(errorMessage);
          setLoading(false);
          return;
        }

        console.info('[AuthPassword] Sign in successful');
        setSuccess('Signed in successfully! Redirecting...');

        // Redirect after successful sign in
        setTimeout(() => {
          window.location.href = redirect;
        }, 1000);
      }
    } catch (err) {
      console.error('[AuthPassword] Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setError(null);
    setSuccess(null);
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <Lock className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {mode === 'signin' ? 'Sign in with password' : 'Create your account'}
          </h2>
          <p className="text-gray-600">
            {mode === 'signin'
              ? 'Enter your email and password to sign in'
              : 'Create a new account with email and password'}
          </p>
        </div>

        {/* Success message */}
        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-700">{success}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder={mode === 'signup' ? 'At least 8 characters' : 'Your password'}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {mode === 'signup' && (
              <p className="text-xs text-gray-500 mt-1">
                Must be 8+ characters with uppercase, lowercase, and number
              </p>
            )}
          </div>

          {/* Confirm Password (signup only) */}
          {mode === 'signup' && (
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-red-700">{error}</p>
                  {error.includes('already registered') && (
                    <button
                      type="button"
                      onClick={toggleMode}
                      className="text-sm text-red-600 underline mt-1 hover:text-red-800"
                    >
                      Sign in instead
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading || !email || !password || (mode === 'signup' && !confirmPassword)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              <>{mode === 'signin' ? 'Sign in' : 'Create account'}</>
            )}
          </button>
        </form>

        {/* Toggle mode */}
        <div className="mt-4 text-center">
          <button
            onClick={toggleMode}
            className="text-sm text-blue-600 hover:underline"
            disabled={loading}
          >
            {mode === 'signin'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>

        {/* Alternative: Magic link */}
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
            onClick={() => navigate(`/auth${prefillEmail ? `?email=${encodeURIComponent(prefillEmail)}` : ''}`)}
            className="mt-4 w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
            disabled={loading}
          >
            Use magic link instead
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 space-y-3">
          <p className="text-center text-sm text-gray-500">
            By {mode === 'signin' ? 'signing in' : 'creating an account'}, you agree to our{' '}
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
