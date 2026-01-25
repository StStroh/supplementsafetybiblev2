import { useState, FormEvent } from 'react';

export default function EmailCaptureSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/.netlify/functions/send-guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          leadMagnet: 'top-20-dangerous-interactions',
          source: 'homepage'
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || 'Failed to send guide');
      }

      console.log('[EmailCaptureSection] Guide request submitted:', {
        email,
        source: 'homepage',
        timestamp: new Date().toISOString(),
        mocked: data.mocked,
        alreadySent: data.alreadySent
      });

      setSubmitted(true);
      setEmail('');

      // Reset after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      console.error('[EmailCaptureSection] Error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-gradient-to-r from-blue-600 to-blue-700 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Get Our Free Safety Checklist
        </h2>
        <p className="text-lg text-blue-100 mb-8">
          Download "Top 20 Dangerous Supplement Interactions" + weekly safety tips
        </p>

        {submitted ? (
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
            <div className="flex flex-col items-center justify-center gap-2 text-green-600">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold text-lg">Thanks! Check your inbox.</span>
              <span className="text-sm text-gray-600">If you don't see it, check spam.</span>
            </div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
            <div className="flex flex-col items-center justify-center gap-2 text-red-600 mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold text-lg">Oops!</span>
              <span className="text-sm text-gray-600">{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-lg border-2 border-blue-300 focus:border-white focus:ring-2 focus:ring-white focus:outline-none text-gray-900"
                style={{ minHeight: '48px' }}
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ minHeight: '48px' }}
              >
                {loading ? 'Sending...' : 'Get Free Guide'}
              </button>
            </div>
            <p className="text-sm text-blue-100 mt-3">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
