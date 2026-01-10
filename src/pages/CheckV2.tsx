import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StackBuilderCheckerV3 from '../components/StackBuilderCheckerV3';
import CheckerErrorBoundary from '../components/CheckerErrorBoundary';
import CheckerTopBlock from '../components/CheckerTopBlock';

export default function CheckV2() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg)' }}>
      <Helmet>
        <title>Check Supplement-Drug Interactions - Supplement Safety Bible</title>
        <meta name="description" content="Conservative screening tool for supplement, vitamin, and medication interactions. Evidence-informed interaction checker." />
      </Helmet>

      <Navbar />

      <main className="flex-1 py-12">
        <CheckerTopBlock />
        <CheckerErrorBoundary>
          <StackBuilderCheckerV3 />
        </CheckerErrorBoundary>
      </main>

      <Footer />
    </div>
  );
}
