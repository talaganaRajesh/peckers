import { sanityFetch } from "../../sanity/lib/live";
import { urlFor } from "../../sanity/lib/image";
import GenericMenuPageClient from "./components/MenuPageClient";

export const metadata = {
  title: "Peckers Menu | Peri-Peri Chicken, Burgers & Wings",
  description: "Explore the full Peckers menu. From our signature peri-peri grilled chicken to gourmet burgers and spicy wings. Seriously good. Order now for delivery or collection.",
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
