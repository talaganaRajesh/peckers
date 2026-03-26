"use client";
import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import EnquiriesSection from './EnquireSection'
import LocationAddress from './LocationAddress'
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";

export function LocationsPageContent({ location = 'hitchin', initialData = null }) {
    const [pageData, setPageData] = useState(initialData);
    const [loading, setLoading] = useState(!initialData || (initialData && (initialData.slug?.current !== location && initialData.name?.toLowerCase() !== location)));
    const videoRef = useRef(null);

    useEffect(() => {
        // If we have initial data matching the current location, don't fetch
        if (initialData && (initialData.slug?.current === location || initialData.name?.toLowerCase() === location)) {
            setPageData(initialData);
            setLoading(false);
            return;
        }

        // Reset state immediately when location changes to prevent showing stale data
        setPageData(null);
        setLoading(true);

        const fetchPageData = async () => {
            try {
                // Fetch location page data - Case insensitive matching for name or slug
                const query = `*[_type == "locationpage" && (slug.current == $location || lower(name) == lower($location))][0]{
                    ...,
                    "videoUrl": heroVideo.asset->url,
                    "posterUrl": heroPoster.asset->url,
                    heroVideoUrl
                }`;
                const data = await client.fetch(query, { location });
                console.log(`[LocationsPage] Data for "${location}":`, data);
                setPageData(data);
            } catch (error) {
                console.error("Error fetching location page data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPageData();
    }, [location, initialData]);

    // Derived states - handle loading state to avoid stale UI flickers
    const locationTitle = loading
        ? (location === 'stevenage' ? 'STEVENAGE' : 'HITCHIN')
        : (pageData?.name?.toUpperCase() || (location === 'stevenage' ? 'STEVENAGE' : 'HITCHIN'));

    const establishedText = loading
        ? (location === 'stevenage' ? 'EST. 2024' : 'EST. 2023')
        : (pageData?.established || (location === 'stevenage' ? 'EST. 2024' : 'EST. 2023'));

    // Re-trigger play when data matches the current location to force start in all browsers
    useEffect(() => {
        if (!loading && videoRef.current && (pageData?.videoUrl || pageData?.heroVideoUrl)) {
            videoRef.current.play().catch(() => {
                console.log("Waiting for user interaction to play video...");
            });
        }
    }, [loading, pageData]);

    const historyTitle = pageData?.historyTitle || "HISTORY";
    const historyDescription = pageData?.historyDescription;
    const logoUrl = pageData?.logo ? urlFor(pageData.logo).url() : "https://ehtazgziwtjqm5ww.public.blob.vercel-storage.com/MenuPage/Location%20logo%20png.webp";

    return (
        <div id="main-content" className='z-9999' style={{ color: 'white' }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="w-full flex flex-col items-center justify-center relative overflow-hidden" style={{ minHeight: "70vh" }}>

                {/* Background Video from Sanity - isolated per location slug */}
                {(pageData?.videoUrl || pageData?.heroVideoUrl) && (
                    <video
                        key={pageData.videoUrl || pageData.heroVideoUrl}
                        ref={videoRef}
                        src={pageData.videoUrl || pageData.heroVideoUrl}
                        poster={pageData?.posterUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity duration-700"
                    />
                )}

                {/* Depth Overlay for premium contrast */}
                <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60 pointer-events-none z-0"></div>

                {/* Gray fallback if no video is uploaded yet */}
                {!(pageData?.videoUrl || pageData?.heroVideoUrl) && (
                    <div className="absolute inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center opacity-60">
                        {!loading && (
                            <span className="text-white/20 text-sm italic font-mono uppercase tracking-widest mt-40">
                                ( No video data found for "{location}" )
                            </span>
                        )}
                    </div>
                )}

                <h1 className="text-white text-[10vw] font-bold leading-tight relative z-10" style={{ fontFamily: "var(--font-peakers)", letterSpacing: '0.1em', textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
                    {locationTitle}
                </h1>
            </motion.div>

            <div>
                <LocationAddress location={location} />
            </div>

            <section
                id='history'
            >
                <div className="flex flex-col items-center mt-[12vw] md:mt-[6vw] justify-center w-full pt-[8vw] md:pt-[2vw] pb-[12vw] md:pb-[4vw] bg-[#0A0A0B]">
                    <div className="flex flex-col items-start md:items-center w-[90vw] md:w-[80vw]">
                        {/* History Title, Logo, EST */}
                        <div className="flex flex-row md:flex-row items-center mb-[6vw] md:mb-[1.6vw] mr-0 md:mr-[16vw] relative w-full justify-start md:justify-center gap-[4vw] md:gap-0">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                className="relative w-[22vw] h-[22vw] md:w-[10vw] md:h-[10vw] flex items-center justify-center mb-0 md:mb-[0.8vw] self-center md:self-start mr-0 md:mr-[44vw] bg-[#181818] rounded-full shadow-lg overflow-hidden"
                            >
                                <Image
                                    src={logoUrl}
                                    alt={`Peckers ${locationTitle} Logo - Best Halal Chicken in ${location.charAt(0).toUpperCase() + location.slice(1)}`}
                                    fill
                                    className="object-contain p-[2vw] md:p-[1vw]"
                                    sizes="(max-width: 768px) 30vw, 10vw"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                                className="flex md:absolute flex-col items-center ml-0 md:ml-[25vw] mt-0 md:mt-[2vw]">
                                <div className="flex items-center mb-[2vw] md:mb-[0.3vw]">
                                    <span
                                        className="h-[1.2px] w-[5vw] md:w-[3vw] bg-[#555] opacity-70 mr-[2vw] md:mr-[1vw]"
                                        aria-hidden="true"
                                    ></span>
                                    <span
                                        className="text-[#888] text-[3vw] md:text-[0.95vw] tracking-[0.22em] font-mono"
                                        style={{ fontFamily: "monospace, 'Share Tech', 'ShareTech', 'Share_Tech', 'ShareTechMono'" }}
                                    >
                                        {establishedText}
                                    </span>
                                    <span
                                        className="h-[1.2px] w-[5vw] md:w-[3vw] bg-[#555] opacity-70 ml-[2vw] md:ml-[1vw]"
                                        aria-hidden="true"
                                    ></span>
                                </div>
                                <h2
                                    className="font-bold text-[9vw] md:text-[4.5vw] font-peakers text-white mt-[1vw] md:mt-[0.2vw] tracking-[0.05em]"
                                >
                                    {historyTitle}
                                </h2>
                            </motion.div>
                        </div>
                        {/* History Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                            className="w-full flex justify-start md:justify-center mt-[4vw] md:mt-0">
                            {historyDescription ? (
                                <p
                                    className="text-[#e3e3e5]/70 text-left md:text-center font-semibold leading-[1.6] text-[4vw] md:text-[1vw] max-w-[90vw] md:max-w-[70vw] font-mono whitespace-pre-line"
                                >
                                    {historyDescription}
                                </p>
                            ) : (
                                location === 'stevenage' ? (
                                    <p
                                        className="text-[#e3e3e5]/70 text-left md:text-center font-bold leading-[1.6] text-[4vw] md:text-[1vw] max-w-[90vw] md:max-w-[70vw] font-mono"
                                    >
                                        Following the incredible response at our original site, Stevenage was established as our second location to bring
                                        Peckers to a larger audience. This inviting store is designed for the community to gather, offering a high-energy
                                        environment and a comfortable space to dine in.
                                        Known for its fast-paced service and exceptional team, Stevenage is where our vision truly scaled up. Located
                                        within proximity to our Budgens stores in Walkern and Watton, it stands as a testament to our journey providing a
                                        welcoming, vibrant spot for everyone to enjoy seriously good chicken together.
                                    </p>
                                ) : (
                                    <p
                                        className="text-[#e3e3e5]/70 text-left md:text-center font-semibold leading-[1.6] text-[4vw] md:text-[1vw] max-w-[90vw] md:max-w-[70vw] font-mono"
                                    >
                                        Peckers Hitchin is where the vision first took flight. Nestled in the heart of Westmill, this location stands on the
                                        same ground where our family’s journey began over 50 years ago at our grandfather’s original shop.
                                        It is the birthplace of our flavours and the community-driven spirit that defines us. As our original location, Hitchin
                                        remains a dedicated staple for the neighbourhood, serving seriously good chicken to the community that first
                                        supported our vision. While we continue to grow, this site stays true to its purpose: providing the local area with
                                        the quality and craft that started the legacy.
                                    </p>
                                )
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            <div>
                <EnquiriesSection location={location} />
            </div>

            {/* Hidden SEO Optimization - Targeted for {location} */}
            <div className="sr-only">
                <h3>{locationTitle} Halal Chicken & Takeaway - Alternative to Chicken George & Dave's Hot Chicken</h3>
                <p>
                    Searching for the best {location} takeaway? Peckers {locationTitle} is the leading provider of
                    halal fried chicken, peri peri wings, and gourmet burgers. Recognized as one of the top places to
                    eat in {location}, we specialize in quality halal food delivery and premium dine-in experience.
                    If you enjoy Chicken George in Stevenage or are looking for the Dave's Hot Chicken experience in the UK,
                    Peckers {locationTitle} offers the ultimate halal alternative with our signature craft and quality.
                </p>
                <p>
                    Our {location} location is famous for its seriously good chicken, late night service, and
                    vibrant atmosphere. Whether you're comparing Peckers vs Chicken George or looking for Dave's Hot Chicken
                    halal options, we provide the best peri peri in {location}. Order from Peckers today for the best
                    chicken shop experience in Hertfordshire.
                </p>
            </div>

        </div >
    );
}
