import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StackBuilderCheckerV3 from '../components/StackBuilderCheckerV3';
import HowItWorks from '../components/HowItWorks';
import TrustBadges from '../components/TrustBadges';
import StatsBar from '../components/landing/StatsBar';
import MostSearchedSection from '../components/landing/MostSearchedSection';
import EmailCaptureSection from '../components/landing/EmailCaptureSection';
import TrustSignalsSection from '../components/landing/TrustSignalsSection';
import FinalCTASection from '../components/landing/FinalCTASection';
import { SEO, StructuredData } from '../lib/seo';

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Supplement Safety Bible",
  "url": "https://supplementsafetybible.com",
  "description": "Free evidence-based supplement-medication interaction checker. Check 15,000+ verified interactions instantly.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://supplementsafetybible.com/check?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const medicalWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Supplement Safety Bible - Free Supplement-Medication Interaction Checker",
  "description": "Check 15,000+ verified supplement-medication interactions. Created by NSF GMP certified manufacturing professionals.",
  "url": "https://supplementsafetybible.com",
  "author": {
    "@type": "Person",
    "name": "Stefan Stroh",
    "jobTitle": "Plant Manager - NSF GMP Certified Nutraceutical Facility"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Supplement Safety Bible"
  },
  "mainEntity": {
    "@type": "MedicalRiskCalculator",
    "name": "Supplement-Medication Interaction Checker"
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Free Supplement-Drug Interaction Checker | Supplement Safety Bible"
        description="Check dangerous supplement-medication interactions in 60 seconds. Free, evidence-based tool used by healthcare professionals and individuals. No signup required."
        canonical="/"
      />
      <StructuredData data={[websiteSchema, medicalWebPageSchema]} />

      <Navbar />

      {/* Hero Section with Checker */}
      <section className="relative w-full bg-gradient-to-br from-white via-blue-50 to-blue-100 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-red-100 border border-red-300 rounded-full">
              <span className="text-red-700 font-semibold text-sm">⚠️ 70% of Americans take supplements</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight" data-testid="landing-hero-headline">
              If you take supplements and medications, guessing is risky.
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              We help you check interactions before they cause problems. Free, evidence-based, and safety-first.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">No signup required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Evidence-based</span>
              </div>
            </div>
          </div>

          {/* Checker Tool */}
          <div data-testid="landing-hero-checker">
            <StackBuilderCheckerV3 />
          </div>
        </div>
      </section>

      <TrustBadges />
      <StatsBar />
      <HowItWorks />
      <MostSearchedSection />
      <EmailCaptureSection />
      <TrustSignalsSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
