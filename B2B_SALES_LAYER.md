# B2B Sales Intent Layer

A lightweight behavioral intelligence system for Certified Nutra Labs that runs on top of the existing Supplement Safety Bible checker without disrupting the core user experience.

## What It Does

Silently tracks user behavior (checker runs, pricing page views, search patterns) and uses an agent to detect purchase intent. When intent is PRE_PURCHASE or PURCHASE_READY, shows a non-intrusive CTA box offering fast quotes.

## System Components

### 1. Database (`lead_signals` table)
**Migration**: `20260104000000_create_lead_signals_table.sql`

Columns:
- `id`, `session_id`, `created_at`
- `intent_level` (RESEARCH, VALIDATION, PRE_PURCHASE, PURCHASE_READY)
- `confidence` (0-100), `urgency` (low/medium/high)
- `product_type`, `buyer_type`, `offer`, `cta`, `sales_message`
- `lead_score` (0-100), `follow_up` (wait/email/call)
- `raw_payload` (jsonb - original event data)

### 2. Sales Intent Agent
**File**: `netlify/functions/_lib/salesIntentAgent.cjs`

6-step analysis pipeline:
1. **Intent Detection** - Classifies behavior into intent levels
2. **Customer Need Inference** - Identifies product type, format, buyer profile
3. **Offer Matching** - Recommends appropriate Certified Nutra Labs service
4. **Sales Action Decision** - Determines priority and CTA text
5. **Message Generation** - Creates human sales message
6. **Internal Signal** - Calculates lead score and follow-up timing

### 3. API Endpoint
**File**: `netlify/functions/behavior-intent.cjs`
**URL**: `/.netlify/functions/behavior-intent`

- Receives POST with behavior payload
- Runs agent analysis
- Stores result in database
- Returns intent analysis to frontend

### 4. Frontend Tracking
**File**: `src/lib/salesIntent.ts`

Functions:
- `trackBehavior(payload)` - Send event to API
- `getSalesIntent()` - Get current intent from session
- `clearSalesIntent()` - Clear after dismissal
- `resetPageTimer()` - Reset page timing

Auto-tracks:
- Session ID (generated once per session)
- Repeat events (counts per event type)
- Time on page
- Compliance keywords (NSF, GMP, Amazon, FDA, etc.)

### 5. UI Component
**File**: `src/components/SalesCTA.tsx`

- Fixed bottom-right position
- Only visible for PRE_PURCHASE or PURCHASE_READY
- Dismissible with X button
- Two action buttons: "Request Quote" and "Talk to sales"
- Shows quote turnaround time

### 6. Integration Points

**Checker** (`src/components/StackBuilderCheckerV3.tsx`):
- Tracks every "Run Check" action
- Sends substance names to intent API

**Pricing Page** (`src/pages/Pricing.tsx`):
- Tracks page view on load
- Resets page timer

**Root Layout** (`src/layouts/RootLayout.tsx`):
- Renders `<SalesCTA />` globally

## Intent Escalation Rules

| Trigger | Intent Level | Confidence | Urgency |
|---------|-------------|------------|---------|
| Compliance keywords (GMP, NSF, Amazon) | PURCHASE_READY | 85% | high |
| Format + dosage terms | PRE_PURCHASE | 70% | medium |
| Checker usage | VALIDATION | 50% | low |
| Pricing page view | PRE_PURCHASE | 60% | medium |
| Repeat visit (2+) | +1 level | +15% | +1 level |

## Product Type Detection

Infers product type from search terms:
- Protein/Whey → `protein_powder` (powder format)
- Multivitamin/Vitamin → `multivitamin` (capsule format)
- Omega/Fish oil → `softgel` (softgel format)
- Gummy/Gummies → `gummy` (gummy format)
- Default → `supplement` (capsule format)

## Sales Messages

### PRE_PURCHASE
```
Looking for a {format} manufacturer? We can help with
formulation, production, and compliance. Quick quotes available.
```

### PURCHASE_READY
```
We manufacture {product_type} with {certification}.
Quote ready in {time_to_quote}.
```

## Lead Scoring

Base scores:
- PURCHASE_READY: 85
- PRE_PURCHASE: 60
- VALIDATION: 40
- RESEARCH: 20

Modifiers:
- +10 per repeat visit
- Capped at 100

## Follow-up Recommendations

| Intent Level | Follow-up | Timing |
|--------------|-----------|---------|
| PURCHASE_READY | call | immediate |
| PRE_PURCHASE | email | 24 hours |
| VALIDATION | email | 3 days |
| RESEARCH | wait | 7 days |

## Data Flow

```
User Action
    ↓
trackBehavior()
    ↓
/.netlify/functions/behavior-intent
    ↓
Sales Intent Agent
    ↓
Database (lead_signals table)
    ↓
sessionStorage (if PRE_PURCHASE or PURCHASE_READY)
    ↓
<SalesCTA /> component shows UI
```

## Contact Configuration

Both CTA buttons link to: `sales@certifiednutralabs.com`
- "Request Quote" → subject: "Quote Request"
- "Talk to sales" → subject: "Sales Inquiry"

## Session Management

- Session ID: Generated once per browser session
- Stored in: `sessionStorage.sales_session_id`
- Format: `sess_{timestamp}_{random}`
- Repeat counts: Tracked per `{event_type}_{page_path}`
- Intent data: Stored in `sessionStorage.sales_intent`

## Admin Queries

### High-priority leads (last 24h)
```sql
SELECT
  session_id,
  intent_level,
  lead_score,
  product_type,
  sales_message,
  created_at
FROM lead_signals
WHERE intent_level IN ('PRE_PURCHASE', 'PURCHASE_READY')
  AND lead_score >= 70
  AND created_at > now() - interval '24 hours'
ORDER BY lead_score DESC, created_at DESC;
```

### Top opportunities by product
```sql
SELECT
  product_type,
  COUNT(*) as lead_count,
  AVG(lead_score) as avg_score,
  MAX(created_at) as latest_signal
FROM lead_signals
WHERE intent_level IN ('PRE_PURCHASE', 'PURCHASE_READY')
  AND created_at > now() - interval '7 days'
GROUP BY product_type
ORDER BY lead_count DESC;
```

### Session journey
```sql
SELECT
  created_at,
  intent_level,
  confidence,
  lead_score,
  raw_payload->>'event_type' as event,
  raw_payload->>'page_path' as page
FROM lead_signals
WHERE session_id = 'sess_xxx'
ORDER BY created_at;
```

## Testing

### Test PRE_PURCHASE trigger
1. Visit `/pricing`
2. Wait 3 seconds
3. Visit `/pricing` again (2nd visit triggers escalation)
4. Check for sales CTA in bottom-right

### Test PURCHASE_READY trigger
1. Go to checker
2. Add supplements: "Fish Oil", "GMP Certified Vitamin D"
3. Run check
4. Sales CTA should appear immediately (GMP keyword detected)

### Test dismissal
1. Trigger any sales CTA
2. Click X button
3. CTA disappears and doesn't return until new qualifying event

## Privacy & Performance

- No cookies used (sessionStorage only)
- No PII collected
- Tracking fails silently (non-blocking)
- Database writes are async
- API calls timeout after 10s
- Zero impact on core checker functionality

## Future Enhancements

Not implemented, but easy to add:
- Admin dashboard for lead management
- Email notifications for high-score leads
- A/B testing different messages
- CRM integration (Salesforce, HubSpot)
- SMS follow-up for urgent leads
- Multi-language support
