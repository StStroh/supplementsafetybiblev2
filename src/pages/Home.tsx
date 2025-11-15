import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import WhyItMatters from '../components/WhyItMatters';
import InteractionChecker from '../components/InteractionChecker';
import Pricing from '../components/Pricing';
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
      <InteractionChecker />
      <Pricing />
      <Trust />
      <FAQ />
      <Footer />
    </div>
  );
}
