import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { SITE_URL } from '../lib/siteUrl';
import { CheckCircle, XCircle, AlertCircle, Copy } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AuthTest() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const testInfo = {
    siteUrl: SITE_URL,
    callbackUrl: `${SITE_URL}/auth/callback`,
    currentUrl: window.location.href,
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    hasSession: !!session,
    sessionExpiry: session?.expires_at ? new Date(session.expires_at * 1000).toLocaleString() : 'N/A',
  };

  return (
    <div className="min-h-screen flex flex-col" style={{background: 'var(--color-bg)'}}>
      <Navbar />

      <main className="flex-1 px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2" style={{color: 'var(--color-text)'}}>
            Auth Flow Test
          </h1>
          <p className="text-lg mb-8" style={{color: 'var(--color-text-muted)'}}>
            Diagnostic information for troubleshooting authentication issues
          </p>

          {/* Session Status */}
          <div className="card mb-6" style={{background: 'var(--color-surface)'}}>
            <h2 className="text-2xl font-bold mb-4" style={{color: 'var(--color-text)'}}>
              Session Status
            </h2>
            {loading ? (
              <div className="flex items-center gap-2" style={{color: 'var(--color-text-muted)'}}>
                <div className="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full"></div>
                <span>Checking session...</span>
              </div>
            ) : session ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2" style={{color: 'var(--color-success)'}}>
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-semibold">Authenticated</span>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm mb-2"><strong>Email:</strong> {session.user.email}</p>
                  <p className="text-sm mb-2"><strong>User ID:</strong> {session.user.id}</p>
                  <p className="text-sm"><strong>Expires:</strong> {testInfo.sessionExpiry}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2" style={{color: 'var(--color-warning)'}}>
                <XCircle className="w-6 h-6" />
                <span className="font-semibold">Not authenticated</span>
              </div>
            )}
          </div>

          {/* Configuration */}
          <div className="card mb-6" style={{background: 'var(--color-surface)'}}>
            <h2 className="text-2xl font-bold mb-4" style={{color: 'var(--color-text)'}}>
              Configuration
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1" style={{color: 'var(--color-text-muted)'}}>
                  Site URL (for redirects):
                </label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm overflow-x-auto">
                    {testInfo.siteUrl}
                  </code>
                  <button
                    onClick={() => copyToClipboard(testInfo.siteUrl)}
                    className="btn-outline px-3 py-2 text-sm flex items-center gap-1"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1" style={{color: 'var(--color-text-muted)'}}>
                  Auth Callback URL:
                </label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm overflow-x-auto">
                    {testInfo.callbackUrl}
                  </code>
                  <button
                    onClick={() => copyToClipboard(testInfo.callbackUrl)}
                    className="btn-outline px-3 py-2 text-sm flex items-center gap-1"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1" style={{color: 'var(--color-text-muted)'}}>
                  Supabase URL:
                </label>
                <code className="block bg-gray-100 px-3 py-2 rounded text-sm overflow-x-auto">
                  {testInfo.supabaseUrl}
                </code>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1" style={{color: 'var(--color-text-muted)'}}>
                  Current URL:
                </label>
                <code className="block bg-gray-100 px-3 py-2 rounded text-sm overflow-x-auto">
                  {testInfo.currentUrl}
                </code>
              </div>
            </div>
          </div>

          {/* Supabase Setup Checklist */}
          <div className="card mb-6" style={{background: 'var(--color-surface)'}}>
            <h2 className="text-2xl font-bold mb-4" style={{color: 'var(--color-text)'}}>
              Supabase Setup Checklist
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">Add this URL to your Supabase project:</p>
                  <code className="block bg-white px-2 py-1 rounded mt-2">
                    {testInfo.callbackUrl}
                  </code>
                </div>
              </div>
            </div>

            <ol className="space-y-3 list-decimal list-inside text-sm" style={{color: 'var(--color-text-muted)'}}>
              <li>Go to your Supabase Dashboard</li>
              <li>Navigate to <strong>Authentication → URL Configuration</strong></li>
              <li>Add the callback URL above to <strong>Redirect URLs</strong></li>
              <li>Set <strong>Site URL</strong> to: <code className="bg-gray-100 px-2 py-0.5 rounded">{testInfo.siteUrl}</code></li>
              <li>Save changes</li>
              <li>Test the magic link flow at <a href="/auth" className="text-blue-600 hover:underline">/auth</a></li>
            </ol>
          </div>

          {/* Test Actions */}
          <div className="card" style={{background: 'var(--color-surface)'}}>
            <h2 className="text-2xl font-bold mb-4" style={{color: 'var(--color-text)'}}>
              Test Actions
            </h2>
            <div className="flex flex-wrap gap-3">
              <a href="/auth" className="btn-cta">
                Test Sign In
              </a>
              <a href="/auth/callback" className="btn-outline">
                Test Callback URL
              </a>
              <a href="/account" className="btn-outline">
                Go to Account
              </a>
              {session && (
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="btn-outline"
                  style={{color: 'var(--color-danger)'}}
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>

          {/* Debug Info */}
          <div className="mt-6 text-xs text-center" style={{color: 'var(--color-text-muted)'}}>
            <p>For debugging issues, share this page with support</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
