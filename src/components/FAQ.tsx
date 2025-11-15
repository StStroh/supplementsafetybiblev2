import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Does this replace my doctor?',
    answer: 'No. Supplement Safety Bible is a decision-support tool designed to help you have more informed conversations with your healthcare provider. Always consult your doctor before making changes to your medications or supplement regimen.',
  },
  {
    question: 'How accurate are the interaction checks?',
    answer: 'Our database is built from peer-reviewed clinical studies, pharmacological research, and industry-standard drug interaction databases. However, individual responses can vary, so we always recommend discussing findings with your healthcare provider.',
  },
  {
    question: 'Which supplements are covered?',
    answer: 'We currently cover 200+ of the most commonly used dietary supplements, including vitamins, minerals, herbal supplements, amino acids, and other nutraceuticals. Our database is continuously updated with new research and products.',
  },
  {
    question: 'Is my data private? Can I cancel anytime?',
    answer: 'Yes. We take privacy seriously and never share your personal health information. You own your data, and you can export or delete it at any time. Pro and Premium subscriptions can be canceled anytime with no penalties or fees.',
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
