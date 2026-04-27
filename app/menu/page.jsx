import { sanityFetch } from "../../sanity/lib/live";
import { urlFor } from "../../sanity/lib/image";
import GenericMenuPageClient from "./components/MenuPageClient";

import { buildPageMetadata } from "../lib/seo";

export async function generateMetadata({ searchParams }) {
  const { data } = await sanityFetch({
    query: `*[_type == "menuPage"][0] {
            burgerCarousel[] { name }
        }`
  });

  const items = data?.burgerCarousel || [];
  const itemNames = items.map(i => i.name).slice(0, 5).join(", ");

  return buildPageMetadata({
    searchParams,
    title: "Full Menu",
    description: `Explore the Peckers menu. Featuring our signature burgers like ${itemNames}, peri-peri chicken, and wings. Seriously good food in Stevenage & Hitchin.`,
    keywords: [
      "Peckers Menu",
      "burgers",
      "peri peri chicken",
      "chicken menu Stevenage",
      "chicken menu Hitchin",
      "Stevenage",
      "Hitchin",
      ...items.map(i => i.name),
    ],
    path: "/menu",
  });
}


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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": finalBurgers.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.name,
              "description": item.ingredients,
              "url": `https://www.peckerschicken.co.uk/menu#${item.name.toLowerCase().replace(/\s+/g, '-')}`
            }))
          })
        }}
      />
      <GenericMenuPageClient
        initialItems={finalBurgers}
        initialNavbarData={navbarData}
        categoryName="BURGERS"
      />
    </>
  );
}
