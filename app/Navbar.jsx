"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import HeaderActionButton from "./components/HeaderActionButton";
import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";

export default function Navbar({ preloadedSettings = null }) {
  const [settings, setSettings] = useState(preloadedSettings);
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [journeyOpen, setJourneyOpen] = useState(false);

  useEffect(() => {
    if (settings) return; // Skip if already loaded

    const fetchSettings = async () => {
      try {
        const data = await client.fetch(`*[_type == "siteSettings"][0]`);
        if (data) {
          setSettings(data);
        }
      } catch (error) {
        console.error("Error fetching site settings:", error);
      }
    };
    fetchSettings();
  }, [settings]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const setupSignupModal = () => {
      const modal = document.getElementById("sbx_modal");
      if (!modal) return false;

      modal.setAttribute("data-backdrop", "true");
      modal.setAttribute("data-keyboard", "true");

      try {
        const $modal = window.jQuery && window.jQuery(modal);
        if ($modal && $modal.data("bs.modal")) {
          const bsModal = $modal.data("bs.modal");
          bsModal.options.backdrop = true;
          bsModal.options.keyboard = true;

          // Keep the form inputs interacting, but allow the close button and outside click.
          modal.addEventListener("click", (event) => {
            const dialog = modal.querySelector(".modal-dialog");
            if (dialog && dialog.contains(event.target)) {
              event.stopPropagation();
            }
          });
        }
      } catch (error) {
        console.error("TalkBox modal fix failed:", error);
      }

      return true;
    };

    const intervalId = window.setInterval(() => {
      if (setupSignupModal()) {
        window.clearInterval(intervalId);
      }
    }, 200);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const openSbxModal = () => {
      const modal = document.getElementById("sbx_modal");
      if (!modal) return;
      try {
        const btn = document.querySelector("#sbx_button .bulletproof_button");
        const $modal = window.jQuery && window.jQuery(modal);
        if ($modal && $modal.length && $modal.data("bs.modal")) {
          $modal.sbx_modal("show");
          return;
        }
        if (btn && typeof btn.click === "function") {
          btn.click();
          return;
        }
      } catch (error) {
        console.error("Error opening sbx modal:", error);
      }
    };

    const clickHandler = (event) => {
      const target = event.target;
      if (!target.closest("#sbx_button") && !target.closest("#sbx_modal")) return;
      if (target.closest("#sbx_button")) {
        event.preventDefault();
        openSbxModal();
      }
    };

    document.addEventListener("click", clickHandler, true);
    return () => document.removeEventListener("click", clickHandler, true);
  }, []);

  // TalkBox Signup Script Manual Injection
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname !== "/" && pathname !== "/home") return;

    // We use a small delay to ensure the DOM is ready
    const timer = setTimeout(() => {
      const container = document.getElementById("sbx_button");
      if (!container) return;

      // If already populated, don't re-inject
      if (container.children.length > 0) return;

      // Remove any existing TalkBox script tags to force a clean slate
      const existingScripts = document.querySelectorAll('script[src*="talkbox.impactapp.com.au"]');
      existingScripts.forEach(s => s.remove());

      const script = document.createElement("script");
      // Use timestamp to force re-evaluation of the IIFE script
      script.src = `https://talkbox.impactapp.com.au/signup_buttons/oQiu4OvNbdNp7Nb7NlA4gw==/script.js?t=${Date.now()}`;
      script.async = true;
      document.body.appendChild(script);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  const logoUrl = settings?.logo ? urlFor(settings.logo).url() : null;

  return (
    <nav id="main-navbar" className="sticky top-0 z-[9999] flex items-center px-4 py-4 md:px-[2vw] md:py-[1.2vw] lg:px-[2.5vw] lg:py-[1.5vw] xl:px-[1.8vw] xl:py-[.4vw] bg-black text-white font-['Share_Tech']">

      {/* Logo Section */}
      <div className="flex-1 flex items-center z-50">
        <Link href="/home" className="relative block w-[140px] md:w-[130px] lg:w-[160px] xl:w-[240px] h-[50px] md:h-[60px] lg:h-[70px] xl:h-[82px] transition-all duration-300">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt="Peckers Logo"
              fill
              className="object-contain"
              priority
            />
          ) : (
            <div className="w-full h-full bg-[#111] animate-pulse rounded" />
          )}
        </Link>
      </div>

      {/* Desktop Center Links */}
      <div
        className="hidden md:flex flex-1 md:text-[1.3vw] lg:text-[1.5vw] xl:text-[1.5vw] justify-center md:tracking-[.1vw] lg:tracking-[.15vw] xl:tracking-[.2vw] font-semibold md:gap-[1.8vw] lg:gap-[2.5vw] xl:gap-[2.7vw]"
        style={{ fontFamily: "var(--font-peakers)" }}
      >
        <Link href="/menu" className="whitespace-nowrap navbar-link">MENU</Link>
        <div className="relative group">
          <span className="whitespace-nowrap cursor-default navbar-link">FIND US</span>
          <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="bg-[#1a1a1a] border border-[#333] rounded-lg py-2 shadow-xl md:min-w-[150px] lg:min-w-[180px] xl:min-w-[200px]">
              <Link href="/hitchin" className="block px-5 py-3 hover:bg-[#262626] whitespace-nowrap md:text-[1.3vw] lg:text-[1.5vw] xl:text-[1.5vw] font-semibold tracking-[.2vw]">Hitchin</Link>
              <Link href="/stevenage" className="block px-5 py-3 hover:bg-[#262626] whitespace-nowrap md:text-[1.3vw] lg:text-[1.5vw] xl:text-[1.5vw] font-semibold tracking-[.2vw]">Stevenage</Link>
            </div>
          </div>
        </div>
        <div className="relative group">
          <span className="whitespace-nowrap cursor-default navbar-link">OUR SECRET</span>
          <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="bg-[#1a1a1a] border border-[#333] rounded-lg py-2 shadow-xl md:min-w-[180px] lg:min-w-[220px] xl:min-w-[250px]">
              <Link href="/house-made-sauces" className="block px-5 py-3 hover:bg-[#262626] whitespace-nowrap md:text-[1.3vw] lg:text-[1.5vw] xl:text-[1.5vw] font-semibold tracking-[.2vw]">House-Made Sauces</Link>
              <Link href="/the-peckers-standard" className="block px-5 py-3 hover:bg-[#262626] whitespace-nowrap md:text-[1.3vw] lg:text-[1.5vw] xl:text-[1.5vw] font-semibold tracking-[.2vw]">The Peckers Standard</Link>
            </div>
          </div>
        </div>
        <Link href="/the-journey" className="whitespace-nowrap navbar-link">THE JOURNEY</Link>
        <Link href="/careers" className="whitespace-nowrap navbar-link mr-[1vw] lg:mr-[1.2vw] xl:mr-[3vw]">CAREERS</Link>
      </div>

      {/* Desktop Buttons */}
      <div
        className="hidden md:flex flex-1 justify-end md:gap-[1vw] lg:gap-[1.5vw] xl:gap-[1.2vw]"
        style={{ fontFamily: "monospace" }}
      >
        <HeaderActionButton
          href={settings?.clickCollectUrl}
          className="md:px-[1.8vw] lg:px-[2.2vw] xl:px-[2.5vw] md:h-[38px] lg:h-[42px] xl:h-[42px] md:text-[1vw] lg:text-[1.1vw] xl:text-[0.9vw] whitespace-nowrap font-black"
          bgColor="bg-white"
          textColor="text-black"
          borderColor="border-white"
          shimmerColor="bg-red-600"
        >
          CLICK & COLLECT
        </HeaderActionButton>

        <HeaderActionButton
          href={settings?.deliveryUrl}
          className="flex items-center gap-2 md:px-[1.8vw] lg:px-[2.2vw] xl:px-[2.5vw] md:h-[38px] lg:h-[42px] xl:h-[42px] md:text-[1vw] lg:text-[1.1vw] xl:text-[0.9vw] whitespace-nowrap hover:bg-red-700 font-black"
          bgColor="bg-red-600"
          textColor="text-white"
          borderColor="border-red-600"
          shimmerColor="bg-white"
        >
          <svg width="20" height="13" viewBox="0 0 17 11" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-[1.2vw] h-auto">
            <path d="M13.5527 3.375C15.3984 3.40137 16.9014 4.9043 16.9277 6.72363C16.9277 8.62207 15.3984 10.1514 13.5 10.125C11.6807 10.125 10.1777 8.62207 10.1777 6.77637C10.1514 5.74805 10.626 4.8252 11.3379 4.19238L11.0215 3.63867C9.99316 4.48242 9.49219 5.69531 9.54492 6.93457C9.54492 7.30371 9.25488 7.59375 8.91211 7.59375H6.69727C6.30176 9.07031 4.9834 10.125 3.42773 10.125C1.5293 10.125 0 8.5957 0.0527344 6.6709C0.0791016 4.9043 1.50293 3.4541 3.2959 3.40137C3.66504 3.375 4.03418 3.42773 4.37695 3.5332L4.66699 2.97949C4.42969 2.61035 4.06055 2.32031 3.42773 2.32031H1.95117C1.58203 2.32031 1.31836 2.05664 1.31836 1.71387C1.29199 1.34473 1.6084 1.05469 1.95117 1.05469H3.42773C4.87793 1.05469 5.58984 1.50293 6.03809 2.10938H10.0986L9.59766 1.26562H7.85742C7.62012 1.26562 7.43555 1.08105 7.43555 0.84375V0.421875C7.43555 0.210938 7.62012 0 7.85742 0H9.9668C10.1777 0 10.3887 0.131836 10.4941 0.316406L11.1006 1.31836L12.0762 0.210938C12.208 0.0791016 12.3662 0 12.5508 0H13.7637C14.1064 0 14.3965 0.290039 14.3965 0.632812V1.47656C14.3965 1.8457 14.1064 2.10938 13.7637 2.10938H11.5752L12.4453 3.55957C12.7881 3.4541 13.1836 3.375 13.5527 3.375ZM3.42773 8.85938C4.27148 8.85938 5.00977 8.3584 5.35254 7.59375H3.2168C2.71582 7.59375 2.42578 7.09277 2.66309 6.6709L3.74414 4.66699C3.63867 4.66699 3.5332 4.64062 3.42773 4.64062C2.24121 4.64062 1.31836 5.58984 1.31836 6.75C1.31836 7.93652 2.24121 8.85938 3.42773 8.85938ZM15.6357 6.88184C15.7148 5.66895 14.7393 4.64062 13.5527 4.66699C13.3945 4.66699 13.2627 4.66699 13.1309 4.69336L14.3965 6.8291C14.5283 7.04004 14.4492 7.30371 14.2646 7.40918L13.8955 7.62012C13.6846 7.75195 13.4473 7.67285 13.3154 7.48828L12.0234 5.2998C11.6543 5.69531 11.4434 6.19629 11.4434 6.75C11.4434 7.96289 12.4453 8.93848 13.6582 8.85938C14.7129 8.80664 15.583 7.93652 15.6357 6.88184Z" />
          </svg>
          DELIVERY
        </HeaderActionButton>
      </div>

      {/* Hamburger Button (Mobile Only) */}
      <div className="md:hidden z-50">
        <button onClick={() => setOpen(!open)} className="text-3xl">
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute left-0 w-full bg-black flex flex-col items-center justify-start text-xl tracking-wider transition-all duration-500 ease-in-out overflow-hidden md:hidden z-40`}
        style={{
          fontFamily: "var(--font-peakers)",
          top: "100%",
          maxHeight: open ? "600px" : "0px",
          opacity: open ? 1 : 0,
          paddingTop: open ? "2.5rem" : "0px",
          paddingBottom: open ? "2.5rem" : "0px"
        }}
      >
        <div className="flex flex-col items-center gap-8 w-full">
          <Link href="/menu" onClick={() => setOpen(false)}>MENU</Link>
          <div className="flex flex-col items-center w-full">
            <button type="button" onClick={() => setLocationsOpen(!locationsOpen)} className="w-full text-center py-1">
              LOCATIONS {locationsOpen ? "−" : "+"}
            </button>
            {locationsOpen && (
              <div className="flex flex-col items-center gap-2 mt-2 w-full">
                <Link href="/hitchin" onClick={() => { setOpen(false); setLocationsOpen(false); }} className="w-full text-center py-3 text-xl">Hitchin</Link>
                <Link href="/stevenage" onClick={() => { setOpen(false); setLocationsOpen(false); }} className="w-full text-center py-3 text-xl">Stevenage</Link>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center w-full">
            <button type="button" onClick={() => setJourneyOpen(!journeyOpen)} className="w-full text-center py-1">
              OUR SECRET {journeyOpen ? "−" : "+"}
            </button>
            {journeyOpen && (
              <div className="flex flex-col items-center gap-2 mt-2 w-full">
                <Link href="/house-made-sauces" onClick={() => { setOpen(false); setJourneyOpen(false); }} className="w-full text-center py-3 text-xl">House-Made Sauces</Link>
                <Link href="/the-peckers-standard" onClick={() => { setOpen(false); setJourneyOpen(false); }} className="w-full text-center py-3 text-xl">The Peckers Standard</Link>
              </div>
            )}
          </div>
          <Link href="/the-journey" onClick={() => setOpen(false)}>THE JOURNEY</Link>
          <Link href="/careers" onClick={() => setOpen(false)}>CAREERS</Link>
        </div>
      </div>

      {/* White Strip (Conditionally shown on home page) */}
      {(pathname === "/" || pathname === "/home") && (
        <div className="absolute top-[100%] left-0 w-full h-auto md:h-[4.5vw] flex items-center justify-center bg-white border-y-2 md:border-y-[3px] border-black overflow-hidden py-1.5 md:px-0 md:py-0">
          <div className="text-center text-black uppercase font-black italic w-full px-2" style={{ fontFamily: "var(--font-peakers)" }}>
            <span className="text-[5vw] xs:text-[5.2vw] sm:text-[22px] md:text-[3vw] xl:text-[2.1vw] tracking-normal md:tracking-wide leading-tight font-black">
              UNLOCK THE PERKS OF THE PECKERS INNER CIRCLE!{" "}
              <span className="relative inline-block align-baseline">
                <span className="text-red-600 font-black">SIGN UP</span>
                <div id="sbx_button" className="talkbox-signup-hitbox" aria-label="Sign up" />
              </span>{" "}
              FOR EXCLUSIVE REWARDS.
            </span>
            <style jsx global>{`
              .talkbox-signup-hitbox {
                position: absolute;
                inset: 0;
                z-index: 10;
                overflow: hidden;
              }

              .talkbox-signup-hitbox > * {
                position: absolute !important;
                inset: 0 !important;
                width: 100% !important;
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                border: 0 !important;
                background: transparent !important;
                opacity: 0 !important;
                cursor: pointer !important;
              }

              .talkbox-signup-hitbox button,
              .talkbox-signup-hitbox a,
              .talkbox-signup-hitbox iframe {
                width: 100% !important;
                height: 100% !important;
                opacity: 0 !important;
                cursor: pointer !important;
              }

              #sbx_modal iframe {
                pointer-events: auto !important;
                min-height: 560px !important;
                min-width: 360px !important;
              }

              #sbx_modal_wrapper,
              #sbx_modal {
                z-index: 10001 !important;
              }

              .modal-backdrop {
                z-index: 10000 !important;
              }
            `}</style>
          </div>
        </div>
      )}
    </nav>
  );
}