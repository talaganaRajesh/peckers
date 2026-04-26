import { sanityFetch } from "../../sanity/lib/live";
import { urlFor } from "../../sanity/lib/image";
import { generateBaseMetadata } from "../lib/seo-utils";
import GenericMenuPageClient from "../menu/components/MenuPageClient";

export async function generateMetadata({ searchParams }) {
  const { q } = await searchParams;
  const query = q || "";
  
  return generateBaseMetadata({
    title: query ? `Search results for "${query}"` : "Search Our Menu",
    description: query 
      ? `Find the best ${query} at Peckers. Explore our menu of seriously good grilled and fried chicken.` 
      : "Search the Peckers menu for your favorite grilled or fried chicken items.",
    path: `/search${query ? `?q=${query}` : ""}`,
    keywords: [query, "Peckers", "Search", "Chicken", "Menu"],
  });
}

export default async function SearchPage({ searchParams }) {
  const { q } = await searchParams;
  const query = q || "";

  const { data } = await sanityFetch({
    query: `*[_type == "menuPage"][0] {
      "allItems": (
        coalesce(burgerCarousel, []) + coalesce(wrapsCarousel, []) + 
        coalesce(riceBowlsCarousel, []) + coalesce(saladBowlsCarousel, []) + 
        coalesce(wingsAndTendersCarousel, []) + coalesce(periPeriGrillCarousel, []) + 
        coalesce(whatsNewCarousel, []) + coalesce(shakesCarousel, []) + 
        coalesce(vegCarousel, []) + coalesce(sidesAndFriesCarousel, []) + 
        coalesce(mealBoxCarousel, []) + coalesce(kidsCarousel, []) + 
        coalesce(lunchDealsCarousel, [])
      )
    }`
  });

  const { data: navbarData } = await sanityFetch({
    query: `*[_type == "menuNavbar"][0].menuItems[] {
      title, link, isActive
    }`
  });

  const allItems = data?.allItems || [];
  
  const filteredItems = query 
    ? allItems.filter(item => 
        item.name?.toLowerCase().includes(query.toLowerCase()) || 
        item.ingredients?.toLowerCase().includes(query.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const finalItems = filteredItems.map(item => ({
    ...item,
    image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Peckers",
  }));

  return (
    <div className="min-h-screen">
      <div className="pt-32 px-6 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-peakers-bold text-white mb-8 uppercase">
          {query ? `Search: ${query}` : "Search Our Menu"}
        </h1>
        {query && finalItems.length === 0 && (
          <p className="text-white/60 text-xl font-neuzeit">No items found for "{query}". Try searching for "burger", "wings", or "peri peri".</p>
        )}
      </div>
      
      {finalItems.length > 0 && (
        <GenericMenuPageClient 
          initialItems={finalItems} 
          initialNavbarData={navbarData} 
          categoryName="SEARCH RESULTS" 
        />
      )}
    </div>
  );
}
