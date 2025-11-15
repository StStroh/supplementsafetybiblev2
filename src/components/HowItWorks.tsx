import { FileSearch, Database, ClipboardCheck } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How it works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <FileSearch className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Enter your meds & supplements
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Add your prescription medicines and the supplements you take or plan to take.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-orange-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <Database className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              We scan for risky combinations
            </h3>
            <p className="text-gray-600 leading-relaxed">
              The engine cross-checks 200+ supplements against common medications.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <ClipboardCheck className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Get clear, actionable guidance
            </h3>
            <p className="text-gray-600 leading-relaxed">
              See risk level, mechanism, and talking points for your doctor.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
