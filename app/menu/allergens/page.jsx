"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AllergensPage() {
  const pdfUrl = "https://ehtazgziwtjqm5ww.public.blob.vercel-storage.com/All%20Dishes%20Allergens%20Info%20website%20CHANEGD%20FORMAT.pdf";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-[#F2DF0D] selection:text-black overflow-x-hidden">
      {/* Horizontal Header Section */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full bg-[#050505] border-b border-white/5 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between z-50 relative gap-2"
      >
        {/* Left: Back Link */}
        <div className="flex-1 flex justify-start">
          <Link
            href="/menu"
            className="group flex items-center gap-2 md:gap-3 text-white/40 hover:text-[#F2DF0D] transition-all duration-300"
          >
            <div className="p-1.5 border border-white/10 rounded-full group-hover:border-[#F2DF0D]/50 group-hover:bg-[#F2DF0D]/5 transition-all">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="hidden md:inline font-mono text-[9px] uppercase tracking-[0.2em] font-bold">Back</span>
          </Link>
        </div>

        {/* Center: Brand & Title */}
        <div className="flex items-center gap-2 sm:gap-4">
          <img
            src="/Peckers Logo 1 [Vectorized].svg"
            alt="Peckers Logo"
            className="h-6 sm:h-8 md:h-10 lg:h-11 w-auto object-contain"
          />
          <div className="hidden xs:block w-px h-6 sm:h-8 bg-white/10" />
          <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-peakers text-[#F2DF0D] leading-none tracking-tighter uppercase whitespace-nowrap">
            ALLERGENS
          </h1>
        </div>

        {/* Right: Download Button */}
        <div className="flex-1 flex justify-end">
          {pdfUrl && (
            <a
              href={`${pdfUrl}?download=1`}
              download="Peckers-Allergens.pdf"
              className="inline-flex items-center justify-center gap-2 px-3 md:px-5 py-2 bg-[#F2DF0D] text-black font-mono text-[8px] md:text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 shadow-lg shadow-[#F2DF0D]/10"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span className="hidden xs:inline">PDF</span>
            </a>
          )}
        </div>
      </motion.nav>

      {/* Main Content Area */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="w-full flex-1"
      >
        {/* Intro Section Above PDF */}
        <section className="max-w-7xl mx-auto px-2 pt-2 pb-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-[#F2DF0D] font-mono text-[10px] md:text-[12px] uppercase font-bold tracking-[0.4em] mb-4"
          >
            Quality & Safety
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-white/50 text-[11px] md:text-sm max-w-3xl mx-auto leading-relaxed font-mono uppercase tracking-widest px-6"
          >
            Our comprehensive directory provides detailed information on all major allergens.
            Please use the interactive viewer below to check specific items on our menu.
          </motion.p>
        </section>

        {/* PDF Viewer Section with moderate side gaps */}
        <section className="w-full min-h-[120vh] relative bg-black px-4 md:px-12 lg:px-20">
          <div className="w-full h-full max-w-7xl mx-auto bg-white rounded shadow-2xl overflow-hidden">
            {pdfUrl ? (
              <iframe
                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                className="w-full h-[120vh] border-none"
                title="Allergens PDF"
                allow="autoplay; scroll-behavior: smooth"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-black">
                <h2 className="text-3xl font-peakers uppercase tracking-widest mb-4 text-white/80">
                  Allergen Guide
                </h2>
                <p className="text-white/40 font-neuzeit max-w-md">
                  Integration pending. Please check back later.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Dummy Allergen Info Section */}
        <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-4">
                <h6 className="text-[#F2DF0D] font-mono text-[10px] uppercase font-bold tracking-[0.4em]">In-Depth Information</h6>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-peakers text-white uppercase leading-[0.9] tracking-tighter">
                  Our <span className="text-[#F2DF0D]">Safety</span> <br /> Commitment
                </h2>
              </div>
              <p className="text-white/40 font-mono text-xs leading-relaxed uppercase tracking-wider max-w-md">
                Transparency is at the heart of our kitchen. We believe everyone deserves to enjoy peckers with complete peace of mind.
              </p>
              <div className="h-0.5 w-24 bg-[#F2DF0D]/20" />
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              <div className="space-y-4">
                <h4 className="text-white font-peakers text-2xl uppercase tracking-wide">Cross Contamination</h4>
                <p className="text-white/30 text-sm leading-relaxed">
                  Daily operations involve the handling of cereal containing gluten, dairy, eggs, and nuts. While we use separate equipment where possible, universal safety cannot be guaranteed.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-peakers text-2xl uppercase tracking-wide">Local Sourcing</h4>
                <p className="text-white/30 text-sm leading-relaxed">
                  We work closely with local suppliers to verify ingredient origins. Our chicken is sourced from approved farms that adhere to strict safety standards.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-peakers text-2xl uppercase tracking-wide">Regular Updates</h4>
                <p className="text-white/30 text-sm leading-relaxed">
                  This allergen guide is reviewed monthly. Please check the "Last Updated" timestamp to ensure you have the most current version.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-peakers text-2xl uppercase tracking-wide">Staff Training</h4>
                <p className="text-white/30 text-sm leading-relaxed">
                  Every member of the Peckers team undergoes rigorous food safety training, with a specific focus on allergen management and customer communication.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-4 text-white/10">
                <div className="h-[1px] w-8 bg-white/10" />
                <span className="text-[10px] uppercase tracking-[0.4em] font-mono whitespace-nowrap">Peckers Global 2024</span>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <div className="w-1 h-1 rounded-full bg-white/10" />
                <span className="text-white/20 text-[8px] uppercase tracking-widest font-mono">Safety First</span>
                <div className="w-1 h-1 rounded-full bg-white/10" />
                <span className="text-white/20 text-[8px] uppercase tracking-widest font-mono">Transparent Ingredients</span>
              </div>
            </div>
            <div className="px-4 py-2 border border-white/10 rounded-full text-white/30 font-mono text-[8px] uppercase tracking-widest">
              Last Updated: 12 April 2024
            </div>
          </div>
        </section>
      </motion.main>
    </div>
  );
}
