import { Link } from 'react-router-dom';
import { Search, Pill, Beaker } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO } from '../lib/seo';

export default function Browse() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Browse Interactions by Substance | Supplement Safety Bible"
        description="Browse our database of supplement and drug interactions by substance. Search thousands of documented interactions."
        canonical="/browse"
      />
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            Browse Interactions by Substance
          </h1>
          <p className="text-lg sm:text-xl" style={{ color: 'var(--color-text-muted)' }}>
            Explore our database of supplements and medications
          </p>
        </div>

        {/* Browse Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Supplements */}
          <Link
            to="/supplements"
            className="group relative overflow-hidden rounded-2xl border-2 p-8 transition-all hover:shadow-lg"
            style={{
              borderColor: 'var(--color-border)',
              background: 'var(--color-bg)'
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 p-3 rounded-xl"
                style={{ background: 'rgba(59, 130, 246, 0.1)' }}
              >
                <Beaker className="w-8 h-8" style={{ color: 'rgb(59, 130, 246)' }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2 group-hover:underline" style={{ color: 'var(--color-text)' }}>
                  Supplements
                </h2>
                <p className="text-base" style={{ color: 'var(--color-text-muted)' }}>
                  Browse interactions for vitamins, minerals, herbs, and other dietary supplements
                </p>
              </div>
            </div>
          </Link>

          {/* Medications */}
          <Link
            to="/medications"
            className="group relative overflow-hidden rounded-2xl border-2 p-8 transition-all hover:shadow-lg"
            style={{
              borderColor: 'var(--color-border)',
              background: 'var(--color-bg)'
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 p-3 rounded-xl"
                style={{ background: 'rgba(16, 185, 129, 0.1)' }}
              >
                <Pill className="w-8 h-8" style={{ color: 'rgb(16, 185, 129)' }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2 group-hover:underline" style={{ color: 'var(--color-text)' }}>
                  Medications
                </h2>
                <p className="text-base" style={{ color: 'var(--color-text-muted)' }}>
                  Browse interactions for prescription and over-the-counter drugs
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Search Option */}
        <div
          className="rounded-2xl border-2 p-8 text-center"
          style={{
            borderColor: 'var(--color-border)',
            background: 'var(--color-bg)'
          }}
        >
          <div
            className="inline-flex items-center justify-center p-4 rounded-xl mb-4"
            style={{ background: 'rgba(99, 102, 241, 0.1)' }}
          >
            <Search className="w-8 h-8" style={{ color: 'rgb(99, 102, 241)' }} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            Or Use the Interaction Checker
          </h2>
          <p className="text-base mb-6" style={{ color: 'var(--color-text-muted)' }}>
            Check multiple substances at once and get instant results
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
            style={{
              background: 'var(--color-primary)',
              color: 'white'
            }}
          >
            Go to Checker
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Educational resource only. Not medical advice. Consult your healthcare provider.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
