import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO } from '../lib/seo';
import { SUPPORT_EMAIL } from '../lib/support';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <SEO
        title="Refund Policy — Supplement Safety Bible"
        description="Our 60-day money-back guarantee policy and refund process"
        canonical="/refund-policy"
      />
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="card p-8">
          <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
            Refund Policy
          </h1>

          <div className="space-y-6" style={{ color: 'var(--color-text)' }}>
            <section>
              <h2 className="text-2xl font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
                60-Day Money-Back Guarantee
              </h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                We stand behind the quality of Supplement Safety Bible. If you're not completely satisfied with your Pro or Premium subscription, you can request a full refund within 60 days of your initial purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
                What's Covered
              </h2>
              <ul className="list-disc list-inside space-y-2" style={{ color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                <li>All Pro and Premium plan subscriptions (monthly or annual)</li>
                <li>Full refund of your most recent payment</li>
                <li>No questions asked within the 60-day window</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
                How to Request a Refund
              </h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '1rem' }}>
                To request a refund, please contact us at:
              </p>
              <div className="p-4 rounded-lg" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="font-semibold hover:underline"
                  style={{ color: 'var(--color-brand)' }}
                >
                  {SUPPORT_EMAIL}
                </a>
              </div>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', marginTop: '1rem' }}>
                Include your account email and the reason for your refund request (optional). We'll process your request within 3-5 business days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
                After the 60-Day Period
              </h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                After 60 days from your initial purchase, we generally do not offer refunds. However, we evaluate exceptional circumstances on a case-by-case basis. Please contact us if you have concerns.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
                Free Plan
              </h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                Our Starter plan is free forever and does not involve any charges or refunds.
              </p>
            </section>

            <section className="pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Last updated: December 2025
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
