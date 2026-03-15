"use client";

import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.8, ease: "easeOut", delay },
});

export default function LatestNewsHeading({ heading = "THE PECKERS JOURNAL", subtitle = "Latest stories from the heart of Peckers." }) {
  const words = (heading || "THE PECKERS JOURNAL").split(" ");
  const subtitleText = subtitle || "Latest stories from the heart of Peckers.";

  return (
    <div
      className="w-full px-[5vw] md:px-[1.4vw] py-[10vw] md:py-[5vw] pt-[10vw] md:pt-[8vw] pb-[1vw] md:pb-[2vw] xl:pb-0 flex flex-col items-center md:items-start text-center md:text-left"
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
        className="font-sans mt-[4vw] md:mt-[1vw] font-extralight text-[4vw] sm:text-[3vw] md:text-[1.3vw] text-white opacity-90 max-w-[90vw] md:max-w-[45vw]"
        {...fadeUp(0.4)}
      >
        {subtitleText}
      </motion.p>
    </div>
  );
}
