import { Pill } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-32 px-4">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#DCE3ED] bg-[#F4F8FF] px-4 py-2 text-sm text-[#1A73E8] font-medium mb-6">
              <span className="inline-block h-2 w-2 rounded-full bg-[#3CB371]" />
              Evidence-based medical guidance
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-[#000000]">
              The Supplement Safety Bible
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-[#4A4A4A] leading-relaxed">
              Your Complete Guide to Safe Supplement—Medication Combinations
            </p>
            <p className="text-lg md:text-xl mb-8 text-[#4A4A4A] leading-relaxed">
              Make safe, confident choices with evidence-based guidance from our library of 2,500+ verified interactions.
            </p>
            <a
              href="/#pricing"
              className="inline-block bg-[#3CB371] hover:bg-[#2D8E57] text-white px-10 py-5 rounded-lg text-xl font-semibold transition-colors"
              style={{boxShadow: '0 4px 12px rgba(60,179,113,0.2)'}}
            >
              Get Instant Access
            </a>
          </div>

          <div className="relative">
            <div className="relative mx-auto max-w-md">
              <div className="relative bg-[#F4F8FF] rounded-3xl p-8 md:p-12 border-2 border-[#DCE3ED]" style={{boxShadow: '0 8px 24px rgba(0,0,0,0.08)'}}>
                <div className="text-center mb-8">
                  <p className="text-[#1A73E8] text-sm uppercase tracking-wider mb-4 font-semibold">Certified Medical Resource</p>
                  <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-6 leading-tight">
                    The Supplement Safety Bible
                  </h2>
                  <p className="text-[#4A4A4A] text-lg leading-relaxed">
                    Your Complete Guide to Supplement—Medication Combinations
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="bg-white rounded-full p-6 border-2 border-[#DCE3ED]" style={{boxShadow: '0 4px 12px rgba(0,0,0,0.06)'}}>
                    <Pill className="w-16 h-16 md:w-20 md:h-20 text-[#1A73E8] transform -rotate-45" strokeWidth={1.5} />
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
