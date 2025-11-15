import { FlaskConical, Building2, Stethoscope } from 'lucide-react';

export default function Trust() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Built by nutraceutical and quality experts
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FlaskConical className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-gray-700 leading-relaxed">
              Evidence-based data from scientific and clinical sources
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-gray-700 leading-relaxed">
              Built by a GMP/NSF-certified nutraceutical manufacturer
            </p>
          </div>

          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-gray-700 leading-relaxed">
              Designed to support doctor–patient decisions (not replace them)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
