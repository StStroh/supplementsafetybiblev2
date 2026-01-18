import { useNavigate } from 'react-router-dom';
import { Shield, Check, Baby, Heart, AlertCircle, Lock, FileText, Users } from 'lucide-react';
import { SEO, StructuredData } from '../lib/seo';
import { useState } from 'react';

export default function PregnancyLactation() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqData = [
    {
      question: "Is this pregnancy supplement checker free?",
      answer: "Yes, the basic Pregnancy & Lactation Safety Checker is completely free. It provides essential safety guidance on supplement use during pregnancy and breastfeeding. For comprehensive analysis including medication interactions, dosage thresholds, and detailed risk assessments, upgrade to the Full Safety Checker."
    },
    {
      question: "Does this replace advice from my doctor or midwife?",
      answer: "No. This tool provides educational safety information only and does not replace professional medical advice. Always consult your healthcare provider, doctor, or midwife before taking any supplements during pregnancy or while breastfeeding."
    },
    {
      question: "Are natural supplements always safe during pregnancy?",
      answer: "No. Natural does not mean safe. Many supplements can cross the placenta, affect fetal development, or transfer into breast milk. Some may cause hormonal effects, uterine stimulation, or pose other risks. Many supplements lack adequate safety data for pregnancy and lactation."
    },
    {
      question: "Does the full version include medication interactions?",
      answer: "Yes. The Full Safety Checker includes comprehensive supplement-medication interaction analysis, pregnancy-specific dosage thresholds, lactation transfer risk assessments, and red-flag situations that require immediate medical supervision."
    },
    {
      question: "How often is the safety information updated?",
      answer: "Our database is continuously updated with the latest evidence from peer-reviewed medical literature, clinical guidelines, and safety alerts to ensure you have access to current, evidence-based information."
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

  return (
    <>
      <SEO
        title="Pregnancy & Lactation Supplement Safety Checker | Supplement Safety Bible"
        description="Check supplement safety during pregnancy and breastfeeding. Free evidence-based guidance. Upgrade for interactions, dosage limits, and red-flag risks."
        canonical="/pregnancy-lactation-safety"
      />
      <StructuredData data={faqSchema} />

      <div className="min-h-screen bg-white">
        <nav className="border-b border-gray-200 bg-white">
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

        <section className="pt-16 pb-20 bg-gradient-to-b from-pink-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-6">
                <Baby className="w-8 h-8 text-pink-600" />
              </div>
              <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
                Pregnancy & Lactation Supplement Safety Checker
              </h1>
              <p className="text-xl text-gray-600 mb-4 leading-relaxed">
                Get essential, evidence-based safety guidance on supplements during pregnancy, breastfeeding, and lactation — free.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Quickly identify supplements that may pose risks during pregnancy or nursing, including hormonal effects, fetal concerns, and milk-transfer considerations.
              </p>
              <p className="text-base text-gray-500 mb-8">
                For complete safety data — including interactions, dosage limits, and red-flag situations — upgrade to the Full Safety Checker.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/check')}
                  className="px-8 py-4 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition shadow-lg"
                >
                  Check Pregnancy & Lactation Safety (Free)
                </button>
                <button
                  onClick={() => navigate('/pricing')}
                  className="px-8 py-4 bg-white text-pink-600 font-semibold rounded-lg border-2 border-pink-600 hover:bg-pink-50 transition"
                >
                  Upgrade to Full Safety Checker
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Free Pregnancy & Breastfeeding Safety Insights</h2>
              <p className="text-lg text-gray-600">What this checker covers at no cost</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Pregnancy Safety Status</h3>
                <p className="text-gray-600">Clear classifications: Use with caution, Avoid, or Insufficient data</p>
              </div>
              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Breastfeeding & Lactation Considerations</h3>
                <p className="text-gray-600">Milk transfer risks and infant exposure information</p>
              </div>
              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Known Concerns from Clinical Data</h3>
                <p className="text-gray-600">Evidence from human studies and clinical observations</p>
              </div>
              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <AlertCircle className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Common Risk Flags</h3>
                <p className="text-gray-600">Hormonal effects, uterine stimulation, and infant exposure alerts</p>
              </div>
              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Plain-Language Safety Summaries</h3>
                <p className="text-gray-600">Easy-to-understand explanations for patients and professionals</p>
              </div>
              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Educational & Risk-Awareness Focused</h3>
                <p className="text-gray-600">Designed to inform decision-making, not replace medical advice</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Upgrade for Complete Maternal Safety Analysis</h2>
              <p className="text-lg text-gray-600">Get comprehensive protection with the Full Safety Checker</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-start space-x-3">
                  <Check className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Supplement–Medication Interaction Checks</h3>
                    <p className="text-gray-600 text-sm">Identify dangerous combinations with prenatal vitamins, prescriptions, and OTC medications</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-start space-x-3">
                  <Check className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Pregnancy-Specific Dosage Thresholds</h3>
                    <p className="text-gray-600 text-sm">Safe upper limits and trimester-specific guidance</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-start space-x-3">
                  <Check className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Lactation Transfer Risk Assessment</h3>
                    <p className="text-gray-600 text-sm">Detailed analysis of breast milk exposure and infant risk</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-start space-x-3">
                  <Check className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Red-Flag Situations Requiring Medical Supervision</h3>
                    <p className="text-gray-600 text-sm">Immediate alerts for high-risk scenarios</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-start space-x-3">
                  <Check className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Severity Levels (Low / Moderate / High)</h3>
                    <p className="text-gray-600 text-sm">Clear risk stratification for informed decisions</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-start space-x-3">
                  <Check className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Downloadable Safety Reports</h3>
                    <p className="text-gray-600 text-sm">PDF reports to share with your healthcare team</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-start space-x-3">
                  <Check className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Continuously Updated Evidence</h3>
                    <p className="text-gray-600 text-sm">Latest research and safety alerts as they emerge</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-10">
              <button
                onClick={() => navigate('/pricing')}
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg"
              >
                View Pricing & Upgrade
              </button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Supplement Safety Is Different During Pregnancy and Breastfeeding</h2>
              <p className="text-lg text-gray-600">Understanding the unique risks for mothers and babies</p>
            </div>
            <div className="space-y-6">
              <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                  <AlertCircle className="w-5 h-5 text-amber-600 mr-2" />
                  Placental Transfer
                </h3>
                <p className="text-gray-700">
                  Many supplements cross the placenta and can directly affect fetal development. What seems safe for an adult may pose significant risks to a developing baby.
                </p>
              </div>
              <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                  <AlertCircle className="w-5 h-5 text-amber-600 mr-2" />
                  Breast Milk Exposure
                </h3>
                <p className="text-gray-700">
                  Supplements and their metabolites can transfer into breast milk, exposing nursing infants to substances their immature systems may not handle well.
                </p>
              </div>
              <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                  <AlertCircle className="w-5 h-5 text-amber-600 mr-2" />
                  Hormonal Sensitivity
                </h3>
                <p className="text-gray-700">
                  Pregnancy and lactation involve complex hormonal changes. Some supplements can interfere with these processes, potentially triggering uterine contractions or affecting milk production.
                </p>
              </div>
              <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                  <AlertCircle className="w-5 h-5 text-amber-600 mr-2" />
                  Natural Does Not Mean Safe
                </h3>
                <p className="text-gray-700">
                  Many people assume herbal and natural supplements are automatically safe. This is a dangerous misconception. Natural substances can be potent and carry real risks during pregnancy and breastfeeding.
                </p>
              </div>
              <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                  <AlertCircle className="w-5 h-5 text-amber-600 mr-2" />
                  Lack of Safety Data
                </h3>
                <p className="text-gray-700">
                  Most supplements have never been rigorously tested in pregnant or breastfeeding individuals. Absence of evidence does not mean evidence of safety.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Who Should Use the Pregnancy & Lactation Safety Checker</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mb-3">
                  <Baby className="w-5 h-5 text-pink-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Pregnant Individuals</h3>
                <p className="text-gray-600">Expecting parents who want to ensure supplement safety before and during pregnancy</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mb-3">
                  <Heart className="w-5 h-5 text-pink-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Breastfeeding or Lactating Parents</h3>
                <p className="text-gray-600">Nursing parents concerned about supplement transfer through breast milk</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 text-pink-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Healthcare Professionals</h3>
                <p className="text-gray-600">Obstetricians, midwives, lactation consultants, and family physicians</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5 text-pink-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Wellness Practitioners</h3>
                <p className="text-gray-600">Nutritionists, pharmacists, doulas, and wellness professionals advising pregnant or nursing clients</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                  >
                    <h3 className="font-semibold text-lg text-gray-900 pr-4">{faq.question}</h3>
                    <div className={`transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-red-50 border-y-2 border-red-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Medical Disclaimer</h2>
                <p className="text-gray-700 leading-relaxed">
                  This tool provides educational safety information only and does not replace medical advice. Always consult a qualified healthcare professional before using supplements during pregnancy or breastfeeding. The information provided is for educational and informational purposes only and should not be considered a substitute for professional medical advice, diagnosis, or treatment.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Check Supplement Safety?</h2>
            <p className="text-lg text-gray-600 mb-8">Start with our free pregnancy and lactation safety checker today</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/check')}
                className="px-8 py-4 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition shadow-lg"
              >
                Start Free Safety Check
              </button>
              <button
                onClick={() => navigate('/pricing')}
                className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition"
              >
                Compare Plans
              </button>
            </div>
          </div>
        </section>

        <footer className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <span className="font-bold text-gray-900">Supplement Safety Bible</span>
                </div>
                <p className="text-sm text-gray-600">Evidence-based supplement safety information for healthcare professionals and patients.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
                <div className="space-y-2">
                  <button onClick={() => navigate('/check')} className="block text-sm text-gray-600 hover:text-blue-600">Safety Checker</button>
                  <button onClick={() => navigate('/pricing')} className="block text-sm text-gray-600 hover:text-blue-600">Pricing</button>
                  <button onClick={() => navigate('/premium')} className="block text-sm text-gray-600 hover:text-blue-600">Premium</button>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
                <div className="space-y-2">
                  <button onClick={() => navigate('/terms')} className="block text-sm text-gray-600 hover:text-blue-600">Terms</button>
                  <button onClick={() => navigate('/privacy')} className="block text-sm text-gray-600 hover:text-blue-600">Privacy</button>
                  <button onClick={() => navigate('/faq')} className="block text-sm text-gray-600 hover:text-blue-600">FAQ</button>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
              <p>&copy; 2025 Supplement Safety Bible. Not medical advice. Consult healthcare professionals.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
