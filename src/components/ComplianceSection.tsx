import { ShieldCheck, FileText, Lock, AlertCircle } from 'lucide-react';

export default function ComplianceSection() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Safety, Privacy & Compliance
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Built with healthcare privacy standards and evidence-based practices at the core.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Educational Use Only
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Supplement Safety Bible is an educational decision-support tool. It does not provide medical diagnoses, treatment recommendations, or prescribing guidance. All information should be used in consultation with a licensed healthcare provider.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-[#6B46C1]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Evidence-Based Content
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Interaction data is sourced from peer-reviewed literature, pharmacological databases, and clinical case reports. Content is reviewed and updated regularly as new evidence emerges.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Secure & Private
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Your data is encrypted in transit and at rest. We never sell or share personal health information. Payments are processed securely through Stripe, a PCI-compliant payment processor.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-amber-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Not a Medical Device
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Supplement Safety Bible is not a medical device and is not intended to diagnose, treat, cure, or prevent any disease. It does not replace official prescribing information or clinical judgment.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-red-50 border-2 border-red-200 rounded-xl p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
            Important Medical Disclaimer
          </h3>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <p>
              <strong>Always consult a healthcare professional:</strong> Before starting, stopping, or changing any medication or dietary supplement, consult your physician, pharmacist, or other qualified healthcare provider.
            </p>
            <p>
              <strong>Individual variation:</strong> Responses to drug and supplement interactions can vary based on genetics, health status, other medications, diet, and individual physiology.
            </p>
            <p>
              <strong>Emergency situations:</strong> If you experience severe adverse effects or symptoms of an interaction, seek immediate medical attention or call emergency services.
            </p>
            <p>
              <strong>Professional medical advice:</strong> This tool supports informed conversations with healthcare providers but does not replace professional medical advice, diagnosis, or treatment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
