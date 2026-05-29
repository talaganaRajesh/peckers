"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import {
  OPEN_PREFERENCES_EVENT,
  readConsent,
  writeConsent,
} from "../lib/cookie-consent";

// What the toggles show before the visitor has made a choice. Non-essential
// categories are pre-ticked here as a UI default — nothing is actually stored
// or sent to Google until the visitor clicks Accept / Save / Reject.
const PRESELECTED_CATEGORIES = {
  necessary: true,
  analytics: true,
  marketing: true,
};

const COOKIE_CATEGORIES = [
  {
    key: "necessary",
    title: "Strictly Necessary",
    description:
      "Required for the site to work — page loading, security and remembering your cookie choices. These can't be switched off.",
    locked: true,
  },
  {
    key: "analytics",
    title: "Analytics",
    description:
      "Help us understand how the site is used (e.g. Google Analytics) so we can make it better. All data is aggregated and anonymous.",
    locked: false,
  },
  {
    key: "marketing",
    title: "Marketing",
    description:
      "Used to measure the performance of our ads and show you more relevant offers across other sites.",
    locked: false,
  },
];

const COOKIE_ICON = (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z" />
    <path d="M8.5 8.5h.01" />
    <path d="M16 15.5h.01" />
    <path d="M12 12h.01" />
    <path d="M11 17h.01" />
    <path d="M7 13h.01" />
  </svg>
);

export default function CookieConsent() {
  // null = undecided (not yet read) so we render nothing during SSR/first paint
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [selection, setSelection] = useState(PRESELECTED_CATEGORIES);

  // Decide whether to show the banner on mount, and wire up the re-open event.
  // localStorage is client-only, so this decision can't run during render/SSR
  // without a hydration mismatch — it must happen here, after mount.
  useEffect(() => {
    const existing = readConsent();
    if (existing) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with client-only localStorage on mount
      setSelection(existing.categories);
    } else {
      setVisible(true);
    }

    const handleOpen = () => {
      const current = readConsent();
      setSelection(current?.categories ?? PRESELECTED_CATEGORIES);
      setShowPreferences(true);
      setVisible(true);
    };

    window.addEventListener(OPEN_PREFERENCES_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, handleOpen);
  }, []);

  // Lock background scroll while the full-screen preferences modal is open.
  useEffect(() => {
    if (!showPreferences) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showPreferences]);

  const persist = useCallback((categories) => {
    writeConsent(categories);
    setSelection(categories);
    setShowPreferences(false);
    setVisible(false);
  }, []);

  const acceptAll = () =>
    persist({ necessary: true, analytics: true, marketing: true });
  const rejectAll = () =>
    persist({ necessary: true, analytics: false, marketing: false });
  const savePreferences = () => persist(selection);

  const toggle = (key) =>
    setSelection((prev) => ({ ...prev, [key]: !prev[key] }));

  if (!visible) return null;

  return (
    <>
      {/* ───────────────────────── Consent banner ───────────────────────── */}
      <AnimatePresence>
        {!showPreferences && (
          <motion.div
            role="dialog"
            aria-live="polite"
            aria-label="Cookie consent"
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 32, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-9990 right-3 md:right-6 bottom-[calc(84px+env(safe-area-inset-bottom))] md:bottom-6 w-[calc(100%-1.5rem)] max-w-125"
          >
            <div className="rounded-2xl border border-white/15 bg-black/95 backdrop-blur-md shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] p-4 md:p-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white text-black">
                  {COOKIE_ICON}
                </span>
                <h2
                  className="text-lg md:text-xl uppercase tracking-wide leading-none"
                  style={{ fontFamily: "var(--font-peakers-bold)" }}
                >
                  We use cookies
                </h2>
              </div>

              <p
                className="text-[12px] md:text-[12.5px] leading-snug text-white/65"
                style={{ fontFamily: "var(--font-neuzeit)" }}
              >
                We use cookies to keep the site running and improve your
                experience. Read more in our{" "}
                <Link
                  href="/privacy"
                  className="text-white underline underline-offset-2 decoration-white/40 hover:decoration-white"
                >
                  Privacy Policy
                </Link>
                .
              </p>

              <div className="mt-3.5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowPreferences(true)}
                  className="shrink-0 px-1 text-[11px] font-semibold uppercase tracking-wider text-white/55 transition-colors hover:text-white"
                  style={{ fontFamily: "var(--font-neuzeit)" }}
                >
                  Preferences
                </button>
                <button
                  type="button"
                  onClick={rejectAll}
                  className="flex-1 rounded-lg border border-white/20 bg-transparent px-3 py-2.5 text-[12px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10 active:scale-[0.98]"
                  style={{ fontFamily: "var(--font-neuzeit)" }}
                >
                  Reject all
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="flex-1 rounded-lg bg-white px-3 py-2.5 text-[12px] font-black uppercase tracking-wider text-black transition-colors hover:bg-white/90 active:scale-[0.98]"
                  style={{ fontFamily: "var(--font-neuzeit)" }}
                >
                  Accept all
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ──────────────────────── Preferences modal ─────────────────────── */}
      <AnimatePresence>
        {showPreferences && (
          <motion.div
            className="fixed inset-0 z-10010 flex items-end md:items-center justify-center p-0 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowPreferences(false)}
              aria-hidden="true"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Cookie preferences"
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[560px] max-h-[90dvh] overflow-y-auto custom-scrollbar rounded-t-3xl md:rounded-3xl border border-white/15 bg-black text-white shadow-[0_20px_80px_-20px_rgba(0,0,0,0.95)]"
            >
              <div className="flex items-start justify-between gap-4 p-6 md:p-8 pb-4 md:pb-5">
                <div>
                  <h2
                    className="text-2xl md:text-3xl uppercase tracking-wide leading-none mb-2"
                    style={{ fontFamily: "var(--font-peakers-bold)" }}
                  >
                    Cookie preferences
                  </h2>
                  <p
                    className="text-[13px] md:text-sm text-white/60 leading-relaxed"
                    style={{ fontFamily: "var(--font-neuzeit)" }}
                  >
                    Choose which cookies you allow. See our{" "}
                    <Link
                      href="/privacy"
                      className="text-white underline underline-offset-2 decoration-white/40 hover:decoration-white"
                    >
                      Privacy Policy
                    </Link>{" "}
                    for full details.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPreferences(false)}
                  aria-label="Close cookie preferences"
                  className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="px-6 md:px-8 space-y-3">
                {COOKIE_CATEGORIES.map((cat) => {
                  const checked = cat.locked ? true : !!selection[cat.key];
                  return (
                    <div
                      key={cat.key}
                      className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5"
                    >
                      <div>
                        <h3
                          className="text-base md:text-lg font-bold uppercase tracking-wide leading-none mb-1.5"
                          style={{ fontFamily: "var(--font-neuzeit)" }}
                        >
                          {cat.title}
                        </h3>
                        <p
                          className="text-[12.5px] md:text-[13px] text-white/55 leading-relaxed"
                          style={{ fontFamily: "var(--font-neuzeit)" }}
                        >
                          {cat.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        disabled={cat.locked}
                        onClick={() => toggle(cat.key)}
                        role="switch"
                        aria-checked={checked}
                        aria-label={`${cat.title} cookies`}
                        className={`relative mt-1 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${
                          checked ? "bg-white" : "bg-white/20"
                        } ${cat.locked ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
                      >
                        <span
                          className={`inline-block h-[18px] w-[18px] transform rounded-full transition-transform duration-200 ${
                            checked ? "translate-x-[22px] bg-black" : "translate-x-[3px] bg-white"
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="sticky bottom-0 mt-5 flex flex-col-reverse sm:flex-row gap-2.5 bg-gradient-to-t from-black via-black to-transparent p-6 md:p-8 pt-5">
                <button
                  type="button"
                  onClick={rejectAll}
                  className="flex-1 rounded-xl border border-white/20 px-4 py-3 text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10 active:scale-[0.98]"
                  style={{ fontFamily: "var(--font-neuzeit)" }}
                >
                  Reject all
                </button>
                <button
                  type="button"
                  onClick={savePreferences}
                  className="flex-1 rounded-xl border border-white/20 px-4 py-3 text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10 active:scale-[0.98]"
                  style={{ fontFamily: "var(--font-neuzeit)" }}
                >
                  Save choices
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="flex-1 rounded-xl bg-white px-4 py-3 text-[13px] font-black uppercase tracking-wider text-black transition-colors hover:bg-white/90 active:scale-[0.98]"
                  style={{ fontFamily: "var(--font-neuzeit)" }}
                >
                  Accept all
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
