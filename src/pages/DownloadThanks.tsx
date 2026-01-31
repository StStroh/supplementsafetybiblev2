import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO } from '../lib/seo';
import { CheckCircle, FileText, Mail, ArrowRight } from 'lucide-react';

export default function DownloadThanks() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, firstName } = (location.state as { email?: string; firstName?: string }) || {};

  useEffect(() => {
    if (!email) {
      navigate('/download');
    }
  }, [email, navigate]);

  const handleDownload = () => {
    window.open('/guides/Top-20-Dangerous-Supplement-Interactions.pdf', '_blank');
  };

  if (!email) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <SEO
        title="Download Your Free Guide - Supplement Safety Bible"
        description="Thank you for downloading our free guide on dangerous supplement-medication interactions."
        canonical="/download/thanks"
        noindex
      />
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Check Your Email!
          </h1>

          <p className="text-lg text-gray-700 mb-8">
            Hi {firstName}! We've sent your free guide to{' '}
            <span className="font-semibold text-purple-600">{email}</span>
          </p>

          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="font-bold text-gray-900 mb-2">What's Next?</h3>
                <ol className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-purple-600">1.</span>
                    <span>Check your inbox for an email from Supplement Safety Bible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-purple-600">2.</span>
                    <span>Click the download link in the email</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-purple-600">3.</span>
                    <span>Save the PDF to your device for easy reference</span>
                  </li>
                </ol>
                <p className="text-xs text-gray-600 mt-4">
                  Don't see it? Check your spam or promotions folder.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl mx-auto mb-6"
          >
            <FileText className="w-5 h-5" />
            <span>Download Guide Now</span>
          </button>

          <p className="text-sm text-gray-500 mb-8">
            You can also download the guide directly right now
          </p>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Ready to Check Your Supplements?
            </h2>
            <p className="text-gray-700 mb-6">
              Use our free interaction checker to verify your specific supplement and medication combinations.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-bold py-3 px-6 rounded-lg transition duration-200"
            >
              <span>Go to Interaction Checker</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="font-bold text-gray-900 mb-3">Get Weekly Safety Updates</h3>
            <p className="text-sm text-gray-600">
              You're now subscribed to receive evidence-based supplement safety information. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Questions?{' '}
            <a
              href="mailto:info@supplementsafetybible.com"
              className="text-purple-600 hover:text-purple-700 underline"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
