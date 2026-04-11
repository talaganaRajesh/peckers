"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function AllergensPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const pdfUrl = "https://ehtazgziwtjqm5ww.public.blob.vercel-storage.com/All%20Dishes%20Allergens%20Info%20website%20CHANEGD%20FORMAT.pdf";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row font-sans selection:bg-[#F2DF0D] selection:text-black overflow-x-hidden lg:overflow-hidden relative">

      {/* MOBILE-ONLY FULL-SCREEN INTERFACE (Sticky/Fixed) */}
      <div className={`lg:hidden fixed inset-0 z-[60] bg-black transition-all duration-700 ${isUnlocked ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
        <div className="absolute inset-0 z-0">
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            className="w-full h-full border-none m-0 p-0 blur-[20px] scale-110 opacity-40"
            title="Allergens PDF Preview"
          />
        </div>

        {/* Mobile Header in Blur Mode */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
          <Link href="/menu" className="p-3 border border-white/10 rounded-full bg-black/20 backdrop-blur-md">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <img src="/Peckers Logo 1 [Vectorized].svg" alt="Peckers Logo" className="h-6 w-auto" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10 bg-black/20">
          <div className="max-w-xs space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="h-[1px] w-8 bg-[#F2DF0D]" />
                <p className="text-[#F2DF0D] font-mono text-[10px] uppercase font-bold tracking-[0.4em]">Quality & Safety</p>
                <div className="h-[1px] w-8 bg-[#F2DF0D]" />
              </div>
              <h2 className="text-4xl font-peakers font-bold text-white uppercase leading-[0.9]">Allergen<br />Guide</h2>
              <p className="text-white/60 text-sm leading-relaxed font-sans pt-2">
                We prepare our food in kitchens where allergens are present. Your safety is our priority.
              </p>
            </div>

            <button
              onClick={() => setIsUnlocked(true)}
              className="group relative w-full overflow-hidden rounded-full bg-[#F2DF0D] p-[1px] transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(242,223,13,0.2)]"
            >
              <div className="relative flex items-center justify-center gap-3 rounded-full bg-[#F2DF0D] px-8 py-4 text-black font-mono text-[11px] font-bold uppercase tracking-widest transition-all group-hover:bg-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Click here to view full guide
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE INTERACTIVE PDF (REVEALED AFTER CLICK) */}
      <div className={`lg:hidden fixed inset-0 z-50 bg-black flex flex-col transition-all duration-700 ${isUnlocked ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <div className="p-4 bg-black/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between shrink-0">
          <button onClick={() => setIsUnlocked(false)} className="p-2 text-white/40 hover:text-white transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#F2DF0D]">Interactive Viewer</span>
          <div className="w-10" /> {/* Spacer */}
        </div>
        <div className="flex-1 w-full relative h-[calc(100%-60px)]">
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
            className="w-full h-full border-none m-0 p-0 allow-interaction"
            title="Allergens PDF Full"
            allow="autoplay; scroll-behavior: smooth"
          />
        </div>
      </div>


      {/* LEFT SIDE PANEL - Sidebar on Desktop (HIDDEN ON MOBILE AFTER REDESIGN) */}
      <aside className="hidden lg:flex w-full lg:w-[32%] xl:w-[28%] bg-[#080808] border-r border-white/5 flex flex-col h-screen z-50 relative overflow-y-auto custom-scrollbar">
        {/* Top Branding & Navigation */}
        <div className="p-10 space-y-12">
          <div className="flex flex-col space-y-10">
            <Link
              href="/menu"
              className="group flex items-center gap-3 text-white/40 hover:text-[#F2DF0D] transition-all duration-300"
            >
              <div className="p-2 border border-white/10 rounded-full group-hover:border-[#F2DF0D]/50 group-hover:bg-[#F2DF0D]/5 transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">Back to Menu</span>
            </Link>

            <div className="flex flex-col items-start whitespace-nowrap">
              <img
                src="/Peckers Logo 1 [Vectorized].svg"
                alt="Peckers Logo"
                className="lg:h-[4.2vw] w-auto object-contain mb-8"
              />
              <h1 className="lg:text-[4vw] xl:text-[3.5vw] font-peakers font-bold text-[#F2DF0D] leading-[0.9] tracking-normal uppercase mt-6">
                ALLERGENS
              </h1>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-6 pt-2">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-[#F2DF0D]" />
              <p className="text-[#F2DF0D] font-mono text-[10px] uppercase font-bold tracking-[0.4em]">
                Quality & Safety First
              </p>
            </div>

            <p className="text-white/70 lg:text-[1.1vw] leading-relaxed font-sans tracking-wide max-w-2xl">
              We prepare our food in kitchens where allergens are present and shared equipment is used.
              <br /><br />
              <span className="text-white italic font-medium">We have products which contain both nuts and peanuts.</span>
            </p>

            <div className="pt-2">
              <a
                href={`${pdfUrl}?download=1`}
                download="Peckers-Allergens.pdf"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#F2DF0D] text-black font-mono text-[11px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 shadow-xl shadow-[#F2DF0D]/10 w-full lg:w-auto"
              >
                Download PDF Full Guide
              </a>
            </div>
          </div>
        </div>

        <div className="mt-auto p-10 hidden lg:block border-t border-white/5 bg-black/20">
          <div className="text-white/20 font-mono text-[8px] uppercase tracking-widest flex items-center justify-between">
            <span>Last Updated: 12 April 2024</span>
            <span>Safety First</span>
          </div>
        </div>
      </aside>

      {/* RIGHT SIDE CONTENT - PDF Viewer (DESKTOP) */}
      <main className="hidden lg:flex flex-1 bg-black relative flex-col h-screen">
        <div className="flex-1 w-full h-full relative overflow-hidden bg-zinc-900 shadow-2xl">
          {pdfUrl ? (
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
              className="w-full h-full border-none m-0 p-0 allow-interaction"
              title="Allergens PDF Desktop"
              allow="autoplay; scroll-behavior: smooth"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center text-white/40">
              <h2 className="text-3xl font-peakers uppercase tracking-widest">Guide Preview</h2>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
