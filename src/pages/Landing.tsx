import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Shield, AlertTriangle, BookOpen, ArrowRight } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">SafetyBible</span>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => navigate('/search')}
                className="text-gray-600 hover:text-gray-900 font-medium transition"
              >
                Browse
              </button>
              <button
                onClick={() => navigate('/admin')}
                className="text-gray-600 hover:text-gray-900 font-medium transition"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Know Your
            <span className="block text-blue-600">Supplement-Medication</span>
            Interactions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Search our comprehensive database of 2,400+ verified interactions between supplements and medications.
            Make informed decisions about your health with evidence-based information.
          </p>

          <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-6">
            <div className="relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search supplements or medications..."
                className="w-full px-6 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:border-blue-500 focus:outline-none pl-14 transition shadow-sm group-hover:shadow-md"
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <p className="text-sm text-gray-500">
            Try searching: "Vitamin K", "Warfarin", "St. John's Wort", or "Aspirin"
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="bg-red-50 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <AlertTriangle className="w-7 h-7 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Severity Ratings
            </h3>
            <p className="text-gray-600 leading-relaxed">
              All interactions are classified from low to severe, helping you understand the risk level and take appropriate action.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Evidence-Based
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our database is built from peer-reviewed research and clinical guidelines, ensuring you get accurate information.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="bg-green-50 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Stay Safe
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Get personalized recommendations on how to safely manage your supplements and medications together.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-center shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Check Interactions?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Browse our complete database and discover potential interactions you should know about.
          </p>
          <button
            onClick={() => navigate('/search')}
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition shadow-md hover:shadow-lg"
          >
            <span>Browse All Interactions</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">SafetyBible</span>
            </div>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Always consult your healthcare provider before making changes to your medication or supplement regimen.
              This information is for educational purposes only.
            </p>
            <p className="text-gray-500 text-xs mt-4">
              © 2025 SafetyBible. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
