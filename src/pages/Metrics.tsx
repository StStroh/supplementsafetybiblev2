import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO } from '../lib/seo';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: React.ReactNode;
}

function MetricCard({ title, value, subtext, icon }: MetricCardProps) {
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
          {title}
        </h3>
        <div style={{ color: 'var(--color-brand)', opacity: 0.7 }}>
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
        {value}
      </div>
      {subtext && (
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          {subtext}
        </p>
      )}
    </div>
  );
}

export default function Metrics() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth?redirect=/metrics');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('email', user.email)
        .maybeSingle();

      if (profile?.role === 'premium') {
        setIsAuthorized(true);
      } else {
        navigate('/account');
      }
    } catch (error) {
      console.error('Auth error:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg)' }}>
        <p style={{ color: 'var(--color-text-muted)' }}>Loading...</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <SEO
        title="Metrics Dashboard — Supplement Safety Bible"
        description="Internal metrics and analytics dashboard"
        canonical="/metrics"
        noindex={true}
      />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            Metrics Dashboard
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Internal analytics and performance metrics
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
              Funnel Health
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard
                title="Trials Started (30 days)"
                value="— (available soon)"
                icon={<Users className="w-5 h-5" />}
              />
              <MetricCard
                title="Trial → Paid Conversion"
                value="— (available soon)"
                subtext="Last 30 days"
                icon={<TrendingUp className="w-5 h-5" />}
              />
              <MetricCard
                title="Active Paid Subscribers"
                value="— (available soon)"
                icon={<Users className="w-5 h-5" />}
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
              Revenue Quality
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard
                title="Pro vs Clinical Mix"
                value="— (available soon)"
                subtext="Distribution of active plans"
                icon={<DollarSign className="w-5 h-5" />}
              />
              <MetricCard
                title="Annual Plan Share"
                value="— (available soon)"
                subtext="% choosing annual billing"
                icon={<TrendingUp className="w-5 h-5" />}
              />
              <MetricCard
                title="Refunds (Last 60 days)"
                value="— (available soon)"
                subtext="Covered by 60-day guarantee"
                icon={<DollarSign className="w-5 h-5" />}
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
              Product Usage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard
                title="Interaction Checks (7 days)"
                value="— (available soon)"
                icon={<Activity className="w-5 h-5" />}
              />
              <MetricCard
                title="PDF Reports Generated (7 days)"
                value="— (available soon)"
                icon={<Activity className="w-5 h-5" />}
              />
              <MetricCard
                title="Avg. Time to First Interaction"
                value="— (available soon)"
                subtext="From signup to first check"
                icon={<TrendingUp className="w-5 h-5" />}
              />
            </div>
          </div>
        </div>

        <div className="mt-12 p-4 rounded-lg text-center" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Metrics reflect currently available data. Some values may appear as placeholders until additional events are enabled.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
