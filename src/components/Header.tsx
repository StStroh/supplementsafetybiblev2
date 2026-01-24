import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { BRAND_NAME_FULL } from '../lib/brand';
import '../styles/logo.css';
import Logo from './Logo';

export default function Header() {
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
    <nav className="border-b border-gray-100 sticky top-0 z-30 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between" style={{height: 'clamp(72px, 9vw, 88px)'}}>
          <a href="/" className="flex items-center" style={{gap: 'clamp(0.75rem, 2.5vw, 1rem)'}}>
            <Logo variant="dark" className="logo--nav" />
            <span className="font-bold text-[#8B7BA8] leading-tight tracking-tight" style={{fontSize: 'clamp(20px, 4.5vw, 26px)'}}>
              {BRAND_NAME_FULL}
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <a href="/search" className="text-sm font-medium text-[#8B7BA8] hover:text-[#A89FC4] transition">
              Search
            </a>
            <a href="/pregnancy" className="text-sm font-medium text-[#8B7BA8] hover:text-[#A89FC4] transition">
              Pregnancy
            </a>
            <a href="/premium" className="text-sm font-medium text-[#8B7BA8] hover:text-[#A89FC4] transition">
              Premium
            </a>
            <a href="/faq" className="text-sm font-medium text-[#8B7BA8] hover:text-[#A89FC4] transition">
              FAQ
            </a>
          </div>

          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <a href="/account" className="text-sm font-medium text-[#8B7BA8] hover:text-[#A89FC4] transition">
                Account
              </a>
            ) : (
              <a href="/auth" className="text-sm font-medium text-[#8B7BA8] hover:text-[#A89FC4] transition">
                Login
              </a>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#8B7BA8]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <a
                href="/search"
                className="text-sm font-medium text-[#8B7BA8] hover:text-[#A89FC4] transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Search
              </a>
              <a
                href="/pregnancy"
                className="text-sm font-medium text-[#8B7BA8] hover:text-[#A89FC4] transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pregnancy
              </a>
              <a
                href="/premium"
                className="text-sm font-medium text-[#8B7BA8] hover:text-[#A89FC4] transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Premium
              </a>
              <a
                href="/faq"
                className="text-sm font-medium text-[#8B7BA8] hover:text-[#A89FC4] transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              {isLoggedIn ? (
                <a
                  href="/account"
                  className="text-sm font-medium text-[#8B7BA8] hover:text-[#A89FC4] transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Account
                </a>
              ) : (
                <a
                  href="/auth"
                  className="text-sm font-medium text-[#8B7BA8] hover:text-[#A89FC4] transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
