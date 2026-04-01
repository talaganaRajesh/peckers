"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";

export default function SaucePageOne({ initialData = [] }) {
  const TRANSITION_MS = 600;
  const [fetchedSaucesData, setFetchedSaucesData] = useState([]);
  const [isFetching, setIsFetching] = useState(initialData.length === 0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [slideDirection, setSlideDirection] = useState("next");
  const [rotation, setRotation] = useState(0);
  const transitionTimeout = useRef(null);

  const saucesData = initialData.length > 0 ? initialData : fetchedSaucesData;
  const loading = initialData.length === 0 && isFetching;

  useEffect(() => {
    if (initialData && initialData.length > 0) return;

    const fetchSauces = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "saucePage"] | order(_createdAt asc)`,
        );
        setFetchedSaucesData(data);
        setIsFetching(false);
      } catch (error) {
        console.error("Error fetching sauces:", error);
        setIsFetching(false);
      }
    };
    fetchSauces();
  }, [initialData]);

  const ringItemsBase =
    saucesData.length > 1
      ? [
          { sauce: saucesData[0], index: 0 },
          ...saucesData
            .slice(1)
            .map((sauce, index) => ({ sauce, index: index + 1 }))
            .reverse(),
        ]
      : saucesData.map((sauce, index) => ({ sauce, index }));
  const ringItems = ringItemsBase.map((item, idx) => ({
    ...item,
    id: `ring-item-${item.index}-${idx}`,
  }));

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    updateIsDesktop();
    window.addEventListener("resize", updateIsDesktop);
    return () => window.removeEventListener("resize", updateIsDesktop);
  }, []);

  const ringGapUnits = isDesktop ? 0 : 2.25;

  const ringLabels = ringItems.map((item) => {
    let title = (item.sauce?.title || "")
      .trim()
      .replace(/\s+/g, " ")
      .toUpperCase();
    if (title.startsWith("AYONNAISE")) title = "M" + title;
    if (/\bSAUCE$/.test(title)) {
      title = title.replace(/\s*SAUCE$/, " SAUCE").trim();
    } else {
      title = `${title} SAUCE`;
    }
    return `${title} •`;
  });

  const ringLayout = ringLabels.reduce(
    (acc, label) => {
      const start = acc.cursor;
      const center = start + label.length / 2;
      return {
        cursor: start + label.length + ringGapUnits,
        starts: [...acc.starts, start],
        centers: [...acc.centers, center],
      };
    },
    { cursor: 0, starts: [], centers: [] },
  );

  const ringTotalUnits = Math.max(ringLayout.cursor, 1);
  const ringStartOffsetsData = ringLayout.starts.map(
    (start) => (start / ringTotalUnits) * 100,
  );
  const ringCenterOffsetsData = ringLayout.centers.map(
    (center) => (center / ringTotalUnits) * 100,
  );
  const ringOffsets = ringStartOffsetsData.map((offset) => `${offset}%`);
  const baseRotation = 90 - (ringCenterOffsetsData[0] || 0) * 3.6;

  const clearPrevIndex = () => {
    if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    transitionTimeout.current = setTimeout(() => {
      setPrevIndex(null);
      transitionTimeout.current = null;
    }, TRANSITION_MS + 20);
  };

  const transitionToIndex = (targetIndex) => {
    if (!saucesData.length || targetIndex === currentIndex) return;

    const targetRingIndices = ringItems
      .map((item, idx) => (item.index === targetIndex ? idx : -1))
      .filter((idx) => idx !== -1);

    const currentRingIdx = ringItems.findIndex(
      (item) => item.index === currentIndex,
    );
    const currentPos = ringCenterOffsetsData[currentRingIdx] * 3.6;

    let bestDelta = 999;
    targetRingIndices.forEach((idx) => {
      const pos = ringCenterOffsetsData[idx] * 3.6;
      let d = pos - currentPos;
      while (d > 180) d -= 360;
      while (d < -180) d += 360;
      if (Math.abs(d) < Math.abs(bestDelta)) bestDelta = d;
    });

    setSlideDirection(bestDelta > 0 ? "next" : "prev");
    setPrevIndex(currentIndex);
    setCurrentIndex(targetIndex);
    setRotation((prev) => prev - bestDelta);
    clearPrevIndex();
  };

  const nextSlide = () => {
    const nextIdx = (currentIndex + 1) % saucesData.length;
    transitionToIndex(nextIdx);
  };

  const prevSlide = () => {
    const nextIdx = (currentIndex - 1 + saucesData.length) % saucesData.length;
    transitionToIndex(nextIdx);
  };

  useEffect(() => {
    return () => {
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (!saucesData || saucesData.length === 0) return;

    // Preload all background and sauce images onto the browser's cache
    saucesData.forEach((sauce) => {
      if (typeof window !== "undefined") {
        if (sauce.bgImage) {
          const img = new window.Image();
          img.src = urlFor(sauce.bgImage).width(1920).auto("format").url();
        }
        if (sauce.sauceImage) {
          const img = new window.Image();
          img.src = urlFor(sauce.sauceImage)
            .width(1400)
            .height(1400)
            .fit("crop")
            .crop("center")
            .auto("format")
            .url();
        }
      }
    });
  }, [saucesData]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl font-bold animate-pulse">
          Loading Sauces...
        </div>
      </div>
    );
  }

  if (!saucesData || saucesData.length === 0) return null;

  return (
    <div className="relative w-full h-full overflow-hidden bg-black flex flex-col items-center">
      <div className="relative w-full h-full">
        {saucesData.map((sauce, idx) => {
          const isCurrent = idx === currentIndex;
          const isPrev = prevIndex !== null && idx === prevIndex;
          const isVisible = isCurrent || isPrev;
          const isNext = idx === (currentIndex + 1) % saucesData.length;
          const isNear = isVisible || isNext;
          const isTransitioning = prevIndex !== null;

          const imageAnimationClass =
            isCurrent && isTransitioning
              ? "sauce-pop-from-top"
              : isPrev && isTransitioning
                ? "sauce-pop-down"
                : "";

          const wrapperFadeClass =
            isCurrent && isTransitioning ? "sauce-layer-fade-in" : "";
          const bgDissolveClass =
            isCurrent && isTransitioning ? "sauce-bg-dissolve-in" : "";
          const wrapperZ = isCurrent ? "z-20" : isPrev ? "z-10" : "z-0";

          return (
            <div
              key={sauce._id}
              className={`absolute top-0 left-0 w-full h-full ${isVisible ? "opacity-100" : "opacity-0"} ${wrapperZ} ${wrapperFadeClass}`}
            >
              <div className="relative w-full h-full flex flex-col items-center bg-black">
                {/* BACKGROUND IMAGE */}
                {sauce.bgImage && isNear && (
                  <Image
                    src={urlFor(sauce.bgImage).width(1920).auto("format").url()}
                    alt={`${sauce.title} Background`}
                    width={1280}
                    height={720}
                    className={`absolute inset-0 w-full h-full object-cover object-top md:object-center opacity-90 hidden md:block ${bgDissolveClass}`}
                    style={{
                      zIndex: 0,
                      transform: sauce.title
                        ?.toLowerCase()
                        .includes("mayonnaise")
                        ? "scale(1.1) translateX(-5%)"
                        : "scale(1)",
                      transformOrigin: "center center",
                      objectPosition: sauce.title
                        ?.toLowerCase()
                        .includes("mayonnaise")
                        ? "25% center"
                        : "center center",
                    }}
                    priority={
                      idx === 0 ||
                      idx === (currentIndex + 1) % saucesData.length
                    }
                  />
                )}

                {/* TEXT SECTION */}
                <div
                  className={`absolute top-[1.2rem] sm:top-[1.4rem] md:top-[1rem] lg:top-[0rem] xl:top-[0rem] left-1/2 -translate-x-1/2 text-center text-white w-[95%] sm:w-[90%] md:w-[65%] lg:w-[55%] xl:w-[48%] z-20`}
                >
                  {/* TITLE */}
                  <h1
                    className={`text-4xl sm:text-5xl md:text-[52px] lg:text-[60px] xl:text-[4vw] font-bold tracking-wide mb-2 sm:mb-3 md:mb-2 ${isCurrent && isTransitioning ? "sauce-title-fade-in" : ""}`}
                    style={{ fontFamily: "var(--font-peakers)" }}
                  >
                    {sauce.title}
                  </h1>

                  {/* DESCRIPTION */}
                  <div className="text-[13px] sm:text-[14px] md:text-[13px] lg:text-[14px] xl:text-[0.9vw] leading-[1.5em] font-bold font-sans tracking-wider space-y-1">
                    <p>
                      {sauce.descLine1}
                      <br />
                      {sauce.descLine2}
                    </p>
                    <p className="hidden sm:block">{sauce.descLine3}</p>
                  </div>

                  {/* FRESHLY MADE BADGE */}
                  <div className="flex flex-col items-center mt-3 md:mt-2 xl:mt-[0.8vw]">
                    <div className="mb-2">
                      <div className="px-3 sm:px-4 md:px-[1vw] py-1 md:py-[0.35vw] rounded-[100px] border border-white/20 flex items-center justify-center gap-1.5 sm:gap-2 md:gap-[0.5vw] bg-black/30 backdrop-blur-md">
                        <svg
                          width="10"
                          height="12"
                          viewBox="0 0 10 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-[8px] h-[10px] sm:w-[10px] sm:h-[12px] md:w-[0.85vw] md:h-[1vw]"
                        >
                          <path
                            d="M1.16667 6.41667C1.16667 6.92222 1.26875 7.40104 1.47292 7.85313C1.67708 8.30521 1.96875 8.70139 2.34792 9.04167C2.33819 8.99306 2.33333 8.94931 2.33333 8.91042C2.33333 8.87153 2.33333 8.82778 2.33333 8.77917C2.33333 8.46805 2.39167 8.17639 2.50833 7.90417C2.625 7.63194 2.79514 7.38403 3.01875 7.16042L4.66667 5.54167L6.31458 7.16042C6.53819 7.38403 6.70833 7.63194 6.825 7.90417C6.94167 8.17639 7 8.46805 7 8.77917C7 8.82778 7 8.82778 7 8.91042C7 8.94931 6.99514 8.99306 6.98542 9.04167C7.36458 8.70139 7.65625 8.30521 7.86042 7.85313C8.06458 7.40104 8.16667 6.92222 8.16667 6.41667C8.16667 5.93056 8.07674 5.47118 7.89687 5.03854C7.71701 4.6059 7.45694 4.21944 7.11667 3.87917C6.92222 4.00556 6.71806 4.10035 6.50417 4.16354C6.29028 4.22674 6.07153 4.25833 5.84792 4.25833C5.24514 4.25833 4.72257 4.05903 4.28021 3.66042C3.83785 3.26181 3.58264 2.77083 3.51458 2.1875C3.13542 2.50833 2.8 2.84132 2.50833 3.18646C2.21667 3.5316 1.97118 3.8816 1.77188 4.23646C1.57257 4.59132 1.42188 4.95347 1.31979 5.32292C1.21771 5.69236 1.16667 6.05694 1.16667 6.41667ZM4.66667 7.175L3.83542 7.99167C3.72847 8.09861 3.64583 8.22014 3.5875 8.35625C3.52917 8.49236 3.5 8.63333 3.5 8.77917C3.5 9.09028 3.61424 9.35764 3.84271 9.58125C4.07118 9.80486 4.34583 9.91667 4.66667 9.91667C4.9875 9.91667 5.26215 9.80486 5.49062 9.58125C5.7191 9.35764 5.83333 9.09028 5.83333 8.77917C5.83333 8.62361 5.80417 8.48021 5.74583 8.34896C5.6875 8.21771 5.60486 8.09861 5.49792 7.99167L4.66667 7.175ZM4.66667 0V1.925C4.66667 2.25556 4.7809 2.53264 5.00938 2.75625C5.23785 2.97986 5.51736 3.09167 5.84792 3.09167C6.02292 3.09167 6.18576 3.05521 6.33646 2.98229C6.48715 2.90937 6.62083 2.8 6.7375 2.65417L7 2.33333C7.71944 2.74167 8.28819 3.31042 8.70625 4.03958C9.12431 4.76875 9.33333 5.56111 9.33333 6.41667C9.33333 7.71944 8.88125 8.82292 7.97708 9.72708C7.07292 10.6312 5.96944 11.0833 4.66667 11.0833C3.36389 11.0833 2.26042 10.6312 1.35625 9.72708C0.452083 8.82292 0 7.71944 0 6.41667C0 5.1625 0.420486 3.97153 1.26146 2.84375C2.10243 1.71597 3.2375 0.768056 4.66667 0Z"
                            fill="#F2DF0D"
                          />
                        </svg>
                        <span
                          style={{ fontFamily: "var(--font-peakers)" }}
                          className="text-[12px] sm:text-[13px] md:text-[0.9vw] xl:text-[0.8vw] font-bold tracking-[0.07em] uppercase translate-y-px"
                        >
                          FRESHLY MADE IN-HOUSE EVERY DAY | NO ADDED
                          PRESERVATIVES UNLIKE BIG BOYS
                        </span>
                      </div>
                    </div>

                    {/* NUTRITIONAL BADGES */}
                    {sauce.cal && sauce.cal !== "-" && (
                      <div className="flex flex-row flex-wrap justify-center items-center gap-2 font-bold">
                        <div className="px-2 sm:px-3 md:px-[0.8vw] py-1 md:py-[0.3vw] rounded-[100px] bg-white/5 border border-white/10 flex items-center justify-center gap-1 sm:gap-1.5 md:gap-[0.4vw] backdrop-blur-md">
                          <span className="text-[9px] sm:text-[10px] md:text-[0.65vw] text-white/40 font-mono">
                            CAL
                          </span>
                          <span className="text-[12px] sm:text-[13px] md:text-[1vw] xl:text-[0.85vw]">
                            {sauce.cal}
                          </span>
                        </div>
                        <div className="px-2 sm:px-3 md:px-[0.8vw] py-1 md:py-[0.3vw] rounded-[100px] bg-white/5 border border-white/10 flex items-center justify-center gap-1 sm:gap-1.5 md:gap-[0.4vw] backdrop-blur-md">
                          <span className="text-[9px] sm:text-[10px] md:text-[0.65vw] text-white/40 font-mono">
                            P(g)
                          </span>
                          <span className="text-[12px] sm:text-[13px] md:text-[1vw] xl:text-[0.85vw]">
                            {sauce.protein}
                          </span>
                        </div>
                        <div className="px-2 sm:px-3 md:px-[0.8vw] py-1 md:py-[0.3vw] rounded-[100px] bg-white/5 border border-white/10 flex items-center justify-center gap-1 sm:gap-1.5 md:gap-[0.4vw] backdrop-blur-md">
                          <span className="text-[9px] sm:text-[10px] md:text-[0.65vw] text-white/40 font-mono">
                            C(g)
                          </span>
                          <span className="text-[12px] sm:text-[13px] md:text-[1vw] xl:text-[0.85vw]">
                            {sauce.carbs}
                          </span>
                        </div>
                        <div className="px-2 sm:px-3 md:px-[0.8vw] py-1 md:py-[0.3vw] rounded-[100px] bg-white/5 border border-white/10 flex items-center justify-center gap-1 sm:gap-1.5 md:gap-[0.4vw] backdrop-blur-md">
                          <span className="text-[9px] sm:text-[10px] md:text-[0.65vw] text-white/40 font-mono">
                            F(g)
                          </span>
                          <span className="text-[12px] sm:text-[13px] md:text-[1vw] xl:text-[0.85vw]">
                            {sauce.fat}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/*
                                  ─── CIRCLE CONTAINER ───
                                  FIX: The translate-y-[25%] mathematically ensures exactly 75% 
                                  of the circle is visible above the bottom edge on all screens.
                                  The vw sizes have been adjusted so it comfortably sits below the text.
                                */}
                <div
                  className={`
                                        fixed md:absolute left-1/2 -translate-x-1/2
                                        top-[15.2rem] sm:top-[14.4rem] md:top-[14.2rem] lg:top-[11.5rem] xl:top-[10.2rem]
                                        w-[150vw] h-[150vw]
                                        sm:w-[146vw] sm:h-[146vw]
                                        md:w-[118vw] md:h-[118vw]
                                        lg:w-[98vw] lg:h-[98vw] 
                                        xl:w-[84vw] xl:h-[84vw]
                                        flex items-center justify-center z-10 pointer-events-none
                                    `}
                >
                  {/* ROTATING SAUCE NAME RING */}
                  <div className="absolute inset-0 md:scale-[0.96] md:origin-center">
                    <div
                      className="absolute inset-0 z-30 w-full h-full transition-all duration-200 ease-linear"
                      style={{
                        transform: `rotate(${baseRotation + rotation}deg)`,
                      }}
                    >
                      <div className="relative w-full h-full pointer-events-auto z-20">
                        <svg
                          viewBox="0 0 1000 1000"
                          className="w-full h-full overflow-visible"
                        >
                          <defs>
                            <path
                              id={`sauce-ring-path-${idx}`}
                              d="M 500, 500 m -472, 0 a 472,472 0 1,1 944,0 a 472,472 0 1,1 -944,0"
                              fill="none"
                            />
                          </defs>

                          {ringItems.map((item, ringIndex) => {
                            const isActive = item.index === currentIndex;
                            const offset = ringOffsets[ringIndex] || "0%";
                            const label = ringLabels[ringIndex];

                            return (
                              <text
                                key={item.id}
                                fill="white"
                                textAnchor="start"
                                className={`${isActive ? "opacity-100" : "opacity-80 hover:opacity-100"} sauce-circular-text`}
                                style={{
                                  fontFamily: "var(--font-peakers)",
                                  fontWeight: 700,
                                  fontSize: isDesktop ? "0.298rem" : "0.54rem",
                                  letterSpacing: isDesktop
                                    ? "0.005em"
                                    : "0.02em",
                                  textTransform: "uppercase",
                                  cursor: "pointer",
                                  pointerEvents: "auto",
                                  transform: isDesktop ? "" : "translateY(5px)",
                                }}
                                onClick={() => transitionToIndex(item.index)}
                              >
                                <textPath
                                  href={`#sauce-ring-path-${idx}`}
                                  startOffset={offset}
                                >
                                  {label}
                                </textPath>
                              </text>
                            );
                          })}
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* STATIC BORDER CIRCLE */}
                  <svg
                    viewBox="0 0 1000 1000"
                    className="absolute inset-0 top-4 w-full h-full pointer-events-none z-10 md:scale-[0.96] md:origin-center"
                  >
                    <circle
                      cx="500"
                      cy="500"
                      r="470"
                      fill="none"
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="2"
                    />
                  </svg>

                  {/* SAUCE IMAGE — cropped circle */}
                  {sauce.sauceImage && (
                    <div
                      className={`absolute left-1/2 mt-2 md:mt-6 top-[48%] md:top-1/2 z-10 h-[108%] w-[108%] md:h-[114%] md:w-[114%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full ${isVisible ? "opacity-100" : "opacity-0"}`}
                    >
                      <div
                        className={`absolute inset-0 ${imageAnimationClass}`}
                      >
                        <Image
                          src={urlFor(sauce.sauceImage)
                            .width(1000)
                            .height(1000)
                            .fit("crop")
                            .crop("center")
                            .auto("format")
                            .url()}
                          alt={sauce.title}
                          fill
                          className="select-none object-cover object-center"
                          style={{
                            filter:
                              "drop-shadow(0px 20px 40px rgba(0,0,0,0.95))",
                            transformOrigin: "center center",
                          }}
                          priority={
                            idx === 0 ||
                            idx === currentIndex ||
                            idx === (currentIndex + 1) % saucesData.length
                          }
                          sizes="(max-width: 640px) 130vw, (max-width: 1024px) 90vw, 80vw"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/*
              ─── ARROW BUTTONS ───
              FIX: Realigned the bottom offsets so they perfectly flank the center 
              of the dynamically shifting, partially-visible bowl above.
            */}
      <div className="absolute top-[58%] sm:top-[60%] md:top-auto bottom-auto md:bottom-[16%] lg:bottom-[22%] xl:bottom-[25%] w-[94%] sm:w-[92%] md:w-[96%] lg:w-[92%] xl:w-[88%] left-1/2 -translate-x-1/2 flex justify-between items-center z-40 pointer-events-none">
        <button
          onClick={prevSlide}
          className="group pointer-events-auto bg-black/30 hover:bg-black/50 rounded-full p-1 transition-all duration-300 active:scale-95"
          aria-label="Previous sauce"
        >
          <div className="relative flex items-center justify-center w-[36px] h-9 sm:w-[44px] sm:h-11 md:w-[52px] md:h-[52px] lg:w-[60px] lg:h-[60px]">
            <div className="w-full h-full rounded-full bg-white/10 border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              <svg
                viewBox="0 0 100 100"
                className="w-[45%] h-[45%] text-white rotate-180"
                fill="currentColor"
              >
                <path d="M45 20 L85 50 L45 80 L58 50 Z" />
                <path
                  d="M15 25 L50 50 L15 75 L28 50 Z"
                  className="opacity-40"
                />
              </svg>
            </div>
          </div>
        </button>

        <button
          onClick={nextSlide}
          className="group pointer-events-auto transition-all duration-300 active:scale-95"
          aria-label="Next sauce"
        >
          <div className="relative flex items-center justify-center w-[36px] h-9 sm:w-[44px] sm:h-11 md:w-[52px] md:h-[52px] lg:w-[60px] lg:h-[60px]">
            <div className="w-full h-full rounded-full bg-white/10 border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              <svg
                viewBox="0 0 100 100"
                className="w-[45%] h-[45%] text-white"
                fill="currentColor"
              >
                <path d="M45 20 L85 50 L45 80 L58 50 Z" />
                <path
                  d="M15 25 L50 50 L15 75 L28 50 Z"
                  className="opacity-40"
                />
              </svg>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

// sdkf
