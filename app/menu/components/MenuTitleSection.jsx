"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";

// SVG as a React Component - only the blurred radial shadow
const DropShadowSVG = () => (
  <svg
    width="776"
    height="776"
    viewBox="0 0 776 776"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: "absolute",
      left: "50%",
      top: "40%",
      transform: "translate(-50%, -60%)",
      pointerEvents: "none",
      zIndex: 0,
      width: "clamp(250px, 50vw, 760px)",
      height: "clamp(250px, 50vw, 760px)",
      mixBlendMode: "screen",
    }}
    aria-hidden="true"
  >
    <defs>
      <filter id="menuGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="35" />
      </filter>
      <radialGradient id="menuWhiteGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="40%" stopColor="#ffffff" stopOpacity="0.5" />
        <stop offset="70%" stopColor="#ffffff" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
    </defs>

    <circle
      cx="388"
      cy="388"
      r="250"
      fill="url(#menuWhiteGlow)"
      filter="url(#menuGlow)"
    />
  </svg>
);

const POS_MAPPING_TABLET = {
  0: { x: 0, y: 0, scale: 1, opacity: 1, z: 10 },
  1: { x: 30, y: -50, scale: 0.45, opacity: 0.85, z: 5 },
  [-1]: { x: -30, y: -50, scale: 0.45, opacity: 0.85, z: 5 },
  2: { x: 18, y: -100, scale: 0.2, opacity: 0.4, z: 1 },
  [-2]: { x: -18, y: -100, scale: 0.2, opacity: 0.4, z: 1 },
};

const POS_MAPPING_LAPTOP = {
  0: { x: 0, y: 0, scale: 1, opacity: 1, z: 10 },
  1: { x: 25, y: -40, scale: 0.45, opacity: 0.8, z: 8 },
  [-1]: { x: -25, y: -40, scale: 0.45, opacity: 0.8, z: 8 },
  2: { x: 36, y: -80, scale: 0.25, opacity: 0.6, z: 6 },
  [-2]: { x: -36, y: -80, scale: 0.25, opacity: 0.6, z: 6 },
  3: { x: 21, y: -120, scale: 0.15, opacity: 0.3, z: 4 },
  [-3]: { x: -21, y: -120, scale: 0.15, opacity: 0.3, z: 4 },
};

function getSlotPos(slot, isLaptop = false) {
  const mapping = isLaptop ? POS_MAPPING_LAPTOP : POS_MAPPING_TABLET;
  if (mapping[slot]) return mapping[slot];
  return { x: 0, y: -120, scale: 0, opacity: 0, z: -1 };
}

export default function MenuTitleSection({
  initialItems = [],
  initialNavbarData = [],
  onItemChange = null,
  categoryName = "MENU"
}) {
  const [items] = useState(initialItems);
  const pathname = usePathname();
  const navRef = useRef(null);

  const DEFAULT_NAVBAR = [
    { title: "BURGERS", link: "/menu" },
    { title: "WRAPS", link: "/menu/wraps" },
    { title: "RICE BOWLS", link: "/menu/rice-bowls" },
    { title: "SALAD BOWLS", link: "/menu/salad-bowls" },
    { title: "WINGS & TENDERS", link: "/menu/wings-and-tenders" },
    { title: "PERI-PERI GRILL", link: "/menu/peri-peri-grilled-chicken" },
    { title: "WHAT'S NEW", link: "/menu/whats-new" },
    { title: "SHAKES", link: "/menu/shakes" },
    { title: "VEG", link: "/menu/veg" },
    { title: "SIDES & FRIES", link: "/menu/sides-and-fries" },
    { title: "MEAL BOX", link: "/menu/meal-box" },
    { title: "KIDS", link: "/menu/kids" },
    { title: "LUNCH TIME DEALS", link: "/menu/lunch-time-deals" },
  ];

  // Ensure all categories from the document are present, merging with Sanity data if available
  const mergedNavbarData = useMemo(() => {
    if (!initialNavbarData || initialNavbarData.length === 0) return DEFAULT_NAVBAR;

    const existingTitles = new Set(initialNavbarData.map(item => item.title.toUpperCase()));
    const missingItems = DEFAULT_NAVBAR.filter(item => !existingTitles.has(item.title.toUpperCase()));

    return [...initialNavbarData, ...missingItems];
  }, [initialNavbarData]);

  const [navbarData] = useState(mergedNavbarData);

  const [carousel, setCarousel] = useState(() => {
    if (initialItems.length > 0) {
      const initialCards = initialItems.map((_, i) => {
        let diff = i;
        if (diff > initialItems.length / 2) diff -= initialItems.length;
        if (diff < -initialItems.length / 2) diff += initialItems.length;
        return { id: i, index: i, slot: diff };
      });
      return { center: 0, cards: initialCards };
    }
    return { center: 0, cards: [] };
  });

  const animatingRef = useRef(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [glowVisible, setGlowVisible] = useState(true);

  const TOTAL = items.length;

  useEffect(() => {
    if (onItemChange) {
      onItemChange(carousel.center);
    }
  }, [carousel.center, onItemChange]);

  const getModIndex = useCallback((idx) => {
    return ((idx % TOTAL) + TOTAL) % TOTAL;
  }, [TOTAL]);

  const moveBy = useCallback((steps) => {
    if (steps === 0 || animatingRef.current || TOTAL === 0) return;

    animatingRef.current = true;
    setIsAnimating(true);
    setGlowVisible(false);

    setCarousel((prev) => {
      const nextCenter = getModIndex(prev.center + steps);
      const nextCards = prev.cards.map((card) => {
        let diff = card.index - nextCenter;
        if (diff > TOTAL / 2) diff -= TOTAL;
        if (diff < -TOTAL / 2) diff += TOTAL;
        return { ...card, slot: diff };
      });
      return { center: nextCenter, cards: nextCards };
    });

    setTimeout(() => { setGlowVisible(true); }, 150);
    setTimeout(() => { animatingRef.current = false; setIsAnimating(false); }, 650);
  }, [getModIndex, TOTAL]);

  const handleCardClick = useCallback((clickedSlot) => { moveBy(clickedSlot); }, [moveBy]);
  const goNext = useCallback(() => moveBy(1), [moveBy]);
  const goPrev = useCallback(() => moveBy(-1), [moveBy]);

  if (TOTAL === 0) return null;

  return (
    <>
      <div
        className="relative w-full flex flex-col items-center justify-start overflow-hidden pt-0 md:pt-[1vh] min-h-0 pb-[4vh] md:pb-0"
        style={{
          background: "radial-gradient(ellipse 50% 52% at 50% 38%, #1c1c1c 0%, #0d0d0d 26%, #070707 58%, #000 100%)",
        }}
      >
        {/* SUB-NAV */}
        <div className="w-full flex justify-center px-4 md:px-0">
          <nav className="subnavbar relative group w-full max-w-7xl" style={{ color: "white" }}>
            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>

            {/* Scroll Buttons */}
            <button
              onClick={() => {
                if (navRef.current) {
                  navRef.current.scrollBy({ left: -250, behavior: 'smooth' });
                }
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-full"
              aria-label="Scroll Left"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#EAB308]" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => {
                if (navRef.current) {
                  navRef.current.scrollBy({ left: 250, behavior: 'smooth' });
                }
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-full"
              aria-label="Scroll Right"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#EAB308]" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div
              ref={navRef}
              className="flex font-['Share_Tech'] gap-[6vw] md:gap-6 lg:gap-8 xl:gap-[3.4vw] justify-start items-center overflow-x-auto no-scrollbar px-2 md:px-14 pt-[4vw] sm:pt-[4vw] md:pt-4 lg:pt-6 xl:pt-[1.5vw] scroll-smooth"
              style={{ fontFamily: "var(--font-peakers)", scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {navbarData.map((item, idx) => {
                // Route mapping logic
                const title = item.title?.toUpperCase() || "";
                let href = item.link || "#";

                // Explicitly force route for Burgers and Wraps
                if (title === "BURGERS") href = "/menu";
                else if (title === "WRAPS") href = "/menu/wraps";
                else if (href === "#" || !href || href.startsWith("#")) {
                  if (title === "RICE BOWLS") href = "/menu/rice-bowls";
                  else if (title === "SALAD BOWLS") href = "/menu/salad-bowls";
                  else if (title === "WINGS & TENDERS") href = "/menu/wings-and-tenders";
                  else if (title === "PERI-PERI GRILL" || title === "GRILLED") href = "/menu/peri-peri-grilled-chicken";
                  else if (title === "WHAT'S NEW") href = "/menu/whats-new";
                  else if (title === "SHAKES" || title === "DRINKS") href = "/menu/shakes";
                  else if (title === "VEG") href = "/menu/veg";
                  else if (title === "SIDES & FRIES" || title === "SIDES") href = "/menu/sides-and-fries";
                  else if (title === "MEAL BOX") href = "/menu/meal-box";
                  else if (title === "KIDS") href = "/menu/kids";
                  else if (title === "LUNCH TIME DEALS") href = "/menu/lunch-time-deals";
                }

                const normalizedItemLink = href.replace(/\/$/, "");
                const normalizedCurrentPath = pathname.replace(/\/$/, "");
                const isActive = normalizedItemLink === normalizedCurrentPath || (normalizedItemLink === "/menu" && normalizedCurrentPath === "/menu");

                return (
                  <Link
                    key={idx}
                    href={href}
                    className={`whitespace-nowrap pb-1 md:pb-1 tracking-wider ${isActive
                      ? "font-sharetech text-[18px] sm:text-[22px] md:text-[16px] lg:text-[18px] xl:text-[1.3vw] border-b-2 border-red-500"
                      : "text-[16px] sm:text-[20px] md:text-[16px] lg:text-[18px] xl:text-[1.4vw] tracking-wide opacity-70 hover:opacity-100 transition-opacity"
                      }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        {/* STAGE */}
        <div
          className="relative w-full flex items-center justify-center mt-[8vw] md:mt-0"
          style={{ height: "clamp(230px, 42vw, 450px)" }}
        >
          {/* NAVIGATION ARROWS */}
          <button
            onClick={goPrev}
            className="absolute left-[2vw] sm:left-[4vw] md:left-[6vw] top-1/2 -translate-y-1/2 z-30 p-[1vw] group"
            disabled={isAnimating}
          >
            <div className="relative flex items-center justify-center w-[28px] h-[28px] md:w-[56px] md:h-[56px]">
              <div className="w-full h-full flex items-center justify-center transition-all duration-300 group-active:scale-90 md:rounded-full md:bg-black md:border md:border-[#EAB308]/60 md:group-hover:border-[#EAB308] md:group-hover:shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                <svg viewBox="0 0 100 100" className="w-[65%] h-[65%] md:w-[45%] md:h-[45%] text-[#EAB308] rotate-180" fill="currentColor">
                  <path d="M45 20 L85 50 L45 80 L58 50 Z" />
                  <path d="M15 25 L50 50 L15 75 L28 50 Z" className="opacity-40" />
                </svg>
              </div>
            </div>
          </button>

          <button
            onClick={goNext}
            className="absolute right-[2vw] sm:right-[4vw] md:right-[6vw] top-1/2 -translate-y-1/2 z-30 p-[1vw] group"
            disabled={isAnimating}
          >
            <div className="relative flex items-center justify-center w-[28px] h-[28px] md:w-[56px] md:h-[56px]">
              <div className="w-full h-full flex items-center justify-center transition-all duration-300 group-active:scale-90 md:rounded-full md:bg-black md:border md:border-[#EAB308]/60 md:group-hover:border-[#EAB308] md:group-hover:shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                <svg viewBox="0 0 100 100" className="w-[65%] h-[65%] md:w-[45%] md:h-[45%] text-[#EAB308]" fill="currentColor">
                  <path d="M45 20 L85 50 L45 80 L58 50 Z" />
                  <path d="M15 25 L50 50 L15 75 L28 50 Z" className="opacity-40" />
                </svg>
              </div>
            </div>
          </button>

          {/* SVG Drop Shadow */}
          <div className="hidden md:block" style={{ position: "absolute", left: "50%", top: "52%", transform: "translate(-50%, -33%)", zIndex: 1, pointerEvents: "none", width: "clamp(280px, 50vw, 760px)", height: "clamp(280px, 50vw, 760px)", opacity: glowVisible ? 0.5 : 0, transition: glowVisible ? "opacity 0.4s ease" : "opacity 0.1s ease" }} aria-hidden="true" >
            <DropShadowSVG />
          </div>

          {/* Mobile-only: simple carousel with swiping */}
          <div className="md:hidden absolute inset-0 flex items-center justify-center overflow-visible pointer-events-none">
            <AnimatePresence initial={false}>
              {carousel.cards.map((card) => {
                const item = items[card.index];
                const isCenter = card.slot === 0;
                const isVisible = Math.abs(card.slot) <= 1;

                if (!isVisible) return null;

                return (
                  <motion.div
                    key={`mob-${card.id}`}
                    className="absolute border-none"
                    initial={false}
                    animate={{
                      x: `calc(-50% + ${card.slot * 75}vw)`,
                      y: "-50%",
                      scale: isCenter ? (item.boost || 1) : 0.7 * (item.boost || 1),
                      opacity: isCenter ? 1 : 0.4,
                      zIndex: isCenter ? 10 : 5,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 25,
                    }}
                    style={{
                      left: "50%",
                      top: "50%",
                      pointerEvents: isCenter ? "auto" : "none",
                      userSelect: "none",
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.4}
                    onDragEnd={(e, info) => {
                      const swipeThreshold = 50;
                      if (info.offset.x < -swipeThreshold) {
                        goNext();
                      } else if (info.offset.x > swipeThreshold) {
                        goPrev();
                      }
                    }}
                  >
                    <div className="relative" style={{ width: "clamp(200px, 75vw, 340px)", height: "auto", aspectRatio: "1/1" }}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        priority={isCenter}
                        className="object-contain"
                        draggable={false}
                        sizes="clamp(200px, 75vw, 340px)"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Tablet-only: full multi-card stacked carousel */}
          {carousel.cards.map((card) => {
            const cfg = getSlotPos(card.slot, false);
            const item = items[card.index];
            const isCenter = card.slot === 0;

            return (
              <div
                key={`tab-${card.id}`}
                className="hidden md:block lg:hidden"
                onClick={() =>
                  !isCenter && !isAnimating && Math.abs(card.slot) <= 2 && handleCardClick(card.slot)
                }
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `
                    translate(calc(-50% + ${cfg.x}vw), calc(-50% + ${cfg.y}px))
                    scale(${cfg.scale * (item.boost || 1)})
                  `,
                  opacity: cfg.opacity,
                  zIndex: cfg.z,
                  transition: "transform .5s ease, opacity .5s ease",
                  pointerEvents: isCenter
                    ? "none"
                    : isAnimating
                      ? "none"
                      : "auto",
                  cursor: isCenter ? "default" : isAnimating ? "wait" : "pointer",
                  userSelect: "none",
                }}
              >
                <div className="relative" style={{ width: "clamp(220px, 45vw, 520px)", height: "auto", aspectRatio: "1/1" }}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    priority={isCenter}
                    className={`object-contain ${isCenter ? 'drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)]' : ''}`}
                    draggable={false}
                    sizes="clamp(220px, 45vw, 520px)"
                  />
                </div>
              </div>
            );
          })}

          {/* Laptop-only: full multi-card stacked carousel (7 items) */}
          {carousel.cards.map((card) => {
            const cfg = getSlotPos(card.slot, true);
            const item = items[card.index];
            const isCenter = card.slot === 0;

            return (
              <div
                key={`lap-${card.id}`}
                className="hidden lg:block"
                onClick={() =>
                  !isCenter && !isAnimating && Math.abs(card.slot) <= 3 && handleCardClick(card.slot)
                }
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `
                    translate(calc(-50% + ${cfg.x}vw), calc(-50% + ${cfg.y}px))
                    scale(${cfg.scale * (item.boost || 1)})
                  `,
                  opacity: cfg.opacity,
                  zIndex: cfg.z,
                  transition: "transform .5s ease, opacity .5s ease",
                  pointerEvents: isCenter
                    ? "none"
                    : isAnimating
                      ? "none"
                      : "auto",
                  cursor: isCenter ? "default" : isAnimating ? "wait" : "pointer",
                  userSelect: "none",
                }}
              >
                <div
                  className="relative"
                  style={{
                    width: "clamp(220px, 45vw, 520px)",
                    height: "auto",
                    aspectRatio: "1/1",
                    filter: isCenter ? "drop-shadow(0 5px 15px rgba(0,0,0,0.3))" : "none",
                    transition: "filter .4s ease"
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    priority={isCenter}
                    className="object-contain"
                    draggable={false}
                    sizes="clamp(220px, 45vw, 520px)"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* TITLE */}
        <div className="w-full flex items-center justify-center relative pb-2 md:pb-4 pt-2 md:pt-2 z-20 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h1
              key={carousel.center}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="uppercase text-white text-center font-black text-[clamp(1.25rem,6.4vw,1.7rem)] md:text-[clamp(1.8rem,9vw,4rem)]"
              style={{ fontFamily: "var(--font-peakers)", fontWeight: 900, letterSpacing: "0.05em", lineHeight: "1.1", textShadow: "0px 2px 6px rgba(0,0,0,0.4)" }}
            >
              {items[carousel.center]?.name}
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
