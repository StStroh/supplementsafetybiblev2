import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StackBuilderCheckerV3 from '../components/StackBuilderCheckerV3';
import CheckerErrorBoundary from '../components/CheckerErrorBoundary';
import { trackViewContent } from '../lib/tiktok';
import { SEO } from '../lib/seo';

export default function CheckV2() {
  // Track ViewContent when user lands on interaction checker
  useEffect(() => {
    trackViewContent('Interaction Checker', 'tool');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50 to-white">
      <SEO
        title="Check Supplement Safety - Free Interaction Checker Tool"
        description="Enter your medications and supplements to get instant safety warnings. Free tool, no signup required. Get personalized interaction reports."
        canonical="/check"
      />

      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        {/* Back Link */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Supplement Safety Bible
          </Link>
        </div>

        {/* Title Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Free Supplement-Medication Checker
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              Check for dangerous interactions in 60 seconds
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
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
                <span className="font-medium">100% Private</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Evidence-based</span>
              </div>
            </div>
          </div>
        </div>

        {/* Checker Component */}
        <CheckerErrorBoundary>
          <StackBuilderCheckerV3 />
        </CheckerErrorBoundary>

        {/* Medical Disclaimer */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span>⚠️</span>
              Important Disclaimer
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              This information is for educational purposes only and does not constitute medical advice. Always consult your healthcare provider before making changes to your supplement or medication regimen.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-gray-600">
              <div>
                <span className="font-semibold">Last Updated:</span> January 2026
              </div>
              <div>
                <span className="font-semibold">Reviewed By:</span> NSF GMP Certified Manufacturing Professional
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
