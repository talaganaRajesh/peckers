import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
    title: "What's New at Peckers | Latest Halal Menu Additions",
    description: "Check out the latest additions to our menu. From grilled specialties to new burger flavours.",
};

export default async function WhatsNewPage() {
    const { data } = await sanityFetch({
        query: `*[_type == "menuPage"][0] {
        whatsNewCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`
    });

    const { data: navbarData } = await sanityFetch({
        query: `*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`
    });

    const initialItems = (data?.whatsNewCarousel || []).map(item => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Whats+New",
    }));

    return (
        <GenericMenuPageClient 
            initialItems={initialItems} 
            initialNavbarData={navbarData} 
            categoryName="WHAT'S NEW" 
        />
    );
}
