import React, { useEffect, useId, useRef, useState } from "react";

type Option = { id: string; label: string; meta?: string };

interface MultiAutocompleteProps {
  label: string;
  placeholder?: string;
  value: string[];
  onChange: (vals: string[]) => void;
  options: Option[];
  maxItems?: number;
  onSelectOption?: (opt: Option) => void;
  formFieldName?: string;
  setFormValue?: (name: string, value: any) => void;
  triggerValidate?: (name: string) => void;
  showCategoryBadges?: boolean;
  showCounter?: boolean;
  counterPosition?: "label" | "hint";
}

export default function MultiAutocomplete({
  label,
  placeholder = "Type to add…",
  value,
  onChange,
  options,
  maxItems = 5,
  onSelectOption,
  formFieldName,
  setFormValue,
  triggerValidate,
  showCategoryBadges = true,
  showCounter = true,
  counterPosition = "label",
}: MultiAutocompleteProps) {
  const listboxId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const committingRef = useRef(false);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const filtered = (query ? options.filter(o =>
    o.label.toLowerCase().includes(query.toLowerCase())
  ) : options).filter(o => !value.includes(o.label));

  useEffect(() => {
    if (query) setIsOpen(true); else setIsOpen(false);
    setHighlightIndex(filtered.length ? 0 : -1);
  }, [query, value, options]);

  function commit(opt: Option) {
    if (!opt || value.includes(opt.label) || value.length >= maxItems) return;
    const next = [...value, opt.label];
    onChange(next);
    onSelectOption?.(opt);
    if (formFieldName && setFormValue) {
      setFormValue(formFieldName, next);
      triggerValidate?.(formFieldName);
    }
    setQuery("");
    setIsOpen(false);
    setHighlightIndex(-1);
    committingRef.current = false;
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function choose(index: number) {
    const opt = filtered[index];
    if (opt) commit(opt);
  }

  function remove(labelToRemove: string) {
    const next = value.filter(v => v !== labelToRemove);
    onChange(next);
    if (formFieldName && setFormValue) {
      setFormValue(formFieldName, next);
      triggerValidate?.(formFieldName);
    }
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  const counter = `${value.length}/${maxItems}`;

  return (
    <div className={`multi-ac ${isOpen ? "is-open" : ""}`}>
      <div className="multi-ac__labelRow">
        <label className="multi-ac__label">{label}</label>
        {showCounter && counterPosition === "label" && (
          <span className="multi-ac__counter" aria-live="polite">{counter}</span>
        )}
      </div>

      <div
        className="multi-ac__control"
        onClick={() => inputRef.current?.focus()}
        role="group"
        aria-label={`${label} selection`}
      >
        <div className="multi-ac__chips" role="list">
          {value.map((lbl) => {
            const opt = options.find(o => o.label === lbl);
            return (
              <span key={lbl} className="chip" role="listitem" aria-label={`${lbl} selected`}>
                {showCategoryBadges && opt?.meta && (
                  <span className="badge" aria-hidden="true">{opt.meta}</span>
                )}
                <span className="chip__text">{lbl}</span>
                <button
                  type="button"
                  className="chip__x"
                  aria-label={`Remove ${lbl}`}
                  onClick={(e) => { e.stopPropagation(); remove(lbl); }}
                >×</button>
              </span>
            );
          })}

          <input
            ref={inputRef}
            className="multi-ac__input"
            placeholder={value.length ? "" : placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query && setIsOpen(true)}
            onKeyDown={(e) => {
              if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) { setIsOpen(true); return; }
              if (e.key === "ArrowDown") { e.preventDefault(); setHighlightIndex(h => filtered.length ? (h + 1) % filtered.length : -1); }
              else if (e.key === "ArrowUp") { e.preventDefault(); setHighlightIndex(h => filtered.length ? (h - 1 + filtered.length) % filtered.length : -1); }
              else if (e.key === "Enter") {
                if (isOpen && highlightIndex >= 0) { e.preventDefault(); choose(highlightIndex); }
                else if (query.trim()) { commit({ id: query.trim(), label: query.trim() }); }
              } else if (e.key === "Backspace" && query === "" && value.length) {
                remove(value[value.length - 1]);
              } else if (e.key === "Escape" || e.key === "Tab") {
                setIsOpen(false);
              }
            }}
            onBlur={(e) => {
              if (committingRef.current) {
                e.preventDefault();
                committingRef.current = false;
                requestAnimationFrame(() => inputRef.current?.focus());
                return;
              }
              setIsOpen(false);
            }}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={isOpen}
            aria-controls={listboxId}
            aria-activedescendant={isOpen && highlightIndex >= 0 ? `${listboxId}-opt-${highlightIndex}` : undefined}
            autoComplete="off"
            spellCheck={false}
            disabled={value.length >= maxItems}
          />
        </div>

        {isOpen && filtered.length > 0 && (
          <ul id={listboxId} role="listbox" className="multi-ac__list">
            {filtered.map((o, i) => (
              <li
                key={o.id}
                id={`${listboxId}-opt-${i}`}
                role="option"
                aria-selected={i === highlightIndex}
                tabIndex={-1}
                className={`multi-ac__item ${i === highlightIndex ? "is-active" : ""}`}
                onPointerDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  committingRef.current = true;
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  committingRef.current = true;
                }}
                onClick={() => commit(o)}
              >
                <div className="multi-ac__itemMain">
                  <span className="multi-ac__labelText">{o.label}</span>
                  {o.meta && <span className="badge badge--ghost">{o.meta}</span>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="multi-ac__hintRow">
        <div className="multi-ac__hint" aria-live="polite">
          {value.length >= maxItems ? `Max ${maxItems} selected.` : ""}
        </div>
        {showCounter && counterPosition === "hint" && (
          <span className="multi-ac__counter" aria-live="polite">{counter}</span>
        )}
      </div>
    </div>
  );
}
