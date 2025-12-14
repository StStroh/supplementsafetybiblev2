import { Link } from "react-router-dom";

export default function StickyFreeCTA() {
  return (
    <div className="sticky-free-bar fixed bottom-4 inset-x-4 sm:hidden z-[50]" style={{ pointerEvents: 'none' }}>
      <Link
        to="/free"
        className="block w-full h-12 rounded-full bg-black text-white font-medium shadow-lg text-center leading-[3rem]"
        role="button"
        style={{ pointerEvents: 'auto' }}
      >
        Start Free
      </Link>
    </div>
  );
}
