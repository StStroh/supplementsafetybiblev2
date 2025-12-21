import { Users, Stethoscope, Store } from 'lucide-react';

export default function WhoItsFor() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Who Supplement Safety Bible Is For
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Designed for anyone who needs accurate, evidence-based information about supplement and medication interactions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center hover:border-[#6B46C1] transition-colors">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-[#6B46C1]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Informed Consumers
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Individuals taking both prescription medications and dietary supplements who want to understand potential interactions.
            </p>
            <ul className="text-left text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-[#6B46C1] mt-0.5">•</span>
                <span>Check supplements before starting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6B46C1] mt-0.5">•</span>
                <span>Share reports with healthcare providers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6B46C1] mt-0.5">•</span>
                <span>Make safer, more informed decisions</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center hover:border-[#6B46C1] transition-colors">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Stethoscope className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Healthcare Professionals
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Physicians, pharmacists, nurses, and other clinicians who need quick reference for supplement–drug interactions.
            </p>
            <ul className="text-left text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Screen patient medication lists efficiently</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Generate patient-ready educational materials</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Access evidence-based rationale quickly</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center hover:border-[#6B46C1] transition-colors">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Store className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Supplement Retailers & Brands
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Retailers, formulators, and brand owners who want to provide responsible product guidance and safety information.
            </p>
            <ul className="text-left text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span>Train staff on interaction awareness</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span>Support customers with evidence-based info</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span>Demonstrate product safety commitment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
