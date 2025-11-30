import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if (token) {
        try {
          await fetch('/.netlify/functions/grant-free', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` }
          });
        } catch (err) {
          console.error('Failed to activate free tier:', err);
        }
      }

      navigate('/account');
    })();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Setting up your account...</p>
      </div>
    </div>
  );
}
