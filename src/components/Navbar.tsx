import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { SUPPORT_EMAIL } from '../lib/support';

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

    return () => {
      authListener.subscription.unsubscribe();
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
    <nav className="bg-white border-b border-[#DCE3ED] sticky top-0 z-50" style={{boxShadow: '0 1px 4px rgba(0,0,0,0.04)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="flex items-center gap-2">
            <img src="/logosafetybible.jpg" alt="Don't Mix Blind" className="w-10 h-10 rounded-lg" />
            <span className="text-xl font-bold text-[#000000]">Don't Mix Blind</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-[#4A4A4A] hover:text-[#1A73E8] transition-colors font-medium">
              Home
            </a>
            <a href="/faq" className="text-[#4A4A4A] hover:text-[#1A73E8] transition-colors font-medium">
              FAQ
            </a>
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <a href="/account" className="text-[#4A4A4A] hover:text-[#1A73E8] transition-colors font-medium">
                  Account
                </a>
                {plan === 'free' && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                    Free — Active
                  </span>
                )}
              </div>
            ) : (
              <a href="/auth" className="text-[#4A4A4A] hover:text-[#1A73E8] transition-colors font-medium">
                Sign in
              </a>
            )}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#4A4A4A] hover:text-[#1A73E8] transition-colors font-medium">
              Contact
            </a>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setTryFreeOpen(!tryFreeOpen)}
                className="bg-[#1A73E8] text-white px-6 py-2 rounded-lg hover:bg-[#1557B0] transition-colors font-medium flex items-center gap-2"
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
                        <p className="font-semibold text-slate-900">Try Pro</p>
                        <p className="text-xs text-slate-600 mt-0.5">Full interaction reports & PDFs</p>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium whitespace-nowrap ml-2">
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
                        <p className="font-semibold text-slate-900">Try Clinical</p>
                        <p className="text-xs text-slate-600 mt-0.5">For professionals & clinics</p>
                      </div>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium whitespace-nowrap ml-2">
                        14-day trial
                      </span>
                    </div>
                  </a>

                  <div className="px-4 py-2 border-t border-slate-100 mt-1">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Explore (no signup)</p>
                  </div>

                  <a
                    href="/check"
                    className="block px-4 py-2.5 hover:bg-slate-50 transition-colors text-sm text-slate-700"
                    onClick={() => setTryFreeOpen(false)}
                  >
                    Preview Interaction Checker
                  </a>

                  <a
                    href="/search"
                    className="block px-4 py-2.5 hover:bg-slate-50 transition-colors text-sm text-slate-700"
                    onClick={() => setTryFreeOpen(false)}
                  >
                    Preview Supplement Safety Guides
                  </a>

                  <a
                    href="/#research"
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
            className="md:hidden text-gray-700"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#DCE3ED] bg-white">
            <div className="flex flex-col gap-4">
              <a
                href="/"
                className="text-[#4A4A4A] hover:text-[#1A73E8] transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="/faq"
                className="text-[#4A4A4A] hover:text-[#1A73E8] transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              {isLoggedIn ? (
                <div>
                  <a
                    href="/account"
                    className="text-[#4A4A4A] hover:text-[#1A73E8] transition-colors font-medium"
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
                  className="text-[#4A4A4A] hover:text-[#1A73E8] transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </a>
              )}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-[#4A4A4A] hover:text-[#1A73E8] transition-colors font-medium"
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
                      <p className="font-semibold text-slate-900 text-sm">Try Pro</p>
                      <p className="text-xs text-slate-600 mt-0.5">Full interaction reports & PDFs</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium whitespace-nowrap ml-2">
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
                      <p className="font-semibold text-slate-900 text-sm">Try Clinical</p>
                      <p className="text-xs text-slate-600 mt-0.5">For professionals & clinics</p>
                    </div>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium whitespace-nowrap ml-2">
                      14-day trial
                    </span>
                  </div>
                </a>

                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3 px-2 pt-2 border-t border-slate-200">
                  Explore (no signup)
                </p>

                <a
                  href="/check"
                  className="block px-2 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Preview Interaction Checker
                </a>

                <a
                  href="/search"
                  className="block px-2 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Preview Supplement Safety Guides
                </a>

                <a
                  href="/#research"
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
