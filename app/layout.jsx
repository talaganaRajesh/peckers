import { Geist, Geist_Mono, Space_Mono, Inconsolata, Anton } from "next/font/google";
import "./globals.css";
import { Share_Tech } from "next/font/google";
import localFont from "next/font/local";
import ClientWrapper from "./ClientWrapper";
import { client } from "../sanity/lib/client";

const peakersFont = localFont({
  src: "./fonts/Supernett-Cn-Regular.woff2",
  display: "swap",
  variable: "--font-peakers",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const shareTech = Share_Tech({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech",
  display: "swap",
});


const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata",
  display: "swap",
});

export const metadata = {
  title: "Peckers | Best Halal Peri Peri & Fried Chicken in Stevenage & Hitchin",
  description:
    "Discover Peckers - the premium alternative to Chicken George and Dave's Hot Chicken in Hertfordshire. We serve the best halal peri peri grilled chicken, wings, and gourmet burgers in Stevenage and Hitchin. Fast delivery and late-night takeaway available.",
  keywords: [
    "Chicken George Stevenage alternative",
    "Dave's Hot Chicken UK alternative",
    "best halal chicken Stevenage",
    "fried chicken Hitchin",
    "Chicken George vs Peckers",
    "Dave's Hot Chicken halal",
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
    "Peckers chicken",
    "halal peri peri wings"
  ],
  alternates: {
    canonical: "https://peckers.co.uk", // Update with actual domain if known
  }
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
    siteSettings = await client.fetch(`*[_type == "siteSettings"][0]`);
  } catch (error) {
    console.error("Failed to load site settings:", error);
  }

  try {
    footerData = await client.fetch(`*[_type == "footer"][0] {
      logo,
      tagline,
      socialLinks,
      quickLinks,
      locations,
      legalLinks,
      copyright,
      bottomLogo
    }`);
  } catch (error) {
    console.error("Failed to load footer data:", error);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FoodEstablishment",
              "name": "Peckers",
              "image": "https://peckers.co.uk/logo.png", // Path to brand logo
              "description": "Premium Halal Grilled and Fried Chicken Restaurant in Hertfordshire.",
              "servesCuisine": ["Halal", "Peri Peri", "Grilled Chicken", "Fried Chicken"],
              "areaServed": ["Stevenage", "Hitchin", "Hertfordshire"],
              "hasMenu": "https://peckers.co.uk/menu",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "Hertfordshire",
                "addressCountry": "UK"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${shareTech.variable} ${anton.variable} ${peakersFont.variable} ${spaceMono.variable} ${inconsolata.variable} antialiased`}
      >
        <ClientWrapper preloadedSettings={siteSettings} preloadedFooter={footerData}>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}