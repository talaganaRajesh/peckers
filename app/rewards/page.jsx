import React from "react";

export const metadata = {
  title: "Rewards | Peckers",
  description:
    "Join the Peckers Inner Circle for exclusive offers, member perks, and early access to new menu items.",
};

export default function RewardsPage() {
  return (
    <div className="bg-[#141311] min-h-screen text-white w-full overflow-hidden flex items-center justify-center p-4 xl:p-12 mb-16 lg:mb-32">
      <div className="bg-[#1c1b19] border-[2px] border-[#222] rounded-[27px] w-full relative overflow-hidden py-24 md:py-32 flex flex-col items-center justify-center max-w-7xl mt-20">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] md:text-[360px] text-white/[0.03] whitespace-nowrap select-none overflow-hidden"
          style={{ fontFamily: "var(--font-peakers-bold)" }}
        >
          PECKERS
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center max-w-5xl">
          <h1
            className="text-white text-5xl sm:text-[80px] md:text-[100px] leading-[0.9] uppercase"
            style={{ fontFamily: "var(--font-peakers-bold)", letterSpacing: "0.02em" }}
          >
            BE PART OF THE <span className="text-[#C41718]">PECKERS</span> INNER CIRCLE
          </h1>
          
          <h2
            className="text-white text-3xl sm:text-[40px] md:text-[60px] leading-[1] uppercase mt-2"
            style={{ fontFamily: "var(--font-peakers-bold)", letterSpacing: "0.02em" }}
          >
            LAUNCHING TOMORROW <span className="text-[#C41718]">-</span> STAY TUNED.
          </h2>
        </div>
      </div>
    </div>
  );
}
