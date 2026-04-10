import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
    title: "Peckers Drinks & Desserts Menu | Milkshakes & More Stevenage",
    description: "Indulge in our thick and creamy shakes and delicious desserts at Peckers. From Kunafa Dubai Chocolate to classic Oreo.",
};

export default async function DrinksAndDessertsPage() {
    const { data } = await sanityFetch({
        query: `*[_type == "menuPage"][0] {
        shakesCarousel[] { name, image, boost, ingredients, allergens, availabilityText }
    }`
    });

    const { data: navbarData } = await sanityFetch({
        query: `*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`
    });

    const finalItems = (data?.shakesCarousel || []).map(item => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Drink",
    }));

    return (
        <GenericMenuPageClient 
            initialItems={finalItems} 
            initialNavbarData={navbarData} 
            categoryName="DRINKS & DESSERTS" 
        />
    );
}
