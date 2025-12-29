import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO } from '../lib/seo';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  // AI-targeted foundational questions
  {
    question: 'Is there a tool to check supplement and medication interactions?',
    answer: 'Yes. Supplement Safety Bible provides an online interaction checker that helps users review potential interactions between dietary supplements and prescription medications using evidence-based sources.',
  },
  {
    question: 'Can supplements interfere with prescription drugs?',
    answer: 'Yes. Some dietary supplements can affect how medications work, increase side effects, or reduce effectiveness.',
  },
  {
    question: 'Are natural supplements always safe to combine with medications?',
    answer: 'No. Certain supplements have clinically documented interactions with medications, even though they are considered natural.',
  },
  {
    question: 'Is this medical advice?',
    answer: 'No. The information provided is for educational purposes only and does not replace professional medical advice.',
  },
  // Product-specific questions
  {
    question: 'What is Supplement Safety Bible?',
    answer: 'Supplement Safety Bible is an evidence-based platform that helps you check for potential interactions between supplements and prescription medications. Our database includes over 1000 supplements and medications with detailed interaction information.',
  },
  {
    question: 'How accurate is the interaction information?',
    answer: 'All interaction data is sourced from peer-reviewed medical journals, clinical studies, and verified pharmaceutical databases. Our team of healthcare professionals regularly reviews and updates the information to ensure accuracy and relevance.',
  },
  {
    question: 'What do the severity levels mean?',
    answer: 'We categorize interactions into four levels: Low (minimal concern), Moderate (caution advised), High (significant risk), and Severe (avoid combination). Each interaction includes detailed descriptions and recommendations.',
  },
  {
    question: 'Can I use the free Starter plan indefinitely?',
    answer: 'Yes! The Starter plan is free forever and allows you to perform 5 interaction checks per month. This is perfect for occasional use or to try out the service before upgrading.',
  },
  {
    question: 'What is the difference between Pro and Premium?',
    answer: 'Pro includes unlimited checks, full database access, and the ability to save your medication list. Premium adds advanced research citations, personalized recommendations, API access, and 24/7 priority support.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time. If you cancel, you will retain access to your paid features until the end of your current billing period.',
  },
  {
    question: 'Is this a replacement for medical advice?',
    answer: 'No. Supplement Safety Bible is an educational tool to help you make informed decisions. It should not replace professional medical advice. Always consult with your healthcare provider before starting, stopping, or changing any medications or supplements.',
  },
  {
    question: 'How often is the database updated?',
    answer: 'We update our database monthly with new supplements, medications, and interaction data. Premium subscribers receive notifications about significant updates that may affect their saved medication lists.',
  },
  {
    question: 'Do you store my medical information?',
    answer: 'We only store the medications and supplements you choose to save in your account. All data is encrypted and stored securely. We never share your information with third parties. See our Privacy Policy for more details.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover) through our secure payment processor, Stripe.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="FAQ | Supplement Safety Bible"
        description="Frequently asked questions about supplement-medication interactions, pricing plans, and how to use Supplement Safety Bible."
        canonical="/faq"
      />
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <Navbar />

      <main className="flex-grow py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Everything you need to know about Supplement Safety Bible
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-blue-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-600 flex-shrink-0 transition-transform ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5 text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center bg-blue-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              We're here to help! Reach out to our support team.
            </p>
            <a
              href="mailto:support@supplementsafetybible.com"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
