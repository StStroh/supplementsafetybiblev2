import { Pill, Beaker, AlertTriangle, FileText, Clock, Shield } from 'lucide-react';

export default function WhatWeScreen() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Supplement Safety Bible Helps You Screen
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive interaction analysis across multiple substance categories, with severity classification and evidence-based rationale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#6B46C1] transition-colors">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Pill className="w-6 h-6 text-[#6B46C1]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Supplement–Medication Interactions
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Screen dietary supplements (vitamins, minerals, herbals, botanicals) against prescription and over-the-counter medications.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#6B46C1] transition-colors">
            <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Controlled Substance Awareness
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Identify potential interactions with narrow-therapeutic-index drugs, anticoagulants, immunosuppressants, and other high-risk medications.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#6B46C1] transition-colors">
            <div className="bg-amber-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Beaker className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Pharmacokinetic & Pharmacodynamic Effects
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Understand CYP enzyme interactions, absorption interference, protein binding displacement, and additive/antagonistic effects.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#6B46C1] transition-colors">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Severity Classification
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Color-coded risk levels (Low, Moderate, High) based on clinical significance, onset timing, and documented outcomes.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#6B46C1] transition-colors">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Timing & Monitoring Guidance
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Recommendations for dose separation, lab monitoring, and clinical signs to watch for when interactions are identified.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#6B46C1] transition-colors">
            <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Evidence-Based Documentation
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              References to peer-reviewed literature, clinical case reports, and pharmacological databases supporting each interaction.
            </p>
          </div>
        </div>

        <div className="mt-12 max-w-3xl mx-auto bg-blue-50 border border-blue-200 rounded-xl p-6">
          <p className="text-sm text-gray-700 leading-relaxed text-center">
            <strong>Educational Use Only:</strong> Supplement Safety Bible provides educational information to support informed decision-making. It does not diagnose, treat, or prescribe. Always consult a licensed healthcare provider before starting, stopping, or changing any medication or supplement regimen.
          </p>
        </div>
      </div>
    </section>
  );
}
