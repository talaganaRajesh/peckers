"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";



const SAUCES_FALLBACK = [
    { _id: '1', title: "Mayonnaise", descLine1: "A master blend of whole eggs, white wine vinegar, and cracked black pepper.", descLine2: "Freshly made in-house every day, our signature Peckers sauces.", cal: "622.9", protein: "1.2", carbs: "0.3", fat: "70.5" },
    { _id: '2', title: "Garlic Aioli", descLine1: "Our house-made mayo blended with fresh garlic cloves", descLine2: "and a signature citrus finish.", cal: "563.1", protein: "1.4", carbs: "2.5", fat: "62.7" },
    { _id: '3', title: "Butter me up", descLine1: "Rich, creamy, and full of bold flavours, this family recipe brings", descLine2: "a touch of heritage to every dish.", cal: "531.3", protein: "4.7", carbs: "16.6", fat: "48.9" },
    { _id: '4', title: "Honey glaze BBQ", descLine1: "A bold fusion of savoury Hoisin and sun-ripened tomatoes,", descLine2: "finished with a kick of Cayenne.", cal: "364.1", protein: "1.5", carbs: "64.2", fat: "12.0" },
    { _id: '5', title: "Hot honey", descLine1: "A powerhouse blend of farm-fresh honey, fiery sriracha,", descLine2: "and our signature secret spice mix.", cal: "301.7", protein: "1.1", carbs: "54.1", fat: "9.5" },
    { _id: '7', title: "Korean gochujang", descLine1: "A rich blend of fermented chillies and aged soy, finished", descLine2: "with the nuttiness of toasted sesame.", cal: "272.2", protein: "2.4", carbs: "32.9", fat: "15.1" },
    { _id: '8', title: "Peanut sweet chilli", descLine1: "Roasted peanuts and sun-ripened chillies, balanced with fresh herbs", descLine2: "and a signature spice blend.", cal: "222.7", protein: "9.4", carbs: "20.4", fat: "13.6" },
    { _id: '9', title: "Super charge OG", descLine1: "Hand-whisked whole eggs and bold Sriracha, balanced with", descLine2: "a zesty citrus kick and smoked paprika.", cal: "99.7", protein: "4.4", carbs: "12.0", fat: "3.7" },
    { _id: '10', title: "Buffalo", descLine1: "A creamy, spicy blend with the perfect balance of heat and tang,", descLine2: "enhanced with bold seasonings for a zesty punch.", cal: "313.8", protein: "1.9", carbs: "2.1", fat: "33.0" },
    { _id: '12', title: "Cheese Sauce", descLine1: "Creamy, indulgent sauce combining smooth cheddar", descLine2: "and a hint of smoked paprika.", cal: "-", protein: "-", carbs: "-", fat: "-" },
    { _id: '13', title: "OG chilli", descLine1: "Freshly made in-house every day, our signature Peckers sauces", descLine2: "with zero preservatives, unlike the big boys.", cal: "52.0", protein: "1.2", carbs: "11.0", fat: "0.2" },
    { _id: '14', title: "Korean glaze", descLine1: "Freshly made in-house every day, our signature Peckers sauces", descLine2: "with zero preservatives, unlike the big boys.", cal: "130.2", protein: "1.2", carbs: "30.5", fat: "0.8" }
];

export default function SaucePageOne({ initialData = [] }) {
    const [saucesData, setSaucesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [isScaling, setIsScaling] = useState(false);

    useEffect(() => {
        setIsScaling(true);
        const timer = setTimeout(() => setIsScaling(false), 1000);
        return () => clearTimeout(timer);
    }, [currentIndex]);

    useEffect(() => {
        if (initialData && initialData.length > 0) {
            // merge logic if still needed, but primarily use initialData
            const mergedData = SAUCES_FALLBACK.map((fallback) => {
                const sanityMatch = initialData.find(s => s.title?.toUpperCase().includes(fallback.title.toUpperCase()));
                return sanityMatch ? { ...fallback, ...sanityMatch } : fallback;
            });
            setSaucesData(mergedData);
            setLoading(false);
            return;
        }

        const fetchSauces = async () => {
            try {
                const data = await client.fetch(`*[_type == "saucePage"] | order(_createdAt asc)`);
                const mergedData = SAUCES_FALLBACK.map((fallback) => {
                    const sanityMatch = data.find(s => s.title?.toUpperCase().includes(fallback.title.toUpperCase()));
                    return sanityMatch ? { ...fallback, ...sanityMatch } : fallback;
                });
                setSaucesData(mergedData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching sauces:", error);
                setSaucesData(SAUCES_FALLBACK);
                setLoading(false);
            }
        };
        fetchSauces();
    }, [initialData]);

    const segment = saucesData.length ? (360 / saucesData.length) : 0;

    const nextSlide = () => {
        const nextIdx = (currentIndex + 1) % saucesData.length;
        setCurrentIndex(nextIdx);
        setRotation(prev => prev + segment); // Clockwise
    };

    const prevSlide = () => {
        const nextIdx = (currentIndex - 1 + saucesData.length) % saucesData.length;
        setCurrentIndex(nextIdx);
        setRotation(prev => prev - segment); // Counter-clockwise
    };

    // Initialize rotation on first load based on first sauce
    useEffect(() => {
        if (saucesData.length > 0 && rotation === 0) {
            // Path starts at 9 o'clock. Pointer is at 12 o'clock.
            // 9 -> 12 is a 90-degree clockwise rotation.
            // Subtract (segment / 2) to center the first sauce title under the pointer.
            setRotation(90 - (segment / 2));
        }
    }, [saucesData, segment]);

    // Manual layout overrides per sauce image (index-based)
    const getSauceImageStyle = (idx) => {
        const base = "absolute w-[85%] h-[85%] z-10 transition-all duration-700 top-1/2 -translate-y-1/2";

        switch (idx) {
            case 0: // Mayonnaise
                return `${base} mt-[-5vw] md:mt-[-2vw] scale-[1.8] md:scale-[1.8]`;
            case 1: // Garlic Aioli
                return `${base} mt-[-5vw] md:mt-[-2vw] scale-[1.8] md:scale-[1.8]`;
            case 2: // Butter me up
                return `${base} mt-[-8vw] md:mt-[-4vw] scale-[1.7] md:scale-[1.65]`;
            case 3: // Honey glaze BBQ
                return `${base} mt-[0vw] md:mt-0 scale-[1.1] md:scale-[.94]`;
            case 4: // Hot honey
                return `${base} mt-[-4vw] md:mt-[-2vw] scale-[1.4] md:scale-[1.32]`;
            case 5: // Korean gochujang
                return `${base} mt-[0vw] md:mt-0 scale-[1.2] md:scale-[1.05]`;
            case 6: // Peanut sweet chilli
                return `${base} mt-[0vw] md:mt-0 scale-[1.3] md:scale-[1.2]`;
            case 7: // Super charge OG
                return `${base} mt-[-15vw] md:mt-[-10vw] scale-[2.0] md:scale-[1.85]`;
            case 8: // Buffalo
                return `${base} mt-[0vw] md:mt-0 scale-[1.3] md:scale-[1.2]`;
            case 9: // Cheese Sauce
                return `${base} mt-[-4vw] md:mt-[-2vw] scale-[1.4] md:scale-[1.3]`;
            case 10: // OG Chilli
                return `${base} mt-[0vw] md:mt-0 scale-[1.3] md:scale-[1.2]`;
            case 11: // Korean Glaze
                return `${base} mt-[0vw] md:mt-0 scale-[1.3] md:scale-[1.2]`;
            default:
                return `${base} mt-[0vw] md:mt-0 scale-[1.3] md:scale-[1.2]`;
        }
    };

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-2xl font-bold animate-pulse">Loading Sauces...</div>
            </div>
        );
    }

    if (!saucesData || saucesData.length === 0) return null;


    return (
        <div className="relative w-full overflow-hidden bg-black flex flex-col items-center">

            <div className="relative w-full min-h-[175vw] sm:min-h-[120vw] md:min-h-[60vw] lg:min-h-[55vw] xl:min-h-[50vw]">

                {saucesData.map((sauce, idx) => {
                    const isActive = idx === currentIndex;

                    return (
                        <div
                            key={sauce._id}
                            className={`absolute top-0 left-0 w-full transition-opacity duration-1200 ease-in-out ${isActive ? "opacity-100 z-20" : "opacity-0 z-10"
                                }`}
                        >
                            <div className="relative w-full flex flex-col items-center pb-[25vw] min-h-[175vw] sm:min-h-[120vw] md:min-h-[60vw] lg:min-h-[55vw] xl:min-h-[50vw] sm:pb-[100vw] md:pb-[20vw] lg:pb-[26vw] xl:pb-[26vw] bg-black">

                                {sauce.bgImage && (
                                    <Image
                                        src={urlFor(sauce.bgImage).url()}
                                        alt={`${sauce.title} Background`}
                                        width={1920}
                                        height={1080}
                                        className="w-full h-auto block"
                                        priority={idx === 0}
                                    />
                                )}


                                {/* TEXT SECTION WITH PREMIUM SCALING */}
                                <div
                                    className={`absolute mt-[8vw] sm:mt-6 md:mt-0 top-[9%] sm:top-[10%] md:top-[4%] lg:top-[6%] xl:top-[2%] left-1/2 -translate-x-1/2 text-center md:text-center text-white w-[95%] sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] z-20 transition-transform duration-700 ease-out`}
                                >
                                    <h1
                                        className="text-5xl sm:text-5xl md:text-[50px] lg:text-[60px] xl:text-[5vw] font-bold tracking-wide mb-1 sm:mb-2 md:mb-4 xl:mb-[-.5vw]"
                                        style={{ fontFamily: 'var(--font-peakers)' }}
                                    >
                                        {sauce.title}
                                    </h1>

                                    <div className="text-[15px] sm:text-[14px] md:text-[12px] lg:text-[14px] xl:text-[1.1vw] leading-[1.5em] md:leading-[1.6em] xl:leading-[1.3vw] py-[1.5vw] font-light md:font-normal lg:font-normal xl:font-light font-['Inconsolata'] tracking-wider space-y-1 md:space-y-2 lg:space-y-3 xl:space-y-[0.5vw]">
                                        <p>
                                            {sauce.descLine1}<br />
                                            {sauce.descLine2}
                                        </p>
                                        <p className="hidden sm:block">{sauce.descLine3}</p>
                                        <div className="flex flex-col items-center">
                                            <div className="flex flex-row flex-wrap justify-center items-center gap-2 md:gap-4 pt-3 md:pt-[1vw] xl:pt-[0.8vw] font-bold">
                                                <div className="px-2 sm:px-3 md:px-[1.2vw] py-1 md:py-[0.5vw] rounded-[100px] border border-white/20 flex items-center justify-center gap-1 sm:gap-1.5 md:gap-[0.5vw] bg-black/30 backdrop-blur-md">
                                                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[6px] h-[8px] sm:w-[8px] sm:h-[10px] md:w-[1vw] md:h-[1.2vw]">
                                                        <path d="M1.16667 6.41667C1.16667 6.92222 1.26875 7.40104 1.47292 7.85313C1.67708 8.30521 1.96875 8.70139 2.34792 9.04167C2.33819 8.99306 2.33333 8.94931 2.33333 8.91042C2.33333 8.87153 2.33333 8.82778 2.33333 8.77917C2.33333 8.46805 2.39167 8.17639 2.50833 7.90417C2.625 7.63194 2.79514 7.38403 3.01875 7.16042L4.66667 5.54167L6.31458 7.16042C6.53819 7.38403 6.70833 7.63194 6.825 7.90417C6.94167 8.17639 7 8.46805 7 8.77917C7 8.82778 7 8.87153 7 8.91042C7 8.94931 6.99514 8.99306 6.98542 9.04167C7.36458 8.70139 7.65625 8.30521 7.86042 7.85313C8.06458 7.40104 8.16667 6.92222 8.16667 6.41667C8.16667 5.93056 8.07674 5.47118 7.89687 5.03854C7.71701 4.6059 7.45694 4.21944 7.11667 3.87917C6.92222 4.00556 6.71806 4.10035 6.50417 4.16354C6.29028 4.22674 6.07153 4.25833 5.84792 4.25833C5.24514 4.25833 4.72257 4.05903 4.28021 3.66042C3.83785 3.26181 3.58264 2.77083 3.51458 2.1875C3.13542 2.50833 2.8 2.84132 2.50833 3.18646C2.21667 3.5316 1.97118 3.8816 1.77188 4.23646C1.57257 4.59132 1.42188 4.95347 1.31979 5.32292C1.21771 5.69236 1.16667 6.05694 1.16667 6.41667ZM4.66667 7.175L3.83542 7.99167C3.72847 8.09861 3.64583 8.22014 3.5875 8.35625C3.52917 8.49236 3.5 8.63333 3.5 8.77917C3.5 9.09028 3.61424 9.35764 3.84271 9.58125C4.07118 9.80486 4.34583 9.91667 4.66667 9.91667C4.9875 9.91667 5.26215 9.80486 5.49062 9.58125C5.7191 9.35764 5.83333 9.09028 5.83333 8.77917C5.83333 8.62361 5.80417 8.48021 5.74583 8.34896C5.6875 8.21771 5.60486 8.09861 5.49792 7.99167L4.66667 7.175ZM4.66667 0V1.925C4.66667 2.25556 4.7809 2.53264 5.00938 2.75625C5.23785 2.97986 5.51736 3.09167 5.84792 3.09167C6.02292 3.09167 6.18576 3.05521 6.33646 2.98229C6.48715 2.90937 6.62083 2.8 6.7375 2.65417L7 2.33333C7.71944 2.74167 8.28819 3.31042 8.70625 4.03958C9.12431 4.76875 9.33333 5.56111 9.33333 6.41667C9.33333 7.71944 8.88125 8.82292 7.97708 9.72708C7.07292 10.6312 5.96944 11.0833 4.66667 11.0833C3.36389 11.0833 2.26042 10.6312 1.35625 9.72708C0.452083 8.82292 0 7.71944 0 6.41667C0 5.1625 0.420486 3.97153 1.26146 2.84375C2.10243 1.71597 3.2375 0.768056 4.66667 0Z" fill="#F2DF0D" />
                                                    </svg>
                                                    <span style={{ fontFamily: 'var(--font-peakers)' }} className="text-[10px] sm:text-[12px] md:text-[1.3vw] xl:text-[0.9vw] font-normal tracking-[0.05em] uppercase translate-y-px">{sauce.cal && sauce.cal !== "-" ? "MADE FRESHLY" : "NO PRESERVATIVES"}</span>
                                                </div>
                                                {sauce.cal && sauce.cal !== "-" && (
                                                    <div className="flex flex-row flex-wrap justify-center gap-2">
                                                        <div className="px-2 sm:px-3 md:px-[1.2vw] py-1 md:py-[0.5vw] rounded-[100px] bg-white/5 border border-white/10 flex items-center justify-center gap-1 sm:gap-1.5 md:gap-[0.5vw] backdrop-blur-md">
                                                            <span className="text-[9px] sm:text-[10px] md:text-[0.8vw] text-white/40 font-mono">CAL</span>
                                                            <span className="text-[10px] sm:text-[12px] md:text-[1.1vw] xl:text-[0.9vw]">{sauce.cal}</span>
                                                        </div>
                                                        <div className="px-2 sm:px-3 md:px-[1.2vw] py-1 md:py-[0.5vw] rounded-[100px] bg-white/5 border border-white/10 flex items-center justify-center gap-1 sm:gap-1.5 md:gap-[0.5vw] backdrop-blur-md">
                                                            <span className="text-[9px] sm:text-[10px] md:text-[0.8vw] text-white/40 font-mono">P(g)</span>
                                                            <span className="text-[10px] sm:text-[12px] md:text-[1.1vw] xl:text-[0.9vw]">{sauce.protein}</span>
                                                        </div>
                                                        <div className="px-2 sm:px-3 md:px-[1.2vw] py-1 md:py-[0.5vw] rounded-[100px] bg-white/5 border border-white/10 flex items-center justify-center gap-1 sm:gap-1.5 md:gap-[0.5vw] backdrop-blur-md">
                                                            <span className="text-[9px] sm:text-[10px] md:text-[0.8vw] text-white/40 font-mono">C(g)</span>
                                                            <span className="text-[10px] sm:text-[12px] md:text-[1.1vw] xl:text-[0.9vw]">{sauce.carbs}</span>
                                                        </div>
                                                        <div className="px-2 sm:px-3 md:px-[1.2vw] py-1 md:py-[0.5vw] rounded-[100px] bg-white/5 border border-white/10 flex items-center justify-center gap-1 sm:gap-1.5 md:gap-[0.5vw] backdrop-blur-md">
                                                            <span className="text-[9px] sm:text-[10px] md:text-[0.8vw] text-white/40 font-mono">F(g)</span>
                                                            <span className="text-[10px] sm:text-[12px] md:text-[1.1vw] xl:text-[0.9vw]">{sauce.fat}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="absolute left-1/2 -translate-x-1/2 mt-[15vw] md:mt-0 bottom-[-65vw] sm:bottom-[-15vw] md:bottom-[2vw] lg:bottom-[-2vw] xl:bottom-[-5vw] w-[135vw] h-[135vw] sm:w-[75vw] sm:h-[75vw] md:w-[70vw] md:h-[70vw] lg:w-[60vw] lg:h-[60vw] xl:w-[72vw] xl:h-[72vw] flex items-center justify-center z-10 pointer-events-none"
                                >

                                    {/* ROTATING TEXT (WITH INDEPENDENT SCALING) */}
                                    <div
                                        className={`absolute inset-0 w-full h-full transition-all duration-1800 ease-[cubic-bezier(0.77,0,0.175,1)]`}
                                        style={{ transform: `rotate(${rotation}deg)` }}
                                    >
                                        <svg viewBox="0 0 1000 1000" className="w-full h-full overflow-visible">
                                            <path
                                                id={`sauce-text-path-${idx}`}
                                                d="M 500, 500 m -450, 0 a 450,450 0 1,1 900,0 a 450,450 0 1,1 -900,0"
                                                fill="transparent"
                                            />
                                            <text
                                                className="fill-white font-bold text-[24px] font-peakers uppercase tracking-wider"
                                                style={{ fontFamily: "var(--font-peakers)" }}
                                            >
                                                <textPath
                                                    href={`#sauce-text-path-${idx}`}
                                                    startOffset="0%"
                                                    textLength="2810"
                                                    lengthAdjust="spacingAndGlyphs"
                                                >
                                                    {/* Layout items counter-clockwise: [S0, Sn-1, Sn-2... S1] 
                                                        so that clockwise rotation R+ advances the array correctly */}
                                                    {[saucesData[0], ...[...saucesData.slice(1)].reverse()].map(s => `${s.title.toUpperCase()} SAUCE`).join(' • ')} •{' '}
                                                </textPath>
                                            </text>
                                        </svg>
                                    </div>

                                    {/* STATIC CIRCLE */}
                                    <svg viewBox="0 0 1000 1000" className="absolute inset-0 w-full h-full pointer-events-none z-10">
                                        <circle cx="500" cy="500" r="410" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                                        <circle cx="500" cy="90" r="8" fill="white" />
                                    </svg>

                                    {isActive && sauce.sauceImage && (
                                        <div className={getSauceImageStyle(idx)}>
                                            <Image
                                                src={urlFor(sauce.sauceImage).url()}
                                                alt={sauce.title}
                                                fill
                                                className="object-cover object-center rounded-full select-none pointer-events-auto"
                                                style={{ filter: "drop-shadow(0px 20px 40px rgba(0,0,0,0.95))" }}
                                                priority={idx === 0}
                                                sizes="(max-width: 768px) 80vw, 40vw"
                                            />
                                        </div>
                                    )}

                                </div>

                            </div>
                        </div>
                    );
                })}
            </div>

            {/* PREMIUM ARROWS */}
            <div className="absolute top-[48%] sm:top-[50%] md:top-auto bottom-auto md:bottom-[45%] lg:bottom-[40%] xl:bottom-[50%] w-[90%] sm:w-[92%] md:w-[95%] lg:w-[90%] xl:w-[85%] left-1/2 -translate-x-1/2 flex justify-between items-center z-20 pointer-events-none">
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


