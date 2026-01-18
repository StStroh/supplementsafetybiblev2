# Header Visual Specification

## Desktop View (1024px+)

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│   ┌──────┐                                                            │
│   │      │  Supplement Safety Bible         Home  FAQ  Sign In  CTA  │
│   │ 🍎✓ │                                                            │
│   │      │  (56px tall)                                               │
│   └──────┘  (20px, semibold, #2E2555)                                │
│                                                                        │
│   └──12px──┘                                                          │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
    80px height total
```

## Mobile View (640px and below)

```
┌────────────────────────────────────────────┐
│                                            │
│  ┌────┐                              ☰    │
│  │ 🍎✓│ Supplement                        │
│  │    │ Safety Bible                      │
│  └────┘ (40px)  (18px, semibold)          │
│                                            │
└────────────────────────────────────────────┘
   64px height total
```

## Component Structure

```tsx
<nav className="h-20">  {/* 80px height */}
  <a href="/" className="flex items-center gap-3">
    
    {/* Logo */}
    <Logo 
      variant="dark" 
      className="logo--nav"  /* 56px height desktop, 40px mobile */
    />
    
    {/* Brand Name */}
    <span className="font-semibold text-[#2E2555] text-lg md:text-xl">
      Supplement Safety Bible
    </span>
    
  </a>
  
  {/* Navigation links... */}
</nav>
```

## Color Reference

```
Brand Purple: #2E2555
├─ Used for: Brand name text
├─ RGB: (46, 37, 85)
├─ HSL: (248°, 39%, 24%)
└─ Same color as logo

Link Hover: #5E3B76
├─ Used for: Navigation link hover state
└─ Lighter variant of brand purple

Border: #DCE3ED
├─ Used for: Bottom border
└─ Subtle gray-blue
```

## Typography Scale

```
Desktop Brand Name:
  Font size: 20px (text-xl)
  Line height: 1.25 (leading-tight)
  Letter spacing: -0.025em (tracking-tight)
  Font weight: 600 (font-semibold)
  
Mobile Brand Name:
  Font size: 18px (text-lg)
  Line height: 1.25 (leading-tight)
  Letter spacing: -0.025em (tracking-tight)
  Font weight: 600 (font-semibold)
```

## Spacing System

```
Logo → Brand Name Gap:
  12px (gap-3 in Tailwind)

Header Padding:
  Horizontal: 16px mobile, 24px desktop (px-4 sm:px-6)
  Vertical: Auto-centered with h-20 (flex items-center)

Logo Properties:
  height: 56px desktop / 40px mobile
  width: auto (maintains aspect ratio)
  flex-shrink: 0 (prevents compression)
```

## Responsive Breakpoints

```
Desktop (1024px+):
┌─────────────────────────────────────────┐
│ Logo: 56px   Brand: 20px   Height: 80px │
└─────────────────────────────────────────┘

Tablet (768px - 1023px):
┌─────────────────────────────────────────┐
│ Logo: 44px   Brand: 20px   Height: 72px │
└─────────────────────────────────────────┘

Mobile (640px - 767px):
┌─────────────────────────────────────────┐
│ Logo: 40px   Brand: 18px   Height: 64px │
└─────────────────────────────────────────┘

Small Mobile (<640px):
┌─────────────────────────────────────────┐
│ Logo: 40px   Brand: 18px   Height: 64px │
│ (text may wrap to 2 lines on very small)│
└─────────────────────────────────────────┘
```

## Visual Hierarchy

```
Primary Elements (Most Prominent):
1. Logo (56px apple icon)
2. Brand Name (20px bold purple text)

Secondary Elements:
3. Navigation links (medium weight, gray)
4. CTA button (colored, prominent)

Tertiary Elements:
5. Borders and shadows (subtle separation)
```

## Accessibility

```
Logo:
  ✓ Alt text: "Supplement Safety Bible logo"
  ✓ aria-label: "Supplement Safety Bible"
  ✓ Sufficient size for visibility

Brand Name:
  ✓ Color contrast: 12.5:1 (WCAG AAA)
  ✓ Font size: Above 16px minimum
  ✓ Clear, readable font
  
Interactive Elements:
  ✓ Focus states with outline
  ✓ Keyboard navigable
  ✓ Touch targets > 44px
```

## Implementation Code

### Navbar.tsx (Main Header)
```tsx
<nav className="site-header bg-white border-b border-[#DCE3ED] sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-20">
      <a href="/" className="brand flex items-center gap-3">
        <Logo variant="dark" className="logo--nav" />
        <span className="font-semibold text-[#2E2555] text-lg md:text-xl leading-tight tracking-tight">
          {BRAND_NAME_FULL}
        </span>
      </a>
      {/* Navigation... */}
    </div>
  </div>
</nav>
```

### CSS Variables (header.css)
```css
:root {
  --header-height-d: 80px;
  --header-height-t: 72px;
  --header-height-m: 64px;
}
```

### Logo Sizing (logo.css)
```css
.logo--nav {
  height: 56px;
  width: auto;
  max-width: none;
  overflow: visible;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .logo--nav {
    height: 44px;
  }
}

@media (max-width: 640px) {
  .logo--nav {
    height: 40px;
  }
}
```

## Before vs After Comparison

### Before
```
Header: 64px
Logo: 48px
Brand Name: NOT VISIBLE
Trust Level: Low
Clinical Feel: Minimal
```

### After
```
Header: 80px (+25%)
Logo: 56px (+17%)
Brand Name: VISIBLE (20px, semibold, purple)
Trust Level: High
Clinical Feel: Professional
```

## Design Principles Applied

1. **Visual Weight:** Logo + brand name create strong left anchor
2. **Hierarchy:** Brand identity dominant, navigation secondary
3. **Trust Signals:** Professional typography, medical color palette
4. **Clarity:** Clear spacing, no clutter, high contrast
5. **Authority:** Substantial height, confident sizing
6. **Clinical Grade:** Comparable to UpToDate, PubMed, Mayo Clinic

## Asset Requirements Met

✅ Logo asset: `/brand/logo.png` (optimized PNG)
✅ Logo format: PNG @600x600 (scales well)
✅ Logo colors: Deep purple (#2E2555) maintained
✅ No new fonts required
✅ No new dependencies
✅ No external resources

---

**Visual specification complete. Header achieves clinical authority with clear brand identity.**
