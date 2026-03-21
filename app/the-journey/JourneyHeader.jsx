"use client";

import { motion } from 'framer-motion';
import { urlFor } from "../../sanity/lib/image";

export default function JourneyIntroSection({ initialData = null }) {
    const data = initialData;

    if (!data) return null;

    return (
        <section className="w-full bg-black pt-10 md:pt-16 xl:pt-[6vw] pb-0 md:pb-[8vw] flex flex-col items-center text-center relative overflow-hidden min-h-[50vh]">

            <>
                {/* ================= DESKTOP ================= */}
                <div className="hidden xl:block w-full">

                    {/* Main Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 35 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="text-[3.35vw] font-peakers text-white leading-none font-bold tracking-tight mb-[1.6vw]"
                    >
                        {data.heading || "THE PECKERS JOURNEY"}
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
                        className="text-[1vw] font-peakers text-[#FFD700] tracking-[0.35vw] leading-[1.4] max-w-[60vw] mx-auto"
                    >
                        {data.subtitle || "FROM ONE STORE TO GROWING COMMUNITY BRAND - THE JOURNEY CONTINUES"}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.8, delay: 0.05, ease: "easeOut" }}
                        className="w-full relative mt-[4.8vw]"
                    >
                        <div className="w-full relative h-[32vw]">
                            {/* SVG Timeline Line */}
                            <svg
                                className="w-full h-auto drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                                viewBox="0 0 1440 463"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g filter="url(#filter0_d_0_1)">
                                    <rect y="209.5" width="1440" height="6.75" fill="#FFD700" opacity="0.35" />
                                    <motion.rect
                                        initial={{ width: 0, opacity: 0.95 }}
                                        whileInView={{ width: 1440, opacity: 1 }}
                                        viewport={{ once: true, amount: 0.15 }}
                                        transition={{ duration: 1.25, ease: "easeInOut" }}
                                        y="209.5" height="6.75" fill="#FFD700"
                                    />
                                </g>

                                {/* Connector and Circle 1 - Hitchin (at spot 1) */}
                                <g filter="url(#filter1_d_0_1)">
                                    <motion.rect
                                        initial={{ scaleY: 0 }}
                                        whileInView={{ scaleY: 1 }}
                                        viewport={{ once: true, amount: 0.15 }}
                                        transition={{ duration: 0.65, delay: 0.18, ease: "easeOut" }}
                                        style={{ originY: 0 }}
                                        x="308.829" y="228" width="3.34212" height="53.4739" fill="#FFD700"
                                    />
                                </g>
                                <motion.g
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{ duration: 0.65, delay: 0.12, ease: "backOut" }}
                                    style={{ transformOrigin: "310px 213px" }}
                                    filter="url(#filter2_dd_0_1)"
                                >
                                    <circle cx="310" cy="213" r="22.5" fill="#FFD700" />
                                    <circle cx="310" cy="213" r="20.25" stroke="#121212" strokeWidth="4.5" fill="none" />
                                </motion.g>

                                {/* Connector and Circle 2 - Stevenage (at spot 2) */}
                                <g filter="url(#filter3_d_0_1)">
                                    <motion.rect
                                        initial={{ scaleY: 0 }}
                                        whileInView={{ scaleY: 1 }}
                                        viewport={{ once: true, amount: 0.15 }}
                                        transition={{ duration: 0.65, delay: 0.34, ease: "easeOut" }}
                                        style={{ originY: "218px" }}
                                        x="733" y="144" width="4" height="74" fill="#FFD700"
                                    />
                                </g>
                                <motion.g
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{ duration: 0.65, delay: 0.28, ease: "backOut" }}
                                    style={{ transformOrigin: "735px 213px" }}
                                    filter="url(#filter4_dd_0_1)"
                                >
                                    <circle cx="735" cy="213" r="22.5" fill="#FFD700" />
                                    <circle cx="735" cy="213" r="20.25" stroke="#121212" strokeWidth="4.5" fill="none" />
                                </motion.g>

                                {/* Connector and Circle 3 - Where Next (at spot 3) */}
                                <g filter="url(#filter5_d_0_1)">
                                    <motion.rect
                                        initial={{ scaleY: 0 }}
                                        whileInView={{ scaleY: 1 }}
                                        viewport={{ once: true, amount: 0.15 }}
                                        transition={{ duration: 0.65, delay: 0.5, ease: "easeOut" }}
                                        style={{ originY: 0 }}
                                        x="1163" y="228" width="3.34212" height="53.4739" fill="#FFD700"
                                    />
                                </g>
                                <motion.g
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{ duration: 0.65, delay: 0.44, ease: "backOut" }}
                                    style={{ transformOrigin: "1164px 213px" }}
                                    filter="url(#filter6_dd_0_1)"
                                >
                                    <circle cx="1164" cy="213" r="22.5" fill="#FFD700" />
                                    <circle cx="1164" cy="213" r="20.25" stroke="#121212" strokeWidth="4.5" fill="none" />
                                </motion.g>

                                <defs>
                                    <filter id="filter0_d_0_1" x="-22.5" y="187" width="1485" height="51.75" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset />
                                        <feGaussianBlur stdDeviation="11.25" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.843137 0 0 0 0 0 0 0 0 0.5 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
                                    </filter>
                                    <filter id="filter1_d_0_1" x="302.145" y="221.316" width="16.7103" height="66.8423" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset />
                                        <feGaussianBlur stdDeviation="3.34212" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.843137 0 0 0 0 0 0 0 0 1 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
                                    </filter>
                                    <filter id="filter2_dd_0_1" x="270.624" y="173.5" width="78.75" height="78.75" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset />
                                        <feGaussianBlur stdDeviation="2.8125" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset />
                                        <feGaussianBlur stdDeviation="8.4375" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.843137 0 0 0 0 0 0 0 0 1 0" />
                                        <feBlend mode="normal" in2="effect1_dropShadow_0_1" result="effect2_dropShadow_0_1" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_0_1" result="shape" />
                                    </filter>
                                    <filter id="filter3_d_0_1" x="724" y="135" width="22" height="92" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset />
                                        <feGaussianBlur stdDeviation="4.5" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.843137 0 0 0 0 0 0 0 0 1 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
                                    </filter>
                                    <filter id="filter4_dd_0_1" x="695.787" y="173.5" width="78.75" height="78.75" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset />
                                        <feGaussianBlur stdDeviation="2.8125" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset />
                                        <feGaussianBlur stdDeviation="8.4375" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.843137 0 0 0 0 0 0 0 0 1 0" />
                                        <feBlend mode="normal" in2="effect1_dropShadow_0_1" result="effect2_dropShadow_0_1" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_0_1" result="shape" />
                                    </filter>
                                    <filter id="filter5_d_0_1" x="1156.32" y="221.316" width="16.7103" height="66.8423" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset />
                                        <feGaussianBlur stdDeviation="3.34212" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.843137 0 0 0 0 0 0 0 0 1 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
                                    </filter>
                                    <filter id="filter6_dd_0_1" x="1124.78" y="173.5" width="78.75" height="78.75" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset />
                                        <feGaussianBlur stdDeviation="2.8125" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset />
                                        <feGaussianBlur stdDeviation="8.4375" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.843137 0 0 0 0 0 0 0 0 1 0" />
                                        <feBlend mode="normal" in2="effect1_dropShadow_0_1" result="effect2_dropShadow_0_1" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_0_1" result="shape" />
                                    </filter>
                                </defs>
                            </svg>

                            {/* Card 1 - Hitchin (2022) */}
                            {data.timeline?.[0] && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0, y: -30 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{ duration: 0.7, delay: 0.22, type: "spring", stiffness: 110 }}
                                    style={{ transformOrigin: "top center" }}
                                    className="absolute left-[21.5%] top-[62%] -translate-x-1/2 z-20 w-[18vw] h-[11vw] rounded-[.7vw] border  border-[#FFD700]/60 pl-[0.8vw] pr-[2vw] py-[2vw] flex flex-col items-start gap-[0vw] bg-black/95 text-left"
                                >
                                    <span className="text-white font-mono text-[2.8vw] font-bold tracking-tight uppercase leading-none mb-[0.5vw]">
                                        {data.timeline[0].year || "2022"}
                                    </span>
                                    <h3 className="text-[4.2vw] text-[#FFD700] font-bold font-peakers tracking-wider leading-none uppercase">
                                        {data.timeline[0].location || "HITCHIN"}
                                    </h3>
                                </motion.div>
                            )}

                            {/* Card 2 - Stevenage (2024) */}
                            {data.timeline?.[1] && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0, y: 30 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{ duration: 0.7, delay: 0.36, type: "spring", stiffness: 110 }}
                                    style={{ transformOrigin: "bottom center" }}
                                    className="absolute left-[51%] bottom-[65%] -translate-x-1/2 z-20 w-[18vw] h-[11vw] rounded-[.7vw] border border-[#FFD700]/60 pl-[0.8vw] pr-[2vw] py-[2vw] flex flex-col items-start gap-[0vw] bg-black/95 text-left"
                                >
                                    <span className="text-white font-mono text-[2.8vw] font-bold tracking-tight uppercase leading-none mb-[0.5vw]">
                                        {data.timeline[1].year || "2024"}
                                    </span>
                                    <h3 className="text-[4vw] text-[#FFD700] font-peakers font-bold tracking-wider leading-none uppercase">
                                        {data.timeline[1].location || "STEVENAGE"}
                                    </h3>
                                </motion.div>
                            )}

                            {/* Card 3 - Where Next? */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0, y: -30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{ duration: 0.7, delay: 0.5, type: "spring", stiffness: 110 }}
                                style={{ transformOrigin: "top center" }}
                                className="absolute left-[80.8%] top-[62%] -translate-x-1/2 z-20 w-[17.5vw] rounded-[.7vw] border border-dashed border-[#FFD700]/60 px-[2vw] py-[1.5vw] flex flex-col items-center gap-[.8vw] bg-black/95"
                            >
                                <h2 className="text-[1.5vw] text-white font-peakers tracking-wide uppercase">
                                    {data.whereNextHeading || "WHERE NEXT ?"}
                                </h2>

                                <input
                                    type="text"
                                    placeholder={data.whereNextPlaceholder || "Suggest a city..."}
                                    className="w-full py-[.6vw] bg-black border border-[#2a2f3a] font-mono text-[0.7vw] text-white placeholder:text-white/40 px-[0.9vw] focus:outline-none"
                                />

                                <button className="w-full h-[2vw] border-[0.15vw] font-mono text-white border-white rounded-[.6vw] text-[0.8vw] tracking-[0.1vw] hover:bg-white hover:text-black transition-all duration-300">
                                    {data.whereNextButtonText || "SUBMIT"}
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* ================= MOBILE VERSION ================= */}
                <div className="xl:hidden w-full px-4 sm:px-6 md:px-10 pt-6 md:pt-8">

                    {/* Mobile Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                        className="text-[clamp(2rem,8vw,3.4rem)] md:text-[clamp(2.2rem,5vw,3.8rem)] font-peakers text-white font-bold mb-5 text-center leading-[0.95]"
                    >
                        {data.heading || "THE PECKERS JOURNEY"}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.08 }}
                        className="text-[clamp(0.68rem,2.8vw,0.9rem)] md:text-[clamp(0.78rem,1.8vw,1rem)] text-[#FFD700] font-mono tracking-[0.28em] leading-[1.45] mb-9 md:mb-10 text-center"
                    >
                        {data.subtitle || "FROM ONE STORE TO GROWING COMMUNITY BRAND THE JOURNEY CONTINUES"}
                    </motion.p>

                    {/* Timeline */}
                    <div className="relative max-w-xs sm:max-w-md md:max-w-lg mx-auto w-full">

                        {/* Animated SVG Line for Mobile */}
                        <div className="absolute left-[18px] top-0 bottom-0 w-[3px] z-20 rounded-full overflow-visible">
                            <div className="absolute inset-0 bg-[#FFD700]/30 rounded-full" />
                            <motion.div
                                initial={{ scaleY: 0 }}
                                whileInView={{ scaleY: 1 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 1.1, ease: "easeOut" }}
                                style={{ originY: 0 }}
                                className="absolute inset-0 rounded-full bg-[#FFD700] shadow-[0_0_18px_rgba(255,215,0,0.8)]"
                            />
                        </div>

                        {data.timeline?.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.12 }}
                                transition={{ duration: 0.6, delay: idx * 0.06, ease: "easeOut" }}
                                style={{ transformOrigin: "left center" }}
                                className="relative mb-14"
                            >
                                {/* Circle Marker - Mobile */}
                                <div className="absolute left-[7px] top-2 z-30">
                                    <svg width="22" height="22" viewBox="0 0 45 45" className="drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">
                                        <motion.circle
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true, amount: 0.12 }}
                                            transition={{ duration: 0.55, delay: (idx * 0.08) + 0.08, ease: "backOut" }}
                                            cx="22.5" cy="22.5" r="21" fill="#FFD700"
                                        />
                                        <circle cx="22.5" cy="22.5" r="18" stroke="#121212" strokeWidth="4" fill="none" />
                                    </svg>
                                </div>

                                <div className="ml-14 bg-[#121212] border border-[#333] rounded-xl p-5 hover:border-[#FFD700]/40 transition-colors shadow-lg">
                                    <div className="text-white text-[clamp(0.9rem,3.5vw,1.2rem)] font-bold opacity-80 mb-1">
                                        {item.year}
                                    </div>
                                    <div className="text-[#FFD700] text-[clamp(1.8rem,8vw,3rem)] font-bold font-peakers uppercase leading-tight">
                                        {item.location}
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* WHERE NEXT */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.12 }}
                            transition={{ duration: 0.6, delay: (data.timeline?.length || 0) * 0.06, ease: "easeOut" }}
                            style={{ transformOrigin: "left center" }}
                            className="relative mb-20"
                        >
                            <div className="absolute left-[7px] top-2 z-30">
                                <svg width="22" height="22" viewBox="0 0 45 45" className="drop-shadow-[0_0_12px_rgba(255,215,0,0.8)] animate-pulse">
                                    <motion.circle
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true, amount: 0.12 }}
                                        transition={{ duration: 0.55, delay: ((data.timeline?.length || 0) * 0.08) + 0.08 }}
                                        cx="22.5" cy="22.5" r="21" fill="#FFD700"
                                    />
                                    <circle cx="22.5" cy="22.5" r="18" stroke="#121212" strokeWidth="4" fill="none" />
                                </svg>
                            </div>

                            <div className="ml-14 bg-[#121212] border border-dashed border-[#FFD700]/60 rounded-xl p-6 shadow-xl">

                                <h2 className="text-center text-white font-bold tracking-widest text-sm mb-4">
                                    {data.whereNextHeading || "WHERE NEXT?"}
                                </h2>

                                <div className="flex flex-col gap-4">
                                    <input
                                        type="text"
                                        placeholder={data.whereNextPlaceholder || "Suggest a city..."}
                                        className="bg-black border border-[#333] p-3 rounded-lg text-white focus:outline-none focus:border-[#FFD700] text-sm"
                                    />

                                    <button className="bg-black text-white py-3 border border-white/20 rounded-full uppercase text-xs tracking-widest hover:border-white transition-all font-bold">
                                        {data.whereNextButtonText || "Submit"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </>
        </section>
    );
}
