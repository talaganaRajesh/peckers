import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";
export const revalidate = 0;

export const metadata = {
  title: "Peckers Wraps Menu | Halal Chicken Wraps Stevenage & Hitchin",
  description: "Explore the Peckers wraps menu. From the classic OG to the Seoul-inspired Korean wrap, our halal chicken wraps are seriously good.",
};

const DEFAULT_WRAPS_DATA = [
  { name: "The OG", image: "/images/wraps/default.png", ingredients: "Crispy fried chicken, house mayo, and lettuce in a toasted wrap", calories: "683.3 Kcal", protein: "37.6g", carbs: "55.8g", fats: "36.6g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "1/4", boost: 1.1 },
  { name: "Supercharged OG", image: "/images/wraps/default.png", ingredients: "Crispy breaded chicken, supercharged sauce, cheese, and lettuce in a wrap", calories: "617.6 Kcal", protein: "41.1g", carbs: "58.1g", fats: "26.5g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "3/4", boost: 1.1 },
  { name: "Butter me up", image: "/images/wraps/default.png", ingredients: "Fried chicken and authentic, family-recipe butter chicken sauce in a toasted wrap", calories: "671.9 Kcal", protein: "38.5g", carbs: "60.1g", fats: "32.3g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "2/4", boost: 1.1 },
  { name: "Buffalo Soldier", image: "/images/wraps/default.png", ingredients: "Breaded chicken fillet, Buffalo sauce, house mayo, lettuce, and onions, wrapped", calories: "759.3 Kcal", protein: "38.9g", carbs: "60.0g", fats: "42.2g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "4/4", boost: 1.1 },
  { name: "Murger on the dance floor", image: "/images/wraps/default.png", ingredients: "Breaded chicken, house masala sauce, onion bhaji, mango chutney, and pickled onions in a toasted wrap.", calories: "770.8 Kcal", protein: "40.2g", carbs: "76.1g", fats: "33.3g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "2/4", boost: 1.1 },
  { name: "Hert and Seoul", image: "/images/wraps/default.png", ingredients: "Breaded chicken, Korean glaze, house mayo, OG slaw, and onions in a toasted wrap.", calories: "722.0 Kcal", protein: "38.8g", carbs: "64.9g", fats: "36.2g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "2/4", boost: 1.1 },
  { name: "Mega pecker", image: "/images/wraps/default.png", ingredients: "Double chicken, hash brown, cheese, house mayo, lettuce, and onions, wrapped", calories: "1136.4 Kcal", protein: "73.8g", carbs: "77.1g", fats: "63.6g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "1/4", boost: 1.1 },
  { name: "OG Grilled Peri - Peri Wrap", image: "/images/wraps/default.png", ingredients: "Grilled chicken, house mayo, lettuce, and your choice of marinade, wrapped", calories: "Depends", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "Depends", boost: 1.1 },
  { name: "Peckers Grilled Snack Wrap", image: "/images/wraps/default.png", ingredients: "Grilled chicken, house mayo, house- made salsa, lettuce in a 10\" wrap", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "1/4", boost: 1.1 },
];

export default async function WrapsPage() {
  const data = await client.fetch(`*[_type == "menuPage"][0] {
    wrapsCarousel[] {
      name, image, boost, ingredients, calories, protein, carbs, fats, energy, allergens, spiceLevel, availabilityText
    }
  }`);

  const navbarData = await client.fetch(`*[_type == "menuNavbar"][0].menuItems[] {
    title, link, isActive
  }`);

  // 1. Start with CMS items as the base
  const cmsItems = (data?.wrapsCarousel || []).map(cmsItem => {
    const defaultItem = DEFAULT_WRAPS_DATA.find(
      (d) => d.name.toLowerCase() === cmsItem.name.toLowerCase() || 
             cmsItem.name.toLowerCase().includes(d.name.toLowerCase()) ||
             d.name.toLowerCase().includes(cmsItem.name.toLowerCase())
    );

    return {
      ...(defaultItem || {}),
      ...cmsItem,
      // If CMS has a value (and it's not the placeholder "-"), use it.
      // Otherwise fallback to default if available.
      ingredients: (cmsItem.ingredients && cmsItem.ingredients !== "-") ? cmsItem.ingredients : defaultItem?.ingredients,
      calories: (cmsItem.calories && cmsItem.calories !== "-" && cmsItem.calories !== "—") ? cmsItem.calories : defaultItem?.calories,
      protein: (cmsItem.protein && cmsItem.protein !== "-" && cmsItem.protein !== "—") ? cmsItem.protein : defaultItem?.protein,
      carbs: (cmsItem.carbs && cmsItem.carbs !== "-" && cmsItem.carbs !== "—") ? cmsItem.carbs : defaultItem?.carbs,
      fats: (cmsItem.fats && cmsItem.fats !== "-" && cmsItem.fats !== "—") ? cmsItem.fats : defaultItem?.fats,
      energy: (cmsItem.energy && cmsItem.energy !== "-" && cmsItem.energy !== "—") ? cmsItem.energy : defaultItem?.energy,
      allergens: (cmsItem.allergens && cmsItem.allergens !== "-") ? cmsItem.allergens : defaultItem?.allergens,
      spiceLevel: (cmsItem.spiceLevel && cmsItem.spiceLevel !== "-") ? cmsItem.spiceLevel : defaultItem?.spiceLevel,
      availabilityText: (cmsItem.availabilityText && cmsItem.availabilityText !== "-") ? cmsItem.availabilityText : defaultItem?.availabilityText,
      image: cmsItem.image ? urlFor(cmsItem.image).url() : (defaultItem?.image || "https://placehold.co/600x600/000000/FFFFFF/png?text=Wrap"),
    };
  });

  // 2. Add any default items that are NOT in CMS
  const cmsNames = new Set(cmsItems.map(item => item.name.toLowerCase()));
  const missingDefaults = DEFAULT_WRAPS_DATA.filter(d => !cmsNames.has(d.name.toLowerCase()));

  const finalWraps = [...cmsItems, ...missingDefaults];

  return (
    <GenericMenuPageClient
      initialItems={finalWraps}
      initialNavbarData={navbarData}
      categoryName="WRAPS"
    />
  );
}
