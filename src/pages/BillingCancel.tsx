import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO } from '../lib/seo';

export default function BillingCancel() {
  const navigate = useNavigate();

  return (
    <>
      <SEO title="Checkout Cancelled" />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-md w-full text-center">
            <XCircle className="w-16 h-16 text-gray-400 mx-auto mb-6" />

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Checkout Cancelled
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              No worries! Your payment was not processed and no charges were made.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => navigate('/pricing')}
                className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Return to Pricing
              </button>

              <button
                onClick={() => navigate('/')}
                className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Go to Home
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Have questions?</p>
              <a
                href="mailto:support@supplementsafetybible.com"
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
