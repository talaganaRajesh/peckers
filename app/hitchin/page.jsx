import { LocationsPageContent } from "./LocationsPageContent";
import { client } from "../../sanity/lib/client";

export const metadata = {
    title: "Peckers Hitchin | Best Halal Chicken Takeaway & Restaurant in Hitchin",
    description: "Looking for the best chicken in Hitchin? Peckers is the #1 alternative to Chicken George and Dave's Hot Chicken, offering premium halal peri peri grilled chicken, wings, and more. Late night takeaway available.",
    keywords: [
        "halal food Hitchin",
        "best chicken Hitchin",
        "Chicken George alternative Hitchin",
        "Dave's Hot Chicken Hitchin alternative",
        "peri peri Hitchin",
        "takeaway Hitchin",
        "restaurants Hitchin",
        "chicken shop Hitchin",
        "late night takeaway Hitchin",
        "Peckers Hitchin",
        "halal fried chicken Hitchin"
    ]
};

export default async function LocationPage() {
    const location = "hitchin";
    const query = `*[_type == "locationpage" && (slug.current == $location || lower(name) == lower($location))][0]{
        ...,
        "videoUrl": heroVideo.asset->url,
        "posterUrl": heroPoster.asset->url,
        heroVideoUrl
    }`;
    const data = await client.fetch(query, { location });

    return <LocationsPageContent location={location} initialData={data} />;
}