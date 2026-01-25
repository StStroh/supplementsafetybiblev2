import { Users, Shield, Clock } from 'lucide-react';

export default function TrustSignalsSection() {
  return (
    <section className="w-full bg-white py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Made for People Who Don't Want to Guess */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Made for People Who Don't Want to Guess</h3>
            <p className="text-gray-600">
              Fast checks, plain language, and a safety-first approach.
            </p>
          </div>

          {/* Evidence-Based */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Evidence-Based</h3>
            <p className="text-gray-600">
              All interaction data is backed by peer-reviewed medical research and clinical studies.
            </p>
          </div>

          {/* Regularly Updated */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Regularly Updated</h3>
            <p className="text-gray-600">
              Our database is updated monthly with the latest interaction research and safety data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
