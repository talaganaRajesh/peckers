import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
    title: "Peckers Peri-Peri Grilled Chicken Menu | Halal Grilled Chicken",
    description: "Healthy and delicious flame-grilled chicken. Choose your marinade and enjoy our protein-packed health boxes and grilled platters.",
};

const DEFAULT_DATA = [
    { name: "Peckers Health box", ingredients: "protein-packed blend of grilled chicken with your choice of marinade, mild spicy rice, salad, and grilled halloumi.", calories: "-", protein: "High", carbs: "-", fats: "-", allergens: "DAIRY, MUSTARD", spiceLevel: "Depends", image: "/images/grilled/default.png" },
    { name: "Peri Peri Flame Grilled wings", ingredients: "Flame-grilled wings with your choice of marinade", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "Depends", image: "/images/wings/default.png" },
    { name: "Peckers grilled snack wrap", ingredients: "Grilled chicken, house mayo, house- made salsa, lettuce in a 10\" wrap", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "1/4", image: "/images/wraps/default.png" },
    { name: "OG Peri- Peri Grilled burger", ingredients: "Flame-grilled chicken in your choice of marinade with house-made mayo.", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "Depends", image: "/images/burgers/default.png" },
    { name: "OG Peri - Peri Grilled wrap", ingredients: "Grilled chicken, house mayo, lettuce, and your choice of marinade, wrapped", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "Depends", image: "/images/wraps/default.png" },
    { name: "Peri Peri Quarter grilled chicken", ingredients: "1/4 piece of Grilled chicken in your choice of Peckers marinade", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "Depends", image: "/images/grilled/default.png" },
    { name: "Peri Peri Half grilled chicken", ingredients: "1/2 piece of Grilled chicken in your choice of Peckers marinade", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "Depends", image: "/images/grilled/default.png" },
    { name: "OG Peri- Peri Grilled rice bowl", ingredients: "Mild Spicy rice, grilled chicken with your choice of marinade, and house mayo", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "Depends", image: "/images/rice-bowls/default.png" },
    { name: "OG Peri - Peri Grilled salad bowl", ingredients: "Mixed salad, grilled chicken with your choice of marinade, and house mayo.", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "Depends", image: "/images/salad-bowls/default.png" },
];

export default async function PeriPeriGrillPage() {
    const data = await client.fetch(`*[_type == "periPeriGrillPage"][0] {
        grillCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`);

    const navbarData = await client.fetch(`*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`);

    const initialItems = DEFAULT_DATA.map((defaultItem) => {
        const cmsItem = data?.grillCarousel?.find(
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
            categoryName="PERI-PERI GRILL" 
        />
    );
}
