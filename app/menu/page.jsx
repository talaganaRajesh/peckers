import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";
import GenericMenuPageClient from "./components/MenuPageClient";

export const metadata = {
  title: "Peckers Menu | Halal Peri Peri Chicken, Gourmet Burgers & Wings",
  description: "Explore the Peckers menu - the best alternative to Dave's Hot Chicken and Chicken George. From our signature peri peri grilled chicken to our mouth-watering gourmet burgers and spicy wings. 100% Halal and seriously good.",
};

const DEFAULT_BURGERS_DATA = [
  { name: "OG BURGER", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=OG+Burger", ingredients: "Pressure-fried tenders and house mayo with crisp lettuce", calories: "544.4 Kcal", protein: "36.5g", carbs: "38.0g", fats: "29.6g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "1/4", boost: 1.1 },
  { name: "Supercharged OG", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Supercharged+OG", ingredients: "Crispy chicken and house mayo finished with sriracha and a spice blend.", calories: "532.9 Kcal", protein: "40.0g", carbs: "40.2g", fats: "25.8g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "3/4", boost: 1.1 },
  { name: "Butter me up", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Butter+Me+Up", ingredients: "Crispy chicken in a secret family butter sauce for a rich, authentic taste", calories: "579.7 Kcal", protein: "35.3g", carbs: "42.1g", fats: "31.6g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "2/4", boost: 1.1 },
  { name: "BBQ CLASSIC", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=BBQ+Classic", ingredients: "Golden chicken fillet and melted cheese glazed in-house-made honey BBQ", calories: "634.5 Kcal", protein: "41.9g", carbs: "56.1g", fats: "29.2g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "1/4", boost: 1 },
  { name: "Buffalo Soldier", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Buffalo+Soldier", ingredients: "Seeded brioche with crunchy breaded chicken, house mayo, and our secret buffalo sauce", calories: "593 Kcal", protein: "37.1g", carbs: "41.3g", fats: "32.9g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "4/4", boost: 1.1 },
  { name: "Murger on the dance floor", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Murger", ingredients: "Seeded brioche with crunchy chicken, onion bhaji, and our signature butter sauce.", calories: "665.1 Kcal", protein: "36.5g", carbs: "57.4g", fats: "33.3g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "2/4", boost: 1.1 },
  { name: "Hert and Seoul", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Hert+and+Seoul", ingredients: "Crunchy breaded chicken in a Korean glaze and house mayo with OG slaw.", calories: "620.7 Kcal", protein: "35.5g", carbs: "48.4g", fats: "33.8g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "2/4", boost: 1.1 },
  { name: "Mega pecker", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Mega+Pecker", ingredients: "Double-crunchy chicken, hash brown, and melted cheese with house-made mayo.", calories: "997.5 Kcal", protein: "72.6g", carbs: "59.3g", fats: "56.6g", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "1/4", boost: 1.1 },
  { name: "Peri - Peri Grilled chicken burger", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Grilled+Burger", ingredients: "Flame-grilled chicken in your choice of marinade with house-made mayo.", calories: "Depends", protein: "-", carbs: "-", fats: "-", allergens: "GLUTEN, MILK, EGGS", spiceLevel: "Depends", boost: 1.0 },
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
