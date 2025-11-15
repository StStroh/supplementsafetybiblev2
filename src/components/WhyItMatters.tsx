import { X, Check } from 'lucide-react';

export default function WhyItMatters() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why this matters
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center">
                <X className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-red-900">
                Without checking
              </h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-red-900">
                  Guessing from forums and unverified sources
                </span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-red-900">
                  Hidden interactions that can cause harm
                </span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-red-900">
                  No documentation to share with your doctor
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-green-900">
                With Supplement Safety Bible
              </h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-green-900">
                  Structured report based on clinical evidence
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-green-900">
                  Clear severity levels (Low, Moderate, High)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-green-900">
                  Shareable summary for your healthcare provider
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
