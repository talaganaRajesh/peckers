import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";
export const revalidate = 0;

export const metadata = {
    title: "Peckers Peri-Peri Grilled Chicken Menu | Halal Grilled Chicken",
    description: "Healthy and delicious flame-grilled chicken. Choose your marinade and enjoy our protein-packed health boxes and grilled platters.",
};

export default async function PeriPeriGrillPage() {
    const data = await client.fetch(`*[_type == "menuPage"][0] {
        periPeriGrillCarousel[] { name, image, boost, ingredients, calories, protein, carbs, fats, energy, allergens, spiceLevel, availabilityText }
    }`);

    const navbarData = await client.fetch(`*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`);

    const initialItems = (data?.periPeriGrillCarousel || []).map(item => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Grilled+Chicken",
    }));

    return (
        <GenericMenuPageClient 
            initialItems={initialItems} 
            initialNavbarData={navbarData} 
            categoryName="PERI-PERI GRILLED CHICKEN" 
        />
    );
}
