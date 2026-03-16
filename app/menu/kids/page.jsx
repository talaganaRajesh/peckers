import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";
export const revalidate = 0;

export const metadata = {
    title: "Peckers Kids Menu | Halal Chicken Meals for Kids",
    description: "Delicious and fun halal chicken meals specially for the little ones at Peckers.",
};

const DEFAULT_DATA = [
    { name: "Coming Soon", ingredients: "We are currently preparing our delicious Kids Menu. Stay tuned!", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "0", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Kids+Menu" },
];

export default async function KidsPage() {
    const data = await client.fetch(`*[_type == "menuPage"][0] {
        kidsCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`);

    const navbarData = await client.fetch(`*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`);

    const initialItems = (data?.kidsCarousel || []).map((item) => ({
        ...item,
        ingredients: (item.ingredients && item.ingredients !== "-") ? item.ingredients : undefined,
        calories: (item.calories && item.calories !== "-" && item.calories !== "—") ? item.calories : undefined,
        protein: (item.protein && item.protein !== "-" && item.protein !== "—") ? item.protein : undefined,
        carbs: (item.carbs && item.carbs !== "-" && item.carbs !== "—") ? item.carbs : undefined,
        fats: (item.fats && item.fats !== "-" && item.fats !== "—") ? item.fats : undefined,
        energy: (item.energy && item.energy !== "-" && item.energy !== "—") ? item.energy : undefined,
        image: item.image ? urlFor(item.image).url() : "/images/burgers/default.png",
        boost: item.boost || 1,
    }));

    const finalItems = initialItems.length > 0 ? initialItems : DEFAULT_DATA;

    return (
        <GenericMenuPageClient 
            initialItems={finalItems} 
            initialNavbarData={navbarData} 
            categoryName="KIDS" 
        />
    );
}
