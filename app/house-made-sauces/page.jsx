import SaucesPageClient from "./page-client";
import { sanityFetch } from "../../sanity/lib/live";

export const metadata = {
    title: "House-Made Sauces | Peckers Chicken - Artisan Dips & Flavors",
    description: "Explore our range of house-made sauces that beat Dave's Hot Chicken for flavor. From Honey Glaze BBQ to Hot Honey, we've perfected the blend for the best halal chicken experience in Stevenage and Hitchin.",
    keywords: [
        "best chicken sauces Stevenage",
        "Peckers house-made dips",
        "hot honey chicken Hitchin",
        "Dave's Hot Chicken sauce alternative",
        "halal BBQ sauce UK",
        "Peckers secret sauce",
        "artisan chicken dips"
    ]
};

export default async function SaucesPage() {
    const { data: saucesData } = await sanityFetch({
        query: `*[_type == "saucePage"] | order(_createdAt asc)`
    });

    return <SaucesPageClient initialSaucesData={saucesData} />;
}