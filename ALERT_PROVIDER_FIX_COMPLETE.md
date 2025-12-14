# Alert Provider Fix - Complete

## Problem Solved

Fixed the crash: **"useAlert must be used within AlertProvider"** that occurred when any component tried to show alerts.

## Root Cause

The app had two routing systems that were in conflict:

1. **Old system** (`App.tsx`): Used manual path checking and wrapped content with `AlertProvider`
2. **New system** (`routes.tsx` + `main.tsx`): Used React Router v6 with `createBrowserRouter`

The problem:
- `AlertProvider` was mounted in `App.tsx`
- But `App.tsx` was NOT part of the route tree in `routes.tsx`
- All pages were rendered directly through `RouterProvider` in `main.tsx`
- Result: No `AlertProvider` in the component tree → crash when calling `useAlert()`

## Solution Implemented

### 1. Made `useAlert()` Resilient (`src/state/AlertProvider.tsx`)

Changed from throwing an error to returning no-op functions:

```typescript
export function useAlert(): AlertContextType {
  const context = useContext(AlertContext);
  if (context) return context;

  // Graceful fallback prevents crash
  return {
    alert: null,
    showAlert: () => {},
    clearAlert: () => {},
  };
}
```

**Benefits:**
- Never crashes even if provider is missing
- Safe to call from any component
- Degrades gracefully (alerts just won't show)

### 2. Mounted Provider at App Root (`src/main.tsx`)

Wrapped the entire app with `AlertProvider`:

```typescript
<StrictMode>
  <HelmetProvider>
    <AlertProvider>        {/* ← Added here */}
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </AlertProvider>
  </HelmetProvider>
</StrictMode>
```

**Provider hierarchy:**
1. StrictMode (React dev mode checks)
2. HelmetProvider (SEO metadata)
3. **AlertProvider** (global alerts)
4. AuthProvider (authentication state)
5. RouterProvider (page routing)

### 3. Created Root Layout (`src/layouts/RootLayout.tsx`)

Created a layout component that:
- Wraps all routes
- Renders the alert banner at the top
- Shows EnvWarning
- Uses React Router's `<Outlet />` for page content

```typescript
export default function RootLayout() {
  const { alert, clearAlert } = useAlert();

  return (
    <div className="min-h-screen flex flex-col">
      {alert && (
        <AlertBanner
          type={alert.type}
          message={alert.message}
          onClose={clearAlert}
        />
      )}

      <div className="flex-1">
        <EnvWarning />
        <Outlet />  {/* Page content renders here */}
      </div>
    </div>
  );
}
```

### 4. Updated Routes (`src/routes.tsx`)

Converted flat route structure to nested structure with `RootLayout` as parent:

**Before:**
```typescript
export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/search', element: <Search /> },
  // ... 30+ flat routes
]);
```

**After:**
```typescript
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,  // Parent layout
    children: [
      { index: true, element: <Home /> },
      { path: 'search', element: <Search /> },
      // ... all routes as children
    ]
  }
]);
```

**Benefits:**
- Single alert banner for all pages
- Single EnvWarning for all pages
- Consistent layout structure
- No duplicate provider mounts

## Files Modified

1. **src/state/AlertProvider.tsx**
   - Made `useAlert()` resilient (no crash if provider missing)
   - Returns no-op functions as fallback

2. **src/main.tsx**
   - Added `AlertProvider` wrapper around entire app
   - Placed between `HelmetProvider` and `AuthProvider`

3. **src/layouts/RootLayout.tsx** (new file)
   - Renders global alert banner
   - Shows EnvWarning
   - Provides `<Outlet />` for page content

4. **src/routes.tsx**
   - Converted to nested route structure
   - Made `RootLayout` the parent of all routes
   - Changed child paths from absolute (`/search`) to relative (`search`)

## No Regressions

- All existing pages still work
- App.tsx is now unused but left in place (can be deleted later)
- AlertBanner component unchanged
- Alert styling and behavior unchanged
- Auto-dismiss timer still works
- Build passes all checks

## How to Use Alerts

From any component:

```typescript
import { useAlert } from '../state/AlertProvider';

function MyComponent() {
  const { showAlert } = useAlert();

  const handleError = () => {
    showAlert('Something went wrong!', 'error');
  };

  const handleSuccess = () => {
    showAlert('Saved successfully!', 'success');
  };

  return <button onClick={handleSuccess}>Save</button>;
}
```

**Alert Types:**
- `error` - Red background
- `success` - Green background
- `warning` - Amber background
- `info` - Blue background

## Testing Checklist

- [x] App starts without crashes
- [x] No "useAlert must be used within AlertProvider" error
- [x] useAlert() works from any page
- [x] Alert banner shows at top of page
- [x] Alert dismisses when clicking X
- [x] Alert auto-dismisses after 6 seconds
- [x] EnvWarning shows on all pages
- [x] All routes still work
- [x] Build succeeds
- [x] TypeScript compiles without errors

## Architecture Benefits

### Before (Problematic)
```
main.tsx
  └─ RouterProvider
       └─ routes.tsx (30+ flat routes)
            └─ Pages (no AlertProvider!)

App.tsx (unused)
  └─ AlertProvider (orphaned)
```

### After (Fixed)
```
main.tsx
  └─ AlertProvider (global)
       └─ RouterProvider
            └─ RootLayout (renders banner)
                 └─ Pages (all have access to alerts)
```

## Future Improvements

If needed:
- Add toast notifications (non-blocking alerts)
- Add alert queue (show multiple alerts)
- Add alert history (see past alerts)
- Add different positions (top-left, bottom-right, etc.)
- Add custom animations
- Add sound/vibration for important alerts
