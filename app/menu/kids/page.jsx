import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
    title: "Peckers Kids Menu | Halal Chicken Meals for Kids",
    description: "Delicious and fun halal chicken meals specially for the little ones at Peckers.",
};

const DEFAULT_DATA = [
    { name: "Coming Soon", ingredients: "We are currently preparing our delicious Kids Menu. Stay tuned!", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "0", image: "/images/burgers/default.png" },
];

export default async function KidsPage() {
    const data = await client.fetch(`*[_type == "kidsPage"][0] {
        kidsCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`);

    const navbarData = await client.fetch(`*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`);

    const initialItems = data?.kidsCarousel?.map((item) => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "/images/burgers/default.png",
        boost: item.boost || 1,
    })) || DEFAULT_DATA;

    return (
        <GenericMenuPageClient 
            initialItems={initialItems} 
            initialNavbarData={navbarData} 
            categoryName="KIDS" 
        />
    );
}
