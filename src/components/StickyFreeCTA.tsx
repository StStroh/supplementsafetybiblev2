export default function StickyFreeCTA({ onStart }: { onStart: () => void }) {
  return (
    <div className="fixed bottom-4 inset-x-4 sm:hidden z-40">
      <button
        onClick={onStart}
        className="w-full h-12 rounded-full bg-black text-white font-medium shadow-lg"
      >
        Start Free
      </button>
    </div>
  );
}
