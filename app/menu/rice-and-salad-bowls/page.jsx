import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";
export const revalidate = 0;

export const metadata = {
    title: "Peckers Rice & Salad Bowls Menu | Halal Chicken Bowls Stevenage",
    description: "Discover our range of delicious halal chicken rice and salad bowls at Peckers. Fresh, healthy, and seriously good.",
};

export default async function RiceAndSaladBowlsPage() {
    const data = await client.fetch(`*[_type == "menuPage"][0] {
        riceBowlsCarousel[] { name, image, boost, ingredients, calories, protein, carbs, fats, energy, allergens, spiceLevel, availabilityText },
        saladBowlsCarousel[] { name, image, boost, ingredients, calories, protein, carbs, fats, energy, allergens, spiceLevel, availabilityText }
    }`);

    const navbarData = await client.fetch(`*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`);

    const riceItems = (data?.riceBowlsCarousel || []).map(item => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Rice+Bowl",
    }));

    const saladItems = (data?.saladBowlsCarousel || []).map(item => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Salad+Bowl",
    }));

    const finalItems = [...riceItems, ...saladItems];

    return (
        <GenericMenuPageClient
            initialItems={finalItems}
            initialNavbarData={navbarData}
            categoryName="RICE & SALAD BOWLS"
        />
    );
}
