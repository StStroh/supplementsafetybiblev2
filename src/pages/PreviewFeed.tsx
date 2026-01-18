import { Newspaper } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO } from '../lib/seo';

const exampleResearch = [
  {
    id: 1,
    title: 'New Study: Vitamin D and Immune Function',
    source: 'Journal of Clinical Nutrition',
    date: '2025-01-10',
    snippet: 'Meta-analysis confirms vitamin D supplementation supports immune response...'
  },
  {
    id: 2,
    title: 'Magnesium and Blood Pressure Management',
    source: 'Hypertension Research',
    date: '2025-01-08',
    snippet: 'Clinical trial shows magnesium supplementation may reduce systolic BP...'
  },
  {
    id: 3,
    title: 'Omega-3 Fatty Acids in Cardiovascular Health',
    source: 'American Heart Journal',
    date: '2025-01-05',
    snippet: 'Updated guidelines on omega-3 supplementation for heart disease prevention...'
  },
  {
    id: 4,
    title: 'Probiotic Interactions with Immunosuppressants',
    source: 'Clinical Pharmacology Review',
    date: '2025-01-03',
    snippet: 'New safety data on probiotic use in transplant patients...'
  },
  {
    id: 5,
    title: 'Turmeric and Anti-Inflammatory Pathways',
    source: 'Phytotherapy Research',
    date: '2024-12-28',
    snippet: 'Mechanistic study reveals curcumin effects on inflammation markers...'
  }
];

export default function PreviewFeed() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <SEO
        title="Preview: Research Feed — Supplement Safety Bible"
        description="Preview our curated research feed and clinical updates"
        canonical="/preview/feed"
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
            Research Feed
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Stay updated with the latest supplement safety research and clinical guidelines
          </p>
        </div>

        <div className="space-y-4 mb-12">
          {exampleResearch.map(item => (
            <div key={item.id} className="card p-6">
              <div className="flex items-start gap-3">
                <Newspaper className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: 'var(--color-brand)' }} />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    <span>{item.source}</span>
                    <span>•</span>
                    <span>{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {item.snippet}
                  </p>
                </div>
              </div>
              <div className="pt-3 mt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Full article and analysis available with Pro or Clinical
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
            Get daily research updates, clinical alerts, and evidence summaries delivered to your dashboard
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
