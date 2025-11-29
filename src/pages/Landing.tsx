import { useNavigate } from 'react-router-dom';
import { Shield, Check, AlertTriangle, Search, Users, Clock } from 'lucide-react';
import { Helmet } from 'react-helmet';

export default function Landing() {
  const navigate = useNavigate();

  const demoInteractions = [
    { supp: 'St. John\'s Wort', med: 'Sertraline', severity: 'severe', color: 'bg-red-50 border-red-200 text-red-900' },
    { supp: 'Ginkgo Biloba', med: 'Warfarin', severity: 'high', color: 'bg-amber-50 border-amber-200 text-amber-900' },
    { supp: 'Vitamin C', med: 'Lisinopril', severity: 'low', color: 'bg-gray-50 border-gray-200 text-gray-700' },
  ];

  return (
    <>
      <Helmet>
        <title>Supplement Safety Bible - Check Drug-Supplement Interactions</title>
        <meta name="description" content="Check supplement and medication interactions instantly. Evidence-based safety information for healthcare professionals and patients." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

        <meta property="og:title" content="Supplement Safety Bible" />
        <meta property="og:description" content="Check supplement and medication interactions instantly" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Supplement Safety Bible" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Supplement Safety Bible",
            "url": typeof window !== 'undefined' ? window.location.origin : '',
            "description": "Evidence-based supplement-medication interaction checker"
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Supplement Safety Bible",
            "url": typeof window !== 'undefined' ? window.location.origin : '',
            "potentialAction": {
              "@type": "SearchAction",
              "target": typeof window !== 'undefined' ? `${window.location.origin}/search?q={search_term_string}` : '',
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Supplement Safety Bible",
            "applicationCategory": "HealthApplication",
            "offers": {
              "@type": "Offer",
              "price": "9.99",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Nav */}
        <nav className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                <Shield className="w-7 h-7 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Supplement Safety Bible</span>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <button onClick={() => navigate('/search')} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                  Search
                </button>
                <button onClick={() => navigate('/pricing')} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                  Pricing
                </button>
                <button onClick={() => navigate('/faq')} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                  FAQ
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="pt-16 pb-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
                  Check Supplement-Drug Interactions Instantly
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Evidence-based safety information for healthcare professionals and patients. Access 2,500+ verified interactions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/pricing')}
                    className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg"
                  >
                    Start Premium
                  </button>
                  <button
                    onClick={() => navigate('/search')}
                    className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition"
                  >
                    Try the Checker
                  </button>
                </div>
                <div className="mt-8 flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>2,500+ Interactions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Evidence-Based</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <img
                  src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Healthcare professional"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-12 bg-white border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">2,500+</div>
                <div className="text-sm text-gray-600">Interactions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">106</div>
                <div className="text-sm text-gray-600">Supplements</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">48</div>
                <div className="text-sm text-gray-600">Medications</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">Fast</div>
                <div className="text-sm text-gray-600">Instant Results</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Healthcare Professionals Trust Us</h2>
              <p className="text-xl text-gray-600">Comprehensive, evidence-based interaction data at your fingertips</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Evidence-Based</h3>
                <p className="text-gray-600">All interactions sourced from peer-reviewed medical literature and clinical guidelines.</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Search</h3>
                <p className="text-gray-600">Get results in milliseconds with severity ratings and actionable recommendations.</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">For Professionals</h3>
                <p className="text-gray-600">Designed for pharmacists, physicians, and healthcare providers who need accurate information fast.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Demo */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">See It In Action</h2>
              <p className="text-lg text-gray-600">Example interactions ordered by severity</p>
            </div>
            <div className="space-y-4">
              {demoInteractions.map((item, idx) => (
                <div key={idx} className={`p-6 rounded-lg border-2 ${item.color}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-lg mb-1">{item.supp} + {item.med}</div>
                      <div className="text-sm uppercase tracking-wide font-medium">{item.severity}</div>
                    </div>
                    {item.severity === 'severe' && <AlertTriangle className="w-6 h-6 text-red-600" />}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button
                onClick={() => navigate('/search')}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                <Search className="w-5 h-5 mr-2" />
                Try It Now
              </button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">How accurate is the data?</h3>
                <p className="text-gray-600">All interactions are evidence-based and sourced from peer-reviewed medical literature.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Is this medical advice?</h3>
                <p className="text-gray-600">No. This tool provides information only. Always consult healthcare professionals for medical advice.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">What's included in Premium?</h3>
                <p className="text-gray-600">Unlimited searches, detailed recommendations, and access to our full interaction database.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <span className="font-bold text-gray-900">Supplement Safety Bible</span>
                </div>
                <p className="text-sm text-gray-600">Evidence-based supplement-medication interaction checker for healthcare professionals.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
                <div className="space-y-2">
                  <button onClick={() => navigate('/search')} className="block text-sm text-gray-600 hover:text-blue-600">Search</button>
                  <button onClick={() => navigate('/pricing')} className="block text-sm text-gray-600 hover:text-blue-600">Pricing</button>
                  <button onClick={() => navigate('/premium')} className="block text-sm text-gray-600 hover:text-blue-600">Premium</button>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
                <div className="space-y-2">
                  <button onClick={() => navigate('/terms')} className="block text-sm text-gray-600 hover:text-blue-600">Terms</button>
                  <button onClick={() => navigate('/privacy')} className="block text-sm text-gray-600 hover:text-blue-600">Privacy</button>
                  <button onClick={() => navigate('/faq')} className="block text-sm text-gray-600 hover:text-blue-600">FAQ</button>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
              <p>&copy; 2025 Supplement Safety Bible. Not medical advice. Consult healthcare professionals.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
