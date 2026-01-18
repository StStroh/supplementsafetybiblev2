# Auth Flow Quick Reference

## For Developers

### How to Protect a Page

Add these three lines to any page that requires authentication:

```tsx
import { useAuth } from '../state/AuthProvider';
import { useNavigate } from 'react-router-dom';

function MyProtectedPage() {
  const navigate = useNavigate();
  const { session, loading } = useAuth();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !session) {
      navigate('/auth?next=/my-page', { replace: true });
    }
  }, [loading, session, navigate]);

  // Show loading while checking auth
  if (loading) {
    return <div>Loading...</div>;
  }

  // Don't render if not authenticated
  if (!session) {
    return null;
  }

  // Your protected content here
  return <div>Protected content</div>;
}
```

### How to Access User Data

```tsx
import { useAuth } from '../state/AuthProvider';

function MyComponent() {
  const { user, session, plan, loading } = useAuth();

  // user.id - User's unique ID
  // user.email - User's email address
  // session - Full session object
  // plan - User's subscription plan (free, pro, premium)
  // loading - true while checking auth state

  if (loading) return <div>Loading...</div>;
  if (!session) return <div>Not logged in</div>;

  return <div>Welcome {user.email}!</div>;
}
```

### How to Sign Out

```tsx
import { useAuth } from '../state/AuthProvider';

function SignOutButton() {
  const { signOut } = useAuth();

  return (
    <button onClick={signOut}>
      Sign Out
    </button>
  );
}
```

### How to Link to Auth with Return URL

```tsx
// Redirect to auth, then return to current page
<a href={`/auth?next=${encodeURIComponent(window.location.pathname)}`}>
  Sign In
</a>

// Redirect to auth, then go to specific page
<a href="/auth?next=/check">
  Sign In to Check
</a>
```

## For Users

### First Time Sign In

1. Visit any protected page (e.g., `/check`)
2. Get redirected to `/auth`
3. Enter your email address
4. Check your email for magic link
5. Click the magic link
6. Automatically redirected back to the page you wanted
7. Stay signed in - no need to sign in again

### How Long Am I Signed In?

- Sessions last 7 days by default
- Auto-refresh keeps you signed in as long as you're active
- Sign out manually if using a shared device

### What If My Link Expires?

- Magic links expire after 60 minutes
- Request a new link from the auth page
- Use the most recent link sent to your email

### Troubleshooting

**"No session found"**
- Your magic link expired (60 minute limit)
- Request a new link

**"Link already used"**
- You clicked an old link
- Check your email for the most recent link

**"Redirects back to auth"**
- Clear browser cache and cookies
- Try a different browser
- Make sure cookies are enabled

## Technical Notes

### Session Storage

- Stored in localStorage under key: `sb-cyxfxjoadzxhxwxjqkez-auth-token`
- Persists across page refreshes
- Cleared on sign out

### URL Parameters

- `?next=/path` - Where to redirect after successful auth
- Default redirect: `/welcome` if no `next` parameter

### Auth Endpoints

- `/auth` - Magic link sign in page
- `/auth/callback` - Magic link landing page (handles session exchange)
- `/auth/password` - Password sign in (if enabled)

### Security

- HTTPS only in production
- Secure session tokens
- Auto-refresh tokens
- Row Level Security (RLS) on database

## Common Patterns

### Check if User is Pro/Premium

```tsx
const { plan } = useAuth();

if (plan === 'pro' || plan === 'premium') {
  // Show premium features
}
```

### Show Different Content Based on Auth

```tsx
const { session } = useAuth();

return (
  <>
    {session ? (
      <AuthenticatedContent />
    ) : (
      <PublicContent />
    )}
  </>
);
```

### Require Auth for Button Click

```tsx
const { session } = useAuth();
const navigate = useNavigate();

function handleClick() {
  if (!session) {
    navigate('/auth?next=/current-page');
    return;
  }

  // Do authenticated action
}
```

## Best Practices

1. **Always check loading state** before checking session
2. **Use replace: true** for auth redirects to prevent back-button loops
3. **Encode next parameter** when passing URLs
4. **Show loading spinners** while auth state is loading
5. **Don't flash protected content** before auth check completes
