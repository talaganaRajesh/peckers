import React from "react";
import FaqClient from "./FaqClient";
import { faqData } from "./faqData";

export const metadata = {
  title: "Frequently Asked Questions | Peckers - Seriously Good Chicken",
  description: "Find answers to frequently asked questions about Peckers. Learn about our fresh chicken, peri peri grilled range, housemade sauces, and locations in Stevenage and Hitchin.",
  keywords: [
    "Peckers FAQ",
    "halal chicken FAQ",
    "Peckers opening hours",
    "Stevenage chicken delivery",
    "Hitchin takeaway",
    "halal food Hertfordshire",
    "Peckers menu questions",
    "chicken shop loyalty program"
  ],
  alternates: {
    canonical: "https://peckers.co.uk/faq",
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
