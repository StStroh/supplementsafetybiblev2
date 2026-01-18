/**
 * Demo Mode Gate Utilities
 * Manages anonymous user demo check limits and payload persistence
 */

const DEMO_COUNT_KEY = 'ssb_demo_checks_used_v1';
const LAST_PAYLOAD_KEY = 'ssb_last_check_payload_v1';
const DEMO_LIMIT = 2;

export interface CheckPayload {
  supplements: Array<{ id: string; name: string; dosage?: string }>;
  medications: Array<{ id: string; name: string; dosage?: string }>;
  timestamp: number;
}

/**
 * Get current demo check count
 */
export function getDemoCount(): number {
  try {
    const stored = localStorage.getItem(DEMO_COUNT_KEY);
    return stored ? parseInt(stored, 10) : 0;
  } catch {
    return 0;
  }
}

/**
 * Increment demo check count
 */
export function incrementDemoCount(): number {
  try {
    const current = getDemoCount();
    const newCount = current + 1;
    localStorage.setItem(DEMO_COUNT_KEY, String(newCount));
    return newCount;
  } catch {
    return 0;
  }
}

/**
 * Check if user can run a demo check
 */
export function canRunDemoCheck(limit: number = DEMO_LIMIT): boolean {
  return getDemoCount() < limit;
}

/**
 * Get remaining demo checks
 */
export function getRemainingDemoChecks(limit: number = DEMO_LIMIT): number {
  const used = getDemoCount();
  return Math.max(0, limit - used);
}

/**
 * Save last check payload for resume
 */
export function saveLastPayload(payload: CheckPayload): void {
  try {
    localStorage.setItem(LAST_PAYLOAD_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn('Failed to save last payload:', error);
  }
}

/**
 * Load last check payload
 */
export function loadLastPayload(): CheckPayload | null {
  try {
    const stored = localStorage.getItem(LAST_PAYLOAD_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Clear last check payload
 */
export function clearLastPayload(): void {
  try {
    localStorage.removeItem(LAST_PAYLOAD_KEY);
  } catch (error) {
    console.warn('Failed to clear last payload:', error);
  }
}

/**
 * Reset demo count (for testing/debugging only)
 */
export function resetDemoCount(): void {
  try {
    localStorage.removeItem(DEMO_COUNT_KEY);
  } catch (error) {
    console.warn('Failed to reset demo count:', error);
  }
}
