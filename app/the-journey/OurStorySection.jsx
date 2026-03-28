"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from "../../sanity/lib/image";

export default function OurStorySection({ initialData = null }) {
  const data = initialData;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSubSlide, setCurrentSubSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Use slides from Sanity if available, otherwise fallback to default mocked slides
  const slides = (data?.slides && data.slides.length > 0)
    ? data.slides.map((s, idx) => ({ ...s, id: idx + 1 }))
    : data
      ? [
        { ...data, id: 1 },
        { ...data, id: 2, heading: data.heading || "A FAMILY LEGACY, REIMAGINED", content: data.content },
        { ...data, id: 3, heading: data.heading || "A FAMILY LEGACY, REIMAGINED", content: data.content },
      ]
      : [];

  const nextSlide = () => {
    setDirection(1);
    setCurrentSubSlide(0);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSubSlide(0);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const bodyVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 32 : -32,
      opacity: 0,
      filter: "blur(2px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (dir) => ({
      x: dir > 0 ? -32 : 32,
      opacity: 0,
      filter: "blur(2px)",
    }),
  };

  const imageVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 36 : -36,
      opacity: 0,
      scale: 0.985,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -36 : 36,
      opacity: 0,
      scale: 0.985,
    }),
  };

  const currentData = slides[currentSlide] || {};
  const fixedHeading = slides[0]?.heading || data?.heading || "A FAMILY LEGACY, REIMAGINED";
  const fixedSubHeading =
    slides.find((slide) => typeof slide.subHeading === "string" && slide.subHeading.trim() !== "")?.subHeading ||
    data?.subHeading ||
    data?.subtitle ||
    "";

  // Get images for the current slide (sub-carousel)
  const displayImages = (currentData.storyImages && currentData.storyImages.length > 0)
    ? currentData.storyImages
    : [currentData.founderImage || data?.founderImage].filter(Boolean);

  // Auto-slide internal images
  useEffect(() => {
    if (!data) return;
    if (displayImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSubSlide((prev) => (prev + 1) % displayImages.length);
    }, 15000); // 15 seconds per internal image
    return () => clearInterval(timer);
  }, [data, currentSlide, displayImages.length]);

  if (!data) return null;

  return (
    <section className="relative w-full lg:min-h-[80vh] bg-black px-[1.5vw] pt-[1vh] lg:pt-[5vh] pb-[9vh] lg:pb-0 mb-0 text-white flex flex-col justify-start items-center overflow-hidden">
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

      <div className="relative z-10 w-full flex flex-col lg:flex-row items-start lg:items-center justify-center pt-0">
        <div className="w-full flex flex-col-reverse lg:flex-row items-center lg:items-start justify-start lg:justify-center gap-y-6 lg:gap-y-0 lg:gap-x-2">
          <div className="relative w-full lg:w-1/2 px-[5vw] lg:px-[5vw] flex flex-col justify-start mt-[4vw] lg:mt-0 overflow-hidden text-left h-[56vh] md:h-[60vh] lg:h-[67vh]">
            <div className="h-full min-h-0 flex flex-col">
              <h2 className="font-bold font-peakers text-[7.2vw] md:text-[5.2vw] lg:text-[48px] leading-[1.05] lg:leading-[1.2] uppercase mt-2 lg:mt-0 bg-linear-to-r from-gray-100 to-gray-600 bg-clip-text text-transparent whitespace-nowrap overflow-hidden text-ellipsis">
                {fixedHeading}
              </h2>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`body-${currentSlide}`}
                  custom={direction}
                  variants={bodyVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  data-lenis-prevent
                  className="custom-scrollbar text-[#D1D5DB] font-peakers text-[4.5vw] md:text-[3vw] lg:text-[1.15vw] leading-[1.6] max-w-full lg:max-w-[40vw] pt-[3vw] lg:pt-[3vw] pb-2 flex-1 min-h-0 overflow-y-scroll overscroll-contain pr-2"
                >
                  {(() => {
                    const bodyArray = currentData.content || currentData.bodyText;
                    if (!bodyArray || (Array.isArray(bodyArray) && bodyArray.length === 0) || (typeof bodyArray === 'string' && bodyArray.trim() === '')) {
                      return <p>Content reveal in progress...</p>;
                    }

                    const contentString = Array.isArray(bodyArray)
                      ? bodyArray
                        .map((item) => (typeof item === 'string' ? item : String(item)))
                        .join('\n')
                      : typeof bodyArray === 'string'
                        ? bodyArray
                        : String(bodyArray);

                    return (
                      <div className="whitespace-pre-wrap break-normal">
                        {contentString}
                      </div>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>
 
               <button
                 onClick={nextSlide}
                 className="flex absolute right-1 md:right-4 top-[50%] -translate-y-1/2 lg:right-4 z-50 items-center justify-center w-8 h-8 md:w-14 md:h-14 border border-white/10 rounded-full bg-black/40 backdrop-blur-lg hover:bg-white hover:text-black transition-all duration-300 active:scale-75"
               >
                 <svg width="16" height="16" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M5 12h14M12 5l7 7-7 7" />
                 </svg>
               </button>

              <div className="flex items-center justify-start gap-1 lg:gap-2 mt-4 lg:mt-3 pb-0 lg:pb-1 shrink-0">
                {slides.map((_, i) => (
                  <div key={i} className={`h-0.5 lg:h-1 w-4 lg:w-12 transition-all duration-300 rounded-full ${i === currentSlide ? "bg-white" : "bg-white/10"}`}></div>
                ))}
              </div>

              {fixedSubHeading && (
                <p className="text-zinc-500 font-peakers text-[4.2vw] md:text-[2.9vw] lg:text-[1.1vw] leading-[1.45] max-w-full lg:max-w-[42vw] mt-3 lg:mt-4 pb-0 shrink-0">
                  {fixedSubHeading}
                </p>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/2 h-auto px-[4vw] lg:px-[2vw] flex flex-col items-start lg:justify-start justify-center mt-0 lg:mt-0">
            <div className="relative w-full h-[60vw] md:h-[74vw] lg:h-[62vh] overflow-hidden flex items-center lg:items-start justify-start lg:justify-center px-0 lg:px-4">
              <AnimatePresence mode="wait" custom={direction}>
                {displayImages.length > 0 && (
                  <motion.div
                    key={`image-${currentSlide}-${currentSubSlide}`}
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-0 lg:top-0 left-0 lg:left-0 right-0 lg:right-0 bottom-0 lg:bottom-0 w-full h-full rounded-[1.2vw] overflow-hidden"
                  >
                    <Image
                      src={urlFor(displayImages[currentSubSlide % displayImages.length]).url()}
                      alt={`Story Image ${currentSubSlide + 1}`}
                      fill
                      className="object-contain lg:object-top rounded-[1.2vw]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={currentSubSlide === 0}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="flex absolute left-1 md:left-4 top-[50%] -translate-y-1/2 z-50 items-center justify-center w-8 h-8 md:w-14 md:h-14 border border-white/10 rounded-full bg-black/40 backdrop-blur-lg hover:bg-white hover:text-black transition-all duration-300 active:scale-75"
        >
          <svg width="16" height="16" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </section>
  );
}