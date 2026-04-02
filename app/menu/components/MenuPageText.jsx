"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { client } from "../../../sanity/lib/client";

export default function MenuPageText({ itemData = null, categoryName = "" }) {
  const containerRef = useRef(null);
  const [settings, setSettings] = useState(null);
  const ingredientsText = typeof itemData?.ingredients === "string" ? itemData.ingredients.trim() : "";
  const hasIngredients = ingredientsText !== "" && ingredientsText !== "-" && ingredientsText !== "—";

  useEffect(() => {
    const loadSettings = async () => {
      if (typeof window !== "undefined" && window.location.hostname.includes("localhost")) {
        setSettings({
          clickCollectUrl: "#",
          deliveryUrl: "#",
        });
        return;
      }

      try {
        const siteSettings = await client.fetch(`*[_type == "siteSettings"][0] { clickCollectUrl, deliveryUrl }`);
        if (siteSettings) setSettings(siteSettings);
      } catch (error) {
        // Graceful fallbacks to avoid noisy console errors in dev mode when CORS or network is unavailable.
        setSettings({ clickCollectUrl: "#", deliveryUrl: "#" });
        console.warn("Unable to fetch site settings at this time; using defaults.", error);
      }
    };

    loadSettings();
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
      {hasIngredients ? (
        <div className="flex items-center justify-center mt-0 pt-0.5 px-6 md:px-0">
          <span className="text-[3.2vw] md:text-[18px] text-white/80 font-peakers uppercase tracking-wide">{ingredientsText}</span>
        </div>
      ) : null}
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
      {['BURGERS','WRAPS','RICE BOWLS','SALAD BOWLS','RICE & SALAD BOWLS','RICE BOWLS & SALAD BOWLS','RICE AND SALAD BOWLS'].includes((categoryName || "").toUpperCase()) && (
        <div className="w-full flex justify-center pt-2 pb-2 text-center px-[5vw]">
          <div className="text-white font-peakers text-[4vw] md:text-[22px] font-normal transition-all duration-300">
            {(() => {
              const key = (categoryName || "").toUpperCase();
              if (key === "BURGERS") {
                return (
                  <>Also available as a <Link href="/menu/wraps" className="text-white hover:text-[#F2DF0D] underline decoration-white/30 underline-offset-4 hover:decoration-[#F2DF0D] transition-colors">wrap</Link>, <Link href="/menu/rice-and-salad-bowls" className="text-white hover:text-[#F2DF0D] underline decoration-white/30 underline-offset-4 hover:decoration-[#F2DF0D] transition-colors">rice bowl</Link>, or <Link href="/menu/rice-and-salad-bowls" className="text-white hover:text-[#F2DF0D] underline decoration-white/30 underline-offset-4 hover:decoration-[#F2DF0D] transition-colors">salad bowl</Link>.</>
                );
              }
              if (key === "WRAPS") {
                return (
                  <>Also available as a <Link href="/menu" className="text-white hover:text-[#F2DF0D] underline decoration-white/30 underline-offset-4 hover:decoration-[#F2DF0D] transition-colors">burger</Link>, <Link href="/menu/rice-and-salad-bowls" className="text-white hover:text-[#F2DF0D] underline decoration-white/30 underline-offset-4 hover:decoration-[#F2DF0D] transition-colors">rice bowl</Link>, or <Link href="/menu/rice-and-salad-bowls" className="text-white hover:text-[#F2DF0D] underline decoration-white/30 underline-offset-4 hover:decoration-[#F2DF0D] transition-colors">salad bowl</Link>.</>
                );
              }
              //  Rice/Salad cases
              return (
                <>Also available as a <Link href="/menu" className="text-white hover:text-[#F2DF0D] underline decoration-white/30 underline-offset-4 hover:decoration-[#F2DF0D] transition-colors">burger</Link> and <Link href="/menu/wraps" className="text-white hover:text-[#F2DF0D] underline decoration-white/30 underline-offset-4 hover:decoration-[#F2DF0D] transition-colors">wrap</Link>.</>
              );
            })()}
          </div>
        </div>
      )}
      {['BURGERS','WRAPS','RICE BOWLS','SALAD BOWLS','RICE & SALAD BOWLS','RICE BOWLS & SALAD BOWLS','RICE AND SALAD BOWLS','SALAD BOWL','RICE BOWL'].includes(categoryName?.toUpperCase?.() || '') && (
        <div className="w-full flex justify-center pt-0 pb-2 text-center px-[5vw]">
          <span className="text-white font-peakers text-[2.8vw] md:text-[14px] lg:text-[15px] xl:text-[1.35vw] tracking-3 font-normal">
            Can also be made into a veggie option
          </span>
        </div>
      )}
    </div>
  );
}
