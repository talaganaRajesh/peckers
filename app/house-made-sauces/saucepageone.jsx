"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";



// SAUCES_FALLBACK removed since we fetch from Sanity now

export default function SaucePageOne({ initialData = [] }) {
    const TRANSITION_MS = 320;
    const [fetchedSaucesData, setFetchedSaucesData] = useState([]);
    const [isFetching, setIsFetching] = useState(initialData.length === 0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(null);
    const [slideDirection, setSlideDirection] = useState("next"); // "next" = from bottom, "prev" = from top
    const [rotation, setRotation] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const transitionTimeout = useRef(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const saucesData = initialData.length > 0 ? initialData : fetchedSaucesData;
    const loading = initialData.length === 0 && isFetching;

    useEffect(() => {
        if (initialData && initialData.length > 0) {
            return;
        }

        const fetchSauces = async () => {
            try {
                const data = await client.fetch(`*[_type == "saucePage"] | order(_createdAt asc)`);
                setFetchedSaucesData(data);
                setIsFetching(false);
            } catch (error) {
                console.error("Error fetching sauces:", error);
                setIsFetching(false);
            }
        };
        fetchSauces();
    }, [initialData]);

    const ringItemsBase = saucesData.length > 1
        ? [{ sauce: saucesData[0], index: 0 }, ...saucesData.slice(1).map((sauce, index) => ({ sauce, index: index + 1 })).reverse()]
        : saucesData.map((sauce, index) => ({ sauce, index }));
    const ringLabelsBase = ringItemsBase.map(item => {
        let title = item.sauce.title.toUpperCase();
        // Safety check: if title starts with 'A' and is followed by 'YONNAISE', it might be missing 'M'
        if (title.startsWith("AYONNAISE")) {
            title = "M" + title;
        }
        return title.endsWith("SAUCE") ? `${title}•` : `${title}SAUCE•`;
    });
    // Dynamically build the ring until we hit an ideal character count
    // A full circle fits ~190 characters on Desktop, ~150 on Mobile with the current font size settings.
    // By pushing exact amounts, the 360-degree spread will naturally pack them without overlapping or gaps!
    const idealCharCount = isMobile ? 150 : 190;
    const ringItems = [];
    const ringLabels = [];
    let currentTotal = 0;
    let index = 0;

    while (currentTotal < idealCharCount) {
        const baseIndex = index % ringLabelsBase.length;
        const label = ringLabelsBase[baseIndex];
        const sauce = ringItemsBase[baseIndex].sauce;
        ringLabels.push(label);
        ringItems.push({ id: `ring-item-${index}`, index: ringItemsBase[baseIndex].index, sauce });
        currentTotal += label.length;
        index++;
    }

    const ringGapUnits = -2; // Pack labels extra tight
    const ringBuffer = 0; // no extra gap at path start/end
    const ringTotalUnits = currentTotal + (ringGapUnits * ringLabels.length) + ringBuffer;

    const ringOffsetsData = ringLabels.reduce((acc, label) => {
        const center = acc.cursor + (label.length / 2);
        return {
            cursor: acc.cursor + label.length + ringGapUnits,
            offsets: [...acc.offsets, (center / ringTotalUnits) * 100],
        };
    }, { cursor: 0, offsets: [] }).offsets;

    const ringOffsets = ringOffsetsData.map(offset => `${offset}%`);
    const baseRotation = 90 - (ringOffsetsData[0] * 3.6);

    const clearPrevIndex = () => {
        if (transitionTimeout.current) {
            clearTimeout(transitionTimeout.current);
        }
        transitionTimeout.current = setTimeout(() => {
            setPrevIndex(null);
            transitionTimeout.current = null;
        }, TRANSITION_MS + 20);
    };

    const transitionToIndex = (targetIndex) => {
        if (!saucesData.length || targetIndex === currentIndex) return;

        // Current rotation state helps us understand where the wheel is visually
        // But since we rotate relative to baseRotation + total accumulated rotation,
        // we should find the closest repeated instance of targetIndex to the current "top" position.

        // Find all indices in the ringItems array that match the targetIndex
        const targetRingIndices = ringItems
            .map((item, idx) => item.index === targetIndex ? idx : -1)
            .filter(idx => idx !== -1);

        // We also need the current active ring index (the one currently at the top)
        // Since we rotate the whole wheel, we can track the logical "top" index.
        const currentRingIdx = ringItems.findIndex((item, idx) => item.index === currentIndex);

        const currentPos = ringOffsetsData[currentRingIdx] * 3.6;

        // Find best target ring index by calculating smallest angular distance
        let bestDelta = 999;
        targetRingIndices.forEach(idx => {
            const pos = ringOffsetsData[idx] * 3.6;
            let d = pos - currentPos;
            // Shortest path logic
            while (d > 180) d -= 360;
            while (d < -180) d += 360;
            if (Math.abs(d) < Math.abs(bestDelta)) {
                bestDelta = d;
            }
        });

        setSlideDirection(bestDelta > 0 ? "next" : "prev");
        setPrevIndex(currentIndex);
        setCurrentIndex(targetIndex);
        setRotation(prev => prev - bestDelta);
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
            if (transitionTimeout.current) {
                clearTimeout(transitionTimeout.current);
            }
        };
    }, []);

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-2xl font-bold animate-pulse">Loading Sauces...</div>
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
                    const isTransitioning = prevIndex !== null;

                    // New animation requested: current sauce goes down and shrinks, next comes from top and scales down
                    const imageAnimationClass = isCurrent && isTransitioning
                        ? "sauce-pop-from-top"
                        : isPrev && isTransitioning
                            ? "sauce-pop-down"
                            : "";

                    const wrapperFadeClass = isCurrent && isTransitioning ? "sauce-layer-fade-in" : "";
                    const bgDissolveClass = isCurrent && isTransitioning ? "sauce-bg-dissolve-in" : "";

                    const wrapperZ = isCurrent ? "z-20" : isPrev ? "z-10" : "z-0";

                    return (
                        <div
                            key={sauce._id}
                            className={`absolute top-0 left-0 w-full h-full ${isVisible ? "opacity-100" : "opacity-0"} ${wrapperZ} ${wrapperFadeClass}`}
                        >
                            <div className="relative w-full h-full flex flex-col items-center bg-black">

                                {sauce.bgImage && (
                                    <Image
                                        src={urlFor(sauce.bgImage).url()}
                                        alt={`${sauce.title} Background`}
                                        width={1920}
                                        height={1080}
                                        className={`w-full h-auto block scale-[1.35] translate-y-[10%] md:scale-105 md:translate-y-0 origin-center ${bgDissolveClass}`}
                                        priority={idx === 0}
                                    />
                                )}


                                {/* TEXT SECTION WITH PREMIUM SCALING */}
                                <div
                                    className={`absolute sm:mt-1 md:mt-0 top-[10%] sm:top-[15%] md:top-[12%] lg:top-[14%] xl:top-[5%] left-1/2 -translate-x-1/2 text-center md:text-center text-white w-[95%] sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] z-20 transition-transform duration-300 ease-out`}
                                >
                                    <h1
                                        className={`text-3xl sm:text-4xl md:text-[40px] lg:text-[48px] xl:text-[3.5vw] font-bold tracking-wide mb-1 sm:mb-2 md:mb-3 xl:mb-[-0.2vw] ${isCurrent && isTransitioning ? "sauce-title-fade-in" : ""}`}
                                        style={{ fontFamily: 'var(--font-peakers)' }}
                                    >
                                        {sauce.title}
                                    </h1>

                                    <div className="text-[13px] sm:text-[14px] md:text-[13px] lg:text-[14px] xl:text-[0.9vw] leading-[1.4em] md:leading-[1.5em] xl:leading-[1.2vw] py-[1vw] font-light md:font-normal lg:font-normal xl:font-light font-['Inconsolata'] tracking-wider space-y-1 md:space-y-1.5 lg:space-y-2 xl:space-y-[0.4vw]">
                                        <p>
                                            {sauce.descLine1}<br />
                                            {sauce.descLine2}
                                        </p>
                                      
                                        <p className="hidden sm:block">{sauce.descLine3}</p>
                                        <div className="flex flex-col items-center">
                                            {/* FRESHNESS BADGE - NOW ON ITS OWN LINE */}
                                            <div className="mb-1.5 md:mb-[0.6vw]">
                                                <div className="px-3 sm:px-4 md:px-[1.5vw] py-1 md:py-[0.5vw] rounded-[100px] border border-white/20 flex items-center justify-center gap-1.5 sm:gap-2 md:gap-[0.6vw] bg-black/30 backdrop-blur-md">
                                                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[8px] h-[10px] sm:w-[10px] sm:h-[12px] md:w-[1.2vw] md:h-[1.4vw]">
                                                        <path d="M1.16667 6.41667C1.16667 6.92222 1.26875 7.40104 1.47292 7.85313C1.67708 8.30521 1.96875 8.70139 2.34792 9.04167C2.33819 8.99306 2.33333 8.94931 2.33333 8.91042C2.33333 8.87153 2.33333 8.82778 2.33333 8.77917C2.33333 8.46805 2.39167 8.17639 2.50833 7.90417C2.625 7.63194 2.79514 7.38403 3.01875 7.16042L4.66667 5.54167L6.31458 7.16042C6.53819 7.38403 6.70833 7.63194 6.825 7.90417C6.94167 8.17639 7 8.46805 7 8.77917C7 8.82778 7 8.82778 7 8.91042C7 8.94931 6.99514 8.99306 6.98542 9.04167C7.36458 8.70139 7.65625 8.30521 7.86042 7.85313C8.06458 7.40104 8.16667 6.92222 8.16667 6.41667C8.16667 5.93056 8.07674 5.47118 7.89687 5.03854C7.71701 4.6059 7.45694 4.21944 7.11667 3.87917C6.92222 4.00556 6.71806 4.10035 6.50417 4.16354C6.29028 4.22674 6.07153 4.25833 5.84792 4.25833C5.24514 4.25833 4.72257 4.05903 4.28021 3.66042C3.83785 3.26181 3.58264 2.77083 3.51458 2.1875C3.13542 2.50833 2.8 2.84132 2.50833 3.18646C2.21667 3.5316 1.97118 3.8816 1.77188 4.23646C1.57257 4.59132 1.42188 4.95347 1.31979 5.32292C1.21771 5.69236 1.16667 6.05694 1.16667 6.41667ZM4.66667 7.175L3.83542 7.99167C3.72847 8.09861 3.64583 8.22014 3.5875 8.35625C3.52917 8.49236 3.5 8.63333 3.5 8.77917C3.5 9.09028 3.61424 9.35764 3.84271 9.58125C4.07118 9.80486 4.34583 9.91667 4.66667 9.91667C4.9875 9.91667 5.26215 9.80486 5.49062 9.58125C5.7191 9.35764 5.83333 9.09028 5.83333 8.77917C5.83333 8.62361 5.80417 8.48021 5.74583 8.34896C5.6875 8.21771 5.60486 8.09861 5.49792 7.99167L4.66667 7.175ZM4.66667 0V1.925C4.66667 2.25556 4.7809 2.53264 5.00938 2.75625C5.23785 2.97986 5.51736 3.09167 5.84792 3.09167C6.02292 3.09167 6.18576 3.05521 6.33646 2.98229C6.48715 2.90937 6.62083 2.8 6.7375 2.65417L7 2.33333C7.71944 2.74167 8.28819 3.31042 8.70625 4.03958C9.12431 4.76875 9.33333 5.56111 9.33333 6.41667C9.33333 7.71944 8.88125 8.82292 7.97708 9.72708C7.07292 10.6312 5.96944 11.0833 4.66667 11.0833C3.36389 11.0833 2.26042 10.6312 1.35625 9.72708C0.452083 8.82292 0 7.71944 0 6.41667C0 5.1625 0.420486 3.97153 1.26146 2.84375C2.10243 1.71597 3.2375 0.768056 4.66667 0Z" fill="#F2DF0D" />
                                                    </svg>
                                                    <span style={{ fontFamily: 'var(--font-peakers)' }} className="text-[13px] sm:text-[14px] md:text-[1.6vw] xl:text-[0.9vw] font-normal tracking-[0.05em] uppercase translate-y-px">
                                                        {sauce.cal && sauce.cal !== "-" ? "FRESHLY MADE IN-HOUSE EVERY DAY" : "NO PRESERVATIVES"}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex flex-row flex-wrap justify-center items-center gap-2 md:gap-4 font-bold">
                                                {sauce.cal && sauce.cal !== "-" && (
                                                    <div className="flex flex-row flex-wrap justify-center gap-2">
                                                        <div className="px-2 sm:px-3 md:px-[1.2vw] py-1 md:py-[0.5vw] rounded-[100px] bg-white/5 border border-white/10 flex items-center justify-center gap-1 sm:gap-1.5 md:gap-[0.5vw] backdrop-blur-md">
                                                            <span className="text-[9px] sm:text-[10px] md:text-[0.8vw] text-white/40 font-mono">CAL</span>
                                                            <span className="text-[12px] sm:text-[14px] md:text-[1.3vw] xl:text-[1vw]">{sauce.cal}</span>
                                                        </div>
                                                        <div className="px-2 sm:px-3 md:px-[1.2vw] py-1 md:py-[0.5vw] rounded-[100px] bg-white/5 border border-white/10 flex items-center justify-center gap-1 sm:gap-1.5 md:gap-[0.5vw] backdrop-blur-md">
                                                            <span className="text-[9px] sm:text-[10px] md:text-[0.8vw] text-white/40 font-mono">P(g)</span>
                                                            <span className="text-[12px] sm:text-[14px] md:text-[1.3vw] xl:text-[1vw]">{sauce.protein}</span>
                                                        </div>
                                                        <div className="px-2 sm:px-3 md:px-[1.2vw] py-1 md:py-[0.5vw] rounded-[100px] bg-white/5 border border-white/10 flex items-center justify-center gap-1 sm:gap-1.5 md:gap-[0.5vw] backdrop-blur-md">
                                                            <span className="text-[9px] sm:text-[10px] md:text-[0.8vw] text-white/40 font-mono">C(g)</span>
                                                            <span className="text-[12px] sm:text-[14px] md:text-[1.3vw] xl:text-[1vw]">{sauce.carbs}</span>
                                                        </div>
                                                        <div className="px-2 sm:px-3 md:px-[1.2vw] py-1 md:py-[0.5vw] rounded-[100px] bg-white/5 border border-white/10 flex items-center justify-center gap-1 sm:gap-1.5 md:gap-[0.5vw] backdrop-blur-md">
                                                            <span className="text-[9px] sm:text-[10px] md:text-[0.8vw] text-white/40 font-mono">F(g)</span>
                                                            <span className="text-[12px] sm:text-[14px] md:text-[1.3vw] xl:text-[1vw]">{sauce.fat}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="fixed md:absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 md:mt-0 w-[135vw] h-[135vw] sm:w-[65vw] sm:h-[65vw] md:w-[60vw] md:h-[60vw] lg:w-[52vw] lg:h-[52vw] xl:w-[62vw] xl:h-[62vw] flex items-center justify-center z-10 pointer-events-none"
                                >

                                    {/* ROTATING CLICKABLE SAUCE NAMES */}
                                    <div
                                        className={`absolute inset-0 z-30 w-full h-full transition-all duration-200 ease-linear`}
                                        style={{ transform: `rotate(${baseRotation + rotation}deg)` }}
                                    >
                                        <div className="relative w-full h-full pointer-events-auto z-20">
                                            <svg viewBox="0 0 1000 1000" className="w-full h-full overflow-visible">
                                                <defs>
                                                    <path
                                                        id={`sauce-ring-path-${idx}`}
                                                        d="M 500, 500 m -452, 0 a 452,452 0 1,1 904,0 a 452,452 0 1,1 -904,0"
                                                        fill="none"
                                                    />
                                                </defs>

                                                {ringItems.map((item, ringIndex) => {
                                                    const isActive = item.index === currentIndex;
                                                    const offset = ringOffsets[ringIndex] || "0%";
                                                    const label = ringLabels[ringIndex];

                                                    return (
                                                        <text
                                                            key={`${item.sauce._id}-ring`}
                                                            fill="white"
                                                            textAnchor="middle"
                                                            className={`${isActive ? "opacity-100" : "opacity-85 hover:opacity-100"} sauce-circular-text`}
                                                            style={{
                                                                fontFamily: "var(--font-peakers)",
                                                                fontWeight: 700,
                                                                letterSpacing: "0em",
                                                                textTransform: "uppercase",
                                                                cursor: "pointer",
                                                                pointerEvents: "auto",
                                                            }}
                                                            onClick={() => transitionToIndex(item.index)}
                                                        >
                                                            <textPath href={`#sauce-ring-path-${idx}`} startOffset={offset}>
                                                                {label}
                                                            </textPath>
                                                        </text>
                                                    );
                                                })}
                                            </svg>
                                        </div>
                                    </div>

                                    {/* STATIC CIRCLE */}
                                    <svg viewBox="0 0 1000 1000" className="absolute inset-0 w-full h-full pointer-events-none z-10">
                                        <circle cx="500" cy="500" r="440" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                                        <circle cx="500" cy="45" r="8" fill="white" />
                                    </svg>

                                    {isVisible && sauce.sauceImage && (
                                        <div className="absolute left-1/2 top-1/2 z-10 h-[108%] w-[108%] -translate-x-1/2 -translate-y-1/2 sm:h-[106%] sm:w-[106%] md:h-[108%] md:w-[108%] lg:h-[110%] lg:w-[110%] xl:h-[110%] xl:w-[110%] overflow-hidden">
                                            <div className={`absolute inset-0 ${imageAnimationClass}`}>
                                                <Image
                                                    src={urlFor(sauce.sauceImage).url()}
                                                    alt={sauce.title}
                                                    fill
                                                    className="select-none object-cover object-center"
                                                    style={{
                                                        filter: "drop-shadow(0px 20px 40px rgba(0,0,0,0.95))",
                                                    }}
                                                    priority={idx === 0}
                                                    sizes="(max-width: 640px) 112vw, (max-width: 1024px) 76vw, 66vw"
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

            {/* PREMIUM ARROWS */}
            <div className="absolute top-[38%] sm:top-[50%] md:top-auto bottom-auto md:bottom-[45%] lg:bottom-[40%] xl:bottom-[50%] w-[94%] sm:w-[92%] md:w-[95%] lg:w-[90%] xl:w-[85%] left-1/2 -translate-x-1/2 flex justify-between items-center z-20 pointer-events-none">
                <button
                    onClick={prevSlide}
                    className="group pointer-events-auto transition-all duration-300 active:scale-95"
                >
                    <div className="relative flex items-center justify-center w-[36px] h-9 sm:w-[44px] sm:h-11 md:w-[52px] md:h-13 lg:w-[60px] lg:h-15">
                        <div className="w-full h-full rounded-full bg-white/10 border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            <svg
                                viewBox="0 0 100 100"
                                className="w-[45%] h-[45%] text-white rotate-180"
                                fill="currentColor"
                            >
                                <path d="M45 20 L85 50 L45 80 L58 50 Z" />
                                <path d="M15 25 L50 50 L15 75 L28 50 Z" className="opacity-40" />
                            </svg>
                        </div>
                    </div>
                </button>

                <button
                    onClick={nextSlide}
                    className="group pointer-events-auto transition-all duration-300 active:scale-95"
                >
                    <div className="relative flex items-center justify-center w-[36px] h-9 sm:w-[44px] sm:h-11 md:w-[52px] md:h-13 lg:w-[60px] lg:h-15">
                        <div className="w-full h-full rounded-full bg-white/10 border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            <svg
                                viewBox="0 0 100 100"
                                className="w-[45%] h-[45%] text-white"
                                fill="currentColor"
                            >
                                <path d="M45 20 L85 50 L45 80 L58 50 Z" />
                                <path d="M15 25 L50 50 L15 75 L28 50 Z" className="opacity-40" />
                            </svg>
                        </div>
                    </div>
                </button>
            </div>

        </div>
    );
}


