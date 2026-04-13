import Link from "next/link";
import React from "react";
import {
  TbUserPlus,
  TbWallet,
  TbReceipt,
  TbLockOpen,
  TbConfetti,
  TbCircleCheck,
  TbNfc,
} from "react-icons/tb";
import CardStack from "./CardStack";

export const metadata = {
  title: "Rewards | Peckers",
  description:
    "Join the Peckers Inner Circle for exclusive offers, member perks, and early access to new menu items.",
};

const imgHero =
  "https://www.figma.com/api/mcp/asset/eb377fb0-ff3f-4a05-98e3-6b96e8ed3fe0";
const imgRecruit =
  "https://www.figma.com/api/mcp/asset/ebdecf9b-b623-437b-9385-d1b3e4b22e9d";
const imgGamma =
  "https://www.figma.com/api/mcp/asset/58cb5f51-d062-48da-b41a-a69b87ed0259";
const imgBeta =
  "https://www.figma.com/api/mcp/asset/2c649633-6bee-41bb-8349-0e9f1fd335c9";
const imgAlpha =
  "https://www.figma.com/api/mcp/asset/00104d2e-4149-4cfa-a832-e90a8fd95a1e";

const imgCheck =
  "https://www.figma.com/api/mcp/asset/48f6f0a2-e590-4f46-aca8-163f8af75702"; // check mark
const imgVector2 =
  "https://www.figma.com/api/mcp/asset/4d5df211-bd65-4aba-a50a-7884e520a12a"; // path
const imgLogoSmall =
  "https://www.figma.com/api/mcp/asset/27eea737-98e9-44cc-8842-00837645fe04";

export default function RewardsPage() {
  return (
    <div className="bg-[#141311] min-h-screen text-white w-full overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex flex-col items-center justify-center -mt-[80px]">
        {/* Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src={imgHero}
            className="w-full h-full object-cover"
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#141311]/20 via-transparent to-[#141311]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center mt-20">
          <p
            className="text-[#d4a838] tracking-[5.8px] text-lg md:text-xl font-bold uppercase mb-4"
            style={{ fontFamily: "var(--font-peakers)" }}
          >
            THE INNER CIRCLE
          </p>

          <h1
            className="text-[#e6e2de] text-6xl sm:text-[100px] md:text-[140px] leading-[0.85] text-center mb-12 uppercase flex flex-col items-center"
            style={{ fontFamily: "var(--font-peakers-bold)" }}
          >
            <span>
              COLLECT <span className="text-[#9b091b]">CHICKEN</span>
            </span>
            <span>HEADS</span>
          </h1>

          {/* Tiers Flow */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mt-8">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-[#0f0e0c] border-[2px] border-[#d4a838] rounded-full p-2 w-16 h-16 flex items-center justify-center">
                <img
                  src={imgRecruit}
                  className="w-8 object-contain"
                  alt="Recruit"
                />
              </div>
              <p
                className="text-[#71717a] text-xs font-bold tracking-widest uppercase"
                style={{ fontFamily: "var(--font-peakers-bold)" }}
              >
                RECRUIT
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="bg-[#0f0e0c] border-[2px] border-[#9b1c1c] rounded-full p-2 w-16 h-16 flex items-center justify-center">
                <img
                  src={imgGamma}
                  className="w-8 object-contain"
                  alt="Gamma"
                />
              </div>
              <p
                className="text-[#71717a] text-xs font-bold tracking-widest uppercase"
                style={{ fontFamily: "var(--font-peakers-bold)" }}
              >
                GAMMA
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="bg-[#0f0e0c] border-[2px] border-[#e07820] rounded-full p-2 w-16 h-16 flex items-center justify-center">
                <img src={imgBeta} className="w-8 object-contain" alt="Beta" />
              </div>
              <p
                className="text-[#71717a] text-xs font-bold tracking-widest uppercase"
                style={{ fontFamily: "var(--font-peakers-bold)" }}
              >
                BETA
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="bg-[#0f0e0c] border-[2px] border-[#c82b3a] rounded-full p-2 w-16 h-16 flex items-center justify-center">
                <img
                  src={imgAlpha}
                  className="w-8 object-contain"
                  alt="Alpha"
                />
              </div>
              <p
                className="text-[#71717a] text-xs font-bold tracking-widest uppercase"
                style={{ fontFamily: "var(--font-peakers-bold)" }}
              >
                ALPHA
              </p>
            </div>
          </div>

          <Link
            href="https://peckers.vmos.io/account/auth/register"
            target="_blank"
            className="mt-12 bg-[#8e0b1c] hover:bg-[#a50d21] transition-colors text-white text-lg tracking-[1.6px] px-10 py-4 rounded font-bold uppercase cursor-pointer"
            style={{ fontFamily: "var(--font-peakers)" }}
          >
            JOIN THE FLOCK
          </Link>
        </div>
      </section>

      {/* 2. HOW IT WORK$ */}
      <section className="bg-[#1c1b19] px-6 py-24 md:px-12 lg:px-20">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-16">
          <div
            className="border-l-[8px] border-[#e51a38] pl-6 text-white text-5xl md:text-[72px] leading-none uppercase"
            style={{ fontFamily: "var(--font-peakers-bold)" }}
          >
            HOW IT WORK$
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
            {/* Step 1 */}
            <div className="bg-[#211f1d] rounded-xl p-8 flex flex-col gap-4 relative overflow-hidden">
              <div className="bg-[#d4a838] w-14 h-14 rounded-lg flex items-center justify-center relative z-10">
                <TbUserPlus className="text-black text-2xl" />
              </div>
              <TbUserPlus className="absolute -top-4 -right-8 text-[140px] text-white/[0.04] pointer-events-none z-0" />
              <h3
                className="text-[#e6e2de] text-3xl uppercase mt-4 relative z-10"
                style={{ fontFamily: "var(--font-peakers-bold)" }}
              >
                JOIN
              </h3>
              <p
                className="text-[#a1a1aa] text-base leading-relaxed relative z-10"
                style={{ fontFamily: "var(--font-neuzeit)" }}
              >
                Download the app or sign up here. Become a Recruit in seconds.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#211f1d] rounded-xl p-8 flex flex-col gap-4 relative overflow-hidden">
              <div className="bg-[#9b1c1c] w-14 h-14 rounded-lg flex items-center justify-center relative z-10">
                <TbWallet className="text-[#141311] text-2xl" />
              </div>
              <h3
                className="text-[#e6e2de] text-3xl uppercase mt-4 relative z-10"
                style={{ fontFamily: "var(--font-peakers-bold)" }}
              >
                WALLET
              </h3>
              <p
                className="text-[#a1a1aa] text-base leading-relaxed relative z-10"
                style={{ fontFamily: "var(--font-neuzeit)" }}
              >
                Link your card. We track every wing you crunch across the UK.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#211f1d] rounded-xl p-8 flex flex-col gap-4 relative overflow-hidden">
              <div className="bg-[#e07820] w-14 h-14 rounded-lg flex items-center justify-center relative z-10">
                <TbReceipt className="text-[#141311] text-2xl" />
              </div>
              <h3
                className="text-[#e6e2de] text-3xl uppercase mt-4 relative z-10"
                style={{ fontFamily: "var(--font-peakers-bold)" }}
              >
                EARN
              </h3>
              <p
                className="text-[#a1a1aa] text-base leading-relaxed relative z-10"
                style={{ fontFamily: "var(--font-neuzeit)" }}
              >
                Spend £12. Earn 1 Chicken Head. It's that simple, boss.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#211f1d] rounded-xl p-8 flex flex-col gap-4 relative overflow-hidden">
              <div className="bg-[#c82b3a] w-14 h-14 rounded-lg flex items-center justify-center relative z-10">
                <TbLockOpen className="text-[#141311] text-2xl" />
              </div>
              <h3
                className="text-[#e6e2de] text-3xl uppercase mt-4 relative z-10"
                style={{ fontFamily: "var(--font-peakers-bold)" }}
              >
                UNLOCK
              </h3>
              <p
                className="text-[#a1a1aa] text-base leading-relaxed relative z-10"
                style={{ fontFamily: "var(--font-neuzeit)" }}
              >
                Reach milestones to unlock higher tier rewards & secrets.
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-[#9a091c] rounded-xl p-8 flex flex-col gap-4 relative overflow-hidden">
              <div className="bg-white w-14 h-14 rounded-lg flex items-center justify-center relative z-10">
                <TbConfetti className="text-[#9a091c] text-3xl" />
              </div>
              <h3
                className="text-[#e6e2de] text-3xl uppercase mt-4 relative z-10"
                style={{ fontFamily: "var(--font-peakers-bold)" }}
              >
                REDEEM
              </h3>
              <p
                className="text-[#f4f4f5] text-base leading-relaxed relative z-10"
                style={{ fontFamily: "var(--font-neuzeit)" }}
              >
                Flash your code at the till. Claim your bounty. Feast.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE CHICKEN HEADS TIER SYSTEM */}
      <section className="bg-[#141311] px-6 py-24 md:px-12 lg:px-20 relative border-t border-t-white/5">
        <div className="max-w-[1440px] mx-auto relative flex flex-col gap-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 z-20">
            <div className="flex flex-col">
              <h2
                className="text-5xl sm:text-[72px] leading-none uppercase text-[#e6e2de]"
                style={{ fontFamily: "var(--font-peakers-bold)" }}
              >
                THE CHICKEN HEADS
                <br />
                <span className="text-[#9a091c]">TIER SYSTEM</span>
              </h2>
              <p
                className="text-[#71717a] text-lg tracking-[1.8px] uppercase mt-4"
                style={{ fontFamily: "var(--font-neuzeit)" }}
              >
                ASCEND THE UNDERGROUND HIERARCHY
              </p>
            </div>
            <div className="bg-[#363432] px-4 py-2 rounded">
              <p
                className="text-[#e6e2de] text-sm md:text-base font-bold tracking-tight uppercase"
                style={{ fontFamily: "var(--font-neuzeit)" }}
              >
                10 HEADS = ALPHA STATUS
              </p>
            </div>
          </div>

          {/* Graphic wrapper for desktop mostly */}
          <div className="relative w-full py-10 flex flex-col items-center">
            <img
              src="/Video/Untitled%20design.gif"
              alt="Tier Rewards Sequence"
              className="w-full max-w-[1200px] object-contain rounded-2xl"
            />
            <p
              className="mt-8 text-white/60 text-sm italic self-start sm:self-center"
              style={{ fontFamily: "var(--font-neuzeit)" }}
            >
              * 1 visit = 1 Head (When you spend £12 pounds or more)
            </p>
          </div>
        </div>
      </section>

      {/* 4. YOUR CHICKEN HEADS. YOUR CALL. */}
      <section className="bg-[#0f0e0c] px-6 py-24 md:px-12 lg:px-20 overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="flex flex-col gap-8">
            <h2
              className="text-[#e6e2de] text-5xl sm:text-[72px] leading-none uppercase"
              style={{ fontFamily: "var(--font-peakers-bold)" }}
            >
              YOUR CHICKEN
              <br />
              HEADS.
              <br />
              <span className="text-[#d8192a]">YOUR CALL.</span>
            </h2>
            <p
              className="text-[#a1a1aa] text-lg sm:text-[20px] max-w-[500px] leading-relaxed"
              style={{ fontFamily: "var(--font-neuzeit)" }}
            >
              Whether you're lurking in our booths or ordering from the shadows,
              your loyalty is counted. Every bite brings you closer to Alpha
              status.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <span className="bg-[#1e1d1b] px-7 py-3 rounded-full text-[#c1bfba] text-xs font-bold tracking-[2px] uppercase">
                EAT IN
              </span>
              <span className="bg-[#1e1d1b] px-7 py-3 rounded-full text-[#c1bfba] text-xs font-bold tracking-[2px] uppercase">
                COLLECT
              </span>
              <span className="bg-[#1e1d1b] px-7 py-3 rounded-full text-[#c1bfba] text-xs font-bold tracking-[2px] uppercase">
                DELIVERY
              </span>
            </div>

            <ul className="flex flex-col gap-6 mt-4">
              {[
                "VALID ACROSS ALL UK LOCATIONS",
                "HEADS EXPIRE 365 DAYS AFTER EARNING",
                "DOUBLE HEAD EVENTS EVERY TUESDAY",
              ].map((text, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 text-[#71717a] text-[14px] tracking-[0.5px] uppercase"
                  style={{ fontFamily: "var(--font-neuzeit)" }}
                >
                  <TbCircleCheck className="text-[#d8192a] text-[22px] min-w-[22px]" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-[500px] sm:h-[600px] w-full flex items-center justify-center">
            {/* Animated Card Stack */}
            <CardStack />
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA */}
      <section className="px-4 py-8 md:p-12 mb-16 lg:mb-32">
        <div className="bg-[#9a081c] rounded-[27px] w-full relative overflow-hidden py-24 md:py-32 flex flex-col items-center justify-center">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] md:text-[360px] text-white/10 whitespace-nowrap select-none overflow-hidden"
            style={{ fontFamily: "var(--font-peakers-bold)" }}
          >
            PECKERS
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-center">
            <h2
              className="text-5xl sm:text-[72px] text-black leading-none uppercase"
              style={{ fontFamily: "var(--font-peakers-bold)" }}
            >
              READY TO JOIN
              <br />
              THE FLOCK?
            </h2>
            <Link
              href="https://peckers.vmos.io/account/auth/register"
              target="_blank"
              className="bg-black hover:bg-gray-800 transition-colors text-white text-xl sm:text-[27px] tracking-[2.7px] px-12 py-5 rounded-lg uppercase"
              style={{ fontFamily: "var(--font-peakers)" }}
            >
              WEB SIGN UP
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
