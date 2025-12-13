import { AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO } from '../lib/seo';

const exampleInteractions = [
  {
    id: 1,
    supplement: 'St. John\'s Wort',
    medication: 'Sertraline (Zoloft)',
    severity: 'Major',
    description: 'May increase risk of serotonin syndrome'
  },
  {
    id: 2,
    supplement: 'Ginkgo Biloba',
    medication: 'Warfarin',
    severity: 'Moderate',
    description: 'May increase bleeding risk'
  },
  {
    id: 3,
    supplement: 'Calcium',
    medication: 'Levothyroxine',
    severity: 'Moderate',
    description: 'May reduce thyroid medication absorption'
  },
  {
    id: 4,
    supplement: 'Vitamin K',
    medication: 'Warfarin',
    severity: 'Major',
    description: 'May interfere with anticoagulation therapy'
  }
];

export default function PreviewChecker() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <SEO
        title="Preview: Interaction Checker — Supplement Safety Bible"
        description="Preview our comprehensive supplement-medication interaction checker"
        canonical="/preview/checker"
        noindex={true}
      />
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-6 p-4 rounded-lg" style={{ background: '#FEF3C7', border: '1px solid #F59E0B' }}>
          <p className="text-sm font-medium" style={{ color: '#92400E' }}>
            Preview — examples only. Full access with Pro or Clinical.
          </p>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            Interaction Checker
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Check for potential interactions between supplements and medications
          </p>
        </div>

        <div className="space-y-4 mb-12">
          {exampleInteractions.map(interaction => (
            <div key={interaction.id} className="card p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1" style={{ color: 'var(--color-text)' }}>
                    {interaction.supplement} + {interaction.medication}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {interaction.description}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-4 ${
                    interaction.severity === 'Major'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {interaction.severity}
                </span>
              </div>
              <div className="pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <p className="text-sm flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
                  <AlertCircle className="w-4 h-4" />
                  Full details, references, and recommendations available with Pro
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="card p-8 text-center">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
              Work smarter and help your patients thrive
            </h3>
            <p className="text-sm max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
              Supplement Safety Bible Pro can save you hours every week and keep your patient resources automatically updated with the latest evidence.
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            Ready for Full Access?
          </h2>
          <p className="mb-6" style={{ color: 'var(--color-text-muted)' }}>
            Get unlimited interaction checks, detailed reports, and evidence-based recommendations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/pricing?plan=pro" className="btn-cta inline-block">
              Try Pro — 14-day trial
            </a>
            <a href="/pricing" className="btn-outline inline-block">
              See Pricing
            </a>
          </div>
          <p className="text-xs mt-4" style={{ color: 'var(--color-text-muted)' }}>
            60-day money-back guarantee · Change or cancel anytime · Individual use
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
