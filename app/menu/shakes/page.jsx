import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
    title: "Peckers Shakes Menu | Thick Creamy Milkshakes Stevenage",
    description: "Indulge in our thick and creamy shakes. From Kunafa Dubai Chocolate to classic Oreo and Lotus Biscoff.",
};

const DEFAULT_DATA = [
    { name: "Kunafa Dubai chocolate", ingredients: "Rich chocolate and pistachio shake with a crunchy kunafa twist.", calories: "High", protein: "-", carbs: "-", fats: "-", allergens: "NUTS, DAIRY", spiceLevel: "0", image: "/images/shakes/default.png" },
    { name: "Oreo cookie pieces milkshake", ingredients: "Thick, creamy, and loaded with real Oreo", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN, DAIRY", spiceLevel: "0", image: "/images/shakes/default.png" },
    { name: "Lotus Biscoff milkshake", ingredients: "Thick, creamy, and packed with Biscoff crunch", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN, DAIRY", spiceLevel: "0", image: "/images/shakes/default.png" },
    { name: "Ferrero Roche", ingredients: "Rich, velvety, and packed with Ferrero nuttiness", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "NUTS, DAIRY", spiceLevel: "0", image: "/images/shakes/default.png" },
];

export default async function ShakesPage() {
    const data = await client.fetch(`*[_type == "shakesPage"][0] {
        shakesCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`);

    const navbarData = await client.fetch(`*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`);

    const initialItems = data?.shakesCarousel?.map((item) => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "/images/shakes/default.png",
        boost: item.boost || 1,
    })) || DEFAULT_DATA;

    return (
        <GenericMenuPageClient 
            initialItems={initialItems} 
            initialNavbarData={navbarData} 
            categoryName="SHAKES" 
        />
    );
}
