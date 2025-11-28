# Premium Entitlement — Ops Checklist

## Environment Variables (Netlify)
- STRIPE_SECRET_KEY = sk_live_...
- STRIPE_WEBHOOK_SECRET = whsec_...
- SUPABASE_URL = https://xxxx.supabase.co
- SUPABASE_SERVICE_ROLE = service-role-key
- VITE_SUPABASE_URL = https://xxxx.supabase.co
- VITE_SUPABASE_ANON_KEY = anon-key
- PORTAL_RETURN_URL (optional)

## Stripe Webhook
Endpoint: https://YOUR_DOMAIN/.netlify/functions/stripe-webhook
Events:
- checkout.session.completed
- invoice.payment_succeeded
- customer.subscription.updated
- customer.subscription.deleted
- invoice.payment_failed

## Supabase SQL
Paste schema.sql into Supabase SQL editor and run once.

## QA
- /premium redirects to /pricing when user has no entitlement.
- Successful checkout sets entitlement → access granted.
- Cancel in Stripe → webhook updates entitlement → /premium blocked.
