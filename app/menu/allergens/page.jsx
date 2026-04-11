"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AllergensPage() {
  const pdfUrl = "https://ehtazgziwtjqm5ww.public.blob.vercel-storage.com/All%20Dishes%20Allergens%20Info%20website%20CHANEGD%20FORMAT.pdf";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row font-sans selection:bg-[#F2DF0D] selection:text-black overflow-x-hidden lg:overflow-hidden">

      {/* LEFT SIDE PANEL - Sidebar on Desktop, Header on Mobile */}
      <aside className="w-full lg:w-[35%] xl:w-[30%] bg-[#080808] border-r border-white/5 flex flex-col h-auto lg:h-screen z-50 relative overflow-y-auto custom-scrollbar">
        {/* Top Branding & Navigation */}
        <div className="p-6 md:p-8 lg:p-10 space-y-8 md:space-y-12">
          <div className="flex items-center justify-between lg:block lg:space-y-8">
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

            <div className="flex items-center gap-4 lg:gap-0 lg:flex-col lg:items-start">
              <img
                src="/Peckers Logo 1 [Vectorized].svg"
                alt="Peckers Logo"
                className="h-8 md:h-12 lg:h-[4.5vw] w-auto object-contain lg:mb-6"
              />
              <div className="hidden xs:block lg:hidden w-px h-8 bg-white/10" />
              <h1 className="text-2xl md:text-3xl lg:text-[4.8vw] xl:text-[4vw] font-peakers font-bold text-[#F2DF0D] leading-[0.9] tracking-tighter uppercase lg:mt-4">
                ALLERGENS <br className="hidden lg:block" /> GUIDE
              </h1>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-6 lg:pt-4">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-[#F2DF0D]" />
              <p className="text-[#F2DF0D] font-mono text-[10px] uppercase font-bold tracking-[0.4em]">
                Quality & Safety First
              </p>
            </div>

            <p className="text-white/70 text-sm md:text-base lg:text-[1.1vw] leading-relaxed font-sans tracking-wide">
              We prepare our food in kitchens where allergens are present and shared equipment is used.
              Although we handle your meal with care, we cannot ensure it is allergen free, even if
              requested ingredients are removed.
              <br /><br />
              <span className="text-white italic">We have products which contain both nuts and peanuts, hence we can’t guarantee any nut/peanut free guarantees.</span>
            </p>

            <div className="pt-4">
              <a
                href={`${pdfUrl}?download=1`}
                download="Peckers-Allergens.pdf"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#F2DF0D] text-black font-mono text-[11px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 shadow-xl shadow-[#F2DF0D]/10 w-full lg:w-auto"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download PDF Full Guide
              </a>
            </div>
          </div>

          <div className="hidden lg:block h-px w-full bg-white/5" />

          {/* Detailed Info (Left Aligned Now) */}
          <div className="hidden lg:grid grid-cols-1 gap-10">
            <div className="space-y-3">
              <h4 className="text-white font-peakers text-xl uppercase tracking-wide">Regular Updates</h4>
              <p className="text-white/30 text-[0.8vw] leading-relaxed font-mono uppercase tracking-wider">
                This guide is reviewed monthly. Please alert staff before ordering.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-white font-peakers text-xl uppercase tracking-wide">Cross Contamination</h4>
              <p className="text-white/30 text-[0.8vw] leading-relaxed font-mono uppercase tracking-wider">
                Operations involve handling cereal, gluten, dairy, eggs, and nuts.
              </p>
            </div>
          </div>
        </div>

        {/* Footer info at bottom of sidebar */}
        <div className="mt-auto p-10 hidden lg:block border-t border-white/5 bg-black/20">
          <div className="text-white/20 font-mono text-[8px] uppercase tracking-widest flex items-center justify-between">
            <span>Last Updated: 12 April 2024</span>
            <span>Safety First</span>
          </div>
        </div>
      </aside>

      {/* RIGHT SIDE CONTENT - PDF Viewer */}
      <main className="flex-1 bg-black relative flex flex-col h-auto lg:h-screen">
        <div className="flex-1 w-full h-full relative overflow-hidden bg-zinc-900 shadow-inner">
          {pdfUrl ? (
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
              className="w-full h-full border-none m-0 p-0 allow-interaction"
              title="Allergens PDF"
              allow="autoplay; scroll-behavior: smooth"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
              <h2 className="text-3xl font-peakers uppercase tracking-widest mb-4 text-white/80">
                Allergen Guide
              </h2>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
