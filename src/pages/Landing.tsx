import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, FileText, Clock, Users, TrendingUp, ArrowRight, BadgeCheck } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Instant Results',
      description: 'Get interaction data in seconds, not hours.'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Audit-Ready Reports',
      description: 'Export professional PDFs for charts and compliance.'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Real-Time Updates',
      description: 'Database updated with latest clinical research.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Clinician-Backed',
      description: 'Vetted by pharmacists and medical professionals.'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Severity Ratings',
      description: 'Clear risk levels from low to severe interactions.'
    },
    {
      icon: <BadgeCheck className="w-6 h-6" />,
      title: 'Evidence-Based',
      description: 'Built on peer-reviewed research and guidelines.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-7 h-7 text-blue-600" />
              <span className="text-xl font-semibold text-slate-900">SafetyBible</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/search')}
                className="text-slate-600 hover:text-slate-900 font-medium transition px-4 py-2"
              >
                Search
              </button>
              <button
                onClick={() => navigate('/premium')}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Premium
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
              Supplement Safety,<br />Without Guesswork.
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 mb-10 leading-relaxed">
              Instant interactions, clinician-backed guidance, audit-ready outputs.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={() => navigate('/search')}
                className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Start Searching</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/premium')}
                className="w-full sm:w-auto bg-white text-slate-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-50 transition border-2 border-slate-200"
              >
                View Premium Plans
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center space-x-2">
                <BadgeCheck className="w-5 h-5 text-green-600" />
                <span>FDA-referenced data</span>
              </div>
              <div className="flex items-center space-x-2">
                <BadgeCheck className="w-5 h-5 text-green-600" />
                <span>NSF-certified sources</span>
              </div>
              <div className="flex items-center space-x-2">
                <BadgeCheck className="w-5 h-5 text-green-600" />
                <span>2,400+ interactions</span>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Warfarin + Vitamin K', severity: 'High', color: 'red' },
              { title: 'Aspirin + Fish Oil', severity: 'Moderate', color: 'yellow' },
              { title: 'Lisinopril + Potassium', severity: 'High', color: 'red' }
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-900">{card.title}</h3>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    card.color === 'red' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {card.severity}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  {card.color === 'red' ? 'Significant interaction requiring medical supervision.' : 'Monitor for potential effects and adjust timing.'}
                </p>
                <button
                  onClick={() => navigate(`/search?q=${encodeURIComponent(card.title)}`)}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Professional-grade tools for clinicians, researchers, and health-conscious individuals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border border-slate-100"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-12 text-center shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Check an Interaction Now
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Try searching for a common interaction like Niacin and Warfarin to see how our system works.
            </p>
            <button
              onClick={() => navigate('/search?q=niacin%20warfarin')}
              className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition shadow-lg hover:shadow-2xl"
            >
              <span>Search Niacin + Warfarin</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-semibold text-slate-900">SafetyBible</span>
            </div>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto mb-4">
              Always consult your healthcare provider before making changes to your medication or supplement regimen.
              This information is for educational purposes only.
            </p>
            <p className="text-slate-500 text-xs">
              © 2025 SafetyBible. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
