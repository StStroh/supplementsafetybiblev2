import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import WhyItMatters from '../components/WhyItMatters';
import InteractionChecker from '../components/InteractionChecker';
import Pricing from '../components/Pricing';
import PricingSection from '../components/PricingSection';
import Trust from '../components/Trust';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <WhyItMatters />
      <section id="interaction-checker">
        <InteractionChecker />
      </section>
      <Pricing />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <PricingSection monthlyLabel="$9.99" yearlyLabel="$79.99" />
      </div>
      <Trust />
      <FAQ />
      <Footer />
    </div>
  );
}
