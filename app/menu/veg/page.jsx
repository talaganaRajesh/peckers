import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";
export const revalidate = 0;

export const metadata = {
    title: "Peckers Veg Menu | Plant-Based Soy Burgers & Wraps Stevenage",
    description: "Enjoy our delicious range of Peckersless plant-based burgers, wraps, and bowls. 100% vegetarian, 100% flavour.",
};

const DEFAULT_DATA = [
    { name: "Peckersless OG burger", ingredients: "Crunchy plant-based soy patty and house mayo on a seeded brioche.", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN, SOY, EGGS", spiceLevel: "1/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Burger" },
    { name: "Peckerless murger on the dance floor burger", ingredients: "Plant-based soy patty, onion bhaji, and mango chutney in a butter masala sauce", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN, SOY", spiceLevel: "2/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Burger" },
    { name: "Peckerless hert and Seoul burger", ingredients: "Plant-based soy patty and OG slaw in a Korean glaze and house mayo", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN, SOY, EGGS", spiceLevel: "2/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Burger" },
    { name: "Peckerless mega pecker burger", ingredients: "Double plant-based patties, hash brown, and melted cheese with house mayo", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN, SOY, EGGS, MILK", spiceLevel: "1/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Burger" },
    { name: "Peckerless OG wrap", ingredients: "Crispy Soy-based patty, house mayo, and lettuce in a toasted wrap", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN, SOY, EGGS", spiceLevel: "1/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Wrap" },
    { name: "Peckerless murger on the dance floor wrap", ingredients: "Soy-based patty, house masala, onion bhaji, mango chutney, and pickled onions, wrapped.", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN, SOY", spiceLevel: "2/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Wrap" },
    { name: "Peckerless hert and Seoul wrap", ingredients: "Soy-based patty, Korean glaze, house mayo, OG slaw, and onions, wrapped", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN, SOY, EGGS", spiceLevel: "2/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Wrap" },
    { name: "Peckerless mega pecker wrap", ingredients: "Double soy-based patties, hash brown, cheese, house mayo, lettuce, and onions, wrapped.", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN, SOY, EGGS, MILK", spiceLevel: "1/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Wrap" },
    { name: "Peckerless rice bowl", ingredients: "Mild spicy rice, crispy vegetarian soy-based patty, with your choice of a Peckers flavour", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "SOY", spiceLevel: "Depends", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Rice+Bowl" },
    { name: "Peckerless salad bowl", ingredients: "Fresh mixed salad, crispy vegetarian soy based patty, with your choice of a Peckers flavour", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "SOY", spiceLevel: "Depends", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Salad+Bowl" },
];

export default async function VegPage() {
    const data = await client.fetch(`*[_type == "menuPage"][0] {
        vegCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`);

    const navbarData = await client.fetch(`*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`);

    const initialItems = DEFAULT_DATA.map((defaultItem) => {
        const cmsItem = data?.vegCarousel?.find(
            (item) => item.name.toLowerCase() === defaultItem.name.toLowerCase()
        );

        return {
            ...defaultItem,
            ...cmsItem,
            ingredients: (cmsItem?.ingredients && cmsItem.ingredients !== "-") ? cmsItem.ingredients : defaultItem.ingredients,
            calories: (cmsItem?.calories && cmsItem.calories !== "-" && cmsItem.calories !== "—") ? cmsItem.calories : defaultItem.calories,
            protein: (cmsItem?.protein && cmsItem.protein !== "-" && cmsItem.protein !== "—") ? cmsItem.protein : defaultItem.protein,
            carbs: (cmsItem?.carbs && cmsItem.carbs !== "-" && cmsItem.carbs !== "—") ? cmsItem.carbs : defaultItem.carbs,
            fats: (cmsItem?.fats && cmsItem.fats !== "-" && cmsItem.fats !== "—") ? cmsItem.fats : defaultItem.fats,
            energy: (cmsItem?.energy && cmsItem.energy !== "-" && cmsItem.energy !== "—") ? cmsItem.energy : defaultItem?.energy,
            spiceLevel: (cmsItem?.spiceLevel && cmsItem.spiceLevel !== "-") ? cmsItem.spiceLevel : defaultItem.spiceLevel,
            allergens: (cmsItem?.allergens && cmsItem.allergens !== "-") ? cmsItem.allergens : defaultItem.allergens,
            image: cmsItem?.image ? urlFor(cmsItem.image).url() : defaultItem.image,
            boost: cmsItem?.boost || defaultItem.boost || 1,
        };
    });

    return (
        <GenericMenuPageClient 
            initialItems={initialItems} 
            initialNavbarData={navbarData} 
            categoryName="VEG" 
        />
    );
}
