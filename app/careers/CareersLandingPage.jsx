"use client";
import React from "react";
import { motion } from 'framer-motion';

export default function CareersLandingPage({ initialData }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full min-h-[50vh] md:min-h-[65vh] lg:min-h-[65vh] bg-[#0000] flex flex-col items-center justify-center relative py-[12vh] md:py-[8vh] lg:py-[8vh] overflow-hidden"
        >

            {/* Content Wrapper */}
            <div className="flex flex-col items-center text-center">

                {/* Top Tag */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="border md:border-[0.05vw] rounded-[4px] md:rounded-[.2vw] font-mono border-[#6666] px-5 py-2 text-[10px] md:text-[1.1vw] lg:text-xs tracking-[0.45em] text-gray-300 mb-6 uppercase"
                >
                    {initialData?.tagline || "JOIN THE REVOLUTION"}
                </motion.div>

                {/* Main Heading */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col items-center font-peakers mb-6"
                >
                    <h1 className="text-[14vw] md:text-[8vw] lg:text-[8vw] leading-none text-white font-extrabold uppercase">
                        {initialData?.landingHeading1 || "WORK AT"}
                    </h1>
                    <h1 className="text-[14vw] md:text-[8vw] lg:text-[8vw] leading-none text-white font-extrabold uppercase">
                        {initialData?.landingHeading2 || "PECKERS"}
                    </h1>
                </motion.div>

            </div>

            {/* Scroll Icon */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-[10%] md:bottom-[8%] lg:bottom-[8%] animate-bounce"
            >
                <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 20.1L0 11.1L2.1 8.99998L9 15.8625L15.9 8.99998L18 11.1L9 20.1ZM9 11.1L0 2.09998L2.1 -2.47955e-05L9 6.86248L15.9 -2.47955e-05L18 2.09998L9 11.1Z" fill="#FACC15" fillOpacity="0.7" />
                </svg>
            </motion.div>

        </motion.div>
    );
}