import { useNavigate } from 'react-router-dom';
import { Shield, Check, AlertTriangle, Search, Users, Clock, Sparkles, Pill } from 'lucide-react';
import { Helmet } from 'react-helmet';

export default function Landing() {
  const navigate = useNavigate();

  const demoInteractions = [
    { supp: 'St. John\'s Wort', med: 'Sertraline', severity: 'severe', color: 'bg-red-50 border-red-300 text-red-900' },
    { supp: 'Ginkgo Biloba', med: 'Warfarin', severity: 'high', color: 'bg-amber-50 border-amber-300 text-amber-900' },
    { supp: 'Vitamin C', med: 'Lisinopril', severity: 'low', color: 'bg-emerald-50 border-emerald-300 text-emerald-900' },
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
        <nav style={{backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <Shield className="w-7 h-7" style={{color: 'var(--color-brand)'}} />
                <span className="text-xl font-bold" style={{color: 'var(--color-text)'}}>Supplement Safety Bible</span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <button onClick={() => navigate('/search')} className="text-sm font-medium" style={{color: 'var(--color-text-muted)'}} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-brand)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}>
                  Search
                </button>
                <button onClick={() => navigate('/pricing')} className="text-sm font-medium" style={{color: 'var(--color-text-muted)'}} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-brand)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}>
                  Pricing
                </button>
                <button onClick={() => navigate('/faq')} className="text-sm font-medium" style={{color: 'var(--color-text-muted)'}} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-brand)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}>
                  FAQ
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="pt-20 pb-24" style={{background: 'linear-gradient(180deg, #F8F7FB 0%, #FFFFFF 100%)'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{background: '#EDE7F6', color: 'var(--color-brand)'}}>
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-semibold">Evidence-Based Medical Information</span>
                </div>
                <h1 className="text-5xl font-bold leading-tight mb-6" style={{color: 'var(--color-text)'}}>
                  Check Supplement-Drug Interactions Instantly
                </h1>
                <p className="text-xl mb-8" style={{color: 'var(--color-text-muted)', lineHeight: '1.6'}}>
                  Evidence-based safety information trusted by healthcare professionals and patients. Access 2,500+ verified interactions with clinical guidance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/pricing')}
                    className="px-8 py-4 font-semibold rounded-xl transition shadow-sm"
                    style={{background: 'var(--color-brand)', color: '#FFFFFF'}}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-brand-700)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-brand)'}
                  >
                    Start Premium
                  </button>
                  <button
                    onClick={() => navigate('/search')}
                    className="px-8 py-4 font-semibold rounded-xl transition"
                    style={{background: 'var(--color-surface)', border: '2px solid var(--color-brand)', color: 'var(--color-brand)'}}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F8F7FB'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-surface)'}
                  >
                    Try the Checker
                  </button>
                </div>
                <div className="mt-10 flex items-center space-x-8 text-sm" style={{color: 'var(--color-text-muted)'}}>
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5" style={{color: 'var(--color-success)'}} />
                    <span>2,500+ Interactions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5" style={{color: 'var(--color-success)'}} />
                    <span>Clinical Evidence</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-200 to-transparent rounded-3xl opacity-30 blur-3xl"></div>
                  <img
                    src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Healthcare professional"
                    className="rounded-3xl shadow-2xl relative z-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-16" style={{background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2" style={{color: 'var(--color-brand)'}}>2,500+</div>
                <div className="text-sm" style={{color: 'var(--color-text-muted)'}}>Verified Interactions</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2" style={{color: 'var(--color-brand)'}}>106</div>
                <div className="text-sm" style={{color: 'var(--color-text-muted)'}}>Supplement Entries</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2" style={{color: 'var(--color-brand)'}}>48</div>
                <div className="text-sm" style={{color: 'var(--color-text-muted)'}}>Medication Classes</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2" style={{color: 'var(--color-brand)'}}>{'<1s'}</div>
                <div className="text-sm" style={{color: 'var(--color-text-muted)'}}>Average Response</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24" style={{background: 'var(--color-bg)'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" style={{color: 'var(--color-text)'}}>Trusted by Healthcare Professionals</h2>
              <p className="text-xl" style={{color: 'var(--color-text-muted)'}}>Comprehensive, evidence-based interaction data for clinical practice</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card p-8">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{background: '#EDE7F6'}}>
                  <Shield className="w-7 h-7" style={{color: 'var(--color-brand)'}} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{color: 'var(--color-text)'}}>Evidence-Based</h3>
                <p style={{color: 'var(--color-text-muted)', lineHeight: '1.7'}}>Every interaction is sourced from peer-reviewed medical literature and validated clinical guidelines.</p>
              </div>
              <div className="card p-8">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{background: '#E8F5E9'}}>
                  <Clock className="w-7 h-7" style={{color: 'var(--color-success)'}} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{color: 'var(--color-text)'}}>Instant Search</h3>
                <p style={{color: 'var(--color-text-muted)', lineHeight: '1.7'}}>Get comprehensive results in milliseconds with severity ratings and actionable clinical recommendations.</p>
              </div>
              <div className="card p-8">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{background: '#FFF4E5'}}>
                  <Pill className="w-7 h-7" style={{color: 'var(--color-warning)'}} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{color: 'var(--color-text)'}}>Clinical Grade</h3>
                <p style={{color: 'var(--color-text-muted)', lineHeight: '1.7'}}>Designed for pharmacists, physicians, and healthcare providers who need accurate, reliable information.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Demo */}
        <section className="py-24" style={{background: 'var(--color-surface)'}}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold mb-4" style={{color: 'var(--color-text)'}}>See It In Action</h2>
              <p className="text-lg" style={{color: 'var(--color-text-muted)'}}>Example interactions ordered by severity level</p>
            </div>
            <div className="space-y-4">
              {demoInteractions.map((item, idx) => (
                <div key={idx} className={`p-6 rounded-xl border-2 ${item.color} transition hover:shadow-md`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-lg mb-1">{item.supp} + {item.med}</div>
                      <div className="text-sm uppercase tracking-wide font-semibold">{item.severity} Risk</div>
                    </div>
                    {item.severity === 'severe' && <AlertTriangle className="w-6 h-6 text-red-600" />}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <button
                onClick={() => navigate('/search')}
                className="inline-flex items-center px-8 py-4 font-semibold rounded-xl transition shadow-sm"
                style={{background: 'var(--color-brand)', color: '#FFFFFF'}}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-brand-700)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-brand)'}
              >
                <Search className="w-5 h-5 mr-2" />
                Try It Now
              </button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24" style={{background: 'var(--color-bg)'}}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-14" style={{color: 'var(--color-text)'}}>Frequently Asked Questions</h2>
            <div className="space-y-5">
              <div className="card p-7">
                <h3 className="font-semibold text-lg mb-3" style={{color: 'var(--color-text)'}}>How accurate is the data?</h3>
                <p style={{color: 'var(--color-text-muted)', lineHeight: '1.7'}}>All interactions are evidence-based and sourced from peer-reviewed medical literature and validated clinical guidelines.</p>
              </div>
              <div className="card p-7">
                <h3 className="font-semibold text-lg mb-3" style={{color: 'var(--color-text)'}}>Is this medical advice?</h3>
                <p style={{color: 'var(--color-text-muted)', lineHeight: '1.7'}}>No. This tool provides information only. Always consult healthcare professionals for personalized medical advice.</p>
              </div>
              <div className="card p-7">
                <h3 className="font-semibold text-lg mb-3" style={{color: 'var(--color-text)'}}>What's included in Premium?</h3>
                <p style={{color: 'var(--color-text-muted)', lineHeight: '1.7'}}>Unlimited searches, detailed clinical recommendations, PDF reports, and access to our complete interaction database.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)'}} className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-6 h-6" style={{color: 'var(--color-brand)'}} />
                  <span className="font-bold" style={{color: 'var(--color-text)'}}>Supplement Safety Bible</span>
                </div>
                <p className="text-sm" style={{color: 'var(--color-text-muted)', lineHeight: '1.7'}}>Evidence-based supplement-medication interaction checker for healthcare professionals.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4" style={{color: 'var(--color-text)'}}>Product</h4>
                <div className="space-y-3">
                  <button onClick={() => navigate('/search')} className="block text-sm transition" style={{color: 'var(--color-text-muted)'}} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-brand)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}>Search</button>
                  <button onClick={() => navigate('/pricing')} className="block text-sm transition" style={{color: 'var(--color-text-muted)'}} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-brand)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}>Pricing</button>
                  <button onClick={() => navigate('/premium')} className="block text-sm transition" style={{color: 'var(--color-text-muted)'}} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-brand)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}>Premium</button>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4" style={{color: 'var(--color-text)'}}>Legal</h4>
                <div className="space-y-3">
                  <button onClick={() => navigate('/terms')} className="block text-sm transition" style={{color: 'var(--color-text-muted)'}} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-brand)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}>Terms</button>
                  <button onClick={() => navigate('/privacy')} className="block text-sm transition" style={{color: 'var(--color-text-muted)'}} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-brand)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}>Privacy</button>
                  <button onClick={() => navigate('/faq')} className="block text-sm transition" style={{color: 'var(--color-text-muted)'}} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-brand)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}>FAQ</button>
                </div>
              </div>
            </div>
            <div className="pt-8 text-center text-sm" style={{borderTop: '1px solid var(--color-border)', color: 'var(--color-text-muted)'}}>
              <p>&copy; 2025 Supplement Safety Bible. Not medical advice. Consult healthcare professionals.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
