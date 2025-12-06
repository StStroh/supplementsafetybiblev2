import { useEffect, useRef, useState } from "react";

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

  return (
    <div className="relative" ref={boxRef}>
      <label className="block text-sm font-semibold text-slate-900 mb-2">{label}</label>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => setOpen(true)}
        inputMode="search"
        autoCorrect="off"
        spellCheck={false}
        placeholder={placeholder}
        className={className}
        aria-autocomplete="list"
        data-testid={testId}
      />
      {open && (
        <div
          className={
            dropdownClassName ||
            "absolute z-50 mt-1 max-h-64 w-full overflow-auto rounded-lg border-2 border-slate-200 bg-white shadow-lg"
          }
          role="listbox"
        >
          {loading && <div className="px-3 py-2 text-sm text-slate-500">Loading…</div>}
          {!loading && list.length === 0 && q && (
            <>
              <div className="px-3 py-2 text-sm text-slate-500">No matches</div>
              <button
                type="button"
                className="block w-full px-3 py-2 text-left text-slate-700 hover:bg-slate-100"
                onClick={() => {
                  onChoose(q);
                  setQ("");
                  setOpen(false);
                }}
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
                className="block w-full px-3 py-2 text-left hover:bg-slate-100 text-sm"
                role="option"
                onClick={() => {
                  onChoose(it.name);
                  setQ("");
                  setOpen(false);
                }}
              >
                {it.name}{" "}
                <span className="text-xs text-slate-500">({it.type})</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
