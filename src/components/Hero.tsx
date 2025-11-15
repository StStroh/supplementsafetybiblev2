import { ShieldCheck, Search, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-white py-12 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Don't mix blind.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Check dangerous interactions between supplements and prescription medicines in seconds, before they reach your body.
            </p>
            <a
              href="/#checker"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl mb-3"
            >
              Start free safety check
            </a>
            <p className="text-sm text-gray-500 mb-8">
              No credit card needed. Includes 200+ of the most-used supplements.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700">
                  Covers 200+ supplements & common prescription drugs
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <AlertTriangle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700">
                  Highlights risky combinations clearly (Low / Moderate / High)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700">
                  Backed by scientific references & clinical data
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-xl border border-blue-100">
            <div className="bg-white rounded-xl p-6 shadow-md mb-4">
              <div className="flex items-center gap-3 mb-4">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Add supplement..."
                  className="flex-1 outline-none text-gray-600"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <div className="bg-blue-50 px-4 py-3 rounded-lg border border-blue-200">
                  <span className="text-sm font-medium text-blue-900">Vitamin D3</span>
                </div>
                <div className="bg-blue-50 px-4 py-3 rounded-lg border border-blue-200">
                  <span className="text-sm font-medium text-blue-900">Fish Oil (Omega-3)</span>
                </div>
                <div className="bg-blue-50 px-4 py-3 rounded-lg border border-blue-200">
                  <span className="text-sm font-medium text-blue-900">Warfarin (Blood Thinner)</span>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-3">
                <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-orange-900 mb-1">High Risk Interaction</h4>
                  <p className="text-sm text-orange-800 leading-relaxed">
                    Fish Oil may increase bleeding risk when combined with Warfarin. Consult your doctor before combining.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
