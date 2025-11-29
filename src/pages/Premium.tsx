import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Check, ArrowRight, Star } from 'lucide-react';

export default function Premium() {
  const navigate = useNavigate();
  const [cadence, setCadence] = useState<'monthly' | 'annual'>('monthly');
  const [loading, setLoading] = useState<string | null>(null);

  const tiers = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for individuals',
      monthlyPrice: 9,
      annualPrice: 90,
      features: [
        'Search 2,400+ interactions',
        'Severity ratings',
        'Basic interaction details',
        'Mobile access',
        'Email support'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Most popular for clinicians',
      monthlyPrice: 29,
      annualPrice: 290,
      popular: true,
      features: [
        'Everything in Starter',
        'PDF report exports',
        'Advanced filtering',
        'Priority support',
        'Clinical references',
        'Batch checking',
        'API access'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'For teams and institutions',
      monthlyPrice: 99,
      annualPrice: 990,
      features: [
        'Everything in Pro',
        'Unlimited team members',
        'Custom branding',
        'Dedicated support',
        'SLA guarantee',
        'Advanced analytics',
        'White-label options',
        'Training sessions'
      ]
    }
  ];

  const handleCheckout = async (tier: string) => {
    setLoading(tier);
    try {
      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, cadence })
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const getPrice = (tier: typeof tiers[0]) => {
    return cadence === 'monthly' ? tier.monthlyPrice : tier.annualPrice;
  };

  const getSavings = (tier: typeof tiers[0]) => {
    if (cadence === 'annual') {
      const monthlyCost = tier.monthlyPrice * 12;
      const savings = monthlyCost - tier.annualPrice;
      return `Save $${savings}/year`;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-7 h-7 text-blue-600" />
              <span className="text-xl font-semibold text-slate-900">SafetyBible</span>
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-slate-600 hover:text-slate-900 font-medium transition px-4 py-2"
            >
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Professional tools for supplement safety at every scale.
          </p>
        </div>

        <div className="flex items-center justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 border-2 border-slate-200 inline-flex">
            <button
              onClick={() => setCadence('monthly')}
              className={`px-8 py-3 rounded-xl font-semibold transition ${
                cadence === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setCadence('annual')}
              className={`px-8 py-3 rounded-xl font-semibold transition relative ${
                cadence === 'annual'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`bg-white rounded-3xl p-8 shadow-lg border-2 transition-all hover:shadow-xl ${
                tier.popular
                  ? 'border-blue-600 relative'
                  : 'border-slate-200'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {tier.name}
                </h3>
                <p className="text-slate-600 mb-6">
                  {tier.description}
                </p>

                <div className="mb-2">
                  <span className="text-5xl font-bold text-slate-900">
                    ${getPrice(tier)}
                  </span>
                  <span className="text-slate-600 ml-2">
                    /{cadence === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </div>

                {getSavings(tier) && (
                  <div className="text-sm font-semibold text-green-600">
                    {getSavings(tier)}
                  </div>
                )}
              </div>

              <button
                onClick={() => handleCheckout(tier.id)}
                disabled={loading !== null}
                className={`w-full py-4 rounded-xl font-semibold transition mb-8 flex items-center justify-center space-x-2 ${
                  tier.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                }`}
              >
                {loading === tier.id ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <ul className="space-y-4">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-slate-600 mb-4">
            Need help choosing? Compare all features in detail.
          </p>
          <button
            onClick={() => navigate('/faq')}
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center justify-center space-x-1 mx-auto"
          >
            <span>See full feature comparison in FAQ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-20 bg-white rounded-3xl p-12 shadow-lg border border-slate-200">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Join thousands of clinicians, pharmacists, and health practitioners who rely on SafetyBible for accurate supplement-medication interaction data.
            </p>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">2,400+</div>
                <div className="text-sm text-slate-600">Interactions</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">10k+</div>
                <div className="text-sm text-slate-600">Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
                <div className="text-sm text-slate-600">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-semibold text-slate-900">SafetyBible</span>
            </div>
            <p className="text-slate-500 text-xs">
              © 2025 SafetyBible. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
