import { LocationsPageContent } from "../hitchin/LocationsPageContent";
import { sanityFetch } from "../../sanity/lib/live";

export const metadata = {
    title: "Peckers Stevenage | Best Chicken Takeaway & Restaurant",
    description: "Discover Peckers Stevenage - the ultimate spot for fried and grilled chicken. Serving premium peri-peri chicken, gourmet burgers, and signature wings with fast delivery across Stevenage.",
    keywords: [
        "best halal food Stevenage",
        "restaurants Stevenage",
        "peri peri chicken Stevenage",
        "takeaway Stevenage",
        "Stevenage restaurants",
        "places to eat Stevenage",
        "halal chicken Stevenage",
        "late night takeaway Stevenage",
        "Peckers Stevenage",
        "halal food Hertfordshire"
    ]
};


export default async function StevenagePage() {
    const location = "stevenage";
    const query = `*[_type == "locationpage" && (slug.current == $location || lower(name) == lower($location))][0]{
        ...,
        "videoUrl": heroVideo.asset->url,
        "posterUrl": heroPoster.asset->url,
        heroVideoUrl
    }`;
    const { data } = await sanityFetch({
        query: query,
        params: { location }
    });

    return <LocationsPageContent location={location} initialData={data} />;
}
