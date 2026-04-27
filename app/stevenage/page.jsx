import { LocationsPageContent } from "../hitchin/LocationsPageContent";
import { sanityFetch } from "../../sanity/lib/live";

export const metadata = {
    title: "Peckers Stevenage | Best Chicken in Stevenage | Fried & Grilled",
    description: "Searching for the best chicken in Stevenage? Peckers on Hertford Rd serves freshly fried and flame-grilled chicken, gourmet burgers, wings, and signature peri-peri. Dine in, collect, or order delivery.",
    keywords: [
        "best chicken in Stevenage",
        "chicken near me Stevenage",
        "places to eat in Stevenage",
        "food in Stevenage",
        "fried chicken Stevenage",
        "grilled chicken Stevenage",
        "peri peri chicken Stevenage",
        "chicken takeaway Stevenage",
        "best takeaway in Stevenage",
        "burger Stevenage",
        "chicken burgers Stevenage",
        "chicken wings Stevenage",
        "chicken delivery Stevenage",
        "lunch Stevenage",
        "dinner Stevenage",
        "restaurants in Stevenage",
        "where to eat Stevenage SG2",
        "takeaway Stevenage SG2",
        "Bragbury End food",
        "Peckers Stevenage",
        "late night food Stevenage"
    ],
    alternates: {
        canonical: "https://www.peckerschicken.co.uk/stevenage",
    },
    openGraph: {
        title: "Peckers Stevenage | Best Chicken in Stevenage",
        description: "Searching for the best chicken in Stevenage? Peckers on Hertford Rd serves freshly fried and flame-grilled chicken, gourmet burgers, wings, and signature peri-peri.",
        url: "https://www.peckerschicken.co.uk/stevenage",
        siteName: "Peckers",
        locale: "en_GB",
        type: "website",
    },
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
