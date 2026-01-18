/**
 * Sales Intent Tracking for B2B Conversions
 */

interface BehaviorPayload {
  session_id: string;
  event_type: 'checker_run' | 'search' | 'page_view';
  search_terms?: string[];
  checker_items?: string[];
  page_path?: string;
  repeat_count?: number;
  time_on_page_seconds?: number;
  format_interest?: string[];
  compliance_keywords?: string[];
}

interface IntentResponse {
  intent: {
    level: string;
    confidence: number;
    urgency: string;
  };
  customer_need: {
    product_type: string;
    format: string;
    buyer_type: string;
    constraints: string[];
  };
  offer: {
    recommended: string;
    time_to_quote: string;
    next_step: string;
  };
  sales_action: {
    priority: string;
    cta: string;
  };
  sales_message: string;
  internal_signal: {
    lead_score: number;
    follow_up: string;
    timing: string;
  };
}

function getSessionId(): string {
  let sessionId = localStorage.getItem('ssb_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('ssb_session_id', sessionId);
  }
  return sessionId;
}

function getRepeatCount(eventKey: string): number {
  const key = `repeat_${eventKey}`;
  const count = parseInt(sessionStorage.getItem(key) || '0', 10);
  sessionStorage.setItem(key, String(count + 1));
  return count + 1;
}

let pageStartTime = Date.now();

export function resetPageTimer() {
  pageStartTime = Date.now();
}

function getTimeOnPage(): number {
  return Math.floor((Date.now() - pageStartTime) / 1000);
}

function extractComplianceKeywords(terms: string[]): string[] {
  const keywords: string[] = [];
  const patterns = ['nsf', 'gmp', 'amazon', 'fda', 'certified', 'organic', 'usda'];

  terms.forEach(term => {
    const lower = term.toLowerCase();
    patterns.forEach(pattern => {
      if (lower.includes(pattern) && !keywords.includes(pattern)) {
        keywords.push(pattern);
      }
    });
  });

  return keywords;
}

export async function trackBehavior(payload: Partial<BehaviorPayload>): Promise<IntentResponse | null> {
  try {
    const session_id = getSessionId();
    const eventKey = `${payload.event_type}_${payload.page_path || 'general'}`;
    const repeat_count = getRepeatCount(eventKey);

    const fullPayload: BehaviorPayload = {
      session_id,
      event_type: payload.event_type || 'page_view',
      search_terms: payload.search_terms || [],
      checker_items: payload.checker_items || [],
      page_path: payload.page_path || window.location.pathname,
      repeat_count,
      time_on_page_seconds: getTimeOnPage(),
      format_interest: payload.format_interest || [],
      compliance_keywords: extractComplianceKeywords([
        ...(payload.search_terms || []),
        ...(payload.checker_items || [])
      ])
    };

    const response = await fetch('/.netlify/functions/behavior-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullPayload)
    });

    if (!response.ok) {
      console.warn('Intent tracking failed:', response.status);
      return null;
    }

    const data = await response.json();

    // Store if PRE_PURCHASE or PURCHASE_READY
    if (data.intent?.level === 'PRE_PURCHASE' || data.intent?.level === 'PURCHASE_READY') {
      sessionStorage.setItem('sales_intent', JSON.stringify(data));
    }

    return data;
  } catch (error) {
    console.warn('Intent tracking error:', error);
    return null;
  }
}

export function getSalesIntent(): IntentResponse | null {
  try {
    const stored = sessionStorage.getItem('sales_intent');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function clearSalesIntent(): void {
  sessionStorage.removeItem('sales_intent');
}
