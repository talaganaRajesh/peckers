import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
  title: "Peckers Wraps Menu | Halal Chicken Wraps Stevenage & Hitchin",
  description: "Explore the Peckers wraps menu. From the classic OG to the Seoul-inspired Korean wrap, our halal chicken wraps are seriously good.",
};

const DEFAULT_WRAPS_DATA = [
  { name: "The OG", image: "/images/wraps/default.png", ingredients: "Crispy fried chicken, house mayo, and lettuce in a toasted wrap", calories: "683.3 Kcal", protein: "37.6g", carbs: "55.8g", fats: "36.6g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "1/4", boost: 1.1 },
  { name: "Supercharged OG", image: "/images/wraps/default.png", ingredients: "Crispy breaded chicken, supercharged sauce, cheese, and lettuce in a wrap", calories: "617.6 Kcal", protein: "41.1g", carbs: "58.1g", fats: "26.5g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "3/4", boost: 1.1 },
  { name: "Hert and Seoul", image: "/images/wraps/default.png", ingredients: "Breaded chicken, Korean glaze, house mayo, OG slaw, and onions in a toasted wrap.", calories: "722.0 Kcal", protein: "38.8g", carbs: "64.9g", fats: "36.2g", allergens: "GLUTEN, MILK, EGGS, SESAME", spiceLevel: "2/4", boost: 1.1 },
];

export default async function WrapsPage() {
  const data = await client.fetch(`*[_type == "wrapsPage"][0] {
    wrapsCarousel[] {
      name, image, boost, ingredients, calories, protein, carbs, fats, energy, allergens, spiceLevel, availabilityText
    }
  }`);

  const navbarData = await client.fetch(`*[_type == "menuNavbar"][0].menuItems[] {
    title, link, isActive
  }`);

  const initialWraps = data?.wrapsCarousel?.map((item) => ({
    ...item,
    image: item.image ? urlFor(item.image).url() : "/images/wraps/default.png",
    boost: item.boost || 1.1,
  })) || DEFAULT_WRAPS_DATA;

  return (
    <GenericMenuPageClient
      initialItems={initialWraps}
      initialNavbarData={navbarData}
      categoryName="WRAPS"
    />
  );
}
