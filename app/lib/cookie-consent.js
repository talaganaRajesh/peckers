// Centralised cookie-consent helpers.
//
// We store a single JSON object in localStorage describing the visitor's
// choices. Bump CONSENT_VERSION whenever the cookie categories change so the
// banner re-prompts everyone (required when new tracking is introduced).

export const CONSENT_STORAGE_KEY = "peckers_cookie_consent";
export const CONSENT_VERSION = 1;

// Fired (and listened for) so any part of the site can re-open the preferences
// panel — e.g. the "Cookie Settings" link in the footer.
export const OPEN_PREFERENCES_EVENT = "peckers:open-cookie-preferences";

// Google Analytics / Ads measurement id (mirrors app/layout.jsx).
export const GA_MEASUREMENT_ID = "G-256TPVH0TH";

// "necessary" is always true and cannot be toggled off.
export const DEFAULT_CATEGORIES = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export function readConsent() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Treat a version mismatch as "no consent" so we re-prompt.
    if (!parsed || parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(categories) {
  if (typeof window === "undefined") return null;
  const record = {
    version: CONSENT_VERSION,
    categories: { ...DEFAULT_CATEGORIES, ...categories, necessary: true },
    timestamp: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* storage may be unavailable (private mode); fail silently */
  }
  applyConsentToGtag(record.categories);
  return record;
}

// Push the visitor's choices into Google Consent Mode v2. The defaults are set
// to "denied" in app/layout.jsx before gtag loads; this upgrades them once the
// visitor opts in.
export function applyConsentToGtag(categories) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const analytics = categories.analytics ? "granted" : "denied";
  const marketing = categories.marketing ? "granted" : "denied";
  window.gtag("consent", "update", {
    analytics_storage: analytics,
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
  });
}

export function openCookiePreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_PREFERENCES_EVENT));
}
