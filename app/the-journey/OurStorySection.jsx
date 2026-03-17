"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from "../../sanity/lib/image";

export default function OurStorySection({ initialData = null }) {
  const [data, setData] = useState(initialData);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSubSlide, setCurrentSubSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset sub-slide when main slide changes
  useEffect(() => {
    setCurrentSubSlide(0);
  }, [currentSlide]);

  if (!data) return null;

  // Use slides from Sanity if available, otherwise fallback to default mocked slides
  const slides = (data.slides && data.slides.length > 0)
    ? data.slides.map((s, idx) => ({ ...s, id: idx + 1 }))
    : [
      { ...data, id: 1 },
      { ...data, id: 2, heading: data.heading || "A FAMILY LEGACY, REIMAGINED", quote: data.quote || "This wasn’t built in a boardroom.", content: data.content },
      { ...data, id: 3, heading: data.heading || "A FAMILY LEGACY, REIMAGINED", quote: data.quote || "This wasn’t built in a boardroom.", content: data.content },
    ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      filter: isMobile ? "none" : "blur(20px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      filter: isMobile ? "none" : "blur(20px)",
    }),
  };

  const subSlideVariants = {
    enter: {
      opacity: 0,
      x: 50,
    },
    center: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: -50,
    },
  };

  const currentData = slides[currentSlide];

  // Get images for the current slide (sub-carousel)
  const displayImages = (currentData.storyImages && currentData.storyImages.length > 0)
    ? currentData.storyImages
    : [currentData.founderImage || data.founderImage].filter(Boolean);

  // Auto-slide internal images
  useEffect(() => {
    if (displayImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSubSlide((prev) => (prev + 1) % displayImages.length);
    }, 3000); // 3 seconds per internal image
    return () => clearInterval(timer);
  }, [currentSlide, displayImages.length]);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section className="relative w-full lg:min-h-[105vh] bg-black px-[1.5vw] pt-0 lg:pt-[15vh] pb-[5vw] lg:pb-0 text-white flex flex-col justify-start items-center overflow-hidden">
      <div className="absolute -top-[15vw] right-0 w-[52%] md:w-1/2 h-[70vw] md:h-auto md:bottom-0 pointer-events-none z-0 overflow-hidden">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 560 906"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="opacity-100"
        >
          <rect
            x="0.603188"
            y="0.489236"
            width="719"
            height="925.958"
            transform="matrix(1 0 0.206376 0.978473 -0.100967 -0.989468)"
            fill="#171717"
            stroke="black"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full flex flex-col lg:flex-row items-start lg:items-center justify-center pt-[0vw] md:pt-0">

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                nextSlide();
              } else if (swipe > swipeConfidenceThreshold) {
                prevSlide();
              }
            }}
            transition={{
              x: { type: "spring", stiffness: 450, damping: 40 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
              filter: { duration: 0.2 },
            }}
            /* CHANGED: flex-col-reverse for mobile stacked layout (image top, text bottom), lg:flex-row for desktop */
            className="w-full flex flex-col-reverse lg:flex-row items-center justify-start lg:justify-center cursor-grab active:cursor-grabbing"
          >
            {/* CHANGED: Text Container w-full on mobile, added top margin for mobile spacing */}
            <div className="w-full lg:w-1/2 px-[6vw] lg:px-[6vw] flex flex-col justify-start mt-[8vw] lg:mt-0 overflow-hidden text-left">
              <motion.div
                className="mb-1 flex items-center justify-start"
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={isMobile ? { duration: 0 } : { duration: 0.6, ease: "easeOut", delay: 0.1 }}
              >
                <div className="w-6 lg:w-10 h-px bg-white/40"></div>
                {/* CHANGED: Increased mobile text sizes, preserved desktop */}
                <span className="ml-2 lg:ml-4 text-gray-400 font-anton tracking-[0.11em] text-[3.5vw] md:text-[2.5vw] lg:text-[1.2vw] uppercase">STORY {currentSlide + 1}</span>
              </motion.div>

              {/* CHANGED: Increased heading size for mobile */}
              <motion.h2
                className="font-bold font-peakers text-[9vw] md:text-[7vw] lg:text-[68px] leading-[1.1] lg:leading-[1.3] uppercase mt-2 bg-linear-to-r from-gray-100 to-gray-600 bg-clip-text text-transparent"
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={isMobile ? { duration: 0 } : { duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                {(() => {
                  const heading = currentData.heading || "A FAMILY LEGACY, REIMAGINED";
                  if (heading.includes(",")) {
                    const parts = heading.split(",");
                    return (
                      <>
                        {parts[0]}
                        <br />
                        {parts.slice(1).join(",")}
                      </>
                    );
                  }
                  return heading;
                })()}
              </motion.h2>

              {/* CHANGED: Increased body text size for mobile */}
              <motion.div
                className="text-[#D1D5DB] font-peakers text-[4.5vw] md:text-[3vw] lg:text-[1.15vw] leading-[1.6] max-w-full lg:max-w-[40vw] py-[5vw] lg:py-[2vw] space-y-4 lg:space-y-6"
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={isMobile ? { duration: 0 } : { duration: 0.6, ease: "easeOut", delay: 0.3 }}
              >
                {(() => {
                  if (!currentData.content) return <p>Content reveal in progress...</p>;

                  const contentArray = Array.isArray(currentData.content)
                    ? currentData.content
                    : typeof currentData.content === 'string'
                      ? currentData.content.split('\n').filter(p => p.trim() !== '')
                      : [currentData.content];

                  return contentArray.map((para, i) => (
                    <p key={i}>{para}</p>
                  ));
                })()}

                <div className="pt-4 lg:pt-6">
                  {/* CHANGED: Increased quote text size for mobile */}
                  <p className="border-l-2 font-sans font-extralight border-white/30 pl-3 lg:pl-6 text-[#9CA3AF] text-left text-[3.5vw] md:text-[2vw] lg:text-inherit">
                    {currentData.quote || "This wasn’t built in a boardroom."}
                  </p>
                </div>
              </motion.div>

              <div className="flex items-center justify-start gap-1 lg:gap-2 mt-4 lg:mt-2 pb-[6vw] lg:pb-4">
                {slides.map((_, i) => (
                  <div key={i} className={`h-0.5 lg:h-1 w-4 lg:w-12 transition-all duration-300 rounded-full ${i === currentSlide ? "bg-white" : "bg-white/10"}`}></div>
                ))}
              </div>
            </div>

            {/* CHANGED: Image Container is full width on mobile */}
            <div className="w-full lg:w-1/2 h-auto px-[4vw] lg:px-[2vw] flex flex-col items-start justify-center mt-0 lg:mt-[-3vw]">
              {/* CHANGED: h-[65vw] reduces mobile image vertical gap while preserving larger sizes for tablet/desktop */}
              <div className="relative w-full h-[65vw] md:h-[80vw] lg:h-[50vw] overflow-hidden flex items-center justify-start lg:justify-center px-0 lg:px-4">
                <AnimatePresence mode="wait">
                  {displayImages.length > 0 && (
                    <motion.div
                      key={`${currentSlide}-${currentSubSlide}`}
                      variants={subSlideVariants}
                      initial="enter"
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: (isMobile || currentSlide === 0) && (currentSubSlide % displayImages.length) === 0 ? 0.9 : 1
                      }}
                      exit="exit"
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className={`absolute top-0 lg:top-0 left-0 lg:left-[4vw] right-0 lg:right-[2vw] bottom-0 lg:bottom-0 w-full h-full rounded-[1.2vw] overflow-hidden`}
                    >
                      <Image
                        src={urlFor(displayImages[currentSubSlide % displayImages.length]).url()}
                        alt={`Story Image ${currentSubSlide + 1}`}
                        fill
                        className="object-contain rounded-[1.2vw]"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={currentSubSlide === 0}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Reveal Panels - improved horizontal cinematic unveiling when switching main stories */}
                <motion.div
                  initial={{ x: "0%" }}
                  animate={{ x: "101%" }}
                  key={`panel1-${currentSlide}`}
                  transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}
                  className="absolute top-0 left-0 w-full h-1/3 bg-black z-30"
                />
                <motion.div
                  initial={{ x: "0%" }}
                  animate={{ x: "101%" }}
                  key={`panel2-${currentSlide}`}
                  transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.25 }}
                  className="absolute top-1/3 left-0 w-full h-1/3 bg-black z-30"
                />
                <motion.div
                  initial={{ x: "0%" }}
                  animate={{ x: "101%" }}
                  key={`panel3-${currentSlide}`}
                  transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.4 }}
                  className="absolute top-2/3 left-0 w-full h-1/3 bg-black z-30"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prevSlide}
          className="hidden lg:flex absolute left-1 md:left-4 top-[50%] -translate-y-1/2 z-50 items-center justify-center w-8 h-8 md:w-14 md:h-14 border border-white/10 rounded-full bg-black/40 backdrop-blur-lg hover:bg-white hover:text-black transition-all duration-300 active:scale-75"
        >
          <svg width="16" height="16" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="hidden lg:flex absolute right-1 md:right-4 top-[50%] -translate-y-1/2 z-50 items-center justify-center w-8 h-8 md:w-14 md:h-14 border border-white/10 rounded-full bg-black/40 backdrop-blur-lg hover:bg-white hover:text-black transition-all duration-300 active:scale-75"
        >
          <svg width="16" height="16" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        {isMobile && (
          <div className="absolute bottom-[4vw] right-[6vw] flex flex-col items-end gap-2 lg:hidden pointer-events-none z-50">
            <div className="flex flex-col items-end gap-1">
              <motion.span
                className="text-[2vw] md:text-[1.5vw] font-mono tracking-[0.5em] text-white/30 uppercase mr-[-0.5em]"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                SWIPE STORY
              </motion.span>
              <div className="relative w-16 h-px bg-white/5 overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full w-1/2 bg-linear-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "circIn" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}