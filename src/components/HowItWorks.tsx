import { FileSearch, Database, ClipboardCheck } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-4">
            How it works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#F4F8FF] rounded-2xl p-8 border border-[#DCE3ED] transition-shadow" style={{boxShadow: '0 2px 8px rgba(0,0,0,0.04)'}}>
            <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-[#DCE3ED]" style={{boxShadow: '0 2px 6px rgba(0,0,0,0.06)'}}>
              <FileSearch className="w-8 h-8 text-[#1A73E8]" />
            </div>
            <h3 className="text-xl font-bold text-[#000000] mb-4">
              Enter your meds & supplements
            </h3>
            <p className="text-[#4A4A4A] leading-relaxed">
              Add your prescription medicines and the supplements you take or plan to take.
            </p>
          </div>

          <div className="bg-[#F4F8FF] rounded-2xl p-8 border border-[#DCE3ED] transition-shadow" style={{boxShadow: '0 2px 8px rgba(0,0,0,0.04)'}}>
            <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-[#DCE3ED]" style={{boxShadow: '0 2px 6px rgba(0,0,0,0.06)'}}>
              <Database className="w-8 h-8 text-[#1A73E8]" />
            </div>
            <h3 className="text-xl font-bold text-[#000000] mb-4">
              We scan for risky combinations
            </h3>
            <p className="text-[#4A4A4A] leading-relaxed">
              The engine cross-checks 200+ supplements against common medications.
            </p>
          </div>

          <div className="bg-[#F4F8FF] rounded-2xl p-8 border border-[#DCE3ED] transition-shadow" style={{boxShadow: '0 2px 8px rgba(0,0,0,0.04)'}}>
            <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-[#DCE3ED]" style={{boxShadow: '0 2px 6px rgba(0,0,0,0.06)'}}>
              <ClipboardCheck className="w-8 h-8 text-[#3CB371]" />
            </div>
            <h3 className="text-xl font-bold text-[#000000] mb-4">
              Get clear, actionable guidance
            </h3>
            <p className="text-[#4A4A4A] leading-relaxed">
              See risk level, mechanism, and talking points for your doctor.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
