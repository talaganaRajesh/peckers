import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
    title: "Peckers Salad Bowls Menu | Chicken Salads Stevenage",
    description: "Fresh and healthy chicken salad bowls at Peckers. Try our OG Salad or the Seoul-inspired Hert and Seoul bowl.",
};

export default async function SaladBowlsPage() {
    const { data } = await sanityFetch({
        query: `*[_type == "menuPage"][0] {
        saladBowlsCarousel[] { name, image, boost, ingredients, calories, protein, carbs, fats, energy, allergens, spiceLevel, availabilityText }
    }`
    });

    const { data: navbarData } = await sanityFetch({
        query: `*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`
    });

    const finalItems = (data?.saladBowlsCarousel || []).map(item => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Salad+Bowl",
    }));

    return (
        <GenericMenuPageClient
            initialItems={finalItems}
            initialNavbarData={navbarData}
            categoryName="SALAD BOWLS"
        />
    );
}
