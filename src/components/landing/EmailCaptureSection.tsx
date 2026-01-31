import { useState, FormEvent } from 'react';
import { Download, CheckCircle, AlertCircle, Loader2, Mail } from 'lucide-react';

export default function EmailCaptureSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your email address');
      setStatus('error');
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      setStatus('error');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/.netlify/functions/send-guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          leadMagnet: 'top-20-dangerous-interactions',
          source: 'homepage'
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || 'Failed to process your request');
      }

      setStatus('success');
      setDownloadUrl(data.downloadUrl || '/guides/Top-20-Dangerous-Supplement-Interactions.pdf');

      console.log('[EmailCapture] Success:', {
        email,
        downloadUrl: data.downloadUrl,
        timestamp: new Date().toISOString()
      });

    } catch (err: any) {
      console.error('[EmailCapture] Error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    console.log('[EmailCapture] Download clicked:', { email, downloadUrl });
    window.open(downloadUrl, '_blank');
  };

  const resetForm = () => {
    setEmail('');
    setStatus('idle');
    setErrorMessage('');
    setDownloadUrl('');
  };

  return (
    <section className="w-full bg-gradient-to-br from-[#5e2b7e] via-[#7a3d96] to-[#8b4d9f] py-16 sm:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Get Your Free Safety Guide
          </h2>
          <p className="text-lg sm:text-xl text-purple-100 max-w-2xl mx-auto">
            Download "Top 20 Dangerous Supplement Interactions" and learn which combinations to avoid
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 max-w-md mx-auto transform transition-all">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="bg-green-100 rounded-full p-4">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Success! Check Your Email
                </h3>
                <p className="text-gray-600">
                  We've sent the guide to <span className="font-semibold">{email}</span>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  (Check your spam folder if you don't see it)
                </p>
              </div>

              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5" />
                Download PDF Now
              </button>

              <button
                onClick={resetForm}
                className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
              >
                Submit another email
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md mx-auto">
            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-800 font-semibold">Error</p>
                  <p className="text-red-700 text-sm">{errorMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-200 focus:outline-none text-gray-900 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
                    aria-label="Email address"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#ff6b6b] hover:bg-[#ff5252] text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#ff6b6b]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Get Free Guide
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                No spam. Unsubscribe anytime. Your privacy is protected.
              </p>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Instant access • No credit card required</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
