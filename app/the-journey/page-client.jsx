"use client";
import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import OurStorySection from "./OurStorySection";
import StoryCircle from "./StoryCircle";
import ActualCircle from "./ActualCircle";
import ActualCircle2 from "./ActualCircle2";
import MobileRoadmap from "./MobileRoadmap";
import JourneyIntroSection from "./JourneyHeader";

const OurStoryPage = ({ initialStoryData }) => {
  const { pageData, bottomPageData, bottomTimeline } = initialStoryData || {};
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Opacity for the SVG based on scroll
  const mappedProgress = useTransform(scrollYProgress, [0, 0.98], [0, 1]);
  const springPath = useSpring(mappedProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001
  });

  const svgOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div id="main-content">

      <OurStorySection initialData={pageData} />

      <MobileRoadmap initialData={bottomPageData?.mobileRoadmap} />

      <div className="hidden lg:block">
        <div className="bg-black">
          <StoryCircle initialData={pageData} />
        </div>
        {/* Tall container to provide scroll distance for pinning */}
        <div ref={containerRef} className="relative h-[350vh] ">
          {/* Sticky wrapper to keep content in view during animation */}
          <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black z-20">

            <div className="w-full relative flex flex-col items-center">
              <ActualCircle initialData={pageData} scrollProgress={scrollYProgress} />

              <div className="w-full relative flex justify-center mt-[-1vw] md:mt-[1vw] pt-0 min-h-[50vw] md:min-h-[18vw]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[30vw] md:w-[12vw]"
                  >
                    <img src="https://ehtazgziwtjqm5ww.public.blob.vercel-storage.com/Logo%20image%20peckers.png" alt="Peckers Logo" className="w-full h-auto drop-shadow-2xl" />
                  </motion.div>
                  <svg width="1038" height="454" viewBox="0 0 1038 454" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[90vw] md:w-[45vw] h-auto overflow-visible">
                    <motion.g
                      style={{ opacity: svgOpacity }}
                      filter="url(#filter0_d_297_13)"
                    >
                      <path d="M20 227C20 112.677 112.677 20 227 20H811C925.323 20 1018 112.677 1018 227C1018 341.323 925.323 434 811 434H227C112.677 434 20 341.323 20 227Z" fill="transparent" />

                      <motion.path
                        style={{ pathLength: springPath, opacity: 1 }}
                        d="M227 21H811C924.771 21 1017 113.229 1017 227C1017 340.771 924.771 433 811 433H227C113.229 433 21 340.771 21 227C21 113.674 112.51 21.7204 225.668 21.0039L227 21Z"
                        stroke="white"
                        strokeWidth="2"
                      />

                      {/* Top Dots - Animated by transform */}
                      {[210, 519, 828].map((cx, i) => (
                        <motion.circle
                          key={`top-${i}`}
                          style={{
                            opacity: useTransform(scrollYProgress, [0 + i * 0.08, 0.05 + i * 0.08], [0, 1]),
                            scale: useTransform(scrollYProgress, [0 + i * 0.08, 0.05 + i * 0.08], [0, 1])
                          }}
                          cx={cx} cy="21" r="5" fill="#EAB308"
                        />
                      ))}

                      {/* Bottom Dots - Animated by transform */}
                      {[828, 519, 210].map((cx, i) => (
                        <motion.circle
                          key={`bottom-${i}`}
                          style={{
                            opacity: useTransform(scrollYProgress, [0.55 + i * 0.08, 0.6 + i * 0.08], [0, 1]),
                            scale: useTransform(scrollYProgress, [0.55 + i * 0.08, 0.6 + i * 0.08], [0, 1])
                          }}
                          cx={cx} cy="433" r="5" fill="#EAB308"
                        />
                      ))}
                    </motion.g>
                    <defs>
                      <filter id="filter0_d_297_13" x="0" y="0" width="1038" height="454" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset />
                        <feGaussianBlur stdDeviation="10" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_297_13" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_297_13" result="shape" />
                      </filter>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="mt-[0vw] pb-10 w-full">
                <ActualCircle2 initialData={bottomTimeline} scrollProgress={scrollYProgress} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <JourneyIntroSection initialData={bottomPageData?.journeySection} />

    </div >
  )
}

export default OurStoryPage;