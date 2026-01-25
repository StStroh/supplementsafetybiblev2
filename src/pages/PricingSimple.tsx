import { Link } from 'react-router-dom';
import { Check, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO } from '../lib/seo';

export default function PricingSimple() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50 to-white">
      <SEO
        title="Pro Pricing - Supplement Safety Bible"
        description="Upgrade to Pro for unlimited checks, full interaction details, timing guidance, and printable reports."
        canonical="/pricing"
      />

      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        {/* Back Link */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Link
            to="/check"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Checker
          </Link>
        </div>

        {/* Title Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Upgrade to Pro
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Get the complete picture of your supplement-medication interactions
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                <div className="text-4xl font-extrabold text-gray-900 mb-1">$0</div>
                <p className="text-gray-600">Forever</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">Up to 2 medications</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">Up to 2 supplements</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">High-risk interactions only</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">Basic safety information</span>
                </li>
              </ul>

              <Link
                to="/check"
                className="block w-full px-6 py-3 bg-gray-100 text-gray-700 text-center font-bold rounded-lg hover:bg-gray-200 transition-colors"
                style={{ minHeight: '48px' }}
              >
                Current Plan
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-2xl border-2 border-blue-500 p-8 text-white relative">
              <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                RECOMMENDED
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="text-4xl font-extrabold mb-1">$9.99</div>
                <p className="text-blue-100">per month</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-white rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="font-semibold">Unlimited medications and supplements</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-white rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="font-semibold">All risk levels (high, medium, low)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-white rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="font-semibold">Full interaction details</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-white rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="font-semibold">Timing guidance</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-white rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="font-semibold">Printable PDF reports</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-white rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="font-semibold">Save profiles for quick checks</span>
                </li>
              </ul>

              <button
                onClick={() => alert('Payment integration coming soon! For now, this is a demo.')}
                className="block w-full px-6 py-3 bg-white text-blue-600 text-center font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
                style={{ minHeight: '48px' }}
              >
                Upgrade Now
              </button>

              <p className="text-xs text-blue-100 text-center mt-4">
                Cancel anytime. No long-term commitment.
              </p>
            </div>
          </div>

          {/* Money Back Guarantee */}
          <div className="mt-12 text-center">
            <div className="inline-block px-6 py-3 bg-green-50 border-2 border-green-200 rounded-lg">
              <p className="text-green-800 font-semibold">
                30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
