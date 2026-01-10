import { useNavigate } from 'react-router-dom';
import { Shield, AlertTriangle, BookOpen, CheckCircle, Info, Brain } from 'lucide-react';
import { SEO, StructuredData } from '../lib/seo';
import { useState } from 'react';

export default function EveningPrimrosePhenothiazines() {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState<number | null>(null);

  const faqData = [
    {
      question: "What is the seizure risk with evening primrose oil and phenothiazines?",
      answer: "Evening primrose oil contains gamma-linolenic acid (GLA), which may lower seizure threshold in susceptible individuals. Phenothiazines independently affect seizure threshold. When used together, the combined effect on neuronal excitability may increase seizure risk in at-risk populations. This is a conditional caution, not an absolute contraindication."
    },
    {
      question: "Which medications are phenothiazines?",
      answer: "Common phenothiazines include chlorpromazine (Thorazine), prochlorperazine (Compazine), promethazine (Phenergan), perphenazine (Trilafon), and fluphenazine (Prolixin). These medications are used for psychiatric conditions, nausea, and other indications. If you take any of these medications, discuss evening primrose oil use with your healthcare provider."
    },
    {
      question: "Can I take evening primrose oil if I have epilepsy?",
      answer: "Individuals with epilepsy or seizure disorders should consult their healthcare provider before using evening primrose oil. While not all individuals with epilepsy will experience problems, the potential to lower seizure threshold means additional caution is warranted. Your provider can assess your specific risk profile."
    },
    {
      question: "What symptoms should I watch for?",
      answer: "If you are taking evening primrose oil and phenothiazines together, watch for unusual muscle movements, twitching, loss of consciousness, confusion, or any neurological changes. These may indicate increased seizure risk or medication side effects. Seek immediate medical attention if you experience concerning symptoms."
    },
    {
      question: "Is this interaction documented in clinical literature?",
      answer: "Yes. Multiple clinical references note the potential for evening primrose oil to lower seizure threshold, particularly in individuals with epilepsy or those taking medications that affect seizure activity. While large-scale clinical trials are limited, case reports and pharmacological reviews support this caution."
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
    "headline": "Evening Primrose Oil and Phenothiazines: Seizure Risk Interaction Explained",
    "description": "Clinical overview of evening primrose oil seizure risk with phenothiazines, gamma-linolenic acid effects, epilepsy cautions, and evidence-based safety considerations.",
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
        title="Evening Primrose Oil Phenothiazines Seizure Risk | Epilepsy Interaction Caution"
        description="Evidence-based overview of evening primrose oil seizure risk with phenothiazines, gamma-linolenic acid effects on seizure threshold, and epilepsy safety considerations."
        canonical="/interactions/evening-primrose-oil-phenothiazines-seizure-risk"
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
                Evening Primrose Oil and Phenothiazines: Understanding Seizure Risk
              </h1>
              <p className="text-lg text-gray-600">
                Clinical evidence on gamma-linolenic acid, seizure threshold effects, and phenothiazine interaction cautions for epilepsy and psychiatric medication users.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-10">
                <div className="flex items-start gap-3 mb-4">
                  <Info className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-2">
                      Why This Interaction Is Flagged
                    </h2>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Evening primrose oil is a popular supplement used for skin health, hormonal support, and inflammatory conditions. It contains gamma-linolenic acid (GLA), an omega-6 fatty acid with various physiological effects.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Phenothiazines are a class of medications used primarily for psychiatric conditions (schizophrenia, bipolar disorder) and nausea control. Common examples include chlorpromazine, prochlorperazine, and promethazine.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Clinical references flag the combination of evening primrose oil and phenothiazines due to potential additive effects on seizure threshold. Both substances independently influence neuronal excitability, and their combination may increase seizure risk in susceptible individuals.
                </p>
              </section>

              <section className="mb-10">
                <div className="flex items-start gap-3 mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-2">
                      The Clinical Evidence
                    </h2>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Evening Primrose Oil and Seizure Threshold</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Gamma-linolenic acid (GLA), the active component of evening primrose oil, has been associated with effects on neuronal membrane stability. Some clinical references suggest that GLA may lower seizure threshold in individuals predisposed to seizures.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The mechanism is thought to involve changes in prostaglandin synthesis, neuronal membrane composition, and neurotransmitter activity. While not all individuals experience this effect, those with epilepsy or seizure history are considered at higher risk.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Phenothiazines and Seizure Risk</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Phenothiazines are well-documented to affect seizure threshold. These medications work by blocking dopamine receptors in the brain, but they also influence other neurotransmitter systems.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  In clinical practice, phenothiazines are known to lower seizure threshold, particularly at higher doses or in individuals with pre-existing seizure disorders. This is a recognized side effect profile of the medication class.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Combined Effects</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When evening primrose oil and phenothiazines are used together, the concern is additive or synergistic effects on seizure threshold. Two substances that independently influence neuronal excitability may, in combination, create a higher cumulative risk.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  While large-scale clinical trials specifically examining this combination are limited, pharmacological rationale and case report data support the caution. Healthcare providers typically advise against this combination in at-risk populations.
                </p>
              </section>

              <section className="mb-10">
                <div className="flex items-start gap-3 mb-4">
                  <Brain className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-2">
                      Who Should Be Cautious
                    </h2>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The following populations should exercise particular caution and discuss evening primrose oil use with their healthcare provider:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li><strong>Individuals taking phenothiazine medications:</strong> Including chlorpromazine, prochlorperazine, promethazine, perphenazine, fluphenazine, or other antipsychotic medications in this class</li>
                  <li><strong>People with epilepsy or seizure disorders:</strong> Personal history of seizures, regardless of current medication status</li>
                  <li><strong>Those with family history of seizures:</strong> Genetic predisposition to seizure disorders</li>
                  <li><strong>Individuals taking other medications that lower seizure threshold:</strong> Including bupropion, tramadol, certain antibiotics, or other psychiatric medications</li>
                  <li><strong>Children and elderly patients:</strong> Populations with potentially altered seizure thresholds</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Healthcare providers can assess individual risk based on medication dose, seizure history, overall health status, and other relevant factors. Risk assessment should be personalized.
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
                  It is important to interpret this interaction caution appropriately. The warning does not mean:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Everyone taking phenothiazines will have seizures if they use evening primrose oil</li>
                  <li>Evening primrose oil is universally dangerous or should never be used</li>
                  <li>A single dose will cause immediate seizure activity</li>
                  <li>Individuals without seizure disorders or phenothiazine use face the same risk level</li>
                  <li>All omega-6 fatty acids carry identical seizure risk profiles</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The caution is specific to at-risk populations. For individuals without seizure history and not taking medications that affect seizure threshold, evening primrose oil may be used safely under appropriate guidance.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Risk is probabilistic, not deterministic. The goal is to identify and mitigate potential risks through informed decision-making and healthcare provider oversight.
                </p>
              </section>

              <section className="mb-10">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-2">
                      Alternative Options and Safety Strategies
                    </h2>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you are taking phenothiazines and considering evening primrose oil for its intended benefits, discuss alternatives with your healthcare provider. Options may include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li><strong>Alternative omega-6 sources:</strong> Other GLA sources may have different risk profiles; consult your provider</li>
                  <li><strong>Different supplement for the same indication:</strong> Depending on why you want evening primrose oil (skin health, hormonal balance, inflammation), other supplements may be safer</li>
                  <li><strong>Medication adjustment:</strong> In some cases, healthcare providers may consider alternative medications with lower seizure risk if supplement use is medically important</li>
                  <li><strong>Monitoring protocols:</strong> If combined use is deemed necessary, enhanced monitoring for neurological symptoms may be implemented</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Safety strategies should be individualized based on medical history, current health status, and the importance of both the medication and the supplement to overall treatment goals.
                </p>
              </section>

              <section className="mb-10 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-2">
                      The Role of Interaction Screening Tools
                    </h2>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Identifying interactions like evening primrose oil and phenothiazines requires systematic evaluation of medication and supplement combinations. This is where interaction screening tools become valuable.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our <a href="/check" className="text-blue-600 hover:text-blue-800 underline font-medium">supplement-medication interaction checker</a> allows you to input all your current medications and supplements to screen for documented interactions, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Seizure threshold interactions (like evening primrose oil + phenothiazines)</li>
                  <li>Medication class-specific cautions</li>
                  <li>Additive pharmacological effects</li>
                  <li>Medication metabolism interference</li>
                  <li>Other clinically significant interactions</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These tools do not replace medical advice, but they provide an additional safety layer. They help identify potential concerns before supplements are started, allowing for proactive conversation with healthcare providers.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  For individuals taking psychiatric medications, anticonvulsants, or managing complex medication regimens, screening tools offer systematic evaluation that may catch interactions that might otherwise be overlooked.
                </p>
              </section>

              <section className="mb-10 border-l-4 border-gray-300 pl-6 py-4 bg-gray-50">
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  Medical Disclaimer
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  This page provides educational information only. It is not medical advice, diagnosis, or treatment. It does not establish a provider-patient relationship.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Always consult a qualified healthcare professional before starting, stopping, or changing any supplement or medication. This is especially important for individuals with seizure disorders, those taking psychiatric medications, or anyone managing chronic neurological conditions.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  If you experience seizure activity, unusual muscle movements, loss of consciousness, confusion, or other concerning neurological symptoms, seek immediate medical attention.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The information provided is based on published clinical references and pharmacological principles. It is intended to support informed conversations with healthcare professionals, not to replace individualized medical assessment.
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Safety Information</h2>
                <div className="grid gap-3">
                  <a
                    href="/check"
                    className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
                  >
                    <span className="text-blue-600 font-medium">Check Your Medications and Supplements for Interactions</span>
                  </a>
                  <a
                    href="/evening-primrose-oil-seizure-risk-epilepsy-phenothiazines"
                    className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
                  >
                    <span className="text-blue-600 font-medium">Evening Primrose Oil Seizure Risk Overview</span>
                  </a>
                  <a
                    href="/search?q=phenothiazines%20supplement%20interactions"
                    className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
                  >
                    <span className="text-blue-600 font-medium">Phenothiazines and Supplement Interactions</span>
                  </a>
                  <a
                    href="/search?q=medications%20that%20lower%20seizure%20threshold"
                    className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
                  >
                    <span className="text-blue-600 font-medium">Medications That Lower Seizure Threshold</span>
                  </a>
                </div>
              </section>

              <section className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Screen for Medication-Supplement Interactions
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Check all your medications and supplements for potential interactions, including seizure-related cautions and psychiatric medication concerns.
                </p>
                <button
                  onClick={() => navigate('/check')}
                  className="px-8 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition shadow-md"
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
