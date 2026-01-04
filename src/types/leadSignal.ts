/**
 * Lead Signal Types for B2B Sales Intent Tracking
 */

export type IntentLevel = 'RESEARCH' | 'VALIDATION' | 'PRE_PURCHASE' | 'PURCHASE_READY';
export type Urgency = 'low' | 'medium' | 'high';
export type FollowUp = 'wait' | 'email' | 'call';
export type EventType = 'search' | 'checker_run' | 'page_view';

export interface LeadSignal {
  id: string;
  session_id: string;
  user_id: string | null;
  created_at: string;

  // Event data
  event_type: EventType;
  page_path: string | null;
  search_terms: string[] | null;
  checker_items: string[] | null;
  repeat_count: number | null;
  time_on_page_seconds: number | null;

  // Agent analysis outputs
  intent_level: IntentLevel;
  confidence: number;
  urgency: Urgency;
  offer: string | null;
  cta: string | null;
  sales_message: string | null;
  lead_score: number;
  follow_up: FollowUp;
  timing: string;
  raw_payload: Record<string, any>;
}

export interface LeadSignalInsert {
  session_id: string;
  user_id?: string | null;
  event_type: EventType;
  page_path?: string | null;
  search_terms?: string[] | null;
  checker_items?: string[] | null;
  repeat_count?: number | null;
  time_on_page_seconds?: number | null;
  intent_level: IntentLevel;
  confidence: number;
  urgency: Urgency;
  offer?: string | null;
  cta?: string | null;
  sales_message?: string | null;
  lead_score: number;
  follow_up: FollowUp;
  timing: string;
  raw_payload: Record<string, any>;
}

export interface LeadSignalPriority {
  id: string;
  session_id: string;
  created_at: string;
  intent_level: IntentLevel;
  lead_score: number;
  sales_message: string | null;
  offer: string | null;
  follow_up: FollowUp;
  timing: string;
}
