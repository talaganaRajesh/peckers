"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SubNavbar() {
  const pathname = usePathname();
  const navRef = useRef(null);
  const itemRefs = useRef([]);

  const navbarData = [
    { title: "BURGERS", link: "/menu" },
    { title: "WRAPS", link: "/menu/wraps" },
    { title: "RICE BOWLS & SALAD BOWLS", link: "/menu/rice-and-salad-bowls" },
    { title: "WINGS", link: "/menu/wings" },
    { title: "TENDERS", link: "/menu/tenders" },
    { title: "MEAL BOXES AND PLATTERS", link: "/menu/meal-box" },
    { title: "KIDS", link: "/menu/kids" },
    { title: "SIDES", link: "/menu/sides-and-fries" },
    { title: "DRINKS", link: "/menu/drinks-and-desserts" },
    { title: "VEGGIE", link: "/menu/veg" },
  ];

  const scrollActiveToCenter = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;
    const activeIdx = navbarData.findIndex((item) => {
      const normalizedItemLink = (item.link || "").replace(/\/$/, "");
      const normalizedCurrentPath = pathname.replace(/\/$/, "");
      return (
        normalizedItemLink === normalizedCurrentPath ||
        (normalizedItemLink === "/menu" && normalizedCurrentPath === "/menu")
      );
    });
    const activeEl = itemRefs.current[activeIdx];
    if (!activeEl) return;

    const navRect = nav.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();
    const elCenter =
      elRect.left + elRect.width / 2 - navRect.left + nav.scrollLeft;
    const targetScroll = elCenter - navRect.width / 2;

    nav.scrollTo({ left: targetScroll, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    scrollActiveToCenter();
  }, [scrollActiveToCenter]);

  return (
    <div className="w-full flex justify-center px-4 md:px-0 z-50 bg-black pt-4 md:pt-6">
      <nav
        className="subnavbar relative group w-full max-w-7xl"
        style={{ color: "white" }}
      >
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>

        {/* Scroll Buttons */}
        <button
          onClick={() => {
            if (navRef.current) {
              navRef.current.scrollBy({ left: -250, behavior: "smooth" });
            }
          }}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity bg-black/50 rounded-full"
          aria-label="Scroll Left"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 text-[#EAB308]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => {
            if (navRef.current) {
              navRef.current.scrollBy({ left: 250, behavior: "smooth" });
            }
          }}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity bg-black/50 rounded-full"
          aria-label="Scroll Right"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 text-[#EAB308]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div
          ref={navRef}
          className="flex font-sans gap-[6vw] md:gap-6 lg:gap-8 xl:gap-[3.4vw] justify-start items-center overflow-x-auto no-scrollbar px-2 md:px-14 pt-[4vw] sm:pt-[4vw] md:pt-4 lg:pt-6 xl:pt-[1.5vw] scroll-smooth"
          style={{
            fontFamily: "var(--font-peakers)",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {navbarData.map((item, idx) => {
            const title = item.title?.toUpperCase() || "";
            let href = item.link || "#";

            if (title === "BURGERS") href = "/menu";
            else if (title === "WRAPS") href = "/menu/wraps";
            else if (title === "WINGS") href = "/menu/wings";
            else if (title === "TENDERS") href = "/menu/tenders";
            else if (title === "RICE BOWLS & SALAD BOWLS")
              href = "/menu/rice-and-salad-bowls";
            else if (title === "MEAL BOXES AND PLATTERS")
              href = "/menu/meal-box";
            else if (title === "KIDS") href = "/menu/kids";
            else if (title === "SIDES") href = "/menu/sides-and-fries";
            else if (title === "DRINKS") href = "/menu/drinks-and-desserts";
            else if (title === "VEGGIE") href = "/menu/veg";

            const normalizedItemLink = href.replace(/\/$/, "");
            const normalizedCurrentPath = pathname.replace(/\/$/, "");
            const isActive =
              normalizedItemLink === normalizedCurrentPath ||
              (normalizedItemLink === "/menu" &&
                normalizedCurrentPath === "/menu");

            return (
              <Link
                key={idx}
                ref={(el) => (itemRefs.current[idx] = el)}
                href={href}
                className={`whitespace-nowrap pb-1 md:pb-1 tracking-wider text-[16px] sm:text-[20px] md:text-[16px] lg:text-[18px] xl:text-[1.3vw] ${
                  isActive
                    ? "border-b-2 border-red-500"
                    : "opacity-70 hover:opacity-100 transition-opacity"
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
