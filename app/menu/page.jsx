import { sanityFetch } from "../../sanity/lib/live";
import { urlFor } from "../../sanity/lib/image";
import GenericMenuPageClient from "./components/MenuPageClient";

export const metadata = {
  title: "Peckers Menu | Peri Peri Chicken, Gourmet Burgers & Wings",
  description: "Explore the Peckers menu - the best alternative to Dave's Hot Chicken and Chicken George. From our signature peri peri grilled chicken to our mouth-watering gourmet burgers and spicy wings. 100% Halal and seriously good.",
};

export default async function MenuPage() {
  const { data } = await sanityFetch({
    query: `*[_type == "menuPage"][0] {
    burgerCarousel[] {
      name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText
    }
  }`
  });

  const { data: navbarData } = await sanityFetch({
    query: `*[_type == "menuNavbar"][0].menuItems[] {
    title, link, isActive
  }`
  });

  const finalBurgers = (data?.burgerCarousel || []).map(item => ({
    ...item,
    image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Peckers+Burger",
  }));

  return (
    <GenericMenuPageClient
      initialItems={finalBurgers}
      initialNavbarData={navbarData}
      categoryName="BURGERS"
    />
  );
}
