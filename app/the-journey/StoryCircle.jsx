"use client";

import { motion } from 'framer-motion';

export default function StoryCircle({ initialData = null }) {
    const data = initialData;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="w-full bg-black text-white px-[6vw] md:px-[4vw] pt-[1vw] pb-[2vw]"
        >
            <div className="flex items-center justify-between gap-[20vw] md:gap-[20vw] w-full">
                <h2 className="text-[5vw] md:text-[3.4vw] text-left font-bold leading-[1.1] py-2 font-peakers tracking-wide md:whitespace-nowrap uppercase">
                    {data?.circleSectionHeading || "A LEGACY THAT CAME FULL CIRCLE"}
                </h2>

                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex-1 h-px bg-[#1F2937] mx-[3vw] md:mx-12"
                ></motion.div>

                <span className="text-white/60 tracking-widest font-sans text-[3vw] md:text-xs whitespace-nowrap uppercase text-right">
                    {data?.establishedYear ? `EST. ${data.establishedYear}` : "EST. EST. 1978"}
                </span>
            </div>

            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-full h-px bg-[#1F2937] mt-[3vw] md:mt-4"
            ></motion.div>

        </motion.section>
    );
}