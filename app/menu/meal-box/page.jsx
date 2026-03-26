import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
    title: "Peckers Meal Boxes | Wings, Tenders & Fries Combo Stevenage",
    description: "Our signature meal boxes. The OG Meal Box, Supercharged, and Peri-Peri Grilled chicken combos with fries and sides.",
};

export default async function MealBoxPage() {
    const { data } = await sanityFetch({
        query: `*[_type == "menuPage"][0] {
        mealBoxCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`
    });

    const { data: navbarData } = await sanityFetch({
        query: `*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`
    });

    const initialItems = (data?.mealBoxCarousel || []).map(item => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Meal+Box",
    }));

    return (
        <GenericMenuPageClient 
            initialItems={initialItems} 
            initialNavbarData={navbarData} 
            categoryName="MEAL BOX" 
        />
    );
}
