import { SUPPORT_EMAIL } from '../lib/support';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#DCE3ED] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logosafetybible.jpg" alt="Don't Mix Blind" className="w-10 h-10 rounded-lg" />
              <span className="text-xl font-bold text-[#000000]">Don't Mix Blind</span>
            </div>
            <p className="text-sm text-[#4A4A4A] leading-relaxed">
              Your trusted, evidence-based resource for checking interactions between supplements and prescription medications.
            </p>
          </div>

          <div>
            <h4 className="text-[#000000] font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#pricing" className="text-[#4A4A4A] hover:text-[#1A73E8] transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/faq" className="text-[#4A4A4A] hover:text-[#1A73E8] transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#000000] font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/privacy" className="text-[#4A4A4A] hover:text-[#1A73E8] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-[#4A4A4A] hover:text-[#1A73E8] transition-colors">
                  Terms of Service
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
            Support: <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#1A73E8] hover:underline">{SUPPORT_EMAIL}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
