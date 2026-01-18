# Navbar "Sign Up" Routing Fix

## Problem
Clicking "Sign Up" in the navigation sent users to the Sign In page (`/auth`), which showed "Sign in to your account" messaging. This was incorrect UX - "Sign Up" should direct users to view pricing tiers.

## Solution
Updated both desktop and mobile "Sign Up" buttons in the Navbar to route to `/pricing` instead of `/auth`.

## Files Changed

### `src/components/Navbar.tsx`

**Change 1: Desktop "Sign Up" button (Line 88)**
```diff
  {/* Primary CTA (replaces Try free dropdown) */}
  {!isLoggedIn && (
-   <a href="/auth" className="btn-cta">
+   <a href="/pricing" className="btn-cta">
      Sign Up
    </a>
  )}
```

**Change 2: Mobile "Sign Up" button (Line 155)**
```diff
  {/* Mobile primary CTA */}
  <a
-   href="/auth"
+   href="/pricing"
    className="btn-cta text-center"
    onClick={() => setMobileMenuOpen(false)}
  >
    Sign Up
  </a>
```

## What Was NOT Changed
- **"Sign in" link** - Still routes to `/auth` (correct behavior)
- Desktop "Sign in" link (line 77)
- Mobile "Sign in" link (line 145)

## Manual Test Steps

### Test 1: Desktop Navigation
1. Open the app in a browser (logged out state)
2. Locate the "Sign Up" button in the top-right corner of the navbar
3. Click "Sign Up"
4. **Expected**: You are taken to `/pricing` page showing pricing tiers
5. **Verify**: Page title and URL show "Pricing" and you see plan cards (Pro, Premium, etc.)

### Test 2: Mobile Navigation
1. Open the app in a browser and resize to mobile width (< 768px) OR open on mobile device
2. Click the hamburger menu icon (≡) in the top-right
3. Scroll down in the mobile menu and click the "Sign Up" button
4. **Expected**: You are taken to `/pricing` page showing pricing tiers
5. **Verify**: Mobile menu closes and pricing page loads with plan cards

### Test 3: Sign In Still Works
1. While logged out, click "Sign in" in the navbar (NOT "Sign Up")
2. **Expected**: You are taken to `/auth` page showing "Sign in to your account"
3. **Verify**: Desktop "Sign in" link (line 77) and mobile "Sign in" link (line 145) both work correctly

## Build Status
✅ Build completed successfully with no errors

## User Flow Improvement
**Before:**
- User clicks "Sign Up" → Sent to auth page → Confusing messaging
- User doesn't see pricing before committing to sign up

**After:**
- User clicks "Sign Up" → Sent to pricing page → Sees all plan options
- User can review pricing, then click plan-specific CTAs to sign up
- Clear separation: "Sign in" = existing users, "Sign Up" = new users exploring options
