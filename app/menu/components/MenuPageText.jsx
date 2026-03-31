"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { client } from "../../../sanity/lib/client";

export default function MenuPageText({ itemData = null }) {
  const containerRef = useRef(null);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const siteSettings = await client.fetch(`*[_type == "siteSettings"][0] { clickCollectUrl, deliveryUrl }`);
        if (siteSettings) setSettings(siteSettings);
      } catch (error) {
        console.error("Error fetching site settings:", error);
      }
    };
    fetchSettings();
  }, []);

  if (!itemData) return null;

  const renderSpiceLevel = () => {
    const bars = [];
    const levelStr = itemData.spiceLevel || "0/4";
    let level = 0;
    if (typeof levelStr === "string" && levelStr.includes("/")) {
      level = parseInt(levelStr.split("/")[0]);
    } else if (typeof levelStr === "number") {
      level = levelStr;
    } else if (levelStr === "Depends") {
      level = 1;
    }
    for (let i = 0; i < 4; i++) {
      bars.push(
        <svg key={i} width="17" height="10" viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="17" height="9" rx="2.5" fill={i < level ? "#F2DF0D" : "white"} fillOpacity={i < level ? "1" : "0.2"} />
        </svg>
      );
    }
    return bars;
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center justify-center mt-0 mb-8 relative bg-black pt-2 md:pt-4">
      <div className="flex items-center mt-0 gap-[2vw] md:gap-[0.85vw] pt-0.5 px-6 md:px-0">
        <svg className="w-[3.5vw] h-[3.5vw] md:w-[20px] md:h-[20px]" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.16667 6.41667C1.16667 6.92222 1.26875 7.40104 1.47292 7.85313C1.67708 8.30521 1.96875 8.70139 2.34792 9.04167C2.33819 8.99306 2.33333 8.94931 2.33333 8.91042C2.33333 8.87153 2.33333 8.82778 2.33333 8.77917C2.33333 8.46805 2.39167 8.17639 2.50833 7.90417C2.625 7.63194 2.79514 7.38403 3.01875 7.16042L4.66667 5.54167L6.31458 7.16042C6.53819 7.38403 6.70833 7.63194 6.825 7.90417C6.94167 8.17639 7 8.46805 7 8.77917C7 8.82778 7 8.87153 7 8.91042C7 8.94931 6.99514 8.99306 6.98542 9.04167C7.36458 8.70139 7.65625 8.30521 7.86042 7.85313C8.06458 7.40104 8.16667 6.41667C8.16667 5.93056 8.07674 5.47118 7.89687 5.03854C7.71701 4.6059 7.45694 4.21944 7.11667 3.87917C6.92222 4.00556 6.71806 4.10035 6.50417 4.16354C6.29028 4.22674 6.07153 4.25833 5.84792 4.25833C5.24514 4.25833 4.72257 4.05903 4.28021 3.66042C3.83785 3.26181 3.58264 2.77083 3.51458 2.1875C3.13542 2.50833 2.8 2.84132 2.50833 3.18646C2.21667 3.5316 1.97118 3.8816 1.77188 4.23646C1.57257 4.59132 1.42188 4.95347 1.31979 5.32292C1.21771 5.69236 1.16667 6.05694 1.16667 6.41667ZM4.66667 7.175L3.83542 7.99167C3.72847 8.09861 3.64583 8.22014 3.5875 8.35625C3.52917 8.49236 3.5 8.63333 3.5 8.77917C3.5 9.09028 3.61424 9.35764 3.84271 9.58125C4.07118 9.80486 4.34583 9.91667 4.66667 9.91667C4.9875 9.91667 5.26215 9.80486 5.49062 9.58125C5.7191 9.35764 5.83333 9.09028 5.83333 8.77917C5.83333 8.62361 5.80417 8.48021 5.74583 8.34896C5.6875 8.21771 5.60486 8.09861 5.49792 7.99167L4.66667 7.175ZM4.66667 0V1.925C4.66667 2.25556 4.7809 2.53264 5.00938 2.75625C5.23785 2.97986 5.51736 3.09167 5.84792 3.09167C6.02292 3.09167 6.18576 3.05521 6.33646 2.98229C6.48715 2.90937 6.62083 2.8 6.7375 2.65417L7 2.33333C7.71944 2.74167 8.28819 3.31042 8.70625 4.03958C9.12431 4.76875 9.33333 5.56111 9.33333 6.41667C9.33333 7.71944 8.88125 8.82292 7.97708 9.72708C7.07292 10.6312 5.96944 11.0833 4.66667 11.0833C3.36389 11.0833 2.26042 10.6312 1.35625 9.72708C0.452083 8.82292 0 7.71944 0 6.41667C0 5.1625 0.420486 3.97153 1.26146 2.84375C2.10243 1.71597 3.2375 0.768056 4.66667 0Z" fill="#F2DF0D" /></svg>
        <span className="text-[3.2vw] md:text-[18px] text-white/80 font-peakers uppercase tracking-wide">{itemData.ingredients}</span>
      </div>
      <div className="flex gap-[3vw] md:gap-3 mt-6">
        <a href={settings?.clickCollectUrl || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-[4vw] py-[1.4vw] md:py-[12px] rounded border-2 border-[#f2df0d] text-white font-mono uppercase tracking-wide text-[2.8vw] md:text-[16px] no-underline hover:bg-[#f2df0d]/10 transition-colors duration-150">Click & Collect</a>
        <a href={settings?.deliveryUrl || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-[5vw] py-[1.4vw] md:py-[12px] rounded border-2 border-[#f2df0d] text-white font-mono uppercase tracking-wide text-[2.8vw] md:text-[16px] no-underline hover:bg-[#f2df0d]/10 transition-colors duration-150">
          Delivery
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[3vw] h-auto md:w-[18px]">
            <path d="M12 1L17 6L12 11M1 6H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
      <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-start gap-[6vw] md:gap-12 mt-8 text-white/90 font-mono px-[5vw] md:px-0">
        <div className="min-w-[150px] border-l-2 border-[#616132] pl-4">
          <div className="text-[#c4b40a] text-[2.5vw] md:text-[12px] font-mono uppercase mb-1 tracking-wide font-bold">Nutrition (Per Portion)</div>
          <div className="font-sans font-semibold text-[3.8vw] md:text-[0.95rem] leading-snug">
            {itemData.protein && itemData.protein !== "-" && itemData.protein !== "—"
              ? (itemData.protein.toLowerCase().includes("protein") ? itemData.protein : `${itemData.protein} Protein`)
              : "— Protein"}
            <br />
            {itemData.carbs && itemData.carbs !== "-" && itemData.carbs !== "—"
              ? (itemData.carbs.toLowerCase().includes("carbs") ? itemData.carbs : `${itemData.carbs} Carbs`)
              : "— Carbs"}
            <br />
            {itemData.fats && itemData.fats !== "-" && itemData.fats !== "—"
              ? (itemData.fats.toLowerCase().includes("fats") ? itemData.fats : `${itemData.fats} Fats`)
              : "— Fats"}
          </div>
        </div>
        <div className="min-w-[120px] border-l-2 md:border-none border-[#616132] pl-4 md:pl-0">
          <div className="text-[#575750] font-mono text-[2.5vw] md:text-[12px] uppercase mb-1 tracking-wide font-bold">Energy & Calories</div>
          <div className="font-sans font-semibold text-[3.8vw] md:text-[0.95rem] leading-snug">
            {itemData.calories && itemData.calories !== "—" && itemData.calories !== "-" ? itemData.calories : "—"}
            <br />
            {itemData.energy && itemData.energy !== "—" && itemData.energy !== "-" ? itemData.energy : "—"}
          </div>
        </div>
        <div className="min-w-[105px] border-l-2 md:border-none border-[#616132] pl-4 md:pl-0">
          <div className="text-[#575750] text-[2.5vw] md:text-[12px] font-mono uppercase mb-1 tracking-wide font-bold">Allergens</div>
          <div className="font-sans font-semibold text-[3.8vw] md:text-[0.95rem]">
            {itemData.allergens && itemData.allergens !== "-" && itemData.allergens !== "—" ? itemData.allergens : "—"}
          </div>
        </div>
        <div className="min-w-[105px] border-l-2 md:border-none border-[#616132] pl-4 md:pl-0">
          <div className="text-[#c4b40a] uppercase mb-1 text-[2.5vw] md:text-[12px] tracking-wide font-bold">Spice Level</div>
          <div className="flex items-center gap-1.5 mt-1 h-[1.1em]">{renderSpiceLevel()}</div>
        </div>
      </div>
      <div className="w-full flex justify-center pt-8 pb-10 text-center px-[5vw]">
        <div className="text-white font-peakers text-[4vw] md:text-[24px] font-normal transition-all duration-300">
          Also available as a{" "}
          <Link href="/menu/wraps" className="text-white hover:text-[#F2DF0D] underline decoration-white/30 underline-offset-4 hover:decoration-[#F2DF0D] transition-colors">wrap</Link>,{" "}
          <Link href="/menu/rice-and-salad-bowls" className="text-white hover:text-[#F2DF0D] underline decoration-white/30 underline-offset-4 hover:decoration-[#F2DF0D] transition-colors">rice bowl</Link>, or{" "}
          <Link href="/menu/rice-and-salad-bowls" className="text-white hover:text-[#F2DF0D] underline decoration-white/30 underline-offset-4 hover:decoration-[#F2DF0D] transition-colors">salad bowl</Link>.
        </div>
      </div>
    </div>
  );
}
