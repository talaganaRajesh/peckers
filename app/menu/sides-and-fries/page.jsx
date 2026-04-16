import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
    title: "Peckers Sides & Fries Menu | Sides Stevenage & Hitchin",
    description: "Complete your meal with our crispy fries, cheesy loaded fries, halloumi, and more.",
};

export default async function SidesAndFriesPage() {
    const { data } = await sanityFetch({
        query: `*[_type == "menuPage"][0] {
        sidesAndFriesCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`
    });

    const { data: navbarData } = await sanityFetch({
        query: `*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`
    });

    const initialItems = (data?.sidesAndFriesCarousel || []).map(item => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Side+Item",
    }));

    return (
        <GenericMenuPageClient 
            initialItems={initialItems} 
            initialNavbarData={navbarData} 
            categoryName="SIDES" 
        />
    );
}
