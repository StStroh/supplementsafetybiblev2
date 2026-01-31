import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Is this tool free to use?',
    answer: 'Yes, 100% free with no registration required. You can check as many interactions as you want, whenever you want. No hidden fees, no trials, no credit card needed. We believe safety information should be accessible to everyone.'
  },
  {
    question: 'Who created this database?',
    answer: 'This tool was created by Stefan Stroh, who has 20+ years of experience as a Plant Manager of an NSF GMP certified supplement manufacturing facility. With expertise in supplement formulation, quality assurance, and manufacturing operations, Stefan has overseen the development of 1,000+ supplement formulations throughout his career.'
  },
  {
    question: 'Can I trust this information?',
    answer: 'Yes. Every interaction in our database is backed by peer-reviewed research from PubMed, NIH clinical data, FDA safety alerts, and published medical journals. We provide citations and sources for all interactions. Our information combines published scientific research with real-world manufacturing expertise to give you accurate, actionable safety data.'
  },
  {
    question: 'Do you sell supplements or earn commissions?',
    answer: 'No. We have zero financial relationships with supplement manufacturers, retailers, or affiliates. We don\'t sell products, we don\'t earn commissions, and we don\'t accept advertising. This tool exists solely for public safety with no commercial interests whatsoever.'
  },
  {
    question: 'Is this medical advice?',
    answer: 'No. This tool provides educational information only and does not constitute medical advice. Always consult your healthcare provider before starting, stopping, or changing any supplement or medication regimen. Your doctor knows your complete medical history and can provide personalized guidance based on your specific situation.'
  },
  {
    question: 'How often is the database updated?',
    answer: 'We conduct monthly reviews of new literature, quarterly comprehensive updates of all interactions, and immediate updates for urgent safety alerts. The supplement and pharmaceutical industries are constantly evolving, and we work hard to keep our database current with the latest research.'
  },
  {
    question: 'Why should I trust a manufacturer?',
    answer: 'Industry experience combined with transparent sourcing and cited research provides a unique perspective. After 20+ years in supplement manufacturing, we understand how supplements are actually formulated, how ingredients interact at a molecular level, and what the research really says - not just what marketing claims suggest. We cite all our sources so you can verify everything independently.'
  },
  {
    question: 'What if I find conflicting information elsewhere?',
    answer: 'Different sources may present different interpretations of the same research. If you find conflicting information, we recommend: (1) Compare the quality of sources - are they citing peer-reviewed research? (2) Look at the dates - is the information current? (3) Most importantly, consult your healthcare provider who can evaluate your specific situation and help you make an informed decision.'
  },
  {
    question: 'Can healthcare professionals use this tool?',
    answer: 'Yes, but we encourage professionals to use their clinical judgment and consult primary sources. This tool is designed to be a quick reference and educational resource. Healthcare providers should verify interactions through professional databases and consider individual patient factors when making clinical decisions.'
  },
  {
    question: 'How can I contact you?',
    answer: 'We welcome questions, feedback, and suggestions. Email us at info@supplementsafetybible.com and we\'ll respond as quickly as possible. If you find an error or have new research to share, please let us know - we\'re committed to maintaining the most accurate database possible.'
  }
];

function FAQAccordion({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <h3 className="font-bold text-lg text-gray-900 pr-4">{item.question}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#5e2b7e] flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#5e2b7e] flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-4 pt-2">
          <p className="text-gray-700 leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <>
      <Helmet>
        <title>FAQ - Supplement Safety Bible</title>
        <meta name="description" content="Frequently asked questions about our free supplement-medication interaction checker and safety database." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#5e2b7e] to-[#8b4d9f] text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-purple-100">
              Everything you need to know about Supplement Safety Bible
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQAccordion key={index} item={faq} />
            ))}
          </div>

          {/* Still Have Questions */}
          <div className="mt-12 bg-gradient-to-r from-[#5e2b7e] to-[#8b4d9f] text-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-purple-100 mb-6">
              We're here to help. Send us an email and we'll get back to you as soon as possible.
            </p>
            <a
              href="mailto:info@supplementsafetybible.com"
              className="inline-block bg-white text-[#5e2b7e] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
