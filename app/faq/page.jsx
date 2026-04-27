import React from "react";
import FaqClient from "./FaqClient";
import { faqData } from "./faqData";

export const metadata = {
  title: "Peckers FAQ | Questions About Our Chicken, Locations & Menu",
  description: "Got questions about Peckers? Find out about our chicken, opening hours, locations in Stevenage and Hitchin, delivery options, menu, and how to earn free food through our loyalty rewards.",
  keywords: [
    "Peckers FAQ",
    "is Peckers good",
    "what does Peckers serve",
    "Peckers opening hours Stevenage",
    "Peckers opening hours Hitchin",
    "where is Peckers",
    "does Peckers do delivery",
    "best chicken shop Hertfordshire",
    "Peckers loyalty program",
    "Peckers chicken menu",
    "is Peckers chicken fresh",
    "Peckers peri peri"
  ],
  alternates: {
    canonical: "https://www.peckerschicken.co.uk/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions | Peckers Chicken",
    description: "Got questions? We've got answers. Explore everything about Peckers, from our fresh ingredients to our seriously good chicken.",
    url: "https://peckers.co.uk/faq",
    siteName: "Peckers",
    images: [
      {
        url: "/Peckers Logo 1 [Vectorized].svg",
        width: 800,
        height: 600,
        alt: "Peckers Logo",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions | Peckers Chicken",
    description: "Answers to your questions about the best chicken in Hertfordshire.",
    images: ["/Peckers Logo 1 [Vectorized].svg"],
  },
};

const FAQPage = () => {
  // Generate FAQ Schema (JSON-LD)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.flatMap(category =>
      category.items.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer.replace(/\[(.*?)\]\((.*?)\)/g, '$1') // Strip markdown links for schema
        }
      }))
    )
  };

  return (
    <>
      {/* FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-black text-white pt-[25vw] md:pt-[15vw] lg:pt-[10vw] pb-[2vw]">
        <FaqClient />
      </main>
    </>
  );
};

export default FAQPage;
