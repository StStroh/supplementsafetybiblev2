import Navbar from '../components/Navbar';
import SafetyAlertsSection from '../components/SafetyAlertsSection';
import LandingCheckerHero from '../components/LandingCheckerHero';
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
      <LandingCheckerHero />
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
