import { Link } from "react-router-dom";

export default function StickyFreeCTA() {
  return (
    <div className="fixed bottom-4 inset-x-4 sm:hidden z-40">
      <Link
        to="/free"
        className="block w-full h-12 rounded-full bg-black text-white font-medium shadow-lg text-center leading-[3rem]"
        role="button"
      >
        Start Free
      </Link>
    </div>
  );
}
