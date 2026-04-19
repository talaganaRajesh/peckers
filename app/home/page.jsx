import { sanityFetch } from "../../sanity/lib/live";
import HomePageClient from "./page-client";
import { fetchGoogleReviews } from "../lib/google-reviews";

export const metadata = {
  title: "Peckers | Best Peri-Peri Grilled & Fried Chicken in Stevenage & Hitchin",
  description: "Experience Seriously Good Chicken at Peckers. Hertfordshire's destination for premium halal peri-peri chicken, gourmet burgers, and signature wings. Fast delivery and late-night takeaway available.",
  keywords: [
    "Peckers chicken",
    "best halal chicken Stevenage",
    "halal food Hitchin",
    "peri peri grilled chicken",
    "chicken takeaway Stevenage",
    "late night food Stevenage",
    "halal food Hertfordshire",
    "best fried chicken Hertfordshire"
  ]
};


export default async function HomePage() {
  // Fetch homepage data on the server
  const { data: homepageData } = await sanityFetch({
    query: `*[_type == "homepage"] | order(_updatedAt desc)[0]{
        "videoUrl": heroVideo.asset->url,
        heroPoster,
        heroTitle,
        heroSubtitle,
        heroImage,
        locationsHeading,
        locationsSubtitle,
        journalHeading,
        journalSubtitle,
        journalCaption,
        ratingSection {
          heading,
          subheading,
          rating,
          totalReviews
        },
        signupSection {
          ...,
          backgroundImage
        }
    }`
  });

  // Fetch slider cards data on the server (for LatestNewsCards)
  const { data: sliderCards } = await sanityFetch({
    query: `*[_type == "sliderCard"] | order(order asc) {
    _id,
    title,
    image,
    order,
    caption
  }`
  });

  // Fetch locations data on the server (for CoopImages)
  const { data: locationsList } = await sanityFetch({
    query: `*[_type == "location"]{
    _id,
    name,
    image
  }`
  });

  // Fetch person details data on the server
  const { data: personDetails } = await sanityFetch({
    query: `*[_type == "homepagePersonDetails"][0] {
    heading,
    description,
    buttonText,
    image
  }`
  });

  // Fetch reviews data from Google
  const reviews = await fetchGoogleReviews();

  return (
    <>
      {homepageData?.videoUrl && (
        <link
          rel="preload"
          href={homepageData.videoUrl}
          as="video"
          type="video/mp4"
        />
      )}
      <HomePageClient
        initialHomepageData={homepageData}
        initialSliderCards={sliderCards}
        initialLocations={locationsList}
        initialPersonDetails={personDetails}
        initialReviews={reviews}
      />
    </>
  );
}
