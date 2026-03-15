"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

export default function SignUpSection({ initialData = null }) {
  const glossRef = useRef(null);
  const data = initialData;

  useEffect(() => {
    if (!data) return;
    const gloss = glossRef.current;
    if (!gloss) return;
    gsap.set(gloss, { left: "-60%", opacity: 0.34 });
    const loop = gsap.to(gloss, {
      left: "120%",
      opacity: 0.54,
      duration: 1.3,
      repeat: -1,
      ease: "power2.inOut",
      yoyo: false,
      delay: 0.3,
      onUpdate: () => { },
      onRepeat: () => {
        gsap.set(gloss, { left: "-60%", opacity: 0.34 });
      },
    });
    return () => loop && loop.kill();
  }, [data]);

  if (!data) return null;

  const bgImageUrl = data.backgroundImage?.asset?.url || "https://ehtazgziwtjqm5ww.public.blob.vercel-storage.com/HomePage/Sign%20Up%20Section.webp";

  return (
    <div
      className="w-full flex justify-center items-center pt-[8vw] pb-[6vw] md:pt-[10vw] lg:pt-[5vw] xl:pt-[3vw] md:pb-[8vw] lg:pb-[4vw] xl:pb-[2.5vw] px-[5vw] md:px-[6vw] lg:px-[4vw] xl:px-[2vw] border-b border-[#262626]"
      style={{ overflow: "visible" }}
    >
      <motion.div
        className="w-[101%] mx-auto rounded-[2.5vw] md:rounded-[3vw] lg:rounded-[1.5vw] xl:rounded-[0.9vw] shadow-lg flex flex-col items-center justify-center p-[5vw] md:p-[8vw_4vw] lg:p-[4vw_2vw] xl:p-[2.2vw_1.5vw] min-h-[40vw] md:min-h-[45vw] lg:min-h-[25vw] xl:min-h-[20vw]"
        style={{
          backgroundImage: `url('${bgImageUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          border: "1px solid #333",
          boxShadow: "0 6px 30px 0 #16161669",
          position: "relative",
          overflow: "visible",
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h2
          className="text-white px-[2vw] font-bold text-[6.5vw] md:text-[7vw] lg:text-[5vw] xl:text-[3.8vw] mb-[1.5vw] md:mb-[2.5vw] lg:mb-[1.5vw] xl:mb-[0.5vw] leading-tight font-['Share_Tech'] text-center"
          style={{ letterSpacing: "0.04em", fontFamily: "var(--font-peakers)" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          {data.heading || "JOIN THE FAMILY"}
        </motion.h2>

        <motion.p
          className="text-[#e7e7e7e0] text-[3.5vw] sm:text-[3vw] md:text-[3.5vw] lg:text-[2vw] xl:text-[1.35vw] font-sans mb-[2vw] md:mb-[3vw] lg:mb-[1vw] xl:mb-[0.5vw] mt-[0.5vw] md:mt-[1vw] lg:mt-0 text-center max-w-[90vw] md:max-w-[80vw] lg:max-w-[60vw] xl:max-w-max"
          style={{ fontWeight: 300, letterSpacing: "0.01em", lineHeight: "1.4" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        >
          {data.description || "Sign up for the Peckers loyalty scheme and get a free milkshake on us today."}
        </motion.p>

        <motion.p
          className="text-[#888888] italic text-[2.8vw] sm:text-[2.4vw] md:text-[2.8vw] lg:text-[1.5vw] xl:text-[1vw] font-sans mb-[5vw] md:mb-[6vw] lg:mb-[3vw] xl:mb-[2vw] mt-0 text-center max-w-[90vw] md:max-w-[80vw] lg:max-w-[60vw] xl:max-w-max"
          style={{ fontWeight: 300, letterSpacing: "0.01em", lineHeight: "1.4" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
        >
          {data.subText || "Collect chicken heads as you go. Earn rewards at 3 and 6, then reach 10 for a free meal"}
        </motion.p>

        <motion.div
          style={{ position: "relative", width: "fit-content" }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: "backOut", delay: 0.42 }}
        >
          <button
            className="bg-black text-white px-[6vw] md:px-[8vw] lg:px-[3vw] xl:px-[2vw] py-[3vw] md:py-[4vw] lg:py-[1.5vw] xl:py-[1.2vw] rounded-[2.5vw] md:rounded-[3vw] lg:rounded-[1vw] xl:rounded-[0.8vw] font-mono text-[3.2vw] md:text-[3.5vw] lg:text-[1.5vw] xl:text-[1.15vw] tracking-[0.07em] transition-all duration-150 hover:bg-[#232323] hover:scale-[1.04] focus:outline-none mx-auto relative overflow-hidden border-0 border-white"
            style={{
              letterSpacing: "0.11em",
              fontWeight: 500,
              boxShadow: "0 2px 10px #0004",
              display: "block",
              backgroundClip: "padding-box",
            }}
          >
            <span
              ref={glossRef}
              style={{
                position: "absolute",
                top: "-30%",
                left: "-60%",
                width: "44%",
                height: "165%",
                background:
                  "linear-gradient(120deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.82) 48%, rgba(255,255,255,0.11) 80%)",
                filter: "blur(0.05vw)",
                borderRadius: "inherit",
                pointerEvents: "none",
                opacity: 0.44,
                zIndex: 2,
                transform: "rotate(-14deg)",
              }}
            ></span>
            <span style={{ position: "relative", zIndex: 3 }}>{data.buttonText || "CLAIM MY SHAKE"}</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
