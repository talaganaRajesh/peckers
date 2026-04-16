import { sanityFetch } from "../../sanity/lib/live";
import UniquenessPageClient from "./page-client";

export const metadata = {
    title: "The Peckers Standard | Quality & Craft in Every Bite",
    description: "Discover what makes Peckers unique. From our 100% halal certification to our artisan preparation and commitment to serving Seriously Good Chicken in every bite.",
    keywords: [
        "Peckers standard of quality",
        "best halal chicken Hertfordshire",
        "fresh chicken Stevenage",
        "premium grilled chicken standards",
        "Hitchin top chicken restaurant",
        "quality food standards UK"
    ],
};


export default async function UniquenessPage() {
    // Fetch all uniqueness related data on the server
    const { data } = await sanityFetch({
        query: `{
        "landingData": *[_type == "uniquenessLanding"][0],
        "sectionsData": *[_type == "uniquenessSubSection"][0].sections[] {
            ...,
            "image": image {
                asset-> {
                    ...,
                    metadata {
                        dimensions
                    }
                }
            },
            "videoUrl": video.asset->url
        }
    }`
    });

    return <UniquenessPageClient initialData={data} />;
}
