import { Link } from 'react-router-dom';

export default function HowItWorksSection() {
  return (
    <section className="w-full bg-white py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Step 1 */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full text-2xl font-bold mb-4">
              1
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Enter Your Medications</h3>
            <p className="text-gray-600">
              Add all prescription and over-the-counter medications you currently take.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full text-2xl font-bold mb-4">
              2
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Add Your Supplements</h3>
            <p className="text-gray-600">
              List all vitamins, minerals, and herbal supplements you're considering or taking.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full text-2xl font-bold mb-4">
              3
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Get Instant Results</h3>
            <p className="text-gray-600">
              See risk levels and detailed recommendations for each potential interaction.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/check"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg"
            style={{ minHeight: '56px' }}
          >
            Try the Checker Now
          </Link>
        </div>
      </div>
    </section>
  );
}
