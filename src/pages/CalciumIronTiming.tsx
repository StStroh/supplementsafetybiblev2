import { useNavigate } from 'react-router-dom';
import { Shield, Clock, BookOpen, CheckCircle, Info, Pill } from 'lucide-react';
import { SEO, StructuredData } from '../lib/seo';
import { useState } from 'react';

export default function CalciumIronTiming() {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState<number | null>(null);

  const faqData = [
    {
      question: "How far apart should I take calcium and iron supplements?",
      answer: "Clinical guidance typically recommends taking calcium and iron supplements at least 2 hours apart. This spacing minimizes competitive absorption at the intestinal level. Some sources suggest 3-4 hours for maximum absorption efficiency, particularly for individuals with iron deficiency."
    },
    {
      question: "Can I take calcium and iron tablets together?",
      answer: "While not inherently dangerous, taking calcium and iron tablets together is generally not recommended for optimal absorption. Calcium can interfere with iron absorption in the gastrointestinal tract. Taking them at separate times allows each mineral to be absorbed more effectively."
    },
    {
      question: "Do calcium and iron compete for absorption?",
      answer: "Yes. Calcium and iron compete for absorption through shared transport mechanisms in the intestinal lining. High calcium intake at the same time as iron supplementation can reduce the amount of iron your body absorbs. This is why spacing is recommended."
    },
    {
      question: "What if I forget to space them out?",
      answer: "Missing optimal spacing occasionally is not a medical emergency. However, consistent failure to space calcium and iron may reduce iron absorption over time, potentially affecting iron status. If you have questions about your supplementation schedule, consult your healthcare provider."
    },
    {
      question: "Does this apply to food sources too?",
      answer: "The interaction primarily applies when calcium and iron are consumed in concentrated supplemental forms. Dietary calcium and iron from food typically do not pose the same level of concern, as food matrices contain other compounds that influence absorption differently. However, individuals with iron deficiency should discuss meal timing with their healthcare provider."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Calcium and Iron Timing: How Far Apart to Take These Supplements",
    "description": "Evidence-based guidance on calcium and iron supplement spacing, absorption competition, and optimal timing strategies for maximizing mineral bioavailability.",
    "author": {
      "@type": "Organization",
      "name": "Supplement Safety Bible"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Supplement Safety Bible"
    },
    "datePublished": "2025-01-10",
    "dateModified": "2025-01-10"
  };

  return (
    <>
      <SEO
        title="Calcium and Iron Timing: How Far Apart to Take Supplements | Supplement Safety Bible"
        description="Learn how far apart to take calcium and iron supplements, why these minerals compete for absorption, and evidence-based timing strategies for optimal bioavailability."
        canonical="/guides/calcium-and-iron-timing"
      />
      <StructuredData data={faqSchema} />
      <StructuredData data={articleSchema} />

      <div className="min-h-screen bg-white">
        <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
                <Shield className="w-7 h-7 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Supplement Safety Bible</span>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <button onClick={() => navigate('/check')} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                  Checker
                </button>
                <button onClick={() => navigate('/pricing')} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                  Pricing
                </button>
                <button onClick={() => navigate('/faq')} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                  FAQ
                </button>
              </div>
            </div>
          </div>
        </nav>

        <article className="pt-12 pb-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-100 rounded-full mb-4">
                <Clock className="w-7 h-7 text-emerald-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Calcium and Iron Timing: How Far Apart to Take These Supplements
              </h1>
              <p className="text-lg text-gray-600">
                Evidence-based guidance on supplement spacing, absorption competition, and optimal timing strategies for calcium and iron.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-10">
                <div className="flex items-start gap-3 mb-4">
                  <Info className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-2">
                      Why Timing Matters
                    </h2>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Calcium and iron are essential minerals required for multiple physiological functions. Calcium supports bone health, muscle function, and nerve signaling. Iron is critical for oxygen transport, energy production, and immune function.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  However, when taken together, these minerals can interfere with each other's absorption. This is not due to a dangerous chemical reaction, but rather a competitive process at the level of intestinal absorption.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Understanding the timing relationship between calcium and iron supplements allows individuals to maximize the benefit of supplementation while avoiding unnecessary nutrient competition.
                </p>
              </section>

              <section className="mb-10">
                <div className="flex items-start gap-3 mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-2">
                      The Science of Absorption Competition
                    </h2>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Calcium and iron compete for absorption through shared transport mechanisms in the gastrointestinal tract. Both minerals rely on similar pathways to cross from the intestinal lumen into the bloodstream.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When high amounts of calcium are present during iron absorption, calcium can occupy these transport sites, reducing the amount of iron that successfully enters the body. This effect is dose-dependent: higher calcium intake results in greater interference.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Research indicates that calcium doses above 300-600 mg can significantly inhibit non-heme iron absorption. Non-heme iron is the form found in plant foods and most iron supplements.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The interference is temporary and localized to the time of ingestion. Spacing supplements by at least 2 hours minimizes this competitive effect, allowing each mineral to be absorbed without significant interference.
                </p>
              </section>

              <section className="mb-10">
                <div className="flex items-start gap-3 mb-4">
                  <Clock className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-2">
                      Recommended Timing Strategies
                    </h2>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Evidence-based timing recommendations for calcium and iron supplementation include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li><strong>Minimum spacing:</strong> At least 2 hours between calcium and iron supplements</li>
                  <li><strong>Optimal spacing:</strong> 3-4 hours for individuals with iron deficiency or high calcium needs</li>
                  <li><strong>Morning iron:</strong> Taking iron in the morning on an empty stomach (if tolerated) can maximize absorption</li>
                  <li><strong>Evening calcium:</strong> Taking calcium in the evening can support bone health and avoid daytime interference</li>
                  <li><strong>With meals:</strong> If iron causes stomach upset, take with a small amount of food (avoiding high-calcium foods)</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Individual circumstances vary. Some people may need to adjust timing based on medication schedules, meal patterns, or digestive tolerance. Healthcare providers can provide personalized guidance.
                </p>
              </section>

              <section className="mb-10">
                <div className="flex items-start gap-3 mb-4">
                  <Pill className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-2">
                      Practical Implementation
                    </h2>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Implementing effective supplement timing requires consideration of daily routines, meal patterns, and other medications or supplements. Here are practical strategies:
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Example Schedule</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>7:00 AM:</strong> Iron supplement with vitamin C (orange juice or supplement)</li>
                    <li><strong>12:00 PM:</strong> Lunch (normal meals)</li>
                    <li><strong>7:00 PM:</strong> Calcium supplement with dinner or before bed</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-3 italic">
                    This provides 12 hours of separation, well beyond the minimum requirement.
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Additional considerations:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Avoid taking calcium-fortified foods or dairy near iron supplement time</li>
                  <li>Vitamin C enhances iron absorption; consider pairing iron with citrus or a vitamin C supplement</li>
                  <li>Coffee, tea, and high-fiber foods can also reduce iron absorption; space these as well</li>
                  <li>Set phone reminders or use pill organizers to maintain consistent timing</li>
                  <li>If taking multiple supplements, create a daily schedule to avoid conflicts</li>
                </ul>
              </section>

              <section className="mb-10">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-2">
                      Common Misconceptions
                    </h2>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Several misconceptions exist about calcium and iron supplementation. Here are clarifications:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li><strong>Misconception:</strong> Taking them together is dangerous. <strong>Reality:</strong> It's not unsafe, just less efficient for absorption.</li>
                  <li><strong>Misconception:</strong> Food sources don't cause the same interaction. <strong>Reality:</strong> High-calcium meals can reduce iron absorption, but the effect is less pronounced than with supplements.</li>
                  <li><strong>Misconception:</strong> All forms of iron are equally affected. <strong>Reality:</strong> Heme iron (from meat) is less affected by calcium than non-heme iron (from plants and supplements).</li>
                  <li><strong>Misconception:</strong> Spacing by 30 minutes is enough. <strong>Reality:</strong> Clinical guidance recommends at least 2 hours, preferably 3-4 hours.</li>
                  <li><strong>Misconception:</strong> This applies to everyone. <strong>Reality:</strong> Individuals not taking supplements or those with adequate intake from diet may not need to worry about timing.</li>
                </ul>
              </section>

              <section className="mb-10 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-2">
                      How Interaction Screening Tools Help
                    </h2>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When managing multiple supplements and medications, keeping track of timing interactions becomes complex. Supplement-medication interaction screening tools provide a systematic approach to identifying these considerations.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our <a href="/check" className="text-blue-600 hover:text-blue-800 underline font-medium">supplement interaction checker</a> allows you to input all your current supplements and medications to identify potential timing conflicts, absorption interactions, and other clinically relevant concerns.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The tool can flag:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Mineral absorption competitions (calcium-iron, calcium-zinc, iron-zinc)</li>
                  <li>Medications that affect mineral absorption (PPIs, H2 blockers, antacids)</li>
                  <li>Supplements that enhance or inhibit mineral uptake</li>
                  <li>Timing recommendations for specific combinations</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  While these tools do not replace medical advice, they serve as a safety layer to help you and your healthcare provider optimize your supplement regimen.
                </p>
              </section>

              <section className="mb-10 border-l-4 border-gray-300 pl-6 py-4 bg-gray-50">
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  Educational Disclaimer
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  This page provides educational information only. It is not medical advice, diagnosis, or treatment. It does not establish a provider-patient relationship.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Always consult a qualified healthcare professional before starting, stopping, or changing any supplement or medication regimen. Individual needs vary based on health status, diet, medications, and other factors.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  If you experience symptoms such as unusual fatigue, weakness, dizziness, or other concerning changes while taking supplements, contact your healthcare provider.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The information on this page is based on published research and clinical references. It is provided for educational purposes to support informed conversations with healthcare professionals.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqData.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => setOpenSection(openSection === index ? null : index)}
                        className="w-full text-left px-5 py-4 font-semibold text-gray-900 hover:bg-gray-50 transition flex items-center justify-between"
                      >
                        <span>{faq.question}</span>
                        <svg
                          className={`w-5 h-5 transition-transform ${openSection === index ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openSection === index && (
                        <div className="px-5 pb-4 text-gray-700 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Resources</h2>
                <div className="grid gap-3">
                  <a
                    href="/check"
                    className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
                  >
                    <span className="text-blue-600 font-medium">Check Your Supplement Stack for Interactions</span>
                  </a>
                  <a
                    href="/search?q=calcium%20absorption%20interference"
                    className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
                  >
                    <span className="text-blue-600 font-medium">Calcium Absorption Interference</span>
                  </a>
                  <a
                    href="/search?q=iron%20supplement%20timing"
                    className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
                  >
                    <span className="text-blue-600 font-medium">Iron Supplement Timing Strategies</span>
                  </a>
                  <a
                    href="/search?q=mineral%20competition"
                    className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
                  >
                    <span className="text-blue-600 font-medium">Mineral Competition and Bioavailability</span>
                  </a>
                </div>
              </section>

              <section className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Screen Your Supplement Stack
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Check all your supplements and medications for timing interactions, absorption conflicts, and safety concerns.
                </p>
                <button
                  onClick={() => navigate('/check')}
                  className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition shadow-md"
                >
                  Check Interactions Now
                </button>
              </section>
            </div>
          </div>
        </article>

        <footer className="bg-gray-50 border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
            <p className="mb-2">Educational resource provided by Supplement Safety Bible</p>
            <div className="flex justify-center gap-6">
              <button onClick={() => navigate('/privacy')} className="hover:text-blue-600 transition">
                Privacy
              </button>
              <button onClick={() => navigate('/terms')} className="hover:text-blue-600 transition">
                Terms
              </button>
              <button onClick={() => navigate('/faq')} className="hover:text-blue-600 transition">
                FAQ
              </button>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
