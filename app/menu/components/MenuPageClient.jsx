"use client";

import { useState } from "react";
import MenuTitleSection from "./MenuTitleSection";
import MenuPageText from "./MenuPageText";

export default function GenericMenuPageClient({ initialItems, initialNavbarData, categoryName }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleItemChange = (index) => {
        setActiveIndex(index);
    };

    return (
        <div id="main-content">
            <MenuTitleSection 
                initialItems={initialItems} 
                initialNavbarData={initialNavbarData} 
                onItemChange={handleItemChange}
                categoryName={categoryName}
            />
            <MenuPageText itemData={initialItems[activeIndex]} />
        </div>
    );
}
