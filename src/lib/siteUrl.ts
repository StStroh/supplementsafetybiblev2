/**
 * Centralized Site URL Configuration
 *
 * This module provides a single source of truth for the site URL used in
 * authentication redirects, email links, and other external references.
 *
 * Priority order:
 * 1. VITE_SITE_URL environment variable (if set and non-empty)
 * 2. window.location.origin (runtime detection for browser context)
 * 3. Fallback to production URL
 *
 * This ensures:
 * - Production uses the configured production URL
 * - Deploy previews use their preview URL
 * - Local development uses localhost
 */

export const SITE_URL =
  (import.meta.env.VITE_SITE_URL && import.meta.env.VITE_SITE_URL.trim()) ||
  (typeof window !== 'undefined' ? window.location.origin : 'https://supplementsafetybible.com');
