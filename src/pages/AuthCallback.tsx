import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if (token) {
        try {
          const res = await fetch('/.netlify/functions/grant-free', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            setShowToast(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.email) {
              fetch('/.netlify/functions/send-welcome', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email, plan: 'free' })
              }).catch(e => console.warn('Welcome email skipped:', e));
            }
            setTimeout(() => navigate('/account'), 1500);
          } else {
            navigate('/account');
          }
        } catch (err) {
          console.error('Failed to activate free tier:', err);
          navigate('/account');
        }
      } else {
        navigate('/account');
      }
    })();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Setting up your account...</p>
      </div>
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          <p className="font-semibold">Free plan activated</p>
        </div>
      )}
    </div>
  );
}
