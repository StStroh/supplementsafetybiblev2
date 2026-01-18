// Base URL for Netlify Functions (dev vs prod)
export const API_BASE =
  location.hostname.includes("localhost") ||
  location.hostname.endsWith(".github.dev")
    ? "/.netlify/functions"
    : "https://supplementsafetybible.com/.netlify/functions";
