import { BookOpen } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO } from '../lib/seo';

const exampleGuides = [
  {
    id: 1,
    title: 'Vitamin D Safety Guide',
    category: 'Vitamins',
    description: 'Essential information about dosing, interactions, and contraindications'
  },
  {
    id: 2,
    title: 'Omega-3 Fish Oil Guide',
    category: 'Essential Fatty Acids',
    description: 'Interaction precautions for patients on blood thinners'
  },
  {
    id: 3,
    title: 'Magnesium Safety Overview',
    category: 'Minerals',
    description: 'Drug interactions and timing considerations'
  },
  {
    id: 4,
    title: 'Turmeric/Curcumin Guide',
    category: 'Herbal',
    description: 'Clinical evidence and medication interactions'
  },
  {
    id: 5,
    title: 'Probiotics Safety Guide',
    category: 'Digestive Health',
    description: 'Immunosuppressant interactions and safety considerations'
  },
  {
    id: 6,
    title: 'Melatonin Safety Overview',
    category: 'Sleep Support',
    description: 'Drug interactions and contraindications'
  }
];

export default function PreviewGuides() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <SEO
        title="Preview: Safety Guides — Supplement Safety Bible"
        description="Preview our comprehensive supplement safety guides"
        canonical="/preview/guides"
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
            Safety Guides
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Evidence-based safety guides for dietary supplements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {exampleGuides.map(guide => (
            <div key={guide.id} className="card p-6">
              <div className="flex items-start gap-3 mb-3">
                <BookOpen className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: 'var(--color-brand)' }} />
                <div className="flex-1">
                  <div className="text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>
                    {guide.category}
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                    {guide.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {guide.description}
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Full guide available with Pro or Clinical
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
            Access our complete library of evidence-based safety guides and clinical protocols
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
