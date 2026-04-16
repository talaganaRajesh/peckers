import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
    title: "Peckers Lunch Time Deals | Best Lunch Offers",
    description: "Grab our amazing lunch time deals at Peckers. Great value, great taste, 100% Halal.",
};

const DEFAULT_DATA = [
    { name: "Coming Soon", ingredients: "Our special Lunch Time Deals are coming soon! Check back later.", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "0", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Lunch+Deals" },
];

export default async function LunchDealsPage() {
    const { data } = await sanityFetch({
        query: `*[_type == "menuPage"][0] {
        lunchDealsCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`
    });

    const { data: navbarData } = await sanityFetch({
        query: `*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`
    });

    const initialItems = (data?.lunchDealsCarousel || []).map((item) => ({
        ...item,
        ingredients: (item.ingredients && item.ingredients !== "-") ? item.ingredients : undefined,
        calories: (item.calories && item.calories !== "-" && item.calories !== "—") ? item.calories : undefined,
        protein: (item.protein && item.protein !== "-" && item.protein !== "—") ? item.protein : undefined,
        carbs: (item.carbs && item.carbs !== "-" && item.carbs !== "—") ? item.carbs : undefined,
        fats: (item.fats && item.fats !== "-" && item.fats !== "—") ? item.fats : undefined,
        energy: (item.energy && item.energy !== "-" && item.energy !== "—") ? item.energy : undefined,
        image: item.image ? urlFor(item.image).url() : "/images/burgers/default.png",
        boost: item.boost || 1,
    }));

    const finalItems = initialItems.length > 0 ? initialItems : DEFAULT_DATA;

    return (
        <GenericMenuPageClient 
            initialItems={finalItems} 
            initialNavbarData={navbarData} 
            categoryName="LUNCH TIME DEALS" 
        />
    );
}
