import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

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
    <nav className="border-b border-gray-100 sticky top-0 z-50 bg-white/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <span className="text-lg font-semibold text-black">Don't Mix Blind</span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <a href="/search" className="text-sm font-medium text-gray-700 hover:text-black transition">
              Search
            </a>
            <a href="/premium" className="text-sm font-medium text-gray-700 hover:text-black transition">
              Premium
            </a>
            <a href="/faq" className="text-sm font-medium text-gray-700 hover:text-black transition">
              FAQ
            </a>
          </div>

          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <a href="/account" className="text-sm font-medium text-gray-700 hover:text-black transition">
                Account
              </a>
            ) : (
              <a href="/auth" className="text-sm font-medium text-gray-700 hover:text-black transition">
                Login
              </a>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <a
                href="/search"
                className="text-sm font-medium text-gray-700 hover:text-black transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Search
              </a>
              <a
                href="/premium"
                className="text-sm font-medium text-gray-700 hover:text-black transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Premium
              </a>
              <a
                href="/faq"
                className="text-sm font-medium text-gray-700 hover:text-black transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              {isLoggedIn ? (
                <a
                  href="/account"
                  className="text-sm font-medium text-gray-700 hover:text-black transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Account
                </a>
              ) : (
                <a
                  href="/auth"
                  className="text-sm font-medium text-gray-700 hover:text-black transition"
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
