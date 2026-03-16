import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
    title: "Peckers Rice Bowls Menu | Halal Chicken Rice Bowls Stevenage",
    description: "Discover our range of delicious halal chicken rice bowls at Peckers. From the OG to the fiery Buffalo Soldier.",
};

const DEFAULT_DATA = [
    { name: "The OG Rice bowl", ingredients: "Mild Spicy rice, signature peckers chicken, house mayo, and lettuce", calories: "666.4 Kcal", protein: "38.8g", carbs: "58.0g", fats: "35.6g", allergens: "-", spiceLevel: "1/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=OG+Rice+Bowl" },
    { name: "Buffalo soldier rice bowl", ingredients: "Mild Spicy rice, signature chicken, Buffalo sauce, house mayo, lettuce, and onions", calories: "742.5 Kcal", protein: "40.1g", carbs: "62.2g", fats: "41.3g", allergens: "-", spiceLevel: "4/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Buffalo+Rice+Bowl" },
    { name: "Murger on the dance floor rice bowl", ingredients: "Mild Spicy rice, peckers chicken, masala sauce, and onion bhaji and pickled onions", calories: "754.0 Kcal", protein: "41.4g", carbs: "78.3g", fats: "33.8g", allergens: "-", spiceLevel: "2/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Murger+Rice+Bowl" },
    { name: "Hert and Seoul rice bowl", ingredients: "Mild Spicy rice, signature chicken, Korean glaze, and house mayo", calories: "705.2 Kcal", protein: "39.9g", carbs: "67.2g", fats: "35.2g", allergens: "SESAME", spiceLevel: "2/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Korean+Rice+Bowl" },
    { name: "Mega pecker rice bowl", ingredients: "Mild Spicy rice, double-peckers breaded chicken, hash brown, and melted cheese", calories: "1119.5 Kcal", protein: "75.0g", carbs: "79.3g", fats: "62.6g", allergens: "-", spiceLevel: "1/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Mega+Rice+Bowl" },
    { name: "Supercharged OG Rice bowl", ingredients: "Mild Spicy rice, peckers breaded chicken, supercharged sauce, and melted cheese", calories: "600.8 Kcal", protein: "42.3g", carbs: "60.4g", fats: "25.5g", allergens: "-", spiceLevel: "3/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Supercharged+Rice+Bowl" },
    { name: "OG Peri - Peri Grilled chicken rice bowl", ingredients: "Mild Spicy rice, grilled chicken, choice of marinade, and house mayo", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "Depends", spiceLevel: "Depends", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Grilled+Rice+Bowl" },
];

export default async function RiceBowlsPage() {
    const data = await client.fetch(`*[_type == "riceBowlsPage"][0] {
        riceBowlsCarousel[] {
            name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText
        }
    }`);

    const navbarData = await client.fetch(`*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`);

    // 1. Start with CMS items as the base
    const cmsItems = (data?.riceBowlsCarousel || []).map(cmsItem => {
        const defaultItem = DEFAULT_DATA.find(
            (d) => d.name.toLowerCase() === cmsItem.name.toLowerCase() || 
                   cmsItem.name.toLowerCase().includes(d.name.toLowerCase()) ||
                   d.name.toLowerCase().includes(cmsItem.name.toLowerCase())
        );

        return {
            ...(defaultItem || {}),
            ...cmsItem,
            ingredients: cmsItem.ingredients || defaultItem?.ingredients,
            calories: cmsItem.calories && cmsItem.calories !== "-" ? cmsItem.calories : defaultItem?.calories,
            protein: cmsItem.protein && cmsItem.protein !== "-" ? cmsItem.protein : defaultItem?.protein,
            carbs: cmsItem.carbs && cmsItem.carbs !== "-" ? cmsItem.carbs : defaultItem?.carbs,
            fats: cmsItem.fats && cmsItem.fats !== "-" ? cmsItem.fats : defaultItem?.fats,
            image: cmsItem.image ? urlFor(cmsItem.image).url() : (defaultItem?.image || "https://placehold.co/600x600/000000/FFFFFF/png?text=Rice+Bowl"),
        };
    });

    // 2. Add any default items that are NOT in CMS
    const cmsNames = new Set(cmsItems.map(item => item.name.toLowerCase()));
    const missingDefaults = DEFAULT_DATA.filter(d => !cmsNames.has(d.name.toLowerCase()));

    const finalItems = [...cmsItems, ...missingDefaults];

    return (
        <GenericMenuPageClient
            initialItems={finalItems}
            initialNavbarData={navbarData}
            categoryName="RICE BOWLS"
        />
    );
}
