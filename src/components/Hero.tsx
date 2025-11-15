import { Pill } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-400 py-20 md:py-32 px-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              The Supplement Safety Bible
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-teal-50 leading-relaxed">
              Your Complete Guide to Safe Supplement—Medication Combinations
            </p>
            <p className="text-lg md:text-xl mb-8 text-teal-100 leading-relaxed">
              Make safe, confident choices with evidence-based guidance.
            </p>
            <a
              href="/#pricing"
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-xl text-xl font-semibold transition-all shadow-2xl hover:shadow-green-500/50 hover:scale-105"
            >
              Get Instant Access
            </a>
          </div>

          <div className="relative">
            <div className="relative mx-auto max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-800 to-teal-600 rounded-3xl transform rotate-6 shadow-2xl opacity-50"></div>

              <div className="relative bg-gradient-to-br from-teal-500 to-cyan-400 rounded-3xl shadow-2xl p-8 md:p-12 border-8 border-teal-700">
                <div className="text-center mb-8">
                  <p className="text-teal-100 text-sm uppercase tracking-wider mb-4">Certified Nutra Labs</p>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 italic leading-tight">
                    The Supplement Safety Bible
                  </h2>
                  <p className="text-white text-lg italic leading-relaxed">
                    Your Complete Guide to Supplement—Medication Combinations
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 border-4 border-teal-300/50 shadow-xl">
                    <Pill className="w-16 h-16 md:w-20 md:h-20 text-teal-100 transform -rotate-45" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
