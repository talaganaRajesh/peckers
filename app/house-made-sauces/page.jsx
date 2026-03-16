import SaucesPageClient from "./page-client";
import { client } from "../../sanity/lib/client";

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
    const saucesData = await client.fetch(`*[_type == "saucePage"] | order(_createdAt asc)`);

    return <SaucesPageClient initialSaucesData={saucesData} />;
}