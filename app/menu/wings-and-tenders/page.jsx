import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";
export const revalidate = 0;

export const metadata = {
    title: "Peckers Wings & Tenders Menu | Halal Chicken Wings Stevenage",
    description: "Try our signature southern fried or flame-grilled wings and buttermilk tenders. Coated in our house-made sauces.",
};

const DEFAULT_DATA = [
    // Wings
    { name: "Butter me up wings", ingredients: "Southern Fried Chicken wings coated in our unique Butter Me Up sauce", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "2/4", image: "/images/wings/default.png" },
    { name: "Peri-Peri Flame Grilled wings", ingredients: "Flame-grilled wings with your choice of marinade", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "Depends", image: "/images/wings/default.png" },
    { name: "SFC wings", ingredients: "Southern fried chicken wings coated with our own peckers breading", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "1/4", image: "/images/wings/default.png" },
    { name: "Hot honey wings", ingredients: "Southern Fried Chicken wings glazed with house-made hot honey sauce", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "2/4", image: "/images/wings/default.png" },
    { name: "Buffalo wings", ingredients: "Southern fried chicken wings coated in our house-made buffalo sauce", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "4/4", image: "/images/wings/default.png" },
    { name: "Honey-glazed BBQ wings", ingredients: "SFC wings coated in our house-made honey-glazed BBQ sauce", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "1/4", image: "/images/wings/default.png" },
    { name: "Garlic aioli wings", ingredients: "SFC wings coated in our unique garlic aioli sauce", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "1/4", image: "/images/wings/default.png" },
    { name: "Supercharged wings", ingredients: "Southern Fried Chicken wings coated in our house - made Supercharged sauce", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "3/4", image: "/images/wings/default.png" },
    { name: "Korean gochujang wings", ingredients: "SFC wings coated in our house-made Korean Gochujang sauce", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "2/4", image: "/images/wings/default.png" },
    { name: "Peanut sweet chilli wings", ingredients: "Southern Fried Chicken wings coated with a delicious peanut sweet chilli sauce", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "2/4", image: "/images/wings/default.png" },
    { name: "Katsu curry wings", ingredients: "Southern Fried Chicken wings coated with a delicious katsu curry sauce.", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "2/4", image: "/images/wings/default.png" },
    
    // Tenders
    { name: "Butter me up tenders", ingredients: "Buttermilk tenders coated in our very own Peckers breading with Butter Me Up sauce", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "2/4", image: "/images/tenders/default.png" },
    { name: "Buffalo tenders", ingredients: "SFC Buttermilk Buffalo Tenders with House mayo on the side", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "4/4", image: "/images/tenders/default.png" },
    { name: "SFC buttermilk tenders", ingredients: "Peckers Buttermilk tenders, coated in our very own Peckers breading", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "1/4", image: "/images/tenders/default.png" },
    { name: "Hot honey tenders", ingredients: "Buttermilk Hot Honey Tenders with House mayo on the side", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "2/4", image: "/images/tenders/default.png" },
    { name: "Katsu curry tenders", ingredients: "SFC Buttermilk Tenders with our house-made spice-infused Katsu Curry Sauce.", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "2/4", image: "/images/tenders/default.png" },
    { name: "Honey-glazed BBQ tenders", ingredients: "Buttermilk Tenders Glazed with home-made Honey Glazed BBQ sauce", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "1/4", image: "/images/tenders/default.png" },
    { name: "Garlic aioli tenders", ingredients: "SFC buttermilk tenders coated in signature garlic aioli", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "1/4", image: "/images/tenders/default.png" },
    { name: "Supercharged tenders", ingredients: "Buttermilk tenders with signature supercharger sauce", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "3/4", image: "/images/tenders/default.png" },
    { name: "Korean gochujang tenders", ingredients: "SFC Buttermilk Tenders Glazed with home-made Korean Gochujang sauce", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "2/4", image: "/images/tenders/default.png" },
    { name: "Peanut sweet chilli coriander Tenders", ingredients: "SFC Buttermilk Tenders in peanut and sweet chilli sauce", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "2/4", image: "/images/tenders/default.png" },
];

export default async function WingsAndTendersPage() {
    const data = await client.fetch(`*[_type == "menuPage"][0] {
        wingsAndTendersCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`);

    const navbarData = await client.fetch(`*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`);

    const allSanityItems = data?.wingsAndTendersCarousel || [];

    // 1. Start with CMS items as the base
    const cmsItems = allSanityItems.map(cmsItem => {
        const defaultItem = DEFAULT_DATA.find(
            (d) => d.name.toLowerCase() === cmsItem.name.toLowerCase() || 
                   cmsItem.name.toLowerCase().includes(d.name.toLowerCase()) ||
                   d.name.toLowerCase().includes(cmsItem.name.toLowerCase())
        );

        const isWing = cmsItem.name.toLowerCase().includes("wing");
        const placeholder = isWing ? "https://placehold.co/600x600/000000/FFFFFF/png?text=Wing" : "https://placehold.co/600x600/000000/FFFFFF/png?text=Tender";

        return {
            ...(defaultItem || {}),
            ...cmsItem,
            ingredients: (cmsItem.ingredients && cmsItem.ingredients !== "-") ? cmsItem.ingredients : defaultItem?.ingredients,
            calories: (cmsItem.calories && cmsItem.calories !== "-" && cmsItem.calories !== "—") ? cmsItem.calories : defaultItem?.calories,
            protein: (cmsItem.protein && cmsItem.protein !== "-" && cmsItem.protein !== "—") ? cmsItem.protein : defaultItem?.protein,
            carbs: (cmsItem.carbs && cmsItem.carbs !== "-" && cmsItem.carbs !== "—") ? cmsItem.carbs : defaultItem?.carbs,
            fats: (cmsItem.fats && cmsItem.fats !== "-" && cmsItem.fats !== "—") ? cmsItem.fats : defaultItem?.fats,
            energy: (cmsItem.energy && cmsItem.energy !== "-" && cmsItem.energy !== "—") ? cmsItem.energy : defaultItem?.energy,
            allergens: (cmsItem.allergens && cmsItem.allergens !== "-") ? cmsItem.allergens : defaultItem?.allergens,
            spiceLevel: (cmsItem.spiceLevel && cmsItem.spiceLevel !== "-") ? cmsItem.spiceLevel : defaultItem?.spiceLevel,
            image: cmsItem.image ? urlFor(cmsItem.image).url() : (defaultItem?.image && !defaultItem.image.includes(".png") ? defaultItem.image : placeholder),
        };
    });

    // 2. Add any default items that are NOT in CMS
    const cmsNames = new Set(cmsItems.map(item => item.name.toLowerCase()));
    const missingDefaults = DEFAULT_DATA.filter(d => !cmsNames.has(d.name.toLowerCase()));

    // Map missing defaults to fix their images too
    const fixedMissingDefaults = missingDefaults.map(d => {
        const isWing = d.name.toLowerCase().includes("wing");
        const placeholder = isWing ? "https://placehold.co/600x600/000000/FFFFFF/png?text=Wing" : "https://placehold.co/600x600/000000/FFFFFF/png?text=Tender";
        return {
            ...d,
            image: d.image && !d.image.includes(".png") ? d.image : placeholder
        };
    });

    const finalItems = [...cmsItems, ...fixedMissingDefaults];

    return (
        <GenericMenuPageClient 
            initialItems={finalItems} 
            initialNavbarData={navbarData} 
            categoryName="WINGS & TENDERS" 
        />
    );
}
