"use client";

import { motion } from "framer-motion";

export default function CaptionBelowNews({ caption = "Stay up to date with our shenanigans, limited drops, and questionable life choices." }) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[90vw] md:w-[80vw] flex flex-col items-center pt-[2vw] md:pt-5">
        <motion.div
          className="relative flex items-center justify-center my-[2vw] md:my-[0.6vw]"
          style={{
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
            height: "2.5px",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div
            className="absolute top-0 h-full bg-[#fff3] origin-center"
            style={{
              width: "140%",
              borderBottom: "2.5px solid #fff3",
              borderRadius: 2,
              pointerEvents: "none",
            }}
          />
          <div style={{ width: "100%", height: "2.5px", visibility: "hidden" }} />
        </motion.div>

        <div className="flex items-start px-[4.5vw] md:px-[14vw] w-full mt-[4vw] md:mt-[0.6vw] justify-center">
          <motion.svg
            viewBox="0 0 14 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-none mr-[2vw] md:mr-[1vw] mt-[1.5vw] md:mt-[0.15vw] w-[3vw] md:w-[14px] h-[8vw] md:h-[48px]"
            aria-hidden="true"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            <rect x="4" y="0" width="4" height="30" rx="1" fill="#fff" />
          </motion.svg>

          <motion.span
            className="text-white text-[3.6vw] sm:text-[3vw] md:text-[2vw] xl:text-[1.3vw] leading-[5.5vw] md:leading-[3vw] xl:leading-[1.7vw] font-sans font-light text-left tracking-wide inline-block"
            style={{ letterSpacing: ".005em" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            {caption || "Stay up to date with our shenanigans, limited drops, and questionable life choices."}
          </motion.span>
        </div>
      </div>
    </div>
  );
}