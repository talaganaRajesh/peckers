import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
    title: "Peckers Veg Menu | Plant-Based Soy Burgers & Wraps Stevenage",
    description: "Enjoy our delicious range of Peckersless plant-based burgers, wraps, and bowls. 100% vegetarian, 100% flavour.",
};

const DEFAULT_DATA = [
    { name: "Peckersless OG burger", ingredients: "Crunchy plant-based soy patty and house mayo on a seeded brioche.", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN, SOY, EGGS", spiceLevel: "1/4", image: "/images/burgers/default.png" },
    { name: "Peckerless murger on the dance floor burger", ingredients: "Plant-based soy patty, onion bhaji, and mango chutney in a butter masala sauce", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN, SOY", spiceLevel: "2/4", image: "/images/burgers/default.png" },
    { name: "Peckerless rice bowl", ingredients: "Mild spicy rice, crispy vegetarian soy-based patty, with your choice of a Peckers flavour", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "SOY", spiceLevel: "Depends", image: "/images/rice-bowls/default.png" },
];

export default async function VegPage() {
    const data = await client.fetch(`*[_type == "vegPage"][0] {
        vegCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`);

    const navbarData = await client.fetch(`*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`);

    const initialItems = data?.vegCarousel?.map((item) => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "/images/burgers/default.png",
        boost: item.boost || 1,
    })) || DEFAULT_DATA;

    return (
        <GenericMenuPageClient 
            initialItems={initialItems} 
            initialNavbarData={navbarData} 
            categoryName="VEG" 
        />
    );
}
