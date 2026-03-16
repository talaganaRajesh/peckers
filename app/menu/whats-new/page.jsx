import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
    title: "What's New at Peckers | Latest Halal Menu Additions",
    description: "Check out the latest additions to our menu. From grilled specialties to new burger flavours.",
};

const DEFAULT_DATA = [
    { name: "Peckers Health box", ingredients: "protein-packed blend of grilled chicken with your choice of marinade, mild spicy rice, salad, and grilled halloumi.", calories: "-", protein: "High", carbs: "-", fats: "-", allergens: "DAIRY, MUSTARD", spiceLevel: "Depends", image: "/images/whats-new/default.png" },
    { name: "Grilled wings", ingredients: "Flame-grilled wings with your choice of marinade", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "Depends", image: "/images/wings/default.png" },
    { name: "Peckers grilled snack wrap", ingredients: "Grilled chicken, house mayo, house salsa, lettuce in a 10\" wrap", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "1/4", image: "/images/wraps/default.png" },
    { name: "Honey-glazed BBQ classic burger", ingredients: "Crispy fillet, melted cheese, and house honey BBQ sauce on brioche bun", calories: "634.5 Kcal", protein: "41.9g", carbs: "56.1g", fats: "29.2g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "1/4", image: "/images/burgers/default.png" },
];

export default async function WhatsNewPage() {
    const data = await client.fetch(`*[_type == "whatsNewPage"][0] {
        whatsNewCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`);

    const navbarData = await client.fetch(`*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`);

    const initialItems = DEFAULT_DATA.map((defaultItem) => {
        const cmsItem = data?.whatsNewCarousel?.find(
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
            categoryName="WHAT'S NEW" 
        />
    );
}
