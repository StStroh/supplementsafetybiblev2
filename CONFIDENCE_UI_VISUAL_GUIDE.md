# Confidence UI Visual Guide

## Quick Visual Reference

This document describes what users will see with the new Confidence UI implementation.

---

## 1. Global Trust Statement (Above Results)

```
┌────────────────────────────────────────────────────────────┐
│ ℹ️  How to interpret results                               │
│                                                            │
│ Interactions shown here are clinically reviewed.          │
│ Each result is based on documented evidence from          │
│ medical literature, pharmacology references, and          │
│ clinical studies.                                          │
│                                                            │
│ If no interaction appears, it means none is currently     │
│ documented — not that the combination is guaranteed       │
│ safe. Medical science is constantly evolving, and not     │
│ all substance combinations have been extensively studied. │
│                                                            │
│ ──────────────────────────────────────────────────────── │
│ Always consult with your healthcare provider before       │
│ making changes to your supplement or medication regimen,  │
│ especially if you have underlying health conditions.      │
└────────────────────────────────────────────────────────────┘
```

**Colors:**
- Light blue background (#E3F2FD)
- Blue border (#64B5F6)
- Dark blue text (#0D47A1)

---

## 2. Confidence Badges on Interaction Cards

### 🟥 Clinically Significant Interaction

```
┌────────────────────────────────────────────────────────────┐
│ [🟥 ⚠️  Clinically Significant Interaction]                │
│                                                            │
│ Vitamin K (supplement) + Warfarin (drug)                  │
│ May reduce effectiveness of blood thinner                 │
│                                                            │
│ [Click to expand ▼]                                       │
└────────────────────────────────────────────────────────────┘
```

**Colors:**
- Red badge background (#FFEBEE)
- Red border (#EF5350)
- Dark red text (#C62828)

---

### 🟧 Use With Caution

```
┌────────────────────────────────────────────────────────────┐
│ [🟧 ⚠️  Use With Caution]                                  │
│                                                            │
│ St. John's Wort (supplement) + Birth Control (drug)       │
│ May reduce contraceptive effectiveness                    │
│                                                            │
│ [Click to expand ▼]                                       │
└────────────────────────────────────────────────────────────┘
```

**Colors:**
- Orange badge background (#FFF3E0)
- Orange border (#FFA726)
- Dark orange text (#E65100)

---

### 🟦 Monitor / Timing Adjustment

```
┌────────────────────────────────────────────────────────────┐
│ [🟦 ℹ️  Monitor / Timing Adjustment]                       │
│                                                            │
│ Calcium (supplement) + Levothyroxine (drug)               │
│ Separate doses by at least 4 hours                       │
│                                                            │
│ [Click to expand ▼]                                       │
└────────────────────────────────────────────────────────────┘
```

**Colors:**
- Blue badge background (#E3F2FD)
- Blue border (#64B5F6)
- Dark blue text (#1565C0)

---

### 🟩 No Known Interaction

```
┌────────────────────────────────────────────────────────────┐
│ [🟩 ✓  No Known Interaction]                               │
│                                                            │
│ No interaction has been documented in medical sources     │
│ at this time.                                             │
│                                                            │
│ What this means:                                          │
│ • All substances checked against our database             │
│ • No documented interactions found in medical literature  │
│ • This does not guarantee complete safety — always        │
│   consult your healthcare provider                        │
└────────────────────────────────────────────────────────────┘
```

**Colors:**
- Green badge background (#E8F5E9)
- Green border (#66BB6A)
- Dark green text (#2E7D32)

---

### ⚪ Not Yet Reviewed

```
┌────────────────────────────────────────────────────────────┐
│ [⚪ ❓ Not Yet Reviewed]                                    │
│                                                            │
│ This combination has not yet been clinically reviewed.    │
│ Absence of data does not mean absence of risk.           │
└────────────────────────────────────────────────────────────┘
```

**Colors:**
- Gray badge background (#F5F5F5)
- Gray border (#BDBDBD)
- Dark gray text (#616161)

---

## 3. Expanded Interaction Details

When user clicks to expand an interaction:

```
┌────────────────────────────────────────────────────────────┐
│ [🟥 ⚠️  Clinically Significant Interaction]                │
│                                                            │
│ Vitamin K (supplement) + Warfarin (drug)                  │
│ May reduce effectiveness of blood thinner                 │
│                                                            │
│ [Click to collapse ▲]                                     │
│                                                            │
│ ──────────────────────────────────────────────────────── │
│                                                            │
│ Mechanism:                                                 │
│ Vitamin K promotes blood clotting, which directly         │
│ counteracts warfarin's anticoagulant effect.             │
│                                                            │
│ Clinical Effect:                                          │
│ May significantly reduce INR values and decrease          │
│ anticoagulant protection, increasing risk of clotting.   │
│                                                            │
│ Management:                                               │
│ Maintain consistent vitamin K intake. Do not start or    │
│ stop supplements without medical supervision. Monitor     │
│ INR levels regularly.                                     │
│                                                            │
│ Citations:                                                │
│ • PubMed: Interaction between warfarin and vitamin K     │
│ • DrugBank: Warfarin interaction profile                 │
│                                                            │
│ ──────────────────────────────────────────────────────── │
│                                                            │
│ [Why this result? ▼] (collapsed by default)              │
└────────────────────────────────────────────────────────────┘
```

---

## 4. Confidence Metadata (Collapsible)

When user clicks "Why this result?":

```
┌────────────────────────────────────────────────────────────┐
│ [Why this result? ▲] (now expanded)                       │
│                                                            │
│   🏆 Evidence Grade: High                                 │
│      Multiple clinical studies or established             │
│      pharmacological mechanisms                           │
│                                                            │
│   📄 Source Type: Clinical study                          │
│      Randomized controlled trials or observational        │
│      studies                                              │
│                                                            │
│   📅 Status: Recently reviewed                            │
│      This interaction profile is regularly updated        │
│      based on new research                                │
│                                                            │
│   ──────────────────────────────────────────────────────│
│   Confidence Level: High — This reflects the consistency  │
│   and quality of available evidence supporting this       │
│   interaction profile.                                    │
└────────────────────────────────────────────────────────────┘
```

---

## 5. Complete User Flow Example

### Step 1: User adds items and runs check
```
Supplements: [✓ Vitamin K]
Medications: [✓ Warfarin]

[Run Check] ← Button enabled
```

### Step 2: Results appear with trust statement
```
┌─ Trust Statement ─┐
│ How to interpret  │
│ results...        │
└───────────────────┘

✓ Check Complete
Found 1 interaction
```

### Step 3: User sees confidence badge immediately
```
┌─────────────────────────────┐
│ 🟥 Clinically Significant   │
│    Interaction              │
│                             │
│ Vitamin K + Warfarin        │
│ May reduce effectiveness... │
└─────────────────────────────┘
```

### Step 4: User expands for details
```
▼ Expanded view shows:
  - Mechanism
  - Clinical Effect
  - Management
  - Citations
  - [Why this result?] button
```

### Step 5: User clicks "Why this result?"
```
▼ Shows evidence metadata:
  - Evidence Grade: High
  - Source Type: Clinical study
  - Status: Recently reviewed
  - Confidence Level explanation
```

---

## 6. Mobile View Adaptations

On mobile (< 768px):
- Trust statement remains full-width
- Badges scale to fit screen
- Text remains readable
- Collapsible sections work with touch
- No horizontal scrolling

---

## 7. Color Palette Summary

| Level | Background | Border | Text | Emoji |
|-------|-----------|--------|------|-------|
| **Avoid** | #FFEBEE | #EF5350 | #C62828 | 🟥 |
| **Caution** | #FFF3E0 | #FFA726 | #E65100 | 🟧 |
| **Monitor** | #E3F2FD | #64B5F6 | #1565C0 | 🟦 |
| **None** | #E8F5E9 | #66BB6A | #2E7D32 | 🟩 |
| **Not Reviewed** | #F5F5F5 | #BDBDBD | #616161 | ⚪ |

---

## 8. Before vs After Comparison

### Before (Old UI)
```
Found 1 interaction

Avoid
Vitamin K + Warfarin
May reduce effectiveness of blood thinner

Evidence Grade: High
Confidence: High
```

### After (New Confidence UI)
```
📘 How to interpret results
Interactions shown here are clinically reviewed...

Found 1 interaction

┌─────────────────────────────────────┐
│ 🟥 ⚠️  Clinically Significant       │
│    Interaction                      │
│                                     │
│ This interaction is documented in   │
│ clinical literature and may cause   │
│ harm if combined.                   │
│                                     │
│ Vitamin K + Warfarin                │
│ May reduce effectiveness...         │
│                                     │
│ [Why this result? ▼]               │
└─────────────────────────────────────┘
```

**Key Improvements:**
- ✅ Instant visual recognition (emoji + color)
- ✅ Plain language explanation
- ✅ Context from trust statement
- ✅ Confidence details available but not overwhelming

---

## Testing the Implementation

**Dev Server**: http://localhost:5173/

### Test Scenario 1: Serious Interaction
1. Navigate to checker
2. Add "Vitamin K" (supplement)
3. Add "Warfarin" (medication)
4. Click "Run Check"
5. **Verify**: See 🟥 badge with clear explanation
6. Expand details
7. **Verify**: See confidence metadata

### Test Scenario 2: No Interactions
1. Add "Vitamin C" (supplement)
2. Add "Fish Oil" (supplement)
3. Run check
4. **Verify**: See 🟩 badge with "What this means" section

### Test Scenario 3: Trust Statement
1. Run any check
2. **Verify**: Blue info box appears above results
3. **Verify**: Text is readable on mobile

---

## Summary

The new Confidence UI provides:
- **Instant recognition** through color-coded badges
- **Clear explanations** in plain language
- **Trust building** through evidence metadata
- **Proper expectations** via global trust statement
- **Professional appearance** for medical-grade feel

All changes are live and testable at http://localhost:5173/
