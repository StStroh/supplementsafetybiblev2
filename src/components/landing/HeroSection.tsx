import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative w-full bg-gradient-to-br from-white via-blue-50 to-blue-100 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column */}
          <div className="text-center md:text-left">
            <div className="inline-block mb-4 px-4 py-2 bg-red-100 border border-red-300 rounded-full">
              <span className="text-red-700 font-semibold text-sm">⚠️ 70% of Americans take supplements</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Are Your Supplements Safe With Your Medications?
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              Check dangerous supplement-drug interactions in seconds. Free, evidence-based, and safety-first.
            </p>

            <Link
              to="/check"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              style={{ minHeight: '56px' }}
            >
              Check My Supplements Now - Free
              <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">No signup required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Evidence-based</span>
              </div>
            </div>
          </div>

          {/* Right Column - Preview Card */}
          <div className="bg-white rounded-xl shadow-2xl p-6 border-2 border-red-200">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Warfarin + Fish Oil</h3>
                <div className="inline-block px-3 py-1 bg-red-100 text-red-800 text-sm font-bold rounded-full">
                  High Risk
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-gray-900 mb-1">What happens:</p>
                <p className="text-gray-600">
                  Fish oil may increase bleeding risk when combined with blood thinners. Both substances affect blood clotting mechanisms.
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-900 mb-1">What to do:</p>
                <p className="text-gray-600">
                  Consult your doctor before combining. Monitor for signs of bruising or bleeding. Regular INR monitoring recommended.
                </p>
              </div>
            </div>

            <Link
              to="/check"
              className="mt-4 w-full inline-block text-center px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-lg hover:bg-blue-100 transition-colors"
            >
              Check Your Supplements →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
