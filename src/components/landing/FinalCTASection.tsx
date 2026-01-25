import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function FinalCTASection() {
  return (
    <section className="w-full bg-gradient-to-br from-blue-50 to-blue-100 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
          Ready to Check Your Supplements?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Join thousands who've checked their supplement safety for free.
        </p>

        <Link
          to="/check"
          className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          style={{ minHeight: '56px' }}
        >
          Start Your Free Safety Check
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
