import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";
import GenericMenuPageClient from "./components/MenuPageClient";
export const revalidate = 0;

export const metadata = {
  title: "Peckers Menu | Halal Peri Peri Chicken, Gourmet Burgers & Wings",
  description: "Explore the Peckers menu - the best alternative to Dave's Hot Chicken and Chicken George. From our signature peri peri grilled chicken to our mouth-watering gourmet burgers and spicy wings. 100% Halal and seriously good.",
};

const DEFAULT_BURGERS_DATA = [
  { name: "Peckers OG burger", ingredients: "SFC fillet, house mayo, and lettuce on a seeded brioche bun", calories: "553.8 Kcal", protein: "41.1g", carbs: "15.5g", fats: "22.6g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "1/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Burger" },
  { name: "Butter me up burger", ingredients: "SFC fillet and authentic, family-recipe butter chicken sauce on brioche bun", calories: "671.9 Kcal", protein: "38.5g", carbs: "60.1g", fats: "32.3g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "2/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Burger" },
  { name: "Supercharged OG burger", ingredients: "SFC fillet, supercharged sauce, and melted cheese on brioche bun", calories: "617.6 Kcal", protein: "41.1g", carbs: "58.1g", fats: "26.5g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "3/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Burger" },
  { name: "Buffalo Soldier burger", ingredients: "SFC fillet, Buffalo sauce, house mayo, lettuce, and onions on brioche bun", calories: "759.3 Kcal", protein: "38.9g", carbs: "60.0g", fats: "42.2g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "4/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Burger" },
  { name: "Murger on the dance floor burger", ingredients: "SFC fillet, house masala sauce, onion bhaji, mango chutney, and pickled onions on brioche bun.", calories: "770.8 Kcal", protein: "40.2g", carbs: "76.1g", fats: "33.3g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "2/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Burger" },
  { name: "Hert and Seoul burger", ingredients: "SFC fillet, Korean glaze, house mayo, OG slaw, and onions on brioche bun.", calories: "722.0 Kcal", protein: "38.8g", carbs: "64.9g", fats: "36.2g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "2/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Burger" },
  { name: "Mega pecker burger", ingredients: "Double SFC fillets, hash brown, cheese, house mayo, lettuce, and onions on brioche bun", calories: "1136.4 Kcal", protein: "73.8g", carbs: "77.1g", fats: "63.6g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "1/4", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Burger" },
  { name: "OG Peri - Peri Grilled burger", ingredients: "Grilled chicken, house mayo, and your choice of marinade on brioche bun", calories: "Depends", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "Depends", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Burger" },
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

  // 1. Start with CMS items as the base
  const cmsBurgers = (data?.burgerCarousel || []).map(cmsItem => {
    const defaultItem = DEFAULT_BURGERS_DATA.find(
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
      image: cmsItem.image ? urlFor(cmsItem.image).url() : (defaultItem?.image || "https://placehold.co/600x600/000000/FFFFFF/png?text=Peckers+Burger"),
    };
  });

  // 2. Add any default items that are NOT in CMS
  const cmsNames = new Set(cmsBurgers.map(b => b.name.toLowerCase()));
  const missingDefaults = DEFAULT_BURGERS_DATA.filter(d => !cmsNames.has(d.name.toLowerCase()));

  const finalBurgers = [...cmsBurgers, ...missingDefaults];

  return (
    <GenericMenuPageClient
      initialItems={finalBurgers}
      initialNavbarData={navbarData}
      categoryName="BURGERS"
    />
  );
}
