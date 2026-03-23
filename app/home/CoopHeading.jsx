"use client";

import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.8, ease: "easeOut", delay },
});

export default function CoopHeading({ heading = "OUR LOCATIONS", subtitle = "Experience our local vibe and flavour in person. Find your nearest Peckers below." }) {
  const words = (heading || "OUR LOCATIONS").split(" ");
  const subtitleText = subtitle || "Experience our local vibe and flavour in person. Find your nearest Peckers below.";

  return (
    <div
      className="w-full px-[5vw] md:px-[1.4vw] pt-[6vw] md:pt-[1.5vw] pb-[5vw] md:pb-0 xl:pb-0 flex flex-col items-start text-left"
      style={{ lineHeight: "1.2" }}
    >
      {/* Title */}
      <h2
        className="text-[7.2vw] sm:text-[6.2vw] md:text-[3.3vw] font-bold text-white tracking-[.18vw] uppercase"
        style={{ fontFamily: "var(--font-peakers)" }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[2.5vw] md:mr-[0.6vw]"
            {...fadeUp(i * 0.1)}
          >
            {word}
          </motion.span>
        ))}
      </h2>

      {/* Subtitle */}
      <motion.p
        className="font-sans mt-[2vw] md:mt-0 font-extralight text-[4vw] sm:text-[3vw] md:text-[1.3vw] text-white opacity-90 max-w-[90vw] md:max-w-none"
        {...fadeUp(0.4)}
      >
        {subtitleText}
      </motion.p>
    </div>
  );
}
