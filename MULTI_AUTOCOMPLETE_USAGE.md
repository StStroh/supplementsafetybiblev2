# MultiAutocomplete Component Usage

## Overview

The `MultiAutocomplete` component allows users to select multiple items from a searchable list with visual enhancements including category badges and live counters.

## Features

✅ **Multi-select**: Select up to a configurable maximum number of items
✅ **Category badges**: Visual indicators for item types (supplement/medication)
✅ **Live counters**: Real-time display of selected items (e.g., "3/5")
✅ **Keyboard navigation**: Arrow keys, Enter, Backspace, Escape support
✅ **Mobile-friendly**: Touch targets, iOS blur prevention
✅ **Accessibility**: ARIA roles, live regions, keyboard support
✅ **Dark mode**: Automatic theme support

---

## Basic Usage

```tsx
import MultiAutocomplete from "@/components/MultiAutocomplete";
import "@/styles/multi-autocomplete.css";

function MyForm() {
  const [supplements, setSupplements] = useState<string[]>([]);

  const suppOptions = [
    { id: "mag", label: "Magnesium", meta: "supplement" },
    { id: "ash", label: "Ashwagandha", meta: "supplement" },
    { id: "o3", label: "Omega-3", meta: "supplement" },
    { id: "vd", label: "Vitamin D", meta: "supplement" },
    { id: "fo", label: "Fish Oil", meta: "supplement" },
    { id: "tur", label: "Turmeric", meta: "supplement" },
  ];

  return (
    <form>
      <MultiAutocomplete
        label="Supplements"
        value={supplements}
        onChange={setSupplements}
        options={suppOptions}
        maxItems={5}
        showCategoryBadges
        showCounter
        counterPosition="label"
      />
    </form>
  );
}
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | *required* | Label text displayed above the input |
| `value` | `string[]` | *required* | Array of selected item labels |
| `onChange` | `(vals: string[]) => void` | *required* | Callback when selection changes |
| `options` | `Option[]` | *required* | Array of available options |
| `placeholder` | `string` | `"Type to add…"` | Placeholder text when empty |
| `maxItems` | `number` | `5` | Maximum number of items that can be selected |
| `onSelectOption` | `(opt: Option) => void` | - | Optional callback when item is selected |
| `showCategoryBadges` | `boolean` | `true` | Display category badges on chips |
| `showCounter` | `boolean` | `true` | Display item counter (e.g., "3/5") |
| `counterPosition` | `"label" \| "hint"` | `"label"` | Where to position the counter |
| `formFieldName` | `string` | - | Field name for react-hook-form integration |
| `setFormValue` | `(name: string, value: any) => void` | - | RHF setValue function |
| `triggerValidate` | `(name: string) => void` | - | RHF trigger function |

### Option Type

```typescript
type Option = {
  id: string;          // Unique identifier
  label: string;       // Display text
  meta?: string;       // Category badge text (e.g., "supplement", "medication")
};
```

---

## Full Example with Multiple Fields

```tsx
import { useState } from "react";
import MultiAutocomplete from "@/components/MultiAutocomplete";
import "@/styles/multi-autocomplete.css";

export default function InteractionChecker() {
  const [supplements, setSupplements] = useState<string[]>([]);
  const [medications, setMedications] = useState<string[]>([]);

  const suppOptions = [
    { id: "mag", label: "Magnesium", meta: "supplement" },
    { id: "ash", label: "Ashwagandha", meta: "supplement" },
    { id: "o3", label: "Omega-3", meta: "supplement" },
    { id: "vd", label: "Vitamin D", meta: "supplement" },
    { id: "fo", label: "Fish Oil", meta: "supplement" },
    { id: "tur", label: "Turmeric", meta: "supplement" },
  ];

  const medOptions = [
    { id: "war", label: "Warfarin", meta: "medication" },
    { id: "met", label: "Metformin", meta: "medication" },
    { id: "ser", label: "Sertraline", meta: "medication" },
    { id: "lev", label: "Levothyroxine", meta: "medication" },
    { id: "ome", label: "Omeprazole", meta: "medication" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Checking interactions:", { supplements, medications });
  };

  const hasSelections = supplements.length > 0 || medications.length > 0;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <MultiAutocomplete
        label="Supplements"
        placeholder="Type to add supplements…"
        value={supplements}
        onChange={setSupplements}
        options={suppOptions}
        maxItems={5}
        showCategoryBadges
        showCounter
        counterPosition="label"
      />

      <MultiAutocomplete
        label="Medications"
        placeholder="Type to add medications…"
        value={medications}
        onChange={setMedications}
        options={medOptions}
        maxItems={5}
        showCategoryBadges
        showCounter
        counterPosition="label"
      />

      <button
        type="submit"
        className="cta"
        disabled={!hasSelections}
      >
        Check Interactions Now
      </button>
    </form>
  );
}
```

---

## React Hook Form Integration

```tsx
import { useForm, Controller } from "react-hook-form";
import MultiAutocomplete from "@/components/MultiAutocomplete";

function MyForm() {
  const { control, handleSubmit, setValue, trigger } = useForm({
    defaultValues: {
      supplements: [],
      medications: [],
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="supplements"
        control={control}
        render={({ field }) => (
          <MultiAutocomplete
            label="Supplements"
            value={field.value}
            onChange={field.onChange}
            options={suppOptions}
            formFieldName="supplements"
            setFormValue={setValue}
            triggerValidate={trigger}
          />
        )}
      />
    </form>
  );
}
```

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Type** | Open dropdown and filter options |
| **Arrow Down** | Highlight next option |
| **Arrow Up** | Highlight previous option |
| **Enter** | Select highlighted option or add custom value |
| **Backspace** (empty input) | Remove last selected item |
| **Escape** | Close dropdown |
| **Tab** | Close dropdown and move to next field |

---

## Customization

### Counter Position

```tsx
// Show counter next to label (default)
<MultiAutocomplete counterPosition="label" {...props} />

// Show counter in hint area below input
<MultiAutocomplete counterPosition="hint" {...props} />

// Hide counter entirely
<MultiAutocomplete showCounter={false} {...props} />
```

### Category Badges

```tsx
// Show category badges (default)
<MultiAutocomplete showCategoryBadges {...props} />

// Hide category badges
<MultiAutocomplete showCategoryBadges={false} {...props} />
```

### Custom Max Items

```tsx
// Allow up to 10 items
<MultiAutocomplete maxItems={10} {...props} />
```

---

## Styling

The component uses CSS custom properties for theming:

```css
/* In your theme.css or similar */
:root {
  --color-text: #1a1a1a;
  --color-text-muted: #666;
  --color-surface: #fff;
  --color-border: #e5e7eb;
  --color-accent: #0ea5e9;
  --color-focus: #3b82f6;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-text: #e5e5e5;
    --color-text-muted: #999;
    --color-surface: #1a1a1a;
    --color-border: rgba(255, 255, 255, 0.1);
  }
}
```

---

## Accessibility Features

✅ **ARIA roles**: `combobox`, `listbox`, `option`, `group`
✅ **Live regions**: Counter and hint use `aria-live="polite"`
✅ **Keyboard navigation**: Full keyboard support
✅ **Screen reader labels**: `aria-label` on all interactive elements
✅ **Focus management**: Visual focus outlines, focus returns after selection
✅ **Touch targets**: Minimum 44px height on mobile

---

## Mobile Optimizations

✅ **Blur prevention**: `onPointerDown` and `onMouseDown` prevent input blur
✅ **Touch targets**: 48px minimum height on mobile (≤768px)
✅ **Smooth scrolling**: `-webkit-overflow-scrolling: touch`
✅ **Responsive badges**: Smaller text on mobile (≤420px)

---

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ iOS Safari (iOS 13+)
- ✅ Android Chrome (latest)

---

## Notes

- The component filters out already-selected items from the dropdown
- Custom values can be added by typing and pressing Enter
- Backspace removes the last selected item when input is empty
- Maximum items enforced—input disabled when limit reached
- Dark mode automatically applied via `prefers-color-scheme`
