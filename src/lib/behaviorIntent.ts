export interface BehaviorPayload {
  session_id: string;
  event_type: string;
  page_path: string;
  search_terms?: string[];
  checker_items?: string[];
  repeat_count?: number;
  time_on_page_seconds?: number;
}

export interface IntentOutput {
  level: string;
  confidence: number;
  urgency: string;
}

export interface SalesAction {
  cta: string;
  offer?: string;
}

export interface InternalSignal {
  lead_score: number;
  follow_up: string;
  timing: string;
}

export interface AgentOutput {
  intent: IntentOutput;
  sales_message: string;
  sales_action: SalesAction;
  internal_signal: InternalSignal;
  offer?: string;
}

export async function sendBehaviorIntent(payload: BehaviorPayload): Promise<AgentOutput | null> {
  try {
    const response = await fetch('/.netlify/functions/behavior-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.warn('Behavior intent request failed:', response.status);
      return null;
    }

    const data = await response.json();
    return data as AgentOutput;
  } catch (error) {
    console.warn('Failed to send behavior intent:', error);
    return null;
  }
}
