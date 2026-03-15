"use client";

import React, { useState, useEffect } from "react";
import { motion, useTransform } from 'framer-motion';

export default function PeckersTimeline({ initialData = null, scrollProgress }) {
    const timelineData = initialData?.timeline || [];
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Individual card reveal transforms
    const card1Opacity = useTransform(scrollProgress || { get: () => 1 }, [0.05, 0.15], [0, 1]);
    const card2Opacity = useTransform(scrollProgress || { get: () => 1 }, [0.15, 0.25], [0, 1]);
    const card3Opacity = useTransform(scrollProgress || { get: () => 1 }, [0.25, 0.35], [0, 1]);

    const card1Y = useTransform(scrollProgress || { get: () => 0 }, [0.05, 0.15], [50, 0]);
    const card2Y = useTransform(scrollProgress || { get: () => 0 }, [0.15, 0.25], [50, 0]);
    const card3Y = useTransform(scrollProgress || { get: () => 0 }, [0.25, 0.35], [50, 0]);

    const cardsReveal = [
        { opacity: card1Opacity, y: card1Y },
        { opacity: card2Opacity, y: card2Y },
        { opacity: card3Opacity, y: card3Y }
    ];

    if (timelineData.length === 0) return null;

    const getInitial = (i) => {
        if (isDesktop) {
            if (i === 0) return { opacity: 0, x: -100, y: 80, scale: 0.9, rotateY: -25, rotate: -5, filter: "blur(20px)" };
            if (i === 1) return { opacity: 0, y: 120, scale: 0.85, rotateX: 20, filter: "blur(20px)" };
            return { opacity: 0, x: 100, y: 80, scale: 0.9, rotateY: 25, rotate: 5, filter: "blur(20px)" };
        }
        if (i === 0) return { opacity: 0, x: 60, y: 60, scale: 0.8, rotate: -15, filter: "blur(15px)" };
        if (i === 1) return { opacity: 0, y: 80, scale: 0.8, rotate: 0, filter: "blur(15px)" };
        return { opacity: 0, x: -60, y: 60, scale: 0.8, rotate: 15, filter: "blur(15px)" };
    };

    return (
        <div className="bg-black z-10 text-white flex justify-center py-[1vw] md:py-[.1vw] font-peakers">
            <div className="w-full max-w-[90vw] relative mt-[7vw]">
                <div
                    className="flex flex-col md:flex-row bg-black justify-between gap-[6vw] md:gap-[20vw] h-auto md:h-[4vw] items-center mb-[5vw]"
                >
                    {timelineData.slice(0, 3).map((item, index) => {
                        const alignment =
                            index === 0
                                ? "items-center text-center md:items-end md:text-right"
                                : index === 1
                                    ? "items-center text-center"
                                    : "items-center text-center md:items-start md:text-left";
                        const offset = (index === 0 || index === 2) ? "md:mt-[5vw]" : "md:mt-0";

                        const isHighlighted = item.highlight || (!isDesktop && item.year?.toString() === "1978");

                        return (
                            <motion.div
                                key={index}
                                style={{
                                    opacity: cardsReveal[index]?.opacity,
                                    y: cardsReveal[index]?.y,
                                    ...(isHighlighted
                                        ? {
                                            boxShadow: "0 0 25px rgba(234,179,8,0.4), 0 0 50px rgba(234,179,8,0.15)",
                                            borderColor: "rgba(234,179,8,0.8)"
                                        }
                                        : {})
                                }}
                                whileHover={isDesktop ? {
                                    scale: 1.02,
                                    transition: { duration: 0.3, ease: "easeOut" }
                                } : {}}
                                className={`relative px-[6vw] md:px-[1vw] py-[6vw] md:py-[1vw] rounded-[4vw] md:rounded-[1vw] flex flex-col ${alignment} ${offset} w-[80vw] md:w-[15vw] h-auto md:h-[9vw] border
  ${isHighlighted
                                        ? "bg-[#121212] border-yellow-500/60"
                                        : `bg-[#0a0a0a] ${item.borderStyle || "border-zinc-800"}`
                                    }`}
                            >
                                <span
                                    className={`text-[5vw] md:text-[1.2vw] font-bold mb-[3vw] md:mb-[0.5vw] tracking-tight ${isHighlighted ? "text-white" : "text-zinc-600"
                                        }`}
                                    style={{ fontFamily: "Space Mono" }}
                                >
                                    {item.year}
                                </span>

                                <h3 className="text-[5vw] md:text-[1.2vw] font-peakers mb-[2vw] md:mb-[0.5vw] leading-tight text-white">
                                    {item.title}
                                </h3>

                                <p className={`text-zinc-500 font-peakers leading-tight font-medium ${index === 1 ? "text-[2.8vw] md:text-[0.6vw]" : "text-[3vw] md:text-[0.7vw]"}`}
                                    style={index === 1 ? { fontFamily: "Space Mono" } : {}}>

                                    {item.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}