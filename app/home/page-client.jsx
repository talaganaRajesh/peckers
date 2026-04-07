"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Script from "next/script";
import { urlFor } from "../../sanity/lib/image";
import CoopHeading from "./CoopHeading";
import CoopImages from "./CoopImages";

const LatestNewsHeading = dynamic(() => import("./LatestNewsHeading"), {
  ssr: true,
});
const LatestNewsCards = dynamic(() => import("./LatestNewsCards"), {
  ssr: true,
});
const CaptionBelowNews = dynamic(() => import("./CaptionBelowNews"), {
  ssr: true,
});
const PersonDetails = dynamic(() => import("./PersonDetails"), { ssr: true });
const SignUpSection = dynamic(() => import("./SignUpSection"), { ssr: true });
import GoogleReviews from "../components/GoogleReviews";

const HomePageClient = ({
  initialHomepageData,
  initialSliderCards,
  initialLocations,
  initialPersonDetails,
  initialReviews,
}) => {
  const [data, setData] = useState(initialHomepageData || {});
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const getCaption = () => {
    const card = initialSliderCards[activeCardIndex];
    if (!card) return data?.journalCaption;

    // Prioritize the caption from Sanity if it exists
    if (card.caption) {
      return card.caption;
    }

    const title = card.title?.toLowerCase() || "";
    if (title.includes("health box")) {
      return "Meet the all-new Peckers Health Box: seriously good chicken, spicy rice, grilled halloumi, and fresh salad in one balanced feast.";
    }
    if (title.includes("marinade") || title.includes("sauce")) {
      return "New flavour alert: Our grilled chicken just got an upgrade with our all-new signature marinade range.";
    }
    if (title.includes("jerk")) {
      return "The wait is over: Authentic, flame-grilled Jerk Chicken has officially landed at Peckers.";
    }

    return (
      data?.journalCaption ||
      "Stay up to date with our shenanigans, limited drops, and questionable life choices."
    );
  };

  return (
    <div id="main-content">
      <section className="hero w-full h-[80vh] xl:h-screen bg-black flex items-center justify-center lg:justify-start overflow-hidden relative">
        {data?.videoUrl && (
          <video
            src={data.videoUrl}
            poster={data.posterUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover "
          />
        )}
        <div className="relative z-10 w-full px-[5vw] md:px-[7vw] lg:px-[4vw]">
          <div className="flex flex-col gap-2 md:gap-4">
            <h1
              className="text-white font-peakers text-[20vw] md:text-[11vw] lg:text-[10.5vw] leading-[0.9] font-bold tracking-[0.04em]"
              style={{ textShadow: "none" }}
            >
              Seriously <br /> Good <br /> Chicken
            </h1>

            {data.heroSubtitle && (
              <p className="text-white/90 text-[4.5vw] md:text-[2vw] lg:text-[1.5vw] font-sans max-w-[85vw] md:max-w-[40vw] leading-tight">
                {data.heroSubtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      <CoopHeading
        heading={data?.locationsHeading}
        subtitle={data?.locationsSubtitle}
      />
      <CoopImages locations={initialLocations} />

      {/* THE PECKERS JOURNAL — full viewport section */}
      <section className="flex flex-col gap-[8vw] md:gap-[5vw] lg:gap-[3vw] xl:gap-[1.5vw] xl:h-screen py-[10vw] md:py-[6vw] xl:py-0">
        <LatestNewsHeading
          heading={data?.journalHeading}
          subtitle={data?.journalSubtitle}
        />
        <div className="md:flex-1 md:min-h-0">
          <LatestNewsCards
            news={initialSliderCards}
            onActiveIndexChange={setActiveCardIndex}
          />
        </div>
        <CaptionBelowNews caption={getCaption()} />
      </section>

      <PersonDetails data={initialPersonDetails} />

      <GoogleReviews
        initialReviews={initialReviews}
        ratingData={data?.ratingSection}
      />

      <SignUpSection initialData={data?.signupSection} />


    </div>
  );
};

export default HomePageClient;
