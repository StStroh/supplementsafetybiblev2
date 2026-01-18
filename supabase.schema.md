# Supabase Schema Documentation

## Profiles Table

The `profiles` table manages user subscription data from Stripe webhooks.

### Schema

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique profile identifier |
| `email` | `text` | UNIQUE, NOT NULL | Customer email (from Stripe) |
| `role` | `text` | NOT NULL, DEFAULT 'free', CHECK (role IN ('free', 'pro', 'premium')) | Subscription tier |
| `stripe_customer_id` | `text` | NULL | Stripe customer ID |
| `current_period_end` | `bigint` | NULL | Unix timestamp of subscription end date |
| `updated_at` | `timestamptz` | DEFAULT now() | Last update timestamp |

### Row Level Security (RLS)

RLS is enabled on the `profiles` table.

**Policies:**
- `Users can view own profile by email` - Authenticated users can SELECT their own profile by matching their email from `auth.users`

**Webhook Access:**
- The Stripe webhook uses the Supabase Admin client (service role key) to bypass RLS
- This allows webhooks to insert/update profiles without user authentication

### Indexes

- `idx_profiles_email` - Fast lookups by email
- `idx_profiles_stripe_customer_id` - Fast lookups by Stripe customer ID

### Role Mapping

The webhook maps Stripe Price IDs to roles:

- **Pro Plan**: `VITE_STRIPE_PRICE_PRO` or `VITE_STRIPE_PRICE_PRO_ANNUAL` → `role = 'pro'`
- **Premium Plan**: `VITE_STRIPE_PRICE_PREMIUM` or `VITE_STRIPE_PRICE_PREMIUM_ANNUAL` → `role = 'premium'`
- **Free Plan**: Default or after subscription cancellation → `role = 'free'`

### Webhook Events Handled

1. **customer.subscription.created**
   - Upserts profile with customer email, role, and period end

2. **customer.subscription.updated**
   - Updates profile with new role and period end

3. **customer.subscription.deleted**
   - Sets role to 'free' and clears period end

4. **invoice.payment_succeeded**
   - Updates current_period_end with new billing date

### Usage

**Frontend (Read Access):**
```typescript
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('email', user.email)
  .maybeSingle();
```

**Backend (Admin Access - Webhooks):**
```javascript
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

await supabaseAdmin
  .from('profiles')
  .upsert({
    email: customer.email,
    role: 'pro',
    stripe_customer_id: customer.id,
    current_period_end: subscription.current_period_end,
    updated_at: new Date().toISOString(),
  }, {
    onConflict: 'email',
  });
```

### Security Notes

- Service role key should NEVER be exposed to the frontend
- Only backend functions (webhooks) should use the admin client
- Frontend uses anon key with RLS policies
- Profiles are only readable by the authenticated user who owns the email
