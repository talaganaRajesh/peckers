"use client";

import Image from "next/image";

export default function PersonDetails({ data = null }) {
  if (!data) return null;

  const headingText = data.heading || "THE HEART OF PECKERS";
  const headingParts = headingText.split(" ");
  const lastWord = headingParts.pop();
  const resHeading = headingParts.join(" ");

  return (
    <div className="relative w-full max-w-full overflow-x-hidden flex flex-col lg:flex-row items-stretch justify-center mt-[6vw] md:mt-[3vw] lg:mt-[9vw] xl:mt-[5.5vw] gap-[6vw] md:gap-[1.5vw] lg:gap-[2vw] box-border px-[4vw] md:px-[1.4vw] lg:px-[2vw] mb-5 md:mb-0">
      <div className="shrink-0 w-full lg:w-[48vw] xl:w-[44vw]">
        {data.imageUrl && (
          <Image
            src={data.imageUrl}
            alt="Profile"
            className="w-full h-[70vw] md:h-[48vw] lg:h-[38vw] xl:h-[36vw] object-cover object-center rounded-2xl"
            sizes="(max-width: 768px) 90vw, 48vw"
            width={670}
            height={840}
          />
        )}
      </div>

      <div className="w-full lg:max-w-[50vw] xl:max-w-[40vw] flex flex-col justify-start bg-black px-[4vw] md:px-[2vw] lg:px-[4vw] xl:px-[3vw] py-[6vw] md:py-[4vw] lg:py-[2vw] xl:pt-[3vw] xl:pb-0 min-h-[45vw] md:min-h-[auto] lg:min-h-[38vw] xl:min-h-[28vw] shadow-xl relative mt-[4vw] md:mt-2 lg:-mt-[2vw] xl:-mt-[2.2vw] mr-0 xl:mr-[1vw] z-10 md:z-2 rounded-xl lg:rounded-none">
        <h2
          className="block text-white font-bold text-[7.2vw] sm:text-[6.2vw] md:text-[4vw] lg:text-[3.3vw] tracking-[.18vw] leading-tight mb-[5vw] md:mb-[2vw] lg:mb-[1.5vw] xl:mb-[1vw] text-left whitespace-normal lg:max-w-[35vw]"
          style={{ letterSpacing: "0.01em", fontFamily: "var(--font-peakers)" }}
        >
          {resHeading} <span className="text-white">{lastWord}</span>
        </h2>

        <div className="relative flex flex-col items-start w-full">
          <div className="whitespace-pre-wrap text-white text-left font-light text-[4vw] sm:text-[3.5vw] md:text-[2.2vw] lg:text-[1.4vw] xl:text-[1.3vw] tracking-[1.2] font-sans md:mb-[2vw] lg:mb-[1.5vw] xl:mb-[1vw] leading-[6vw] md:leading-[3.5vw] lg:leading-[2.2vw] xl:leading-[2vw] w-full">
            {data.description}
          </div>
        </div>

        <div className="h-[6vw] md:h-2 lg:h-[3vw] xl:h-[2.2vw]" />

        <div className="flex justify-start w-full">
          <a
            href="/the-journey"
            className="group inline-flex flex-col items-start text-white gap-[1vw] xl:gap-[.3vw] font-sans text-[3.5vw] sm:text-[2.5vw] md:text-[2.5vw] lg:text-[1.3vw] xl:text-[1.1vw] font-extralight"
            style={{ letterSpacing: "0.08em", width: "fit-content" }}
          >
            <span className="flex items-center gap-[1.5vw] md:gap-[1.5vw] lg:gap-[1vw] xl:gap-[.4vw]">
              <span className="border-b-2 border-white md:mt-2 lg:mt-[1vw] xl:mt-[1vw] pb-[2vw] md:pb-2 lg:pb-2 xl:pb-1 pr-[.5vw] xl:pr-[.1vw] tracking-[0.09em]">
                {data.buttonText || "OUR HERITAGE"}
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-[6vw] h-[6vw] md:w-[4vw] md:h-[4vw] lg:w-[2vw] lg:h-[2vw] xl:w-[1.7vw] xl:h-[1.7vw] inline-block align-middle mt-[3vw] md:mt-2 lg:mt-[1.5vw] xl:mt-[1vw]"
              >
                <line x1="6" y1="12" x2="20" y2="12" />
                <polyline points="15 7 20 12 15 17" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
