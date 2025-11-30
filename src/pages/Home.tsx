import Navbar from '../components/Navbar';
import PrimaryInteractionChecker from '../components/PrimaryInteractionChecker';
import HowItWorks from '../components/HowItWorks';
import WhyItMatters from '../components/WhyItMatters';
import Pricing from '../components/Pricing';
import Trust from '../components/Trust';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
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
  "logo": "https://supplementsafetybible.com/logosafetybible.jpg",
  "sameAs": []
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Supplement Safety Bible | Check Supplement-Medication Interactions"
        description="Instantly check 2,500+ supplement-medication interactions. Safer stacks, fewer risks. Evidence-based interaction checker for healthcare professionals and supplement users."
        canonical="/"
      />
      <StructuredData data={[websiteSchema, organizationSchema]} />
      <Navbar />
      <PrimaryInteractionChecker />
      <HowItWorks />
      <WhyItMatters />
      <Trust />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}
