import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
    title: "Peckers Meal Boxes | Wings, Tenders & Fries Combo Stevenage",
    description: "Our signature meal boxes. The OG Meal Box, Supercharged, and Peri-Peri Grilled chicken combos with fries and sides.",
};

const DEFAULT_DATA = [
    { name: "The OG Meal box", ingredients: "3 wings, 2 tenders and regular fries", calories: "553.8 Kcal", protein: "38.3g", carbs: "42.0g", fats: "22.6g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "1/4", image: "/images/meal-box/default.png" },
    { name: "Supercharged OG Meal box", ingredients: "3 supercharged wings, 2 supercharged tenders and regular fries", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "3/4", image: "/images/meal-box/default.png" },
    { name: "Peri - Peri Meal box", ingredients: "3 grilled wings, grilled tenders and regular fries", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "Depends", spiceLevel: "Depends", image: "/images/meal-box/default.png" },
];

export default async function MealBoxPage() {
    const data = await client.fetch(`*[_type == "mealBoxPage"][0] {
        mealBoxCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`);

    const navbarData = await client.fetch(`*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`);

    const initialItems = data?.mealBoxCarousel?.map((item) => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "/images/meal-box/default.png",
        boost: item.boost || 1,
    })) || DEFAULT_DATA;

    return (
        <GenericMenuPageClient 
            initialItems={initialItems} 
            initialNavbarData={navbarData} 
            categoryName="MEAL BOX" 
        />
    );
}
