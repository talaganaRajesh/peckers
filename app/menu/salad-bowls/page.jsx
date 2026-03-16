import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
    title: "Peckers Salad Bowls Menu | Halal Chicken Salads Stevenage",
    description: "Fresh and healthy halal chicken salad bowls at Peckers. Try our OG Salad or the Seoul-inspired Hert and Seoul bowl.",
};

const DEFAULT_DATA = [
    { name: "The OG Salad bowl", ingredients: "Fresh mixed salad, crispy peckers breaded chicken fillet, house mayo", calories: "539.8 Kcal", protein: "41.1g", carbs: "15.5g", fats: "36.8g", allergens: "-", spiceLevel: "1/4", image: "/images/salad-bowls/default.png" },
    { name: "Buffalo soldier Salad bowl", ingredients: "Fresh salad, signature peckers breaded chicken, house Buffalo sauce, and house mayo", calories: "540.7 Kcal", protein: "33.7g", carbs: "17.7g", fats: "38.4g", allergens: "-", spiceLevel: "4/4", image: "/images/salad-bowls/default.png" },
    { name: "Murger on the dance floor salad bowl", ingredients: "Fresh salad, peckers breaded chicken, masala sauce, and onion bhaji.", calories: "549.1 Kcal", protein: "34.8g", carbs: "33.5g", fats: "30.9g", allergens: "-", spiceLevel: "2/4", image: "/images/salad-bowls/default.png" },
    { name: "Hert and Seoul salad bowl", ingredients: "Crunchy mixed salad, crispy peckers breaded chicken fillet, secret blend of Korean glaze & house mayo, house Korean slaw.", calories: "480.6 Kcal", protein: "32.8g", carbs: "20.9g", fats: "30.9g", allergens: "SESAME", spiceLevel: "2/4", image: "/images/salad-bowls/default.png" },
    { name: "Mega pecker salad bowl", ingredients: "Fresh mixed salad, double peckers breaded chicken fillet, house made mayo, hash brown, melted cheese.", calories: "914.7 Kcal", protein: "68.3g", carbs: "34.5g", fats: "59.7g", allergens: "-", spiceLevel: "1/4", image: "/images/salad-bowls/default.png" },
    { name: "OG Peri -Peri Grilled salad bowl", ingredients: "Mixed salad, grilled chicken with your choice of marinade, and house mayo.", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "Depends", spiceLevel: "Depends", image: "/images/salad-bowls/default.png" },
];

export default async function SaladBowlsPage() {
    const data = await client.fetch(`*[_type == "saladBowlsPage"][0] {
        saladBowlsCarousel[] {
            name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText
        }
    }`);

    const navbarData = await client.fetch(`*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`);

    const initialItems = DEFAULT_DATA.map((defaultItem) => {
        const cmsItem = data?.saladBowlsCarousel?.find(
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
            boost: cmsItem?.boost || defaultItem.boost,
        };
    });

    return (
        <GenericMenuPageClient
            initialItems={initialItems}
            initialNavbarData={navbarData}
            categoryName="SALAD BOWLS"
        />
    );
}
