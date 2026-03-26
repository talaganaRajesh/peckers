import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
    title: "Peckers Rice Bowls Menu | Halal Chicken Rice Bowls Stevenage",
    description: "Discover our range of delicious halal chicken rice bowls at Peckers. From the OG to the fiery Buffalo Soldier.",
};

export default async function RiceBowlsPage() {
    const { data } = await sanityFetch({
        query: `*[_type == "menuPage"][0] {
        riceBowlsCarousel[] { name, image, boost, ingredients, calories, protein, carbs, fats, energy, allergens, spiceLevel, availabilityText }
    }`
    });

    const { data: navbarData } = await sanityFetch({
        query: `*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`
    });

    const finalItems = (data?.riceBowlsCarousel || []).map(item => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Rice+Bowl",
    }));

    return (
        <GenericMenuPageClient
            initialItems={finalItems}
            initialNavbarData={navbarData}
            categoryName="RICE BOWLS"
        />
    );
}
