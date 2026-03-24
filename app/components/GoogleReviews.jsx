"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaStar, FaGoogle, FaQuoteLeft } from "react-icons/fa";

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

  // Duplicate reviews for infinite scroll effect if needed, but for now we'll do a simple carousel
  return (
    <section className="py-24 bg-black overflow-hidden relative" id="reviews">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl font-peakers text-white uppercase leading-none mb-6">
              What People <span className="text-yellow-500">Say</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl font-sans font-light tracking-wide">
              Real feedback from our community. Click any card to view on Google.
            </p>
          </motion.div>

          <motion.a
            href="https://www.google.com/maps/search/Peckers+Chicken+Stevenage+Hitchin"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-5 bg-[#111] p-5 rounded-2xl border border-white/5 hover:bg-[#181818] transition-colors"
          >
            <div className="bg-yellow-500 p-3.5 rounded-xl">
              <FaGoogle className="text-black text-2xl" />
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 text-sm" />
                ))}
              </div>
              <p className="text-white font-bold text-lg leading-none tracking-tight">Excellent on Google</p>
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
                className="min-w-[320px] md:min-w-[400px] h-full bg-[#0A0A0A] p-8 md:p-10 rounded-[2rem] border border-white/10 flex flex-col gap-6 snap-start transition-all duration-300 hover:border-white/20 hover:bg-[#0F0F0F]"
              >
                <div className="flex gap-5 items-center">
                  <div className="relative">
                    <img
                      src={review.profile_photo_url}
                      alt={review.author_name}
                      className="w-14 h-14 rounded-full object-cover grayscale-[20%] border border-white/10"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full p-1 border-2 border-[#0A0A0A]">
                      <FaGoogle className="text-[10px] text-black" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg leading-tight uppercase font-peakers tracking-wider">{review.author_name}</h4>
                    <p className="text-gray-500 text-sm font-sans tracking-wide">{review.relative_time_description}</p>
                  </div>
                </div>

                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < Math.round(review.rating) ? "text-yellow-500 text-sm" : "text-gray-800 text-sm"}
                    />
                  ))}
                </div>

                <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light tracking-wide line-clamp-5 italic">
                  "{review.text}"
                </p>

                <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
                   <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">At {review.locationName}</span>
                   <span className="text-[10px] uppercase tracking-[0.1em] text-yellow-500/50 font-bold">View Review →</span>
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
