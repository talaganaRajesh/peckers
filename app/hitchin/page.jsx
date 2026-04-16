import { LocationsPageContent } from "./LocationsPageContent";
import { sanityFetch } from "../../sanity/lib/live";

export const metadata = {
    title: "Peckers | Best Chicken Takeaway & Restaurant in Hitchin",
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
    const { data } = await sanityFetch({
        query: query,
        params: { location }
    });

    return <LocationsPageContent location={location} initialData={data} />;
}