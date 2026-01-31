import { Link } from 'react-router-dom';
import { INFO_EMAIL } from '../lib/support';
import { BRAND_NAME_FULL } from '../lib/brand';
import { Linkedin, Instagram, Shield, Lock, CreditCard, Award } from 'lucide-react';
import '../styles/logo.css';
import Logo from './Logo';

const SOCIALS = {
  tiktok: 'https://www.tiktok.com/@supplementsafetybible',
  linkedin: 'https://www.linkedin.com/company/supplement-safety-bible',
  instagram: 'https://www.instagram.com/supplementsafetybible',
  x: 'https://x.com/suppsafetybible',
} as const;

const TikTokIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="img" aria-hidden="true">
    <title>TikTok</title>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="img" aria-hidden="true">
    <title>X</title>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const StripeLogo = () => (
  <svg width="48" height="20" viewBox="0 0 60 25" fill="currentColor" className="opacity-60" role="img" aria-hidden="true">
    <title>Stripe</title>
    <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 0 1-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-4.91.7c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 0 1-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.53-.24 1.53-1C6.26 13.77 0 14.51 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.36 0 2.72.2 4.09.75v3.88a9.23 9.23 0 0 0-4.1-1.06c-.86 0-1.44.25-1.44.9 0 1.85 6.29.97 6.29 5.88z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#DCE3ED] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <Logo variant="dark" className="logo--footer" />
            </div>
            <p className="text-sm text-[#4A4A4A] leading-relaxed">
              Your trusted, evidence-based resource for checking interactions between supplements and prescription medications.
            </p>
          </div>

          <div>
            <h4 className="text-[#000000] font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/check" className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors">
                  Interactions
                </Link>
              </li>
              <li>
                <Link to="/supplements" className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors">
                  Supplements A–Z
                </Link>
              </li>
              <li>
                <Link to="/medications" className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors">
                  Medications A–Z
                </Link>
              </li>
              <li>
                <Link to="/conditions" className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors">
                  Conditions A–Z
                </Link>
              </li>
              <li>
                <Link to="/preview/guides" className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors">
                  Guides
                </Link>
              </li>
            </ul>

            <h4 className="text-[#000000] font-semibold mb-2 mt-6">Popular Checks</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/check?query=vitamin-k-warfarin" className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors">
                  Vitamin K + Warfarin
                </Link>
              </li>
              <li>
                <Link to="/check?query=st-johns-wort-ssri" className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors">
                  St. John's Wort + SSRI
                </Link>
              </li>
              <li>
                <Link to="/check?query=magnesium-levothyroxine" className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors">
                  Magnesium + Levothyroxine
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#000000] font-semibold mb-4">Get Started</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/pricing" className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/pricing?plan=pro" className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors">
                  Try Pro (14-day)
                </Link>
              </li>
              <li>
                <Link to="/pricing?plan=premium" className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors">
                  Try Clinical (14-day)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#000000] font-semibold mb-4">Learn More</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about-the-checker" className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors">
                  About the Checker
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/why-ai-assistants-recommend-us" className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors">
                  Why AI Recommends Us
                </Link>
              </li>
            </ul>

            <h4 className="text-[#000000] font-semibold mb-4 mt-6">Policies</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/refund-policy" className="text-[#4A4A4A] hover:text-[#1A73E8] transition-colors">
                  Refund Policy (60-day guarantee)
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-[#4A4A4A] hover:text-[#1A73E8] transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-[#4A4A4A] hover:text-[#1A73E8] transition-colors">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#DCE3ED] pt-8 text-center text-sm">
          <p className="text-[#4A4A4A]">
            &copy; {new Date().getFullYear()} {BRAND_NAME_FULL}. All rights reserved.
          </p>

          <p className="text-[#4A4A4A] mt-2 text-xs">
            Disclaimer: This tool is for educational purposes only and is not a substitute for professional medical advice.
          </p>

          <p className="text-[#4A4A4A] mt-3">
            General inquiries:{' '}
            <a href={`mailto:${INFO_EMAIL}`} className="text-[#5E3B76] hover:underline">
              {INFO_EMAIL}
            </a>
          </p>

          <div className="mt-8 pt-6 border-t border-[#DCE3ED]">
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-[#4A4A4A]">
                <Shield size={18} className="text-green-600" />
                <span className="text-xs font-medium">Secure Connection (TLS)</span>
              </div>

              <div className="flex items-center gap-2 text-[#4A4A4A]">
                <Lock size={18} className="text-blue-600" />
                <span className="text-xs font-medium">Account Protected</span>
              </div>

              <div className="flex items-center gap-2 text-[#4A4A4A]">
                <Award size={18} className="text-[#5E3B76]" />
                <span className="text-xs font-medium">Evidence-Based</span>
              </div>

              <div className="flex items-center gap-2 text-[#4A4A4A]">
                <CreditCard size={18} className="text-gray-600" />
                <span className="text-xs font-medium">Payments via Stripe</span>
              </div>

              <StripeLogo />
            </div>

            <p className="text-[#000000] font-semibold mb-4">Follow us</p>

            <div className="flex items-center justify-center gap-6">
              <a
                href={SOCIALS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors"
              >
                <TikTokIcon />
              </a>

              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors"
              >
                <Linkedin size={24} />
              </a>

              <a
                href={SOCIALS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors"
              >
                <Instagram size={24} />
              </a>

              <a
                href={SOCIALS.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors"
              >
                <XIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
