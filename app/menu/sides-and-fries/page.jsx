import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";
export const revalidate = 0;

export const metadata = {
    title: "Peckers Sides & Fries Menu | Halal Sides Stevenage & Hitchin",
    description: "Complete your meal with our crispy fries, cheesy loaded fries, halloumi, and more.",
};

const DEFAULT_DATA = [
    { name: "1 Piece southern fried chicken", ingredients: "1 Piece of our signature southern fried chicken", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN", spiceLevel: "1/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Sides" },
    { name: "1 piece southern fried chicken & chips", ingredients: "1 piece of southern fried chicken served with a portion of crispy chips", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN", spiceLevel: "1/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Sides" },
    { name: "2 piece southern fried chicken & chips", ingredients: "2 pieces of southern fried chicken served with a portion of crispy chips", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN", spiceLevel: "1/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Sides" },
    { name: "3 piece southern fried chicken & chips", ingredients: "3 pieces of southern fried chicken served with a portion of crispy chips", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN", spiceLevel: "1/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Sides" },
    { name: "Fries", ingredients: "Classic & crispy portion of fries", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "0", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Sides" },
    { name: "Cheesy fries", ingredients: "Cheesy fries tossed in mozzarella, house garlic mayo, and chives", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "DAIRY", spiceLevel: "0", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Sides" },
    { name: "Peckers loaded fries", ingredients: "Fries dripping in cheese, house Buffalo Soldier sauce, jalapeños, and crispy onions", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "DAIRY", spiceLevel: "3/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Sides" },
    { name: "Halloumi fries with chilli jam", ingredients: "halloumi fries served with a sweet chilli kick", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "DAIRY", spiceLevel: "1/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Sides" },
    { name: "Mac & cheese sticks", ingredients: "Mac & Cheese Bites with House-made OG Chilli", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN, DAIRY", spiceLevel: "2/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Sides" },
    { name: "Corn on the cob", ingredients: "Sweet, fragrant corn on the cob, buttered to perfection", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "DAIRY", spiceLevel: "0", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Sides" },
    { name: "Mac and cheese", ingredients: "macaroni pasta tossed in a rich, velvety cheese sauce", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN, DAIRY", spiceLevel: "0", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Sides" },
    { name: "Rice bowl", ingredients: "Fragrant, mild spicy rice tossed with peppers, garlic, and onions", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "1/4", image: "/images/rice-bowls/default.png" },
    { name: "Salad", ingredients: "Crisp, garden-fresh greens tossed with tangy pickled onions", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "0", image: "/images/salad-bowls/default.png" },
    { name: "Grilled halloumi", ingredients: "grilled halloumi with a perfect squeak, served with zesty salsa", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "DAIRY", spiceLevel: "0", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Sides" },
];

export default async function SidesAndFriesPage() {
    const data = await client.fetch(`*[_type == "menuPage"][0] {
        sidesAndFriesCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`);

    const navbarData = await client.fetch(`*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`);

    const initialItems = DEFAULT_DATA.map((defaultItem) => {
        const cmsItem = data?.sidesAndFriesCarousel?.find(
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
            categoryName="SIDES & FRIES" 
        />
    );
}
