import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
    title: "What's New at Peckers | Latest Halal Menu Additions",
    description: "Check out the latest additions to our menu. From grilled specialties to new burger flavours.",
};

const DEFAULT_DATA = [
    { name: "Peckers Health box", ingredients: "protein-packed blend of grilled chicken with your choice of marinade, mild spicy rice, salad, and grilled halloumi.", calories: "-", protein: "High", carbs: "-", fats: "-", allergens: "DAIRY", spiceLevel: "Depends", image: "/images/whats-new/default.png" },
    { name: "Honey-glazed BBQ classic burger", ingredients: "Crispy fillet, melted cheese, and house honey BBQ sauce on brioche bun", calories: "634.5 Kcal", protein: "41.9g", carbs: "56.1g", fats: "29.2g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "1/4", image: "/images/burgers/default.png" },
];

export default async function WhatsNewPage() {
    const data = await client.fetch(`*[_type == "whatsNewPage"][0] {
        whatsNewCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`);

    const navbarData = await client.fetch(`*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`);

    const initialItems = data?.whatsNewCarousel?.map((item) => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "/images/whats-new/default.png",
        boost: item.boost || 1,
    })) || DEFAULT_DATA;

    return (
        <GenericMenuPageClient 
            initialItems={initialItems} 
            initialNavbarData={navbarData} 
            categoryName="WHAT'S NEW" 
        />
    );
}
