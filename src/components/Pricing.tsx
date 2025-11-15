import { Check, Star, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface PricingTier {
  name: string;
  price: string;
  annualPrice: string;
  description: string;
  features: string[];
  priceIdMonthly?: string;
  priceIdAnnual?: string;
  popular?: boolean;
  buttonText: string;
  buttonStyle: string;
}

const tiers: PricingTier[] = [
  {
    name: 'Core',
    price: '$9.99',
    annualPrice: '$99',
    description: 'For individuals managing their personal wellness',
    features: [
      'Base supplement–medicine checker',
      'Up to 20 interaction checks per month',
      'Email reminders',
      'Access to core database',
    ],
    priceIdMonthly: 'PRICE_ID_CORE_MONTHLY',
    priceIdAnnual: 'PRICE_ID_CORE_ANNUAL',
    buttonText: 'Start Core',
    buttonStyle: 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50',
  },
  {
    name: 'Pro',
    price: '$24.99',
    annualPrice: '$249',
    description: 'For serious users and families',
    features: [
      'Unlimited checks',
      'Saved profiles for multiple people',
      'Downloadable PDF reports',
      'Priority data updates',
      'Advanced interaction details',
    ],
    priceIdMonthly: 'PRICE_ID_PRO_MONTHLY',
    priceIdAnnual: 'PRICE_ID_PRO_ANNUAL',
    popular: true,
    buttonText: 'Upgrade to Pro',
    buttonStyle: 'bg-green-600 text-white hover:bg-green-700',
  },
  {
    name: 'Premium',
    price: '$47.99',
    annualPrice: '$479',
    description: 'For healthcare practitioners & advanced users',
    features: [
      'Everything in Pro',
      'Extended interaction databases',
      'Priority support (24/7)',
      'Advanced filters and clinical notes',
      'API access for integrations',
    ],
    priceIdMonthly: 'PRICE_ID_PREMIUM_MONTHLY',
    priceIdAnnual: 'PRICE_ID_PREMIUM_ANNUAL',
    buttonText: 'Get Premium',
    buttonStyle: 'bg-gray-900 text-white hover:bg-gray-800',
  },
];

export default function Pricing() {
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (priceIdKey: string) => {
    setLoadingPriceId(priceIdKey);
    setError(null);

    try {
      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceIdKey }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        console.error('Checkout error:', data.error);
        setError(data.error || 'Failed to create checkout session. Please try again.');
        setLoadingPriceId(null);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Network error:', err);
      setError('Network error. Please check your connection and try again.');
      setLoadingPriceId(null);
    }
  };

  return (
    <section id="pricing" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose your safety level
          </h2>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 max-w-md mx-auto">
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all relative ${
                tier.popular ? 'ring-2 ring-green-600 scale-105' : 'border border-gray-200'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{tier.description}</p>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                  {tier.price !== 'Free' && <span className="text-gray-600">/month</span>}
                </div>

                {tier.annualPrice !== 'Free' && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      or {tier.annualPrice}/year
                    </p>
                    <p className="text-xs text-green-600 font-semibold mt-1">
                      Save 17% annually
                    </p>
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {tier.priceIdMonthly ? (
                <div className="space-y-3">
                  <button
                    onClick={() => handleCheckout(tier.priceIdMonthly!)}
                    disabled={loadingPriceId !== null}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${tier.buttonStyle} shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                  >
                    {loadingPriceId === tier.priceIdMonthly ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Redirecting...</span>
                      </>
                    ) : (
                      `Start ${tier.name} - Monthly`
                    )}
                  </button>
                  <button
                    onClick={() => handleCheckout(tier.priceIdAnnual!)}
                    disabled={loadingPriceId !== null}
                    className="w-full py-3 px-6 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loadingPriceId === tier.priceIdAnnual ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Redirecting...</span>
                      </>
                    ) : (
                      `Start ${tier.name} - Annual`
                    )}
                  </button>
                </div>
              ) : (
                <a
                  href="/#checker"
                  className={`block w-full py-3 px-6 rounded-lg font-semibold transition-all text-center ${tier.buttonStyle} shadow-md hover:shadow-lg`}
                >
                  {tier.buttonText}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
