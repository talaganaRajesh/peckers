import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
    title: "Peckers Shakes Menu | Thick Creamy Milkshakes Stevenage",
    description: "Indulge in our thick and creamy shakes. From Kunafa Dubai Chocolate to classic Oreo and Lotus Biscoff.",
};

const DEFAULT_DATA = [
    { name: "Vanilla milkshake", ingredients: "Thick, creamy, real vanilla milkshake", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "DAIRY", spiceLevel: "0", image: "/images/shakes/default.png" },
    { name: "Chocolate milkshake", ingredients: "Thick, creamy, and properly churned chocolate", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "DAIRY", spiceLevel: "0", image: "/images/shakes/default.png" },
    { name: "Kunafa Dubai chocolate", ingredients: "Rich chocolate and pistachio shake with a crunchy kunafa twist.", calories: "High", protein: "-", carbs: "-", fats: "-", allergens: "NUTS, DAIRY", spiceLevel: "0", image: "/images/shakes/default.png" },
    { name: "Oreo cookie pieces milkshake", ingredients: "Thick, creamy, and loaded with real Oreo", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN, DAIRY", spiceLevel: "0", image: "/images/shakes/default.png" },
    { name: "Lotus Biscoff milkshake", ingredients: "Thick, creamy, and packed with Biscoff crunch", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN, DAIRY", spiceLevel: "0", image: "/images/shakes/default.png" },
    { name: "KEESE’s peanut butter cups", ingredients: "Thick, creamy, and loaded with Reese's peanut butter", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "PEANUTS, DAIRY", spiceLevel: "0", image: "/images/shakes/default.png" },
    { name: "Ferrero Roche", ingredients: "Rich, velvety, and packed with Ferrero nuttiness", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "NUTS, DAIRY", spiceLevel: "0", image: "/images/shakes/default.png" },
    { name: "Kinder bueno", ingredients: "Smooth hazelnut flavour blended with real Kinder Bueno", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "NUTS, DAIRY", spiceLevel: "0", image: "/images/shakes/default.png" },
    { name: "Kinder bueno white", ingredients: "Creamy white chocolate and hazelnut blended with Bueno White", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "NUTS, DAIRY", spiceLevel: "0", image: "/images/shakes/default.png" },
    { name: "Galaxy caramel", ingredients: "Smooth milk chocolate blended with Galaxy caramel", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "DAIRY", spiceLevel: "0", image: "/images/shakes/default.png" },
    { name: "Galaxy original", ingredients: "Smooth, silky Galaxy chocolate blended into a thick shake", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "DAIRY", spiceLevel: "0", image: "/images/shakes/default.png" },
    { name: "Terry’s orange", ingredients: "Zesty orange chocolate blended with real Terry's pieces", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "DAIRY", spiceLevel: "0", image: "/images/shakes/default.png" },
    { name: "Bailey’s Nutella", ingredients: "Rich hazelnut cocoa blended with a creamy liqueur kick", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "NUTS, DAIRY", spiceLevel: "0", image: "/images/shakes/default.png" },
];

export default async function ShakesPage() {
    const data = await client.fetch(`*[_type == "shakesPage"][0] {
        shakesCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`);

    const navbarData = await client.fetch(`*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`);

    const initialItems = DEFAULT_DATA.map((defaultItem) => {
        const cmsItem = data?.shakesCarousel?.find(
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
            categoryName="SHAKES" 
        />
    );
}
