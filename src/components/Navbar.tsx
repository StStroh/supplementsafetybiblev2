import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { INFO_EMAIL } from '../lib/support';
import { BRAND_NAME_FULL } from '../lib/brand';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);
  const isAdminMode = import.meta.env.VITE_ADMIN_MODE === 'true';

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setIsLoggedIn(!!data?.user);

      if (data?.user?.email) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('plan')
          .eq('email', data.user.email)
          .maybeSingle();

        setPlan(profile?.plan || null);
      }
    })();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    const handleScroll = () => {
      const header = document.querySelector('.site-header');
      if (header) header.classList.toggle('is-scrolled', window.scrollY > 4);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      authListener.subscription.unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="/" className="brand">
          <img src="/brand/logo.png" alt={BRAND_NAME_FULL} className="brand-logo" />
          <span className="brand-title">{BRAND_NAME_FULL}</span>
        </a>

        <div className="header-spacer" />

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/" className="font-medium transition-colors" style={{ color: 'var(--brand-purple)' }}>
            Home
          </a>
          <a href="/check" className="font-medium transition-colors" style={{ color: 'var(--brand-purple)' }}>
            Check Interactions
          </a>
          <a href="/faq" className="font-medium transition-colors" style={{ color: 'var(--brand-purple)' }}>
            FAQ
          </a>
          <a href="/safety-pack" className="font-medium transition-colors" style={{ color: 'var(--brand-purple)' }}>
            For Brands
          </a>

          {isAdminMode && (
            <>
              <a href="/admin/tokens" className="font-medium transition-colors" style={{ color: 'var(--brand-purple)' }}>
                Tokens
              </a>
              <a href="/admin/token-packs" className="font-medium transition-colors" style={{ color: 'var(--brand-purple)' }}>
                Token Packs
              </a>
              <a href="/admin/coverage" className="font-medium transition-colors" style={{ color: 'var(--brand-purple)' }}>
                Coverage
              </a>
            </>
          )}

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <a href="/account" className="font-medium transition-colors" style={{ color: 'var(--brand-purple)' }}>
                Account
              </a>
              {plan === 'free' && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                  Free — Active
                </span>
              )}
            </div>
          ) : (
            <a href="/auth" className="font-medium transition-colors" style={{ color: 'var(--brand-purple)' }}>
              Sign in
            </a>
          )}

          <a href={`mailto:${INFO_EMAIL}`} className="font-medium transition-colors" style={{ color: 'var(--brand-purple)' }}>
            Contact
          </a>

          {/* Primary CTA (replaces Try free dropdown) */}
          {!isLoggedIn && (
            <a href="/pricing" className="btn-cta">
              Sign Up
            </a>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden"
          style={{ color: 'var(--brand-purple)' }}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 border-t bg-white" style={{ borderColor: 'var(--header-border)' }}>
          <div className="flex flex-col gap-4 px-4">
            <a
              href="/"
              className="font-medium transition-colors"
              style={{ color: 'var(--brand-purple)' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>

            <a
              href="/check"
              className="font-medium transition-colors"
              style={{ color: 'var(--brand-purple)' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Check Interactions
            </a>

            <a
              href="/faq"
              className="font-medium transition-colors"
              style={{ color: 'var(--brand-purple)' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>

            <a
              href="/safety-pack"
              className="font-medium transition-colors"
              style={{ color: 'var(--brand-purple)' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              For Brands
            </a>

            {isAdminMode && (
              <>
                <a
                  href="/admin/tokens"
                  className="font-medium transition-colors"
                  style={{ color: 'var(--brand-purple)' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Tokens
                </a>
                <a
                  href="/admin/token-packs"
                  className="font-medium transition-colors"
                  style={{ color: 'var(--brand-purple)' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Token Packs
                </a>
                <a
                  href="/admin/coverage"
                  className="font-medium transition-colors"
                  style={{ color: 'var(--brand-purple)' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Coverage
                </a>
              </>
            )}

            {isLoggedIn ? (
              <div>
                <a
                  href="/account"
                  className="font-medium transition-colors"
                  style={{ color: 'var(--brand-purple)' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Account
                </a>
                {plan === 'free' && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium ml-2">
                    Free — Active
                  </span>
                )}
              </div>
            ) : (
              <>
                <a
                  href="/auth"
                  className="font-medium transition-colors"
                  style={{ color: 'var(--brand-purple)' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </a>

                {/* Mobile primary CTA */}
                <a
                  href="/pricing"
                  className="btn-cta text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </a>
              </>
            )}

            <a
              href={`mailto:${INFO_EMAIL}`}
              className="font-medium transition-colors"
              style={{ color: 'var(--brand-purple)' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>

            {/* Keep the Explore preview links, but no trial language */}
            <div className="border-t border-slate-200 pt-4 mt-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3 px-2">
                Explore (no signup)
              </p>

              <a
                href="/preview/checker"
                className="block px-2 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Preview Interaction Checker
              </a>

              <a
                href="/preview/guides"
                className="block px-2 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Preview Supplement Safety Guides
              </a>

              <a
                href="/preview/feed"
                className="block px-2 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Preview Research Feed
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
