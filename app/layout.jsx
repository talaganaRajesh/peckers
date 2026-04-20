import "./globals.css";
import localFont from "next/font/local";
import ClientWrapper from "./ClientWrapper";
import { sanityFetch, SanityLive } from "../sanity/lib/live";

const peakersFont = localFont({
  src: "./fonts/Supernett-Cn-Regular.woff2",
  display: "swap",
  variable: "--font-peakers",
});

const peakersBold = localFont({
  src: "./fonts/Supernett Cn Bold.otf",
  display: "swap",
  variable: "--font-peakers-bold",
  weight: "700",
});

const neuzeit = localFont({
  src: "./fonts/NeuzeitGrotesk-Regular.otf",
  display: "swap",
  variable: "--font-neuzeit",
  weight: "400",
});

export const metadata = {
  title: "Peckers | Seriously Good Chicken | Stevenage & Hitchin",
  description:
    "Premium grilled and fried chicken in Hertfordshire. We serve artisan-quality peri peri chicken, gourmet burgers, and signature wings in Stevenage and Hitchin. Order online for fast delivery.",
  keywords: [
    "Peckers chicken",
    "best halal chicken Stevenage",
    "fried chicken Hitchin",
    "peri peri grilled chicken near me",
    "late night takeaway Stevenage",
    "chicken delivery Hertfordshire",
    "halal food near me",
    "peri peri chicken Stevenage",
    "grilled chicken Hertfordshire",
    "family meal takeaway Hertfordshire",
    "chicken wings Hitchin",
    "best fried chicken delivery UK",
    "restaurants in Stevenage",
    "places to eat Hitchin",
    "lunch deals Stevenage",
    "takeaway near me",
    "halal peri peri wings",
    "gourmet burgers Hertfordshire",
    "Seriously Good Chicken"
  ],
  alternates: {
    canonical: "https://www.peckerschicken.co.uk",
  },
};


export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({ children }) {
  // Fetch common data once on the server to prevent pulses in Navbar/Footer
  // Wrap in try/catch to prevent hydration errors when Sanity isn't reachable.
  let siteSettings = null;
  let footerData = null;

  try {
    const { data } = await sanityFetch({
      query: `*[_type == "siteSettings"][0]`,
    });
    siteSettings = data;
  } catch (error) {
    console.error("Failed to load site settings:", error);
  }

  try {
    const { data } = await sanityFetch({
      query: `*[_type == "footer"][0] {
      logo,
      tagline,
      socialLinks,
      quickLinks,
      locations,
      legalLinks,
      copyright,
      bottomLogo
    }`,
    });
    footerData = data;
  } catch (error) {
    console.error("Failed to load footer data:", error);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-256TPVH0TH"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-256TPVH0TH');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FoodEstablishment",
              name: "Peckers",
              image: "https://peckers.co.uk/logo.png", // Path to brand logo
              description:
                "Premium Grilled and Fried Chicken Restaurant in Hertfordshire.",
              servesCuisine: [
                "Halal",
                "Peri Peri",
                "Grilled Chicken",
                "Fried Chicken",
              ],
              areaServed: ["Stevenage", "Hitchin", "Hertfordshire"],
              hasMenu: "https://peckers.co.uk/menu",
              address: {
                "@type": "PostalAddress",
                addressRegion: "Hertfordshire",
                addressCountry: "UK",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${peakersFont.variable} ${peakersBold.variable} ${neuzeit.variable} antialiased`}
      >
        <ClientWrapper
          preloadedSettings={siteSettings}
          preloadedFooter={footerData}
        >
          {children}
        </ClientWrapper>
        <SanityLive />
      </body>
    </html>
  );
}
