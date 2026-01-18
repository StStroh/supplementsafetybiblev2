/**
 * TikTok Pixel Tracking Helper
 *
 * Provides type-safe TikTok event tracking with debug mode support.
 *
 * Usage:
 * - PageView: Automatically tracked on route changes via RootLayout
 * - ViewContent: Call trackViewContent() on content pages
 * - InitiateCheckout: Call trackInitiateCheckout() before checkout
 *
 * Debug Mode: Add ?ttdebug=1 to URL to see console logs for all events
 */

declare global {
  interface Window {
    ttq?: {
      page: () => void;
      track: (event: string, properties?: any) => void;
    };
  }
}

/**
 * Check if debug mode is enabled via URL parameter
 */
function isDebugMode(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('ttdebug') === '1';
}

/**
 * Log TikTok events to console when debug mode is enabled
 */
function debugLog(eventName: string, properties?: any) {
  if (isDebugMode()) {
    console.log('[TikTok Pixel]', eventName, properties || '(no properties)');
  }
}

/**
 * Check if TikTok Pixel is loaded
 */
export function isTikTokLoaded(): boolean {
  return typeof window !== 'undefined' && typeof window.ttq !== 'undefined';
}

/**
 * Track PageView event
 * Call this on route changes
 */
export function trackPageView() {
  if (!isTikTokLoaded()) {
    if (isDebugMode()) {
      console.warn('[TikTok Pixel] Not loaded yet');
    }
    return;
  }

  window.ttq!.page();
  debugLog('PageView');
}

/**
 * Track ViewContent event
 * Call this when user views important content (e.g., /check page)
 *
 * @param contentName - Name of the content being viewed
 * @param contentType - Type of content (e.g., "tool", "article", "product")
 */
export function trackViewContent(contentName: string, contentType: string) {
  if (!isTikTokLoaded()) {
    if (isDebugMode()) {
      console.warn('[TikTok Pixel] Not loaded yet');
    }
    return;
  }

  const properties = {
    content_name: contentName,
    content_type: contentType,
  };

  window.ttq!.track('ViewContent', properties);
  debugLog('ViewContent', properties);
}

/**
 * Track InitiateCheckout event
 * Call this when user clicks checkout/subscribe CTA
 *
 * @param contentName - Name of what they're checking out (e.g., "Subscription", "Pro Plan")
 * @param contentType - Type of content (e.g., "pricing", "product")
 */
export function trackInitiateCheckout(contentName: string, contentType: string) {
  if (!isTikTokLoaded()) {
    if (isDebugMode()) {
      console.warn('[TikTok Pixel] Not loaded yet');
    }
    return;
  }

  const properties = {
    content_name: contentName,
    content_type: contentType,
  };

  window.ttq!.track('InitiateCheckout', properties);
  debugLog('InitiateCheckout', properties);
}

/**
 * Note: CompletePayment is handled server-side via Stripe webhook
 * DO NOT call from frontend to avoid double-counting
 */
