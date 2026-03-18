"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "../../sanity/lib/image";

export default function UniquenessLandingPage({ initialData = null }) {
  const data = initialData;

  const backgroundImageUrl = data?.backgroundImage ? urlFor(data.backgroundImage).url() :
    "https://ehtazgziwtjqm5ww.public.blob.vercel-storage.com/Uniqueness/Uniqueness%20Background%20%281%29.webp";
  const gradientImageUrl =
    "https://ehtazgziwtjqm5ww.public.blob.vercel-storage.com/Uniqueness/Gradient%20%281%29.webp";

  return (
    <div className="w-full relative h-[65vh] md:h-[75vh]">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={backgroundImageUrl}
          alt="Uniqueness Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none select-none z-1">
        <Image
          src={gradientImageUrl}
          alt="Gradient Overlay"
          fill
          className="object-cover"
          draggable={false}
          aria-hidden="true"
          sizes="100vw"
        />
      </div>
      {/* Centered Overlay Content */}
      <div
        className="absolute inset-0 w-full flex flex-col items-center justify-center pb-[2vh] pointer-events-none z-2"
      >
        <motion.h1
          className="text-center font-peakers font-bold text-white text-[2.9vw] md:text-[3.1vw] leading-none drop-shadow-lg pointer-events-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          {data?.heading ? (
            data.heading.split("\n").map((line, idx) => (
              <span key={idx} className={`block font-peakers text-[14vw] md:text-[6vw] ${idx === 2 ? 'text-[#f7e229] mt-[1.2vw] md:mt-[0.1vw] mb-[1.2vw] md:mb-[0.1vw]' : ''}`}>
                {line}
              </span>
            ))
          ) : (
            <>
              <span className="block font-peakers text-[14vw] md:text-[6vw]">THE</span>
              <span className="block font-peakers text-[14vw] md:text-[6vw]">PECKERS</span>
              <span className="block text-[#f7e229] font-peakers text-[16vw] md:text-[6.5vw] font-bold mt-[1.2vw] md:mt-[0.1vw] mb-[1.2vw] md:mb-[0.1vw]">STANDARD</span>
            </>
          )}
        </motion.h1>
        <motion.div
          className="w-full flex justify-center px-[4vw] md:px-0 mt-[6vw] md:mt-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <span
            className="uppercase tracking-[0.15em] font-semibold text-[2.2vw] md:text-[0.85vw] text-[#d3d3d3] font-mono md:mt-[1.5vw] text-center pointer-events-auto leading-[1.7] max-w-[90vw] md:max-w-[55vw] block"
          >
            {data?.subtext || "IT'S NOT ONE THING. From our custom-milled breading to our hand-picked Covent Garden produce, we believe in seriously good chicken, sourced locally, prepared daily, and served with pride."}
          </span>
        </motion.div>
      </div>
    </div>
  );
};