"use client";
import React, { useState } from "react";
import dynamic from 'next/dynamic';
import Image from "next/image";
import Script from "next/script";
import { urlFor } from "../../sanity/lib/image";
import CoopHeading from "./CoopHeading";
import CoopImages from "./CoopImages";

const LatestNewsHeading = dynamic(() => import("./LatestNewsHeading"), { ssr: true });
const LatestNewsCards = dynamic(() => import("./LatestNewsCards"), { ssr: true });
const CaptionBelowNews = dynamic(() => import("./CaptionBelowNews"), { ssr: true });
const PersonDetails = dynamic(() => import("./PersonDetails"), { ssr: true });
const RatingSection = dynamic(() => import("./RatingSection"), { ssr: true });
const RatingSectionCards = dynamic(() => import("./RatingSectionCards"), { ssr: true });
const SignUpSection = dynamic(() => import("./SignUpSection"), { ssr: true });

const HomePageClient = ({ initialHomepageData, initialSliderCards, initialLocations, initialPersonDetails, initialReviews }) => {
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

    return data?.journalCaption || "Stay up to date with our shenanigans, limited drops, and questionable life choices.";
  };

  return (
    <div id="main-content">
      <section className="hero w-full h-[75vh] md:h-[60vh] lg:h-[95vh] min-h-[500px] md:min-h-[400px] lg:min-h-[480px] bg-black flex items-end justify-center lg:justify-start overflow-hidden relative">
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
        <div className="relative z-10 w-full px-[5vw] md:px-[7vw] lg:px-[4vw] pb-[6vw] md:pb-[4vw] lg:pb-[1.5vw]">
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


      <CoopHeading heading={data?.locationsHeading} subtitle={data?.locationsSubtitle} />
      <CoopImages locations={initialLocations} />

      <LatestNewsHeading heading={data?.journalHeading} subtitle={data?.journalSubtitle} />
      <LatestNewsCards news={initialSliderCards} onActiveIndexChange={setActiveCardIndex} />
      <CaptionBelowNews caption={getCaption()} />

      <PersonDetails data={initialPersonDetails} />

      <RatingSection data={data?.ratingSection} />
      <RatingSectionCards reviews={initialReviews} />

      <SignUpSection initialData={data?.signupSection} />

      <div className="sr-only">
        <h2>Best Halal Chicken in Hertfordshire - Stevenage & Hitchin</h2>
        <p>
          Peckers is the top choice for halal food in Stevenage and Hitchin. We serve the best peri peri grilled chicken,
          crispy fried chicken wings, and gourmet burgers in Hertfordshire. Whether you are searching for the ultimate
          fried chicken experience like Chicken George or Dave's Hot Chicken, Peckers offers a premium, locally-crafted
          alternative. Looking for a late night takeaway in Stevenage or the best place to eat in Hitchin?
          Peckers stands out among the best chicken shops in Stevenage with our legendary wings and burgers.
        </p>
      </div>
    </div>
  );
};

export default HomePageClient;
