import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";
import GenericMenuPageClient from "./components/MenuPageClient";

export const metadata = {
  title: "Peckers Menu | Halal Peri Peri Chicken, Gourmet Burgers & Wings",
  description: "Explore the Peckers menu - the best alternative to Dave's Hot Chicken and Chicken George. From our signature peri peri grilled chicken to our mouth-watering gourmet burgers and spicy wings. 100% Halal and seriously good.",
};

const DEFAULT_BURGERS_DATA = [
  { name: "The OG", image: "/images/burgers/default.png", ingredients: "Pressure-fried tenders and house mayo with crisp lettuce", calories: "544.4 Kcal", protein: "36.5g", carbs: "38.0g", fats: "29.6g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "1/4", boost: 1.1 },
  { name: "Supercharged OG", image: "/images/burgers/default.png", ingredients: "Crispy chicken and house mayo finished with sriracha and a spice blend.", calories: "532.9 Kcal", protein: "40.0g", carbs: "40.2g", fats: "25.8g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "3/4", boost: 1.1 },
  { name: "Honey-glazed BBQ classic", image: "/images/burgers/default.png", ingredients: "Golden chicken fillet and melted cheese glazed in-house-made honey BBQ", calories: "634.5 Kcal", protein: "41.9g", carbs: "56.1g", fats: "29.2g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "1/4", boost: 1 },
];

export default async function MenuPage() {
  const data = await client.fetch(`*[_type == "menuPage"][0] {
    burgerCarousel[] {
      name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText
    }
  }`);

  const navbarData = await client.fetch(`*[_type == "menuNavbar"][0].menuItems[] {
    title, link, isActive
  }`);

  const initialBurgers = data?.burgerCarousel?.map((item) => ({
    ...item,
    image: item.image ? urlFor(item.image).url() : "/images/burgers/default.png",
    boost: item.boost || 1,
  })) || DEFAULT_BURGERS_DATA;

  return (
    <GenericMenuPageClient 
        initialItems={initialBurgers} 
        initialNavbarData={navbarData} 
        categoryName="BURGERS" 
    />
  );
}
