/**
 * SEO Utilities for Peckers Website
 */

export const SEO_CONFIG = {
  siteName: "Peckers",
  titleSuffix: " | Peckers Seriously Good Chicken",
  defaultDescription: "Premium grilled and fried chicken in Hertfordshire. We serve artisan-quality peri peri chicken, gourmet burgers, and signature wings in Stevenage and Hitchin.",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://www.peckerschicken.co.uk",
};

/**
 * Formats a title to be between 50-60 characters
 */
export const formatTitle = (title) => {
  const fullTitle = `${title}${SEO_CONFIG.titleSuffix}`;
  if (fullTitle.length >= 50 && fullTitle.length <= 60) return fullTitle;

  if (fullTitle.length > 60) {
    return fullTitle.substring(0, 57) + "...";
  }

  // If too short, maybe add more context if needed, but usually 50-60 is a goal.
  return fullTitle;
};

/**
 * Formats a description to be between 150-160 characters
 */
export const formatDescription = (description) => {
  if (!description) return SEO_CONFIG.defaultDescription.substring(0, 160);

  if (description.length >= 150 && description.length <= 160) return description;

  if (description.length > 160) {
    return description.substring(0, 157) + "...";
  }

  if (description.length < 150) {
    // Pad with default if too short? Or just return as is.
    // Usually, we want it to be descriptive.
    return description;
  }

  return description;
};

/**
 * Generates Open Graph and Twitter metadata
 */
export const generateBaseMetadata = ({ title, description, image, path, keywords }) => {
  const formattedTitle = formatTitle(title);
  const formattedDesc = formatDescription(description);
  const url = `${SEO_CONFIG.baseUrl}${path || ""}`;

  return {
    title: formattedTitle,
    description: formattedDesc,
    keywords: keywords || [],
    openGraph: {
      title: formattedTitle,
      description: formattedDesc,
      url: url,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: image || "/og-image.jpg",
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: formattedTitle,
      description: formattedDesc,
      images: [image || "/og-image.jpg"],
    },
    alternates: {
      canonical: url,
    },
  };
};
