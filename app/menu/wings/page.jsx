import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

import { generateMetadataObject } from "../../lib/seo";

export async function generateMetadata() {
    const { data } = await sanityFetch({
        query: `*[_type == "menuPage"][0] {
            wingsAndTendersCarousel[] { name }
        }`
    });

    const items = (data?.wingsAndTendersCarousel || [])
        .filter(item => item.name?.toLowerCase().includes("wing"));
    
    const itemNames = items.map(i => i.name).slice(0, 5).join(", ");
    const description = items.length > 0 
        ? `Try our signature wings: ${itemNames}, and more. Coated in our house-made sauces. Best chicken wings in Stevenage and Hitchin.`
        : "Try our signature southern fried or flame-grilled wings. Coated in our house-made sauces.";

    return generateMetadataObject({
        title: "Wings Menu",
        description: description,
        keywords: ["wings", "chicken wings", "peri peri wings", "Peckers", ...items.map(i => i.name)],
        path: "/menu/wings"
    });
}

export default async function WingsPage() {
    const { data } = await sanityFetch({
        query: `*[_type == "menuPage"][0] {
        wingsAndTendersCarousel[] { name, image, boost, ingredients, calories, protein, carbs, fats, energy, allergens, spiceLevel, availabilityText }
    }`
    });

    const { data: navbarData } = await sanityFetch({
        query: `*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`
    });

    // Filter to only show Wings
    const finalItems = (data?.wingsAndTendersCarousel || [])
        .filter(item => item.name?.toLowerCase().includes("wing"))
        .map(item => ({
            ...item,
            image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Wing",
        }));

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "itemListElement": finalItems.map((item, index) => ({
                            "@type": "ListItem",
                            "position": index + 1,
                            "name": item.name,
                            "description": item.ingredients,
                            "url": `https://www.peckerschicken.co.uk/menu/wings#${item.name.toLowerCase().replace(/\s+/g, '-')}`
                        }))
                    })
                }}
            />
            <GenericMenuPageClient 
                initialItems={finalItems} 
                initialNavbarData={navbarData} 
                categoryName="WINGS" 
            />
        </>
    );
}
