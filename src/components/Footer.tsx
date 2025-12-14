import { SUPPORT_EMAIL } from '../lib/support';
import { Linkedin, Instagram, Music, Twitter } from 'lucide-react';
import '../styles/logo.css';
import Logo from './Logo';

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
                <a href="/check" className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors">
                  Interactions
                </a>
              </li>
              <li>
                <a href="/supplements" className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors">
                  Supplements A–Z
                </a>
              </li>
              <li>
                <a href="/medications" className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors">
                  Medications A–Z
                </a>
              </li>
              <li>
                <a href="/conditions" className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors">
                  Conditions A–Z
                </a>
              </li>
              <li>
                <a href="/preview/guides" className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors">
                  Guides
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#000000] font-semibold mb-4">Get Started</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/pricing" className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/pricing?plan=pro" className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors">
                  Try Pro (14-day)
                </a>
              </li>
              <li>
                <a href="/pricing?plan=premium" className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors">
                  Try Clinical (14-day)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#000000] font-semibold mb-4">Policies</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/refund-policy" className="text-[#4A4A4A] hover:text-[#1A73E8] transition-colors">
                  Refund Policy (60-day guarantee)
                </a>
              </li>
              <li>
                <a href="/terms" className="text-[#4A4A4A] hover:text-[#1A73E8] transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-[#4A4A4A] hover:text-[#1A73E8] transition-colors">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#DCE3ED] pt-8 text-center text-sm">
          <p className="text-[#4A4A4A]">
            &copy; {new Date().getFullYear()} Don't Mix Blind. All rights reserved.
          </p>
          <p className="text-[#4A4A4A] mt-2 text-xs">
            Disclaimer: This tool is for educational purposes only and is not a substitute for professional medical advice.
          </p>
          <p className="text-[#4A4A4A] mt-3">
            Support: <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#5E3B76] hover:underline">{SUPPORT_EMAIL}</a>
          </p>

          <div className="mt-8 pt-6 border-t border-[#DCE3ED]">
            <p className="text-[#000000] font-semibold mb-4">Follow us</p>
            <div className="flex items-center justify-center gap-6">
              <a
                href="https://www.tiktok.com/@supplementsafetybible"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors"
              >
                <Music size={24} />
              </a>
              <a
                href="https://www.linkedin.com/company/supplement-safety-bible"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://www.instagram.com/supplementsafetybible"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://x.com/suppsafetybible"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="text-[#4A4A4A] hover:text-[#5E3B76] transition-colors"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
