import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
    title: "Peckers Sides & Fries Menu | Halal Sides Stevenage & Hitchin",
    description: "Complete your meal with our crispy fries, cheesy loaded fries, halloumi, and more.",
};

const DEFAULT_DATA = [
    { name: "Peckers loaded fries", ingredients: "Fries dripping in cheese, house Buffalo Soldier sauce, jalapeños, and crispy onions", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "DAIRY", spiceLevel: "3/4", image: "/images/sides/default.png" },
    { name: "Halloumi fries with chilli jam", ingredients: "halloumi fries served with a sweet chilli kick", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "DAIRY", spiceLevel: "1/4", image: "/images/sides/default.png" },
    { name: "Mac & cheese sticks", ingredients: "Mac & Cheese Bites with House-made OG Chilli", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN, DAIRY", spiceLevel: "2/4", image: "/images/sides/default.png" },
];

export default async function SidesAndFriesPage() {
    const data = await client.fetch(`*[_type == "sidesAndFriesPage"][0] {
        sidesCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`);

    const navbarData = await client.fetch(`*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`);

    const initialItems = data?.sidesCarousel?.map((item) => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "/images/sides/default.png",
        boost: item.boost || 1,
    })) || DEFAULT_DATA;

    return (
        <GenericMenuPageClient 
            initialItems={initialItems} 
            initialNavbarData={navbarData} 
            categoryName="SIDES & FRIES" 
        />
    );
}
