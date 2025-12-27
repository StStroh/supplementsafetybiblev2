import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StackBuilderChecker from '../components/StackBuilderChecker';

export default function CheckV2() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg)' }}>
      <Helmet>
        <title>Interaction Checker - Supplement Safety Bible</title>
        <meta name="description" content="Check your supplement and medication stack for potential interactions" />
      </Helmet>

      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6">
        <StackBuilderChecker />
      </main>

      <Footer />
    </div>
  );
}
