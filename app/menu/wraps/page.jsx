import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

export const metadata = {
  title: "Peckers Wraps Menu | Chicken Wraps Stevenage & Hitchin",
  description: "Explore the Peckers wraps menu. From the classic OG to the Seoul-inspired Korean wrap, our chicken wraps are seriously good.",
};

export default async function WrapsPage() {
  const { data } = await sanityFetch({
    query: `*[_type == "menuPage"][0] {
    wrapsCarousel[] {
      name, image, boost, ingredients, calories, protein, carbs, fats, energy, allergens, spiceLevel, availabilityText
    }
  }`
  });

  const { data: navbarData } = await sanityFetch({
    query: `*[_type == "menuNavbar"][0].menuItems[] {
    title, link, isActive
  }`
  });

  const finalWraps = (data?.wrapsCarousel || []).map(item => ({
    ...item,
    image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Peckers+Wrap",
  }));

  return (
    <GenericMenuPageClient
      initialItems={finalWraps}
      initialNavbarData={navbarData}
      categoryName="WRAPS"
    />
  );
}
