import { useNavigate } from 'react-router-dom';
import { Home, Search, FileQuestion } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO } from '../lib/seo';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col" style={{background: 'var(--color-bg)'}}>
      <SEO
        title="Page Not Found — Supplement Safety Bible"
        description="The page you're looking for doesn't exist."
        noindex
      />

      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            <FileQuestion
              className="w-24 h-24 mx-auto mb-6"
              style={{color: 'var(--color-text-muted)'}}
              strokeWidth={1}
            />
            <h1
              className="text-4xl sm:text-5xl font-bold mb-4"
              style={{color: 'var(--color-text)'}}
            >
              Page Not Found
            </h1>
            <p
              className="text-lg mb-8"
              style={{color: 'var(--color-text-muted)'}}
            >
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="btn-cta inline-flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Go to Homepage
            </button>

            <button
              onClick={() => navigate('/check')}
              className="btn-outline inline-flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Check Interactions
            </button>
          </div>

          <div className="mt-12 pt-8" style={{borderTop: '1px solid var(--color-border)'}}>
            <p className="text-sm mb-4" style={{color: 'var(--color-text-muted)'}}>
              Common pages you might be looking for:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <button
                onClick={() => navigate('/pricing')}
                className="hover:underline"
                style={{color: 'var(--color-brand)'}}
              >
                Pricing
              </button>
              <button
                onClick={() => navigate('/faq')}
                className="hover:underline"
                style={{color: 'var(--color-brand)'}}
              >
                FAQ
              </button>
              <button
                onClick={() => navigate('/free')}
                className="hover:underline"
                style={{color: 'var(--color-brand)'}}
              >
                Free Account
              </button>
              <button
                onClick={() => navigate('/supplements')}
                className="hover:underline"
                style={{color: 'var(--color-brand)'}}
              >
                Supplements
              </button>
              <button
                onClick={() => navigate('/medications')}
                className="hover:underline"
                style={{color: 'var(--color-brand)'}}
              >
                Medications
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
