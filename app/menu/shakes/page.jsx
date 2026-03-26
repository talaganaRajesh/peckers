import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
    title: "Peckers Shakes Menu | Thick Creamy Milkshakes Stevenage",
    description: "Indulge in our thick and creamy shakes. From Kunafa Dubai Chocolate to classic Oreo and Lotus Biscoff.",
};

export default async function ShakesPage() {
    const { data } = await sanityFetch({
        query: `*[_type == "menuPage"][0] {
        shakesCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`
    });

    const { data: navbarData } = await sanityFetch({
        query: `*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`
    });

    const initialItems = (data?.shakesCarousel || []).map(item => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Shake",
    }));

    return (
        <GenericMenuPageClient 
            initialItems={initialItems} 
            initialNavbarData={navbarData} 
            categoryName="SHAKES" 
        />
    );
}
