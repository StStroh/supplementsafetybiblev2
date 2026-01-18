import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What types of interactions does Supplement Safety Bible screen for?',
    answer: 'Supplement Safety Bible screens for supplement–medication interactions, including over-the-counter and prescription drugs. This includes narrow-therapeutic-index medications (like warfarin, digoxin), immunosuppressants, anticoagulants, and other high-risk drug classes. We analyze both pharmacokinetic (metabolism, absorption) and pharmacodynamic (additive, synergistic) interactions.',
  },
  {
    question: 'Is Supplement Safety Bible a substitute for medical advice?',
    answer: 'No. Supplement Safety Bible is an educational tool designed to support informed decision-making, not replace professional medical advice. Always consult your physician, pharmacist, or healthcare provider before starting, stopping, or changing any medication or supplement regimen. Our tool helps facilitate more informed conversations with your healthcare team.',
  },
  {
    question: 'How is interaction severity determined?',
    answer: 'Interactions are classified as Low, Moderate, or High severity based on clinical significance, documented outcomes, onset timing, and reversibility. Classifications are based on peer-reviewed literature, pharmacological research, and clinical case reports. Severity ratings help prioritize which interactions require immediate attention or monitoring.',
  },
  {
    question: 'Does Supplement Safety Bible include controlled substances and prescription medications?',
    answer: 'Yes. Supplement Safety Bible includes screening for interactions with controlled substances, narrow-therapeutic-index drugs, immunosuppressants, and other prescription medications that require careful monitoring when combined with dietary supplements.',
  },
  {
    question: 'How often is the interaction database updated?',
    answer: 'Our database is continuously reviewed and updated as new evidence becomes available. We monitor peer-reviewed publications, FDA safety alerts, pharmacological research, and clinical case reports to ensure information reflects current scientific understanding.',
  },
  {
    question: 'Can I share reports with my healthcare provider?',
    answer: 'Yes. Pro and Premium plans allow you to generate PDF reports that you can download and share with your doctor, pharmacist, or other healthcare providers. Reports include interaction findings, severity ratings, evidence summaries, and monitoring recommendations.',
  },
  {
    question: 'Is my health information private and secure?',
    answer: 'Absolutely. We take privacy seriously and never sell or share your personal health information. Your data is encrypted in transit and at rest. Payments are processed securely through Stripe, a PCI-compliant payment processor. You can export or delete your data at any time.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes. Pro and Premium subscriptions can be canceled at any time with no penalties or fees. We also offer a 60-day money-back guarantee if you are not satisfied with your subscription.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-blue-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
