/**
 * TikTok Events API - Server-Side Purchase Tracking
 *
 * CRITICAL: This fires ONLY after confirmed Stripe payment
 * Used by stripe-webhook.cjs to track CompletePayment events
 *
 * Docs: https://business-api.tiktok.com/portal/docs?id=1741601162187777
 */
'use strict';

const crypto = require('crypto');

const TIKTOK_API_URL = 'https://business-api.tiktok.com/open_api/v1.3/event/track/';
const TIKTOK_PIXEL_ID = process.env.TIKTOK_PIXEL_ID || 'D5MDLNRC77U6NESDNRNG';
const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN;

/**
 * Hash email with SHA256 for TikTok Events API
 */
function hashEmail(email) {
  if (!email) return '';
  return crypto.createHash('sha256').update(email.toLowerCase().trim()).digest('hex');
}

/**
 * Send TikTok CompletePayment event
 *
 * @param {Object} params
 * @param {string} params.email - Customer email
 * @param {string} params.currency - ISO currency code (e.g., 'USD')
 * @param {number} params.value - Purchase amount in decimal (e.g., 19.99)
 * @param {string} params.eventId - Unique event ID (Stripe session ID for deduplication)
 * @param {string} params.ip - Customer IP address (optional)
 * @param {string} params.userAgent - Customer user agent (optional)
 * @param {string} params.ttclid - TikTok click ID (optional)
 */
async function trackPurchase({
  email,
  currency,
  value,
  eventId,
  ip = null,
  userAgent = null,
  ttclid = null,
}) {
  // Validate required fields
  if (!email || !currency || !value || !eventId) {
    console.error('[TikTok] Missing required fields for purchase event');
    return { success: false, error: 'Missing required fields' };
  }

  // Check if access token is configured
  if (!TIKTOK_ACCESS_TOKEN) {
    console.warn('[TikTok] TIKTOK_ACCESS_TOKEN not configured, skipping tracking');
    return { success: false, error: 'Access token not configured' };
  }

  const timestamp = Math.floor(Date.now() / 1000);

  // Build event payload
  const payload = {
    pixel_code: TIKTOK_PIXEL_ID,
    event: 'CompletePayment',
    event_id: eventId, // Stripe session ID for deduplication
    timestamp: timestamp,
    properties: {
      currency: currency.toUpperCase(),
      value: parseFloat(value),
    },
    context: {
      user: {
        email: hashEmail(email),
      },
    },
  };

  // Add optional user data if available
  if (ip) {
    payload.context.user.ip = ip;
  }
  if (userAgent) {
    payload.context.user.user_agent = userAgent;
  }
  if (ttclid) {
    payload.context.user.ttclid = ttclid;
  }

  console.log('[TikTok] Sending CompletePayment event:', {
    eventId,
    email: email.substring(0, 3) + '***', // Partial for logging
    currency,
    value,
  });

  try {
    const response = await fetch(TIKTOK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': TIKTOK_ACCESS_TOKEN,
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok || responseData.code !== 0) {
      console.error('[TikTok] API error:', responseData);
      return {
        success: false,
        error: responseData.message || 'TikTok API request failed',
        response: responseData,
      };
    }

    console.log('[TikTok] ✅ Purchase event sent successfully:', eventId);
    return { success: true, response: responseData };

  } catch (error) {
    console.error('[TikTok] Network error:', error.message);
    return { success: false, error: error.message };
  }
}

module.exports = {
  trackPurchase,
  hashEmail,
};
