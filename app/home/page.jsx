import { sanityFetch } from "../../sanity/lib/live";
import HomePageClient from "./page-client";
import { fetchGoogleReviews } from "../lib/google-reviews";

export const metadata = {
  title: "Peckers | Best Peri Peri & Fried Chicken in Stevenage & Hitchin",
  description: "Experience the ultimate halal peri peri grilled chicken at Peckers - the premium alternative to Chicken George and Dave's Hot Chicken in Stevenage and Hitchin. Family meals, late night takeaways, and fast delivery across Hertfordshire.",
  keywords: [
    "Chicken George Stevenage alternative",
    "Dave's Hot Chicken UK alternative",
    "best halal chicken Stevenage",
    "halal food Hitchin",
    "peri peri grilled chicken",
    "chicken takeaway Stevenage",
    "late night food Stevenage",
    "Peckers chicken",
    "halal food Hertfordshire"
  ]
};

export default async function HomePage() {
  // Fetch homepage data on the server
  const { data: homepageData } = await sanityFetch({
    query: `*[_type == "homepage"][0]{
        "videoUrl": heroVideo.asset->url,
        "posterUrl": heroPoster.asset->url,
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
          backgroundImage {
            asset -> {
              _id,
              url
            }
          }
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
    image {
      asset->{
        _id,
        url
      }
    }
  }`
  });

  // Fetch person details data on the server
  const { data: personDetails } = await sanityFetch({
    query: `*[_type == "homepagePersonDetails"][0] {
    heading,
    description,
    buttonText,
    "imageUrl": image.asset->url
  }`
  });

  // Fetch reviews data from Google
  const reviews = await fetchGoogleReviews();

  return <HomePageClient
    initialHomepageData={homepageData}
    initialSliderCards={sliderCards}
    initialLocations={locationsList}
    initialPersonDetails={personDetails}
    initialReviews={reviews}
  />;
}
