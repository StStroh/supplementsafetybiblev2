import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { SUPPORT_EMAIL } from '../lib/support';
import { BRAND_NAME_FULL } from '../lib/brand';
import '../styles/header.css';
import '../styles/logo.css';
import Logo from './Logo';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tryFreeOpen, setTryFreeOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      const header = document.querySelector('[data-header]');
      if (header) {
        header.classList.toggle('is-scrolled', window.scrollY > 4);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      authListener.subscription.unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setTryFreeOpen(false);
      }
    }

    if (tryFreeOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [tryFreeOpen]);

  return (
    <nav className="site-header bg-white border-b border-[#DCE3ED] sticky top-0 z-30" style={{boxShadow: '0 1px 4px rgba(0,0,0,0.04)'}} role="banner" data-header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center" style={{height: 'clamp(64px, 8vw, 80px)'}}>
          <a href="/" className="brand flex items-center" style={{gap: 'clamp(0.5rem, 2vw, 0.75rem)'}} aria-label={`Go to ${BRAND_NAME_FULL} home`}>
            <Logo variant="dark" className="logo--nav" />
            <span className="font-bold text-[#8B7BA8] leading-tight tracking-tight" style={{fontSize: 'clamp(18px, 4vw, 24px)'}}>
              {BRAND_NAME_FULL}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-[#8B7BA8] hover:text-[#A89FC4] transition-colors font-medium">
              Home
            </a>
            <a href="/faq" className="text-[#8B7BA8] hover:text-[#A89FC4] transition-colors font-medium">
              FAQ
            </a>
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <a href="/account" className="text-[#8B7BA8] hover:text-[#A89FC4] transition-colors font-medium">
                  Account
                </a>
                {plan === 'free' && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                    Free — Active
                  </span>
                )}
              </div>
            ) : (
              <a href="/auth" className="text-[#8B7BA8] hover:text-[#A89FC4] transition-colors font-medium">
                Sign in
              </a>
            )}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#8B7BA8] hover:text-[#A89FC4] transition-colors font-medium">
              Contact
            </a>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setTryFreeOpen(!tryFreeOpen)}
                className="btn-cta flex items-center gap-2"
              >
                Try free
                <ChevronDown className={`w-4 h-4 transition-transform ${tryFreeOpen ? 'rotate-180' : ''}`} />
              </button>

              {tryFreeOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-slate-200 py-2">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Start a free trial</p>
                  </div>

                  <a
                    href="/pricing?plan=pro"
                    className="block px-4 py-3 hover:bg-slate-50 transition-colors"
                    onClick={() => setTryFreeOpen(false)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold" style={{color: 'var(--color-text)'}}>Try Pro</p>
                        <p className="text-xs mt-0.5" style={{color: 'var(--color-text-muted)'}}>Full interaction reports & PDFs</p>
                      </div>
                      <span className="badge-trial whitespace-nowrap ml-2">
                        14-day trial
                      </span>
                    </div>
                  </a>

                  <a
                    href="/pricing?plan=premium"
                    className="block px-4 py-3 hover:bg-slate-50 transition-colors"
                    onClick={() => setTryFreeOpen(false)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold" style={{color: 'var(--color-text)'}}>Try Clinical</p>
                        <p className="text-xs mt-0.5" style={{color: 'var(--color-text-muted)'}}>For professionals & clinics</p>
                      </div>
                      <span className="badge-trial whitespace-nowrap ml-2">
                        14-day trial
                      </span>
                    </div>
                  </a>

                  <div className="px-4 py-2 border-t border-slate-100 mt-1">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Explore (no signup)</p>
                  </div>

                  <a
                    href="/preview/checker"
                    className="block px-4 py-2.5 hover:bg-slate-50 transition-colors text-sm text-slate-700"
                    onClick={() => setTryFreeOpen(false)}
                  >
                    Preview Interaction Checker
                  </a>

                  <a
                    href="/preview/guides"
                    className="block px-4 py-2.5 hover:bg-slate-50 transition-colors text-sm text-slate-700"
                    onClick={() => setTryFreeOpen(false)}
                  >
                    Preview Supplement Safety Guides
                  </a>

                  <a
                    href="/preview/feed"
                    className="block px-4 py-2.5 hover:bg-slate-50 transition-colors text-sm text-slate-700"
                    onClick={() => setTryFreeOpen(false)}
                  >
                    Preview Research Feed
                  </a>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#8B7BA8]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#DCE3ED] bg-white">
            <div className="flex flex-col gap-4">
              <a
                href="/"
                className="text-[#8B7BA8] hover:text-[#A89FC4] transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="/faq"
                className="text-[#8B7BA8] hover:text-[#A89FC4] transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              {isLoggedIn ? (
                <div>
                  <a
                    href="/account"
                    className="text-[#8B7BA8] hover:text-[#A89FC4] transition-colors font-medium"
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
                <a
                  href="/auth"
                  className="text-[#8B7BA8] hover:text-[#A89FC4] transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </a>
              )}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-[#8B7BA8] hover:text-[#A89FC4] transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>

              <div className="border-t border-slate-200 pt-4 mt-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3 px-2">
                  Start a free trial
                </p>

                <a
                  href="/pricing?plan=pro"
                  className="block px-2 py-2 hover:bg-slate-50 rounded transition-colors mb-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-sm" style={{color: 'var(--color-text)'}}>Try Pro</p>
                      <p className="text-xs mt-0.5" style={{color: 'var(--color-text-muted)'}}>Full interaction reports & PDFs</p>
                    </div>
                    <span className="badge-trial whitespace-nowrap ml-2">
                      14-day trial
                    </span>
                  </div>
                </a>

                <a
                  href="/pricing?plan=premium"
                  className="block px-2 py-2 hover:bg-slate-50 rounded transition-colors mb-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-sm" style={{color: 'var(--color-text)'}}>Try Clinical</p>
                      <p className="text-xs mt-0.5" style={{color: 'var(--color-text-muted)'}}>For professionals & clinics</p>
                    </div>
                    <span className="badge-trial whitespace-nowrap ml-2">
                      14-day trial
                    </span>
                  </div>
                </a>

                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3 px-2 pt-2 border-t border-slate-200">
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
      </div>
    </nav>
  );
}
