import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
    title: "Peckers Rice & Salad Bowls Menu | Chicken Bowls Stevenage",
    description: "Discover our range of delicious chicken rice and salad bowls at Peckers. Fresh, healthy, and seriously good.",
};

export default async function RiceAndSaladBowlsPage() {
    const { data } = await sanityFetch({
        query: `*[_type == "menuPage"][0] {
        riceBowlsCarousel[] { name, image, boost, ingredients, calories, protein, carbs, fats, energy, allergens, spiceLevel, availabilityText },
        saladBowlsCarousel[] { name, image, boost, ingredients, calories, protein, carbs, fats, energy, allergens, spiceLevel, availabilityText }
    }`
    });

    const { data: navbarData } = await sanityFetch({
        query: `*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`
    });

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
