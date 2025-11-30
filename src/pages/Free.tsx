import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

const Free: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const activateFreeTier = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.access_token) {
          setError('No active session. Please sign in first.');
          setLoading(false);
          return;
        }

        const response = await fetch('/api/grant-free', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to activate free tier');
        }

        setSuccess(true);

        setTimeout(() => {
          window.location.href = '/account';
        }, 2000);
      } catch (err) {
        console.error('Error activating free tier:', err);
        setError(err instanceof Error ? err.message : 'Failed to activate free tier');
      } finally {
        setLoading(false);
      }
    };

    activateFreeTier();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          {loading && (
            <>
              <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Activating Free Tier</h2>
              <p className="text-gray-600">Please wait while we set up your account...</p>
            </>
          )}

          {success && !loading && (
            <>
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Success!</h2>
              <p className="text-gray-600 mb-4">Your free tier has been activated.</p>
              <p className="text-sm text-gray-500">Redirecting to your account...</p>
            </>
          )}

          {error && !loading && (
            <>
              <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <div className="space-y-2">
                <a
                  href="/auth"
                  className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  Sign In
                </a>
                <a
                  href="/"
                  className="block w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
                >
                  Go Home
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Free;
