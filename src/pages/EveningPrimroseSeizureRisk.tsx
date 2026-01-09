import { useNavigate } from 'react-router-dom';
import { Shield, AlertTriangle, BookOpen, CheckCircle, Info, Users } from 'lucide-react';
import { SEO, StructuredData } from '../lib/seo';
import { useState } from 'react';

export default function EveningPrimroseSeizureRisk() {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState<number | null>(null);

  const faqData = [
    {
      question: "Does evening primrose oil cause seizures?",
      answer: "Evening primrose oil does not universally cause seizures. However, clinical references note that gamma-linolenic acid (GLA), a component of evening primrose oil, may lower seizure threshold in susceptible individuals. The risk is conditional, not absolute."
    },
    {
      question: "What are phenothiazines and why do they matter?",
      answer: "Phenothiazines are a class of medications used for psychiatric conditions and nausea. They are independently known to affect seizure threshold. When combined with supplements that may also influence seizure activity, additional caution is warranted."
    },
    {
      question: "Should I stop taking evening primrose oil if I have epilepsy?",
      answer: "This is a question for your healthcare provider. Individuals with seizure disorders or those taking medications that affect seizure threshold should discuss supplement use with their medical team before making changes."
    },
    {
      question: "Is this page medical advice?",
      answer: "No. This page provides educational information only. It does not diagnose, treat, or replace guidance from a qualified healthcare professional."
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
    "headline": "Evening Primrose Oil and Seizure Risk: What Clinical Literature Shows",
    "description": "Educational overview of evening primrose oil seizure risk considerations, gamma-linolenic acid effects on seizure threshold, and phenothiazine interactions.",
    "author": {
      "@type": "Organization",
      "name": "Supplement Safety Bible"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Supplement Safety Bible"
    },
    "datePublished": "2025-01-09",
    "dateModified": "2025-01-09"
  };

  return (
    <>
      <SEO
        title="Evening Primrose Oil Seizure Risk: Epilepsy and Phenothiazine Caution | Supplement Safety Bible"
        description="Learn why evening primrose oil seizure risk questions arise, what clinical literature shows about gamma-linolenic acid and seizure threshold, and who should use caution with epilepsy or phenothiazines."
        canonical="/evening-primrose-oil-seizure-risk-epilepsy-phenothiazines"
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
              <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-100 rounded-full mb-4">
                <AlertTriangle className="w-7 h-7 text-amber-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Evening Primrose Oil and Seizure Risk: What You Need to Know
              </h1>
              <p className="text-lg text-gray-600">
                An evidence-based look at gamma-linolenic acid, seizure threshold, epilepsy considerations, and phenothiazine medication cautions.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-10">
                <div className="flex items-start gap-3 mb-4">
                  <Info className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-2">
                      Why This Question Comes Up
                    </h2>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Evening primrose oil is a popular supplement used for skin health, hormonal balance, and inflammatory conditions. However, healthcare providers, pharmacists, and informed consumers sometimes encounter warnings about seizure risk, particularly in relation to epilepsy and certain medications.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These cautions are not arbitrary. They stem from clinical references and case reports suggesting that gamma-linolenic acid (GLA), a key fatty acid component of evening primrose oil, may influence seizure threshold in specific populations.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Understanding the context behind this caution helps individuals and healthcare professionals make informed decisions about supplement use.
                </p>
              </section>

              <section className="mb-10">
                <div className="flex items-start gap-3 mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-2">
                      What Is Known from Clinical Literature
                    </h2>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Evening primrose oil contains gamma-linolenic acid (GLA), an omega-6 fatty acid. Published reports and clinical references suggest that GLA may lower seizure threshold in susceptible individuals.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Phenothiazines, a class of medications used for psychiatric conditions and nausea, are known independently to affect seizure threshold. When combined with supplements that may influence seizure activity, the concern becomes more clinically relevant.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The mechanism is thought to involve changes in neuronal membrane stability and neurotransmitter activity. However, the exact pathways and clinical significance are still subjects of ongoing evaluation.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  It is important to note that these effects are not observed universally. Most individuals taking evening primrose oil do not experience seizures. The caution applies to specific populations and contexts.
                </p>
              </section>

              <section className="mb-10">
                <div className="flex items-start gap-3 mb-4">
                  <Users className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-2">
                      Who Should Use Caution
                    </h2>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The following groups should discuss evening primrose oil use with their healthcare provider before starting supplementation:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Individuals with epilepsy or other seizure disorders</li>
                  <li>Those taking phenothiazine medications (such as chlorpromazine, prochlorperazine, or promethazine)</li>
                  <li>Individuals taking medications known to lower seizure threshold</li>
                  <li>Those with a personal or family history of seizures</li>
                  <li>Patients on multiple medications affecting the central nervous system</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Healthcare providers may recommend alternative supplements or adjust treatment plans based on individual medical history, current medications, and overall risk profile.
                </p>
              </section>

              <section className="mb-10">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-2">
                      What This Does NOT Mean
                    </h2>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  It is essential to maintain perspective when evaluating supplement safety information. The caution about evening primrose oil and seizure risk does not mean:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Evening primrose oil is universally dangerous or causes seizures in all users</li>
                  <li>Individuals without epilepsy or relevant medication use face the same level of concern</li>
                  <li>A single dose will result in immediate harm</li>
                  <li>All omega-6 fatty acids carry the same risk profile</li>
                  <li>Evening primrose oil should never be used under any circumstances</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The caution is context-dependent and applies primarily to at-risk populations. For individuals without seizure disorders or relevant medication use, evening primrose oil may be used safely under appropriate guidance.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Risk assessment is individualized. What matters is whether the supplement is appropriate for your specific health situation.
                </p>
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
                  Evaluating supplement safety becomes more complex when multiple medications and supplements are involved. Interaction screening tools provide a systematic way to identify potential concerns before they arise.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our <a href="/check" className="text-blue-600 hover:text-blue-800 underline font-medium">supplement-medication interaction checker</a> allows users to input their current medications and supplements to screen for documented interactions, including those related to seizure threshold, neurological effects, and medication class-specific cautions.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These tools do not replace medical advice, but they serve as an additional safety layer. They help:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Identify potential interactions before starting a new supplement</li>
                  <li>Flag combinations that require healthcare provider consultation</li>
                  <li>Provide evidence-based rationale for safety concerns</li>
                  <li>Support informed conversations with medical professionals</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  For individuals taking phenothiazines or managing epilepsy, screening tools can quickly surface relevant cautions about evening primrose oil and other supplements that may affect seizure threshold.
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
                  Always consult a qualified healthcare professional before starting, stopping, or changing any supplement or medication. This is especially important for individuals with seizure disorders, those taking medications affecting seizure threshold, or anyone managing chronic health conditions.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  If you experience symptoms such as unusual muscle movements, loss of consciousness, confusion, or other neurological changes, seek immediate medical attention.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The information on this page is based on published clinical references and is provided for educational purposes to support informed decision-making. It does not replace individualized medical assessment.
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Safety Topics</h2>
                <div className="grid gap-3">
                  <a
                    href="/search?q=evening%20primrose%20oil%20seizure%20threshold"
                    className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
                  >
                    <span className="text-blue-600 font-medium">Evening Primrose Oil and Seizure Threshold</span>
                  </a>
                  <a
                    href="/search?q=GLA%20epilepsy%20caution"
                    className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
                  >
                    <span className="text-blue-600 font-medium">GLA and Epilepsy Caution</span>
                  </a>
                  <a
                    href="/search?q=phenothiazines%20seizure%20risk"
                    className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
                  >
                    <span className="text-blue-600 font-medium">Phenothiazines Seizure Risk</span>
                  </a>
                  <a
                    href="/search?q=antipsychotic%20supplements%20interaction"
                    className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
                  >
                    <span className="text-blue-600 font-medium">Antipsychotic Supplements Interaction</span>
                  </a>
                </div>
              </section>

              <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Screen Your Supplements for Safety
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Check your medications and supplements for potential interactions, including seizure-related cautions and medication-specific concerns.
                </p>
                <button
                  onClick={() => navigate('/check')}
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md"
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
