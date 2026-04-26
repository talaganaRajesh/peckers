import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
    title: "Peckers Wings Menu | Chicken Wings Stevenage & Hitchin",
    description: "Try our signature southern fried or flame-grilled wings. Coated in our house-made sauces.",
};

export default async function WingsPage() {
    const { data } = await sanityFetch({
        query: `*[_type == "menuPage"][0] {
        wingsAndTendersCarousel[] { name, image, boost, ingredients, calories, protein, carbs, fats, energy, allergens, spiceLevel, availabilityText }
    }`
    });

    const { data: navbarData } = await sanityFetch({
        query: `*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`
    });

    // Filter to only show Wings
    const finalItems = (data?.wingsAndTendersCarousel || [])
        .filter(item => item.name?.toLowerCase().includes("wing"))
        .map(item => ({
            ...item,
            image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Wing",
        }));

    return (
        <GenericMenuPageClient 
            initialItems={finalItems} 
            initialNavbarData={navbarData} 
            categoryName="WINGS" 
        />
    );
}
