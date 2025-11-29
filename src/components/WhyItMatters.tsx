import { X, Check } from 'lucide-react';

export default function WhyItMatters() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-4">
            Why this matters
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-[#FFEBEE] border-2 border-[#B00020]/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center border border-[#B00020]/20">
                <X className="w-6 h-6 text-[#B00020]" />
              </div>
              <h3 className="text-2xl font-bold text-[#000000]">
                Without checking
              </h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-[#B00020] flex-shrink-0 mt-0.5" />
                <span className="text-[#4A4A4A]">
                  Guessing from forums and unverified sources
                </span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-[#B00020] flex-shrink-0 mt-0.5" />
                <span className="text-[#4A4A4A]">
                  Hidden interactions that can cause harm
                </span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-[#B00020] flex-shrink-0 mt-0.5" />
                <span className="text-[#4A4A4A]">
                  No documentation to share with your doctor
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-[#E8F5E9] border-2 border-[#1B5E20]/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center border border-[#1B5E20]/20">
                <Check className="w-6 h-6 text-[#1B5E20]" />
              </div>
              <h3 className="text-2xl font-bold text-[#000000]">
                With Don't Mix Blind
              </h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#1B5E20] flex-shrink-0 mt-0.5" />
                <span className="text-[#4A4A4A]">
                  Structured report based on clinical evidence
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#1B5E20] flex-shrink-0 mt-0.5" />
                <span className="text-[#4A4A4A]">
                  Clear severity levels (Low, Moderate, High)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#1B5E20] flex-shrink-0 mt-0.5" />
                <span className="text-[#4A4A4A]">
                  Shareable summary for your healthcare provider
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
