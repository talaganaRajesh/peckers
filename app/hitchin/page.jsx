import { LocationsPageContent } from "./LocationsPageContent";
import { sanityFetch } from "../../sanity/lib/live";

export const metadata = {
    title: "Peckers Hitchin | Best Chicken in Hitchin | Fried & Grilled",
    description: "Craving the best chicken in Hitchin? Peckers at 25 John Barker Place serves freshly fried and flame-grilled chicken, gourmet burgers, crispy wings, and signature peri-peri. Order online or collect in store.",
    keywords: [
        "best chicken in Hitchin",
        "chicken near me Hitchin",
        "places to eat in Hitchin",
        "food in Hitchin",
        "fried chicken Hitchin",
        "grilled chicken Hitchin",
        "peri peri chicken Hitchin",
        "chicken takeaway Hitchin",
        "best takeaway in Hitchin",
        "burger Hitchin",
        "chicken burgers Hitchin",
        "chicken wings Hitchin",
        "chicken delivery Hitchin",
        "lunch Hitchin",
        "dinner Hitchin",
        "restaurants Hitchin town centre",
        "where to eat Hitchin SG5",
        "takeaway Hitchin SG5",
        "chicken shop Hitchin",
        "Peckers Hitchin",
        "Westmill Hitchin food"
    ],
    alternates: {
        canonical: "https://www.peckerschicken.co.uk/hitchin",
    },
    openGraph: {
        title: "Peckers Hitchin | Best Chicken in Hitchin",
        description: "Craving the best chicken in Hitchin? Visit Peckers at 25 John Barker Place for freshly fried and flame-grilled chicken, gourmet burgers, and crispy wings.",
        url: "https://www.peckerschicken.co.uk/hitchin",
        siteName: "Peckers",
        locale: "en_GB",
        type: "website",
    },
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