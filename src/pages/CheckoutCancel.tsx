import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, CreditCard } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO } from '../lib/seo';

export default function CheckoutCancel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col" style={{background: 'var(--color-bg)'}}>
      <SEO
        title="Checkout Cancelled — Supplement Safety Bible"
        description="Your checkout was cancelled. No charges were made."
        noindex
      />

      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full">
          <div
            className="card text-center"
            style={{
              padding: '3rem',
              background: 'var(--color-surface)',
              borderColor: 'var(--color-warning)',
              borderWidth: '2px'
            }}
          >
            <div className="mb-6">
              <AlertCircle
                className="w-16 h-16 mx-auto mb-4"
                style={{color: 'var(--color-warning)'}}
              />
              <h1
                className="text-3xl sm:text-4xl font-bold mb-3"
                style={{color: 'var(--color-text)'}}
              >
                Checkout Cancelled
              </h1>
              <p
                className="text-lg mb-6"
                style={{color: 'var(--color-text-muted)'}}
              >
                Your payment was cancelled. No charges were made to your account.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button
                onClick={() => navigate('/pricing')}
                className="btn-cta inline-flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                View Plans & Pricing
              </button>

              <button
                onClick={() => navigate('/')}
                className="btn-outline inline-flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </button>
            </div>

            <div className="pt-6" style={{borderTop: '1px solid var(--color-border)'}}>
              <p className="text-sm" style={{color: 'var(--color-text-muted)'}}>
                Changed your mind? Our plans include a 14-day free trial with no credit card required until after the trial period.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm mb-3" style={{color: 'var(--color-text-muted)'}}>
              Questions about our plans?
            </p>
            <div className="flex justify-center gap-6 text-sm">
              <button
                onClick={() => navigate('/faq')}
                className="hover:underline"
                style={{color: 'var(--color-brand)'}}
              >
                Read FAQ
              </button>
              <button
                onClick={() => navigate('/free')}
                className="hover:underline"
                style={{color: 'var(--color-brand)'}}
              >
                Try Free Plan
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
