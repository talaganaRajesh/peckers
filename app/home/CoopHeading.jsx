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
      className="w-full px-[5vw] md:px-[1.4vw] py-[5vw] md:py-0 pt-[15vw] md:pt-[8vw] pb-[10vw] md:pb-[2vw] xl:pb-0 flex flex-col items-center md:items-start text-center md:text-left"
      style={{ lineHeight: "1.2" }}
    >
      {/* Title */}
      <h2
        className="text-[10vw] sm:text-[8vw] md:text-[4.8vw] font-bold text-white tracking-[.2vw] uppercase"
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
        className="font-sans mt-[4vw] md:mt-[1vw] font-extralight text-[4vw] sm:text-[3vw] md:text-[1.3vw] text-white opacity-90 max-w-[90vw] md:max-w-none"
        {...fadeUp(0.4)}
      >
        {subtitleText}
      </motion.p>
    </div>
  );
}
