export default function FooterClinical(){
  return (
    <footer className="border-t mt-24">
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <div className="h-8 w-8 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 mb-3" />
          <p className="text-slate-600">Practical, clinically-oriented guidance to avoid risky supplement–medication combinations.</p>
        </div>
        <div>
          <p className="font-medium mb-2">Product</p>
          <ul className="space-y-2 text-slate-600">
            <li><a href="/pricing" className="hover:text-indigo-700">Pricing</a></li>
            <li><a href="#features" className="hover:text-indigo-700">Features</a></li>
            <li><a href="#faq" className="hover:text-indigo-700">FAQ</a></li>
          </ul>
        </div>
        <div>
          <p className="font-medium mb-2">Company</p>
          <ul className="space-y-2 text-slate-600">
            <li><a href="/about" className="hover:text-indigo-700">About</a></li>
            <li><a href="/contact" className="hover:text-indigo-700">Contact</a></li>
          </ul>
        </div>
        <div>
          <p className="font-medium mb-2">Legal</p>
          <ul className="space-y-2 text-slate-600">
            <li><a href="/terms" className="hover:text-indigo-700">Terms</a></li>
            <li><a href="/privacy" className="hover:text-indigo-700">Privacy</a></li>
            <li><a href="/disclaimer" className="hover:text-indigo-700">Medical Disclaimer</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-10 text-xs text-slate-500">© {new Date().getFullYear()} Supplement Safety Bible</div>
    </footer>
  );
}
