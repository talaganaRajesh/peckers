import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
    title: "Peckers Peri-Peri Grilled Chicken Menu | Halal Grilled Chicken",
    description: "Healthy and delicious flame-grilled chicken. Choose your marinade and enjoy our protein-packed health boxes and grilled platters.",
};

const DEFAULT_DATA = [
    { name: "Peckers Health box", ingredients: "Grilled chicken, marinade, mild spicy rice, salad, and grilled halloumi.", calories: "-", protein: "High", carbs: "-", fats: "-", allergens: "DAIRY", spiceLevel: "Depends", image: "/images/grilled/default.png" },
    { name: "Peri Peri Flame Grilled wings", ingredients: "Flame-grilled wings with your choice of marinade", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "Depends", image: "/images/grilled/default.png" },
    { name: "OG Peri- Peri Grilled burger", ingredients: "Flame-grilled chicken in your choice of marinade with house-made mayo.", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "Depends", image: "/images/grilled/default.png" },
    { name: "Peri Peri Half grilled chicken", ingredients: "1/2 piece of Grilled chicken in your choice of Peckers marinade", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "Depends", image: "/images/grilled/default.png" },
];

export default async function PeriPeriGrillPage() {
    const data = await client.fetch(`*[_type == "periPeriGrillPage"][0] {
        grillCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`);

    const navbarData = await client.fetch(`*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`);

    const initialItems = data?.grillCarousel?.map((item) => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "/images/grilled/default.png",
        boost: item.boost || 1,
    })) || DEFAULT_DATA;

    return (
        <GenericMenuPageClient 
            initialItems={initialItems} 
            initialNavbarData={navbarData} 
            categoryName="PERI-PERI GRILL" 
        />
    );
}
