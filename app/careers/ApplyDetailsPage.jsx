"use client";
import React from 'react'
import { motion } from 'framer-motion';

export default function ApplyDetailsPage({ initialData }) {
    return (
        <div className="w-full bg-[#080808] flex justify-center py-[8vh] px-[6vw]">

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full md:w-[50%] border border-gray-700 p-[8vw] md:p-[3vw] text-white"
            >

                {/* Top Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-[4vh] gap-[2vh] md:gap-0">
                    <div className="flex items-center gap-[4vw] md:gap-[2vw] w-full">
                        <h1 className="font-peakers font-semibold text-[10vw] md:text-[3.5vw] tracking-[.15vw] whitespace-nowrap uppercase">
                            {initialData?.applyTitle || "INTERESTED?"}
                        </h1>
                        <div className="h-px bg-gray-700 w-full"></div>
                    </div>

                    <p className="md:ml-[2vw] text-white text-[6vw] md:text-[1.6vw] tracking-tight font-peakers whitespace-nowrap uppercase">
                        {initialData?.applySubtitle || "Let’s do this."}
                    </p>
                </div>

                <div className="w-full h-px bg-gray-800 mb-[5vh]"></div>

                {/* Form */}
                <form className="flex flex-col gap-[4vh]">

                    {/* Name + Email */}
                    <div className="flex flex-col md:flex-row justify-between gap-[4vh] md:gap-[2vw]">

                        <div className="w-full">
                            <label className="block font-mono text-gray-500 text-[3vw] md:text-[0.6vw] tracking-[0.2em] mb-[1vh]">
                                NAME
                            </label>
                            <input
                                type="text"
                                placeholder="YOUR NAME"
                                className="w-full font-mono bg-[#000000] border border-gray-700 px-[4vw] md:px-[1.2vw] py-[2vh] text-gray-300 outline-none text-[4vw] md:text-base"
                            />
                        </div>

                        <div className="w-full">
                            <label className="block font-mono text-gray-500 text-[3vw] md:text-[0.6vw] tracking-[0.2em] mb-[1vh]">
                                EMAIL
                            </label>
                            <input
                                type="email"
                                placeholder="YOUR@EMAIL.COM"
                                className="w-full font-mono bg-[#000000] border border-gray-700 px-[4vw] md:px-[1.2vw] py-[2vh] text-gray-300 outline-none text-[4vw] md:text-base"
                            />
                        </div>

                    </div>

                    {/* Textarea */}
                    <div>
                        <label className="block font-mono text-gray-500 text-[3vw] md:text-[0.6vw] tracking-[0.2em] mb-[1vh]">
                            TELL US ABOUT YOU
                        </label>
                        <textarea
                            rows="5"
                            placeholder="WHY PECKERS? WHAT'S YOUR STORY?"
                            className="w-full font-mono bg-[#000000] border border-gray-700 px-[4vw] md:px-[1.2vw] py-[2vh] text-gray-300 outline-none resize-none text-[4vw] md:text-base"
                        ></textarea>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-white text-black font-bold py-[2.5vh] text-[4.5vw] md:text-[1.1vw] tracking-wide hover:bg-gray-200 transition uppercase"
                    >
                        SEND IT →
                    </button>

                </form>

            </motion.div>
        </div>
    )
}
