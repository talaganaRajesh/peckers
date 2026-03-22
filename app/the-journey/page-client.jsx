"use client";
import React, { useState, useRef, useEffect } from "react";
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
  const [navbarHeight, setNavbarHeight] = useState(88);
  const [viewportHeight, setViewportHeight] = useState(900);

  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.getElementById("main-navbar");
      if (!navbar) return;
      const measuredHeight = Math.ceil(navbar.getBoundingClientRect().height);
      if (measuredHeight > 0) {
        setNavbarHeight(measuredHeight);
      }
    };

    updateNavbarHeight();
    window.addEventListener("resize", updateNavbarHeight);
    return () => window.removeEventListener("resize", updateNavbarHeight);
  }, []);

  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight || 900);
    };

    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);
    return () => window.removeEventListener("resize", updateViewportHeight);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001
  });

  // Opacity for the SVG based on scroll
  const mappedProgress = useTransform(smoothScrollProgress, [0, 0.9], [0, 1]);
  const springPath = useSpring(mappedProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const svgOpacity = useTransform(smoothScrollProgress, [0, 0.02], [0, 1]);
  const pinnedTopOffset = `${navbarHeight}px`;
  const pinnedHeight = `calc(100vh - ${navbarHeight}px)`;
  const availableHeight = Math.max(620, viewportHeight - navbarHeight);
  const timelineScale = Math.min(1.1, Math.max(0.9, availableHeight / 760));
  const timelineTopPadding = Math.max(154, Math.min(240, availableHeight * 0.27));
  const timelineShiftY = Math.max(18, Math.min(42, availableHeight * 0.04));

  return (
    <div id="main-content">

      <OurStorySection initialData={pageData} />

      <MobileRoadmap initialData={bottomPageData?.mobileRoadmap} />

      <div className="hidden lg:block bg-black">
        {/* Tall container to provide scroll distance for pinning */}
        <div ref={containerRef} className="relative h-[300vh] xl:h-[300vh] bg-black">
          {/* Pinned viewport: section freezes while scroll drives timeline progress */}
          <div
            className="sticky w-full bg-black z-20 overflow-visible"
            style={{ top: pinnedTopOffset, height: pinnedHeight }}
          >
            <div className="absolute top-0 left-0 right-0 z-40">
              <StoryCircle initialData={pageData} />
            </div>

            <div className="absolute inset-0 flex flex-col items-center z-50" style={{ paddingTop: `${timelineTopPadding}px` }}>
              <div
                className="w-full h-full flex flex-col items-center justify-start relative z-100"
                style={{ transform: `translateY(${timelineShiftY}px) scale(${timelineScale})`, transformOrigin: "top center" }}
              >
                <ActualCircle initialData={pageData} scrollProgress={smoothScrollProgress} />

                <div className="w-full relative z-110 flex justify-center mt-[0.2vw] pt-0 min-h-[42vw] md:min-h-[17vw]">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-20%" }}
                      transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[30vw] md:w-[12.2vw]"
                    >
                      <img src="https://ehtazgziwtjqm5ww.public.blob.vercel-storage.com/Logo%20image%20peckers.png" alt="Peckers Logo" className="w-full h-auto drop-shadow-2xl" />
                    </motion.div>
                    <svg width="1038" height="454" viewBox="0 0 1038 454" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[90vw] md:w-[53vw] h-auto md:transform-[scaleY(0.95)] md:origin-center overflow-visible">
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
                              opacity: useTransform(smoothScrollProgress, [0.02 + i * 0.1, 0.08 + i * 0.1], [0, 1]),
                              scale: useTransform(smoothScrollProgress, [0.02 + i * 0.1, 0.08 + i * 0.1], [0, 1])
                            }}
                            cx={cx} cy="21" r="5" fill="#EAB308"
                          />
                        ))}

                        {/* Bottom Dots - Animated by transform */}
                        {[828, 519, 210].map((cx, i) => (
                          <motion.circle
                            key={`bottom-${i}`}
                            style={{
                              opacity: useTransform(smoothScrollProgress, [0.45 + i * 0.1, 0.52 + i * 0.1], [0, 1]),
                              scale: useTransform(smoothScrollProgress, [0.45 + i * 0.1, 0.52 + i * 0.1], [0, 1])
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
                <div className="mt-0 pb-0 w-full relative z-120">
                  <ActualCircle2 initialData={bottomTimeline} scrollProgress={smoothScrollProgress} />
                </div>
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