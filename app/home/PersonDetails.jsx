"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function PersonDetails({ data = null }) {
  if (!data) return null;

  const headingText = data.heading || "THE HEART OF PECKERS";
  const headingParts = headingText.split(" ");
  const lastWord = headingParts.pop();
  const resHeading = headingParts.join(" ");

  return (
    <div
      className="relative w-full max-w-full overflow-x-hidden flex flex-col lg:flex-row items-stretch justify-center mt-[8vw] md:mt-[8vw] lg:mt-[4vw] gap-[8vw] md:gap-[8vw] lg:gap-[2vw] box-border px-[5vw] md:px-[6vw] lg:px-[2vw] mb-5 md:mb-0"
    >
      <motion.div
        className="shrink-0 w-full lg:w-[43vw] xl:w-[44vw]"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {data.imageUrl && (
          <Image
            src={data.imageUrl}
            alt="Profile"
            className="w-full h-[70vw] md:h-[80vw] lg:h-[38vw] xl:h-[36vw] object-cover object-center rounded-2xl"
            sizes="(max-width: 768px) 90vw, 41.5vw"
            width={670}
            height={840}
          />
        )}
      </motion.div>

      <motion.div
        className="w-full lg:max-w-[50vw] xl:max-w-[40vw] flex flex-col justify-center bg-black md:px-[4vw] lg:px-[4vw] xl:px-[3vw] md:py-[6vw] lg:py-[2vw] xl:py-0 min-h-[50vw] md:min-h-[40vw] lg:min-h-[38vw] xl:min-h-[28vw] shadow-xl relative mt-[4vw] md:mt-[4vw] lg:-mt-[2vw] xl:-mt-[2.2vw] mr-0 xl:mr-[1vw] z-10 md:z-2 rounded-xl lg:rounded-none"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
      >
        <h2
          className="block text-white font-bold text-[9vw] sm:text-[9vw] md:text-[6vw] lg:text-[4.5vw] xl:text-[4.9vw] tracking-tight sm:tracking-[.1vw] xl:tracking-[.2vw] leading-tight mb-[6vw] md:mb-[4vw] lg:mb-[1.5vw] xl:mb-[1vw] text-left whitespace-normal lg:max-w-[35vw]"
          style={{ letterSpacing: "0.01em", fontFamily: "var(--font-peakers)" }}
        >
          {resHeading} <span className="text-white">{lastWord}</span>
        </h2>

        <div className="relative flex flex-col items-start w-full">
          <div
            className="whitespace-pre-wrap text-white text-left font-light text-[4vw] sm:text-[3.5vw] md:text-[2.5vw] lg:text-[1.4vw] xl:text-[1.3vw] tracking-[1.2] font-sans md:mb-[4vw] lg:mb-[1.5vw] xl:mb-[1vw] leading-[6vw] md:leading-[4vw] lg:leading-[2.2vw] xl:leading-[2vw] w-full"
          >
            {data.description}
          </div>
        </div>

        <div className="h-[6vw] md:h-[6vw] lg:h-[3vw] xl:h-[2.2vw]" />

        <div className="flex justify-start w-full">
          <a
            href="#"
            className="group inline-flex flex-col items-start text-white gap-[1vw] xl:gap-[.3vw] font-sans text-[3.5vw] sm:text-[2.5vw] md:text-[2.5vw] lg:text-[1.3vw] xl:text-[1.1vw] font-extralight"
            style={{ letterSpacing: "0.08em", width: "fit-content" }}
          >
            <span className="flex items-center gap-[1.5vw] md:gap-[2vw] lg:gap-[1vw] xl:gap-[.4vw]">
              <span className="border-b-2 border-white md:mt-[3vw] lg:mt-[1vw] xl:mt-[1vw] pb-[2vw] md:pb-[2.5vw] lg:pb-[8px] xl:pb-[7px] pr-[.5vw] xl:pr-[.1vw] tracking-[0.09em]">
                {data.buttonText || "OUR HERITAGE"}
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-[6vw] h-[6vw] md:w-[4vw] md:h-[4vw] lg:w-[2vw] lg:h-[2vw] xl:w-[1.7vw] xl:h-[1.7vw] inline-block align-middle mt-[3vw] md:mt-[4vw] lg:mt-[1.5vw] xl:mt-[1vw]"
              >
                <line x1="6" y1="12" x2="20" y2="12" />
                <polyline points="15 7 20 12 15 17" />
              </svg>
            </span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
