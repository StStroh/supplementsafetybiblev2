import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Shield, CheckCircle, FileText, Users, Clock, Zap } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 sticky top-0 z-50 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <span className="text-lg font-semibold text-black">Supplement Safety Bible</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => navigate('/search')}
                className="text-sm font-medium text-gray-700 hover:text-black transition"
              >
                Search
              </button>
              <button
                onClick={() => navigate('/premium')}
                className="text-sm font-medium text-gray-700 hover:text-black transition"
              >
                Premium
              </button>
              <button
                onClick={() => navigate('/faq')}
                className="text-sm font-medium text-gray-700 hover:text-black transition"
              >
                FAQ
              </button>
            </div>

            <button
              onClick={() => navigate('/auth')}
              className="text-sm font-medium text-gray-700 hover:text-black transition"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      <section className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-6xl font-bold text-black mb-6 leading-tight" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Supplement Safety,<br />
                Without Guesswork.
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Instant interactions, clinician-backed guidance, audit-ready outputs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/search')}
                  className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
                >
                  Start Searching
                </button>
                <button
                  onClick={() => navigate('/premium')}
                  className="px-8 py-4 bg-white text-black border-2 border-gray-200 rounded-2xl font-semibold hover:border-gray-300 transition"
                >
                  View Premium
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">⚠️</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-1">St. John's Wort × Sertraline</h3>
                      <p className="text-sm text-gray-600 mb-2">Severe interaction detected</p>
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                        Avoid Use
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1" style={{ marginLeft: '2rem' }}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-1">Magnesium × Doxycycline</h3>
                      <p className="text-sm text-gray-600 mb-2">Moderate interaction</p>
                      <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full">
                        Space Doses
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1" style={{ marginLeft: '4rem' }}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-1">Vitamin D × Calcium</h3>
                      <p className="text-sm text-gray-600 mb-2">Safe combination</p>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                        Compatible
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-3" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Instant Search
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Search 2,400+ verified interactions between supplements and medications in seconds.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-3" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Clinician-Backed
              </h3>
              <p className="text-gray-600 leading-relaxed">
                All data sourced from peer-reviewed research and clinical guidelines.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-3" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                PDF Reports
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Generate professional, audit-ready reports for your patients or records.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-3" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Severity Ratings
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Clear severity classifications from low to severe help guide clinical decisions.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-3" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Team Access
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Premium plans include multi-user access for clinics and practices.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-3" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                24/7 Availability
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Access critical interaction data anytime, anywhere, on any device.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-blue-600 rounded-3xl p-12 shadow-xl">
            <Zap className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
              Check an interaction now
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              See how quickly you can get critical safety information
            </p>
            <button
              onClick={() => navigate('/search?q=niacin%20warfarin')}
              className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold hover:bg-gray-50 transition shadow-lg inline-flex items-center space-x-2"
            >
              <span>Try: Niacin × Warfarin</span>
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-600">© 2025 Supplement Safety Bible</span>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <button onClick={() => navigate('/terms')} className="hover:text-black transition">
                Terms
              </button>
              <span className="text-gray-300">•</span>
              <button onClick={() => navigate('/privacy')} className="hover:text-black transition">
                Privacy
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
