/*
 * ⚠️ PRODUCTION-CRITICAL: Tier Access Control
 *
 * This function gates all premium features.
 * Changes here directly affect revenue and customer access.
 *
 * Fail-safe: Returns false (denies access) on ANY error.
 * See: OPERATIONS.md → Tier Resolution Failures
 */
import { supabase } from './supabase';

export async function requirePremium(): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    console.warn('[AUTH] No session found - access denied');
    return false;
  }

  const res = await fetch('/.netlify/functions/me', {
    headers: { Authorization: `Bearer ${session.access_token}` }
  });

  if (!res.ok) {
    console.warn('[TIER] Failed to resolve premium status:', res.status);
    return false;
  }

  const json = await res.json();
  const isPremium = Boolean(json.isPremium);

  if (!isPremium) {
    console.info('[TIER] Access denied - user is not premium');
  }

  return isPremium;
}
