import { client } from "../../sanity/lib/client";
import UniquenessPageClient from "./page-client";

export const metadata = {
    title: "The Peckers Standard | Our Uniqueness | Peckers Chicken vs Competition",
    description: "What makes Peckers unique? Discover why we are the top choice over Chicken George and Dave's Hot Chicken. Learn about our high standards, fresh ingredients, and commitment to the best halal chicken.",
    keywords: [
        "Peckers standard of quality",
        "best halal chicken Hertfordshire",
        "why Peckers vs Chicken George",
        "Dave's Hot Chicken UK comparison",
        "fresh chicken Stevenage",
        "premium grilled chicken standards",
        "Hitchin top chicken restaurant"
    ]
};

export default async function UniquenessPage() {
    // Fetch all uniqueness related data on the server
    const data = await client.fetch(`{
        "landingData": *[_type == "uniquenessLanding"][0],
        "sectionsData": *[_type == "uniquenessSubSection"][0].sections[] {
            ...,
            "videoUrl": video.asset->url
        }
    }`);

    return <UniquenessPageClient initialData={data} />;
}
