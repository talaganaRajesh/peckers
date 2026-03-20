"use client";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";

export default function CoopImages({ locations = [] }) {
  const hitchin = locations.find(l => l.name?.trim().toLowerCase() === "hitchin");
  const stevenage = locations.find(l => l.name?.trim().toLowerCase() === "stevenage");

  const HITCHIN_IMG = hitchin?.image?.asset?.url || null;
  const STEVENAGE_IMG = stevenage?.image?.asset?.url || null;

  return (
    <div
      className="flex flex-col lg:flex-row gap-[8vw] md:gap-[5vw] lg:gap-[2.5vw] xl:gap-[1.5vw] w-full justify-between items-center px-[5vw] md:px-[6vw] lg:px-[2.5vw] xl:px-[1.3vw] pt-[2vw] pb-[10vw] lg:py-[7vw] xl:py-[5vw]"
    >
      {/* Hitchin Mobile & Tablet */}
      <Link
        href="/hitchin"
        className="flex lg:hidden w-full items-center justify-between bg-[#1a1a1a] rounded-[3vw] md:rounded-[2vw] p-[3vw] md:p-[2vw] shadow-lg border border-[#333] transition-all duration-300 active:scale-95"
      >
        <div className="flex items-center gap-[2vw] md:gap-[3vw] pl-[2vw] md:pl-[3vw]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-600 w-[7vw] h-[7vw] md:w-[8vw] md:h-[8vw]">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor" />
          </svg>
          <span className="text-white text-[6.5vw] md:text-[7.5vw] uppercase tracking-wide" style={{ fontFamily: "var(--font-peakers)" }}>{hitchin?.name || "Hitchin"}</span>
        </div>
        <div className="relative w-[30vw] h-[25vw] md:w-[40vw] md:h-[30vw]">
          {HITCHIN_IMG && (
            <Image
              src={HITCHIN_IMG}
              alt={`Peckers Hitchin - Best Halal Peri Peri Grilled Chicken and Takeaway in Hitchin`}
              fill
              className="object-cover rounded-[2vw] md:rounded-[1.5vw] shadow-md border border-[#333]"
              sizes="30vw"
            />
          )}
        </div>
      </Link>

      {/* Hitchin Desktop & Laptop */}
      <Link
        href="/hitchin"
        className="coop-card group hidden lg:flex relative w-[31vw] xl:w-[37vw] h-[22vw] xl:h-[19vw] items-center justify-center rounded-[1.5vw] xl:rounded-lg overflow-hidden shadow-lg bg-black/40 transition-all duration-500 hover:opacity-90 hover:scale-[1.01]"
      >
        {HITCHIN_IMG && (
          <Image
            src={HITCHIN_IMG}
            alt={`Peckers Hitchin - Premium Halal Fried Chicken and Peri Peri Takeaway`}
            fill
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="35vw"
          />
        )}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
        <span
          className="relative z-10 text-white text-[3.5vw] xl:text-[3vw] drop-shadow-lg uppercase"
          style={{ fontFamily: "var(--font-peakers)" }}
        >
          {hitchin?.name || "Hitchin"}
        </span>
      </Link>

      {/* Stevenage Mobile & Tablet */}
      <Link
        href="/stevenage"
        className="flex lg:hidden w-full items-center justify-between bg-[#1a1a1a] rounded-[3vw] md:rounded-[2vw] p-[3vw] md:p-[2vw] shadow-lg border border-[#333] transition-all duration-300 active:scale-95"
      >
        <div className="relative w-[30vw] h-[25vw] md:w-[40vw] md:h-[30vw]">
          {STEVENAGE_IMG && (
            <Image
              src={STEVENAGE_IMG}
              alt={`Peckers Stevenage - Best Halal Chicken Restaurant and Delivery in Stevenage`}
              fill
              className="object-cover rounded-[2vw] md:rounded-[1.5vw] shadow-md border border-[#333]"
              sizes="30vw"
            />
          )}
        </div>
        <div className="flex items-center gap-[2vw] md:gap-[3vw] pr-[2vw] md:pr-[3vw]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-600 w-[7vw] h-[7vw] md:w-[8vw] md:h-[8vw]">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor" />
          </svg>
          <span className="text-white text-[6.5vw] md:text-[7.5vw] uppercase tracking-wide text-right" style={{ fontFamily: "var(--font-peakers)" }}>{stevenage?.name || "Stevenage"}</span>
        </div>
      </Link>

      {/* Stevenage Desktop & Laptop */}
      <Link
        href="/stevenage"
        className="coop-card group hidden lg:flex relative w-[31vw] xl:w-[37vw] h-[22vw] xl:h-[19vw] items-center justify-center rounded-[1.5vw] xl:rounded-lg overflow-hidden shadow-lg bg-black/40 transition-all duration-500 hover:opacity-90 hover:scale-[1.01]"
      >
        {STEVENAGE_IMG && (
          <Image
            src={STEVENAGE_IMG}
            alt={`Peckers Stevenage - Top Rated Peri Peri Grilled Chicken and Halal Food Hertfordshire`}
            fill
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="35vw"
          />
        )}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
        <span
          className="relative z-10 text-white text-[3.5vw] xl:text-[3vw] drop-shadow-lg uppercase"
          style={{ fontFamily: "var(--font-peakers)" }}
        >
          {stevenage?.name || "Stevenage"}
        </span>
      </Link>

      {/* Third Card */}
      <div className="coop-card w-full lg:w-[31vw] xl:w-[35vw] h-[60vw] md:h-[50vw] lg:h-[22vw] xl:h-[19vw] bg-[#2222] rounded-[3vw] md:rounded-[2vw] lg:rounded-[1.5vw] xl:rounded-lg flex flex-col items-center justify-center border border-[#383838] px-[4vw] md:px-[6vw] lg:px-[2vw] xl:px-[1vw] py-[4vw] md:py-[6vw] lg:py-[1.5vw] xl:py-[1vw]">
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#2222] px-[4vw] md:px-[6vw] lg:px-[2vw] xl:px-[2vw] py-[4vw] md:py-[6vw] lg:py-[1.5vw] xl:py-[2vw]">
          <span
            className="text-white text-[7vw] md:text-[8vw] lg:text-[3.2vw] xl:text-[2.5vw] mb-[4vw] md:mb-[5vw] lg:mb-[2vw] xl:mb-[1.5vw] text-center tracking-wide"
            style={{ fontFamily: "var(--font-peakers)" }}
          >
            WE’RE EXPANDING
          </span>

          <input
            type="text"
            placeholder="Suggest our next town… "
            className="w-[85%] md:w-[90%] lg:w-[85%] xl:w-[70%] bg-transparent border border-[#383838] rounded-md text-center text-white font-mono py-[3vw] md:py-[3.5vw] lg:py-[1.2vw] xl:py-[0.7vw] px-[4vw] md:px-[4vw] lg:px-[2vw] xl:px-[1vw] mb-[4vw] md:mb-[5vw] lg:mb-[2vw] xl:mb-[1.6vw] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-white transition-all text-[4vw] md:text-[4vw] lg:text-[1.3vw] xl:text-[1vw]"
          />

          <button className="w-[60%] md:w-[70%] lg:w-[65%] xl:w-[60%] py-[3vw] md:py-[3.5vw] lg:py-[0.8vw] xl:py-[0.2vw] border-2 border-[#383838] rounded-[4vw] md:rounded-[3vw] lg:rounded-[1.5vw] xl:rounded-[1vw] text-white font-mono text-[4vw] md:text-[4vw] lg:text-[1.5vw] xl:text-[1.2vw] tracking-widest transition-all bg-[#1111] hover:shadow-[0.4vw_0.4vw_0px_white]">
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}
