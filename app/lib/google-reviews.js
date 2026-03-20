export async function fetchGoogleReviews() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeIds = [
    process.env.PECKERS_STEVENAGE_PLACE_ID,
    process.env.PECKERS_HITCHIN_PLACE_ID
  ].filter(Boolean);

  if (!apiKey || placeIds.length === 0) {
    console.warn("Google Maps API Key or Place IDs missing. Falling back to empty reviews.");
    return [];
  }

  try {
    const allReviews = await Promise.all(
      placeIds.map(async (placeId) => {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`,
          { next: { revalidate: 3600 } } // Cache for 1 hour
        );
        const data = await response.json();
        return data.result?.reviews || [];
      })
    );

    // Flatten and map to the format expected by RatingSectionCards
    // Google Review: { author_name, text, rating, profile_photo_url, relative_time_description, time }
    return allReviews.flat().map((review, index) => ({
      _id: `google-${index}-${review.time}`,
      name: review.author_name,
      text: review.text,
      role: review.relative_time_description,
      rating: review.rating,
      image: review.profile_photo_url,
      // Assign a random gradient from the existing list for aesthetic consistency
      gradient: getRandomGradient(index)
    }));
  } catch (error) {
    console.error("Error fetching Google Reviews:", error);
    return [];
  }
}

function getRandomGradient(index) {
  const gradients = [
    "from-amber-400 to-orange-600",
    "from-blue-400 to-indigo-600",
    "from-emerald-400 to-teal-600",
    "from-rose-400 to-pink-600",
    "from-purple-400 to-violet-600"
  ];
  return gradients[index % gradients.length];
}
