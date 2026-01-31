import { Shield, Award, Database, BookOpen, DollarSign } from 'lucide-react';

export default function TrustBadges() {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          {/* Badge 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-3">
              <Shield className="w-8 h-8 text-[#5e2b7e]" />
            </div>
            <h3 className="font-bold text-sm text-gray-900 mb-1">NSF GMP</h3>
            <p className="text-xs text-gray-600">Certified Expertise</p>
          </div>

          {/* Badge 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-3">
              <Award className="w-8 h-8 text-[#5e2b7e]" />
            </div>
            <h3 className="font-bold text-sm text-gray-900 mb-1">20+ Years</h3>
            <p className="text-xs text-gray-600">Manufacturing Experience</p>
          </div>

          {/* Badge 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-3">
              <Database className="w-8 h-8 text-[#5e2b7e]" />
            </div>
            <h3 className="font-bold text-sm text-gray-900 mb-1">15,000+</h3>
            <p className="text-xs text-gray-600">Verified Interactions</p>
          </div>

          {/* Badge 4 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-3">
              <BookOpen className="w-8 h-8 text-[#5e2b7e]" />
            </div>
            <h3 className="font-bold text-sm text-gray-900 mb-1">Evidence-Based</h3>
            <p className="text-xs text-gray-600">Research-Backed</p>
          </div>

          {/* Badge 5 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-3">
              <DollarSign className="w-8 h-8 text-[#5e2b7e]" />
            </div>
            <h3 className="font-bold text-sm text-gray-900 mb-1">100% Free</h3>
            <p className="text-xs text-gray-600">No Registration</p>
          </div>
        </div>

        {/* Trust Statement */}
        <div className="text-center">
          <p className="text-gray-700 text-sm">
            Trusted by 10,000+ monthly users • Created by supplement manufacturing professionals
          </p>
        </div>
      </div>
    </section>
  );
}
