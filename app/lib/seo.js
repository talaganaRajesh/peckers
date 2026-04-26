/**
 * SEO Utility for Peckers
 */

export const SEO_CONFIG = {
  siteName: "Peckers",
  titleSuffix: " | Peckers Seriously Good Chicken",
  defaultDescription: "Premium grilled and fried chicken in Hertfordshire. We serve artisan-quality peri peri chicken, gourmet burgers, and signature wings in Stevenage and Hitchin.",
  baseUrl: "https://www.peckerschicken.co.uk",
};

/**
 * Ensures title is between 50-60 characters
 */
export const formatTitle = (title) => {
  const fullTitle = title.includes("Peckers") ? title : `${title}${SEO_CONFIG.titleSuffix}`;
  if (fullTitle.length > 60) return fullTitle.substring(0, 57) + "...";
  return fullTitle;
};

/**
 * Ensures description is between 150-160 characters
 */
export const formatDescription = (description) => {
  if (!description) return SEO_CONFIG.defaultDescription.substring(0, 160);
  if (description.length > 160) return description.substring(0, 157) + "...";
  return description;
};

/**
 * Generates standard metadata object
 */
export const generateMetadataObject = ({ title, description, keywords, path, image }) => {
  const formattedTitle = formatTitle(title);
  const formattedDesc = formatDescription(description);
  const url = `${SEO_CONFIG.baseUrl}${path || ""}`;

  return {
    title: formattedTitle,
    description: formattedDesc,
    keywords: keywords || [],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: formattedTitle,
      description: formattedDesc,
      url: url,
      siteName: SEO_CONFIG.siteName,
      images: image ? [{ url: image }] : [],
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: formattedTitle,
      description: formattedDesc,
      images: image ? [image] : [],
    },
  };
};
