import { useEffect, useRef, useState } from "react";
import "../styles/autocomplete.css";

type Item = { name: string; type: "supplement" | "medication" };

type Props = {
  label: string;
  placeholder: string;
  type: "supplement" | "medication";
  onChoose: (value: string) => void;
  className: string;
  dropdownClassName?: string;
  "data-testid"?: string;
};

export default function TypeaheadInput({
  label,
  placeholder,
  type,
  onChoose,
  className,
  dropdownClassName,
  "data-testid": testId,
}: Props) {
  const [q, setQ] = useState("");
  const [list, setList] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function suggest(query: string) {
    const u = `/.netlify/functions/suggest?q=${encodeURIComponent(query)}&type=${type}&limit=12`;
    const r = await fetch(u);
    return r.ok ? (await r.json()) as Item[] : [];
  }

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      try {
        setLoading(true);
        setList(await suggest(q));
        setOpen(true);
      } catch {
        setList([]);
        setOpen(false);
      } finally {
        setLoading(false);
      }
    }, 180);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [q, type]);

  useEffect(() => {
    function outside(e: MouseEvent) {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", outside);
    return () => document.removeEventListener("click", outside);
  }, []);

  const handleSelect = (value: string) => {
    onChoose(value);
    setQ("");
    setOpen(false);
  };

  return (
    <div className="autocomplete relative" ref={boxRef}>
      <label className="ac__label block text-sm font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{label}</label>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          // Delay to allow click to register on mobile
          setTimeout(() => setOpen(false), 200);
        }}
        inputMode="search"
        autoCorrect="off"
        spellCheck={false}
        placeholder={placeholder}
        className={className}
        aria-autocomplete="list"
        aria-expanded={open}
        role="combobox"
        data-testid={testId}
      />
      {open && (
        <div
          className={
            dropdownClassName ||
            "ac__list absolute z-[9999] mt-1 max-h-64 w-full overflow-auto rounded-lg shadow-lg"
          }
          style={{ border: '2px solid var(--color-border)', background: 'var(--color-surface)' }}
          role="listbox"
        >
          {loading && <div className="px-3 py-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>Loading…</div>}
          {!loading && list.length === 0 && q && (
            <>
              <div className="px-3 py-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>No matches</div>
              <button
                type="button"
                className="ac__item block w-full px-3 py-2 text-left transition min-h-[44px]"
                style={{ color: 'var(--color-text)' }}
                onPointerDown={(e) => e.preventDefault()} // Prevent blur on iOS
                onMouseDown={(e) => e.preventDefault()} // Prevent blur on desktop
                onClick={() => handleSelect(q)}
                role="option"
                tabIndex={-1}
              >
                Use "{q}"
              </button>
            </>
          )}
          {!loading &&
            list.map((it, i) => (
              <button
                key={`${it.name}-${i}`}
                type="button"
                className="ac__item block w-full px-3 py-2 text-left transition text-sm min-h-[44px] hover:bg-gray-50"
                style={{ color: 'var(--color-text)' }}
                onPointerDown={(e) => e.preventDefault()} // Prevent blur on iOS
                onMouseDown={(e) => e.preventDefault()} // Prevent blur on desktop
                onClick={() => handleSelect(it.name)}
                role="option"
                tabIndex={-1}
              >
                <span className="ac__labelText">{it.name}</span>{" "}
                <span className="ac__meta text-xs" style={{ color: 'var(--color-text-muted)' }}>({it.type})</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
