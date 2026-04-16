import { LocationsPageContent } from "../hitchin/LocationsPageContent";
import { sanityFetch } from "../../sanity/lib/live";

export const metadata = {
    title: "Peckers Stevenage | Best Chicken & Peri Peri in Stevenage",
    description: "Peckers Stevenage is the ultimate choice for fans of Chicken George and Dave's Hot Chicken. We offer the best halal peri peri grilled chicken, fried chicken, and burgers in Hertfordshire. Order online for fast delivery in Stevenage.",
    keywords: [
        "best halal food Stevenage",
        "Chicken George Stevenage alternative",
        "Dave's Hot Chicken Stevenage style",
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
