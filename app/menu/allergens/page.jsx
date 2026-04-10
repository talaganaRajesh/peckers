"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AllergensPage() {
  const pdfUrl = "https://ehtazgziwtjqm5ww.public.blob.vercel-storage.com/All%20Dishes%20Allergens%20Info%20website.pdf";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row overflow-hidden">
      {/* Vertical Sidebar Section */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-[22%] lg:w-[18%] p-6 md:p-8 flex flex-col justify-between items-start border-b md:border-b-0 md:border-r border-white/10 bg-[#050505] z-30 shrink-0"
      >
        <div className="w-full flex flex-col gap-10">
          <Link href="/menu" className="group flex items-center gap-2 text-white/40 hover:text-[#F2DF0D] transition-all duration-300">
            <div className="p-1.5 border border-white/10 rounded-full group-hover:border-[#F2DF0D]/50 group-hover:bg-[#F2DF0D]/5 transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">Back to Menu</span>
          </Link>

          <div className="flex flex-col gap-6">
            <img
              src="/Peckers Logo 1 [Vectorized].svg"
              alt="Peckers Logo"
              className="w-24 md:w-32 h-auto"
            />

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-peakers text-[#F2DF0D] leading-[0.85] tracking-tighter uppercase">
                ALLERGENS
              </h1>
              <div className="h-0.5 w-12 bg-[#F2DF0D]/30" />
            </div>

            {pdfUrl && (
              <a
                href={`${pdfUrl}?download=1`}
                download="Peckers-Allergens.pdf"
                className="inline-flex items-center justify-center gap-2 mt-4 px-5 py-2.5 bg-[#F2DF0D] text-black font-mono text-[10px] font-bold uppercase tracking-widest rounded transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 shadow-lg shadow-[#F2DF0D]/10 text-center w-full"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download PDF
              </a>
            )}
          </div>
        </div>

        <div className="hidden md:block pt-12">
          <div className="flex items-center gap-4 text-white/20">
            <div className="h-[1px] w-8 bg-white/10" />
            <span className="text-[8px] uppercase tracking-[0.4em] font-mono whitespace-nowrap">PECKERS 2024</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area - PDF Integration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="flex-1 w-full h-[70vh] md:h-screen relative bg-[#0a0a0a] overflow-hidden"
      >
        {pdfUrl ? (
          <div className="w-full h-full relative">
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
              className="absolute inset-0 w-full h-full border-none m-0 p-0"
              title="Allergens PDF"
              allow="autoplay; scroll-behavior: smooth"
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center z-20">
            <h2 className="text-3xl font-peakers uppercase tracking-widest mb-4 text-white/80">
              Allergen Guide
            </h2>
            <p className="text-white/40 font-neuzeit max-w-md">
              Integration pending.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
