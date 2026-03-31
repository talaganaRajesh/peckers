"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MenuTitleSection from "./MenuTitleSection";
import MenuPageText from "./MenuPageText";

export default function GenericMenuPageClient({ initialItems, initialNavbarData, categoryName }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const handleItemChange = (index) => {
        setActiveIndex(index);
    };

    return (
        <motion.div
            id="main-content"
            className="relative bg-black min-h-screen overflow-hidden"
            initial={{ opacity: 0, scale: 1.05, filter: "blur(15px)" }}
            animate={isLoaded ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
            <MenuTitleSection
                initialItems={initialItems}
                initialNavbarData={initialNavbarData}
                onItemChange={handleItemChange}
                categoryName={categoryName}
            />

            <div key={activeIndex}>
                <MenuPageText itemData={initialItems[activeIndex]} />
            </div>
        </motion.div>
    );
}
