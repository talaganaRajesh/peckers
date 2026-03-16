import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";
export const revalidate = 0;

export const metadata = {
    title: "Peckers Wings & Tenders Menu | Halal Chicken Wings Stevenage",
    description: "Try our signature southern fried or flame-grilled wings and buttermilk tenders. Coated in our house-made sauces.",
};

export default async function WingsPage() {
    const data = await client.fetch(`*[_type == "menuPage"][0] {
        wingsAndTendersCarousel[] { name, image, boost, ingredients, calories, protein, carbs, fats, energy, allergens, spiceLevel, availabilityText }
    }`);

    const navbarData = await client.fetch(`*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`);

    const finalItems = (data?.wingsAndTendersCarousel || []).map(item => {
        const isWing = item.name?.toLowerCase().includes("wing");
        const placeholder = isWing ? "https://placehold.co/600x600/000000/FFFFFF/png?text=Wing" : "https://placehold.co/600x600/000000/FFFFFF/png?text=Tender";
        
        return {
            ...item,
            image: item.image ? urlFor(item.image).url() : placeholder,
        };
    });

    return (
        <GenericMenuPageClient 
            initialItems={finalItems} 
            initialNavbarData={navbarData} 
            categoryName="WINGS & TENDERS" 
        />
    );
}
