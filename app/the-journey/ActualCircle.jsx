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
    const card1Opacity = useTransform(scrollProgress || { get: () => 1 }, [0, 0.1], [0, 1]);
    const card2Opacity = useTransform(scrollProgress || { get: () => 1 }, [0.08, 0.22], [0, 1]);
    const card3Opacity = useTransform(scrollProgress || { get: () => 1 }, [0.18, 0.35], [0, 1]);

    const card1Y = useTransform(scrollProgress || { get: () => 0 }, [0, 0.1], [30, 0]);
    const card2Y = useTransform(scrollProgress || { get: () => 0 }, [0.08, 0.22], [30, 0]);
    const card3Y = useTransform(scrollProgress || { get: () => 0 }, [0.18, 0.35], [30, 0]);

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
        <div className="bg-transparent z-120 relative text-white flex justify-center py-[0.8vw] md:py-0 font-peakers">
            <div className="w-full max-w-[98vw] relative mt-[2.7vw] xl:mt-[2.3vw]">
                <div
                    className="flex flex-col md:flex-row justify-between gap-[6vw] md:gap-[1.4vw] h-auto md:h-[1.1vw] items-center mb-0 md:w-[92vw] mx-auto relative z-120"
                >
                    {timelineData.slice(0, 3).map((item, index) => {
                        const alignment =
                            index === 0
                                ? "items-center text-center md:items-end md:text-right"
                                : index === 1
                                    ? "items-center text-center"
                                    : "items-center text-center md:items-start md:text-left";
                        const offset = (index === 0 || index === 2) ? "md:mt-[0.3vw]" : "md:-mt-[0.1vw]";

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
                                className={`relative z-130 px-[6vw] md:px-[1.35vw] py-[6vw] md:py-[1.22vw] rounded-[4vw] md:rounded-[0.95vw] flex flex-col ${alignment} ${offset} w-[80vw] md:w-[19.2vw] h-auto md:h-[11.8vw] border
  ${isHighlighted
                                        ? "bg-[#121212] border-yellow-500/60"
                                        : `bg-[#0a0a0a] ${item.borderStyle || "border-zinc-800"}`
                                    }`}
                            >
                                <span
                                    className={`text-[5vw] md:text-[1.38vw] font-bold mb-[3vw] md:mb-[0.6vw] tracking-tight ${isHighlighted ? "text-white" : "text-zinc-600"
                                        }`}
                                    style={{ fontFamily: "Space Mono" }}
                                >
                                    {item.year}
                                </span>

                                <h3 className="text-[5vw] md:text-[1.36vw] font-peakers mb-[2vw] md:mb-[0.66vw] leading-tight text-white">
                                    {item.title}
                                </h3>

                                <p className={`text-zinc-500 font-peakers leading-tight font-medium ${index === 1 ? "text-[2.8vw] md:text-[0.86vw]" : "text-[3vw] md:text-[0.92vw]"}`}
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