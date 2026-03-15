import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
    title: "Peckers Wings & Tenders Menu | Halal Chicken Wings Stevenage",
    description: "Try our signature southern fried or flame-grilled wings and buttermilk tenders. Coated in our house-made sauces.",
};

const DEFAULT_DATA = [
    { name: "Butter me up wings", ingredients: "Southern Fried Chicken wings coated in our unique Butter Me Up sauce", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "2/4", image: "/images/wings/default.png" },
    { name: "SFC wings", ingredients: "Southern fried chicken wings coated with our own peckers breading", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "1/4", image: "/images/wings/default.png" },
    { name: "Hot honey wings", ingredients: "SFC wings glazed with house-made hot honey sauce", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "2/4", image: "/images/wings/default.png" },
    { name: "Buffalo wings", ingredients: "SFC wings coated in our house-made buffalo sauce", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "4/4", image: "/images/wings/default.png" },
    { name: "SFC buttermilk tenders", ingredients: "Peckers Buttermilk tenders, coated in our very own Peckers breading", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "1/4", image: "/images/tenders/default.png" },
    { name: "Buffalo tenders", ingredients: "SFC Buttermilk Buffalo Tenders with House mayo on the side", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "4/4", image: "/images/tenders/default.png" },
    { name: "Hot honey tenders", ingredients: "Buttermilk Hot Honey Tenders with House mayo on the side", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "2/4", image: "/images/tenders/default.png" },
];

export default async function WingsAndTendersPage() {
    const data = await client.fetch(`*[_type == "wingsAndTendersPage"][0] {
        wingsCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText },
        tendersCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`);

    const navbarData = await client.fetch(`*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`);

    const wings = data?.wingsCarousel?.map(i => ({ ...i, image: i.image ? urlFor(i.image).url() : "/images/wings/default.png", boost: i.boost || 1 })) || [];
    const tenders = data?.tendersCarousel?.map(i => ({ ...i, image: i.image ? urlFor(i.image).url() : "/images/tenders/default.png", boost: i.boost || 1 })) || [];
    
    const initialItems = [...wings, ...tenders].length > 0 ? [...wings, ...tenders] : DEFAULT_DATA;

    return (
        <GenericMenuPageClient 
            initialItems={initialItems} 
            initialNavbarData={navbarData} 
            categoryName="WINGS & TENDERS" 
        />
    );
}
