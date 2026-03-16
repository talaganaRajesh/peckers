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

    const initialItems = DEFAULT_DATA.map((defaultItem) => {
        const cmsItem = data?.mealBoxCarousel?.find(
            (item) => item.name.toLowerCase() === defaultItem.name.toLowerCase()
        );

        return {
            ...defaultItem,
            ...cmsItem,
            ingredients: cmsItem?.ingredients || defaultItem.ingredients,
            calories: cmsItem?.calories && cmsItem.calories !== "-" ? cmsItem.calories : defaultItem.calories,
            protein: cmsItem?.protein && cmsItem.protein !== "-" ? cmsItem.protein : defaultItem.protein,
            carbs: cmsItem?.carbs && cmsItem.carbs !== "-" ? cmsItem.carbs : defaultItem.carbs,
            fats: cmsItem?.fats && cmsItem.fats !== "-" ? cmsItem.fats : defaultItem.fats,
            spiceLevel: cmsItem?.spiceLevel || defaultItem.spiceLevel,
            allergens: cmsItem?.allergens || defaultItem.allergens,
            image: cmsItem?.image ? urlFor(cmsItem.image).url() : defaultItem.image,
            boost: cmsItem?.boost || defaultItem.boost || 1,
        };
    });

    return (
        <GenericMenuPageClient 
            initialItems={initialItems} 
            initialNavbarData={navbarData} 
            categoryName="MEAL BOX" 
        />
    );
}
