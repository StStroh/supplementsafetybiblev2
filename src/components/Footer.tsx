export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - About */}
          <div>
            <h4 className="font-bold text-lg mb-4">Supplement Safety Bible</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Free, evidence-based supplement-medication interaction checker. Created by manufacturing professionals for public safety.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-300 hover:text-[#8b4d9f] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/check" className="text-gray-300 hover:text-[#8b4d9f] transition-colors">
                  Check Interactions
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-[#8b4d9f] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/how-it-works" className="text-gray-300 hover:text-[#8b4d9f] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-300 hover:text-[#8b4d9f] transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div>
            <h4 className="font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/privacy" className="text-gray-300 hover:text-[#8b4d9f] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-300 hover:text-[#8b4d9f] transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#disclaimer" className="text-gray-300 hover:text-[#8b4d9f] transition-colors">
                  Medical Disclaimer
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <p className="text-gray-300 text-sm mb-2">Questions or feedback?</p>
            <a
              href="mailto:info@supplementsafetybible.com"
              className="text-[#8b4d9f] hover:text-[#a66bb5] transition-colors text-sm"
            >
              info@supplementsafetybible.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          {/* Professional Statement */}
          <p className="text-gray-400 text-xs text-center mb-4">
            Created by supplement manufacturing professionals with 20+ years NSF GMP certified facility experience
          </p>

          {/* Medical Disclaimer */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6" id="disclaimer">
            <p className="text-gray-300 text-xs leading-relaxed text-center">
              <strong className="text-white">MEDICAL DISCLAIMER:</strong> This tool provides educational information only and does not constitute medical advice. Always consult your physician or qualified healthcare provider before starting, stopping, or changing any supplement or medication regimen.
            </p>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-xs text-center">
            © 2026 Supplement Safety Bible. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
