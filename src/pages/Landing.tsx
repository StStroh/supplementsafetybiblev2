import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Shield, AlertTriangle, BookOpen } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">SafetyBible</span>
            </div>
            <button
              onClick={() => navigate('/admin')}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Admin
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Check Supplement-Medication Interactions
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Know before you take. Search 2,400+ interactions between supplements and medications.
          </p>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search supplements or medications..."
                className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:border-blue-500 focus:outline-none pl-14"
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-8 py-2 rounded-full hover:bg-blue-700 transition"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Severity Ratings
            </h3>
            <p className="text-gray-600">
              All interactions are classified from low to severe, helping you understand the risk level.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <BookOpen className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Evidence-Based
            </h3>
            <p className="text-gray-600">
              Our database is built from peer-reviewed research and clinical guidelines.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <Shield className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Stay Safe
            </h3>
            <p className="text-gray-600">
              Get personalized recommendations on how to safely manage your supplements and medications.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={() => navigate('/search')}
            className="inline-flex items-center space-x-2 bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition"
          >
            <span>Browse All Interactions</span>
          </button>
        </div>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 text-sm">
            © 2025 SafetyBible. Always consult your healthcare provider before making changes to your medication or supplement regimen.
          </p>
        </div>
      </footer>
    </div>
  );
}
