import { useEffect, useRef } from "react";

type Props = {
  type?: "error" | "success" | "info" | "warning";
  message: string;
  onClose?: () => void;
  autoHideMs?: number;
};

export default function AlertBanner({
  type = "error",
  message,
  onClose,
  autoHideMs = 6000
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const set = () => {
      document.documentElement.style.setProperty(
        "--alert-banner-h",
        `${el.offsetHeight}px`
      );
    };

    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);

    const timer = window.setTimeout(() => onClose?.(), autoHideMs);

    return () => {
      ro.disconnect();
      window.clearTimeout(timer);
      document.documentElement.style.removeProperty("--alert-banner-h");
    };
  }, [onClose, autoHideMs]);

  const tone =
    type === "error" ? "bg-red-600 text-white" :
    type === "success" ? "bg-green-600 text-white" :
    type === "warning" ? "bg-amber-500 text-black" :
    "bg-sky-600 text-white";

  return (
    <div
      ref={ref}
      role="status"
      className={`${tone} w-full fixed top-0 left-0 right-0 z-[100]`}
      style={{ paddingTop: "max(env(safe-area-inset-top), 0px)" }}
    >
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-start gap-3">
        <span className="flex-1 font-medium text-sm">{message}</span>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onClose}
          className="ml-auto opacity-80 hover:opacity-100 text-2xl leading-none -mt-1"
        >
          ×
        </button>
      </div>
    </div>
  );
}
