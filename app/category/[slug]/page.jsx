import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import { generateBaseMetadata } from "../../lib/seo-utils";
import GenericMenuPageClient from "../../menu/components/MenuPageClient";
import { notFound } from "next/navigation";

const categoryMap = {
  "burgers": { field: "burgerCarousel", name: "BURGERS", description: "Smashed and gourmet chicken burgers." },
  "wings": { field: "wingsAndTendersCarousel", filter: "wing", name: "WINGS", description: "Signature fried and grilled wings." },
  "tenders": { field: "wingsAndTendersCarousel", filter: "tender", name: "TENDERS", description: "Crispy and grilled chicken tenders." },
  "rice-bowls": { field: "riceBowlsCarousel", name: "RICE BOWLS", description: "Healthy and filling rice bowls." },
  "salad-bowls": { field: "saladBowlsCarousel", name: "SALAD BOWLS", description: "Fresh and crisp salad bowls." },
  "wraps": { field: "wrapsCarousel", name: "WRAPS", description: "Freshly made chicken wraps." },
  "peri-peri-grilled-chicken": { field: "periPeriGrillCarousel", name: "GRILLED CHICKEN", description: "Flame-grilled peri peri chicken." },
  "shakes": { field: "shakesCarousel", name: "SHAKES", description: "Thick and creamy hand-spun shakes." },
  "sides-and-fries": { field: "sidesAndFriesCarousel", name: "SIDES & FRIES", description: "The perfect accompaniments." },
  "meal-boxes": { field: "mealBoxCarousel", name: "MEAL BOXES", description: "Complete meals in a box." },
  "kids-meals": { field: "kidsCarousel", name: "KIDS MEALS", description: "Tasty meals for the little ones." },
  "lunch-deals": { field: "lunchDealsCarousel", name: "LUNCH DEALS", description: "Great value lunch offers." },
  "veg": { field: "vegCarousel", name: "VEG", description: "Vegetarian options." },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = categoryMap[slug];

  if (!category) return { title: "Category Not Found" };

  return generateBaseMetadata({
    title: `${category.name} Menu`,
    description: category.description || `Explore our ${category.name} menu at Peckers. Seriously good chicken.`,
    path: `/category/${slug}`,
    keywords: [category.name, "Peckers", "Menu", "Chicken", slug],
  });
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = categoryMap[slug];

  if (!category) {
    notFound();
  }

  const { data } = await sanityFetch({
    query: `*[_type == "menuPage"][0] {
      "${category.field}": ${category.field}[] {
        name, slug, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText
      }
    }`
  });

  const { data: navbarData } = await sanityFetch({
    query: `*[_type == "menuNavbar"][0].menuItems[] {
      title, link, isActive
    }`
  });

  let items = data?.[category.field] || [];
  
  if (category.filter) {
    items = items.filter(item => item.name?.toLowerCase().includes(category.filter));
  }

  const finalItems = items.map(item => ({
    ...item,
    image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=" + category.name,
  }));

  return (
    <GenericMenuPageClient 
      initialItems={finalItems} 
      initialNavbarData={navbarData} 
      categoryName={category.name} 
    />
  );
}
