import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";
export const revalidate = 0;

export const metadata = {
    title: "Peckers Veg Menu | Plant-Based Soy Burgers & Wraps Stevenage",
    description: "Enjoy our delicious range of Peckersless plant-based burgers, wraps, and bowls. 100% vegetarian, 100% flavour.",
};

export default async function VegPage() {
    const data = await client.fetch(`*[_type == "menuPage"][0] {
        vegCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`);

    const navbarData = await client.fetch(`*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`);

    const initialItems = (data?.vegCarousel || []).map(item => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Veg+Item",
    }));

    return (
        <GenericMenuPageClient 
            initialItems={initialItems} 
            initialNavbarData={navbarData} 
            categoryName="VEG" 
        />
    );
}
