import { useState, FormEvent } from 'react';

export default function EmailCaptureSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Console log only (as per requirements)
    console.log({
      email,
      source: 'homepage_checklist',
      timestamp: new Date().toISOString()
    });

    setSubmitted(true);
    setEmail('');

    // Reset after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
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
            <div className="flex items-center justify-center gap-2 text-green-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Thanks! Check your email.</span>
            </div>
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
                className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
                style={{ minHeight: '48px' }}
              >
                Get Free Guide
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
