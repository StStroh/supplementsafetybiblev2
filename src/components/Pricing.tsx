import { Check, Star } from 'lucide-react';

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
    name: 'Starter',
    price: 'Free',
    annualPrice: 'Free',
    description: 'For individuals with a few supplements',
    features: [
      'Base supplement–medicine checker',
      'Limited interaction reports per month',
      'Email reminders',
    ],
    buttonText: 'Start free',
    buttonStyle: 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50',
  },
  {
    name: 'Pro',
    price: '$29',
    annualPrice: '$290',
    description: 'For families / serious users',
    features: [
      'Unlimited checks',
      'Saved profiles for multiple people',
      'Downloadable PDF reports',
      'Priority data updates',
    ],
    priceIdMonthly: 'PRICE_ID_PRO_MONTHLY',
    priceIdAnnual: 'PRICE_ID_PRO_ANNUAL',
    popular: true,
    buttonText: 'Upgrade to Pro',
    buttonStyle: 'bg-blue-600 text-white hover:bg-blue-700',
  },
  {
    name: 'Premium',
    price: '$49',
    annualPrice: '$490',
    description: 'For practitioners / advanced users',
    features: [
      'Everything in Pro',
      'Extra interaction databases',
      'Priority support',
      'Advanced filters and notes',
    ],
    priceIdMonthly: 'PRICE_ID_PREMIUM_MONTHLY',
    priceIdAnnual: 'PRICE_ID_PREMIUM_ANNUAL',
    buttonText: 'Get Premium',
    buttonStyle: 'bg-gray-900 text-white hover:bg-gray-800',
  },
];

export default function Pricing() {
  const handleCheckout = async (priceIdKey: string) => {
    try {
      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceIdKey }),
      });

      const { url, error } = await response.json();

      if (error) {
        console.error('Checkout error:', error);
        alert('Failed to create checkout session. Please try again.');
        return;
      }

      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error('Network error:', err);
      alert('Network error. Please try again.');
    }
  };

  return (
    <section id="pricing" className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose your safety level
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all relative ${
                tier.popular ? 'ring-2 ring-blue-600 scale-105' : 'border border-gray-200'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
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
                  <p className="text-sm text-gray-600 mt-2">
                    or {tier.annualPrice}/year
                  </p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {tier.priceIdMonthly ? (
                <div className="space-y-3">
                  <button
                    onClick={() => handleCheckout(tier.priceIdMonthly!)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${tier.buttonStyle} shadow-md hover:shadow-lg`}
                  >
                    {tier.buttonText} - Monthly
                  </button>
                  <button
                    onClick={() => handleCheckout(tier.priceIdAnnual!)}
                    className="w-full py-3 px-6 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    {tier.buttonText} - Annual
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
