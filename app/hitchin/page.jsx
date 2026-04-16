import { LocationsPageContent } from "./LocationsPageContent";
import { sanityFetch } from "../../sanity/lib/live";

export const metadata = {
    title: "Peckers Hitchin | Best Chicken Takeaway & Restaurant",
    description: "Visit Peckers in Hitchin for Seriously Good Chicken. Premium halal peri-peri grilled chicken, wings, and gourmet burgers. Fast delivery and late-night takeaway available in Hitchin.",
    keywords: [
        "halal food Hitchin",
        "best chicken Hitchin",
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