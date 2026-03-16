import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
    title: "Peckers Lunch Time Deals | Best Halal Lunch Offers",
    description: "Grab our amazing lunch time deals at Peckers. Great value, great taste, 100% Halal.",
};

const DEFAULT_DATA = [
    { name: "Coming Soon", ingredients: "Our special Lunch Time Deals are coming soon! Check back later.", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "0", image: "/images/burgers/default.png" },
];

export default async function LunchDealsPage() {
    const data = await client.fetch(`*[_type == "lunchDealsPage"][0] {
        lunchDealsCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`);

    const navbarData = await client.fetch(`*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`);

    const initialItems = data?.lunchDealsCarousel?.map((item) => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "/images/burgers/default.png",
        boost: item.boost || 1,
    })) || DEFAULT_DATA;

    return (
        <GenericMenuPageClient 
            initialItems={initialItems} 
            initialNavbarData={navbarData} 
            categoryName="LUNCH TIME DEALS" 
        />
    );
}
