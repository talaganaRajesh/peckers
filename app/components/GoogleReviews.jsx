"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaStar, FaGoogle, FaQuoteLeft, FaChevronRight } from "react-icons/fa";
import { useInView } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.8, ease: "easeOut", delay },
});

const GoogleReviews = ({ initialReviews = [] }) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [loading, setLoading] = useState(initialReviews.length === 0);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    // We'll always fetch on the client to satisfy referer restrictions
    const fetchReviews = async () => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      const placeIds = [
        "ChIJVVweuNo1dkgRi-IfLyhtgyU", // Hitchin
        "ChIJxVydIDgvdkgR3vKTXPIOuYo"  // Stevenage
      ];

      if (!apiKey) {
        setError("API Key missing");
        setLoading(false);
        return;
      }

      try {
        const results = await Promise.all(
          placeIds.map(async (placeId) => {
            const url = `https://places.googleapis.com/v1/places/${placeId}`;
            const response = await fetch(url, {
              headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": apiKey,
                "X-Goog-FieldMask": "reviews,rating,userRatingCount,displayName"
              }
            });
            const data = await response.json();
            const reviews = data.reviews || [];
            const locationName = data.displayName?.text || "";
            
            return reviews.map((review) => ({
              ...review,
              locationName,
              placeId
            }));
          })
        );

        const allReviews = results.flat().map((review, index) => ({
          _id: `google-${index}-${review.name?.split('/').pop() || index}`,
          author_name: review.authorAttribution?.displayName || "Anonymous",
          text: review.text?.text || review.originalText?.text || "",
          relative_time_description: review.relativePublishTimeDescription,
          rating: review.rating,
          profile_photo_url: review.authorAttribution?.photoUri,
          locationName: review.locationName,
          placeId: review.placeId, // Ensure this matches the iterator placeId
          time: review.publishTime ? new Date(review.publishTime).getTime() / 1000 : 0
        }));

        // Sort reviews by time (newest first)
        allReviews.sort((a, b) => b.time - a.time);
        setReviews(allReviews);
      } catch (err) {
        setError("Failed to load reviews");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-black text-white flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </section>
    );
  }

  if (error || reviews.length === 0) {
    return null; // Don't show the section if it fails
  }

  const headingText = "What People Say";
  const words = headingText.split(" ");

  return (
    <section className="py-[10vw] md:py-[6vw] bg-black overflow-hidden relative" id="reviews">
      <div className="w-full px-[5vw] md:px-[1.4vw] relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-[8vw] md:mb-[4vw] gap-8">
          <div className="flex flex-col items-start text-left">
            <h2
              className="text-[7.2vw] sm:text-[6.2vw] md:text-[3.3vw] font-bold text-white tracking-[.18vw] uppercase leading-[1.2]"
              style={{ fontFamily: "var(--font-peakers)" }}
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  className={`inline-block mr-[2.5vw] md:mr-[0.6vw] ${word.toLowerCase() === "say" ? "text-yellow-500" : ""}`}
                  {...fadeUp(i * 0.1)}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
            
            <motion.p
              className="font-sans mt-[4vw] md:mt-[0.5vw] font-extralight text-[4vw] sm:text-[3vw] md:text-[1.3vw] text-white opacity-90 max-w-[90vw] md:max-w-[45vw] leading-tight"
              {...fadeUp(0.4)}
            >
              Real feedback from our community. Click any card to view on Google.
            </motion.p>
          </div>

          <motion.a
            href="https://www.google.com/maps/search/Peckers+Chicken+Stevenage+Hitchin"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-4 bg-[#111] p-4 md:p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all group backdrop-blur-sm self-start md:self-end"
          >
            <div className="bg-yellow-500 p-3 rounded-xl transition-transform group-hover:scale-110 duration-300">
              <FaGoogle className="text-black text-xl" />
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 text-[10px] md:text-sm" />
                ))}
              </div>
              <p className="text-white font-bold text-sm md:text-lg leading-none tracking-tight">Excellent on Google</p>
            </div>
          </motion.a>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          <motion.div
            className="flex gap-6 overflow-x-auto pb-12 pt-4 custom-scrollbar snap-x snap-mandatory"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {reviews.map((review, index) => (
              <motion.a
                key={index}
                href={`https://search.google.com/local/reviews?placeid=${review.placeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[300px] md:min-w-[420px] h-full bg-[#0A0A0A] p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 flex flex-col gap-5 md:gap-6 snap-start transition-all duration-500 hover:border-white/20 hover:bg-[#111] group relative overflow-hidden"
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex gap-4 items-center relative z-10">
                  <div className="relative">
                    <img
                      src={review.profile_photo_url}
                      alt={review.author_name}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 border border-white/10"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full p-1 border-2 border-[#0A0A0A] shadow-lg">
                      <FaGoogle className="text-[8px] md:text-[10px] text-black" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base md:text-lg leading-tight uppercase tracking-wider" style={{ fontFamily: "var(--font-peakers)" }}>
                      {review.author_name}
                    </h4>
                    <p className="text-gray-500 text-[10px] md:text-xs font-sans tracking-[0.1em] uppercase mt-0.5">{review.relative_time_description}</p>
                  </div>
                </div>

                <div className="flex gap-1 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${i < Math.round(review.rating) ? "text-yellow-500" : "text-white/10"} text-[10px] md:text-xs`}
                    />
                  ))}
                </div>

                <p className="text-white/80 text-sm md:text-base leading-relaxed font-light tracking-wide line-clamp-5 italic relative z-10 h-[6.5rem]">
                   "{review.text || "No comment provided."}"
                </p>

                <div className="mt-auto pt-5 border-t border-white/5 flex justify-between items-center relative z-10">
                   <div className="flex flex-col">
                     <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white/30 font-bold mb-1">Posted at</span>
                     <span className="text-[9px] md:text-[10px] uppercase tracking-[0.1em] text-white/70 font-bold">{review.locationName}</span>
                   </div>
                   <div className="flex items-center gap-2 text-yellow-500 font-bold group-hover:translate-x-1 transition-transform duration-300">
                     <span className="text-[9px] md:text-[10px] uppercase tracking-[0.1em]">View Review</span>
                     <FaChevronRight className="text-[8px]" />
                   </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator or controls could go here */}
        <div className="mt-8 flex justify-center gap-2">
            <p className="text-gray-500 text-sm font-sharetech animate-pulse">Scroll to see more →</p>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
