# Interaction Checker Visual Guide

## Component Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                     INTERACTION CHECKER                         │
│                                                                 │
│  ┌────────────────────────┐    ┌────────────────────────┐     │
│  │ [Supplement] ←clickable│    │ [Medication] ←clickable│     │
│  │                        │    │                        │     │
│  │  ┌──────────────────┐ │    │  ┌──────────────────┐ │     │
│  │  │ e.g., St. John's │ │    │  │ e.g., Sertraline │ │     │
│  │  └──────────────────┘ │    │  └──────────────────┘ │     │
│  │         ▼              │    │         ▼              │     │
│  │  ┌──────────────────┐ │    │  ┌──────────────────┐ │     │
│  │  │ Magnesium        │ │    │  │ Metformin        │ │     │
│  │  │ Omega-3          │ │    │  │ Atorvastatin     │ │     │
│  │  │ Vitamin D        │ │    │  │ Warfarin         │ │     │
│  │  │ St. John's Wort  │ │    │  │ Sertraline       │ │     │
│  │  └──────────────────┘ │    │  └──────────────────┘ │     │
│  └────────────────────────┘    └────────────────────────┘     │
│                                                                 │
│              [Check Interactions] [View Plans →]                │
└─────────────────────────────────────────────────────────────────┘
```

## User Interactions

### 1. Label Click
```
User clicks "Supplement"
         ↓
Input receives focus
         ↓
Cursor appears in field
         ↓
User can start typing
```

### 2. Chip Click
```
User clicks "Magnesium" chip
         ↓
Input value = "Magnesium"
         ↓
Input receives focus
         ↓
Autocomplete searches (debounced 250ms)
         ↓
Results appear (if any)
```

### 3. Autocomplete Flow
```
User types "Mag" in supplement field
         ↓
Wait 250ms (debounce)
         ↓
API call: /.netlify/functions/autocomplete?q=Mag
         ↓
Filter results by type=supplement
         ↓
Display dropdown with suggestions
         ↓
User clicks "Magnesium Citrate"
         ↓
Input value = "Magnesium Citrate"
         ↓
Dropdown closes
         ↓
Focus moves to medication field
```

## Visual States

### Default State
```
┌──────────────────────┐
│ Supplement           │  ← Bold, black text
└──────────────────────┘
┌─────────────────────────────────┐
│ e.g., St. John's Wort           │  ← Gray placeholder
└─────────────────────────────────┘
```

### Hover State (Label)
```
┌──────────────────────┐
│ Supplement           │  ← Blue text (#0066CC)
└──────────────────────┘
         ↕
    cursor: pointer
```

### Focus State (Input)
```
┌─────────────────────────────────┐
│ Mag|                            │  ← Blue border, focus ring
└─────────────────────────────────┘
         ▼
  ┌─────────────────────────────┐
  │ Magnesium                   │
  │ Magnesium Citrate          │
  │ Magnesium Glycinate        │
  └─────────────────────────────┘
```

### Chip States

#### Default
```
┌─────────────┐
│ Magnesium   │  ← Light blue bg, blue text
└─────────────┘
```

#### Hover
```
┌─────────────┐
│ Magnesium   │  ← Dark blue bg, white text
└─────────────┘
```

#### Active (Click)
```
┌───────────┐
│Magnesium  │  ← Slightly scaled down (0.96)
└───────────┘
```

## Color Palette

### Supplement Colors
- **Background:** `#E3F2FD` (light blue)
- **Text:** `#0066CC` (medium blue)
- **Hover:** `#0066CC` bg, white text
- **Border:** `#0066CC` with 20% opacity

### Medication Colors
- **Background:** `#E8F5E9` (light green)
- **Text:** `#2E7D32` (medium green)
- **Hover:** `#2E7D32` bg, white text
- **Border:** `#2E7D32` with 20% opacity

### Input Colors
- **Background:** `#F8FBFF` (very light blue)
- **Border Default:** `#DCE3ED` (light gray)
- **Border Focus:** `#0066CC` (blue)
- **Focus Ring:** `#0066CC` with 15% opacity

## Spacing & Sizing

### Desktop
```
Label:  font-size: 16px, font-weight: 700
Input:  height: ~52px (py-4), font-size: 16px
Chips:  height: ~36px (py-1.5), font-size: 14px
Gap:    12px between chips
```

### Mobile
```
Label:  font-size: 16px, font-weight: 700
Input:  height: ~52px, font-size: 16px (prevents zoom)
Chips:  min-height: 44px (touch target), font-size: 14px
Gap:    8px between chips
```

## Accessibility Indicators

### Keyboard Focus
```
┌─────────────────────────────────┐
│ Supplement                      │
│ ┌─────────────────────────────┐ │
│ │ 2px blue outline            │ │  ← Visible focus ring
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

### Screen Reader Announcements
```
Label clicked:
  → "Supplement, button, controls suppInput"

Input focused:
  → "Supplement, combobox, edit text"

Dropdown appears:
  → "Autocomplete list expanded, 5 suggestions available"

Item selected:
  → "Magnesium Citrate selected"
```

## Responsive Behavior

### Desktop (1024px+)
```
┌────────────────────┬────────────────────┐
│   Supplement       │   Medication       │
│   [Input]          │   [Input]          │
│   [Chips x4]       │   [Chips x4]       │
└────────────────────┴────────────────────┘
```

### Tablet (768px - 1023px)
```
┌────────────────────┬────────────────────┐
│   Supplement       │   Medication       │
│   [Input]          │   [Input]          │
│   [Chips 2x2]      │   [Chips 2x2]      │
└────────────────────┴────────────────────┘
```

### Mobile (< 768px)
```
┌──────────────────────────────────┐
│   Supplement                     │
│   [Input]                        │
│   [Chips in 2 rows]              │
├──────────────────────────────────┤
│   Medication                     │
│   [Input]                        │
│   [Chips in 2 rows]              │
└──────────────────────────────────┘
```

## Animation Timing

```
Label hover:         200ms ease
Input focus ring:    150ms ease
Chip hover:          150ms ease
Chip active scale:   100ms ease-out
Dropdown appear:     0ms (instant)
Dropdown disappear:  0ms (instant)
```

## Touch Interactions (Mobile)

### Tap Targets
```
Label:     min 44px height ✓
Input:     52px height ✓
Chips:     min 44px height ✓
Dropdown:  48px per item ✓
```

### Gestures
- **Tap:** Select item
- **Swipe:** Scroll dropdown (if needed)
- **Tap outside:** Close dropdown

## Error Prevention

### Prevented Issues
```
✓ Double-tap zoom disabled (font-size: 16px)
✓ Click stealing prevented (pointer-events CSS)
✓ Blur-on-click prevented (onPointerDown/onMouseDown)
✓ Dropdown overflow clipping prevented (z-index: 9999)
✓ Touch delay removed (touch-action: manipulation)
```

## Performance Optimization

### Debouncing
```
User types: "M" "a" "g" "n" "e"
         ↓
Debounce timer: 250ms
         ↓
Only 1 API call made (after "Magne")
         ↓
Saves 4 unnecessary requests
```

### Event Cleanup
```
Component mounts
    ↓
Add event listeners
    ↓
Component unmounts
    ↓
Remove event listeners ✓
    ↓
No memory leaks
```

---

**Visual guide complete. Interaction Checker provides intuitive, accessible, and performant user experience.**
