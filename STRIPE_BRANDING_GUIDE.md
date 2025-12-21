# Stripe Branding Configuration Guide

## Overview

This guide ensures **Supplement Safety Bible** branding is consistently visible across all payment surfaces, including Stripe Checkout and success/cancel return pages.

---

## Stripe Dashboard Branding Setup

### Required Action

Configure your Stripe account branding through the Stripe Dashboard (not via code). This ensures your logo and business name appear on all Stripe-hosted checkout pages.

### Steps

1. **Login to Stripe Dashboard**
   - Go to [https://dashboard.stripe.com](https://dashboard.stripe.com)
   - Sign in with your Stripe account

2. **Navigate to Branding Settings**
   - Click **Settings** (gear icon in top right)
   - Select **Branding** from the left sidebar
   - Or go directly to: [https://dashboard.stripe.com/settings/branding](https://dashboard.stripe.com/settings/branding)

3. **Upload Business Logo**
   - **Recommended Size:** 1200 x 300 pixels (minimum: 300 x 75 pixels)
   - **Format:** PNG with transparent background (preferred) or JPG
   - **File Location:** Use `/public/brand/logo.png` from this project
   - Click **Upload logo** and select the file

4. **Set Business Name**
   - **Business Name:** `Supplement Safety Bible`
   - This appears as the merchant name on checkout pages

5. **Configure Brand Colors**
   - **Accent Color:** `#1976D2` (primary brand blue)
   - This color is used for buttons and accents on checkout pages

6. **Save Changes**
   - Click **Save** at the bottom of the page
   - Changes apply immediately to all new checkout sessions

---

## Application Branding (Already Configured)

The following pages now display prominent **Supplement Safety Bible** branding:

### 1. PostCheckout Page (`/post-checkout`)

**Location:** `src/pages/PostCheckout.tsx`

**Features:**
- Logo displayed at top (height: 64px)
- Brand name: "Supplement Safety Bible"
- Shows during payment processing phase
- Visible before redirect to success page

**Visual Structure:**
```
┌─────────────────────────────┐
│   [Logo Image]              │
│   Supplement Safety Bible   │
│                             │
│   [Loading Spinner]         │
│   Processing Payment        │
│   Confirming payment...     │
└─────────────────────────────┘
```

### 2. Success Page (`/success`)

**Location:** `src/pages/Success.tsx`

**Features:**
- Logo displayed at top (height: 64px)
- Brand name: "Supplement Safety Bible"
- Shows after successful payment
- Displays subscription details

**Visual Structure:**
```
┌─────────────────────────────────────┐
│   [Logo Image]                      │
│   Supplement Safety Bible           │
│                                     │
│   [Success Checkmark]               │
│   Welcome to Premium!               │
│   Your subscription has been        │
│   successfully activated.           │
│                                     │
│   [Subscription Details Card]       │
└─────────────────────────────────────┘
```

### 3. Pricing Page with Cancellation Alert (`/pricing?cancelled=1`)

**Location:** `src/pages/Pricing.tsx`

**Features:**
- Cancellation alert banner with logo (height: 32px)
- Brand name: "Supplement Safety Bible"
- Shows when user cancels Stripe checkout
- Dismissible alert with orange warning styling

**Visual Structure:**
```
┌──────────────────────────────────────────┐
│  [Logo] ⚠  Checkout Cancelled       [X]  │
│  Your payment was cancelled. No          │
│  charges were made. When you're ready,   │
│  choose a plan below to continue.        │
│  Supplement Safety Bible                 │
└──────────────────────────────────────────┘
```

---

## Files Modified

### Frontend Components

1. **`src/pages/PostCheckout.tsx`**
   - Added Logo component import
   - Added BRAND_NAME_FULL constant
   - Logo and brand name displayed prominently above spinner

2. **`src/pages/Success.tsx`**
   - Added Logo component import
   - Added BRAND_NAME_FULL constant
   - Logo and brand name displayed at top of success card

3. **`src/pages/Pricing.tsx`**
   - Added Logo component import
   - Added BRAND_NAME_FULL constant
   - Added AlertCircle icon
   - Added cancellation alert banner with logo
   - Detects `cancelled=1` URL parameter
   - Alert is dismissible via close button

### Shared Components (No Changes Needed)

- **`src/components/Logo.tsx`** - Already configured to display logo
- **`src/lib/brand.ts`** - Already contains brand constants:
  ```typescript
  export const BRAND_NAME = "Supplement Safety";
  export const BRAND_NAME_FULL = "Supplement Safety Bible";
  export const BRAND_TAGLINE = "Don't Mix Blind™";
  ```

---

## Logo Assets

### Primary Logo File

**Path:** `/public/brand/logo.png`

**Usage:**
- PostCheckout page (64px height)
- Success page (64px height)
- Pricing cancellation alert (32px height)
- Stripe Dashboard branding upload

### Alternative Formats

- **PNG:** `/public/brand/logo.png` (recommended)
- **SVG:** `/public/brand/logo.svg` (vector format)
- **JPG:** `/public/brand/logo.jpg` (fallback)

---

## Payment Flow with Branding

### Complete User Journey

1. **User selects plan on Pricing page**
   - Clicks "Start Trial" button
   - If authenticated, proceeds to checkout

2. **Stripe Checkout page (Hosted by Stripe)**
   - **Branding Source:** Stripe Dashboard configuration
   - Displays uploaded logo and business name
   - User enters payment information
   - **Cancel URL:** `/pricing?cancelled=1`

3. **If Payment Cancelled:**
   - Redirects to `/pricing?cancelled=1`
   - **Branding:** Logo and brand name in alert banner
   - Message: "Checkout Cancelled"
   - User can retry from pricing page

4. **If Payment Succeeds:**
   - Redirects to `/post-checkout?session_id=...`
   - **Branding:** Logo and brand name at top
   - Shows: "Processing Payment" with spinner
   - Backend confirms payment via webhook

5. **After Confirmation:**
   - Redirects to `/success?session_id=...`
   - **Branding:** Logo and brand name at top
   - Shows: "Welcome to Premium!" with subscription details

---

## Environment Variables

### Required for Stripe Checkout

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PRICE_PRO=price_1SSERBLSpIuKqlsUsWSDz8n6
STRIPE_PRICE_PREMIUM=price_1SSb9jLSpIuKqlsUMRo6AxHg

# Checkout URLs
CHECKOUT_SUCCESS_URL=https://supplementsafetybible.com/post-checkout
CHECKOUT_CANCEL_URL=https://supplementsafetybible.com/pricing?cancelled=1
```

**Note:** Update URLs for your production domain.

---

## Testing Checklist

### Stripe Dashboard Branding

- [ ] Logo uploaded to Stripe Dashboard
- [ ] Business name set to "Supplement Safety Bible"
- [ ] Accent color configured
- [ ] Test checkout shows logo and business name

### Application Pages

- [ ] PostCheckout page displays logo and brand name
- [ ] Success page displays logo and brand name
- [ ] Pricing page shows alert when `cancelled=1` parameter present
- [ ] Cancellation alert includes logo and brand name
- [ ] Cancellation alert is dismissible

### End-to-End Flow

- [ ] Start checkout from pricing page
- [ ] Verify Stripe checkout displays branding
- [ ] Cancel checkout
- [ ] Verify cancellation alert appears with logo
- [ ] Complete checkout
- [ ] Verify PostCheckout page shows logo
- [ ] Verify Success page shows logo

---

## Important Notes

### DO NOT Customize Stripe UI via Code

Stripe Checkout is a hosted solution that cannot be customized via frontend code. All branding must be configured through the Stripe Dashboard.

**Why:**
- Stripe Checkout is PCI-compliant and hosted by Stripe
- Custom HTML/CSS cannot be injected into checkout pages
- Branding settings in Dashboard are the only supported customization method

### Logo Display Guidelines

**Consistent Sizing:**
- Large pages (Success, PostCheckout): 64px height
- Small components (Alerts): 32px height
- Use `h-16` (64px) or `h-8` (32px) Tailwind classes

**Accessibility:**
- Always include `alt` attribute: "Supplement Safety Bible logo"
- Include `aria-label` with brand name

### Color Consistency

**Brand Colors (from theme):**
- Primary: `#1976D2` (blue)
- Success: `#2E7D32` (green)
- Warning/Alert: `#F57C00` (orange)
- Error: `#C62828` (red)

---

## Troubleshooting

### Logo Not Appearing on Stripe Checkout

**Solution:**
1. Verify logo is uploaded in Stripe Dashboard → Settings → Branding
2. Clear browser cache and retry checkout
3. Ensure logo file size is under 5MB
4. Use PNG format with transparent background

### Logo Not Appearing on Application Pages

**Solution:**
1. Verify `/public/brand/logo.png` exists
2. Check browser console for 404 errors
3. Rebuild project: `npm run build`
4. Clear browser cache

### Cancellation Alert Not Showing

**Solution:**
1. Verify `cancelled=1` parameter in URL
2. Check browser console for JavaScript errors
3. Ensure `showCancelledAlert` state is set
4. Verify imports: Logo and BRAND_NAME_FULL

---

## Summary

**Branding is now consistently visible across all payment surfaces:**

✅ **Stripe Checkout:** Configure via Stripe Dashboard (logo + business name)
✅ **PostCheckout Page:** Logo and brand name displayed prominently
✅ **Success Page:** Logo and brand name displayed prominently
✅ **Pricing Cancellation:** Logo and brand name in alert banner

**No code customization of Stripe UI is needed or supported.**
