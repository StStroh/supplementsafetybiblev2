export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-600">© 2025 Supplement Safety Bible</span>
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <a href="/terms" className="hover:text-black transition">
              Terms
            </a>
            <span className="text-gray-300">•</span>
            <a href="/privacy" className="hover:text-black transition">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
