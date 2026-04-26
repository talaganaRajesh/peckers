import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import { generateBaseMetadata } from "../../lib/seo-utils";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  const { data } = await sanityFetch({
    query: `*[_type == "menuPage"][0] {
      "product": (
        coalesce(burgerCarousel, []) + coalesce(wrapsCarousel, []) + 
        coalesce(riceBowlsCarousel, []) + coalesce(saladBowlsCarousel, []) + 
        coalesce(wingsAndTendersCarousel, []) + coalesce(periPeriGrillCarousel, []) + 
        coalesce(whatsNewCarousel, []) + coalesce(shakesCarousel, []) + 
        coalesce(vegCarousel, []) + coalesce(sidesAndFriesCarousel, []) + 
        coalesce(mealBoxCarousel, []) + coalesce(kidsCarousel, []) + 
        coalesce(lunchDealsCarousel, [])
      )[slug.current == $slug][0]
    }`,
    params: { slug }
  });

  if (!data?.product) {
    return { title: "Product Not Found" };
  }

  const product = data.product;
  const imageUrl = product.image ? urlFor(product.image).width(1200).height(630).url() : null;

  return generateBaseMetadata({
    title: product.name,
    description: product.seoDescription || product.ingredients || `Try our delicious ${product.name} at Peckers.`,
    image: imageUrl,
    path: `/product/${slug}`,
    keywords: product.tags || [product.name, "Peckers", "Chicken", "Halal"],
  });
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const { data } = await sanityFetch({
    query: `*[_type == "menuPage"][0] {
      "product": (
        coalesce(burgerCarousel, []) + coalesce(wrapsCarousel, []) + 
        coalesce(riceBowlsCarousel, []) + coalesce(saladBowlsCarousel, []) + 
        coalesce(wingsAndTendersCarousel, []) + coalesce(periPeriGrillCarousel, []) + 
        coalesce(whatsNewCarousel, []) + coalesce(shakesCarousel, []) + 
        coalesce(vegCarousel, []) + coalesce(sidesAndFriesCarousel, []) + 
        coalesce(mealBoxCarousel, []) + coalesce(kidsCarousel, []) + 
        coalesce(lunchDealsCarousel, [])
      )[slug.current == $slug][0]
    }`,
    params: { slug }
  });

  if (!data?.product) {
    notFound();
  }

  const product = data.product;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-neutral-900 border border-white/10">
          {product.image && (
            <img 
              src={urlFor(product.image).url()} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div>
          <h1 className="text-5xl md:text-7xl font-peakers-bold text-white mb-4 uppercase tracking-tight">
            {product.name}
          </h1>
          {product.ingredients && (
            <p className="text-xl text-peckers-yellow font-neuzeit mb-8 uppercase tracking-widest">
              {product.ingredients}
            </p>
          )}
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
            {product.calories && (
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <span className="block text-white/40 text-xs uppercase tracking-tighter mb-1">Calories</span>
                <span className="text-white font-peakers text-xl">{product.calories}</span>
              </div>
            )}
             {product.protein && (
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <span className="block text-white/40 text-xs uppercase tracking-tighter mb-1">Protein</span>
                <span className="text-white font-peakers text-xl">{product.protein}</span>
              </div>
            )}
             {product.carbs && (
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <span className="block text-white/40 text-xs uppercase tracking-tighter mb-1">Carbs</span>
                <span className="text-white font-peakers text-xl">{product.carbs}</span>
              </div>
            )}
          </div>

          {product.allergens && (
            <div className="mb-8">
              <h3 className="text-white/40 text-xs uppercase tracking-widest mb-2 font-neuzeit">Allergens</h3>
              <p className="text-white font-neuzeit text-sm">{product.allergens}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-4 mt-12">
             <a 
              href="/menu" 
              className="px-8 py-4 bg-white text-black font-peakers-bold text-xl rounded-full hover:bg-peckers-yellow transition-colors uppercase"
            >
              Back to Menu
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
