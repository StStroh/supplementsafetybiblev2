import Navbar from '../components/Navbar';
import SafetyAlertsSection from '../components/SafetyAlertsSection';
import StackBuilderCheckerV3 from '../components/StackBuilderCheckerV3';
import WhatWeScreen from '../components/WhatWeScreen';
import Philosophy from '../components/Philosophy';
import HowItWorks from '../components/HowItWorks';
import WhyItMatters from '../components/WhyItMatters';
import WhoItsFor from '../components/WhoItsFor';
import FeatureComparison from '../components/FeatureComparison';
import Pricing from '../components/Pricing';
import ComplianceSection from '../components/ComplianceSection';
import Trust from '../components/Trust';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import { SEO, StructuredData } from '../lib/seo';
import Logo from '../components/Logo';

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Supplement Safety Bible",
  "url": "https://supplementsafetybible.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://supplementsafetybible.com/search?q={query}",
    "query-input": "required name=query"
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Supplement Safety Bible",
  "url": "https://supplementsafetybible.com",
  "logo": "https://supplementsafetybible.com/brand/logo.jpg",
  "sameAs": []
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Supplement Safety Bible",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web",
  "description": "Check supplement–drug interactions, see color-coded risks, and download a professional PDF on paid plans.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "0",
    "category": "FreeTrial"
  },
  "brand": {
    "@type": "Brand",
    "name": "Supplement Safety Bible"
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Don't Mix Blind™ | Supplement Safety Bible"
        description="Check supplement–drug interactions in minutes and get a professional PDF report on paid plans."
        canonical="/"
      />
      <StructuredData data={[websiteSchema, organizationSchema, appSchema]} />
      <Navbar />
      <SafetyAlertsSection />

      {/* Hero Section with Modern Stack Builder Checker */}
      <section
        className="relative w-full"
        style={{ background: 'var(--color-bg)' }}
        data-testid="landing-hero"
      >
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20">
          {/* Hero Header */}
          <div className="flex flex-col items-center text-center mb-10">
            {/* Logo */}
            <div className="mb-6">
              <Logo variant="dark" className="logo--hero" />
            </div>

            {/* H1: Clear and Direct */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 max-w-4xl leading-tight"
              style={{ color: 'var(--color-text)' }}
              data-testid="landing-hero-headline"
            >
              Check supplement–drug interactions before you take them.
            </h1>

            {/* Disclaimer */}
            <p
              className="text-base sm:text-lg max-w-2xl mb-8"
              style={{ color: 'var(--color-text-muted)' }}
              data-testid="landing-hero-sub"
            >
              Evidence-based and educational. Not medical advice.
            </p>
          </div>

          {/* Modern Interaction Checker */}
          <div data-testid="landing-hero-checker">
            <StackBuilderCheckerV3 />
          </div>

          {/* Secondary Navigation */}
          <div className="text-center mt-6">
            <a
              href="/browse"
              className="inline-flex items-center gap-2 text-sm font-medium hover:underline transition-all"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Browse interactions by substance
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Trust strip */}
          <div className="guarantee-note text-center max-w-xl mx-auto mt-8">
            60-day money-back guarantee · Change or cancel anytime
          </div>
        </div>
      </section>

      <Trust />
      <WhatWeScreen />
      <Philosophy />
      <HowItWorks />
      <WhyItMatters />
      <WhoItsFor />
      <Testimonials />
      <Pricing />
      <FeatureComparison />
      <ComplianceSection />
      <FAQ />
      <Footer />
    </div>
  );
}
