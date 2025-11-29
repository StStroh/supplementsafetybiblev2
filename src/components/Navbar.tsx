import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { SUPPORT_EMAIL } from '../lib/support';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setIsLoggedIn(!!data?.user);
    })();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

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
              <a href="/account" className="text-[#4A4A4A] hover:text-[#1A73E8] transition-colors font-medium">
                Account
              </a>
            ) : (
              <a href="/auth" className="text-[#4A4A4A] hover:text-[#1A73E8] transition-colors font-medium">
                Sign in
              </a>
            )}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#4A4A4A] hover:text-[#1A73E8] transition-colors font-medium">
              Contact
            </a>
            <a href="/#pricing" className="bg-[#1A73E8] text-white px-6 py-2 rounded-lg hover:bg-[#1557B0] transition-colors font-medium">
              Get Started
            </a>
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
                <a
                  href="/account"
                  className="text-[#4A4A4A] hover:text-[#1A73E8] transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Account
                </a>
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
              <a
                href="/#pricing"
                className="bg-[#1A73E8] text-white px-6 py-2 rounded-lg hover:bg-[#1557B0] transition-colors font-medium text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
