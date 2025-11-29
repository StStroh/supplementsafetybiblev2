import Navbar from '../components/Navbar';
import PrimaryInteractionChecker from '../components/PrimaryInteractionChecker';
import HowItWorks from '../components/HowItWorks';
import WhyItMatters from '../components/WhyItMatters';
import Pricing from '../components/Pricing';
import Trust from '../components/Trust';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
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
